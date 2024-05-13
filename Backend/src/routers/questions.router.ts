
import Router from 'koa-joi-router'; 
import meta from '../utils/meta.utils';
import { getQuestions, getLeaderBoard } from '../controllers/questions.controllers';


const api = Router();

api.prefix("/question");
api.route({
    meta: meta("Get questions", "Question"), 
    method: "get",
    path: "/getAll",
    handler: getQuestions,
});
api.route({
    meta: meta("Get leader board", "Question"), 
    method: "get",
    path: "/getLeaderBoard",
    handler: getLeaderBoard,
});
module.exports = api;