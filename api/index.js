const puppeteer = require('puppeteer');

const escape = (string = '') => {
  return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const getContent = (attrs = {}) => {
  let attrsString = '';
  Object.keys(attrs).forEach((attrName) => {
    const attrValue = attrs[attrName];
    if (!attrValue) return;
    attrsString += ` ${escape(attrName)}="${escape(attrValue)}" `;
  });
  return /* html */ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CodersRank Work Experience</title>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
        position: relative;
      }
      codersrank-work-experience {
        width: 800px;
      }
    </style>
  </head>
  <body>
    <codersrank-work-experience ${attrsString}></codersrank-work-experience>
    <script src="https://unpkg.com/@codersrank/work-experience/codersrank-work-experience.min.js"></script>
  </body>
  </html>
  `;
};

const getScreenshot = async (attrs = {}) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });
  await page.setContent(getContent(attrs), { waitUntil: 'networkidle0' });
  const widgetElement = await page.$('codersrank-work-experience');
  const screenshotBuffer = await widgetElement.screenshot({ omitBackground: true });
  await browser.close();
  return screenshotBuffer;
};

module.exports = async (context, req) => {
  const functionStartTime = new Date().getTime();
  if (!req.query.username) {
    context.res = {
      status: 200,
      headers: {
        'content-type': 'text/html',
      },
      body: '<h1>Error</h1><p><b>username</b> is required in query string</p>',
    };
    return;
  }

  const attrs = {
    ...(req.query || {}),
  };
  if (!attrs.style) attrs.style = '';
  if (attrs.width) {
    attrs.style += `;width:${attrs.width}px`;
  }
  attrs.style = decodeURIComponent(attrs.style);

  const screenshotBuffer = await getScreenshot(attrs);

  context.res = {
    headers: {
      'content-type': 'image/png',
      'cache-control': 'no-cache, no-store, must-revalidate',
      expires: '0',
    },
    body: screenshotBuffer,
  };
  const functionTime = new Date().getTime() - functionStartTime;
  // eslint-disable-next-line
  console.log(
    JSON.stringify({
      ...attrs,
      timeTook: `${functionTime / 1000}s`,
    }),
  );
};
