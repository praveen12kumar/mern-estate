import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import SwiperCore from "swiper";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import { FaShare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import Contact from '../../components/contact/Contact';


import "./singleList.scss";


const SingleList = () => {
  
  SwiperCore.use([Navigation]);
 
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const{singleList, status, error} = useSelector((state)=> state.listing);
  const{user} = useSelector((state)=> state.auth);


  //console.log("singleList", singleList);



  return (
    <div className='single-list'>
     {
      status === "pending" ? <Loader/> :
      (
        <div className="">
          {
            error ? <p className='text-center my-7 text-2xl'>{error}</p>: 
            (
              <>
              {
                singleList && <>
                  <Swiper navigation >
                    {
                      singleList?.imageUrls?.map((url)=>(
                        <SwiperSlide key={url}>
                          <div style={{height:"500px", background:`url(${url}) center no-repeat`}}>
                          </div>
                        </SwiperSlide>
                      ))
                    }

                  </Swiper>
                </>
              }
              </>
            )
          }
          <div className="fixed top-[15%] right-[9%] z-10 border rounded-3xl w-12 h-12 flex items-center justify-center bg-slate-100 cursor-pointer">
            <FaShare className='text-slate-600'  onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
              }}/>
              {
                copied && <p className='fixed top-[23%] right-[15%] border rounded-xl w-32 h-12 flex items-center justify-center bg-slate-100 font-medium'>Link Copied</p>
              }
          </div>
        </div>
      )
     }
     <div className="flex flex-col gap-3  max-w-4xl mx-auto p-3 m-10 ">
      <h1 className='text-3xl my-4 font-primary font-semibold'>{singleList?.name}</h1>
      <div className="flex items-center gap-2 ">
        <span className='text-green-600'><FaLocationDot className='text-xl'/></span><p className='text-slate-600 font-medium text-xl font-primary'>{singleList?.address}</p>
      </div>
      <div className="flex gap-6">
        <button className='bg-red-700 text-xl text-white px-20 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-in hover:opacity-90'>For Rent</button>
        <button className='bg-green-700 text-xl text-white px-20 py-2 rounded-lg cursor-pointer transition-all duration-200 ease-in hover:opacity-90'>₹{singleList?.discountedPrice}{" "}discount</button>
      </div>
      <div className="my-3">
        <span className='font-semibold text-xl' >Description - </span>
        {singleList?.description}
      </div>
      <div className="flex gap-6 items-center">
        <p className='flex items-center text-green-700 gap-2 text-lg font-primary'><FaBed/>{singleList?.bedrooms} Beds</p>
        <p className='flex items-center text-green-700 gap-2 text-lg font-primary'><FaBath/>{singleList?.bathrooms} Baths</p>
        <p className='flex items-center text-green-700 gap-2 text-lg font-primary'><FaParking/>{singleList?.parking ? "" : "No"} Parking </p>
        <p className='flex items-center text-green-700 gap-2 text-lg font-primary'><FaChair/>{singleList?.furnished ? "Fully" : "Semi"} Furnished </p>
      </div>
      {
        user && singleList?.userRef !== user?._id && !contact && (
          <button onClick={()=> setContact(true)} className='bg-slate-700 text-white px-32 py-3 my-5 font-primaryt font-semibold rounded-lg uppercase tracking-wider transition-all duration-200 ease-in hover:opacity-90 '>Contact Landlord</button>
        )
      }
      {
        contact && <Contact listingData = {singleList} />
      }
      
     </div>
    </div>
  )
}

export default SingleList

