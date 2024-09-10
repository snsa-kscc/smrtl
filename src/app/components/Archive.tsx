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

export function Archive({ posts }: { posts: Post[] }) {
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
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="p-8">
                <div className="overflow-hidden">
                  <div className="p-1 pb-10 text-smartellDarkBlue">
                    <p className="text-sm">
                      {dateFormatter.format(new Date(post.createdAt)).replace(/\//g, '.')}
                    </p>
                    <h3 className="text-balance text-xl font-bold">{post.title}</h3>
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
