import { NavLink, Form } from 'react-router-dom';
import React, { useEffect, useState } from "react"

function AutomobileList() {
    const [automobileList, setAutomobileList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8100/api/automobiles/');


            if (response.ok) {
                const data = await response.json();
                setAutomobileList(data.autos);
            };
        };
        fetchData()
    }, []);
    return (
        <div>
            <h1 style={{ color: "Green" }}>Vehicle List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Automobile VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {automobileList.map((automobile, i) => {
                        return (
                            <tr className="table-row" key={i}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                                <td>{automobile.model.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button>
                <NavLink className="btn btn-success" to="/automobiles/new">Create New Car</NavLink>
            </button>
        </div>
    );
}
export default AutomobileList;
