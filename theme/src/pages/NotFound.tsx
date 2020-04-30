import * as React from 'react'
import { Helmet } from 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página não encontrada | Website</title>
      </Helmet>
      <h1>Oops, página não encontrada!</h1>
    </>
  )
}
