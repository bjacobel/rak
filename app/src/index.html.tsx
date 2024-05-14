/* globals htmlWebpackPlugin */

export default (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <title>{htmlWebpackPlugin.options.title}</title>
    </head>
    <body>
      <noscript>
        <h1>This application requires JavaScript to function. Please enable JavaScript and reload.</h1>
      </noscript>
      <div id="main" />
    </body>
  </html>
);
