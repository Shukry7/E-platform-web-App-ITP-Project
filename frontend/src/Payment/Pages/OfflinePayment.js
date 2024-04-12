import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const userId = 'your-user-id';  // Replace this with the actual userId

  const onImageChange = event => {
    setImage(event.target.files[0]);
  };

  const onSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId);  // Append the userId to the form data
    const result = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(result.data);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
