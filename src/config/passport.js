const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/mongooseModels/userMongooseModel');
const userService = require('../app/models/services/userService');
const roleServices = require('../app/models/services/roleServices');

passport.use(new LocalStrategy(async(email, password, done) => {
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        console.log(user)

        const role = await roleServices.getByID(user.role_id);
        console.log(role)

        if (role.name !== 'ADMIN') {
            return done(null, false, { message: 'Incorrect role.' });
        }

        const resultAuth = await userService.validPassword(user, password);
        if (!resultAuth) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        user.role = role;

        console.log(role);

        return done(null, user);
    } catch (err) {
        return done(err);
    };
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(function(user) {
            done(null, user);
        })
        .catch(e => done(e));
});

module.exports = passport;