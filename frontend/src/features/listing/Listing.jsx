import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./listing.scss";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../../../firebase';
import ListImage from '../../components/listImage/ListImage';
import { clearErrors, createListing } from './listSlice';
import { setCustomisedError } from './listSlice';


const Listing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth);
  const {error, status, listing, singleList} = useSelector((state)=> state.listing);

  

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls:[],
    name:"",
    description:"",
    address:"",
    type:"rent",
    bedrooms:1,
    bathrooms:1,
    regularPrice:1000,
    discountedPrice:0,
    offer:false,
    parking:false,
    furnished:false,
    userRef:user._id,
  });

  const [imageUpdloadError, setImageUpdloadError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) =>{
    setLoading(true);
    
    setImageUpdloadError(false)

    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
      const promises = [];
      for(let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)});
        setImageUpdloadError(false)
        setLoading(false);
      }).catch((err)=>{
        setImageUpdloadError("Image upload failed (2mb max size per image");
        setLoading(false);
      })
    }
    else{
      setImageUpdloadError("You can only upload 6 images maximum");
      setLoading(false);
    }
  }

  const storeImage = async(file)=>{
      return new Promise((resolve, reject) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on('state_changed',
          (snapshot)=>{
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            //console.log('upload is ' + progress + '% done')
          },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
          })
        }
        );
      })
    }
  
    const handleChange = (e)=>{
      
      if(e.target.id === "sale" || e.target.id === "rent"){
        setFormData({...formData, type:e.target.id})
      }

      if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
        setFormData({...formData, [e.target.id]:e.target.checked})
      }

      if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea"){
        setFormData({...formData, [e.target.name]:e.target.value})
      }
    }

    const handleSubmit = (e) => {
    
      if(formData.imageUrls.length < 1){
        return setImageUpdloadError("Please upload atleast one image");
      }
      if( Number(formData.discountedPrice) > Number( formData.regularPrice)){
        // console.log("discount",formData.discountedPrice, typeof(formData.discountedPrice));
        // console.log("regular",formData.regularPrice, typeof(formData.regularPrice));

        return dispatch(setCustomisedError("Discounted Price must be less than Regular price"))
      }
          
      dispatch(createListing(formData));
      
      console.log("Single listing", singleList);

      navigate(`/listing/${singleList._id}`);
      
      if(error){
        dispatch(clearErrors());
      }
    }

    

  
    useEffect(()=>{
      dispatch(clearErrors());
    },[])


  return (
    <div className='listing'>
      <h1>Create a Listing</h1>
      <main>
      <div className="listing-left">
        <div className="list-inputs">
          <input type="text" id='name'  placeholder='Title' name="name" maxLength="62"
            minLength="5" value={formData.name} required onChange={handleChange}
          />
          <textarea name="description" placeholder='Description'
           value={formData.textarea} onChange={handleChange} ></textarea>
          <input type="text" placeholder='Address' name='address' 
            value={formData.address} onChange={handleChange} />
        </div>
        <div className="facilities">
          <div className="">
            <input type="checkbox" id="sale" onChange={handleChange} 
              checked={formData.type ==="sale"} />
            <label htmlFor="">Sell</label>
          </div>
          <div className="">
            <input type="checkbox" id="rent" onChange={handleChange}
             checked={formData.type === "rent"} />
            <label htmlFor="">Rent</label>
          </div>
          <div className="">
            <input type="checkbox" id="parking" onChange={handleChange}
            checked={formData.parking}/>
            <label htmlFor="">Parking spot</label>
          </div>
          <div className="">
            <input type="checkbox" id="furnished" onChange={handleChange}
            checked={formData.furnished}/>
            <label htmlFor="">Furnished</label>
          </div>
          <div className="">
            <input type="checkbox" id="offer" onChange={handleChange} checked={formData.offer} />
            <label htmlFor="">Offer</label>
          </div>  
        </div>
        <div className="beds-baths">
          <div className="">
            <input type="number" name='bedrooms' required min="1" max="6" value={formData.bedrooms} onChange={handleChange}/>
            <label htmlFor="">Beds</label>
          </div>
          <div className="">
            <input type="number" name='bathrooms' max="4" min="1" required value={formData.bathrooms} onChange={handleChange}/>
            <label htmlFor="">Bath</label>
          </div>
        </div>
        <div className="list-price">
          <div className="">
          <input type="number" min="1000" max="10000000" name='regularPrice' required value={formData.regularPrice} onChange={handleChange}/>
            <div className="">
              <p>Regular Price</p>
              <p style={{fontSize:"14px"}}>{"$/Month"}</p>
            </div>
          </div>
          {
            formData.offer && 
            <div className="">
            <input type="number" min="0" max="100000" name='discountedPrice' required value={formData.discountedPrice} onChange={handleChange} />
              <div className="">
                <p>Discounted Price</p>
                {
                  formData.type === "rent" && (
                    <p style={{fontSize:"14px"}}>{"$/Month"}</p>
                  )
                }
              </div>
            </div>
          }
        </div>
        {
          error && <p style={{color:"red", fontSize:"14px"}} >{error}</p>
        }
      </div>
      <div className="listing-right">
          <p><span>Images:</span>{" "}This first image will be the cover (max 6)</p>
          <div className="">
            <input type="file" id='images' accept='images/*' multiple onChange={(e)=>setFiles(e.target.files)} />
            <button type='button' onClick={handleImageSubmit}>{loading ? "Uploading..." : "Upload"}</button>
          </div>
          <button disabled={status === "pending"} onClick={handleSubmit} >Create Listing</button>

          <p style={{color:"red", fontSize:"14px"}}>
            {imageUpdloadError && imageUpdloadError}
          </p>

          <div className="list-image-container">
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((image, index)=>
              (
                <ListImage formData={formData} setFormData ={setFormData} image={image} index={index} key={index} />
              ))
            }
          </div>
      </div>
      </main>
    </div>
  )
}

export default Listing
