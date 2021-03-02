// 캡슐화를 통해 보호
(function logger(Euid) {
  'use strict';

  /* -------------------------------------------------------------------------- */
  // 메시지 스타일

  var MESSAGE_STYLES = {
    log: '\
      color: #1c1c1d;\
      font-weight: bold;\
    ',
    // 템플릿 리터럴 등장 이전에는 개행을 위해 위와 같이 escape sequence를 사용했음.
    // ✨현재는 템플릿 리터럴 지원되니 백틱 사용하여 변경할 것! (과제)
    success: '\
      color: #00c712;\
      font-weight: bold;\
    ',
    info: '\
      color: #006afc;\
      font-weight: bold;\
    ',
    warn: '\
      color: #ff9500;\
      font-weight: bold;\
    ',
    error: '\
      color: #ee3327;\
      font-weight: bold;\
    ',
  };

  /* -------------------------------------------------------------------------- */
  // 메시지 유틸리티
  // ✨Arrow Function과 템플릿 리터럴 이용하여 바꾸기(과제)

  function log(message, messageStyle) {
    console.log('%c' + message, messageStyle || MESSAGE_STYLES.log);
  }
  // default 파라미터 선언 방법 등장 이전
  // ✨ES6 문법에 따라 바꾸기(과제)

  function info(message) {
    return log('🔵 ' + message, MESSAGE_STYLES.info);
  }

  function success(message) {
    return log('🟢 ' + message, MESSAGE_STYLES.success);
  }

  function warn(message) {
    return log('🟠 ' + message, MESSAGE_STYLES.warn);
  }

  function error(message) {
    return log('🔴 ' + message, MESSAGE_STYLES.error);
  }

  /* -------------------------------------------------------------------------- */
  // 모듈 내보내기

  Euid.logger = {
    log,
    info,
    warn,
    error,
    success,
  };
})(window.Euid = window.Euid || {});
// 단축 평가를 이용하여 에러 발생 방지 => ✨이것도 ES6 문법에 따라 바꿔보기(과제)

// ✨ES6 표준 방식(export)으로 내보내기(과제)