import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { searchOffer, searchRent, searchSales } from '../features/listing/listSlice';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/bundle';
import SwiperCore from "swiper";
import { Navigation } from 'swiper/modules'; 
import ListCard from "../components/listCard/ListCart";


const Home = () => {
  const dispatch = useDispatch();

  const {offer, rent, sale} = useSelector((state)=> state.listing);
  console.log(offer);
  SwiperCore.use([Navigation]);


  useEffect(()=>{
    dispatch(searchOffer());
    dispatch(searchRent());
    dispatch(searchSales());
  },[]);





  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Sahand Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offer &&
          offer.length > 0 &&
          offer.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offer && offer.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offer.map((listing) => (
                <ListCard list={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rent && rent.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rent.map((listing) => (
                <ListCard list={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {sale && sale.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {sale.map((listing) => (
                <ListCard list={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
