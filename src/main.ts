#!/usr/bin/env node

import { Sequelize } from "sequelize";
import { Application } from "express";

import createApp from "./app";
import TYPES from "./types";
import createContainer from "./inversify.config";
import { ILogger, INodeConfig } from "./interfaces";
import { RunningContextService } from "./services/runningContext/RunningContextService";


async function start(app: Application, logger: ILogger, config: INodeConfig, db: Sequelize, runningContextService: RunningContextService) {
  const port = config.get("app.port");

  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;

    }
    const bind = typeof error === "string"
      ? `Pipe ${port}`
      : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        logger.error(`${bind}  is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  const server = app.listen(port, () => logger.info(`Template microservice is listening on ${port}!`));

  server.on("error", onError);

  try {
    await db.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (err) {
    logger.error("Unable to connect to the database:", err);
  }

  try {
    await runningContextService.updateRunningContext({}, { cronRunning: false });
    logger.info("Cron ready to run.");
  } catch (err) {
    logger.error("Unable to make Cron ready to run", err);
  }
}

const container = createContainer();

const app: Application = createApp(container);
const logger: ILogger = container.get(TYPES.ILogger);
const config: INodeConfig = container.get(TYPES.INodeConfig);
const db: Sequelize = container.get(TYPES.DB);
const runningContextService: RunningContextService = container.get(TYPES.RunningContextService);

start(app, logger, config, db, runningContextService);
