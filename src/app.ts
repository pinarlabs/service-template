import "reflect-metadata";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import * as express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import createContainer from "./inversify.config";
import TYPES from "./types";
import { ILogger, INodeConfig } from "./interfaces";

function createApp(container: Container = createContainer()): express.Application {
  const logger: ILogger = container.get(TYPES.ILogger);
  const config: INodeConfig = container.get(TYPES.INodeConfig);
  const postgraphileHandler = container.get(TYPES.Postgraphile);

  const server = new InversifyExpressServer(container, null, { rootPath: config.get("apis.v1.baseUri") });

  server.setConfig((app: express.Application) => {
    // view engine setup
    app
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(cookieParser())
      .use(express.static(path.join(__dirname, "public")))
      .use(function initContext(req, res, next) {
        // eslint-disable-next-line no-param-reassign
        res.locals.context = {};
        next();
      });
      app.use(postgraphileHandler as any);
  });

  server.setErrorConfig((app: express.Application) => {
    // error handler
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err, req, res, next) => {
      logger.info(err);
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.status(err.status || 500);
      res.send({ error: err.message });
    });
  });

  return server.build();
}

export default createApp;
