export interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLint;
    vertexColor: GLint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
}

const vertexShaderSource = `
  attribute vec4 vertexPosition;
  attribute vec4 vertexColor;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying lowp vec4 color;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vertexPosition;
    color = vertexColor;
  }
`;

const fragmentShaderSource = `
  varying lowp vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;

function loadShader(
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Could not create shader');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const errorLog = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Failed to compile shader: ${errorLog}`);
  }

  return shader;
}

export function initShaderProgram(gl: WebGLRenderingContext): ProgramInfo {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = gl.createProgram();

  if (!program) {
    throw new Error('Could not create shader program');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const errorLog = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Failed to link shader program: ${errorLog}`);
  }

  return {
    program,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(program, 'vertexPosition') as GLint,
      vertexColor: gl.getAttribLocation(program, 'vertexColor') as GLint,
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix') as WebGLUniformLocation,
      modelViewMatrix: gl.getUniformLocation(program, 'modelViewMatrix') as WebGLUniformLocation,
    },
  };
}
