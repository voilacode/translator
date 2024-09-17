const express = require('express');
const translatorController = require('../controllers/translatorController');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();
const db = require('../config/db');
const { getLanguagesFromAPI } = require('../services/languageService');

router.get('/', ensureAuthenticated, async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const availableLanguages = await getLanguagesFromAPI();
  const userId = req.session.user.id;

  db.query('SELECT languages, translations FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) {
      return res.redirect('/login');
    }

    let userLanguages = results[0].languages;
    const translationsCount = results[0].translations || 0;

    if (!userLanguages) {
      userLanguages = availableLanguages.map(lang => lang.code);
    } else {
      userLanguages = userLanguages.split(',');
    }

    res.render('index', {
      translatedText: null,
      user: req.session.user,
      userLanguages,
      availableLanguages,
      translationsCount
    });
  });
});

router.post('/translate', ensureAuthenticated, translatorController.translateText);

module.exports = router;
