import 'bulma/css/bulma.min.css'
import '../styles/globals.css'
import Link from "next/link"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='layout vbox'>
      <section className="hero is-info">
        <div className="hero-body">
          <p className="title">
            <Link href="/">Mo Links</Link>
          </p>
          <p className="subtitle">
            No Problems
          </p>
        </div>
      </section>
      <section className="section layout vbox">
        <div className="container layout self-center">
          <Component {...pageProps} />
        </div>
      </section>
    </div>
  )
}

export default MyApp
