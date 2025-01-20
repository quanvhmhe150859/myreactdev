import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'cropperjs/dist/cropper.css'; // Import cropper CSS
import { Cropper } from 'react-cropper';

const EditPurse = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const clickToBackHandler = () => {
        navigate('/admin/home');
    }

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const [userField, setUserField] = useState({
        name: '',
        material: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        fetchUser();
    }, [id])

    const fetchUser = async () => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/api/purses/" + id);
            // console.log(result.data.users);
            setUserField(result.data.purses)
        } catch (err) {
            console.log("Something Wrong");
        }
    }

    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        console.log(userField);
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://127.0.0.1:8000/api/pursesupdate/" + id, userField);
            navigate('/admin/home');
        } catch (err) {
            console.log("Something Wrong");
        }
    }

    return (
        <div className="container">
            <h1>Edit Form</h1>
            <form class="row border shadow-sm pb-2">
                <div class="col-6">
                    <img style={{alignContent: 'center'}} src={`http://127.0.0.1:8000/storage/uploads/purses/${userField.image_path}`} alt="Purse" />
                </div>
                <div class="col-6">
                    <div className="mb-3 mt-3">
                        <label className="form-label">Id:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="id"
                            value={id}
                            disabled
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Name Purse:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Purse Name"
                            name="name"
                            onChange={(e) => changeUserFieldHandler(e)}
                            value={userField.name}
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
                            value={userField.material}
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
                            value={userField.price}
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
                            value={userField.stock}
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

                    <button type="submit" className="btn btn-primary" onClick={(e) => onSubmitChange(e)}>
                        Update
                    </button>
                </div>
            </form>

            <div className='container d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button>
            </div>
        </div>
    );
};

export default EditPurse;