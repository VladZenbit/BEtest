import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUserPayload } from "src/modules/user/types/user.type";

export const GetUser = createParamDecorator(
  (data: keyof IUserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
