const bcrypt = require("bcryptjs");

const bcryptTheKey = (_this, _next) => {
    bcrypt.genSalt(parseInt(process.env.BCRYPT_GEN_SALT_ROUNDS), (err, salt) => {
        if (err) _next(err);
        bcrypt.hash(_this.password, salt,(err, hash) => {
            if (err) _next(err);
            _this.password = hash;
            _next();
        });
    });
}

module.exports = {
    bcryptTheKey,
}