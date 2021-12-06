import { executeQuery } from "../database/database.js";

const getRandomQuestion = async () => {
    const result = await executeQuery(`SELECT questions.id, COUNT (question_answer_options.id) as count
                                       FROM questions JOIN question_answer_options
                                       ON questions.id = question_answer_options.question_id
                                       GROUP BY questions.id;`);
    const questions = [];
    result.rows.forEach((row) => {
        if (row.count == 4){
            questions.push(row.id);
        }
    });

    if (questions.length > 0) {
        return questions[Math.floor(Math.random()*questions.length)];
    }

    return null;
};

const storeAnswer = async (user_id, question_id, option_id, correct) => {
    await executeQuery(`INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct)
                        VALUES ($1, $2, $3, $4)`, user_id, question_id, option_id, correct);
};

const deleteAllAnswersForAnAnswerOption = async (question_answer_option_id) => {
    await executeQuery("DELETE FROM question_answers WHERE question_answer_option_id = $1", question_answer_option_id);
};

export { getRandomQuestion, storeAnswer, deleteAllAnswersForAnAnswerOption };