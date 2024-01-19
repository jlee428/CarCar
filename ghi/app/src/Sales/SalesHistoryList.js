//TODO: dropdown to select sales person by name or employee number
//onSelection, display list of sales records for that person without refreshing
//record should countain: Sales Person Name, Customer Name, Automobile Name, Sale price
import React, { Component } from 'react';
import { useState, useEffect } from 'react'

function SalesHistoryList() {
    const [sales, setSales] = useState([]);
    const [salesPerson, setSalesPerson] = useState([]);
    const [filteredSales, setFilteredSales] = useState([]);
    const [dropdown, setDropdown] = useState([]);


    async function loadSalesPerson() {
        const response = await fetch('http://localhost:8090/api/salesperson/')
        if (response.ok) {
            // console.log(data)
            let data = await response.json();
            setSalesPerson(data.sales_persons);
        }
        else {
            console.log("404, salesperson API could not be retrieved");
        }
    }


    async function loadSales(value) {
        const salesResponse = await fetch('http://localhost:8090/api/sales')
        if (salesResponse.ok) {
            let salesData = await salesResponse.json();
            setSales(salesData);
            const saleDetails = salesData.sales;
            const temp = [];
            // console.log(value);
            for (let saleDetail of saleDetails) {
                // console.log(saleDetail.sales_person.employee_number)
                if (saleDetail.sales_person.employee_number == value) {
                    // console.log('found a match')
                    temp.push(saleDetail);
                }
            }
            setFilteredSales(temp);
            // console.log(temp);
            // console.log(saleDetails);
            // console.log(value);

        } else {
            console.error("404, sales API could not be retrieved");
        }
    }

    function handleSalesPersonChange(event) {
        // setDropdown(event.target.value);
        const value = event.target.value;
        // console.log(value)
        // console.log('swag');
        // console.log(value);
        loadSales(value);
        // console.log(event.target.value)
        // console.log(loadSales(value));
    }



    useEffect(() => { loadSalesPerson(); }, []);
    // useEffect(() => { loadSales(); }, []);

    return (
        <>
            <div className="container">
                <div className="offset-3 col-4">
                    <div className="shadow p-4 mt-4 bdr">
                        <h1 style={{ color: "black" }}>Sales History</h1>
                        <div className=" mb-3">
                            <select onChange={handleSalesPersonChange} required name="seller" className="form-select">
                                <option>Salesperson Name</option>
                                {salesPerson.map((item, i) => {
                                    return (
                                        <option key={i} value={item.employee_number}>
                                            {item.sales_person_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Salesperson</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSales.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td> {item.sales_person.sales_person_name}</td>
                                        <td> {item.customer.customer_name}</td>
                                        <td> {item.vin}</td>
                                        <td> {item.sale_price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default SalesHistoryList;
