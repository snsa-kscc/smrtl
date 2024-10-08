// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Footer } from './payload/globals/Footer'
import { Header } from './payload/globals/Header'
import { NotFound } from './payload/globals/NotFound'
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Posts } from './payload/collections/Posts'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Post } from './payload-types'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | ${process.env.NEXT_PUBLIC_SERVER_NAME}`
    : process.env.NEXT_PUBLIC_SERVER_NAME!
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export default buildConfig({
  admin: {
    user: Users.slug,
    // remove this before deploying
    autoLogin: {
      email: process.env.PAYLOAD_AUTOLOGIN_EMAIL,
      password: process.env.PAYLOAD_AUTOLOGIN_PASSWORD,
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Pages],
  localization: {
    locales: ['en', 'hr', 'it'],
    defaultLocale: 'en',
    fallback: true,
  },
  globals: [Header, Footer, NotFound],
  plugins: [
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_SERVER_USER!,
    defaultFromName: process.env.NEXT_PUBLIC_SERVER_NAME!,
    transportOptions: {
      host: process.env.EMAIL_SERVER_HOST!,
      port: process.env.EMAIL_SERVER_PORT!,
      auth: {
        user: process.env.EMAIL_SERVER_USER!,
        pass: process.env.EMAIL_SERVER_PASSWORD!,
      },
    },
  }),
})
