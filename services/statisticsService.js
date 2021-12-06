import { executeQuery } from "../database/database.js";

const getAnswerAmount = async (user_id) => {
    const result = await executeQuery("SELECT COUNT(user_id) FROM question_answers WHERE user_id = $1", user_id);
    return result.rows;
};

const getCorrectAnswerAmount = async (user_id) => {
    const result = await executeQuery("SELECT COUNT(user_id) FROM question_answers WHERE correct = true AND user_id = $1", user_id);
    return result.rows;
};

const getNumberOfAnswersToUserQuestions = async (user_id) => {
    const result = await executeQuery(`SELECT COUNT(question_answers.user_id) FROM question_answers JOIN questions ON
                                       questions.id = question_answers.question_id WHERE questions.user_id = $1`, user_id);
    return result.rows;
};

const getUsersWithMostAnsweredQuestions = async () => {
    const result = await executeQuery(`SELECT users.email, COUNT(question_answers.user_id) as count
                                        FROM users
                                        JOIN question_answers
                                        ON users.id = question_answers.user_id
                                        GROUP BY users.email
                                        ORDER BY count DESC
                                        LIMIT 5;`);
    return result.rows;
};

export { getAnswerAmount, getCorrectAnswerAmount, getNumberOfAnswersToUserQuestions, getUsersWithMostAnsweredQuestions };