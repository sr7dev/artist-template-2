import React, {useEffect} from "react";

function loadBandsinTown() {
  const wf = document.createElement("script");
  wf.src = "https://widget.bandsintown.com/main.min.js";
  wf.charset = "utf-8";
  wf.async = "true";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wf, s);
}

function getColors(theme, darkMode) {
  let bgRgb = JSON.parse(theme.dark_background_color);
  let foreRgb = JSON.parse(theme.light_background_color);
  if (!darkMode) {
    bgRgb = JSON.parse(theme.light_background_color);
    foreRgb = JSON.parse(theme.dark_foreground_color);
  }

  const bgHex =
    "#" +
    bgRgb.r.toString(16) +
    bgRgb.g.toString(16) +
    bgRgb.b.toString(16) +
    (bgRgb.a * 255).toString(16).substring(0, 2);
  const foreHex =
    "#" +
    foreRgb.r.toString(16) +
    foreRgb.g.toString(16) +
    foreRgb.b.toString(16) +
    (foreRgb.a * 255).toString(16).substring(0, 2);

  return {
    bgHex,
    foreHex,
  };
}

function BandsinTownWidget({artistName, darkMode, theme}) {
  useEffect(() => {
    loadBandsinTown();
  }, []);

  const colors = getColors(theme, darkMode);

  return (
    <div>
      <a
        id="tour-widget"
        className="bit-widget-initializer"
        data-artist-name={artistName}
        data-display-local-dates="false"
        data-display-past-dates="false"
        data-auto-style="false"
        data-text-color={colors.foreHex}
        data-link-color="#00b4b3"
        data-background-color={colors.bgHex}
        data-display-limit="15"
        data-display-start-time="false"
        data-link-text-color="#FFFFFF"
        data-display-lineup="false"
        data-display-play-my-city="true"
        data-separator-color={
          darkMode ? "rgba(255,255,255,0.5)" : "rgba(124,124,124,0.25)"
        }
        data-app-id="js_jf_generated"
        href="https://bandsintown.com"
      >
        &nbsp;
      </a>
    </div>
  );
}

export default BandsinTownWidget;
