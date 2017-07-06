const { platform, userAgent } = navigator;

export const ios = platform === 'iPhone' || platform === 'iPad';

export const edge = userAgent.indexOf('Edge') > -1;
export const ie = userAgent.indexOf('Trident') > -1;
