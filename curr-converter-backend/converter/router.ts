import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import config from './config.js';
import {getAllSymbols, getConversion} from './handlers.ts';

const PORT = config.PORT || 4000;

const router = new Router();
const application = new Application();

application.use(router.routes());
application.use(router.allowedMethods());

router.get("/symbols", getAllSymbols);
router.get("/convert/:from/:to", getConversion);

await application.listen({port:PORT});

// localhost:4000/convert/usd/inr