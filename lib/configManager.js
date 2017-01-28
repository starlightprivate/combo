'use strict';

const config = {
  autopilot: {
    key : 'dfec2c98885c47789c8d5c52a2a8fad5',
    clientlist: 'contactlist_59EA0BF8-46D0-4733-B6C5-4F2EB7C890AA'
  },
  newRelic:{
    app_name: ['TacticalMastery API'],
    license_key: '1b75b09c1d7ca8692bcb9792117eea7ac12fea38',
    logging: {
      level: 'info'
    }
  },
  konnective: {
    loginId: 'flashlightsforever',
    password: 'gCx3N8DGqDhTTh'
  },
  leadoutpost: {
    apiKey : 'CITg0XHH3kGJQ4kkjZizRxzUEINR2nZaLRRstUyHs',
    campaignId: 5
  },
  email: 'support@tacticalmastery.com',
  redis: {
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  secret : process.env.SECRET || '2ab7734c730bb56ee1b6c5205346ae61373b3f6f', //to salt sessions and implement CSRF
  ravenMiddleWareUri :'https://547e29c8a3854f969ff5912c76f34ef0:62c29411c70e46df81438b09d05526b0@sentry.io/106191',
  ENV : process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 3000
};

module.exports = exports = config;