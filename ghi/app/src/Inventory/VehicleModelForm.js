import React from "react";

class VehicleModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture_url: '',
            // manufacturer: '',
            manufacturers: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }
    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({ picture_url: value })
    }
    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer_id: value })
    }
    async componentDidMount() {
        const urlRecords = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(urlRecords);
        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.manufacturers;
        const modelsUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();
            this.setState(
                {name: '',
                picture_url: '',
                manufacturer: [], }
                );
        }
    }
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1 style= {{color:"Green"}}>Create a new model</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} placeholder="name" value={this.state.name} required type="text" name="name" className="form-control" />
                                <label htmlFor="name"> Model Name </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePictureUrlChange} placeholder="picture_url" value={this.state.picture_url} required type="url" name="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Add Picture Url</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleManufacturerChange} required id="manufacturer_id" name="manufacturer_id" className="form-select">
                                    <option value="">Choose a Manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer_id => {
                                        return (
                                            <option key={manufacturer_id.id} value={manufacturer_id.id}>
                                                {manufacturer_id.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default VehicleModelForm;
