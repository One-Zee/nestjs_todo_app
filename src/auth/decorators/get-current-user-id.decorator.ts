import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    //const user = request.user as JwtPayload;
    console.log(request.headers.authorization);
    
    return request.headers.authorization.split(' ')[1]
  },
);
