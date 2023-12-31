const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.history');

router.route('/single/:id')
.get(controller.fetchHistory)
router.route('/:id')
.get(controller.fetchDetailHistory)

router.route('/')
.get(controller.fetchAllHistory)
.post(controller.addHistory)
module.exports = router;
