import * as env from 'dotenv';
env.config();
export default () => ({
  port: process.env.PORT ?? 3000,
  host: process.env.HOST ?? '0.0.0.0',
  jwt_secret: process.env.JWT_SECRET ?? 'default_secret',
  routes: {
    user_route: '/api/user',
  },
});
