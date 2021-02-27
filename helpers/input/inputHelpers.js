const bcrypt = require("bcryptjs");
const {JWT_ADMIN_KEY, JWT_SECRET_KEY} = process.env;

const validateUserInput = (email, password) => {
    return email && password

}

const validateLastChangedAt = (tokenLastChangedAt, lastChangedAt) => {
    return Date.parse(tokenLastChangedAt) >= lastChangedAt
}

const compareSecretKey = (secret) => {
    return secret === process.env.JWT_INTERNAL_SECRET_KEY
}

const compareInternalSecretKey = (secret) => {
    return secret === process.env.JWT_INTERNAL_SECRET_KEY
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
    validateUserInput,
    comparePassword,
    validateLastChangedAt,
    compareSecretKey,
    compareInternalSecretKey
}