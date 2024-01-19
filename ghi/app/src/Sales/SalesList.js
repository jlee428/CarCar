//TODO: map: sales person name, employee name, purchaser name, vin, price of sale
import React from 'react';
import { useState, useEffect } from 'react';


function SaleRecordList() {

    const [saleRecords, setRecords] = useState([]);

    async function loadRecords() {
        const response = await fetch("http://localhost:8090/api/sales/");
        console.log('we is being hit')
        if (response.ok) {
            let data = await response.json();
            setRecords(data.sales);
            console.log(data.sales)
        }
        else {
            console.error("404 Reponse is dead", response);
        }
    }

    useEffect(() => { loadRecords(); }, [])

    return (
        <div>
            <h1>Sales Records</h1>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Salesperson Name</th>
                        <th>Employee ID</th>
                        <th>Customer Name</th>
                        <th>VIN</th>
                        <th>Sale price</th>
                    </tr>
                </thead>
                <tbody>
                    {saleRecords?.map(record => {
                        return (
                            <tr key={record.id}>
                                <td>{record.sales_person.sales_person_name}</td>
                                <td>{record.sales_person.employee_number}</td>
                                <td>{record.customer.customer_name}</td>
                                <td>{record.vin}</td>
                                <td>{record.sale_price}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default SaleRecordList;
