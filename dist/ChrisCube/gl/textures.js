export function loadVideo(url) {
    let playing = false;
    let timeupdate = false;
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = false;
    video.muted = true;
    video.loop = true;
    return new Promise(resolve => {
        const checkReady = () => {
            if (playing && timeupdate) {
                resolve(video);
            }
        };
        video.addEventListener('playing', () => {
            playing = true;
            checkReady();
        }, true);
        video.addEventListener('timeupdate', () => {
            timeupdate = true;
            checkReady();
        }, true);
        video.play();
    });
}
export function initTexture(gl) {
    const texture = gl.createTexture();
    if (!texture) {
        throw new Error('Failed to allocate texture');
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const placeholder = new Uint8Array([0, 0, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, placeholder);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return texture;
}
export function updateTexture(gl, texture, video) {
    const level = 0;
    const internalFormat = gl.RGBA;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, video);
}
