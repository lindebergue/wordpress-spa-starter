import * as React from 'react'

import { concatRefs } from '../../lib/concatRefs'

import { Keyframe, KeyframeValues } from './Keyframe'

export interface DOMKeyframeProps extends React.HTMLAttributes<HTMLDivElement> {
  innerRef?: React.Ref<HTMLDivElement>
  onEnter?: KeyframeValues
  onExit?: KeyframeValues
  children?: React.ReactNode
}

export const DOMKeyframe: React.FunctionComponent<DOMKeyframeProps> = ({
  innerRef,
  onEnter,
  onExit,
  children,
  ...remainingProps
}) => (
  <Keyframe onEnter={onEnter} onExit={onExit}>
    {(ref) => (
      <div ref={concatRefs(ref)} {...remainingProps}>
        {children}
      </div>
    )}
  </Keyframe>
)
