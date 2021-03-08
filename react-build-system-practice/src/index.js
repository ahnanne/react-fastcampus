import { createElement as h } from 'react';
import { render } from 'react-dom';
import renderIsland from './example/imageIsland';

const iconElement = h('img', {
  key: 'child-kfjw2',
  alt: '',
  src: '/assets/icons/spinner.svg',
  height: 12,
});

const buttonElement = h(
  'button',
  {
    type: 'button',
    className: 'button button__upload button--pending',
    onClick(e) {
      console.log(e.target);
    },
  },
  '업로드 중',
  iconElement
);

const rootNode = document.getElementById('root');
render(buttonElement, rootNode);
render(renderIsland(), rootNode);
