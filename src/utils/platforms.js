const { platform, userAgent } = navigator;

export const ios = platform === "iPhone" || platform === "iPad";
export const android = userAgent.includes("Android");

export const edge = userAgent.includes("Edge");
export const ie = userAgent.includes("Trident");
