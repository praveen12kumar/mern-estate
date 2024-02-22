import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOwnerOfListing } from '../../features/listing/listSlice';

const Contact = ({listingData}) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {listingUser} = useSelector((state)=> state.listing);

    const onChange = (e)=>{
        setMessage(e.target.value)
    }

    useEffect(()=>{
        dispatch(getOwnerOfListing(listingData.userRef));
        setLandlord(listingUser)
        setMessage("");
    }, [listingData.userRef]);

    return (
    <div className='flex flex-col gap-4 '>
      <p className='font-semibold text-l flex gap-2'>Contact <span className='text-xl text-slate-600 font-primary'>{landlord?.username}</span> for <span className='text-xl text-slate-600 font-primary'>{listingData.name}</span></p>
      <textarea className='w-full border-2 no-underline border-slate-400 p-3 mt-1 rounded-lg'   placeholder="Enter Your message here" name="message" value={message} id="message" cols="30" rows="2" onChange={onChange} ></textarea>
      <Link className='w-full my-3' to={`mailto:${landlord?.email}?subject=Regarding ${listingData?.name}&body=${message}`}>
        <span className='text-center bg-slate-700 px-32 py-3 text-white rounded-lg
        font-primary '>Send Message</span>
      </Link>
    </div>
  )
}

export default Contact
