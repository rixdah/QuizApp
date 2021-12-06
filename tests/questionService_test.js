import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as questionService from "../services/questionService.js";
import * as userService from "../services/userService.js";

Deno.test({
    name: "Test that adding a question adds a question that can be seen when using function getQuestions",
    async fn() {
        await userService.addUser("test@mail.com", "test_password");
        const result = await userService.findUserByEmail("test@mail.com");
        const userId = result[0].id;
        await questionService.addQuestion(userId, "Math question", "What is 2+2?");
        const question = await questionService.getQuestions(userId);
        const questionId = question[0].id;
        delete question[0].id;
        assertEquals(question, [{user_id: userId, title: "Math question", question_text: "What is 2+2?"}]);
        await questionService.deleteQuestion(questionId);
        await userService.deleteAllUsers();
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Test that function deleteQuestion deletes the question from the database",
    async fn() {
        await userService.addUser("test@mail.com", "test_password");
        const result = await userService.findUserByEmail("test@mail.com");
        const userId = result[0].id;
        await questionService.addQuestion(userId, "Math question", "What is 2+2?");
        const question = await questionService.getQuestions(userId);
        const questionId = question[0].id;
        await questionService.deleteQuestion(questionId);
        const response = await questionService.getQuestionById(questionId);
        assertEquals(response, undefined);
        await userService.deleteUserByEmail("test@mail.com");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});