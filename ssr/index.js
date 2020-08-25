/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const puppeteerRenderer = require("puppeteer-renderer-middleware");
const PORT = 5000;
app.use(
  puppeteerRenderer({
    url: `http://localhost:${PORT}/renderer`,
  })
);

app.use(express.static("../dist"));

app.use((req, res) => res.redirect("/"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));