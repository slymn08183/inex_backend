const WarningConstants = {

    // STRINGS
    PROVIDE_EMAIL:"You have to provide an email!",
    PROVIDE_VALID_EMAIL:"You have to provide a valid email!",
    PROVIDE_NAME:"You have to provide a name!",
    PASSWORD_MIN_LENGTH:"Password length must be at least 6!",
    PASSWORD_MAX_LENGTH:"Password length can't be more than 20!",
    PROVIDE_PASSWORD:"You have to provide a password!",
    PROVIDE_VALID_PASSWORD:"Password must have followings: Capital letter, Special character and a Number.",

    // Game Database Warnings
    PROVIDE_VALID_PRICE_VALUES:"Given price information is not correct!",
    DESCRIPTION_MAX_LENGTH:"Description length cannot be more than 10000 character!",
    SPECS_MAX_LENGTH:"Specification length cannot be more than 2000 character!"
}

const DatabaseConstants = {
    // Game entity fields

    GAME_STORES:"gameStores",
    GAME_IDENTIFIER:"identifier",

    GAME_PRICE:"gamePrices",
    GAME_ORIGINAL_PRICE:"originalPrice",
    GAME_DISCOUNT_PRICE:"discountPrice",
    GAME_DISCOUNT_PRICE_FMT:"fmtDiscountPrice",
    GAME_ORIGINAL_PRICE_FMT:"fmtOriginalPrice",

    GAME_DESCRIPTION:"gameDescription",
    GAME_SHORT_DESCRIPTION:"shortDescription",
    GAME_LONG_DESCRIPTION:"longDescription",


    GAME_PUBLISHERS:"gamePublishers",
    GAME_DEVELOPERS:"gameDevelopers",
    GAME_RELEASE_DATE:"releaseDate",
    GAME_GENRES:"gameGenres",

    GAME_SPECS:"gameSpecs",
    GAME_MIN_SPECS:"minimumSpecs",
    GAME_REC_SPECS:"recommendedSpecs",

    GAME_VIDEOS:"gameVideos",
    GAME_PICTURES:"gamePictures",
    GAME_FEATURES:"gameFeatures",
    GAME_THUMBNAIL:"thumbnail",

    GAME:"game",
    GAME_URL:"url",
    GAME_NAME:"name",
    GAME_COUNTRY : "country"
}

module.exports = {
    WarningConstants,
    DatabaseConstants
};
