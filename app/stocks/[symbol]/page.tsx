import StockDetailPage from './StockDetailPage';

// Make this a dynamic page since we fetch stock data from API
export const dynamic = 'force-dynamic';

export default function Page() {
  return <StockDetailPage />;
}