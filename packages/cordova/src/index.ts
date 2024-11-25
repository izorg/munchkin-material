import "./polyfills";

document.addEventListener(
  "deviceready",
  () => {
    void import("./cordova");
  },
  false,
);

const cordovaScript = document.createElement("script");
cordovaScript.setAttribute("src", "cordova.js");
document.querySelector("head")?.append(cordovaScript);
