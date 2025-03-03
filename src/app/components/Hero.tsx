'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { HeroShapes } from './shapes/HeroShapes'
import { Television } from './Television'

type ImageType = {
  url: string
  alt: string
  width: number
  height: number
}

gsap.registerPlugin(useGSAP)

export function Hero({
  title,
  animationWords,
  description,
  caseStudy,
}: {
  title: string
  animationWords: string
  description: string
  caseStudy: {
    id: string
    image: ImageType
  }[]
}) {
  const titleCharsRef = useRef<HTMLSpanElement[]>([])
  const animationWordsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from(titleCharsRef.current, {
      duration: 1.5,
      yPercent: -55,
      opacity: 0,
      rotateX: -100,
      stagger: 0.09,
      ease: 'power3.out',
    })

    const animationWordsTl = gsap.timeline({ repeat: -1 })
    animationWordsRef.current.forEach((wordDiv) => {
      const chars = wordDiv.querySelectorAll('.char')
      animationWordsTl
        .fromTo(
          chars,
          { yPercent: 100, opacity: 0 },
          {
            duration: 0.7,
            yPercent: 0,
            opacity: 1,
            stagger: 0.06,
            ease: 'power2.out',
          },
        )
        .to(
          chars,
          {
            duration: 0.7,
            yPercent: -100,
            opacity: 0,
            stagger: 0.06,
            ease: 'power2.in',
          },
          '+=1',
        )
    })

    tl.add(animationWordsTl, '-=0.5')
  }, [])

  return (
    <>
      <div className="grid grid-cols-4 justify-items-end">
        <div className="col-start-1 col-end-4 row-end-2 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-smartellLightPurple lg:text-10xl mb-4 text-center text-4xl font-bold [perspective:1000px] [transform-style:preserve-3d] md:text-6xl"
          >
            {title.split(/(\s)/).map((word, i) => (
              <div key={i} className="word inline-block">
                {word.split('').map((char, j) => (
                  <span
                    key={`${i}-${j}`}
                    ref={(el) => {
                      if (el) titleCharsRef.current.push(el)
                    }}
                    className="char inline-block will-change-transform"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            ))}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-smartellDarkBlue lg:text-10xl relative mb-6 inline-block text-4xl font-bold md:text-6xl"
          >
            {animationWords.split(',').map((word, i) => (
              <div
                key={i}
                className="word absolute top-0 left-0 w-max -translate-x-1/2"
                ref={(el) => {
                  if (el) animationWordsRef.current.push(el)
                }}
              >
                <div className="overflow-hidden">
                  {word.split('').map((char, j) => (
                    <span key={`${i}-${j}`} className="char inline-block will-change-transform">
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
          {/* <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-40 text-lg text-smartellDarkBlue"
          >
            {description}
          </motion.p> */}
        </div>
        <motion.div
          className="col-span-2 col-start-3 row-end-2 w-full max-w-lg"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          <HeroShapes />
        </motion.div>
      </div>
      <p>{description}</p>
      {/* <Television description={description} caseStudy={caseStudy} /> */}
    </>
  )
}
