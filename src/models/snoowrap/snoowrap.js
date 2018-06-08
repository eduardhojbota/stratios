const snoowrap = require('snoowrap')
const fetch = require('node-fetch')

var r;

const init = () => {
    console.log('snoowrap init')
    fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: new URLSearchParams('grant_type=client_credentials'),
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(json => {
            r = new snoowrap({
                userAgent: 'Firefox/60.0',
                accessToken: json.access_token
            });
        })
}

const thread = (threadId) => {
    return r.getSubmission(threadId).expandReplies({
        limit: Infinity,
        depth: Infinity
    })
}

const user = (username) => {
    console.log(r.getUser(username).getOverview())
    return r.getUser(username).getOverview()
}

init();

module.exports = {
    thread,
    user
};