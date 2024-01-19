//TODO: name, employee input/Create a new salesperson onSubmit/state updates in sale record view
import React, { Component } from 'react';

export default class SalesPersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sales_person_name: '',
            employee_number: '',
        };

        this.handleSalesPersonNameChange = this.handleSalesPersonNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSalesPersonNameChange(event) {
        // event.preventDefault();
        this.setState({ sales_person_name: event.target.value });
        // console.log(this.state.customer_name);
    }

    handleEmployeeNumberChange(event) {
        // event.preventDefault();
        this.setState({ employee_number: event.target.value });
        // console.log(this.state.employee_number);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            sales_person_name: this.state.sales_person_name,
            employee_number: this.state.employee_number,
        };

        const createSalesPerson = 'http://localhost:8090/api/salesperson/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // console.log(JSON.stringify(data))
        const response = await fetch(createSalesPerson, fetchConfig);
        if (response.ok) {
            const newSalesPerson = await response.json();
            console.log(newSalesPerson);
        }
    }




    render() {
        return (
            <>
                <div className="container">
                    <div className="offset-3 col-4">
                        <div className="shadow p-4 mt-4 bdr">
                            <h1 style={{ color: "black" }}>SalesPerson Form</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className=" mb-3">
                                    <div>
                                        <label>SalesPerson Name:</label>
                                    </div>
                                    <input onChange={this.handleSalesPersonNameChange} value={this.state.sales_person_name} type="text" size="30" />
                                </div>
                                <div className="mb-3">
                                    <div>
                                        <label>Employee Number:</label>
                                    </div>
                                    <input onChange={this.handleEmployeeNumberChange} value={this.state.employee_number} type="text" size="30" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
