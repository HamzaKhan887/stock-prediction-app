import base64
import io
from datetime import datetime

import matplotlib.pyplot as plt
import numpy as np
import onnxruntime as ort
import pandas as pd
import yfinance as yf
from django.conf import settings
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import MinMaxScaler

MODEL_PATH = settings.BASE_DIR / "stock_prediction_model.onnx"
session = ort.InferenceSession(str(MODEL_PATH))
input_name = session.get_inputs()[0].name


def fetch_stock_data(ticker):
    now = datetime.now()
    start = datetime(now.year - 10, now.month, now.day)
    end = now
    df = yf.download(ticker, start, end)
    df = df.dropna()
    return df


def save_plot():
    buf = io.BytesIO()
    plt.savefig(buf, format="png", dpi=80)
    plt.close("all")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def fetch_currency(ticker):
    try:
        return yf.Ticker(ticker).fast_info["currency"]
    except Exception:
        return None


def generate_closing_price_plot(df, ticker, currency=None):
    plt.switch_backend("AGG")
    plt.figure(figsize=(10, 4))
    plt.plot(df.Close, label="Closing Price")
    plt.title(f"Closing price of {ticker}")
    plt.xlabel("Date")
    plt.ylabel(f"Price ({currency})" if currency else "Price")
    plt.legend()
    return save_plot()


def generate_100dma_plot(df, ma100, ticker, currency=None):
    plt.switch_backend("AGG")
    plt.figure(figsize=(10, 4))
    plt.plot(df.Close, label="Closing Price")
    plt.plot(ma100, "r", label="100 DMA")
    plt.title(f"100 Days Moving Average of {ticker}")
    plt.xlabel("Date")
    plt.ylabel(f"Price ({currency})" if currency else "Price")
    plt.legend()
    return save_plot()


def generate_200dma_plot(df, ma100, ma200, ticker, currency=None):
    plt.switch_backend("AGG")
    plt.figure(figsize=(10, 4))
    plt.plot(df.Close, label="Closing Price")
    plt.plot(ma100, "r", label="100 DMA")
    plt.plot(ma200, "g", label="200 DMA")
    plt.title(f"200 Days Moving Average of {ticker}")
    plt.xlabel("Date")
    plt.ylabel(f"Price ({currency})" if currency else "Price")
    plt.legend()
    return save_plot()


def run_prediction(df):
    split_index = int(len(df) * 0.7)
    training_data = pd.DataFrame(df.Close[:split_index])
    testing_data = pd.DataFrame(df.Close[split_index:])
    scaler = MinMaxScaler(feature_range=(0, 1))

    past_100_days = training_data.tail(100)
    final_df = pd.concat([past_100_days, testing_data], ignore_index=True)
    input_data = scaler.fit_transform(final_df)

    x_test = []
    y_test = []
    for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i - 100 : i])
        y_test.append(input_data[i, 0])
    x_test, y_test = np.array(x_test), np.array(y_test)

    y_predicted = session.run(None, {input_name: x_test.astype(np.float32)})[0]

    y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
    y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()
    return y_predicted, y_test


def generate_prediction_plot(df, y_test, y_predicted, ticker, currency):
    plt.switch_backend("AGG")
    plt.figure(figsize=(10, 4))
    test_dates = df.index[-len(y_test) :]
    plt.plot(test_dates, y_test, "b", label="Original Price")
    plt.plot(test_dates, y_predicted, "r", label="Predicted Price")
    plt.title(f"Final Prediction for {ticker}")
    plt.xlabel("Date")
    plt.ylabel(f"Price ({currency})" if currency else "Price")
    plt.legend()
    return save_plot()


def calculate_metrics(y_test, y_predicted):
    mse = mean_squared_error(y_test, y_predicted)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_predicted)

    return mse, rmse, r2