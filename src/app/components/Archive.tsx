'use client'

import { Post, Media } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/app/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import { Locale, pathTranslations, i18n } from 'i18n.config'

export function Archive({ lang, posts }: { lang: Locale; posts: Post[] }) {
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return (
    <Carousel className="mx-auto my-24 w-full max-w-7xl">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id} className="basis-1/3">
            <Link
              href={
                lang === i18n.defaultLocale
                  ? `/${pathTranslations[lang]}/${post.slug}`
                  : `/${lang}/${pathTranslations[lang]}/${post.slug}`
              }
              className="block"
            >
              <div className="p-8">
                <div className="overflow-hidden">
                  <div className="text-smartellDarkBlue p-1 pb-10">
                    <p className="text-sm">
                      {dateFormatter.format(new Date(post.createdAt)).replace(/\//g, '.')}
                    </p>
                    <h3 className="text-xl font-bold text-balance">{post.title}</h3>
                  </div>
                  {post.featuredImage && (
                    <Image
                      src={(post.featuredImage as Media)?.url ?? ''}
                      alt={(post.featuredImage as Media)?.alt || ''}
                      width={(post.featuredImage as Media)?.width || 300}
                      height={(post.featuredImage as Media)?.height || 200}
                      className="w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
