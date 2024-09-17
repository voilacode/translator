const express = require('express');
const router = express.Router();
const translatorController = require('../controllers/translatorController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.get('/', ensureAuthenticated, translatorController.renderIndex);
router.post('/', ensureAuthenticated, translatorController.translateText);

module.exports = router;