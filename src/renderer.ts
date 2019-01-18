import { mat4 } from 'gl-matrix';
import { ProgramInfo } from 'shaders';

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

  return modelViewMatrix;
}

function bindVertexPositions(
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  positionBuffer: WebGLBuffer
): void {
  const numComponents = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  const { vertexPosition } = programInfo.attribLocations;

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  gl.vertexAttribPointer(
    vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(vertexPosition);
}

export function drawScene(
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  positionBuffer: WebGLBuffer
): void {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const projectionMatrix = createProjectionMatrix(gl);
  const modelViewMatrix = createModelViewMatrix();

  bindVertexPositions(gl, programInfo, positionBuffer);

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
}

