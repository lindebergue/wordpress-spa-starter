import * as React from 'react'
import gsap from 'gsap'

import { AnimationContext } from './AnimationContext'

export interface AnimationProps {
  in?: boolean
  delay?: number
  onEnterComplete?: () => void
  onExitComplete?: () => void
  children: React.ReactNode
}

export const Animation: React.FunctionComponent<AnimationProps> = ({
  in: active = true,
  delay,
  onEnterComplete,
  onExitComplete,
  children
}) => {
  const enterTimeline = React.useRef(gsap.timeline({
    delay: delay,
    paused: true,
    onComplete: onEnterComplete
  }))
  const exitTimeline = React.useRef(gsap.timeline({
    delay: delay,
    paused: true,
    onComplete: onExitComplete
  }))

  React.useEffect(() => {
    if (active) {
      exitTimeline.current.kill()
      enterTimeline.current.restart(true)
    } else {
      enterTimeline.current.kill()
      exitTimeline.current.restart(true)
    }
  }, [active])

  return (
    <AnimationContext.Provider
      value={{
        enterTimeline: enterTimeline.current,
        exitTimeline: exitTimeline.current
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}
