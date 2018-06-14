const winston = require('../winston')
const snoowrap = require('snoowrap')
const fetch = require('node-fetch')
let r;

const thread = (threadId) => r.getSubmission(threadId).expandReplies({
    limit: 10,
    depth: 10
})

const user = (username) => r.getUser(username).getOverview()

const getAccessToken = () => fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    body: new URLSearchParams('grant_type=client_credentials'),
    headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(res => res.json())
.then(json => {
    winston.info('Snoowrap initialized');
    r = new snoowrap({
        userAgent: 'Firefox/60.0',
        accessToken: json.access_token
    });
})

getAccessToken();

setInterval(getAccessToken, 59 * 60 * 1000)

module.exports = {
    thread,
    user
};