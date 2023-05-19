import React from 'react'
import { useEffect, useState } from 'react';
import ProductsPageData from './products-page-data';
import getProductsDataByCat from '@/lib/getProductsDataByCat';
import { useLanguage } from '@/hooks/useLanguage';
export const ProductsPage = ({ cat, type }: { cat: any, type: any }) => {

    const [data, setData] = useState([{
    }])
    const [noOfProducts, setNoOfProducts] = useState(40)
    const [animateSpin, setAnimateSpin] = useState(false)
    const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true)
    const { locale } = useLanguage();
    // function getApiUrl(isProductsPage: boolean, cat: string, type: any, noOfProducts: number) {
    //     const url = `https://prodapp.lifepharmacy.com/api/web/products?${isProductsPage ? "" : cat != "" ? `${cat}=${type}&` : ""}order_by=popularity&type=cols&skip=${noOfProducts}&take=40&new_method=true&lang=`
    //     console.log(url);

    //     return url
    // }

    function fetchData(query: any, noOfProducts: number, loadMoreData: boolean) {
        if (query === null) {
            getProductsDataByCat(query, type, noOfProducts, true, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        setData([...data, ...proData.data.products])
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                    }
                }
            )
        }
        else {
            getProductsDataByCat(query, type, noOfProducts, false, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        setData([...data, ...proData.data.products])
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                    }
                }
            )
        }

    }

    function loadMoreProducts() {
        setAnimateSpin(true)
        fetchData(cat, noOfProducts, true)
        setNoOfProducts(c => c + 40)
    }
    useEffect(() => {
        fetchData(cat, 0, false)
    }, [])


    return (
        <div className='pb-5'>
            <p className='hidden bg-[#fb7979] bg-[#9b274f] bg-[#f50a0a] bg-[#f245a1] bg-[#ef0b0b] bg-[#f90101] bg-[#d81851]'></p>
            <div className="max-w-[1450px] h-[10rem] px-[10px] grid items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y">
                <h1 className='text-3xl my-auto text-center font-bold  capitalize text-blue-500'>{type ? String(type).toLowerCase().replace(/-/g, ' ') : "Products"} </h1>
            </div>
            <ProductsPageData data={data} />
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