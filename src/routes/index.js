'use strict'

const express = require('express')
const router = express.Router()

router.use('/reddit', require('./reddit'))

module.exports = router
