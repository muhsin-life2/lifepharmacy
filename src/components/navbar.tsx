import Image from "next/image";
import { useEffect } from "react";
import { useState, useRef, Fragment } from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import OtpField from "react-otp-field";
import Countdown from "react-countdown";
import { useTimer } from "use-timer";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper'
import 'swiper/css';
import 'swiper/css/pagination';
import Example from "./categories-accordion";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import TransitionComp from "./transition";

import AccountDetails from "./accountDetails";
import LanguageChangeModal from "./language-change-modal";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { removeFromCart } from "../redux/cart.slice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import React, { FC } from 'react'

interface navbarProps {
  data: any,
  brands_data: any,
  sessionServ: any,
  isArabic: boolean,
  lang: string,
  langData: any,
  languageClickedToast: any
}


const Navbar: FC<navbarProps> = ({ data, brands_data, sessionServ, isArabic, lang, langData, languageClickedToast }) => {

  const { data: session } = useSession()
  const { asPath } = useRouter()
  const pathName = asPath
  const [searchData, setData] = useState({
    results: [
      {
        hits: [
          {
            title: "",
            images: {
              featured_image: "https://www.life-me.com/wp-content/themes/LifePharmacy/assets/images/life-pharmacy-logo-white.png"
            },
            query: "",
            slug: ""
          }
        ]
      },

    ]

  })

  const [phoneNumber, setPhoneNumber] = useState('');
  const [signInUsing, signInSet] = useState("");
  const [isPhoneNumberValid, setPhoneNumberValidState] = useState(false);
  const [isEmailValid, setEmailValidState] = useState(false);
  const [state, setState] = useState('');
  const [phoneNumberforOTP, setPhoneNumberforOtp] = useState('');
  const [showElement, setShowElement] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlay] = useState(false);
  const [searchClosebtn, setVisibility] = useState(false);
  const [otpPageVisibility, setOtpPageVisibility] = useState(false);
  const [notValidOTPPageVisib, setnotValidOTPPageVisib] = useState(false);
  const [welcomeBackPopUp, setwelcomeBackPopUp] = useState(false);
  const [addNewAddress, setaddNewAddress] = useState(false);
  const [addNewAddressClick, setAddNewAddressClick] = useState(false);
  const [cartItemsVisib, setCartItemsVisib] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const [addnewAddressFormVisibility, setaddnewAddressFormVisibility] = useState(false);
  const [availableAddresses, setavailableAddresses] = useState(true);
  const [languageModal, setLanguageModal] = useState(false)

  // const [authModal, setauthModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false)
  const [smScreenSearchBox, setSmScreenSearchBox] = useState(false)
  const [SearchLoadingState, setSearchLoadingState] = useState(false)
  const path_name = lang;
  const parts = path_name?.split("-");
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();




  useEffect(() => {
    setDomLoaded(true);

    if (!showDropdown) return;
    function handleClick(event: any) {

    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);



  }, []);



  // const [pathCountry, setPathCountry] = useState(parts[0])
  // const [pathLang, setPathLang] = useState(parts[1])
  function setCountryFlag() {
    // if(parts === undefined){
    //   return countries[0].flag
    // }
    if (parts[0] === 'sa') {
      return countries[1]
    }
    else {
      return countries[0]
    }
  }

  function setLanguage() {
    if (parts === undefined) {
      return languages[1]
    }
    if (parts[1] === 'en' || parts[1] === '') {
      return languages[1]
    }
    else {
      return languages[0]
    }
  }
  // function languageClickedToast(){


  // }
  const countries = [
    { country: 'United Arab Emirates', flag: 'https://www.lifepharmacy.com/images/svg/flag-ae.svg', path: "ae" },
    { country: 'Saudi Arabia', flag: 'https://www.lifepharmacy.com/images/svg/flag-sa.svg', path: "sa" },
  ]
  const languages = [
    { name: "Arabic", path: "ar" },
    { name: "English", path: "en" }
  ]
  const [countrySet, setCountry] = useState(setCountryFlag())
  const [chooseCountr, setChooseCountr] = useState(true)
  const [chooseLanguage, setChooseLanguage] = useState(false)
  const [laguage, setLaguage] = useState(setLanguage())

  // function languageClicked(lan) {
  //   setChooseCountr(false);
  //   setChooseLanguage(true);
  //   setLaguage(lan)
  // }

  function languageBackClicked() {
    setChooseCountr(true);
    setChooseLanguage(false);
  }

  const [showDropdown, setShowDropdown] = useState(false);
  const [AddressDataIndex, setAddressDataIndex] = useState(sessionServ?.token?.addresses[0]);



  const handleChange = (state: string) => setState(state);

  // const [seconds, setSeconds] = useState(59);
  const [countDownVisible, setCountDownVisible] = useState(false);

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 59,
    timerType: 'DECREMENTAL',
  });

  function startTimer() {
    start();
    setCountDownVisible(true);
  }

  const stopTimer = () => {
    setCountDownVisible(false);
    reset();
    return 0;
  }
  function searchSuggestions(searchData: string, isMobile: boolean, type: string) {
    if (isMobile) {
      setSmScreenSearchBox(false)
    }
    else {
      searchButtonOnClick(false)
    }

    if (type === "search") {
      router.push(`/${lang}/home/search?term=${searchData}`)
    }
    else {
      router.push(`/${lang}/products/${searchData}`)
    }
  }

  function isValidCredentials(value: string) {
    if (value != null) {
      if (isValidPhoneNumber(value)) {
        setPhoneNumberValidState(true);
        setFormData({ ...formData, phone: value });
        signInSet("Phone");
      }
      else {
        setPhoneNumberValidState(false);
      }
    }
  }

  function isValidEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    const emailAddress: string = e.target.value;
    if (emailAddress !== null) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
        setEmailValidState(true);
        signInSet("Email");
      } else {
        setEmailValidState(false);
      }
    }
  }


  function setFocus() {
    (document.getElementById("sm-searchbox") as HTMLInputElement).focus();
  }

  var i = 1;

  function shopByCatOnMouseOver() {
    (document.getElementById("BeautyCareele") as HTMLInputElement).classList.remove("hidden");
    (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.add("text-blue-400", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50");
    i = 1;
  }

  function ulListTrigger(e: React.MouseEvent<HTMLLIElement, MouseEvent>, itemName: string) {
    var elements = document.getElementsByClassName("list-elements")
    for (var ele of elements) {
      if (!ele.classList.contains("hidden")) {
        ele.classList.add("hidden");
      }
    }
    if (i === 1 && itemName == "BeautyCareele") {
      (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.remove("text-blue-400", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50");
    }
    if (i === 1 && itemName != "BeautyCareele") {
      (document.getElementById("BeautyCareele") as HTMLInputElement).classList.add("hidden");
      (document.getElementById("BeautyCarebtn") as HTMLInputElement).classList.remove("text-blue-400", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50");
      (document.getElementById(itemName) as HTMLInputElement).classList.remove("hidden");
    }
    else {
      (document.getElementById(itemName) as HTMLInputElement).classList.remove("hidden");
    }
    i++
  }
  const [queryData, setQueryData] = useState("")

  function searchButtonOnClick(isOpen: boolean) {
    if (window.innerWidth > 767) {
      const lgScreenSearchBox = document.getElementById("lg-screen-search") as HTMLInputElement

      if (isOpen) {
        document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.remove("hidden");
        lgScreenSearchBox.classList.add("rounded-t-xl");
        lgScreenSearchBox.classList.remove("rounded-xl");

      }
      else {
        document.getElementsByClassName("lg-screen-searchsuggestion-lg")[0].classList.add("hidden");
        lgScreenSearchBox.classList.remove("rounded-t-xl");
        lgScreenSearchBox.classList.add("rounded-xl");
      }
      // if (counterV === 0) {
      //   searchText = ""
      // }
      // else {
      //   searchText = (document.getElementById("sm-searchbox") as HTMLInputElement).value

      // }
      // setCounterV(count => count + 1)
      // document.getElementsByClassName("lg-screen-searchsuggestion-sm")[0].classList.remove("hidden");

    }

    searchButtonOnMouseEnter(queryData, '', false)
  }
  function searchBoxClear() {
    setQueryData("")
    searchButtonOnMouseEnter("", '', true)
    setVisibility(false);
  }
  function searchButtonOnMouseEnter(query: string, key: string, isMobile: boolean) {
    if (key === 'Enter') {
      searchSuggestions(query, isMobile, "search")
    }
    else {
      var myHeaders = new Headers();
      myHeaders.append("X-Algolia-API-Key", "c54c5f0fc2e6bd0c3b97cfa5b3580705");
      myHeaders.append("X-Algolia-Application-Id", "WHCXS2GWOG");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "requests": [
          {
            "indexName": "products",
            "params": "query=" + query
          },
          {
            "indexName": "products_query_suggestions",
            "params": "query=" + query
          }
        ],
        "strategy": "none"
      });

      var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      setSearchLoadingState(true)

      fetch("https://WHCXS2GWOG-dsn.algolia.net/1/indexes/*/queries?lang=ae-ar", requestOptions)
        .then(response => response.json())
        .then(result => {
          setData(result);
          setSearchLoadingState(false);
        })
        .catch(error => console.log('error while fetching search data', error));

      if (query != "") {
        setVisibility(true);
      }
      else {
        setVisibility(false);

      }
      setQueryData(query)
    }
  }
  // const refreshData = () => {
  //   router.replace();
  // }
  function sendOTPtoPhoneNo(pHNumber: string, type: string) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw
    if (type === "phone") {
      raw = JSON.stringify({
        "phone": pHNumber
      });
    }
    else if (type === "email") {
      raw = JSON.stringify({
        "email": pHNumber
      });
    }

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    console.log(pHNumber);
    setPhoneNumberforOtp(pHNumber)
    const res = fetch("https://prodapp.lifepharmacy.com/api/auth/request-otp", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error while fetching search data', error));
  }

  function isValidPhoneNoInput(SetOtpVisb: boolean) {

    if (SetOtpVisb) {
      (document.getElementById("loginOrSignup") as HTMLInputElement).classList.add("hidden")
      setOtpPageVisibility(true);

      setState('');
      startTimer();

      if (signInUsing === "Phone") {
        const phoneNo = ((document.getElementById("phoneInputOTP") as HTMLInputElement).value).replace(/\+|\s/g, "").trim()
        sendOTPtoPhoneNo(phoneNo, "phone");
      }
      else {
        const emailId = (document.getElementById("emailInput") as HTMLInputElement).value

        // document.getElementById("emailInput").value
        sendOTPtoPhoneNo(emailId, "email");
      }
    }
    else {
      (document.getElementById("loginOrSignup") as HTMLInputElement).classList.remove("hidden")
      setOtpPageVisibility(false);
      stopTimer()
    }
  }

  async function otpIsValid(otpValue: string) {
    if (signInUsing === "Phone") {
      await signIn('credentials', { phone: phoneNumberforOTP, code: otpValue, isPhone: "true", redirect: false })
        .then(async (res) => {
          if (res?.ok) {
            // setModalAction("authentication-modal", "close")
            await refreshData().then(() => {

              setaddNewAddress(true);
              setLocationModal(false);
            })
          }
          else {
            // console.log(error)
            setnotValidOTPPageVisib(true)
          }
        })
    }
    else {
      await signIn('credentials', { email: phoneNumberforOTP, code: otpValue, isPhone: "false", redirect: false })
        .then(async (res) => {
          debugger
          if (res?.ok) {
            await refreshData().then(() => {
              setaddNewAddress(true);
              setLocationModal(false);
            })
            
          }
          else {
            // console.log(error)
            setnotValidOTPPageVisib(true)
          }
        })
      //for the address we use the same hook 
      setPhoneNumberValidState(false)
    }
  }

  function saveAddresstoDb() {
    debugger


    var requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionServ.token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    };
    console.log(requestOptions);
    const res = fetch("https://prodapp.lifepharmacy.com/api/user/save-address", requestOptions)
      .then(response => {
        if (response.ok) {
          setAddressDataIndex(0);
          setaddNewAddress(false);
          refreshData();
          return response.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then(result => console.log(result))
      .catch(error => console.log('error while fetching search data', error));


  }
  var addressId = sessionServ ? (sessionServ.length != 0 ? (sessionServ[sessionServ.length - 1]?.id) + 1 : 12345 + 1) : ""
  const [formData, setFormData] = useState({
    id: addressId,
    entity_id: 1462724,
    name: "",
    phone: "",
    longitude: "55.272887000000000",
    latitude: "25.219370000000000",
    type: "Home",
    country: "United Arab Emirates",
    state: "",
    city: "",
    area: "Satwa/Badaa",
    street_address: "",
    building: "",
    flat_number: "",
    suitable_timing: "0",
    created_at: "2023-03-16T08:09:22.000000Z",
    updated_at: "2023-03-16T08:09:22.000000Z",
    google_address: "Al Satwa - Dubai - United Arab Emirates",
    additional_info: "",
    belongs_to: "user",
    deleted_at: null,
    is_validated: 1
  });

  const router = useRouter();

  const refreshData = async () => {
    router.replace(router.asPath);
  }

  const formDatahandleChange = (e: any): void => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addressFormOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // setAddressData(formData)
    // console.log(AddressData);
    saveAddresstoDb()
    // console.log(formData);
    // setaddNewAddress(false)

    console.log(formData);
  };


  function displayedAddress(displayAddressData: any) {
    // console.log(sessionServ);

    return `${displayAddressData?.building}, ${displayAddressData?.flat_number} - ${displayAddressData?.street_address} - ${displayAddressData?.city} - ${displayAddressData?.area} - ${displayAddressData?.state} - ${displayAddressData?.country}`.substring(0, 30) + '...'
  }

  const [highestRatedP, sethighestRatedP] = useState(true)

  function locationOnClickHandle() {
    debugger
    if (sessionServ != null) {
      setaddNewAddress(true)

      if (sessionServ.token.addresses.length > 0) {
        setavailableAddresses(true)
      }
      else if (sessionServ.token.addresses.length == 0) {
        setAddNewAddressClick(true)
      }
    }
    else {
      setIsOpen(true);
    }

  }
  const setModalState = (modalState: any) => {
    setLanguageModal(modalState)
  }

  const removedFromCart = () => {
    toast.info(`Cart Suceesfully Updated`);
  }

  const calculateTotalCartPrice = (): string => {
    let totalPrice: number = 0;
    cartItems.forEach((pro_data: any) => {
      totalPrice += pro_data.prices[0].price.regular_price * pro_data.quantity;
    });
    return parseFloat(totalPrice.toString()).toFixed(2);
  };
  return (

    <>

      {highestRatedP ?
        <TransitionComp props={
          <div className="grid grid-flow-col  bg-pink-800 text-white  text-xs px-4 py-2 md:hidden ">
            <div className="flex justify-start">
              <svg onClick={() => { sethighestRatedP(false) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" className="w-5 h-7 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <div className="my-auto text-md mx-3">{langData.navbar.highest_rated_phar}</div>
            </div>

            <div className="text-end text-md my-auto">{langData.navbar.download_now}</div>
          </div>
        } setTransition={highestRatedP} />
        : null}

      <div className="sticky top-0  z-50 bg-white mx-auto ">

        <div className="md:bg-[#002579] bg-white  backdrop-blur backdrop-filter ">
          <div className="mx-auto flex max-w-[1450px] gap-5  py-4 px-[10px]">
            <Link href={"/"} className="my-auto">
              <Image src="https://www.lifepharmacy.com/images/logo-white.svg" alt=""
                className=" bg-[#002579] filter md:flex hidden" width={380} height={250} />

              <Image className="mr-auto w-7 lg:hidden md:hidden" src="https://www.lifepharmacy.com/images/life.svg" alt="" width={100} height={100} />

            </Link>

            <div className="flex items-center w-full " >
              <label htmlFor="simple-search-lg" className="sr-only">Search</label>
              <div className="relative w-full">

                <div className="relative group-search bg-white  rounded-xl " id="lg-screen-search" onKeyDown={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value, e.key, false) }} onMouseDown={(e) => { searchButtonOnClick(true) }}   >
                  <div className={`absolute inset-y-0  flex items-center pointer-events-none ${isArabic ? 'right-0 pr-3 ' : 'left-0 pl-3'}`}>
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"></path>
                    </svg>
                  </div>
                  {SearchLoadingState ?
                    <svg fill="none" className={`animate-spin w-5 h-5 absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""}



                  {/* large screen search bar */}
                  < input type="search" id="lg-searchbox"
                    className={`focus:ring-0 focus:ring-offset-0 hidden md:block bg-gray-100 border-gray-200 p-2 border text-gray-900 text-sm rounded-lg  block w-full ${isArabic ? 'pr-10 ' : 'pl-10 '} p-3`}
                    placeholder={langData.navbar.searchbox_text} />


                  <div className="shadow-xl py-1 pt-4 px-3 lg-screen-searchsuggestion-lg scale-100 hidden absolute top-13  right-0 left-0  bg-white border-gray-200 overflow-auto search-suggestion-height rounded-t-0 rounded-b-md z-30">
                    {searchData.results[1] ?
                      <>
                        <div className="mb-5 group-search">
                          {searchData?.results[1]?.hits[0] ?
                            <>
                              <h5 className="text-sky-500 text-xs ">SUGGESTIONS</h5>
                              <div className="flex my-2 flex-wrap text-[13px] text-gray-700 group-search">
                                {searchData.results[1].hits.slice(0, 10).map(sug_data => (
                                  <div onClick={() => {
                                    searchSuggestions(sug_data.query, false, "search")

                                  }} className="rounded-xl bg-gray-200 hover:bg-gray-300  py-1 px-3 mb-2 mr-2 cursor-pointer">{sug_data.query}</div>
                                ))}
                              </div></>

                            : ""}
                        </div>
                        <div className="text-gray-600 text-xs group-search">
                          <h5 className="text-sky-500 text-xs ">PRODUCTS</h5>
                          {searchData.results[0].hits[0] ? searchData.results[0].hits.map(pro_data => (
                            <div onClick={() => {
                              searchSuggestions(pro_data.slug, false, "products")
                            }} className="p-2 rounded-lg flex  group-search hover:bg-gray-100 w-full h-16 cursor-pointer">
                              <Image src={pro_data.images.featured_image} height={40} width={40} alt={pro_data.title}></Image>
                              <p className="mx-2  my-auto">{pro_data.title} </p>
                            </div>
                          )) : <div>No Products Found</div>}
                        </div>
                      </> : <div role="status" className="max-w-full animate-pulse">
                        <div className="group-search mb-5">
                          <h5 className="text-xs text-sky-500">SUGGESTIONS</h5>
                          <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                            <span className="sr-only">Loading...</span>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                            <div className="loading-style"></div>
                          </div>
                          <div className="group-search text-xs text-gray-600">
                            <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>


                            <div role="status" className="mb-3 flex">
                              <div className="loading-img "></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                            <div role="status" className="mb-3 flex">
                              <div className="loading-img"></div>
                              <div className="h-10 w-full mx-4">
                                <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                              </div>
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  {/* small screen search bar  */}
                  < input type="button" onClick={() => {
                    setSmScreenSearchBox(true)
                  }}
                    className={`cursor-pointer md:hidden block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ${isArabic ? "text-right pr-12" : "pl-10 text-left"}  p-3  rounded-full`}
                    value={langData.navbar.searchbox_text} />

                </div>
              </div>
            </div>

            <div className="grid grid-flow-col w-100  gap-5 md:flex lg:flex my-auto">

              <div className="relative mt-1 z-30">
                <button className="mx-auto my-auto " onClick={() => { setLanguageModal(true) }}>
                  <Image src={countrySet.flag} alt=""
                    className=" h-10 w-10" width={100} height={100} />
                  <div className="text-[11px] text-center md:text-white">{laguage.name === "Arabic" ? "English" : "Arabic"}</div>
                </button>
              </div>

              {session ? <>
                <Menu as="div" className="relative inline-block text-left my-auto">
                  <Menu.Button className="flex-col md:hidden lg:flex hidden" onClick={() => { setShowDropdown(!showDropdown) }}>

                    <img src="https://cdn-icons-png.flaticon.com/512/309/309748.png?w=740t=st=1678711444~exp=1678712044~hmac=9fdd9608d210eeffcc5069fd9c6888bb3fcb3407e24160947ac7f3c7a85ca203" className="w-9 h-9 my-auto mx-auto" />
                    <div className="text-[11px] text-center text-white">Account</div>

                  </Menu.Button>

                  <AccountDetails sessionData={sessionServ} signOut={signOut} refreshData={refreshData} />

                </Menu>


              </> : <a href="#" className=" flex-col md:hidden lg:flex hidden" onClick={() => { setLocationModal(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className=" my-auto text-white w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

                <div className="text-[11px] text-center text-white">{langData.navbar.account}</div>
              </a>}

              <a href={`/cart`} className="flex flex-col md:hidden lg:flex hidden relative cart group/cart">
                {domLoaded ?
                  cartItems && cartItems.length != 0 ?
                    < div className="bg-red-500 rounded-full absolute top-0 -right-2 text-xs py-[3px] px-[8px] text-white font-semibold">
                      <span className="my-auto"> {cartItems.length}</span>
                    </div>
                    : null : null}


                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="my-auto  text-white w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <div className="text-[11px] text-center text-white" >{langData.navbar.cart}</div>

                {domLoaded && cartItems && cartItems.length > 0 ?
                  <div className="group-hover/cart:scale-100  scale-0 absolute w-[25rem] top-[4rem] right-0 bg-white rounded-lg px-5 py-2  h-fit max-h-[20rem] overflow-y-auto shadow-lg">
                    {cartItems.map((item: any) => (
                      <>
                        <div className="flex py-2">
                          <a href={`product/${item.slug}`} className="w-3/4 text-sm  my-auto">{item.title}</a>
                          <div className="w-1/4 flex">
                            <a href={`product/${item.slug}`} className="w-3/4">
                              <Image src={item.images.featured_image} height={100} width={100} className="w-full m-1" alt={item.title} />
                            </a>
                            <button onClick={() => {
                              dispatch(removeFromCart(item.id))
                              removedFromCart()
                            }
                            } className="w-1/4 ml-2 my-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 fill-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                        </div>

                        <div className="bg-gray-300 h-[1px] w-11/12 mx-auto mt-2"></div>

                      </>
                    ))}
                    <div className="py-3">
                      <div className="flex justify-between ">
                        <div>TOTAL <span className="text-xs">(WITHOUT SHIPPING)</span> </div>
                        <div className="">AED {calculateTotalCartPrice()}</div>
                      </div>
                    </div>
                    <div className="py-3 flex justify-between text-white space-x-3">
                      <a href={`/cart`} className="bg-[#39f] px-3 py-1 w-full text-center" >CART</a>
                      <button className="bg-[#39f] px-3 py-1 w-full">CHECK OUT</button>
                    </div>
                  </div>
                  : null}
              </a>
              <a href="#" className="flex flex-col md:hidden lg:flex hidden ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="my-auto  text-white w-8 h-8 mx-auto">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <div className="text-[11px] text-center text-white whitespace-nowrap">{langData.navbar.wishlist}</div>

              </a>
            </div>
          </div>
          <div className="bg-[#a92579] items-center">
            <div className=" flex justify-between py-1 px-[10px] max-w-[1450px] mx-auto text-white lg:flex md:flex hidden  text-xs " >
              <div className={"flex justify-start items-center space-x-3 h-fit"}>
                <div className={`${isArabic ? 'ml-2' : 'mr-2'}`}>{langData.navbar.highest_rated_phar} </div>
                <Image src={"https://www.lifepharmacy.com/images/app-rating.svg"} className="w-20 h-5" height={30} width={30} alt={"app-rating"} /></div>

              <div className="text-end flex justify-between items-center ">
                <div className="mx-4">{langData.navbar.deliver_to}  {sessionServ?.token?.addresses && sessionServ?.token?.addresses.length != 0 ? (displayedAddress(AddressDataIndex)) : "Select a Location"}</div>
                <button
                  className="bg-white text-black rounded px-3   font-bold py-1" onClick={() => { locationOnClickHandle() }}>CHANGE</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4  hidden lg:flex md:flex bg-white shadow-md">
            <div onMouseOver={() => setOverlay(true)} onMouseLeave={() => { setOverlay(false) }} className="group inline-block shop-by-cat ">
              <button
                onMouseOver={() => shopByCatOnMouseOver()} className="group-hover:bg-blue-500 py-[5px]  group-hover:text-white hover:text-white dropdown BeautyCareele  border-r border-gray-500 w-[236px]"
                id="dropdownDefaultButton" data-dropdown-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-6 my-2 float-left ml-3">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <div className="text-start mt-2 float-left mr-10 text-sm group-1 ml-2 ">{langData.navbar.shop_by_cat}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="h-6 float-right mt-2 w-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div className="flex justify-start absolute bg-white  scale-0 group-hover:scale-100 left-0 right-0">
                <div className="z-30  bg-white">
                  <ul className="text-sm text-gray-700  rounded-sm transform scale-0 group-hover:scale-100  
              transition duration-100 ease-in-out origin-top bg-white w-[236px] h-full flex flex-wrap border-r-[0.1px] border-gray-400 shadow-md" id="catgories-element">
                    {data.data.map((item: any, i: number) => (
                      <li key={item.name} onMouseOver={(e) => { ulListTrigger(e, (item.name + "ele").replace(/\s/g, '')) }} className={" group/btn w-full list" + i}>
                        <button id={(item.name + "btn").replace(/\s/g, '')} className={`single-btn w-full py-4 transition-all duration-100 ease-in-out group-hover/btn:bg-blue-50 group-hover/btn:border-blue-500 group-hover/btn:text-blue-400 ${isArabic ? 'pr-5 group-hover/btn:border-r-[4px]' : 'pl-5 group-hover/btn:border-l-[4px]'} text-left flex px-2`} >
                          <span className="flex-1 mx-3 whitespace-nowrap">  {item.name}   </span>
                          <span className="mr-auto my-auto">
                            <svg className={`fill-current h-4 w-4  transition duration-150 ease-in-out ${isArabic ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>


                <div className="bg-white shadow-lg transform scale-0 group-hover:scale-100  
              z-10 transition duration-150 ease-in-out origin-top text-black  overflow-auto max-h-[28rem]  w-full hello py-4" >
                  <div className="mx-auto md:w-full xl:w-full mb-5" >
                    <div className="font-bold lg:text-2xl text-center mb-3" >TOP BRANDS</div>

                    <Swiper
                      centeredSlides={true}
                      className="my-6 "
                      slidesPerView={6}
                      autoplay={{
                        delay: 10,
                        disableOnInteraction: false,
                      }}
                      speed={3000}
                      modules={[Autoplay]}
                      loop={true}
                      breakpoints={{
                        1024: {
                          width: 1024,
                          slidesPerView: 7,
                        },
                        768: {
                          width: 768,
                          slidesPerView: 6
                        },
                      }}
                    >

                      {brands_data.data.brands.map((bd: any) => (
                        <SwiperSlide className="cursor-grab">
                          <div >
                            <Image className="mx-auto md:w-16 md:h-16 lg:w-24 lg:h-24 xl:w-24 xl:h-24 rounded-full border border-gray-300 " width={150} height={150} src={bd.images.logo} alt="" />
                          </div>
                        </SwiperSlide>
                      ))}

                    </Swiper>

                  </div>
                  {data.data.map((item: any) => (
                    <div className="w-full hidden list-elements" id={(item.name + "ele").replace(/\s/g, '')} onMouseOver={() => { (document.getElementById((item.name + "btn").replace(/\s/g, '')) as HTMLElement).classList.add("text-blue-500", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50") }} onMouseLeave={() => { ((document.getElementById((item.name + "btn").replace(/\s/g, '')) as HTMLElement)).classList.remove("text-blue-500", isArabic ? "border-r-4" : "border-l-4", "border-blue-500", "bg-blue-50") }}>

                      <ul className={"right-0 u-list bg-white rounded-sm top-0 hover-menu  h-[35rem] ul-list-hover w-full " + (item.name + "ele").replace(/\s/g, '')} >

                        <li key={item.name + "elem"} className="">

                          <div className=" mb-9 ">
                            <div className="flex justify-between  w-full flex-wrap">

                              <div className="  lg:order-none md:w-full">

                                <Example acc_data={item.children} />

                              </div>

                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className="flex space-x-6 ">
              <div className="group inline-block mr-2">
                <button className="hover:text-blue-500 underline-tra ml-7 py-1" data-dropdown-toggle="dropdown2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6 my-2 float-left mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  <div className=" text-start mt-2 float-left font-bold uppercase ">{langData.navbar.brands}</div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className=" h-6 float-left mt-2 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg> */}
                </button>
                <ul
                  className="bg-white shadow-lg transform scale-0 group-hover:scale-100 absolute 
                z-10 transition duration-150 ease-in-out origin-top hidden group-hover:flex flex-col absolute left-0 px-5 py-0 text-black left-0 right-0 overflow-auto h-[30rem]">
                  <li key={"brands-section"}>
                    <div className="grid grid-cols-5 gap-5" id="brands-section">
                      {brands_data.data.brands.map((bd: any) => (
                        <div className="grid-flow-row mb-5"> <div className={`flex flex-col mr-5`}>
                          <Image className="mx-auto rounded-full border border-white bg-white shadow-md" width={150} height={150} src={bd.images.logo} alt="" />
                          <h5 className="text-center mt-3">{bd.name} </h5>
                        </div></div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="group inline-block mr-2">
                <button className="hover:text-blue-500 underline-tra py-1 group"
                  data-dropdown-toggle="dropdown8">

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className="w-6 h-6 my-2 float-left mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>

                  <div className=" text-start mt-2 float-left font-bold uppercase">{langData.navbar.offers}</div>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" className=" h-6 float-left mt-1 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg> */}

                </button>
                <ul className="py-2 text-sm text-gray-700  border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32 bg-white z-10">
                  <ul className="py-2 text-sm text-gray-700  " aria-labelledby="dropdownDefaultButton">
                    <li key="OfferDetails">
                      <p className="block pr-20 pl-5 py-2 font-bold">Offer Details</p>
                    </li>
                    <li key="ClearanceSale">
                      <a href="#" className="block pr-20 pl-5 py-2 hover:text-blue-400">Clearance
                        Sale</a>
                    </li>
                    <li key="SportsNutrition">

                      <a href="#" className="block pr-20 pl-5 py-2 hover:text-blue-400">Sports
                        Nutrition</a>
                    </li>
                    <li key="PreventiveCare">
                      <a href="#" className="block pr-20 pl-5 py-2  hover:text-blue-400">Preventive
                        Care</a>
                    </li>
                    <li key="FirstAid">
                      <a href="#" className="block pr-20 pl-5 py-2 hover:text-blue-400">First
                        Aid</a>
                    </li>
                    <li key="SunshineNutrition">
                      <a href="#" className="block pr-20 pl-5 py-3 hover:text-blue-400">Sunshine
                        Nutrition</a>
                    </li>
                  </ul>
                </ul>
              </div>

              <button className=" py-1 hover:text-blue-500 underline-tra" data-dropdown-toggle="dropdown4">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-6 mt-1 float-left mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                </svg> */}

                <div className="mb-1 text-start float-left uppercase font-bold">{langData.navbar.health_packages}</div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className=" h-6 float-left mt-2 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg> */}
              </button>
            </div>
          </div>
        </div>



      </div >


      <div className="sm:visible md:hidden ">



        <div className="flex  bg-indigo-900 text-white text-xs px-[10px] py-1 justify-between items-center">
          <div>{langData.navbar.deliver_to}:   <span className="mx-2">Business Bay, Dubai</span>  </div>
          <button className="bg-white rounded text-pink-700 w-20 py-1" onClick={() => { locationOnClickHandle() }}>CHANGE</button>
        </div>
      </div>

      {
        showElement ? (
          <div className="rounded-xl sm:py-5 py-3   fixed bottom-28 inset-x-0 md:px-5 px-2 mx-2 border border-gray-300 flex justify-between md:text-xs bg-white sm:visible lg:w-6/12 lg:ml-auto bg-white z-20 text-[10px]">
            <div className="text-indigo-900 font-bold sm:text-[12px] text-[8px] my-auto">Add your location to get an accurate delivery time</div>
            <div className="flex justify-evenly">
              <button onClick={() => setIsOpen(true)} className="text-pink-900 font-semibold sm:text-xs text-[9px] my-auto">Select your area</button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" className="sm:w-4 sm:h-4 w-3 h-3  ml-2 mr-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
              <button onClick={() => setShowElement(!showElement)} aria-label="Close Show Element">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" className="sm:w-6 sm:h-6  w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : ""
      }


      {/* {isOpen && (
          <div id="modal-new" className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 top-1/2">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="relative w-full h-full max-w-lg min-w-sm mx-auto h-auto">
          
            </div>
          </div>
        )} */}


      {/* <button  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
          Toggle modal
        </button> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => { setIsOpen(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full sm:max-w-md max-w-xs transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="relative bg-white rounded-lg shadow ">
                    <div className="flex items-center justify-between rounded-t ">
                      <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                        data-modal-hide="medium-modal">
                        <button onClick={() => setIsOpen(false)}>
                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </button>
                      </button>
                    </div>
                    <div className="p-6 sm:space-y-6 space-y-5">
                      <h3 className="sm:text-lg font-medium text-blue-400  text-center">
                        Where do you want the delivery?
                      </h3>
                      <p className="sm:text-sm leading-relaxed text-gray-500  text-center text-xs">
                        By knowing your area, we will be able to provide instant delivery from the nearest Life
                        store around you! </p>
                      <button className="ml-auto bg-blue-400 p-3 text-white rounded-xl w-full">Detect My Location</button>
                      <h3 className=" font-medium  text-center">
                        OR
                      </h3>
                      <div className="flex">
                        <select id="states"
                          className=" flex-shrink-0 rounded-l-lg bg-gray-50 text-gray-900 text-sm  block  sm:p-2.5   ">
                          <option selected>Ship To</option>
                          <option value="CA">UAE</option>
                          <option value="TX">KSA</option>
                        </select>
                        <label htmlFor="states" className="sr-only">Type Location</label>
                        <input type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 border-l-2  block w-full p-2.5     " placeholder="Type a Location" />
                      </div>
                      <a href="#"><h3 className=" font-medium text-blue-400  text-center underline sm:mt-16 mt-4" onClick={() => {
                        setLocationModal(true)
                        setIsOpen(false)
                      }
                      }>
                        Or Login Now
                      </h3></a>
                      <p className="sm:text-sm leading-relaxed text-gray-500  text-center text-xs">
                        Get access to My Address, Orders & Prescriptions in your profile section.
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div id="location-modal" aria-hidden="true" className="hidden fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto h-modal justify-center items-center" >
        <div id="overlay" className=" fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
        </div>

        <div className="relative w-full h-full max-w-lg md:h-auto">

          <div className="relative bg-white rounded-lg shadow  mt-3">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <div className="relative bg-white rounded-lg shadow ">
                {/* <div className="flex items-center justify-between rounded-t ">
                    <button type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
                      data-modal-hide="medium-modal">
                  
                    </button>
                  </div> */}
                <div className="p-3 space-y-6 mt-3">
                  <h3 className="text-2xl font-semibold text-blue-500  text-center mt-6">
                    Where do you want the delivery?
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500  text-center">
                    By knowing your area, we will be able to provide instant delivery from the nearest Life
                    store around you! </p>
                  <button className="flex items-center ml-auto bg-blue-400 p-3 text-white rounded-xl w-full justify-center">

                    <span><Image src={"  https://www.lifepharmacy.com/images/svg/location-white.svg"} className="w-5 h-5 mr-5" alt="location" height={50} width={50}></Image></span>
                    Detect My Location</button>
                  <h3 className="text-xl font-medium  text-center">
                    OR
                  </h3>
                  <div className="flex">
                    <select id="states"
                      className=" flex-shrink-0 rounded-l-lg border-none border bg-gray-50 text-gray-900 text-sm  block  p-2.5   ">
                      <option selected>Ship To</option>
                      <option value="CA">UAE</option>
                      <option value="TX">KSA</option>
                    </select>
                    <label className="sr-only">Type Location</label>
                    <input type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-300 border-l-2  block w-full p-2.5     " placeholder="Type a Location" />
                  </div>
                  <a href="#"><h3 className="text-xl font-medium text-blue-400  text-center underline mt-8"  >
                    Or Login Now
                  </h3></a>
                  <p className="text-base leading-relaxed text-gray-500  text-center">
                    Get access to My Address, Orders & Prescriptions in your profile section.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={locationModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => { setLocationModal(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full sm:max-w-lg max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div id="loginOrSignup">
                    <Dialog.Title
                      as="h3"
                      className="sm:text-2xl font-bold  text-blue-500  mb-3"
                    >
                      <h3>Login Or SignUp</h3>
                    </Dialog.Title>

                    <form className="space-y-6" action="#" >
                      <div className="mt-3 flex-1">
                        <Tabs value="phone" className="border-none ">
                          <TabsHeader >
                            <Tab key="phone" value="phone">
                              <p className="sm:text-base text-xs">Using Phone</p>
                            </Tab>
                            <Tab key="email" value="email">
                              <p className="sm:text-base text-xs">Using Email</p>
                            </Tab>
                          </TabsHeader>
                          <TabsBody >
                            <TabPanel key="phoneinput" value="phone" >
                              <div>
                                <label className=" block mb-2 font-medium text-gray-900 sm:text-base text-sm
 ">Enter your mobile number <span className="text-red-500">*</span></label>
                                <div className="relative border border-gray-300 pl-3 rounded-lg">
                                  <PhoneInput
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={isValidCredentials}
                                    international
                                    defaultCountry="AE"
                                    id="phoneInputOTP"
                                  />
                                  {isPhoneNumberValid ?
                                    <div
                                      className="absolute top-[21px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                    >
                                      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                      </svg>

                                    </div> : ""}

                                </div>
                              </div>
                            </TabPanel>
                            <TabPanel key="emailInput" value="email" >
                              <div className="relative">
                                <label className="block mb-2  font-medium text-gray-900
">Please enter your email <span className="text-red-500">*</span></label>
                                <input onChange={isValidEmail} id="emailInput" type="text" name="email" className="text-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5" placeholder="Your Email Address" required />
                                {isEmailValid ?
                                  <div
                                    className="absolute top-[60px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500">
                                    <i className="">
                                      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                      </svg>
                                    </i>
                                  </div> : ""}
                              </div>
                            </TabPanel>
                          </TabsBody>
                        </Tabs>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                            </div>
                            <div className="sm:text-sm  text-gray-500 text-xs">
                              By continuing, I agree to the <span><a href="#" className="text-blue-500">Terms of Use</a></span> & <span><a href="#" className="text-blue-500">Privacy Policy</a></span>
                            </div>
                          </div>
                        </div>
                        <button type="button" disabled={isPhoneNumberValid || isEmailValid ? false : true} onClick={() => { isValidPhoneNoInput(true) }} className={"bg-blue-500 disabled:bg-blue-300" + (" flex justify-center w-full text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ")}>
                          <p className="mr-4">PROCEED</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                  {otpPageVisibility ?

                    <div className="" id="otpPage">
                      <h3 className="mb-3 text-2xl font-bold text-blue-500 ">OTP Code</h3>
                      <label className="block mb-2 font-medium text-gray-900">Please check your {signInUsing} and enter the OTP code  <span className="text-red-500">*</span></label>

                      <form className="space-y-6" action="#" >

                        <OtpField
                          value={state}
                          onChange={handleChange}
                          numInputs={4}
                          classNames={"flex justify-center "}
                          inputProps={{ className: 'sm:!w-[90px] w-[60px]  mr-5 text-3xl text-center font-bold h-[60px] border-blue-400 focus:ring-0 border-b-4 border-t-0 border-x-0 bg-transparent' }}
                        />


                        <div className="mx-3">


                          {countDownVisible ? <div className="text-sm  text-gray-500 flex justify-between" id="seconds-count">
                            <p>Didn't Receive Code?</p> <div className="">Request again in {time >= 0 ? time : stopTimer()} seconds</div>
                          </div> : <button onClick={() => { isValidPhoneNoInput(true) }} type="button" className="bg-white hover:bg-blue-600 px-3 py-2 rounded-lg border text-blue-500 border-blue-500  hover:text-white text-xs tracking-widest" >RESEND OTP</button>
                          }


                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => { isValidPhoneNoInput(false) }} className="bg-white border border-gray-600  justify-center w-1/2 flex items-center focus:bg-black active:text-white focus:text-white hover:bg-gray-700  hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-3">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <p className="ml-4">Back</p>
                          </button>
                          <button type="button" onClick={(e) => {
                            e.preventDefault()
                            otpIsValid(state)
                          }} disabled={state.length === 4 ? false : true} className={" disabled:bg-blue-300 bg-blue-500  items-center flex justify-center w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "}>
                            <p className="mr-4">PROCEED</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div> : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* 
      <Transition appear show={notValidOTPPageVisib} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => { setnotValidOTPPageVisib(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="rounded-t-3xl bg-red-500 p-6 text-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-28 w-28">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className=" p-5 text-center">
                    <h3 className="mb-5 text-center text-3xl font-bold">Oops</h3>
                    <p className=" font-semibold text-gray-600">Something went wrong!</p>
                    <p className=" font-semibold text-gray-600">Invalid code. Please enter the correct code.</p>
                    <button onClick={() => { setnotValidOTPPageVisib(false) }} type="button" className="mt-10 rounded-lg border border-gray-200 bg-red-500 px-5 py-1.5 text-sm font-medium text-white hover:bg-red-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 ">OK</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}



      {/* {successOTP ? <>
          <div id="popup-modal" tabindex="-1" className="z-100 fixed top-1/2 left-1/2 z-50 h-[calc(100%-1rem)]  -translate-y-1/2 -translate-x-1/2 overflow-y-auto overflow-x-hidden p-4 shadow-md md:h-auto w-96 rounded-b-3xl">
            <div className="relative h-full w-full max-w-md  bg-white md:h-auto rounded-3xl">
              <button type="button" className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  " data-modal-hide="popup-modal"></button>
              <div className="rounded-t-3xl bg-green-400 p-6 text-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-36 h-36 relative mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-10 w-10 absolute inset-0 top-[75px]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="p-5 text-center">
                <h3 className="mb-5 text-center text-3xl font-bold">Verified Device</h3>
                <p className="font-semibold text-gray-600">Sign in Successfull</p>

                <button type="button" onClick={() => { setOTPSucessState(false) }} className="mt-10 rounded-lg border border-gray-200 bg-green-400 px-5 py-1.5 text-sm font-medium text-white hover:bg-green-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200">OK</button>
              </div>
            </div>
          </div>


        </>
          :""} */}
      <Transition appear show={notValidOTPPageVisib} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => { setnotValidOTPPageVisib(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="rounded-t-3xl bg-red-500 p-6 text-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto h-28 w-28">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className=" p-5 text-center">
                    <h3 className="mb-5 text-center text-3xl font-bold">Oops</h3>
                    <p className=" font-semibold text-gray-600">Something went wrong!</p>
                    <p className=" font-semibold text-gray-600">Invalid code. Please enter the correct code.</p>
                    <button onClick={() => { setnotValidOTPPageVisib(false) }} type="button" className="mt-10 rounded-lg border border-gray-200 bg-red-500 px-5 py-1.5 text-sm font-medium text-white hover:bg-red-700 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 ">OK</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* {sessionServ && sessionServ.token.addresses.length !=0 ?setavailableAddresses(true):setaddNewAddress(true)}  */}
      <Transition appear show={sessionServ && addNewAddress ? true : false} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => { setaddNewAddress(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-2xl transform  overflow-y-auto no-scrollbar rounded-2xl text-left align-middle shadow-xl transition-all ">
                  {addNewAddressClick && sessionServ.token.addresses.length === 0 ?
                    <div className=" bg-white rounded-lg shadow  overflow-y-auto no-scrollbar h-[calc(80vh-1rem)]">
                      <div className="flex items-start justify-between ">

                      </div>
                      <div className="px-6 py-3 space-y-6">
                        <img src="https://www.lifepharmacy.com/images/map.svg" alt="" className="w-36" />
                        {/* <Map address={'1600 Amphitheatre Parkway, Mountain View, CA'} /> */}

                        <div className="py-5">
                          <h5 className="text-indigo-800 font-bold pb-1">You have no saved Addresses</h5>
                          <p className="text-gray-400 text-sm py-1">Start by adding a new address</p>
                        </div>
                      </div>
                      <div className="flex items-center px-5 pb-2 space-x-2 border-t border-gray-200 rounded-b  sticky bottom-0">
                        <button type="button" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full px-5 py-2.5 text-center text-xs" onClick={() => {
                          setAddNewAddressClick(false)
                          setaddnewAddressFormVisibility(true)
                        }}>ADD NEW ADDRESS</button>
                      </div>
                    </div> : ""}
                  {addnewAddressFormVisibility ?
                    <div className="max-w-4xl relative  w-full ">
                      <div className="relative   rounded-lg  overflow-y-auto no-scrollbar bg-white">
                        <div className="absolute top-3 left-2.5 flex">
                          <button type="button" className=" ml-auto inline-flex items-center rounded-lg bg-white bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900  " onClick={() => {
                            setaddNewAddress(false)
                            setaddnewAddressFormVisibility(false)
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="h-4 w-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                          <h3 className="ml-3 text-sm font-bold text-indigo-800  p-1.5">Your Address</h3>

                        </div>


                        <div className="px-6 pt-16 pb-4 bg-white">
                          <form className="space-y-3 " onSubmit={addressFormOnSubmit}>
                            <div>
                              <label className="mb-3 block w-fit rounded-full bg-indigo-800 px-3 py-1 text-[10px] font-semibold text-white ">PERSONAL DETAILS</label>
                              <input type="text" name="name" value={formData.name} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500      addressFormInputEle"} placeholder="Full Name *"
                                required />

                            </div>
                            <div>
                              <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">Enter your mobile number <span className="text-red-500">*</span></label>
                              <div className="relative border border-gray-300 pl-3 rounded-lg">
                                <PhoneInput
                                  placeholder="Enter phone number"
                                  value={formData.phone}
                                  onChange={isValidCredentials}
                                  international
                                  defaultCountry="AE"
                                  id="phoneInputOTPAddress"
                                  name="phone"
                                  required
                                />
                                {isPhoneNumberValid ?
                                  <div
                                    className="absolute top-[16px] right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
                                  >
                                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                    </svg>

                                  </div> : ""}
                              </div>
                            </div>
                            <div>
                              <label className="mb-3 block w-fit rounded-full bg-indigo-800 px-3 py-1 text-[10px] font-semibold text-white ">ADDRESS DETAILS</label>

                              <div className="flex w-1/2">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900    ">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                  </svg>
                                </span>

                                <select id="type" name="type" value={formData.type} onChange={formDatahandleChange} className="focus:outline-none block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm">
                                  <option selected value="Home">Home</option>
                                  <option value="Work">Work</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex space-x-6 ">
                              <input type="text" name="state" value={formData.state} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={" addressFormInputEle focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder="Emirates *" required />

                              <input type="text" name="city" value={formData.city} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder="City *" required />
                            </div>


                            <input type="text" name="street_address" value={formData.street_address} onChange={formDatahandleChange} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} placeholder="Street Address *" className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "}
                              required />

                            <div className="flex space-x-6">
                              <input name="flat_number" value={formData.flat_number} onChange={formDatahandleChange} type="text" onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"} placeholder="Flat / Villa *" required />
                              <input name="building" value={formData.building} onChange={formDatahandleChange} type="text" onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"focus:outline-none addressFormInputEle block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"} placeholder="Building *"
                                required />
                            </div>


                            <div className="flex ">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900    ">
                                Country
                              </span>

                              <select id="country" name="country" value={formData.country} onChange={formDatahandleChange} className="focus:outline-none block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-gray-300 bg-gray-50 p-2.5 text-sm">
                                <option selected value="United Arab Emirates">United Arab Emirates</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                              </select>
                            </div>
                            <textarea name="additional_info" value={formData.additional_info} onChange={formDatahandleChange} className="w-full border-gray-300 rounded-lg border p-2.5 focus:outline-none text-sm" rows={1} placeholder="Additional information (eg. Area, Landmark)"></textarea>

                            <div className="sticky bottom-2 border-0 rounded-lg">
                              <button type="submit" className=" w-full rounded-full bg-blue-500  py-1.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 " >SAVE ADDRESS</button>
                            </div>

                          </form>

                        </div>
                      </div>
                    </div> : ""}
                  {sessionServ?.token?.addresses.length > 0 && availableAddresses ?
                    <div className=" overflow-y-auto overflow-x-hidden rounded-lg bg-white shadow no-scrollbar  h-[calc(80vh-1rem)]">
                      <div className="flex items-start justify-between">
                        {/* <button onClick={() => {
                          setaddNewAddress(false)
                          setavailableAddresses(false)
                        }} type="button" className=" absolute -right-4 -top-4 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm hover:text-gray-900  ">
                          <svg className="h-6 w-6 rounded-full bg-red-400 p-1 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fill-rule="evenodd" clip-rule="evenodd"></path></svg><span className="sr-only">Close modal</span>
                        </button> */}
                      </div>

                      <div className="mx-auto w-full p-4 py-6">
                        <RadioGroup value={AddressDataIndex} onChange={setAddressDataIndex}>
                          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                          <div className="space-y-2">
                            {sessionServ.token.addresses.map((addr: any, indx: number) => (
                              <RadioGroup.Option
                                key={addr.id}
                                value={addr}
                                className={({ active, checked }) =>
                                  `${active
                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                    : ''
                                  }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className="flex w-full items-center justify-between">
                                      <div className="flex items-center">
                                        <div className="text-sm flex space-x-7">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                              }`}
                                          >
                                            <div className="flex-col flex   sm:text-sm text-[10px]">
                                              <h5 className="  ">NAME:</h5>
                                              <h5 className="  ">ADDRESS:</h5>
                                              <h5 className="">PHONE:</h5>
                                            </div>
                                          </RadioGroup.Label>
                                          <RadioGroup.Description
                                            as="span"
                                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                              }`}
                                          >
                                            <div className="sm:text-sm text-[10px]">
                                              <h5 className="font-medium">{addr.name}</h5>
                                              <h5 className="font-medium">{addr.area} - {addr.state} - {addr.country}</h5>
                                              <h5 className="font-medium">{addr.phone}</h5>
                                            </div>
                                          </RadioGroup.Description>
                                        </div>
                                      </div>
                                      {checked && (
                                        <div className="shrink-0 text-white">
                                          <CheckIcon className="h-6 w-6" />
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* <div className="space-y-3 px-6 py-5 ">
                        <div className="flex justify-between">
                          <div className="flex space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            <h5 className=" font-bold text-indigo-800">Addresses</h5>
                          </div>
                          <button className="rounded-lg bg-blue-500 px-3 py-2 text-sm uppercase text-white" onClick={() => {
                            setavailableAddresses(false)
                            setaddnewAddressFormVisibility(true)
                          }}>Add New Address</button>
                        </div>

                        <h5 className="rounded-full bg-blue-300 px-2 py-1 text-sm font-bold text-indigo-800">SELECTED ADDRESS</h5>

                        {sessionServ.token.addresses.map((addr, indx) => (

                          <div className={(indx === 0 ? "!bg-blue-500 !text-white " : "") + "text-gray-500 flex justify-between space-x-2  px-4 py-4 cursor-pointer rounded-lg addressBlock border-2 border-gray-200"} id={indx + "addr"} onClick={() => { addrBlockOnClick(indx + "addr") }}>


                            {/* <input type="radio" className="mb-auto m-1 focus:ring-0 w-3 h-3" /> */}
                      {/* <div className="">
                              <div className="flex space-x-4">
                                <div className="flex-col flex  font-bold text-sm">
                                  <h5 className="  ">NAME:</h5>
                                  <h5 className="  ">ADDRESS:</h5>
                                  <h5 className="">PHONE:</h5>
                                </div>
                                <div className="text-sm">
                                  <h5 className="  font-medium ">{addr.name}</h5>
                                  <h5 className="  font-medium">{addr.area} - {addr.state} - {addr.country}</h5>
                                  <h5 className="  font-medium">{addr.phone}</h5>
                                </div>
                              </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={(indx === 0 ? "!fill-white" : "") + " w-6 h-6 fill-gray-200 my-auto  " + (indx + 'addr')}>
                              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        ))}


                        <div className="flex bg-pink-100 p-2 text-xs text-blue-800 ">Changing your delivery address might affect the availability of some items in your cart, please remember to review you cart if or one you switch addresses.</div>


                      </div> */}
                      <div className="w-full bg-white px-6 py-3 sticky bottom-0">
                        <button className="text-[11px]  px-3 py-2 w-full text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => { setaddNewAddress(false) }} >CONFIRM ADDRESS</button>
                      </div>
                    </div>

                    : ""}

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>




      <LanguageChangeModal setModalState={setModalState} modalState={languageModal} currentLanguage={laguage} currentCountry={countrySet} countries={countries} languages={languages} lang={parts} languageClickedToast={() => { languageClickedToast() }} />
      {/* <button data-modal-target="yourAddressForm" data-modal-toggle="yourAddressForm" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
          Toggle modal
        </button> */}

      {/* <div id="yourAddressForm" tabindex="-1" aria-hidden="true" className="hidden fixed top-0 left-0 right-0 z-50 h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 ">
          <div className="max-w-4xl relative h-full w-full md:h-auto">
  
          </div>
        </div> */}


      {
        welcomeBackPopUp ?
          <div id="popup-modal1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
            <div id="overlay" className=" fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
            </div>
            <div className="relative w-full h-full max-w-md md:h-auto">
              <div className="relative bg-white rounded-lg shadow ">

                <div className="p-6 text-center">

                  <img src="https://cdn-icons-png.flaticon.com/512/309/309748.png?w=740t=st=1678711444~exp=1678712044~hmac=9fdd9608d210eeffcc5069fd9c6888bb3fcb3407e24160947ac7f3c7a85ca203" className="w-20 h-20 my-auto mx-auto mb-5" />

                  {/* {session.token.is_customer === 1 ? <h3 className="mb-5  text-gray-700 font-bold text-2xl ">Welcome Back {session ? session.token.name : ""}</h3> : <h3 className="mb-5  text-gray-700 font-bold text-2xl ">Welcome {session ? session.token.name : ""}</h3>} */}
                  <button onClick={() => { setwelcomeBackPopUp(false) }} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2 text-center mr-2">
                    Start Exploring
                  </button>

                </div>
              </div>
            </div>
          </div> : ""
      }

      {/* <div id="
        {/* <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto h-modal ">
          <div className="relative w-full h-full max-w-xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow  ">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " data-modal-hide="authentication-modal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button> */}

      <div className="fixed bottom-7 left-1/2 -translate-x-1/2 md:hidden w-3/4 backdrop-blur-sm bg-opacity-95 bg-slate-100 sm:h-20 h-12 rounded-full sm:pt-3 pt-1 items-center z-30">
        <div className="flex justify-between mt-2 sm:px-16 px-6">
          <Link className="group/button" href={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-8 sm:h-8 w-5 h-5  fill-gray-500 my-auto group-focus/button:fill-black">
              <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clip-rule="evenodd" />
            </svg>
          </Link>

          <button className="group/button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-8 sm:h-8 w-5 h-5  fill-gray-500 my-auto group-focus/button:fill-black">
              <path d="M5.127 3.502L5.25 3.5h9.5c.041 0 .082 0 .123.002A2.251 2.251 0 0012.75 2h-5.5a2.25 2.25 0 00-2.123 1.502zM1 10.25A2.25 2.25 0 013.25 8h13.5A2.25 2.25 0 0119 10.25v5.5A2.25 2.25 0 0116.75 18H3.25A2.25 2.25 0 011 15.75v-5.5zM3.25 6.5c-.04 0-.082 0-.123.002A2.25 2.25 0 015.25 5h9.5c.98 0 1.814.627 2.123 1.502a3.819 3.819 0 00-.123-.002H3.25z" />
            </svg>
          </button>

          <button onClick={() => {
            setSmScreenSearchBox(true)
            searchButtonOnClick(false)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-8 sm:h-8 w-5 h-5 fill-gray-500 my-auto group-focus/button:fill-black">
              <path d="M6.5 9a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5a4 4 0 102.248 7.309l1.472 1.471a.75.75 0 101.06-1.06l-1.471-1.472A4 4 0 009 5z" clip-rule="evenodd" />
            </svg>
          </button>

          <button className="group/button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-8 sm:h-8 w-5 h-5 fill-gray-500 my-auto group-focus/button:fill-black">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clip-rule="evenodd" />
            </svg>
          </button>

          <button className="group/button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="sm:w-8 sm:h-8 w-5 h-5 fill-gray-500 my-auto group-focus/button:fill-black">
              <path fill-rule="evenodd" d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z" clip-rule="evenodd" />
            </svg>
          </button>

        </div>
      </div>


      <Transition appear show={smScreenSearchBox} as={Fragment}>
        <Dialog as="div" className="fixed top-0 right-0 left-0 z-50 flex items-start justify-center  " onClose={() => { setSmScreenSearchBox(false) }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-0 right-0 left-0 z-50 flex items-start justify-center  ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full fixed inset-0 transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
                  <div className="relative  w-full scale-100 transform opacity-100 transition-all ">
                    <div className="relative bg-white w-full  p-2 px-3">
                      <div className="flex w-full py-2 ">
                        <button type="button"
                          className="mr-3 text-gray-800 bg-transparent rounded-lg text-sm" onClick={() => { setSmScreenSearchBox(false) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="flex-1 overflow-hidden rounded-sm  px-1"
                        >
                          <div className="relative">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={` fill-slate-400 pointer-events-none absolute ${isArabic ? 'right-4 ' : 'left-4'} top-1 w-4 h-6`}>
                              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                            </svg>

                            <input type="text" id="sm-searchbox" value={queryData} onChange={(e) => { setQueryData(e.target.value) }} ref={input => input && input.focus()}
                              className={`placeholder:text-sm border-none bg-gray-100 rounded-full  block w-full  focus:ring-0  py-[5px]    text-slate-900 placeholder:text-slate-500 sm:text-sm sm:leading-6   ${isArabic ? 'pr-12 text-right pl-16' : 'pl-10 text-left pr-16'}`}
                              placeholder={langData.navbar.searchbox_text} onKeyDown={(e) => { searchButtonOnMouseEnter((e.target as HTMLInputElement).value, e.key, true) }} />

                            {SearchLoadingState ?
                              <svg fill="none" className={`animate-spin absolute inline ${isArabic ? "left-8" : "right-8"}  inset-y-0 m-auto w-4 h-4 mx-2`} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" ><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg> : ""}

                            {searchClosebtn ? <button onClick={() => { searchBoxClear() }} type="button"
                              className={`text-gray-800    text-center   rounded-lg text-sm   absolute top-[5px] ${isArabic ? 'left-2' : "right-2"} `}
                            >

                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>

                              <span className="sr-only">Close modal</span>
                            </button> : ""}
                          </div>
                        </div>
                      </div>


                      <div className="pt-6 px-4 lg-screen-searchsuggestion-sm scale-100 absolute top-15 right-0 left-0 bg-white overflow-auto rounded-t-0 rounded-b-md">
                        {searchData.results[1] ?
                          <>
                            <div className="mb-5 group-search">
                              {searchData.results[1]?.hits[0] ?
                                <>
                                  <h5 className="text-sky-500 text-xs ">SUGGESTIONS</h5>
                                  <div className="flex my-2 flex-wrap text-[13px] text-gray-700 group-search">
                                    {searchData.results[1].hits.slice(0, 10).map(sug_data => (
                                      <div onClick={() => {
                                        searchSuggestions(sug_data.query, true, "search")

                                      }} className=" rounded-xl bg-gray-200 hover:bg-gray-300  py-1 px-3 mb-2 mr-2">{sug_data.query}</div>
                                    ))}
                                  </div></>

                                : ""}
                            </div>
                            <div className="text-gray-600 text-xs group-search">
                              <h5 className="text-sky-500 text-xs">PRODUCTS</h5>
                              {searchData.results[0].hits[0] ? searchData.results[0].hits.map(pro_data => (
                                <div onClick={() => {
                                  searchSuggestions(pro_data.slug, true, "products")

                                }} className="sugg-pro group-search">
                                  <Image src={pro_data.images.featured_image} height={40} width={40} alt={pro_data.title}></Image>
                                  <p className="mx-3 my-auto">{pro_data.title} </p>
                                </div>
                              )) : <div className="py-12 text-center"><i>No Products Found</i></div>}
                            </div>
                          </> : <div role="status" className="max-w-full animate-pulse">
                            <div className="group-search mb-5">
                              <h5 className="text-xs text-sky-500">SUGGESTIONS</h5>
                              <div className="group-search my-2 flex flex-wrap text-[13px] text-gray-700">
                                <span className="sr-only">Loading...</span>
                                <div className="loading-style"></div>
                                <div className="loading-style"></div>
                                <div className="loading-style"></div>
                                <div className="loading-style"></div>
                                <div className="loading-style"></div>
                                <div className="loading-style"></div>
                              </div>
                              <div className="group-search text-xs text-gray-600">
                                <h5 className="mb-3 text-xs text-sky-500">PRODUCTS</h5>

                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4 bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img "></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img "></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div role="status" className="mb-3 flex">
                                  <div className="loading-img"></div>
                                  <div className="h-10 w-full mx-4">
                                    <div className="mb-2 h-3 w-full  bg-gray-200 "></div>
                                    <div className="mb-4 h-5 w-3/4  bg-gray-200 "></div>
                                  </div>
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      {
        overlayVisible ? <div className="fixed inset-0 bg-black bg-opacity-25 z-10" />
          : null
      }

      <label className="hidden grid-cols-[repeat(1,auto)] grid-cols-[repeat(2,auto)] grid-cols-[repeat(3,auto)] grid-cols-[repeat(4,auto)] grid-cols-[repeat(5,auto)] grid-cols-[repeat(6,auto)] grid-cols-[repeat(7,auto)]
grid-cols-[repeat(8,auto)] grid-cols-[repeat(9,auto)] grid-cols-[repeat(10,auto)] grid-cols-[repeat(11,auto)] grid-cols-[repeat(12,auto)]"></label>
      <p className='hidden bg-[#fb7979] bg-[#9b274f] bg-[#f50a0a] bg-[#f245a1] bg-[#ef0b0b] bg-[#f90101] bg-[#d81851]'></p>

    </>
  );
};

export default Navbar; 