import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as statisticsService from "../services/statisticsService.js";
import * as quizService from "../services/quizService.js";
import * as userService from "../services/userService.js";
import * as answerOptionService from "../services/answerOptionService.js";
import * as questionService from "../services/questionService.js";

Deno.test({
    name: "Test that function getCorrectAnswerAmount returns the right amount of correct answers for a specific user",
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
        const correctAnswerId = await answerOptionService.getCorrectAnswerId(questionId);
        for (let i = 0; i < 10; i++){
            await quizService.storeAnswer(userId, questionId, correctAnswerId[0].id, true);
        }
        const numberOfCorrectAnswers = await statisticsService.getCorrectAnswerAmount(userId);
        await quizService.deleteAllAnswersForAnAnswerOption(correctAnswerId[0].id);
        await answerOptionService.deleteAnswerOptions(questionId);
        await questionService.deleteQuestion(questionId);
        await userService.deleteAllUsers();
        assertEquals(Number(numberOfCorrectAnswers[0].count), 10);


    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: `Test that function getUsersWithMostAnsweredQuestions returns the top 5 users with most
           answers to questions ordered from most questions to least in the top 5`,
    async fn() {
        await userService.addUser('alice@mail.com', 'alice');
        await userService.addUser('bob@mail.com', 'bob');
        await userService.addUser('caitlyn@mail.com', 'caitlyn');
        await userService.addUser('david@mail.com', 'david');
        await userService.addUser('eric@mail.com', 'eric');
        await userService.addUser('fatmidget@mail.com', 'fatmidget');
        const result = await userService.findUserByEmail("alice@mail.com");
        const userId = result[0].id;
        await questionService.addQuestion(userId, "Math question", "What is 2+2?");
        const question = await questionService.getQuestions(userId);
        const questionId = question[0].id;
        await answerOptionService.addAnswerOption(questionId, "10", false);
        await answerOptionService.addAnswerOption(questionId, "5", false);
        await answerOptionService.addAnswerOption(questionId, "8", false);
        await answerOptionService.addAnswerOption(questionId, "4", true);
        const correctAnswerId = await answerOptionService.getCorrectAnswerId(questionId);
        for (let i = 0; i < 25; i++){
            await quizService.storeAnswer(userId, questionId, correctAnswerId[0].id, true);
        }
        for (let i = 0; i < 15; i++){
            await quizService.storeAnswer(Number(userId+1), questionId, correctAnswerId[0].id, true);
        }
        for (let i = 0; i < 54; i++){
            await quizService.storeAnswer(Number(userId+2), questionId, correctAnswerId[0].id, true);
        }
        for (let i = 0; i < 10; i++){
            await quizService.storeAnswer(Number(userId+3), questionId, correctAnswerId[0].id, true);
        }
        for (let i = 0; i < 5; i++){
            await quizService.storeAnswer(Number(userId+4), questionId, correctAnswerId[0].id, true);
        }
        for (let i = 0; i < 2; i++){
            await quizService.storeAnswer(Number(userId+5), questionId, correctAnswerId[0].id, true);
        }

        const usersWithMostAnsweredQuestions = await statisticsService.getUsersWithMostAnsweredQuestions();
        await quizService.deleteAllAnswersForAnAnswerOption(correctAnswerId[0].id);
        await answerOptionService.deleteAnswerOptions(questionId);
        await questionService.deleteQuestion(questionId);
        await userService.deleteAllUsers();
        assertEquals(usersWithMostAnsweredQuestions, [
            { email: "caitlyn@mail.com", count: 54n },
            { email: "alice@mail.com", count: 25n },
            { email: "bob@mail.com", count: 15n },
            { email: "david@mail.com", count: 10n },
            { email: "eric@mail.com", count: 5n }
          ]);


    },
    sanitizeResources: false,
    sanitizeOps: false,
});