import express from 'express';
import bodyParser from 'body-parser'; // body-parser 미들웨어 추가
import { getPort } from '../config/port.mjs';
import mainRouter from './Routers.mjs';

const app = express();
app.locals.pretty = true;
app.set("views",process.cwd() + "/src/view");
app.set('port', process.env.PORT || getPort());
const port = app.get('port');

app.set("view engine","pug");

app.use(express.json());
app.use(express.static('./src/public'));


app.use("/",mainRouter)

app.listen(port,()=>{ 
   console.log(`${port} 포트 현재 실행중~~~`) 
})