import path from "path";
import fs from "fs";
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { Menu } from "../src/Menu.js";
import data from "../src/data.json";

const app = express();

app.use(express.static("./build"));

const PORT = process.env.PORT || 4000;

app.get("/*", (req, res) => {
  const renderedHtml = ReactDOMServer.renderToString(
    <Menu
      recipes={data}
      title="Delisious Recipes"
    />
  );

  const indexFile = path.resolve(
    "./build-server/index.html"
  )
  
  fs.readFile(indexFile, "utf8", (err, data) => {
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root"${renderedHtml}</div>`
      )
    );
  });
});

app.listen(PORT, () => 
  console.log(
    `Server is listening on port ${PORT}`
  )
);
