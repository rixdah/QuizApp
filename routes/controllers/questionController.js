import * as questionService from "../../services/questionService.js";
import * as answerOptionService from "../../services/answerOptionService.js";

const showQuestion = async ({ render, params }) => {
    const answerOptions = await answerOptionService.getAnswerOptions(params.id)
    render("question.eta", { question: await questionService.getQuestionById(params.id),
                             answer_options: answerOptions,
                             population: {} })
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.id);

    response.redirect("/questions");
};

export { showQuestion, deleteQuestion };