import localFont from 'next/font/local'

export const Mont = localFont({
  src: [
    {
      path: '../../public/fonts/Mont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Mont-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Mont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Mont-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})
