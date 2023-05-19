
import { ProductsPage } from "@/components/products-page"
import { useRouter } from 'next/router';


const Products = ({ }) => {
    const router = useRouter()
    const category = Object.keys(router.query)[0]
   
    return <ProductsPage cat={category} type={router.query[`${category}`]}/>
}


// export async  function getServerSideProps(){
// const productsData = await getProductsDataByCat("", "", 0, true)
// console.log(productsData);

// }

export default Products