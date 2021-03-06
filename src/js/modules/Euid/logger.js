const logger = (() => {
  const MESSAGE_STYLES = {
    log: `
      color: #1c1c1d;
      font-weight: bold;
    `,
    // 템플릿 리터럴 등장 이전에는 개행을 위해 위와 같이 escape sequence를 사용했음.
    // ✨현재는 템플릿 리터럴 지원되니 백틱 사용하여 변경할 것! (과제)
    success: `
      color: #00c712;
      font-weight: bold;
    `,
    info: `
      color: #006afc;
      font-weight: bold;
    `,
    warn: `
      color: #ff9500;
      font-weight: bold;
    `,
    error: `
      color: #ee3327;
      font-weight: bold;
    `,
  };

  const log = (message, messageStyle = MESSAGE_STYLES.log) => {
    console.log(`%c ${message} ${messageStyle}`);
  };

  const info = message => log(`🔵 ${message}`, MESSAGE_STYLES.info);

  const success = message => log(`🟢 ${message}`, MESSAGE_STYLES.success);

  const warn = message => log(`🟠 ${message}`, MESSAGE_STYLES.warn);

  const error = message => log(`🔴 ${message}`, MESSAGE_STYLES.error);

  return {
    log,
    info,
    success,
    warn,
    error,
  };
})();

/* -------------------------------------------------------------------------- */
// 메시지 유틸리티
// ✨Arrow Function과 템플릿 리터럴 이용하여 바꾸기(과제)

// default 파라미터 선언 방법 등장 이전
// ✨ES6 문법에 따라 바꾸기(과제)
/* -------------------------------------------------------------------------- */
// 모듈 내보내기
export default logger;

// ✨ES6 표준 방식(export)으로 내보내기(과제)
