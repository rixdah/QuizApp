import * as answerOptionService from "../../services/answerOptionService.js";
import * as questionService from "../../services/questionService.js";
import { answerOptionValidationRules } from "../../validation/validationRules.js";
import { validasaur } from "../../deps.js";
import * as quizService from "../../services/quizService.js";

const getAnswerOptionData = async (request, params) => {
    const body = request.body({type: "form"});
    const values = await body.value;
    let is_correct;
    if (values.get("is_correct")) {
        is_correct = true;
    } else {
        is_correct = false;
    }
    return {
        question_id: params.id,
        option_text: values.get("option_text"),
        is_correct: is_correct,
        errors: [],
    };
};

const addAnswerOption = async ({ request, response, params, render }) => {
    const answerOptionData = await getAnswerOptionData(request, params);

    const [passes, errors] = await validasaur.validate(
        answerOptionData,
        answerOptionValidationRules,
    );
    const answerOptions = await answerOptionService.getAnswerOptions(params.id);
    const correctAnswer = await answerOptionService.getCorrectAnswer(params.id);

    if (!passes) {
        answerOptionData.errors.push(errors);
        render("question.eta", { question: await questionService.getQuestionById(params.id),
                                 answer_options: answerOptions,
                                 errors: answerOptionData.errors[0],
                                 population: answerOptionData});
    } else if (answerOptions.length >= 4) {
        render("question.eta", { question: await questionService.getQuestionById(params.id),
                                 answer_options: answerOptions,
                                 error: {error: "You can only submit 4 answer options at most"},
                                 population: answerOptionData});
    } else if (correctAnswer.length === 1 && answerOptionData.is_correct) {
        render("question.eta", { question: await questionService.getQuestionById(params.id),
                                 answer_options: answerOptions,
                                 error: {error: "You can only have one correct answer option"},
                                 population: answerOptionData});
    } else {
        await answerOptionService.addAnswerOption(answerOptionData.question_id, answerOptionData.option_text, answerOptionData.is_correct);
        response.redirect(`/questions/${answerOptionData.question_id}`);
    }
};

const deleteAnswerOption = async ({ response, params }) => {
    await quizService.deleteAllAnswersForAnAnswerOption(params.optionId);
    await answerOptionService.deleteAnswerOption(params.optionId, params.questionId);
    response.redirect(`/questions/${params.questionId}`);
};

export { addAnswerOption, deleteAnswerOption };