(function utils(Euid) {
  'use strict';

  /* -------------------------------------------------------------------------- */
  // 타입 검사 유틸리티

  var typeIs = function (data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  };

  var isNumber = function (data) {
    return typeIs(data) === 'number';
  };

  var isString = function (data) {
    return typeIs(data) === 'string';
  };

  var isBoolean = function (data) {
    return typeIs(data) === 'boolean';
  };

  var isFunction = function (data) {
    return typeIs(data) === 'function';
  };

  var isArray = function (data) {
    return typeIs(data) === 'array';
  };

  var isObject = function (data) {
    return typeIs(data) === 'object';
  };

  /* -------------------------------------------------------------------------- */
  // 배열 유틸리티

  var makeArray = function (likeArray) {
    return Array.prototype.slice.call(likeArray);
  };

  /* -------------------------------------------------------------------------- */
  // 시리얼라이즈 유틸리티
  
  var serialize = function(data, prettiy) {
    return !prettiy ? JSON.stringify(data) : JSON.stringify(data, null, 2) 
  }

  var deserialize = function(json) {
    return JSON.parse(json)
  }

  /* -------------------------------------------------------------------------- */
  // 믹스인 유틸리티

  var mixins = function () {
    return makeArray(arguments).reduce(function (o1, o2) {
      for (var key in o2) {
        if (o2.hasOwnProperty(key)) {
          var o1Value = o1[key];
          var o2Value = o2[key];
          if (isObject(o2Value)) {
            o1Value && _checkValueType(isObject, o1Value, key)
            o1[key] = mixins(o1Value || {}, o2Value);
          } 
          else if (isArray(o2Value)) {
            o1Value && _checkValueType(isArray, o1Value, key)
            o1[key] = (o1Value || []).concat(o2Value);
          } 
          else {
            o1[key] = o2Value;
          }
        }
      }
      return o1;
    }, {});
  };

  var _checkValueType = function(method, value, key) {
    if (!method(value)) {
      var message = '혼합할 각 객체 ' + key + ' 속성 유형이 다릅니다.';
      if (Euid.logger) {
        Euid.logger.error(message)
      } else {
        throw new Error(message);
      }
    }
  }

  /* -------------------------------------------------------------------------- */
  // 모듈 내보내기

  Euid.utils = {
    typeIs: typeIs,
    isNumber: isNumber,
    isString: isString,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isArray: isArray,
    isObject: isObject,
    makeArray: makeArray,
    serialize: serialize,
    deserialize: deserialize,
    mixins: mixins,
  };
})(window.Euid = window.Euid || {});
