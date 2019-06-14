import { mat4 } from 'gl-matrix';
import { BufferInfo } from './buffers';
import { ProgramInfo } from './shaders';

let rotation = 0.0;

export interface DrawSceneParams {
  gl: WebGLRenderingContext;
  programInfo: ProgramInfo;
  buffers: BufferInfo;
  texture: WebGLTexture;
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
    rotation,
    [0, 0, 1],
  );

  mat4.rotate(
    modelViewMatrix,
    modelViewMatrix,
    rotation * 0.7,
    [0, 1, 0],
  );

  return modelViewMatrix;
}

function createNormalMatrix(modelViewMatrix: mat4): mat4 {
  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  return normalMatrix;
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

function drawIndices(gl: WebGLRenderingContext, indices: WebGLBuffer): void {
  const vertexCount = 36;
  const type = gl.UNSIGNED_SHORT;
  const offset = 0;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);

  gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
}

export function drawScene({
  gl,
  programInfo,
  buffers,
  texture,
  deltaTime,
}: DrawSceneParams): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const projectionMatrix = createProjectionMatrix(gl);
  const modelViewMatrix = createModelViewMatrix();
  const normalMatrix = createNormalMatrix(modelViewMatrix);

  bindVertexData({
    gl,
    attribLocation: programInfo.attribLocations.vertexPosition,
    buffer: buffers.position,
    numComponents: 3,
  });

  bindVertexData({
    gl,
    attribLocation: programInfo.attribLocations.textureCoord,
    buffer: buffers.texture,
    numComponents: 2,
  });

  bindVertexData({
    gl,
    attribLocation: programInfo.attribLocations.vertexNormal,
    buffer: buffers.normal,
    numComponents: 3,
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

  gl.uniformMatrix4fv(
    uniformLocations.normalMatrix,
    false,
    normalMatrix,
  );

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(programInfo.uniformLocations.sampler, 0);

  drawIndices(gl, buffers.indices);

  rotation += deltaTime;
}

