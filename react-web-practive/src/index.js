// window.React가 존재하는지 검토
console.log(React);
// window.ReactDOM이 존재하는지 검토
console.log(ReactDOM);

// icon element
const iconElement = React.createElement('img', {
  src: '/assets/icons/up-arrow.svg',
  alt: '',
  height: 12,
  key: 'a123', // 임의의 key값 부여(key값 없으면 warning 뜸)
});

// button element
const buttonElement = React.createElement(
  'button',
  {
    type: 'button',
    className: 'button',
    // class라고 안하는 것에 주의! (class는 js에서 예약어이기 때문)
    disabled: 'disabled',
    // 또는 disabled: ture,
    children: ['업로드 중', iconElement],
  }
  // '업로드', -> text에는 key값 없어도 상관없음.
  // iconElement
);

// 생성된 vNode(virtual Node)를 검토함.
console.log(buttonElement);

// ReactDOM API를 사용하여 가상 DOM 노드를 실제 DOM 노드에 마운트하기
const rootNode = document.getElementById('root');
ReactDOM.render(buttonElement, rootNode);

// 리액트는 웹팩이나 바벨 없이도 웹에서 돌아간다!
