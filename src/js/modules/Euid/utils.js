import logger from './logger.js';

const utils = () => {
  /* -------------------------------------------------------------------------- */
  // 타입 검사 유틸리티

  const typeIs = data => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

  const isNumber = data => typeIs(data) === 'number';

  const isString = data => typeIs(data) === 'string';

  const isBoolean = data => typeIs(data) === 'boolean';

  const isFunction = data => typeIs(data) === 'function';

  const isArray = data => typeIs(data) === 'array';

  const isObject = data => typeIs(data) === 'object';

  /* -------------------------------------------------------------------------- */
  // 배열 유틸리티

  const makeArray = likeArray => [...likeArray];
  // const makeArray = likeArray => Array.prototype.slice.call(likeArray);

  /* -------------------------------------------------------------------------- */
  // 시리얼라이즈 유틸리티

  const serialize = (data, prettiy) => {
    return !prettiy ? JSON.stringify(data) : JSON.stringify(data, null, 2);
  };

  const deserialize = json => JSON.parse(json);

  /* -------------------------------------------------------------------------- */
  // 믹스인 유틸리티

  const _checkValueType = (method, value, key) => {
    if (!method(value)) {
      const message = '혼합할 각 객체 ' + key + ' 속성 유형이 다릅니다.';
      if (logger) {
        logger.error(message);
      } else {
        throw new Error(message);
      }
    }
  };

  const mixins = (...arg) => {
    return makeArray(arg).reduce((o1, o2) => {
      for (const key in o2) {
        if (o2.hasOwnProperty(key)) {
          const o1Value = o1[key];
          const o2Value = o2[key];
          if (isObject(o2Value)) {
            o1Value && _checkValueType(isObject, o1Value, key);
            o1[key] = mixins(o1Value || {}, o2Value);
          } else if (isArray(o2Value)) {
            o1Value && _checkValueType(isArray, o1Value, key);
            o1[key] = (o1Value || []).concat(o2Value);
          } else {
            o1[key] = o2Value;
          }
        }
      }
      return o1;
    }, {});
  };

  /* -------------------------------------------------------------------------- */
  // 모듈 내보내기
  return {
    typeIs,
    isNumber,
    isString,
    isBoolean,
    isFunction,
    isArray,
    isObject,
    makeArray,
    serialize,
    deserialize,
    mixins,
  };
};

export default utils;
