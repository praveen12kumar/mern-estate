import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/loader/Loader";
import { useNavigate } from 'react-router-dom';
import { searchListing } from '../features/listing/listSlice';
import ListCart from '../components/listCard/ListCart';

const Search = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const {listing, status} = useSelector(state => state.listing);
    console.log("status", status);
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
      });

   

    const handleChange = (e) => {
        if (
            e.target.id === 'all' ||
            e.target.id === 'rent' ||
            e.target.id === 'sale'
          ) {
            setSidebarData({ ...sidebarData, type: e.target.id });
          }
      
          if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
          }
      
          if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
          ) {
            setSidebarData({
              ...sidebarData,
              [e.target.id]:
                e.target.checked || e.target.checked === 'true' ? true : false,
            });
          }
      
          if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
      
            const order = e.target.value.split('_')[1] || 'desc';
      
            setSidebarData({ ...sidebarData, sort, order });
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
              urlParams.set('searchTerm', sidebarData.searchTerm)
              urlParams.set('type', sidebarData.type)
              urlParams.set('parking', sidebarData.parking)
              urlParams.set('offer', sidebarData.offer)
              urlParams.set('furnished', sidebarData.furnished)
              urlParams.set('offer', sidebarData.offer)
              urlParams.set('sort', sidebarData.sort)
              urlParams.set('order', sidebarData.order)

              const searchQuery = urlParams.toString();
              navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
    
        if (
          searchTermFromUrl ||
          typeFromUrl ||
          parkingFromUrl ||
          furnishedFromUrl ||
          offerFromUrl ||
          sortFromUrl ||
          orderFromUrl
        ) {
          setSidebarData({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
          });
        }

        const searchQuery = urlParams.toString();
        dispatch(searchListing(searchQuery))


    },[location.search]);


  return (
    <div className='flex flex-col md:flex-row '>
        <div className="p-7 border-b-2 sm:border-r-2">
            <form className='flex flex-col gap-8' onSubmit={handleSubmit} >
                <div className="flex items-center gap-3">
                    <label className='whitespace-nowrap'>Search Term</label>
                    <input type="text" id='searchTerm' className='border outline-none rounded-lg p-2 w-full' placeholder='Search...'
                    value={sidebarData.searchTerm} onChange={handleChange}/>
                
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <label className='text-lg font-primary font-medium'>Type:</label>
                    <div className=" flex gap-2 items-center">
                        <input type="checkbox"  id='all' className='w-5 h-5' checked={sidebarData.type === "all"} 
                        onChange={handleChange}/>
                        <span className='font-medium font-primary' id='all'>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox"  id='rent' className='w-5 h-5' 
                        checked={sidebarData.type === "rent"} onChange={handleChange} />
                        <span className='font-medium font-primary' id='rent'>Rent</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox"  id='sale' className='w-5 h-5' 
                        checked={sidebarData.type === "sale"} onChange={handleChange}/>
                        <span className='font-medium font-primary'>Sale</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox"  id='offer'className='w-5 h-5' checked={sidebarData.offer} onChange={handleChange} />
                        <span className='font-medium font-primary' >Offer</span>
                    </div>
                </div>
                <div className="flex items-center flex-wrap gap-4">
                    <label className='text-lg font-primary font-medium'>Amenities</label>
                    <div className=" flex gap-2 items-center">
                        <input type="checkbox"  id='parking' className='w-5 h-5' checked={sidebarData.parking}
                        onChange={handleChange}/>
                        <span className='font-medium font-primary'>Parking</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="checkbox"  id='furnished' className='w-5 h-5' checked={sidebarData.furnished} 
                        onChange={handleChange}/>
                        <span className='font-medium font-primary'>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <label className='font-medium text-lg outline-none '>Sort: </label>
                    <select name="" id="sort_order" className=' rounded-lg p-3 font-primary' onChange={handleChange}
                    defaultValue={'created_at_desc'}>
                        <option value="regularPrice_desc">Price high to Low</option>
                        <option value="regularPrice_asc">Price low to High</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-center cursor-pointer transition-all duration-2000 ease-in text-white p-3 rounded-lg uppercase hover:opacity-90'>
                    Search
                </button>
            </form>
        </div>
        <div className="w-full flex flex-col">
            <h1 className='text-2xl p-5 font-medium font-primary'>Listing Results:</h1>
            <div className="flex  justify-center flex-wrap gap-5 ">
              {
                status !== "pending" && listing?.length === 0 &&
                ( <p className='text-xl p-5 text-slate-700 font-medium font-primary'>No Listing Found!</p> )
              }
              {
                status === "pending" ? <Loader/> : 
                (
                  listing?.map((list)=>
                  (<ListCart list={list} key={list._id}/>))
                )
              }

            </div>
        </div>
    </div>
  )
}

export default Search
