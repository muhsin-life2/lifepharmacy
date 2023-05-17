import React, { FC } from 'react'
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { SingleProductData } from './single-product-data';
import { useEffect, useState } from 'react';
import getProductsSearchData from '@/lib/getProductsSearchData';
import getProductsDataByCat from '@/lib/getProductsDataByCat';
import { ProductsSkeleton } from './productsSkeleton';

const skeletonArray = Array(12).fill(<ProductsSkeleton />)

export const ProductsPage = ({ }) => {
    const [data, setData] = useState([{
    }])
    const [noOfProducts, setNoOfProducts] = useState(40)
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [productCatType, setProductCatType] = useState<string>("")
    const [animateSpin, setAnimateSpin] = useState(false)
    const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true)
    const [productCatParams, setroductCatParams] = useState({ searchPara: "", paramName: "" });
    function loadMoreProducts() {
        setAnimateSpin(true)
        if (productCatParams.paramName === "search") {
            getProductsSearchData(productCatParams.searchPara, noOfProducts).then(res => {
                setData([...data, ...res.data.products])
                setAnimateSpin(false)
                setShowMoreProductsbtn(false)
            })
        }
        else if (productCatParams.paramName === "products") {
            getProductsDataByCat(productCatParams.searchPara, productCatType, noOfProducts).then(res => {
                setData([...data, ...res.data.products])
                setAnimateSpin(false)
                setShowMoreProductsbtn(false)
            })
        }
        setNoOfProducts(c => c + 40)
    }
    useEffect(() => {

        const termParams = searchParams?.get('term')
        var productCatParams
        var type = ""

        if (searchParams?.get('categories') != undefined) {
            type = 'categories'
            productCatParams = searchParams?.get('categories')
        }
        else if (searchParams?.get('collections') != undefined) {
            type = 'collections'
            productCatParams = searchParams?.get('collections')
        }

        if (termParams != undefined) {
            setroductCatParams({ searchPara: termParams, paramName: "search" })
            setProductCatType(type)
            getProductsSearchData(termParams, 0).then(res => {
                setData(res.data.products);
            })
        }
        else if (productCatParams != undefined) {
            setroductCatParams({ searchPara: productCatParams, paramName: "products" })
            getProductsDataByCat(productCatParams, type, 0).then(res => {
                setData(res.data.products);
            })
        }
    }, [])

    // function reviewColor(rating) {
    //     if (rating == 0) {
    //         return "gray"
    //     }
    //     else {
    //         return "orange"
    //     }
    // }
    return (
        <div className='pb-5'>
            <p className='hidden bg-[#fb7979] bg-[#9b274f] bg-[#f50a0a] bg-[#f245a1] bg-[#ef0b0b] bg-[#f90101] bg-[#d81851]'></p>
            <div className="bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative">
                <h1 className='text-3xl text-center font-bold p-9 capitalize text-blue-500'>{productCatParams.paramName === "products" ? productCatParams.searchPara.toLowerCase().replace(/-/g, ' ') : "Products"} </h1>
            </div>
            <div className='py-5 max-w-[1450px] px-[10px] mx-auto'>
                <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 " aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href={`${pathname?.substring(0, 6)}/home`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 ">
                                <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <a href={`${pathname?.substring(0, 6)}/home/search`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 ">Products</a>
                            </div>
                        </li>

                    </ol>

                </nav>
                <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 min-[300px]:grid-cols-2 grid-cols-1  sm:gap-3 gap-1'>
                    {data.length > 1 ? data.map(pro_data => (
                        <SingleProductData pro_data={pro_data} />
                    )) : skeletonArray.map(sk =>
                        sk
                    )}
                </div>
            </div>
            {showMoreProductsbtn ?
                <div className='w-full flex justify-center'>
                    <button onClick={() => { loadMoreProducts() }} className='bg-[#39f] text-white px-3 py-2 flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6 ${animateSpin ? 'animate-spin' : ''}`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <p className='mx-3'>Load More Products</p> </button>
                </div>
                : null}
        </div>
    )
}