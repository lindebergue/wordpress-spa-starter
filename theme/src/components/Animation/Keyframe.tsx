import * as React from 'react'
import gsap from 'gsap'

import { AnimationContext } from './AnimationContext'

export interface KeyframeValues {
  duration?: number
  position?: gsap.Position
  from?: gsap.TweenVars
  to?: gsap.TweenVars
}

export interface KeyframeProps {
  onEnter?: KeyframeValues
  onExit?: KeyframeValues
  children: (ref: React.Ref<any>) => React.ReactElement
}

export const Keyframe: React.FunctionComponent<KeyframeProps> = ({
  onEnter,
  onExit,
  children
}) => {
  const ref = React.useRef<any>(null)
  const context = React.useContext(AnimationContext)

  React.useEffect(() => {
    const target = ref.current
    if (!target) {
      return
    }
    if (onEnter) {
      addKeyframe(context.enterTimeline, target, onEnter)
    }
    if (onExit) {
      addKeyframe(context.exitTimeline, target, onExit)
    }
  }, [])

  return children(ref)
}

const DEFAULT_DURATION = .5
const DEFAULT_POSITION = '<'

function addKeyframe(timeline: gsap.core.Timeline, target: any, values: KeyframeValues) {
  if (values.duration === undefined) {
    values.duration = DEFAULT_DURATION
  }
  if (values.position === undefined) {
    values.position = DEFAULT_POSITION
  }
  if (values.from && values.to) {
    timeline.fromTo(target, values.duration, values.from, values.to, values.position)
  } else if (values.from) {
    timeline.from(target, values.duration, values.from, values.position)
  } else if (values.to) {
    timeline.to(target, values.duration, values.to, values.position)
  }
}
