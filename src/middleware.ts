import { middlewareNextAuth } from '@app/middlewares/nextAuth';
import { stackMiddlewares } from '@app/middlewares/stackMiddlewares';

const middlewares = [middlewareNextAuth];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ['/'],
};
