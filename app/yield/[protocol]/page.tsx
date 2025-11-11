import YieldDetailPage from './YieldDetailPage';

export async function generateStaticParams() {
  // Add all your yield protocols here
  const protocols = [
    'Aave',
    'Compound',
    'Lido',
    'Yearn',
    'Curve',
    // Add all your protocol names
  ];
  
  return protocols.map((protocol) => ({
    protocol: encodeURIComponent(protocol),
  }));
}

export default function Page() {
  return <YieldDetailPage />;
}