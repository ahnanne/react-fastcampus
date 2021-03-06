import logger from './logger.js';
import utils from './utils.js';
import tester from './tester.js';

const Euid = (() => {
  return {
    logger,
    utils,
    tester,
  };
})();

/** @Euid 모듈 엔트리 파일 */

console.log(Euid);
/*
{
  logger: {
    log: [Function: log],
    info: [Function: info],
    success: [Function: success],
    warn: [Function: warn],
    error: [Function: error]
  },
  utils: {
    typeIs: [Function: typeIs],
    isNumber: [Function: isNumber],
    isString: [Function: isString],
    isBoolean: [Function: isBoolean],
    isFunction: [Function: isFunction],
    isArray: [Function: isArray],
    isObject: [Function: isObject],
    makeArray: [Function: makeArray],
    serialize: [Function: serialize],
    deserialize: [Function: deserialize],
    mixins: [Function: mixins]
  },
  tester: { test: [Function: test], expect: [Function: expect] }
}
*/
export default Euid;
