import DynamicSliderGrid from "./dynamic-slider-grid";
import DynamicGrid from "./dynamic-grid";
import { useState, useEffect, FC } from "react";
import { useWindowSize } from '@react-hook/window-size'
import Products from "./products";
import { useRouter } from 'next/router';


interface compProps {
    data: any
    lang: string
    children: any
    setLoading: boolean
}

const PageStructure: FC<compProps> = ({ data, lang, children, setLoading }) => {

    const [domLoaded, setDomLoaded] = useState(false);
    const [width, height] = useWindowSize();
    const router = useRouter()
    const { pathname } = useRouter()

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    // function getProductsDatas(catName) {
    //     getProductsData(lang, catName).then(res => setProData(res.data.products)
    //      )

    //     return proDatas
    // }
    return (
        domLoaded ?
            <div >
                {
                    data.section_type === "dynamic_slider_grid" ?

                        width <= 565 ?
                            <DynamicSliderGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                            :
                            <DynamicSliderGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                        : ""
                }
                {
                    data.section_type === "dynamic_grid" ?
                        width <= 565 ?
                            <DynamicGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                            : <DynamicGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                        : ""
                }
                {
                    data.section_type === "product_grid" && (data.is_section_visible || data.is_enabled) ?
                        <>
                            <div className="flex justify-center my-5">
                                <h4 className="md:text-xl text-sm text-center font-bold flex-1">{data.section_title}</h4>
                                <button onClick={() => { router.push(`${pathname?.substring(0, 6)}/home/products?collections=${data.section_data_object.slug}`) }} className="bg-[#39f] px-2 text-white text-xs">View All</button>
                            </div>
                            {children}
                        </>
                        : ""
                }
            </div>
            :
            setLoading ? <div className="mx-auto max-w-[1450px] px-[10px]">
                <a className="card relative flex w-full flex-col overflow-hidden rounded bg-white"
                ><div className="text-primary-500 relative md:pt-[30rem] pt-[20rem]">
                        <div className="absolute left-0 top-0 h-full w-full"><span className="skeleton-box relative bg-[#e2e8f0] block h-full"></span></div>
                    </div>
                    <div className="relative flex-grow  text-left">
                        <div className="flex justify-between space-x-5 py-5 overflow-x-auto no-scrollbar">
                            <span className="skeleton-box relative bg-[#e2e8f0] inline-block h-52 px-[7rem] rounded-xl"></span>
                            <span className="skeleton-box relative bg-[#e2e8f0] inline-block h-52 px-[7rem] rounded-xl"></span>
                            <span className="skeleton-box relative bg-[#e2e8f0] inline-block h-52 px-[7rem] rounded-xl"></span>
                            <span className="skeleton-box relative bg-[#e2e8f0] inline-block h-52 px-[7rem] rounded-xl"></span>
                            <span className="skeleton-box relative bg-[#e2e8f0] inline-block h-52 px-[7rem] rounded-xl"></span>
                            <span className="skeleton-box relative bg-[#e2e8f0] inline-block h-52 px-[7rem] rounded-xl"></span>
                        </div>
                    </div>
                    <div className="relative flex-grow text-left">
                        <div className="flex justify-between space-x-4"><span className="skeleton-box relative bg-[#e2e8f0] inline-block h-36 w-1/2 rounded-xl"></span><span className="skeleton-box relative bg-[#e2e8f0] inline-block h-36 w-1/2 rounded-xl"></span></div></div
                    ></a>
            </div> : null
    )
}

export default PageStructure;