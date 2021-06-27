import express from "express";
import history from "connect-history-api-fallback";

export const createExpressApp = () => {
  const app = express();

  app.get("/ping", (req, res) => res.send("pong"));

  app.use(history());
  app.use(express.static("dist/static"));

  return app;
};
