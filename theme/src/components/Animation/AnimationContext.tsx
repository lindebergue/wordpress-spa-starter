import * as React from 'react'
import gsap from 'gsap'

export interface AnimationContextType {
  enterTimeline: gsap.core.Timeline
  exitTimeline: gsap.core.Timeline
}

export const AnimationContext = React.createContext<AnimationContextType>(undefined as any)
