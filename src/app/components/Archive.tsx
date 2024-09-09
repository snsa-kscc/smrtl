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
    <Carousel className="mx-auto w-full max-w-sm">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id} className="basis-1/3 pl-1">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="p-1">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  {post.featuredImage && (
                    <Image
                      src={(post.featuredImage as Media)?.url ?? ''}
                      alt={(post.featuredImage as Media)?.alt || ''}
                      width={(post.featuredImage as Media)?.width || 300}
                      height={(post.featuredImage as Media)?.height || 200}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      {dateFormatter.format(new Date(post.createdAt)).replace(/\//g, '.')}
                    </p>
                  </div>
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
