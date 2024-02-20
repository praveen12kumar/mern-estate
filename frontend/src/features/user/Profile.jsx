import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { useRef } from 'react';
import {app} from "../../../firebase";
import "./profile.scss";
import { clearErrors, updateUserProfile, deleteUserProfile, logoutUser } from './authSlice';
import { getUserListing } from '../listing/listSlice';

// firebase rules
      // allow read;
      // allow write: if
      // request.resource.size < 2 * 1024 * 1024 && 
      // request.resource.contentType.matches('image/.*')

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, status, error} = useSelector((state)=> state.auth);

  const {listing} = useSelector((state)=> state.listing);

  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});

  const handleFileUpload = (file) =>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
          // console.log('upload is ' + progress + '% done')
          setPercentage(Math.round(progress));
        },
      (error)=>{
        setFileUploadErr(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData, avatar:downloadURL});
        })
      }
      );
  }


  const handleSubmit = (e) => {
    console.log(user._id)
    e.preventDefault();
    dispatch(updateUserProfile({formData, id:user._id}));

    if(error){
      dispatch(clearErrors());
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value 
    });
  }

  const handleDeleteProfile = () => {
      dispatch(deleteUserProfile({id:user._id}));
      navigate('/login');
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  }


  const handleShowListing = () => {
    dispatch(getUserListing(user._id));
    
    if(error){
      clearErrors();
    }
}


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
   
  },[file])


  return (
    <div className='profile'>
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setFile(e.target.files[0])} />
        <img onClick={()=> fileRef.current.click()} src={formData.avatar || user?.avatar} alt="avatar"  />
        {fileUploadErr ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : percentage > 0 && percentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${percentage}%`}</span>
          ) : percentage === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        <input type="text" placeholder='username' name="username"  defaultValue={user?.username} onChange={handleChange} />
        <input type="email" placeholder='email' defaultValue={user?.email} name="email" onChange={handleChange} />
        <input type="password" placeholder="password" defaultValue={user.password} name="password" onChange={handleChange} />
        <button className='update-profile-btn' disabled={status === "pending"}  type='submit'>{status === "pending" ? "Loading..." : "update"}</button>
        <button className='create-list-btn' onClick={()=> navigate('/listing')}  > Create Listing</button>
     
      </form>
      <div className="">
        <span onClick={handleDeleteProfile}>Delete Account</span>
        <span onClick={handleLogout}>Logout</span>
      </div>
      <p>{error ? error : ""}</p>
      <button onClick={handleShowListing}>Show Listing</button>
      {
        listing && listing?.map((list)=>(
          <div className="user-listing" key={list._id}>
            <div className="">
              <img src={list.imageUrls[0]} alt="listing" />
              <p>{list.name}</p>
            </div>
            <div className="list-buttons">
              <button className='list-delete'>Delete</button>
              <button className='list-edit'>Edit</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Profile
