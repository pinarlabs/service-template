import { Sequelize } from "sequelize/types";

export interface ILogger {
  info(message: string): void;
  debug(message: string): void;
  error(message: string, err?: any): void;
  warn(message: string);
}

export interface INodeConfig {
  get(key: string): any;
}

export interface IDB {
  getInstance(): Sequelize;
}
