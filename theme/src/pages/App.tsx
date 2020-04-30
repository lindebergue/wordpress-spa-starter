import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CacheProvider } from 'rest-hooks'

import { Loader } from '../components/Loader'

const Home = React.lazy(() => import('./Home'))
const NotFound = React.lazy(() => import('./NotFound'))

export default function App() {
  return (
    <CacheProvider>
      <HelmetProvider>
        <BrowserRouter>
          <Route>
            {({ location }) => (
              <Loader>
                <Switch location={location}>
                  <Route path='/' component={Home} exact />
                  <Route component={NotFound} />
                </Switch>
              </Loader>
            )}
          </Route>
        </BrowserRouter>
      </HelmetProvider>
    </CacheProvider>
  )
}
