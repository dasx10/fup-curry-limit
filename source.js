const curryLimitCore = require('fup-curry-limit-core');

const curryLimit = Object.assign(function (limit, executor, ...parameters) {
    switch (arguments.length) {
        case 0  : return curryLimit;
        case 1  : return (executor, ...parameters) => curryLimit(limit, executor, ...parameters);
        default : {
            let parametersLength = parameters.length;
            return limit < parametersLength
            ? Object.defineProperty((...nextParameters) => curryLimitCore(limit, executor, ...parameters, ...nextParameters), 'length', {
                enumerable   : false,
                configurable : false,
                writable     : false,
                value        : limit - parametersLength
            })
            : executor(...parameters);
        }
    };
}, {
    core: curryLimitCore
});

module.export = curryLimit;
