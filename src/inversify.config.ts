import "reflect-metadata";
import winston from "winston";
import { postgraphile } from "postgraphile";
import { Container } from "inversify";
import TYPES from "./types";
import nodeConfig from "config";
import { ILogger, INodeConfig } from "./interfaces";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
/* Import controllers for automatic binding */
import "./controllers";
import StatusService from "./services/status/StatusService";
import { RunningContextRepository } from "./repository/RunningContextRepository";
import RunningContextModel from "./models/RunningContextModel";
import { RunningContextService } from "./services/runningContext/RunningContextService";

dotenv.config();

export default function createContainer(): Container {
  const container = new Container();

  container.bind<INodeConfig>(TYPES.INodeConfig).toDynamicValue(() => {
    return nodeConfig;
  });

  const sequelize = new Sequelize(nodeConfig.get("database.name"), nodeConfig.get("database.username"), nodeConfig.get("database.password"), {
    host: nodeConfig.get("database.host"),
    port: nodeConfig.get("database.port"),
    dialect: "postgres",
    define: {
      freezeTableName: true // This makes it so that sequelize references table names equal to model names
    },
    pool: {
      max: 50,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });
  container.bind<Sequelize>(TYPES.DB).toConstantValue(sequelize);
  container.bind<any>(TYPES.Postgraphile).toDynamicValue(() => {
    if (process.env.NODE_ENV === "test") {
      return function emptyMiddleware(req, res, next) {
        return next();
      };
    }
    const { host, port, username, password, name: database} = nodeConfig.get("database");
    const url = `postgres://${username}:${password}@${host}:${port}/${database}`;
    const postGraphileHandler =  postgraphile(
      url,"public",
      {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true
      }
    );
    return postGraphileHandler;
  });

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.simple()
    ),
    transports: [
      new winston.transports.Console(),
    ],
  });
  container.bind<ILogger>(TYPES.ILogger).toConstantValue(logger);

  container.bind<RunningContextRepository>(TYPES.RunningContextRepository).to(RunningContextRepository);
  container.bind<RunningContextService>(TYPES.RunningContextService).to(RunningContextService);
  container.bind<StatusService>(TYPES.StatusService).to(StatusService);

  RunningContextModel.init(RunningContextModel.modelDefinition, { sequelize, modelName: "running_context" });

  return container;
};
