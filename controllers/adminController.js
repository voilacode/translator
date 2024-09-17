const userModel = require('../models/userModel');

exports.adminPage = (req, res) => {
  const currentUser = req.session.user; // Get the logged-in user from session

  if (currentUser.role === 'user') {
    return res.redirect('/');
  }

  // Fetch all users from the database
  userModel.getAllUsers((err, results) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }

    res.render('admin', { users: results, currentUser });
  });
};
