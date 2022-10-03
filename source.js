const core       = require('fup-curry-limit-core');
const isFunction = require('fup-is-function');

const curryLimit = Object.assign(function (limitOrExecutor, executorOrLimit, ...parameters) {
  switch (arguments.length) {
    case 0: return curryLimit;
    case 1: {
      if (isFunction(limitOrExecutor)) return (limit, ...nextParameters) => core(limit, limitOrExecutor, ...parameters, ...nextParameters);
      const current = parseInt(limitOrExecutor);
      if (current > 1) return (executor, ...nextParameters) => core(current, executor, ...parameters, ...nextParameters);
      throw `first parameter ${limitOrExecutor} is not a positive number or function`;
    }
    default: {
           if (isFunction(limitOrExecutor)) return core(limitOrExecutor, executorOrLimit, ...parameters);
      else if (isFunction(executorOrLimit)) return core(executorOrLimit, limitOrExecutor, ...parameters);
      throw "first or second parameter is not a function";
    }
  }
}, { core });

module.export = curryLimit;
