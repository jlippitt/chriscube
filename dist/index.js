import React from 'react';
import { render } from 'react-dom';
import ChrisCube from './ChrisCube';
const container = document.getElementById('container');
if (!container) {
    throw new Error('Could not find "container" element');
}
render(React.createElement(ChrisCube, { width: 640, height: 480 }), container);
