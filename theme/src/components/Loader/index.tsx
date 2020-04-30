import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { TransitionGroup, Transition } from 'react-transition-group'

import { Animation, DOMKeyframe } from '../Animation'

import styles from './styles.scss'

const TIMEOUT = 1000

export interface LoaderProps {
  children: React.ReactNode
}

export const Loader: React.FunctionComponent<LoaderProps> = ({ children }) => {
  const location = useLocation()
  const [pendingPages, setPendingPages] = React.useState<{ [pathname: string]: boolean }>({})
  const [isFirstLoad, setFirstLoad] = React.useState(true)

  React.useEffect(() => {
    const isPending = Object.values(pendingPages).filter((pending) => pending).length > 0
    if (isPending) {
      document.body.classList.add(styles.loading)
    } else {
      document.body.classList.remove(styles.loading)
    }
  }, [pendingPages])

  React.useEffect(() => {
    window.ga?.('set', 'page', location.pathname)
    window.ga?.('send', 'pageview')
  }, [location.pathname])

  return (
    <TransitionGroup component={null}>
      <Transition
        key={location.pathname}
        timeout={TIMEOUT}
      >
        {(state) => {
          if (state === 'unmounted') {
            return null
          }

          return (
            <>
              <Animation
                in={state === 'entering' || pendingPages[location.pathname]}
              >
                <DOMKeyframe
                  className={styles.overlay}
                  onEnter={isFirstLoad ? undefined : {
                    from: { y: '100%' },
                    to: { y: '0%' }
                  }}
                  onExit={{
                    from: { y: '0%' },
                    to: { y: '-100%' }
                  }}
                />
              </Animation>
              {(state === 'entered' || state == 'exiting') && (
                <React.Suspense
                  fallback={
                    <LoaderFallback>
                      {() => {
                        const start = Date.now()

                        setFirstLoad(false)
                        setPendingPages((pages) => ({
                          ...pages,
                          [location.pathname]: true
                        }))

                        return () => {
                          const elapsed = Date.now() - start
                          if (elapsed < TIMEOUT) {
                            setTimeout(
                              () => setPendingPages((pages) => ({
                                ...pages,
                                [location.pathname]: false
                              })),
                              TIMEOUT - elapsed
                            )
                          } else {
                            setPendingPages((pages) => ({
                              ...pages,
                              [location.pathname]: false
                            }))
                          }
                        }
                      }}
                    </LoaderFallback>
                  }
                >
                  {children}
                </React.Suspense>
              )}
            </>
          )
        }}
      </Transition>
    </TransitionGroup>
  )
}

interface LoaderFallbackProps {
  children: React.EffectCallback
}

const LoaderFallback: React.FunctionComponent<LoaderFallbackProps> = ({ children }) => {
  React.useEffect(children, [])
  return null
}
