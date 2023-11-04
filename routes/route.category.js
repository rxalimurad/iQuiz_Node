const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.category');


router.route('/')
.get(controller.fetchAllCategory)
.post(controller.addCategory)

router.route('/:id')
.put(controller.updateCategory)
.delete(controller.deleteCategory)


module.exports = router;
