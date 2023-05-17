import getHomePageData from '@/lib/getHomePageData'
import Image from 'next/image'
import PageStructure from '@/components/page-structure';
import Products from '@/components/products';
export default function Home({ homePageData }: { homePageData: any }) {
  return (
    <div className='max-w-[1450px] px-[10px] mx-auto'>
      {
        homePageData.data.content.map((data: any, ind: number) => (
          <PageStructure data={data} lang={"ae-en"} setLoading={ind === 0 ? true : false}>
            <Products lang={"ae-en"} slug={data.section_data_object?.slug} type_key={data.section_data_object?.type_key} />
          </PageStructure>))
      }
    </div>
  )
}

export async function getServerSideProps() {

  const homePageData = await getHomePageData("en");

  return {
    props: {
      homePageData
    }
  }

}
