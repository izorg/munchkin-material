const { platform } = navigator;

export const ios = platform === "iPhone" || platform === "iPad";
