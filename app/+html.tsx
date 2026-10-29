import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>PeyzArch</title>
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: baseCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const baseCss = `
html, body, #root {
  height: 100%;
  margin: 0;
  background-color: #F3F1EC;
}
body {
  overflow: hidden;
}
`;
