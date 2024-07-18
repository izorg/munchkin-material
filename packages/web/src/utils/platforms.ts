// eslint-disable-next-line sonarjs/deprecation
const { platform } = navigator;

export const ios = platform === "iPhone" || platform === "iPad";
