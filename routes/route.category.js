const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.category');


router.route('/')
.get(controller.fetchAllCategory)
.post(controller.addCategory)
.put(controller.updateCategory)

router.route('/:id')
.delete(controller.deleteCategory)


module.exports = router;
