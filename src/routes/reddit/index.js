'use strict'

const express = require('express')
const router = express.Router()

router.use('/', require('./thread'))
router.use('/', require('./user'))

module.exports = router
