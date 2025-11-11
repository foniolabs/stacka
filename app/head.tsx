export default function Head() {
  return (
    <>
      {/* Favicons: provide multiple sizes (PNG) for clearer tab icons, with SVG fallback */}
      {/* 32x32 is commonly used for browser tabs; 192x192 / 180x180 for PWA and touch icons */}
      <link rel="icon" href="/icon-32.png" sizes="32x32" />
      <link rel="icon" href="/icon-48.png" sizes="48x48" />
      <link rel="icon" href="/icon-192.png" sizes="192x192" />
      {/* Fallback to SVG for modern browsers */}
      <link
        rel="icon"
        href="/stacka-logo.svg"
        sizes="any"
        type="image/svg+xml"
      />
      <link rel="apple-touch-icon" href="/icon-180.png" sizes="180x180" />
      <link rel="mask-icon" href="/stacka-logo.svg" color="#C4FF0D" />
      <meta name="theme-color" content="#0066FF" />
    </>
  );
}
