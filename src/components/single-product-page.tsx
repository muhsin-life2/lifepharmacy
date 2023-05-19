import { useState, useEffect } from "react";
import getProductsData from "@/lib/getProductsData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import getSingleProductData from "@/lib/getSingleProductData";
import { useLanguage } from "@/hooks/useLanguage";
const SingleProductsContent = ({ pro_data }: { pro_data: any }) => {

    const [selectedImg, setSelectedImg] = useState(0);
    const [noOfProducts, setNoOfProducts] = useState(1);
    const [addedToCart, addToCart] = useState(false);
    const [readMorClick, setReadMoreCLick] = useState(false)
    const [FeaturedImage, setFeaturedImage] = useState("https://www.lifepharmacy.com/images/default-product-image.png")
    const [data, setData] = useState(
        {
            title: "",
            sku: "",

            filter_price: "",
            short_description: "",
            sale_price: 0,

            description: "",
            images: {
                featured_image: "",
                gallery_images: [{
                    thumbnail: "",
                    full: ""
                }]
            },
            offers: {
                value: "",
            },
            rating: 0,
            number_of_reviews: 0,
            label: {
                color_code: "",
                label_text: ""
            },
            categories: [
                {

                }
            ]
        });

    const pathname = usePathname();
    const { locale } = useLanguage();

    useEffect(() => {
        getSingleProductData(locale ? locale : "ae-en", pro_data).then(data => {
            console.log(data);
            setData(data.data.product)
            setFeaturedImage(data.data.product.images.featured_image);

        })


    }, [])

    function cartItemAdded() {
        setTimeout(() => {
            addToCart(false)
        }, 1500)

        addToCart(true)
    }

    function addButtonClick() {
        setNoOfProducts(pro => pro + 1);
    }
    function minusButtonClick() {
        if (noOfProducts != 1) {
            setNoOfProducts(pro => pro - 1);
        }
    }

    function calculateRating(rating: number) {
        const fullStars = Math.round(rating);
        const halfStars = Math.round((rating - fullStars) * 2);

        const stars = new Array(5).fill(<FaRegStar className="text-amber-500 w-4 h-4" />);
        stars.fill(<FaStar className="text-amber-500 w-4 h-4" />, 0, fullStars);
        if (halfStars === 1) {
            stars[fullStars] = <FaStarHalfAlt className="text-amber-500 w-4 h-4" />;
        }
        return stars;
    }
    // function classNames(...classes) {
    //     return classes.filter(Boolean).join(' ')
    // }


    return (
        <>
            <div className="max-w-[1450px] mx-auto md:text-sm sm:text-xs md:bg-white bg-slate-50 py-5 px-[10px]">
                {data.title != "" ?
                    <div>
                        <div className="mx-auto flex flex-wrap ">
                            <div className="hidden md:block">
                                {data.images.gallery_images && data.images.gallery_images[0] ?
                                    <div className="mr-4  ">
                                        {data.images.gallery_images.map((gal_img: any, indx: number) => (
                                            <Image className={`lg:max-w-[4.5rem] mb-3 rounded-lg cursor-pointer ${selectedImg === indx ? "border-2 border-blue-400  " : ""}`} src={gal_img.thumbnail} height={80} width={80} onClick={() => {
                                                setSelectedImg(indx)
                                                setFeaturedImage(gal_img.full)
                                            }} alt="thumbnail-img" />
                                        ))}
                                    </div>
                                    :
                                    <div className="mr-4">
                                        <Image className={"border-2 border-blue-400 rounded-lg mb-3 w-full lg:max-w-[4.5rem]"} src={data.images.featured_image} height={80} width={80} alt="thumbnail-img" />
                                    </div>
                                }
                            </div>

                            <div className="xl:w-1/4 lg:w-3/12 md:w-1/2 w-full  m-2 relative bg-[url('/images/default-product-image.png')] bg-bottom">
                                <Image alt="ecommerce" className="w-full object-cover object-center rounded-lg " height={300} width={300} src={FeaturedImage} />
                                {data.offers && data.offers.value ?
                                    <div className="absolute right-3 top-3 bg-red-500 rounded-full text-white lg:text-xs text-[10px]  p-1 shadow-lg text-center w-[2.7rem]">{parseFloat(data.offers.value).toFixed(0)}% OFF</div> : null}
                                {data.label ? <div className={`bg-[${data.label.color_code}] skeleton-box absolute left-0 top-0 w-fit text-white px-5 rounded-tl-lg rounded-br-2xl py-1 text-sm`}>{data.label.label_text}</div> : null}

                            </div>
                            <div className=" md:hidden block mx-auto">
                                {data.images.gallery_images && data.images.gallery_images[0] ?
                                    <div className="grid grid-flow-col">
                                        {
                                            data.images.gallery_images.map((gal_img: any, indx: number) => (
                                                <Image className={`lg:max-w-[4.5rem] mr-4 rounded-lg ${selectedImg === indx ? "border-2 border-blue-400  " : ""}`} src={gal_img.thumbnail} height={80} width={80} onClick={() => {
                                                    setSelectedImg(indx)
                                                    setFeaturedImage(gal_img.full)
                                                }} alt="thumbnail-img" />
                                            ))}
                                    </div>
                                    : <div className="mr-4 ">
                                        <Image className={"border-2 border-blue-400 rounded-lg mb-3 w-full lg:max-w-[4.5rem]"} src={data.images.featured_image} height={80} width={80} alt="thumbnail-img" />
                                    </div>
                                }
                            </div>

                            <div className="xl:w-1/2 lg:w-5/12 w-full lg:px-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className=" xl:text-2xl lg:text-xl  title-font font-bold mb-1 text-[#002579]">{data.title}</h1>
                                <div className=" flex">

                                    <span className="flex items-center">
                                        {calculateRating(data.rating).map(str => (
                                            str
                                        ))}
                                    </span>
                                    <span className="text-gray-600 ml-3">{data.rating}</span>
                                </div>
                                <div className=" py-2 ">
                                    {data.categories.map((cat_data: any) => (
                                        <Link href={`${pathname?.substring(0, 6)}/home/products?categories=${cat_data.slug}`} className=" inline-flex mr-3 hover:text-white hover:bg-red-500 text-red-500  px-2 text-[10px] border border-red-500 rounded-md my-1">{cat_data.name}</Link>
                                    ))}
                                </div>
                                <div className="relative">
                                    <div className={`leading-relaxed text-gray-500 md:text-base sm:text-sm text-xs ${readMorClick ? "from-white to-gray-200" : " overflow-y-hidden h-24 bg-gradient-to-b "}`} dangerouslySetInnerHTML={{ __html: data.short_description }} />
                                    {readMorClick ?
                                        <button onClick={() => { setReadMoreCLick(false) }} className="text-blue-500 text-xs text-center mx-auto w-full">read less</button>
                                        :
                                        (data.short_description).length > 300 ?
                                            <button onClick={() => { setReadMoreCLick(true) }} className="text-blue-500 text-xs text-center mx-auto w-full h-5 ">read more</button> : null

                                    }
                                </div>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    <div className="title-font font-medium text-2xl text-gray-900">      <div className="flex justify-between">
                                        <div className="text-red-500 mr-3">
                                            <span className="text-[8px]">AED </span>
                                            <span className="font-semibold text-3xl">{data.sale_price}</span>
                                        </div>
                                        <div className="text-sky-500 text-xs my-auto">
                                            <span ><del>AED {parseFloat(data.filter_price).toFixed(2)}</del></span>
                                        </div>
                                    </div></div >
                                    <div className="flex mx-5  border-2 border-gray-300 py-1 px-2 text-violet-800 rounded-full">
                                        <Image className="my-auto" data-v-11f2193b="" src="https://www.lifepharmacy.com/images/express-nr.svg" width={20} height={22} alt={"delivery-spped"} />
                                        <span className="text-xs my-auto ml-3">1-3 HOURS</span>
                                    </div>
                                </div>
                                <div className="flex justify-center h-fit py-5">
                                    <input type="number" value="1" min="1" max="20" className=" rounded rounded-r-none bg-gray-200 w-20 border-none text-center text-sm text-gray-500 " />
                                    <button className="  text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded w-full ">Add to Cart</button>
                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center  group/wishlist hover:text-red-600 text-gray-500 ml-4">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5  scale-100 group-hover/wishlist:scale-125 active:text-pink-400" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <ul className="flex flex-col hidden lg:flex xl:w-1/6 flex-1  py-6">
                                <li className="flex  mb-12 lg:w-fit w-1/2">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-gift.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">Free Delivery</h5>
                                        <div className="text-xs text-gray-400">For all orders over AED 29</div>
                                    </div>
                                </li>
                                <li className="flex  mb-12 lg:w-fit w-1/2">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-return.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">Easy Return</h5>
                                        <div className="text-xs text-gray-400">Easy return and refund</div>
                                    </div>
                                </li>
                                <li className="flex  mb-12">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-shield.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">Secure Payments</h5>
                                        <div>
                                            <Image src={"https://www.lifepharmacy.com/images/payment-method.svg"} height={200} width={200} alt="free delivery" />
                                        </div>
                                    </div>
                                </li>
                                <li className="flex  mb-12">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-phone.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">24/7 Support</h5>
                                        <div className="text-xs text-gray-400">Dedicated Support</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className="grid sm:grid-cols-4 grid-cols-2  justify-around  lg:hidden mx-4 space-x-3 mb-4">
                                <li className="  mb-3 bg-slate-100 p-2 rounded-lg">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-gift.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">Free Delivery</h5>
                                        <div className="text-xs text-gray-400 text-center">For all orders over AED 29</div>
                                    </div>
                                </li>
                                <li className="  mb-3 p-2 rounded-lg bg-slate-100 ">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-return.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">Easy Return</h5>
                                        <div className="text-xs text-gray-400 text-center">Easy return and refund</div>
                                    </div>
                                </li>
                                <li className="  mb-3 p-2 rounded-lg bg-slate-100 ">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-shield.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">Secure Payments</h5>
                                        <div>
                                            <Image src={"https://www.lifepharmacy.com/images/payment-method.svg"} className="mx-auto mb-3 " height={150} width={150} alt="free delivery" />
                                        </div>
                                    </div>
                                </li>
                                <li className="  mb-3 p-2 rounded-lg bg-slate-100 ">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-phone.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">24/7 Support</h5>
                                        <div className="text-xs text-gray-400 text-center">Dedicated Support</div>
                                    </div>
                                </li>
                            </ul>
                        </div>



                        <div className="flex justify-between">
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-1.gif" width="48%" className="" />
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-2.gif" width="48%" className="" />
                        </div>
                        <div className="py-4">
                            <h5 className="text-pink-700 text-xl font-semibold mb-2">Overview</h5>
                            <div dangerouslySetInnerHTML={{ __html: data.short_description }} className="text-gray-500 md:text-sm text-xs leading-relaxed " />
                        </div>
                        <div className="py-4">
                            <h5 className="text-pink-700 text-xl font-semibold mb-2 details-sec">Details</h5>
                            <div dangerouslySetInnerHTML={{ __html: data.description }} className="text-gray-500 md:text-sm text-xs leading-relaxed " />
                        </div>
                        <div className="py-4">
                            <h5 className="text-pink-700 text-xl font-semibold mb-2">More Info</h5>
                            <div className="text-gray-500">SKU: {data.sku}</div>
                        </div>
                        <div className="lg:flex justify-center">
                            <div className="lg:w-3/12 w-full lg:px-0 px-6">
                                <div className="text-center">
                                    <h3 className="text-blue-500 font-semibold text-2xl p-2">Product Rating</h3>
                                    <h2 className=" font-semibold text-4xl p-5">{data.rating}<span className="text-gray-600">/5</span></h2>
                                    <div className="lg:w-1/2 w-1/4 mx-auto flex justify-around">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-center py-3">Based on {data.number_of_reviews} Ratings</div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '38%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '30%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '10%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-7/12 w-full py-3  ">
                                <h3 className="font-semibold text-xl ">Reviews (5 of 36)</h3>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <div className="block relative flex-grow lg:space-x-3 lg:flex">
                        <div className="flex w-full space-x-5">
                            <div className="flex max-h-[25rem] w-1/4 flex-col justify-between space-y-4">
                                <span className="skeleton-box relative inline-block h-24 max-w-[6rem] rounded-lg xl:max-w-[8rem]"></span>
                                <span className="skeleton-box relative inline-block h-24 max-w-[6rem] rounded-lg xl:max-w-[8rem]"></span>
                                <span className="skeleton-box relative inline-block h-24 max-w-[6rem] rounded-lg xl:max-w-[8rem]"></span>
                            </div>
                            <div className="flex w-full flex-col justify-between space-y-4 md:max-h-full">
                                <span className="skeleton-box relative inline-block h-full w-full rounded-xl"></span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col space-y-5  py-5 xl:py-0">
                            <span className="skeleton-box relative inline-block h-7 w-full rounded-md"></span>
                            <span className="skeleton-box relative inline-block h-7 w-2/3 rounded-md"></span>
                            <span className="skeleton-box relative inline-block h-7 w-1/2 rounded-md"></span>
                            <span className="skeleton-box relative inline-block h-7 w-3/4 rounded-md"></span>
                            <span className="skeleton-box relative inline-block !mt-auto h-10 w-full rounded-md"></span>
                            <div className="flex space-x-4">
                                <span className="skeleton-box relative inline-block h-7 !mt-auto w-1/4 rounded-md"></span>
                                <span className="skeleton-box relative inline-block h-7 !mt-auto w-1/4 rounded-md"></span>

                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}


export default SingleProductsContent;