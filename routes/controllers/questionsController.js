import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";
import { questionValidationRules } from "../../validation/validationRules.js";

const getQuestionData = async (request) => {
    const body = request.body({type: "form"});
    const params = await body.value;
    return {
        title: params.get("title"),
        question_text: params.get("question_text"),
        errors: [],
    };
};

const addQuestion = async ({ request, response, user, render }) => {
    const questionData = await getQuestionData(request);

    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
    );
    
    if (!passes) {
        questionData.errors.push(errors);
        const questions = await questionService.getQuestions(user.id);
        render("questions.eta", {errors: questionData.errors[0], questions: questions, population: questionData});
    } else {
        await questionService.addQuestion(user.id, questionData.title, questionData.question_text);
        response.redirect("/questions");
    }


};

const listQuestions = async ({ render, user }) => {
    render("questions.eta", { questions: await questionService.getQuestions(user.id), population: {}});
};

export { addQuestion, listQuestions };