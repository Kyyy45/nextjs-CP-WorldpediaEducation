import React from 'react'
import Navbar from '@/components/navigation/navbar'
import FAQ from '@/components/faq/FAQPage'

const FAQPage = () => {
  return (
    <main className="relative bg-black flex justify-center  overflow-hidden mx-auto">
      <div className="max-w-7xl h-full w-full">
        <Navbar/>
        <FAQ/>
      </div>
    </main>
  )
}

export default FAQPage