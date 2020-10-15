import { inject, injectable } from "inversify";
import Readiness from "../../domains/status/Readiness.interface";
import TYPES from "../../types";
import { Sequelize } from "sequelize";

@injectable()
export default class StatusService {
  @inject(TYPES.DB) private readonly db: Sequelize;

  public async getReadiness(): Promise<Readiness> {
    const results: Readiness[] = await Promise.all([
      this.getDBReadiness(),
    ]);

    return { name: "service-template", ready: results.every(r => r.ready), services: results };
  }

  private async getDBReadiness(): Promise<Readiness> {
    const name = "db";
    try {
      await this.db.authenticate();
      return { name, ready: true };
    } catch (e) {
      return { name, ready: false };
    }
  }

}
