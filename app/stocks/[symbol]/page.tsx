import StockDetailPage from './StockDetailPage';

export async function generateStaticParams() {
  // Add all your stock symbols here
  const usStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX'];
  const ngnStocks = ['DANGCEM', 'MTNN', 'BUACEMENT', 'SEPLAT', 'NESTLE'];
  
  const allSymbols = [...usStocks, ...ngnStocks];
  
  return allSymbols.map((symbol) => ({
    symbol: symbol.toLowerCase(),
  }));
}

export default function Page() {
  return <StockDetailPage />;
}