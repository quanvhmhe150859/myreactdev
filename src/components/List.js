import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
 
 
const List = () => {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
 
    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/users");
            //console.log(result.data.results);
            setUSerData(result.data.results)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
 
    const handleDelete=async(id)=>{
        console.log(id);
        await axios.delete("http://127.0.0.1:8000/api/usersdelete/"+id);
        const newUserData=userData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setUSerData(newUserData);
    }
 
    return(
        <div className="container">
            <section class="py-5">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                    userData.map((user, i) => {
                        return (
                            <div class="col mb-5">
                            <div class="card h-100">
                            
                                <div class="badge bg-dark text-white position-absolute">Sale</div>
                            
                                <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                            
                                <div class="card-body p-4">
                                    <div class="text-center">
                                    
                                        <h5 class="fw-bolder">{user.name}</h5>
                                        
                                        <div class="d-flex justify-content-center small text-warning mb-2">
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                            <div class="bi-star-fill"></div>
                                        </div>
                                    
                                        <span class="text-muted text-decoration-line-through">$20.00</span>
                                        {user.email}
                                    </div>
                                </div>
                            
                                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
                        
                    </div>
                </div>
            </section>
        </div>
    );
};
 
export default List;