(function tester(Euid) {
  'use strict';

  // Euid 모듈 멤버 추출
  var logger = Euid.logger;
  var utils = Euid.utils;

  /* -------------------------------------------------------------------------- */

  // 테스트 유틸리티
  var test = function (title, callback) {
    console.group('TEST → ' + title);
    try {
      logger.log('테스트 결과:');
      callback();
    } catch (error) {
      logger.error('테스트 실패: ' + error.message);
    }
    console.groupEnd();
  };

  // 익스펙트 유틸리티
  var expect = function (actual /* 결과 값 */) {
    return {
      toBe: function (expected /* 기대 값 */) {
        if (expected !== actual) {
          logger.error('결과 값(' + utils.serialize(actual) + ')과 기대 값("' + expected + '")이 다릅니다.');
        } else {
          logger.success('결과 값(' + utils.serialize(actual) + ')과 기대 값("' + expected + '")이 같습니다.');
        }
      },
      notToBe: function (expected) {
        // ...
      },
      toBeGreaterThan: function (expected) {
        // ...
      },
      toBeLessThan: function (expected) {
        // ...
      },
    };
  };

  Euid.tester = {
    test,
    expect,
  };
})((window.Euid = window.Euid || {}));
