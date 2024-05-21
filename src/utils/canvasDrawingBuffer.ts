//This snippet helps to caputure map canvas inside screenshots

//@ts-ignore
HTMLCanvasElement.prototype.getContext = function(origFn) {
    return function(type, attribs) {
      attribs = attribs || {};
      attribs.preserveDrawingBuffer = true;
//@ts-ignore
      return origFn.call(this, type, attribs);
    };
  }(HTMLCanvasElement.prototype.getContext);
