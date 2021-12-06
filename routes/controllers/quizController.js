import * as quizService from "../../services/quizService.js";
import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";

const getRandomQuestion = async ({ response, render }) => {
    const randomQuestionId = await quizService.getRandomQuestion();
    if (randomQuestionId){
        response.redirect(`/quiz/${randomQuestionId}`);
    } else {
        render("quiz.eta");
    }

};

const getUserAnswer = async ({request}) => {
    const body = request.body({type: "form"});
};

const showQuiz = async ({ render, params }) => {
    const randomQuestion = await questionService.getQuestionById(params.id);
    const answerOptions = await answerOptionService.getAnswerOptions(params.id);
    render("quiz.eta", {options: answerOptions, question: randomQuestion});
};

const addAnswer = async ({ params, user, response }) => {
    const answerOption = await answerOptionService.getAnswerOptionById(params.optionId);
    await quizService.storeAnswer(user.id, params.id, params.optionId, answerOption[0].is_correct);

    if (answerOption[0].is_correct) {
        response.redirect(`/quiz/${params.id}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/incorrect`);
    }
};

export { getRandomQuestion, getUserAnswer, showQuiz, addAnswer };