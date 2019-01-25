export interface BufferInfo {
  color: WebGLBuffer;
  position: WebGLBuffer;
}

const colorData = [
  1.0, 1.0, 1.0, 1.0, // white
  1.0, 0.0, 0.0, 1.0, // red
  0.0, 1.0, 0.0, 1.0, // green
  0.0, 0.0, 1.0, 1.0, // blue
];

const positionData = [
  -1.0,  1.0,
   1.0,  1.0,
  -1.0, -1.0,
   1.0, -1.0,
];

function initBuffer(gl: WebGLRenderingContext, data: number[]): WebGLBuffer {
  const buffer = gl.createBuffer();

  if (!buffer) {
    throw new Error('Could not allocate buffer');
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return buffer;
}

export const initBuffers = (gl: WebGLRenderingContext): BufferInfo => ({
  color: initBuffer(gl, colorData),
  position: initBuffer(gl, positionData),
});
