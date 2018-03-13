import path from 'path';

export default {
  background_color: '#FFFFFF',
  display: 'standalone',
  filename: 'manifest.json',
  icons: [
    {
      destination: path.join('images'),
      sizes: [192, 256, 384, 512],
      src: path.resolve('src/images/icon-512x512.png'),
    },
  ],
  inject: false,
  name: 'Munchkin Level Counter',
  orientation: 'any',
  short_name: 'Munchkin',
  start_url: '/',
  theme_color: '#000000',
};
