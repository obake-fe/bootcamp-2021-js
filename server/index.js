const express = require("express");
const bodyParser = require("body-parser");
const todoRouter = require("./todo");
const app = express();
const PORT = process.env.PORT || 3000;

// Body-ParserはExpressに標準搭載されてるらしい
// https://qiita.com/atlansien/items/c587a0bf2f7f9022107c
app.use(bodyParser.json());

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// todoパスのリクエストがあったときに、todoRouterのミドルウェア関数を実行する
app.use("/todo", todoRouter);

// サーバを立てる
app.listen(PORT);
