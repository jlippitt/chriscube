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

  let then = 0;

  const render = (now: number) => {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    drawScene({
      gl,
      programInfo,
      buffers,
      deltaTime,
    });

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

main();
