const snoowrap = require('../../modules/snoowrap')
const analytics = require('../../modules/analytics')
const express = require('express')
const router = express.Router()

router.get('/thread/:threadId', async function (req, res, next) {
    try {
        snoowrap.thread(req.params.threadId).then(payload => {
            var a = analytics.dataProcessing.thread(payload);
            res.send({
                data: a
            })
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router