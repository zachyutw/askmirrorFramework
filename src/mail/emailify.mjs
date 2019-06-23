import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import juice from 'juice';

const HtmlTemplate = ({ body, styles, title }) => `<!DOCTYPE html>
<html>
    <head>
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
</html>`;

const emailify = (Componet) => (props, { title }) => {
    const sheet = new ServerStyleSheet();

    const body = ReactDOMServer.renderToStaticMarkup(sheet.collectStyles(<Componet {...props} />));
    const styles = sheet.getStyleTags();
    return juice(HtmlTemplate({ body, title, styles }));
};

export default emailify;
