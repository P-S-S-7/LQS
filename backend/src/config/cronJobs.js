import cron from 'node-cron';
import { Quiz } from '../models/quiz.model.js';

cron.schedule('0 0 * * *', async () => { // midnight every day
    try {
        const now = new Date();
        await Quiz.deleteMany({ endTime: { $lt: now } });
        console.log('Old quizzes removed successfully');
    } catch (error) {
        console.error('Error removing old quizzes:', error);
    }
});
