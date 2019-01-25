import { mat4 } from 'gl-matrix';
import { BufferInfo } from 'buffers';
import { ProgramInfo } from 'shaders';

let squareRotation = 0.0;

export interface DrawSceneParams {
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;
  buffers: BufferInfo;
  deltaTime: number;
}

interface BindVertexDataParams {
  gl: WebGLRenderingContext;
  attribLocation: GLint;
  buffer: WebGLBuffer;
  numComponents: number;
}

function createProjectionMatrix(gl: WebGLRenderingContext): mat4 {
  const fieldOfView = 45 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;

  const projectionMatrix = mat4.create();

  mat4.perspective(
    projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar
  );

  return projectionMatrix;
}

function createModelViewMatrix(): mat4 {
  const modelViewMatrix = mat4.create();

  mat4.translate(
    modelViewMatrix,
    modelViewMatrix,
    [-0.0, 0.0, -6.0]
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    squareRotation,
    [0, 0, 1],
  );

  return modelViewMatrix;
}

function bindVertexData({
  gl,
  attribLocation,
  buffer,
  numComponents,
}: BindVertexDataParams): void {
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.vertexAttribPointer(
    attribLocation,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(attribLocation);
}

export function drawScene({
  gl,
  programInfo,
  buffers,
  deltaTime,
}: DrawSceneParams): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const projectionMatrix = createProjectionMatrix(gl);
  const modelViewMatrix = createModelViewMatrix();

  bindVertexData({
    gl,
    attribLocation: programInfo.attribLocations.vertexPosition,
    buffer: buffers.position,
    numComponents: 2,
  });

  bindVertexData({
    gl,
    attribLocation: programInfo.attribLocations.vertexColor,
    buffer: buffers.color,
    numComponents: 4,
  });

  gl.useProgram(programInfo.program);

  const { uniformLocations } = programInfo;

  gl.uniformMatrix4fv(
    uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );

  gl.uniformMatrix4fv(
    uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  squareRotation += deltaTime;
}

