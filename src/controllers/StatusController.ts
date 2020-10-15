import BaseController from "./BaseController";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import TYPES from "../types";
import StatusService from "../services/status/StatusService";
import { ILogger } from "../interfaces";

@controller("")
export default class StatusController extends BaseController {
  @inject(TYPES.ILogger) private readonly logger: ILogger;
  @inject(TYPES.StatusService) private readonly statusService: StatusService;

  @httpGet("/ping")
  public async ping() {
    return this.json({ status: "ok" }, 200);
  }

  @httpGet("/ready")
  public async ready() {
    try {
      const readiness = await this.statusService.getReadiness();
      if (readiness.ready)
        return this.json(readiness, 200);
      else {
        this.logger.info(`[GET /ready][status: not ready][services:${JSON.stringify(readiness.services)}]`);
        return this.json(readiness, 500);
      }
    } catch (err) {
      return this.json({ ready: false, name: "service-template" }, 500);
    }
  }

  @httpGet("/health")
  public async health() {
    return this.json({ status: "ok" }, 200);
  }

}
