import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar, Line, Brush } from "recharts";
import Navbar from "./navbar";

const CryptoChart = () => {
  const { id } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  const fetchCryptoData = async () => {
    try {
      const marketResponse = await axios.get(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${id.toUpperCase()}USDT`
      );
      const chartResponse = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${id.toUpperCase()}USDT&interval=5m&limit=100`
      );

      if (!marketResponse.data || !chartResponse.data) throw new Error("Invalid crypto ID or data unavailable");

      setCryptoData({
        name: id.toUpperCase(),
        symbol: id,
        current_price: parseFloat(marketResponse.data.lastPrice),
        price_change_percentage_24h: parseFloat(marketResponse.data.priceChangePercent),
        high: parseFloat(marketResponse.data.highPrice),
        low: parseFloat(marketResponse.data.lowPrice),
      });

      setChartData(
        chartResponse.data.map(([timestamp, open, high, low, close]) => ({
          time: new Date(timestamp).toLocaleTimeString(),
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
        }))
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center p-5">Loading...</div>;
  if (!cryptoData) return <div className="text-red-400 text-center p-5">Failed to load data</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen">
        <Navbar/>
      {/* Top Bar: Crypto Type on Left & High/Low on Right */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h3 className="text-2xl font-bold">{cryptoData.name} ({cryptoData.symbol.toUpperCase()})</h3>
        <div className="flex gap-6 text-lg">
          <p className="text-gray-400">Low: <span className="text-red-400">${cryptoData.low.toFixed(2)}</span></p>
          <p className="text-gray-400">High: <span className="text-green-400">${cryptoData.high.toFixed(2)}</span></p>
        </div>
      </div>

      {/* Price Info */}
      <div className="text-center py-4">
        <p className="text-green-400 text-3xl">${cryptoData.current_price.toFixed(2)}</p>
        <p className={`text-xl ${cryptoData.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}>
          {cryptoData.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      {/* Chart Section */}
      <div className="w-screen h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <XAxis dataKey="time" tick={{ fill: "white" }} />
            <YAxis domain={['auto', 'auto']} tick={{ fill: "white" }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", color: "white" }} />

            {/* Candlestick bars */}
            <Bar dataKey="open" fill="red" barSize={5} />
            <Bar dataKey="close" fill="green" barSize={5} />
            <Line type="monotone" dataKey="high" stroke="white" strokeWidth={2} />
            <Line type="monotone" dataKey="low" stroke="white" strokeWidth={2} />

            {/* Zoom Brush */}
            <Brush dataKey="time" height={30} stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-6 gap-4">
        <button className="bg-green-500 text-white font-bold px-6 py-3 rounded-md shadow-md hover:bg-green-600 w-32" style={{background:"green"}}>
          Up
        </button>
        <button className="bg-red-500 text-white font-bold px-6 py-3 rounded-md shadow-md hover:bg-red-600 w-32" style={{background:"red"}}>
          Down
        </button>
      </div>
    </div>
  );
};

export default CryptoChart;
