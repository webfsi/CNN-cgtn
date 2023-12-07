function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }
  
    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;
  
    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
  
    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;
  
    // decide which gap to fill
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;
  
    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);
  
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;
  
    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;
  
    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }
  
  
const loadAssets = (url) => {
  return new Promise(function (resolve, reject) {
    var finished = false;
    var image = new window.Image();
    image.onload = function onLoaded () {
      if (finished) return;
      finished = true;
      resolve(image);
    };
    image.onerror = function onError () {
      if (finished) return;
      finished = true;
      reject(new Error('Error while loading image at ' + opt.url));
    };
    image.src = url;
  });
};
  
const preloadImages = async ({ imagesLength, sufix = '.jpg', prefix = 'Cutoff_3_', pad = 3, path }) => {
    for (var images = [], i = 0; i < imagesLength; i++) {
      const PATH = `${path}${prefix}${String(i).padStart(pad, '0')}${sufix}?auto=compress,format`;
      // await gsap.delayedCall(0.1, () => images.push(loadAssets(PATH)));
      images.push(loadAssets(PATH));
    }
    return Promise.all(images);
  };
  
async function load(assets) {
    var images = await preloadImages(assets);
  
    return images;
  }

  export default {
    drawImageProp,
    loadAssets,
    preloadImages,
    load
  }
