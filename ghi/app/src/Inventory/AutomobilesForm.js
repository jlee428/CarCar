import {NavLink} from 'react-router-dom';
import React, {useEffect, useState} from "react"

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            color: "",
            year: "",
            vin: "",
            // model: "",
            models: [],
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({ color: value });
    }
    handleYearChange(event) {
        const value = event.target.value;
        this.setState({ year: value });
    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    handleModelChange(event) {
        const value = event.target.value;
        this.setState({ model_id: value });
    }
    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();


            this.setState({ models: data.models });
        }
    };
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        delete data.models;
        const automobileUrl = "http://localhost:8100/api/automobiles/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(automobileUrl, fetchConfig);
        if (response.ok) {
            const newAutomobile = await response.json();


            this.setState(
                {color: "",
                year: "",
                vin: "",
                // model: "",
                models: [], }
                );
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 style= {{color:"Green"}}>Create a New Automobile</h1>
                        <form onSubmit={this.handleSubmit} id="create-automobile-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleColorChange} placeholder="color" value={this.state.color} required type="text" name="color" id="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleYearChange} placeholder="year" value={this.state.year} required type="text" name="year" id="year" className="form-control" />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleVinChange} placeholder="vin" value={this.state.vin} required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">Vin Number</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleModelChange} required name="model_id" id="model_id" className="form-select">
                                    <option value="">Choose an automobile model</option>
                                    {this.state.models.map(model_id => {
                                        return (
                                            <option key={model_id.id} value={model_id.id}>{model_id.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
        };
}
export default AutomobileForm;
