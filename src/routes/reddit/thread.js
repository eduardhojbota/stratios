const snoowrap = require('../../modules/snoowrap')
const express = require('express')
const router = express.Router()
const dataProcessing = require('../../modules/data-processing')
const cache = require('express-cache-route')({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASSWORD
});

router.get('/thread/:threadId/:analysisLevel?', cache.route(), async function (req, res, next) {
    try {
        snoowrap.thread(req.params.threadId).then(payload => {
            // res.send(payload)
            res.send({
                data: dataProcessing.thread(payload, req.params.analysisLevel)
            })
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router