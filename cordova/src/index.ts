document.addEventListener("deviceready", () => import("./cordova"), false);

const cordovaScript = document.createElement("script");
cordovaScript.setAttribute("src", "cordova.js");
document.querySelector("head")?.appendChild(cordovaScript);

export {};
