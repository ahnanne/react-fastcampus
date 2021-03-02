(function DOM(global, Euid) {
  'use strict';

  /* -------------------------------------------------------------------------- */
  // 의존 모듈 검사

  if (!Euid) {
    throw new Error('DOM 모듈이 정상 작동하려면 Euid 모듈이 필요합니다.');
  }

  /* -------------------------------------------------------------------------- */

  // Euid 모듈 멤버 추출
  var utils = Euid.utils;

  //  utils 멤버 추출
  var isString = utils.isString;
  var isFunction = utils.isFunction;
  var makeArray = utils.makeArray;
  var mixins = utils.mixins;

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

  var getById = function (idName) {
    return document.getElementById(idName);
  };

  var getNode = function (selector, context) {
    return (context || document).querySelector(selector);
  };

  var getNodeList = function (selector, context) {
    return (context || document).querySelectorAll(selector);
  };

  /* -------------------------------------------------------------------------- */

  // vNode 생성 유틸리티
  var createElement = function () {
    // arguments → args 배열 변경
    var args = makeArray(arguments);
    var type = args[0];
    var props = args[1] || {};
    var children = args.slice(2); // 나머지 인자 집합(배열)

    props.children = children;

    // type이 함수 컴포넌트인 경우
    if (isFunction(type)) {
      // 함수 호출 (props 전달)
      return type.call(null, props);
    }

    return {
      type: type,
      props: props,
    };
  };

  // [비공개] 속성 바인딩 유틸리티
  var _bindProps = function (element, props) {
    // props 복제
    var props = mixins(props);

    // children 속성 제거
    delete props.children;

    var propValues = Object.entries(props);
    propValues.forEach(function (propValue) {
      var prop = propValue[0];
      var value = propValue[1];

      // 클래스 속성 설정
      if (prop === 'className') {
        element.classList.add(value);
      }

      // 이벤트 속성
      var isEventProp = /^on/.test(prop);
      var propIsClassName = prop !== 'className';

      if (isEventProp && propIsClassName) {
        element.addEventListener(prop.replace(/on/, '').toLowerCase(), value);
      }

      // 나머지 속성
      if (!isEventProp && propIsClassName) {
        element.setAttribute(prop, value);
      }
    });
  };

  // [비공개] vNode 렌더링 유틸리티
  var _renderElement = function (vNode) {
    // vNode가 텍스트인 경우
    if (isString(vNode)) {
      return document.createTextNode(vNode);
    }

    // vNode = {type, props}
    // 요소 생성
    var element = document.createElement(vNode.type);

    // 속성 바인딩
    _bindProps(element, vNode.props);

    // 자식(들) 순환
    vNode.props.children
      // 재귀 호출
      .map(_renderElement)
      // 자식 노드 마운트
      .forEach(function (childNode) {
        element.appendChild(childNode);
      });

    // 요소 반환
    return element;
  };

  /* -------------------------------------------------------------------------- */

  // vNode → DOM 노드 마운트(mount)
  var render = function (vNode, domNode) {
    domNode.appendChild(_renderElement(vNode));
  };

  /* -------------------------------------------------------------------------- */
  // 모듈 내보내기

  global.DOM = {
    getById,
    getNode,
    getNodeList,
    createElement,
    render,
  };
})(window, window.Euid);
