import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Website</title>
      </Helmet>
      <h1>Hello, world!</h1>
      <Link to='/404'>Not found!</Link>
    </>
  )
}
