import StockDetailPage from './StockDetailPage';

// The site is exported as static files (next.config.ts: output: 'export'), so every
// stock page must be generated at build time. The page itself reads its symbol from the
// URL and fetches data client-side. Symbols not listed here have no page on a static host.
export function generateStaticParams() {
  const symbols = [
    // US
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META',
    // Nigerian
    'DANGCEM', 'MTNN', 'GTCO', 'ZENITHBANK', 'AIRTELAFRI',
  ];
  return symbols.map((symbol) => ({ symbol }));
}

export default function Page() {
  return <StockDetailPage />;
}
