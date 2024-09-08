'use client'

import { useRef, useCallback, useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

type IPTVBoxProp = {
  title: string
  description: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
}

const lerp = (start: number, end: number, t: number): number => start * (1 - t) + end * t

export function IPTVSolutions({ title, IPTVBox }: { title: string; IPTVBox: IPTVBoxProp[] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [lerpedPosition, setLerpedPosition] = useState({ x: 0, y: 0 })
  const [activeImage, setActiveImage] = useState<number | null>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { scrollY } = useScroll()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top + scrollY.get(),
        })
      }
    },
    [scrollY],
  )

  useEffect(() => {
    let animationId: number

    const animate = () => {
      setLerpedPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.075),
        y: lerp(prev.y, mousePosition.y - scrollY.get(), 0.075),
      }))

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [mousePosition, scrollY])

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative px-20 py-10">
      <motion.div
        className="pointer-events-none absolute aspect-video w-1/4"
        ref={imageWrapperRef}
        style={{
          left: lerpedPosition.x - (imageWrapperRef.current?.offsetWidth || 0) / 2,
          top: lerpedPosition.y - (imageWrapperRef.current?.offsetHeight || 0) / 2,
        }}
      >
        {IPTVBox.map((item, index) => (
          <ImageItem key={item.title} item={item} isActive={activeImage === index} />
        ))}
      </motion.div>
      <h3 className="mb-20 text-lg font-bold text-smartellDarkBlue">{title}</h3>
      {IPTVBox.map((item, index) => (
        <div
          onMouseEnter={() => setActiveImage(index)}
          onMouseLeave={() => setActiveImage(null)}
          key={item.title}
          className="my-10"
        >
          <p className="text-smartellLightPurple">{String(index + 1).padStart(2, '0')}</p>
          <div className="my-20 flex items-center justify-center">
            <h3 className="basis-1/2 text-7xl font-bold text-smartellDarkBlue">{item.title}</h3>
            <p className="basis-1/2 text-smartellDarkBlue">{item.description}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}

function ImageItem({ item, isActive }: { item: IPTVBoxProp; isActive: boolean }) {
  const [maskPosition, setMaskPosition] = useState(-250)

  useEffect(() => {
    let animationId: number

    const animate = () => {
      setMaskPosition((prev) => {
        if (isActive && prev < -125) {
          return Math.min(prev + 4, -125)
        } else if (!isActive && prev > -250) {
          return Math.max(prev - 4, -250)
        }
        return prev
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [isActive])

  const maskImage = `linear-gradient(to top, 
    transparent ${maskPosition}%, 
    transparent ${maskPosition + 100}%, 
    black ${maskPosition + 125}%, 
    black ${maskPosition + 225}%, 
    transparent ${maskPosition + 250}%, 
    transparent ${maskPosition + 350}%
  )`

  return (
    <motion.img
      src={item.image.url}
      alt={item.image.alt}
      width={item.image.width}
      height={item.image.height}
      className="absolute inset-0 z-50 h-full w-full object-cover"
      style={{
        maskImage: maskImage,
        WebkitMaskImage: maskImage,
      }}
      transition={{ duration: 0.5 }}
    />
  )
}
