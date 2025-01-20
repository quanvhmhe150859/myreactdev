import React, { useState, useRef } from 'react';
import ListPurse from './ListPurse';
import axios from 'axios';
import Menu from '../components/Menu';
import Header from '../components/Header';
import headerBg from '../assets/images/header-bg.jpg';
import 'cropperjs/dist/cropper.css'; // Import cropper CSS
import { Cropper } from 'react-cropper';

const Home = () => {
    const [userField, setUserField] = useState({
        name: '',
        material: '',
        price: '',
        stock: ''
    });
    const [image, setImage] = useState(null);
    const cropperRef = useRef(null); // Reference for the cropper
    const [loading, setLoading] = useState(false);

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // Set the image for cropping
            };
            reader.readAsDataURL(file);
        }
    };

    const getCroppedImage = () => {
        const cropper = cropperRef.current.cropper;
        return new Promise((resolve, reject) => {
            cropper.getCroppedCanvas({
                width: 450,
                height: 300,
            }).toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error("Failed to generate cropped image blob"));
                }
            }, 'image/jpeg');
        });
    };
    

    const onSubmitChange = async (e) => {
        e.preventDefault();
    
        try {
            const croppedImageBlob = await getCroppedImage();
    
            const formData = new FormData();
            formData.append('name', userField.name);
            formData.append('material', userField.material);
            formData.append('price', userField.price);
            formData.append('stock', userField.stock);
            formData.append('image', croppedImageBlob, 'cropped-image.jpg');
    
            const response = await axios.post('http://127.0.0.1:8000/api/addnewpurse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setLoading(true);
        } catch (err) {
            console.error('Something went wrong:', err);
        }
    };
    

    if (loading) {
        return <Home />;
    }

    return (
        <div>
            <Menu />
            <div style={{height: '80px', backgroundImage: `url(${headerBg})`}}></div>
            {/* <Header /> */}
            <div style={{marginTop: '20px'}} className="row">
                <div className="col-md-4">
                    <h3>Add new Purse</h3>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Name Purse:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Purse Name"
                                name="name"
                                onChange={(e) => changeUserFieldHandler(e)}
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Material:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Material"
                                name="material"
                                onChange={(e) => changeUserFieldHandler(e)}
                                required
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Price:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Price"
                                name="price"
                                onChange={(e) => changeUserFieldHandler(e)}
                                required
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Stock:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Stock"
                                name="stock"
                                onChange={(e) => changeUserFieldHandler(e)}
                                required
                            />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Image:</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e)}
                                required
                            />
                        </div>
                        {image && (
                            <Cropper
                                src={image}
                                style={{ height: 300, width: '100%' }}
                                aspectRatio={450 / 300}
                                guides={false}
                                ref={cropperRef}
                            />
                        )}
                        <button type="submit" className="btn btn-primary" onClick={(e) => onSubmitChange(e)}>
                            Add Purse
                        </button>
                    </form>
                </div>
                <div className="col-md-8">
                    <ListPurse />
                </div>
            </div>
        </div>
    );
};

export default Home;
