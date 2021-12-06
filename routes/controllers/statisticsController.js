import * as statisticsService from "../../services/statisticsService.js";

const showAnswerCount = async ({ user, render }) => {
    const answerCount = await statisticsService.getAnswerAmount(user.id);
    const correctAnswerCount = await statisticsService.getCorrectAnswerAmount(user.id);
    let correctAnswerPercentage = Math.round((Number(correctAnswerCount[0].count)/Number(answerCount[0].count)) * 100*10)/10;
    if (isNaN(correctAnswerPercentage)) {
        correctAnswerPercentage = 0;
    }

    const answersToUserQuestions = await statisticsService.getNumberOfAnswersToUserQuestions(user.id);

    const usersWithMostAnsweredQuestions = await statisticsService.getUsersWithMostAnsweredQuestions();

    render("statistics.eta", {
        answerCount: Number(answerCount[0].count),
        correctAnswerCount: Number(correctAnswerCount[0].count),
        percentage: correctAnswerPercentage,
        answersToUserQuestions: Number(answersToUserQuestions[0].count),
        usersWithMostAnsweredQuestions: usersWithMostAnsweredQuestions,
    })
};

export { showAnswerCount };