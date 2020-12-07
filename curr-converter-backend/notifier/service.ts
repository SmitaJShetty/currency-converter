import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import {oakCors} from 'https://deno.land/x/cors/mod.ts';
import { StartAlertGenerationService} from './generate-alert-worker.ts';
import {SaveUserPreferenceHandler} from '../converter/user_preferences.ts';
import {SaveUserHandler} from '../converter/user.ts';
import SendDailyAlertService from './alert-sender-worker.ts';

const PORT = 5000;

const router = new Router();
const application = new Application();

application.use(oakCors({origin: "http://localhost:5000"}));
application.use(router.routes());
application.use(router.allowedMethods());

router.get("/logs", (ctx:any)=>{
    const resp = ctx.response;
    resp.body = "logs....";
});

router.post("/user_preference",SaveUserPreferenceHandler);
router.post("/user", SaveUserHandler);
//await StartAlertGenerationService();
await SendDailyAlertService();

await application.listen({port:PORT});
