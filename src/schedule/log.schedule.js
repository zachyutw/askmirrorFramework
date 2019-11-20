const schedule = require('node-schedule');
const command = require('../command/command');

export const job = schedule.scheduleJob('*/5 * * * * *', async () => {
    // const result = await axios.get('http://localhost:5000/api/user');

    command();

    console.log(new Date());
});

const task = () => {
    const job = job;
};

module.exports = task;

// module.exports =  () => {
//     const job = job;
// };
