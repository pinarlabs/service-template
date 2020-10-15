import { inject, injectable } from "inversify";
import TYPES from "../types";
import { Sequelize } from "sequelize";

@injectable()
export default abstract class Transactionable {

    @inject(TYPES.DB) private db: Sequelize;

}
