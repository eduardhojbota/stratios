const snoowrap = require('../../modules/snoowrap')
const express = require('express')
const router = express.Router()
const dataProcessing = require('../../modules/data-processing')
const cache = require('express-cache-route')({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth_pass: process.env.REDIS_PASSWORD,
    expire: 60 * 60
});

router.get('/user/:username/:analysisLevel?', cache.route(), async function (req, res, next) {
    try {
        snoowrap.user(req.params.username).then(payload => {
            res.send({
                data: dataProcessing.user(payload, req.params.analysisLevel)
            })
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router