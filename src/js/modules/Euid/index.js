import loggerFunc from './logger.js';
import utilsFunc from './utils.js';
import testerFunc from './tester.js';

const Euid = () => {
  const logger = loggerFunc();
  const utils = utilsFunc();
  const tester = testerFunc();

  return {
    logger,
    utils,
    tester,
  };
};

/** @Euid 모듈 엔트리 파일 */

export default Euid;
