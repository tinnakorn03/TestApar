//index.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';
import cors from '@koa/cors';
import apiRouters from './routers';  

const app = new Koa();
app.use(cors());
app.use(
    koaSwagger({
        routePrefix: '/',
        swaggerOptions: {
            url: '/_api.json',
        },
    })
);
app.use(bodyParser());
 
// Apply routes
app.use(apiRouters);

// Start the server
app.listen(2999, () => {
    console.log('Server running on http://localhost:2999');
});
