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
    <Carousel className="mx-auto my-12 w-10/12 max-w-7xl lg:my-24" id={`${pathTranslations[lang]}`}>
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id} className="basis-full sm:basis-1/2 xl:basis-1/3">
            <Link
              href={
                lang === i18n.defaultLocale
                  ? `/${pathTranslations[lang]}/${post.slug}`
                  : `/${lang}/${pathTranslations[lang]}/${post.slug}`
              }
              className="block"
            >
              <div className="px-8">
                {post.featuredImage && (
                  <div className="relative aspect-[0.9] w-full overflow-hidden">
                    <Image
                      src={(post.featuredImage as Media)?.url ?? ''}
                      alt={(post.featuredImage as Media)?.alt || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-smartellDarkBlue flex h-32 flex-col pt-10">
                  <p className="text-sm">
                    {dateFormatter.format(new Date(post.createdAt)).replace(/\//g, '.')}
                  </p>
                  <h3 className="line-clamp-2 overflow-hidden text-xl font-bold text-ellipsis">
                    {post.title}
                  </h3>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="ghost" />
      <CarouselNext variant="ghost" />
    </Carousel>
  )
}
