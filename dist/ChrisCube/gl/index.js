var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initBuffers } from './buffers';
import { initShaderProgram } from './shaders';
import { drawScene } from './renderer';
import { loadVideo, initTexture, updateTexture } from './textures';
export function initGl(canvasId) {
    return __awaiter(this, void 0, void 0, function* () {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`Could not find canvas element "${canvasId}"`);
        }
        const gl = canvas.getContext('webgl');
        if (!gl) {
            throw new Error('Could not initialise WebGL');
        }
        const programInfo = initShaderProgram(gl);
        const buffers = initBuffers(gl);
        const texture = initTexture(gl);
        const video = yield loadVideo('./chris.mp4');
        let then = 0;
        const render = (now) => {
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
    });
}
