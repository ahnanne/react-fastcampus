(function logger(Euid) {
  'use strict';

  /* -------------------------------------------------------------------------- */
  // 메시지 스타일

  var MESSAGE_STYLES = {
    log: '\
      color: #1c1c1d;\
      font-weight: bold;\
    ',
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

  function log(message, messageStyle) {
    console.log('%c' + message, messageStyle || MESSAGE_STYLES.log);
  }

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
    warn,
    error,
    success,
  };
})(window.Euid = window.Euid || {});
