import React, { useState } from 'react';
import List from './List';
import axios from 'axios';
import Menu from "./Menu";
import Header from "./Header";
import Footer from "./Footer";
import '../style.css';
import '../scripts';
 
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
 
    const onSubmitChange = async (e) => {
        e.preventDefault();
        try {
            const responce= await axios.post("http://127.0.0.1:8000/api/addnew", userField);
            console.log(responce)
            setLoading(true);
        } catch (err) {
            console.log("Something Wrong");
        }
    }
    if(loading){
        return <Home/>
    }
 
    return (
        <div className="">
            <Menu />
            <Header />
                <div className='list row'>
                    <div className='col-md-8'>
                        <List />
                    </div>
                </div>
            <Footer />
        </div>
    )
};
 
export default Home;