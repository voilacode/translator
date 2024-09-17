const fetch = require('node-fetch');
const FormData = require('form-data');
const analyticsService = require('../services/analyticsService');

exports.translateText = (req, res) => {
  const { text, source_language, target_language } = req.body;
  const userId = req.session.user.id;

  const url = 'https://text-translator2.p.rapidapi.com/translate';
  const data = new FormData();
  data.append('source_language', source_language);
  data.append('target_language', target_language);
  data.append('text', text);

  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': 'ea86ec0756msh17e532df1e1c9c9p170c20jsnebad0933d91c',
      'x-rapidapi-host': 'text-translator2.p.rapidapi.com'
    },
    body: data
  };

  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      if (result && result.data && result.data.translatedText) {

        analyticsService.updateTranslationCount(userId, (err, translationsCount) => {
          if (err) {
            console.error('Error updating translations count:', err);
            res.render('index', {
              translatedText: result.data.translatedText,
              translationsCount: req.session.user.translations || 0, 
              user: req.session.user, 
              userLanguages: req.session.user.languages ? req.session.user.languages.split(',') : [],
              availableLanguages: req.session.availableLanguages || []
            });
            return;
          }

          res.render('index', {
            translatedText: result.data.translatedText,
            translationsCount,
            user: req.session.user, 
            userLanguages: req.session.user.languages ? req.session.user.languages.split(',') : [],
            availableLanguages: req.session.availableLanguages || []
          });
        });
      } else {
        throw new Error('Translation API did not return translated text');
      }
    })
    .catch(error => {
      console.error('Error translating text:', error);

      res.render('index', {
        translatedText: 'Error occurred during translation',
        translationsCount: req.session.user.translations || 0,
        user: req.session.user,
        userLanguages: req.session.user.languages ? req.session.user.languages.split(',') : [],
        availableLanguages: req.session.availableLanguages || []
      });
    });
};