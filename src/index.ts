function main(): void {
  const canvas = document.getElementById('glCanvas') as HTMLCanvasElement;

  if (!canvas) {
    throw new Error('Could not find canvas element');
  }

  const gl = canvas.getContext('webgl');

  if (!gl) {
    throw new Error('Could not initialise WebGL');
  }

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

main();
