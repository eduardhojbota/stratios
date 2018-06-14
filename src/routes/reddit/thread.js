const snoowrap = require('../../modules/snoowrap')
const express = require('express')
const router = express.Router()
const dataProcessing = require('../../modules/data-processing')

router.get('/thread/:threadId', async function (req, res, next) {
    try {
        snoowrap.thread(req.params.threadId).then(payload => {
            res.send({
                data: dataProcessing.thread(payload)
            })
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router