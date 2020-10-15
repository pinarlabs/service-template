import { injectable } from "inversify";
import RunningContextModel from "../models/RunningContextModel";

export interface RunningContext {
  organizations?: string;
  dryRun?: boolean;
  cronRunning?: boolean;
}

@injectable()
export class RunningContextRepository {

  public static defaultConfiguration = "running-context";

  public async getConfiguration(context) {

    const searchObj = {
      where: {
        id: RunningContextRepository.defaultConfiguration
      },
      transaction: context.transaction 
    };
    return RunningContextModel.findOne(searchObj);
  }

  public async updateConfiguration(context, runningContext: RunningContext) {
    const result = await RunningContextModel.update(runningContext, { where: { id: RunningContextRepository.defaultConfiguration }, transaction: context.transaction, returning: true });
    return result[1][0].toJSON();
  }
}
