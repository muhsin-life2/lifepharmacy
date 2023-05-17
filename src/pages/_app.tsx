import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Layout } from '@/components/layout'
import getCategoryData from '@/lib/getCategoryData'
import getBrandsData from '@/lib/getBrandsData'
import { getSession } from 'next-auth/react'

import langData from '../locales/en.json'
import { Poppins } from 'next/font/google';
 
const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});
type TProps = AppProps & {
  data: any,
  brands_data: any, 
  session: any,
};


const App = ({ Component, data, brands_data, session, pageProps }: TProps) => {

  return (
    <SessionProvider session={session}>
      <main className={poppins.className}>
      <Layout data={data} brands_data={brands_data} sessionServ={session} isArabic={false} lang={"en"} langData={langData}>
        <Component {...pageProps} />
      </Layout>
      </main>
    </SessionProvider>
  )

}

App.getInitialProps = async (context: any) => {

  const data = await getCategoryData()

  const brands_data = await getBrandsData()

  const session = await getSession(context);
  var userAddrData = {
    data: {
      addresses: []
    }
  };
  if (session) {
    const userAddrheaderRes = await fetch('https://prodapp.lifepharmacy.com/api/user/addresses', {
      headers: {
        Authorization: `Bearer ${session.token.token}`
      }
    });
    userAddrData = await userAddrheaderRes.json();
  }
  return {
    data,
    brands_data,
    session
  };
};

export default App;