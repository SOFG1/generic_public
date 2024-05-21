function composeHtmlTemplate(link: string, imgUrl: string) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Post</title>
</head>
<body>
  <img
    style="height: 630px; width: 1004px"
    src="${imgUrl}"
    alt=""
  />
  <p><a style="font-size: 22px; color: #000;" href="${link}" target="_blank">Link to the post</a></p>
</body>
</html>

  `;
}

export const saveSentimentorPostHtml = (link: string, imgUrl: string, fileName: string) => {
  const html = composeHtmlTemplate(link, imgUrl);
  const a = document.createElement("a");
  const file = new Blob([html], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = `${fileName}.html`;
  a.click();
  URL.revokeObjectURL(a.href);
};
