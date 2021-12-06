import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
    await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2)", email, password);
};

const findUserByEmail = async (email) => {
    const result = await executeQuery("SELECT * FROM users WHERE email = $1", email);
    return result.rows;
};

const getAllEmails = async () => {
    const result = await executeQuery("SELECT email FROM users");
    const emails = [];
    if (result.rows && result.rows.length > 0) {
        result.rows.forEach((row) => {
            emails.push(row.email);
        });
    }
    return emails;
};

// Delete functions only used for deleting test case users
const deleteUserByEmail = async (email) => {
    await executeQuery("DELETE from users WHERE email = $1", email);
};

const deleteAllUsers = async () => {
    await executeQuery("DELETE FROM users");
};

export { addUser, findUserByEmail, getAllEmails,deleteUserByEmail, deleteAllUsers };