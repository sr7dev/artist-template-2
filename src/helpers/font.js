export const loadFont = (fontFamily = "AvenirNext", fontType = "opentype") => {
  const fontExt = fontType === "opentype" ? "otf" : "ttf";
  var newStyle = document.createElement("style");
  newStyle.appendChild(
    document.createTextNode(`
      @font-face {
        font-family: ${fontFamily};
        font-weight: 500;
        src: url("https://s3.amazonaws.com/cdn-fonts-storage.jamfeed.com/${fontFamily}/${fontFamily}-Bold.${fontExt}") format("${fontType}");
      }
    `)
  );
  document.head.appendChild(newStyle);

  newStyle.appendChild(
    document.createTextNode(`
      @font-face {
        font-family: ${fontFamily};
        font-weight: bold;
        src: url("https://s3.amazonaws.com/cdn-fonts-storage.jamfeed.com/${fontFamily}/${fontFamily}-Medium.${fontExt}") format("${fontType}");
      }
    `)
  );
  document.head.appendChild(newStyle);

  newStyle.appendChild(
    document.createTextNode(`
      @font-face {
        font-family: ${fontFamily};
        font-weight: normal;
        src: url("https://s3.amazonaws.com/cdn-fonts-storage.jamfeed.com/${fontFamily}/${fontFamily}-Regular.${fontExt}") format("${fontType}");
      }
    `)
  );
  document.head.appendChild(newStyle);

  document.getElementsByTagName("body")[0].style.fontFamily = fontFamily;
};
