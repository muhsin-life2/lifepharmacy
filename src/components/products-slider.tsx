import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper";
import { SingleProductData } from "./single-product-data";

const ProductsSlider = ({ proData }: { proData: any }) => {
    return <>
        <Swiper
            className="my-7"
            slidesPerView={2}
            modules={[Autoplay]}
            breakpoints={{
                // when window width is >= 640px
                1024: {
                    width: 1024,
                    slidesPerView: 4,
                },
                // when window width is >= 768px
                520: {
                    width: 520,
                    slidesPerView: 3
                },
            }}>
            {proData.map((pro_data:any) => (
                <SwiperSlide className="cursor-grab w-full mr-5">
                    <SingleProductData pro_data={pro_data} />
                </SwiperSlide>
            ))}

        </Swiper></>
}

export default ProductsSlider