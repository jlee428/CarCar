import {NavLink} from 'react-router-dom';
import React, {useEffect, useState} from "react"

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([]);
    async function fetchData() {
        const response = await fetch("http://localhost:8100/api/manufacturers/");
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        } else {
            alert("Error fetching data.");
        };
    };
    useEffect(() => { fetchData()}, []);
    const removeData = (id) => {
        fetch(`http://localhost:8100/api/manufacturers/"${id}`,
            { method: "DELETE" })
            .then(() => fetchData());
    };
    return (
        <div>
            <h1 style= {{color:"Green"}} >Manufacturer List</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map((manufacturer, id) => {
                        return (
                        <tr  key={manufacturer.id}>
                            <td >{manufacturer.name}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            <button>
                <NavLink className="btn btn-success" to="/manufacturers/new">Create</NavLink>
            </button>
            </div>
            )
};
export default ManufacturerList;
