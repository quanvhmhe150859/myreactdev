import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
 
 
const ListPurse = () => {
    const [purseData, setpurseData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
 
    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:8000/api/purses");
            //console.log(result.data.results);
            setpurseData(result.data.results)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
 
    const handleDelete=async(id)=>{
        console.log(id);
        await axios.delete("http://127.0.0.1:8000/api/pursesdelete/"+id);
        const newpurseData=purseData.filter((item)=>{
            return(
                item.id !==id
            )
        })
        setpurseData(newpurseData);
    }
 
    return(
        <div className="container">
            <h3>List Purses</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Material</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        purseData.map((purse, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{purse.name} </td>
                                    <td>{purse.material} </td>
                                    <td>{purse.price} </td>
                                    <td>{purse.stock} </td>
                                    <td>
                                        <img class="pursereview" src={`http://127.0.0.1:8000/storage/uploads/purses/${purse.image_path}`} alt="Purse" />
                                    </td>
                                    <td>
                                        <NavLink to={`/view/${purse.id}`} className="btn btn-success mx-2">View</NavLink>
                                        <NavLink to={`/edit/${purse.id}`} className="btn btn-info mx-2">Edit</NavLink>
                                        <button onClick={()=>handleDelete(purse.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};
 
export default ListPurse;