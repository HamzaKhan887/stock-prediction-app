from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import StockPredictionSerializer
from .utils import (
    calculate_metrics,
    fetch_currency,
    fetch_stock_data,
    generate_100_and_200dma_plot,
    generate_closing_price_plot,
    generate_prediction_plot,
    run_prediction,
)

MIN_ROWS = 400  # need enough history for the 100-day and 200-day moving averages


class StockPredictionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        ticker = serializer.validated_data["ticker"]
        df = fetch_stock_data(ticker)
        if df.empty:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if len(df) < MIN_ROWS:
            return Response(
                {"ticker": ["Not enough price history for this ticker."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        currency = fetch_currency(ticker)

        ma100 = df.Close.rolling(100).mean()
        ma200 = df.Close.rolling(200).mean()
        y_predicted, y_test = run_prediction(df)
        mse, rmse, r2 = calculate_metrics(y_test, y_predicted)

        return Response(
            {
                "status": "success",
                "plot_img": generate_closing_price_plot(df, ticker, currency),
                "plot_100_and_200_dma": generate_100_and_200dma_plot(df, ma100, ma200, ticker, currency),
                "plot_prediction": generate_prediction_plot(
                    df, y_test, y_predicted, ticker, currency
                ),
                "mse": mse,
                "rmse": rmse,
                "r2": r2,
                "currency": currency,
            }
        )
