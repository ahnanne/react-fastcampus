import { createElement, createElement as h } from 'react';
import islandImage from '../assets/pexels-simon-migaj-1529662.jpg';

export default function imageIsland() {
  return createElement('img', {
    src: islandImage,
    alt: '섬 근처 수역에 서있는 사람',
  });
}
