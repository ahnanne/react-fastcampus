import Euid from './Euid/index.js';

// Euid
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

const DOM = (global => {
  /* -------------------------------------------------------------------------- */
  // 의존 모듈 검사

  if (!Euid) {
    throw new Error('DOM 모듈이 정상 작동하려면 Euid 모듈이 필요합니다.');
  }

  /* -------------------------------------------------------------------------- */

  // Euid 모듈 멤버 추출
  // var utils = Euid.utils;
  const { utils } = Euid;

  //  utils 멤버 추출
  const { isString, isFunction, makeArray, mixins } = utils;

  /* -------------------------------------------------------------------------- */
  // 폴리필(Polyfill)

  if (!Object.entries) {
    Object.entries = function (obj) {
      // Object.keys() IE 9+
      var ownProps = Object.keys(obj);
      var i = ownProps.length;
      var resArray = new Array(i);
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    };
  }

  /* -------------------------------------------------------------------------- */
  // 유틸리티 함수

  const getById = idName => document.getElementById(idName);
  const getNode = (selector, context) => (context || document).querySelector(selector);
  const getNodeList = (selector, context) => (context || document).querySelectorAll(selector);

  // var getById = function (idName) {
  //   return document.getElementById(idName);
  // };

  // var getNode = function (selector, context) {
  //   return (context || document).querySelector(selector);
  // };

  // var getNodeList = function (selector, context) {
  //   return (context || document).querySelectorAll(selector);
  // };

  /* -------------------------------------------------------------------------- */

  // vNode 생성 유틸리티
  const createElement = (...arg) => {
    // arguments → args 배열 변경
    const args = makeArray(arg);
    const type = args[0];
    const props = args[1] || {};
    const children = args.slice(2); // 나머지 인자 집합(배열)
    // var args = makeArray(args);
    // var type = args[0];
    // var props = args[1] || {};
    // var children = args.slice(2);

    props.children = children;

    // type이 함수 컴포넌트인 경우
    if (isFunction(type)) {
      // 함수 호출 (props 전달)
      return type.call(null, props);
    }

    return {
      type,
      props,
    };
  };

  // [비공개] 속성 바인딩 유틸리티
  const _bindProps = (element, _props) => {
    const props = mixins(_props);

    // children 속성 제거
    delete props.children;

    const propValues = Object.entries(props);

    propValues.forEach(propValue => {
      const prop = propValue[0];
      // var prop = propValue[0];
      const value = propValue[1];
      // var value = propValue[1];

      // 클래스 속성 설정
      if (prop === 'className') {
        element.classList.add(value);
      }

      // 이벤트 속성
      const isEventProp = /^on/.test(prop);
      // var isEventProp = /^on/.test(prop);
      const propIsClassName = prop !== 'className';
      // var propIsClassName = prop !== 'className';

      if (isEventProp && propIsClassName) {
        element.addEventListener(prop.replace(/on/, '').toLowerCase(), value);
      }

      // 나머지 속성
      if (!isEventProp && propIsClassName) {
        element.setAttribute(prop, value);
      }
    });
  };
  // var _bindProps = function (element, props) {
  //   // props 복제
  //   var props = mixins(props);

  //   // children 속성 제거
  //   delete props.children;

  //   var propValues = Object.entries(props);
  //   propValues.forEach(function (propValue) {
  //     var prop = propValue[0];
  //     var value = propValue[1];

  //     // 클래스 속성 설정
  //     if (prop === 'className') {
  //       element.classList.add(value);
  //     }

  //     // 이벤트 속성
  //     var isEventProp = /^on/.test(prop);
  //     var propIsClassName = prop !== 'className';

  //     if (isEventProp && propIsClassName) {
  //       element.addEventListener(prop.replace(/on/, '').toLowerCase(), value);
  //     }

  //     // 나머지 속성
  //     if (!isEventProp && propIsClassName) {
  //       element.setAttribute(prop, value);
  //     }
  //   });
  // };

  // [비공개] vNode 렌더링 유틸리티
  const _renderElement = vNode => {
    // vNode가 텍스트인 경우
    if (isString(vNode)) {
      return document.createTextNode(vNode);
    }

    // vNode = {type, props}
    // 요소 생성
    const element = document.createElement(vNode.type);
    // var element = document.createElement(vNode.type);

    // 속성 바인딩
    _bindProps(element, vNode.props);

    // 자식(들) 순환
    vNode.props.children
      // 재귀 호출
      .map(_renderElement)
      // 자식 노드 마운트
      .forEach(childNode => element.appendChild(childNode));

    // 요소 반환
    return element;
  };
  // var _renderElement = function (vNode) {
  //   // vNode가 텍스트인 경우
  //   if (isString(vNode)) {
  //     return document.createTextNode(vNode);
  //   }

  //   // vNode = {type, props}
  //   // 요소 생성
  //   var element = document.createElement(vNode.type);

  //   // 속성 바인딩
  //   _bindProps(element, vNode.props);

  //   // 자식(들) 순환
  //   vNode.props.children
  //     // 재귀 호출
  //     .map(_renderElement)
  //     // 자식 노드 마운트
  //     .forEach(function (childNode) {
  //       element.appendChild(childNode);
  //     });

  //   // 요소 반환
  //   return element;
  // };

  /* -------------------------------------------------------------------------- */

  // vNode → DOM 노드 마운트(mount)
  const render = (vNode, domNode) => domNode.appendChild(_renderElement(vNode));
  // var render = function (vNode, domNode) {
  //   domNode.appendChild(_renderElement(vNode));
  // };

  /* -------------------------------------------------------------------------- */
  // 모듈 내보내기
  return {
    getById,
    getNode,
    getNodeList,
    createElement,
    render,
  };
  // global.DOM = {
  //   getById,
  //   getNode,
  //   getNodeList,
  //   createElement,
  //   render,
  // };
})(window);

// DOM
/*
{
  getById: [Function: getById],
  getNode: [Function: getNode],
  getNodeList: [Function: getNodeList],
  createElement: [Function: createElement],
  render: [Function: render]
}
*/

export default DOM;
