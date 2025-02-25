import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Carousel from "../components/Carousel";
import Navbar from "../components/navbar";

const cryptoIconMap = {
  btc: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  eth: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  bnb: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  bcc: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
  neo: "https://cryptologos.cc/logos/neo-neo-logo.png",
  ltc: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  qtum: "https://cryptologos.cc/logos/qtum-qtum-logo.png",
  ada: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  xrp: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  eos: "https://cryptologos.cc/logos/eos-eos-logo.png",
  tusd: "https://cryptologos.cc/logos/true-usd-tusd-logo.png",
  iota: "https://cryptologos.cc/logos/iota-iota-logo.png",
  xlm: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
  ont: "https://cryptologos.cc/logos/ontology-ont-logo.png",
  trx: "https://cryptologos.cc/logos/tron-trx-logo.png",
  etc: "https://cryptologos.cc/logos/ethereum-classic-etc-logo.png",
  icx: "https://cryptologos.cc/logos/icon-icx-logo.png",
  ven: "https://cryptologos.cc/logos/vechain-vet-logo.png",
  nuls: "https://cryptologos.cc/logos/nuls-nuls-logo.png",
  vet: "https://cryptologos.cc/logos/vechain-vet-logo.png",
};

const defaultIconUrl = "https://via.placeholder.com/32"; // Placeholder image URL

const Home = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchCryptoData = async () => {
    try {
      const marketUrl = "https://api.binance.com/api/v3/ticker/24hr";
      const { data } = await axios.get(marketUrl);

      const topCryptos = data
        .filter((coin) => coin.symbol.endsWith("USDT"))
        .slice(0, 20)
        .map((coin) => ({
          id: coin.symbol.replace("USDT", "").toLowerCase(),
          name: coin.symbol.replace("USDT", ""),
          symbol: coin.symbol.replace("USDT", ""),
          current_price: parseFloat(coin.lastPrice),
          price_change_percentage_24h: parseFloat(coin.priceChangePercent),
        }));

      // Fetch candlestick (OHLC) data
      const promises = topCryptos.map(async (coin) => {
        try {
          const chartUrl = `https://api.binance.com/api/v3/klines?symbol=${coin.symbol}USDT&interval=5m&limit=40`;
          const { data: chartData } = await axios.get(chartUrl);
          return {
            ...coin,
            sparkline: chartData.map(([timestamp, open, high, low, close]) => ({
              time: new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              price: parseFloat(close),
            })),
          };
        } catch (error) {
          console.error(`Error fetching chart for ${coin.symbol}:`, error);
          return { ...coin, sparkline: [] };
        }
      });

      const cryptoWithChart = await Promise.all(promises);
      setCryptoData(cryptoWithChart);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen">
      <Navbar />
      <Carousel />

      <div className="px-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Top 20 Cryptos</h2>
        <div className="flex flex-col gap-2 w-full">
          {cryptoData.map((coin) => (
            <Link
              to={`/crypto/${coin.id}`}
              key={coin.id}
              className="bg-gray-800 p-4 rounded-lg flex justify-between items-center w-full"
            >
              {/* Left Side - Coin Name and Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={cryptoIconMap[coin.id] || defaultIconUrl} // Use default icon if not found
                  alt={coin.name}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultIconUrl; }} // Fallback on error
                />
                <h3 className="text-lg font-bold">{coin.name} ({coin.symbol})</h3>
              </div>

              {/* Center - Fixed Sparkline Chart */}
              <div className="w-32 h-10 flex items-center">
                {coin.sparkline.length > 0 ? (
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={coin.sparkline}>
                      <XAxis dataKey="time" hide />
                      <YAxis domain={["dataMin", "dataMax"]} hide />
                      <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke={coin.price_change_percentage_24h >= 0 ? "green" : "red"}
                        strokeWidth={2}
                        dot={false}
                        animationDuration={500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500">No Data</p>
                )}
              </div>

              {/* Right Side - Price & Change */}
              <div className="flex flex-col items-end">
                <p className="text-xl font-semibold">${coin.current_price.toFixed(2)}</p>
                <p
                  className={`text-sm font-semibold ${
                    coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;