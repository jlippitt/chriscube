import { initBuffers } from 'buffers';
import { initShaderProgram } from 'shaders';
import { drawScene } from 'renderer';
import { loadVideo, initTexture, updateTexture } from 'textures';

async function main(): Promise<void> {
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
  const texture = initTexture(gl);

  const video = await loadVideo('./chris.mp4');

  let then = 0;

  const render = (now: number) => {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    updateTexture(gl, texture, video);

    drawScene({
      gl,
      programInfo,
      buffers,
      texture,
      deltaTime,
    });

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

main().catch(err => console.error(err.stack));
