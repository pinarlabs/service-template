import { inject, injectable } from "inversify";
import TYPES from "../../types";
import Transactionable from "../Transactionable";
import transactional from "../../utils/transactional";
import { RunningContext, RunningContextRepository } from "../../repository/RunningContextRepository";
import { ILogger } from "../../interfaces";

@injectable()
export class RunningContextService extends Transactionable {
  @inject(TYPES.RunningContextRepository) private runningContextRepository: RunningContextRepository;
  @inject(TYPES.ILogger) private logger: ILogger;


  @transactional
  public async getRunningContext(context): Promise<RunningContext> {
    const result = await this.runningContextRepository.getConfiguration(context);
    return result;
  }

  @transactional
  public async updateRunningContext(context, runningContext: RunningContext): Promise<RunningContext>  {
    const result = await this.runningContextRepository.updateConfiguration(context, runningContext);
    this.logger.info(`CONFIGURATION UPDATED TO ${JSON.stringify(result)}`);
    return result;
  }
}
