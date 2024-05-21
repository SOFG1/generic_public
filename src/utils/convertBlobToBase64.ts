export const convertBlobImageToBase64 = (blob: Blob): Promise<string | ArrayBuffer> => {
  return new Promise((res, rej) => {
    if (window.FileReader) {
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl = reader.result;
        if (dataUrl == null) {
          rej("Data URL is not available.");
        } else {
          res(dataUrl);
        }
      };
      reader.onerror = function () {
        rej("Incorrect blob or file object.");
      };
      reader.readAsDataURL(blob);
    }
    if(!window.FileReader) {
      rej("File API is not supported.");
    }
  });
};
