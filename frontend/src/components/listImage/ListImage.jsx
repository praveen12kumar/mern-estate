import React from 'react'
import "./listImage.scss";


const ListImage = ({formData, setFormData, image, index}) => {

    const handleRemoveImage = (index) => {
        setFormData({...formData, imageUrls: formData.imageUrls.filter((_, i)=> i !== index )})
    }

  return (
    <div className='list-image'>
      <img src={image} alt="list-image" />
      <button onClick={()=> handleRemoveImage(index)}>Delete</button>
    </div>
  )
}

export default ListImage
