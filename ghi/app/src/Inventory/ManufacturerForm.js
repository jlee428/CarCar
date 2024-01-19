import React from "react"

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(manufacturerUrl, fetchConfig);
        if (response.ok) {
            const newManufacturer = await response.json();
            this.setState({name: "",})
        }
    }

render() {
    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 style= {{color:"Green"}}>Create a Manufacturer</h1>
                    <form onSubmit={this.handleSubmit} id="create-Manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} placeholder="Name" value={this.state.name} required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                <div>
                    <img src="https://toybarnstorage.com/wp-content/uploads/2018/02/chandler-banner-2.jpg"
                        width="640"
                        height="400"
                        align="center"
                        alt="large model">
                    </img>
                </div>
            </div>
        </div>
        </>
    );
    };
}

export default ManufacturerForm;
