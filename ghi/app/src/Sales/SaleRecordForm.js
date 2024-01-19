import React, { Component } from 'react'

export default class SalesRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            automobiles: [],
            automobile: '',
            sales_persons: [],
            sales_person: '',
            customers: [],
            customer: '',
            sale_price: "",
        };

        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPriceChange = this.handleSalesPriceChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            automobile: this.state.automobile,
            sales_person: this.state.sales_person,
            customer: this.state.customer,
            sale_price: this.state.sale_price,
        };


        const createSalesRecord = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(JSON.stringify(data))
        const response = await fetch(createSalesRecord, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();
            console.log(newSalesRecord);
        } else {
            alert('That vehicle has already been sold.')
        }

        const cleared = {
            automobile: "",
            sales_person: "",
            customer: "",
            sale_price: ""
        }
        this.setState(cleared);
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ sales_person: value })
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
    }

    handleSalesPriceChange(event) {
        const value = event.target.value;
        this.setState({ sale_price: value })
    }


    // testFunc(sales_persons) {
    //     console.log(sales_persons)
    //     this.setState(sales_persons)
    // };


    async componentDidMount() {
        fetch('http://localhost:8090/api/salesperson/')
            .then(sales_persons => sales_persons.json())
            .then(sales_persons => { this.setState(sales_persons) })

        fetch('http://localhost:8090/api/customers')
            .then(customers => customers.json())
            .then(customers => this.setState(customers))

        fetch('http://localhost:8100/api/automobiles/')
            .then(automobiles => automobiles.json())
            .then(automobiles =>
                this.setState({
                    automobiles: automobiles.autos
                })
            )

    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="offset-3 col-7">
                        <div className="shadow p-4 mt-4 bdr">
                            <h1 style={{ color: "black" }}>Sales Form</h1>
                            <form onSubmit={this.handleSubmit} id="create-salesrecord-form">
                                <div className="mb-3">
                                    <select onChange={this.handleAutomobileChange} value={this.state.automobile} required name="automobiles" id="automobiles" className="form-select">
                                        <option value="">Car VIN #</option>
                                        {this.state.automobiles
                                            .map(automobile => {
                                                // console.log(automobile);
                                                return (
                                                    <option key={automobile.vin} value={automobile.vin}>
                                                        {automobile.vin}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleSalesPersonChange} value={this.state.sales_person} required name="sales_persons" id="sales_persons" className="form-select">
                                        <option value="">Sales Person</option>
                                        {this.state.sales_persons.map(sales_person => {
                                            return (
                                                <option key={sales_person.employee_number} value={sales_person.employee_number}>
                                                    {sales_person.sales_person_name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select onChange={this.handleCustomerChange} value={this.state.customer} required name="customers" id="customers" className="form-select">
                                        <option value="">Customer</option>
                                        {this.state.customers.map(customer => {
                                            return (
                                                <option key={customer.id} value={customer.customer_name}>
                                                    {customer.customer_name}

                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={this.handleSalesPriceChange} value={this.state.sale_price} placeholder="Sales Price" required type="text" name="sale_prices" id="sale_prices" className="form-control" />
                                    <label htmlFor="sale_price">Sale Price</label>
                                </div>
                                <button className="btn btn-outline-success">Submit</button>
                            </form>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
