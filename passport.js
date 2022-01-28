const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('./models');

module.exports = () => {
  passport.serializeUser(function(user, done){ // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser(function(user, done){ // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'pw',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, pw, done) => {
    models.Member.findOne({ where: {member_ID: id} })
    .then(result => {
      if (!result) console.log('no data');
      return done(null, result);
    });
  }));
};