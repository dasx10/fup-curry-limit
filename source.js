const curryLimitCore = require('fup-curry-limit-core');

const curryLimit = Object.assign(function (limit, executor, ...parameters) {
    switch (arguments.length) {
        case 0  : return curryLimit;
        case 1  : return (executor, ...parameters) => curryLimit(limit, executor, ...parameters);
        default : return limit < parameters.length
            ? (...nextParameters) => curryLimitCore(limit, ...parameters, ...nextParameters)
            : executor(...parameters);
    };
}, {
    core: require('fup-curry-limit-core')
});

module.export = curryLimit;
