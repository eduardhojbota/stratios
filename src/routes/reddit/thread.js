const snoowrap = require('../../modules/snoowrap')
const express = require('express')
const router = express.Router()
const dataProcessing = require('../../modules/data-processing')

router.get('/thread/:threadId/:analysisLevel?', async function (req, res, next) {
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