import Head from 'next/head'
import React from 'react'

export default function Index() {
  return (
    <>
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=G-EYZRXJNM1Q`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EYZRXJNM1Q',{
            page_path: window.location.pathname
          });
          `
          }} />
      </Head>
      <main>
        Home
      </main>
    </>
  )
}