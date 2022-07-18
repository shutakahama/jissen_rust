'use strict'

// function draw(ctx, canvasWidth, canvasHeight, data) {
//     let img = new ImageData(new Uint8ClampedArray(data), canvasWidth, canvasHeight);
//     ctx.putImageData(img, 0, 0);
// }

const X_MIN = -1.5;
const X_MAX = 0.5;
const Y_MIN = -1.0;
const Y_MAX = 1.0;
const MAX_ITER = 1 << 7 - 1;

console.log("start loading wasm");
const mandelbrot = import('../pkg')
    .catch(console.error);
Promise.all([mandelbrot]).then(async function ([{ generate_mandelbrot_set, draw_mandelbrot_set }]) {
    console.log("finished loading wasm");

    const renderBtn = document.getElementById('render');
    renderBtn.addEventListener('click', () => {
        {
            console.log("wasm only");
            draw_mandelbrot_set();
        }
        // {
        //     console.log("wasm+js");
        //     const CANVAS_ID = "canvas_hybrid";
        //     let canvas = document.getElementById(CANVAS_ID);
        //     let context = canvas.getContext("2d");
        //     const canvasWidth = canvas.width;
        //     const canvasHeight = canvas.height;

        //     const generateStartTime = Date.now();
        //     wasmResult = generate_mandelbrot_set(canvasWidth, canvasHeight, X_MIN, X_MAX, Y_MIN, Y_MAX, MAX_ITER);
        //     const generateEndTime = Date.now();
        //     const drawStartTime = Date.now();
        //     draw(context, canvasWidth, canvasHeight, wasmResult);
        //     const drawEndTime = Date.now();
        //     console.log(`\tgenerate:wasm\tgenerate_elapsed:${generateEndTime - generateStartTime}[ms]`);
        //     console.log(`\tdraw: js\tdraw_elapsed: ${drawEndTime - drawStartTime} [ms]`);
        // }
    });
});
