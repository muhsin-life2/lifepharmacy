import { GetStaticPaths, GetStaticProps } from "next"
import getHomePageData from "@/lib/getHomePageData"
import getSingleProductData from "@/lib/getSingleProductData"
import SingleProductsContent from "@/components/single-product-page"
const SingleProductPage = ({ pagesParams }: { pagesParams: any}) => {



    return (
        <SingleProductsContent pro_data={pagesParams}  />
    )
}

export default SingleProductPage

export const getStaticPaths = async () => {



    // const paths = [...new Set(slugs)].map((slug) => (
    //     {
    //         params: {
    //             pages: slug
    //         }
    //     }

    // ))

    return {
        fallback: "blocking",
        paths: []
    };
}
export const getStaticProps = async (context: any) => {
    const pagesParams = context.params?.singleProduct;
    return {
        props: {
            pagesParams,
        },
    };
};