import { middlewareNextAuth } from '@app/middlewares/nextAuth';
import { stackMiddlewares } from '@app/middlewares/stackMiddlewares';

//export { default } from 'next-auth/middleware';

const middlewares = [middlewareNextAuth];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ['/'],
};
