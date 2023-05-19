import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'


export default function Example({ acc_data }: { acc_data: any }) {

    const { asPath } = useRouter()



    function LoadImages(imagesrc: any) {
        if (imagesrc.logo === null && imagesrc.banner === null) {
            return "https://www.lifepharmacy.com/images/life.svg"
        }
        else if (imagesrc.logo === null) {
            return imagesrc.banner;
        }
        else {
            return imagesrc.logo;
        }
    }
    function slugify(text: string) {
        return text.toLowerCase().replace(/[\s&]+/g, '-');
    }

    return (
        <div className="w-full grid lg:grid-cols-2 px-2">
            {acc_data.map((cat_data: any, indx: number) => (
                cat_data.sections.length > 0 ?
                    <div className="mx-auto w-full rounded-2xl bg-white p-2">
                        <Disclosure defaultOpen={true}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-100 px-4 py-2 text-left text-sm font-medium text-slate-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
                                        <h2 className='font-semibold'>{cat_data.name}</h2>
                                        <ChevronUpIcon
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } h-5 w-5 font-bold`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm border-gray-200 border bg-[#f4f7ff] rounded-xl my-2  text-gray-500">
                                        <div className="grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 gap-y-5 p-2">{cat_data.sections.map((ch_data: any) => (
                                            <Link href={`products/${slugify(ch_data.name)}`} className=" xl:flex mx-2  hover:bg-white rounded-lg p-2 hover:border-gray-200 hover:border border border-gray-50 group/item">
                                                <Image className="xl:mx-0 mx-auto group-hover/item:scale-110 transition scale-100 duration-200 ease-in-out h-[50px] w-[50px]" src={LoadImages(ch_data.images)} height={50} width={50} alt={ch_data.name} />
                                                <p className="xl:mx-3 xl:my-auto mt-3 xl:text-left ml-0 text-center text-[11px] my-auto ">{ch_data.name}</p>
                                            </Link>
                                        ))}</div>                                </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/* <Disclosure as="div" className="mt-2">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Do you offer technical support?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    No.
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure> */}
                    </div>
                    : null
            ))}

        </div>
    )
}