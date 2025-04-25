import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: `${process.env.NEXT_PUBLIC_SERVER_NAME} website`,
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/meta-image.webp`,
    },
  ],
  siteName: process.env.NEXT_PUBLIC_SERVER_NAME,
  title: process.env.NEXT_PUBLIC_SERVER_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
