import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/purses");
            //console.log(result.data.results);
            setUSerData(result.data.results)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }

    const handleDelete = async (id) => {
        console.log(id);
        await axios.delete("http://127.0.0.1:8000/api/usersdelete/" + id);
        const newUserData = userData.filter((item) => {
            return (
                item.id !== id
            )
        })
        setUSerData(newUserData);
    }

    return (
        <section class="page-section bg-light" id="portfolio">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase">Products</h2>
                    <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <div class="row">
                    {
                        userData.map((user, i) => {
                            return (
                                <div class="col-lg-4 col-sm-6 mb-4">
                                    <div class="portfolio-item">
                                        <a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                                            <div class="portfolio-hover">
                                                <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
                                            </div>
                                            <img class="img-fluid" src={`http://127.0.0.1:8000/storage/uploads/purses/${user.image_path}`} alt="..." />
                                        </a>
                                        <div class="portfolio-caption">
                                            <div class="portfolio-caption-heading">{user.name}</div>
                                            <div class="portfolio-caption-subheading text-muted">${user.price}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default Products;