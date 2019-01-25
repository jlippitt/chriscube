import { initBuffers } from 'buffers';
import { initShaderProgram } from 'shaders';
import { drawScene } from 'renderer';

function main(): void {
  const canvas = document.getElementById('glCanvas') as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Could not find canvas element');
  }

  const gl = canvas.getContext('webgl');

  if (!gl) {
    throw new Error('Could not initialise WebGL');
  }

  const programInfo = initShaderProgram(gl);
  const buffers = initBuffers(gl);

  drawScene(gl, programInfo, buffers);
}

main();
