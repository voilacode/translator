const db = require('../config/db');

exports.updateTranslationCount = (userId, callback) => {
  const query = 'UPDATE users SET translations = translations + 1 WHERE id = ? AND translations < 100';
  
  db.query(query, [userId], (err) => {
    if (err) {
      console.error('Error updating translation count:', err);
      callback(err, null); 
      return;
    }

    // Fetch the updated count
    db.query('SELECT translations FROM users WHERE id = ?', [userId], (err, rows) => {
      if (err) {
        console.error('Error fetching translation count:', err);
        callback(err, null);
        return;
      }
      
      callback(null, rows[0].translations); 
    });
  });
};
