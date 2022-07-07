var express = require('express');
const router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../db');

var routergoogle = express.Router();

passport.use(new GoogleStrategy({
  clientID: '538468012193-klmb1pf02s5gkkah6h1rmk28gbqenhkm.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/oauth2/redirect/google',
  scope: 'profile' 
}, function verify(issuer, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) {
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }

        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false); }
        return cb(null, row);
      });
    }
  });
}));
// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username, name: user.name });
//   });
// });

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

routergoogle.get('/login', function(req, res, next) {
  res.render('logingooogle');
});

routergoogle.get('/login/federated/google', passport.authenticate('google'));

routergoogle.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = routergoogle;