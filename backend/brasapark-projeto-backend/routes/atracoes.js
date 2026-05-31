const express = require('express');
const router = express.Router();

const controller = require('../controllers/atracoesController');

router.get('/', controller.GET);
router.post('/', controller.POST);
router.put('/:id', controller.PUT);
router.delete('/:id', controller.DELETE);

module.exports = router;
