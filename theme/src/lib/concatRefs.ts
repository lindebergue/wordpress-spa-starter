import * as React from 'react'

export function concatRefs<T>(...refs: React.Ref<T>[]): React.Ref<T> {
  return (instance: T) => {
    refs.forEach((ref) => ref && updateRef(ref, instance))
  }
}

export function updateRef<T>(ref: React.Ref<T>, instance: T) {
  if (typeof ref === 'function') {
    ref(instance)
  } else {
    (ref as React.MutableRefObject<T>).current = instance
  }
}
