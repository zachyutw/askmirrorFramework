import schedule from 'node-schedule';
import axios from 'axios';
import command from '../command/command';

export const job = schedule.scheduleJob('*/5 * * * * *', async () => {
    // const result = await axios.get('http://localhost:5000/api/user');

    command();

    console.log(new Date());
});
export default () => {
    const job = job;
};
