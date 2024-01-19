//TODO: name, address, phone input/onSubmit create a new customer/ state updates inside sale record
import React, { Component } from 'react';

export default class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_name: '',
            address: '',
            phone_number: '',
        };

        this.handleCustomerNameChange = this.handleCustomerNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCustomerNameChange(event) {
        // event.preventDefault();
        this.setState({ customer_name: event.target.value });
        // console.log(this.state.customer_name);
    }

    handleAddressChange(event) {
        // event.preventDefault();
        this.setState({ address: event.target.value });
        // console.log(this.state.address);
    }

    handlePhoneNumberChange(event) {
        // event.preventDefault();
        this.setState({ phone_number: event.target.value });
        // console.log(this.state.phone_number);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            customer_name: this.state.customer_name,
            customer_address: this.state.address,
            customer_phone: this.state.phone_number,
        };

        const createCustomer = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // console.log(JSON.stringify(data))
        const response = await fetch(createCustomer, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
        }
    }




    render() {
        return (
            <>
                <div className="container">
                    <div className="offset-3 col-4">
                        <div className="shadow p-4 mt-4 bdr">
                            <h1 style={{ color: "black" }}>Customer Form</h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className=" mb-3">
                                    <div>
                                        <label>Customer Name</label>
                                    </div>
                                    <input onChange={this.handleCustomerNameChange} value={this.state.customer_name} type="text" size="30" />
                                </div>
                                <div className="mb-3">
                                    <div>
                                        <label>Address</label>
                                    </div>
                                    <input onChange={this.handleAddressChange} value={this.state.address} type="text" size="30" />
                                </div>
                                <div className="mb-3">
                                    <div>
                                        <label>Phone Number</label>
                                    </div>
                                    <input onChange={this.handlePhoneNumberChange} value={this.state.phone_number} type="text" size="30" />
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
