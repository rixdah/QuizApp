import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as quizService from "../services/quizService.js";

Deno.test({
    name: "Test that function getRandomQuestion returns null when no questions exist",
    async fn() {
        const result = await quizService.getRandomQuestion();
        assertEquals(result, null);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});