import { executeQuery } from "../database/database.js";

const addAnswerOption = async (question_id, option_text, is_correct) => {
    await executeQuery(`INSERT INTO question_answer_options
                        (question_id, option_text, is_correct) VALUES ($1, $2, $3)`,
                        question_id, option_text, is_correct);
};

const getAnswerOptions = async (question_id) => {
    const result = await executeQuery(`SELECT * FROM question_answer_options WHERE
                                       question_id = $1`, question_id);
    return result.rows;
};

const deleteAnswerOption = async (answer_option_id, question_id) => {
    await executeQuery("DELETE FROM question_answer_options WHERE id=$1 AND question_id=$2", answer_option_id, question_id);
};

const deleteAnswerOptions = async (question_id) => {
    await executeQuery("DELETE FROM question_answer_options WHERE question_id = $1", question_id);
}

const getAnswerOptionById = async (answer_option_id) => {
    const result = await executeQuery("SELECT * FROM question_answer_options WHERE id = $1", answer_option_id);
    return result.rows;
};

const getCorrectAnswer = async (question_id) => {
    const result = await executeQuery("SELECT option_text FROM question_answer_options WHERE question_id = $1 AND is_correct = true", question_id);
    return result.rows;
};

const getCorrectAnswerId = async (question_id) => {
    const result = await executeQuery("SELECT id FROM question_answer_options WHERE question_id = $1 AND is_correct = true", question_id);
    return result.rows;
}

export { addAnswerOption, getAnswerOptions, deleteAnswerOption, getAnswerOptionById, getCorrectAnswer, getCorrectAnswerId, deleteAnswerOptions };