const { platform } = navigator;

// eslint-disable-next-line import/prefer-default-export
export const ios = platform === 'iPhone' || platform === 'iPad';
