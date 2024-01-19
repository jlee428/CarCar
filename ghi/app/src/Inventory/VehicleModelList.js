import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function VehicleList() {
    const [models, setModels] = useState([]);
    async function loadData() {
        const response = await fetch("http://localhost:8100/api/models/");
        if (response.ok) {
            let data = await response.json();
            setModels(data.models);
        }
        else {
            console.error("Error fetching data", response);
        }
    }
    useEffect(() => { loadData(); }, [])
    return (
        <div>
            <h1 style={{ color: "Green" }} >Vehicle models</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map((model, i) => {
                        return (
                            <tr key={i}>
                                <td> {model.manufacturer.name} </td>
                                <td> {model.name} </td>
                                <td> <img src={model.picture_url} alt="car model" width="90%" height="auto" /> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button>
                <NavLink className="btn btn-success" to="/models/new">Create New</NavLink>
            </button>
        </div>
    )
}

export default VehicleList;
