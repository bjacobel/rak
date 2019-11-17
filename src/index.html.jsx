/* globals htmlWebpackPlugin */

import React from 'react';

const scriptBlock = (scripts = [], type) => (
  <script
    {...type}
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: scripts
        .map(
          (script, i) => `
            var script${i} = document.createElement('script');
            script${i}.type = 'text/javascript';
            script${i}.src = '${script}';
            document.body.appendChild(script${i});
          `,
        )
        .join('\n'),
    }}
  />
);

export default (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <title>{htmlWebpackPlugin.options.title}</title>
      {htmlWebpackPlugin.files.css.map(file => (
        <link href={file} rel="stylesheet" media="nope!" onLoad="this.media='all'" />
      ))}
    </head>
    <body>
      <div id="main" />
      {scriptBlock(htmlWebpackPlugin.files.js, { type: 'module' })}
    </body>
  </html>
);
