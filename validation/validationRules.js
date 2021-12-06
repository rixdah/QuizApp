import { validasaur } from "../deps.js";
import * as userService from "../services/userService.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const answerOptionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const registrationValidationRules = {
    email: [validasaur.isEmail, validasaur.required, validasaur.notIn(await userService.getAllEmails())],
    password: [validasaur.required, validasaur.minLength(4)],
};

export { questionValidationRules, answerOptionValidationRules, registrationValidationRules };