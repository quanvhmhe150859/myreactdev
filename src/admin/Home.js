import React, { useState } from 'react';
import ListPurse from './ListPurse';
import axios from 'axios';
 
const Home = () => {
 
    const [userField, setUserField] = useState({
        name: "",
        email: "",
        password: ""
    });
 
    const changeUserFieldHandler = (e) => {
        setUserField({
            ...userField,
            [e.target.name]: e.target.value
        });
        //console.log(userField);
 
    }
    const [loading,setLoading]=useState()
 
    // const onSubmitChange = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const responce= await axios.post("http://127.0.0.1:8000/api/addnewpurse", userField);
    //         console.log(responce)
    //         setLoading(true);
    //     } catch (err) {
    //         console.log("Something Wrong");
    //     }
    // }
    const onSubmitChange = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', userField.name);
        formData.append('material', userField.material);
        formData.append('price', userField.price);
        formData.append('stock', userField.stock);
        formData.append('image', document.getElementById('image').files[0]); // Add image file
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/addnewpurse", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setLoading(true);
        } catch (err) {
            console.log("Something went wrong:", err);
        }
    };
    
    if(loading){
        return <Home/>
    }
 
    return (
        <div>
                <div className='row'>
                    <div className='col-md-4'>
                        <h3>Add new Purse</h3>
                        <form>
                            <div className="mb-3 mt-3">
                                <label className="form-label"> Name Purse:</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Purse Name" name="name" onChange={e => changeUserFieldHandler(e)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Material:</label>
                                <input type="text" className="form-control" id="material" placeholder="Enter Material" name="material" onChange={e => changeUserFieldHandler(e)} required/>
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Price:</label>
                                <input type="number" className="form-control" id="price" placeholder="Enter Price" name="price" onChange={e => changeUserFieldHandler(e)} required/>
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Stock:</label>
                                <input type="number" className="form-control" id="stock" placeholder="Enter Stock" name="stock" onChange={e => changeUserFieldHandler(e)} required/>
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Image:</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={e => changeUserFieldHandler(e)} required/>
                            </div>
                             
                            <button type="submit" className="btn btn-primary" onClick={e => onSubmitChange(e)}>Add Purse</button>
                        </form>
                    </div>
                    <div className='col-md-8'>
                        <ListPurse />
                    </div>
                </div>
        </div>
    )
};
 
export default Home;