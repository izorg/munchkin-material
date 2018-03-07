import path from 'path';

export default {
  background_color: '#FFFFFF',
  display: 'standalone',
  filename: 'manifest.json',
  icons: [
    {
      destination: path.join('images'),
      size: 192,
      src: path.resolve('src/images/favicon.png'),
    },
    {
      destination: path.join('images'),
      size: 512,
      src: path.resolve('src/images/icon-512x512.png'),
    },
  ],
  inject: false,
  name: 'All munchkins',
  short_name: 'All munchkins',
  start_url: '/',
  theme_color: '#000000',
};
