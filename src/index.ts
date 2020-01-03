
import bodyParser from "body-parser";
import express from "express";
import { NextFunction, Request, Response } from "express";

import systemConfig from "./config";

const app = express();

app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(bodyParser.json({ limit: "20mb" }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.sendStatus(500);
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello ts node")
})

app.listen(systemConfig.port, () => {
  console.log(`the server is running at port ${systemConfig.port}`);
});

export default app;
