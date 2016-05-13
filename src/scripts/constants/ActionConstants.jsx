var keyMirror = require('keymirror');

module.exports = {

    ActionTypes: keyMirror({
        MARKET_NEW_CHANGE: null, // when new data comes from market
        PORTFOLIO_NEW_ITEM: null, // when we have new trade/option created
        PORTFOLIO_EXPIRED_ITEM: null, // when the trade reaches maturity/option expires
        TRADE_NEW_OPTION: null, // when we submit form
        TRADE_UNSUBMITED: null
    })
};