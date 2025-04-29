'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from 'payload-admin-bar'

import { cn } from '@/app/lib/utils'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
}

type CollectionKey = keyof typeof collectionLabels

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (segments?.[0] as CollectionKey) in collectionLabels ? segments?.[0] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(!!user?.id)
  }, [])

  return (
    <div
      className={cn('bg-black py-2 text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : process.env.NEXT_PUBLIC_SERVER_URL
          }
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection as CollectionKey]?.plural || 'Pages',
            singular: collectionLabels[collection as CollectionKey]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
