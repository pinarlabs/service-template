import { BaseHttpController } from "inversify-express-utils";

export default abstract class BaseController extends BaseHttpController {

  protected get context() {
    return this.httpContext.response.locals.context;
  }

}
