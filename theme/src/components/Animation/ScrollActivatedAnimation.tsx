import * as React from 'react'

import { Animation } from './Animation'

export interface ScrollActivatedAnimationProps {
  delay?: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactElement
}

export const ScrollActivatedAnimation: React.FunctionComponent<ScrollActivatedAnimationProps> = ({
  delay,
  className,
  style,
  children
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isActive, setActive] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) {
        return
      }
      setActive(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <Animation in={isActive} delay={delay}>
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    </Animation>
  )
}
