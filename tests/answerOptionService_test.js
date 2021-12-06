import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as answerOptionService from "../services/answerOptionService.js";
import * as questionService from "../services/questionService.js";
import * as userService from "../services/userService.js";


Deno.test({
   name: "Test that adding answer options for a specific question works",
   async fn() {
        await userService.addUser("test@mail.com", "test_password");
        const result = await userService.findUserByEmail("test@mail.com");
        const userId = result[0].id;
        await questionService.addQuestion(userId, "Math question", "What is 2+2?");
        const question = await questionService.getQuestions(userId);
        const questionId = question[0].id;
        await answerOptionService.addAnswerOption(questionId, "10", false);
        await answerOptionService.addAnswerOption(questionId, "5", false);
        await answerOptionService.addAnswerOption(questionId, "8", false);
        await answerOptionService.addAnswerOption(questionId, "4", true);
        const answerOptions = await answerOptionService.getAnswerOptions(questionId);
        for (let i = 0; i < answerOptions.length; i++) {
            delete answerOptions[i].id;
        }
        assertEquals(answerOptions, [{question_id: questionId, option_text: "10", is_correct: false},
                                     {question_id: questionId, option_text: "5", is_correct: false},
                                     {question_id: questionId, option_text: "8", is_correct: false},
                                     {question_id: questionId, option_text: "4", is_correct: true}]);

        await answerOptionService.deleteAnswerOptions(questionId);
        await questionService.deleteQuestion(questionId);
        await userService.deleteAllUsers();
    },
   sanitizeResources: false,
   sanitizeOps: false,
});

Deno.test({
    name: "Test that getCorrectAnswer returns the correct answer after adding 4 answer options, which of 1 is correct",
    async fn() {
        await userService.addUser("test@mail.com", "test_password");
        const result = await userService.findUserByEmail("test@mail.com");
        const userId = result[0].id;
        await questionService.addQuestion(userId, "Math question", "What is 2+2?");
        const question = await questionService.getQuestions(userId);
        const questionId = question[0].id;
        await answerOptionService.addAnswerOption(questionId, "10", false);
        await answerOptionService.addAnswerOption(questionId, "5", false);
        await answerOptionService.addAnswerOption(questionId, "8", false);
        await answerOptionService.addAnswerOption(questionId, "4", true);
        const correctAnswer = await answerOptionService.getCorrectAnswer(questionId);
        assertEquals(correctAnswer, [{option_text: "4"}]);
        await answerOptionService.deleteAnswerOptions(questionId);
        await questionService.deleteQuestion(questionId);
        await userService.deleteAllUsers();
    },
    sanitizeResources: false,
    sanitizeOps: false,
});