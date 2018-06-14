const snoowrap = require('../../modules/snoowrap')
const express = require('express')
const router = express.Router()
const dataProcessing = require('../../modules/data-processing')

router.get('/user/:username', async function (req, res, next) {
    try {
        snoowrap.user(req.params.username).then(payload => {
            // res.send(payload)
            res.send({
                data: dataProcessing.user(payload)
            })
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router