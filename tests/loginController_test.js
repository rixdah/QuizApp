import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../app.js";
import { addUser, deleteUserByEmail } from "../services/userService.js";
import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

Deno.test({
    name: "Test that successful login leads into user being added into the session",
    async fn() {
        const testClient = await superoak(app);
        await addUser('test@mail.com', 'test_password');
        const response = await testClient.post("/auth/login")
        .send("email=test@mail.com password=test_password");
        
        await deleteUserByEmail("test@mail.com");
        const inSession = response.headers["set-cookie"].substring(0, 7);
        assertEquals(inSession, "session");
    },
    sanitizeResources: false,
    sanitizeOps: false,
});