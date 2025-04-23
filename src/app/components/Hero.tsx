'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { HeroShapes } from './shapes/HeroShapes'
import { TVSlider } from './TVSlider'

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
      stagger: 0.04,
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
      <div className="relative my-20 flex flex-col items-center px-4 md:px-8 lg:px-16">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.02 }}
          className="text-smartellLightPurple mb-6 text-center text-4xl font-bold [perspective:1000px] [transform-style:preserve-3d] md:mb-12 md:text-6xl lg:mb-16 lg:text-9xl"
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
          className="text-smartellDarkBlue relative mb-12 inline-block text-4xl font-bold md:mb-16 md:text-6xl lg:mb-20 lg:text-8xl"
        >
          {animationWords.split(';').map((word, i) => (
            <div
              key={i}
              className="word absolute top-0 left-1/2 w-max -translate-x-1/2"
              ref={(el) => {
                if (el) animationWordsRef.current.push(el)
              }}
            >
              <div className="overflow-hidden">
                {word.split(/(\s)/).map((subWord, k) => (
                  <div key={`${i}-${k}`} className="word inline-block">
                    {subWord.split('').map((char, j) => (
                      <span
                        key={`${i}-${k}-${j}`}
                        className="char inline-block will-change-transform"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="absolute top-0 right-0 -z-50 w-full max-w-[26rem]"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          <HeroShapes />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-smartellDarkBlue mx-auto mb-10 max-w-2xl px-4 text-center text-3xl font-bold"
      >
        {description}
      </motion.p>
      <div className="pb-20 md:pb-32 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <TVSlider caseStudy={caseStudy} />
        </motion.div>
      </div>
    </>
  )
}
