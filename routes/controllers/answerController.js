import * as questionService from "../../services/questionService.js"
import * as answerOptionService from "../../services/answerOptionService.js";

const showCorrect = async ({ render }) => {
    render("answerView.eta", {correct: true});
};

const showIncorrect = async ({ params, render }) => {
    const question = await questionService.getQuestionById(params.id);
    const questionId = question.id;
    const correctAnswer = await answerOptionService.getCorrectAnswer(params.id);
    render("answerView.eta", { correct: false, correctAnswer: correctAnswer[0] });
};

export { showIncorrect, showCorrect };