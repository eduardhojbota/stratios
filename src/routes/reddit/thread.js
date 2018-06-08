const snoowrap = require('../../models/snoowrap')
const express = require('express')
const router = express.Router()

router.get('/thread/:threadId', async function (req, res, next) {
    try {
        snoowrap.thread(req.params.threadId).then(payload => {
            res.send(payload)
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router