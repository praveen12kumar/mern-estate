import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { getAListing } from '../../features/listing/listSlice';


const ListCart = ({list}) => {
  const navigate   = useNavigate();
  const dispatch = useDispatch();

  const {singleList} = useSelector(state => state.listing);
  

  const handleClick = async()=>{
    dispatch(getAListing(list?._id));
    navigate(`/listing/${list?._id}`)
  }

  return (
    <div className='m-3 w-[300px] bg-white shadow-md hover:shadow-lg transition-shadow duration-1000 overflow-hidden rounded-lg'>
      <div onClick={handleClick}>
        <img src={list?.imageUrls[0]} alt="listing cover" className='h-[320px]
            sm:h-[220px] w-full object-cover hover:scale-110 transition-scale duration-500' />
        
        <div className="p-3">
            <p className='text-lg font-semibold text-slate-700 font-primary truncate'>{list?.name}</p>
            <div className="flex items-center gap-2">
                <FaLocationDot className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-700 truncate font-medium font-primary'>{list?.address}</p>
            </div>
            <p className='text-sm text-gray-600 font-primary line-clamp-2'>{list?.description}</p>
            <p className='text-slate-600 text-lg mt-3 font-semibold flex items-center'>₹{list?.offer ? list?.discountedPrice : list?.regularPrice }{list?.type ==="rent" && "/ month"}</p>
            <div className="flex mt-2 items-center gap-4 text-slate-600">
                <p className='text-lg flex items-center gap-1 font-semibold'><span><FaBed className='text-green-600'/> </span>  <span>{list?.bedrooms}</span>Beds</p>
                <p className=' text-lg flex items-center gap-1 font-semibold'><span><FaBath className='text-green-600'/></span> <span>{list?.bathrooms}</span>Bath</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListCart
