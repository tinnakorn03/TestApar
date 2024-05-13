import fs from 'fs';
import path from 'path';
import Router from 'koa-joi-router';
import { SwaggerAPI } from 'koa-joi-router-docs';

const swaggerAPI = new SwaggerAPI();
const api = Router();

api.prefix('/')
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== 'index.ts' &&
      file.slice(-10) === '.router.ts'
    );
  })
  .forEach((file: string) => {
    const route = require(path.join(__dirname, file));
    api.use(route.middleware());
    swaggerAPI.addJoiRouter(route);
  });


const spec = swaggerAPI.generateSpec({
    info: {
      title: 'Documents API',
      description: 'Test',
      version: '1.0',
    },
    basePath: '/',
    tags: []
  });
 
api.get('/_api.json', async ctx => {
    ctx.body = JSON.stringify(spec, null, 2)
})
  
export default api.middleware();
