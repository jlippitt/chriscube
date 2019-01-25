import { flatMap } from 'lodash';

export interface BufferInfo {
  color: WebGLBuffer;
  indices: WebGLBuffer;
  normal: WebGLBuffer;
  position: WebGLBuffer;
  texture: WebGLBuffer;
}

interface CreateBufferParams {
  gl: WebGLRenderingContext;
  type: GLenum;
  data: any;
}

const faceColors = [
  // Front face: white
  [1.0,  1.0,  1.0,  1.0],
  // Back face: red
  [1.0,  0.0,  0.0,  1.0],
  // Top face: green
  [0.0,  1.0,  0.0,  1.0],
  // Bottom face: blue
  [0.0,  0.0,  1.0,  1.0],
  // Right face: yellow
  [1.0,  1.0,  0.0,  1.0],
  // Left face: purple
  [1.0,  0.0,  1.0,  1.0],
];

const colorData = flatMap(
  faceColors,
  color => color.concat(color, color, color)
);

const indexData = [
  // front
  0,  1,  2,      0,  2,  3,
  // back
  4,  5,  6,      4,  6,  7,
  // top
  8,  9,  10,     8,  10, 11,
  // bottom
  12, 13, 14,     12, 14, 15,
  // right
  16, 17, 18,     16, 18, 19,
  // left
  20, 21, 22,     20, 22, 23,
];

const normalData = [
  // Front
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,
   0.0,  0.0,  1.0,

  // Back
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,
   0.0,  0.0, -1.0,

  // Top
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,
   0.0,  1.0,  0.0,

  // Bottom
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,
   0.0, -1.0,  0.0,

  // Right
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,
   1.0,  0.0,  0.0,

  // Left
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0,
  -1.0,  0.0,  0.0
];

const positionData = [
  // Front face
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,
  
  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,
  
  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,
  
  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,
  
  // Right face
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0, -1.0,  1.0,
  
  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
];

const textureData = [
  // Front
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Back
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Top
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Bottom
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Right
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
  // Left
  0.0,  0.0,
  1.0,  0.0,
  1.0,  1.0,
  0.0,  1.0,
];

function createBuffer({ gl, type, data }: CreateBufferParams): WebGLBuffer {
  const buffer = gl.createBuffer();

  if (!buffer) {
    throw new Error('Could not allocate buffer');
  }

  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, gl.STATIC_DRAW);

  return buffer;
}

export const initBuffers = (gl: WebGLRenderingContext): BufferInfo => ({
  color: createBuffer({
    gl,
    type: gl.ARRAY_BUFFER,
    data: new Float32Array(colorData),
  }),
  indices: createBuffer({
    gl,
    type: gl.ELEMENT_ARRAY_BUFFER,
    data: new Uint16Array(indexData),
  }),
  normal: createBuffer({
    gl,
    type: gl.ARRAY_BUFFER,
    data: new Float32Array(normalData),
  }),
  position: createBuffer({
    gl,
    type: gl.ARRAY_BUFFER,
    data: new Float32Array(positionData),
  }),
  texture: createBuffer({
    gl,
    type: gl.ARRAY_BUFFER,
    data: new Float32Array(textureData),
  }),
});
