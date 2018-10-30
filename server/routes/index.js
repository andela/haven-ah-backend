import userRouter from './users';
import articleRouter from './article';

export default (app) => {
  app.use('/api/v1', userRouter);
  app.use('/api/v1/articles', articleRouter);
};
