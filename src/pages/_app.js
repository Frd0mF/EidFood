import '@/styles/globals.css'
import { Roboto } from '@next/font/google'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'

const RobotoFont = Roboto({
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <div className="px-6 py-6 lg:px-12">
      <Navbar />
      <main className={(RobotoFont.className)}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}
