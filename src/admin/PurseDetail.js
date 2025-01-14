import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
 
const PurseDetail = () => {
    const {id}=useParams();
    // console.log(id);
    const[user,setUser]=useState([]);
    const navigate = useNavigate();
 
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
            const result=await axios.get("http://127.0.0.1:8000/api/purses/"+id);
            console.log(result.data.purses);
            setUser(result.data.purses)
     
            }catch(err){
                console.log("Something Wrong");
            }
        }

        fetchUser();
    },[id]);
 
    const clickToBackHandler=()=>{
        navigate('/');
    }
 
    return <div>
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
 
                    <h1>Purse Details</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Name</th>
                                <th>Material</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.material}</td>
                                <td>{user.price}</td>
                                <td>{user.stock}</td>
                                <td>{user.image_path}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div className='container d-flex justify-content-center'>
            <div><button className='btn btn-primary' onClick={clickToBackHandler}>Back To Home</button></div>
        </div>
    </div>;
};
 
export default PurseDetail;