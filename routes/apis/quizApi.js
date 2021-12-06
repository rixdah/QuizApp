import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const getRandomQuestion = async ({ response }) => {
    const randomQuestionId = await quizService.getRandomQuestion();
    const randomQuestion = await questionService.getQuestionById(Number(randomQuestionId));
    if (randomQuestion) {
        const answerOptions = await answerOptionService.getAnswerOptions(randomQuestionId);
        const options = [];
        for (let i = 0; i < answerOptions.length; i++) {
            options.push({optionId: answerOptions[i].id, optionText: answerOptions[i].option_text});
        }
        response.body = {
            questionId: randomQuestion.id,
            questionTitle: randomQuestion.title,
            questionText: randomQuestion.question_text,
            answerOptions: options,
        };
    } else {
        response.body = {};
    }
};

const answerToQuestion = async ({ request, response }) => {
    const body = request.body({type: "json"});
    const params = await body.value;
    const correctAnswerId = await answerOptionService.getCorrectAnswerId(params.questionId);
    if (Number(params.optionId) === correctAnswerId[0].id) {
        response.body = {correct: true};
    } else {
        response.body = {correct: false};
    }
}

export { getRandomQuestion, answerToQuestion };