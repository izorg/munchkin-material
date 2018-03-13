import path from 'path';

export default {
  background_color: '#FFFFFF',
  display: 'standalone',
  icons: [
    {
      destination: path.join('images'),
      sizes: [192, 256, 384, 512],
      src: path.resolve('src/images/icon-512x512.png'),
    },
  ],
  inject: false,
  orientation: 'any',
  theme_color: '#000000',
};
