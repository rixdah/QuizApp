import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerOptionController from "./controllers/answerOptionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as answerController from "./controllers/answerController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as quizApi from "./apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/questions", questionsController.listQuestions);
router.post("/questions", questionsController.addQuestion);
router.get("/questions/:id", questionController.showQuestion);
router.post("/questions/:id/options", answerOptionController.addAnswerOption);
router.post("/questions/:questionId/options/:optionId/delete", answerOptionController.deleteAnswerOption);
router.post("/questions/:id/delete", questionController.deleteQuestion);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", loginController.logout);

router.get("/quiz", quizController.getRandomQuestion);
router.get("/quiz/:id", quizController.showQuiz);

router.post("/quiz/:id/options/:optionId", quizController.addAnswer);

router.get("/quiz/:id/correct", answerController.showCorrect);
router.get("/quiz/:id/incorrect", answerController.showIncorrect);

router.get("/statistics", statisticsController.showAnswerCount);

router.get("/api/questions/random", quizApi.getRandomQuestion);
router.post("/api/questions/answer", quizApi.answerToQuestion);

export { router };
