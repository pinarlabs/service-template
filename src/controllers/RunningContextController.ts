import BaseController from "./BaseController";
import { controller, httpGet, httpPut, requestBody } from "inversify-express-utils";
import { RunningContext } from "../repository/RunningContextRepository";
import { inject } from "inversify";
import TYPES from "../types";
import { RunningContextService } from "../services/runningContext/RunningContextService";
import { ILogger } from "../interfaces";

@controller("/runningContext")
export default class RunningContextController extends BaseController {
  @inject(TYPES.RunningContextService) private runningContextService: RunningContextService;
  @inject(TYPES.ILogger) private logger: ILogger;


  @httpGet("/")
  public async getRunningContext() {
    try {
      const result = await this.runningContextService.getRunningContext(this.context);

      return this.json(result);
    } catch (e) {
      this.logger.error(e);
      return this.json({ error: e.message }, 500);
    }

  }


  @httpPut("/")
  public async updateRunningContext(@requestBody() body: RunningContext) {
    try {
      const result = await this.runningContextService.updateRunningContext(this.context, body);

      return this.json(result);
    } catch (e) {
      this.logger.error(e);
      return this.json({ error: e.message }, 500);
    }



  }
}