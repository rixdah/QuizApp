import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as userService from "../services/userService.js";

Deno.test({
    name: "User added with function addUser is returned with function findUserByEmail",
    async fn() {
        await userService.addUser('test@mail.com', 'test_password');
        const result = await userService.findUserByEmail('test@mail.com');
        let password = result[0].password;
        const email = result[0].email;
        await userService.deleteUserByEmail('test@mail.com');
        // Adding 47 spaces to the password, because ElephantSQL adds spaces to make the password 60 characters long.
        assertEquals(password, 'test_password                                               ');
        assertEquals(email, 'test@mail.com');
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "Function getAllEmails returns all the 5 test emails just added",
    async fn() {
        await userService.addUser('alice@mail.com', 'alice');
        await userService.addUser('bob@mail.com', 'bob');
        await userService.addUser('caitlyn@mail.com', 'caitlyn');
        await userService.addUser('david@mail.com', 'david');
        await userService.addUser('eric@mail.com', 'eric');
        const result = await userService.getAllEmails();
        assertEquals(result, ['alice@mail.com', 'bob@mail.com', 'caitlyn@mail.com', 'david@mail.com', 'eric@mail.com']);
        await userService.deleteAllUsers();
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

