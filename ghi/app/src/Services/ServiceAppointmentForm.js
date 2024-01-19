import React from 'react';

class ServiceAppointmentForm extends React.Component{

constructor(props) {
    super(props)
    this.state = {
        vin:'',
        owner:'',
        date:'',
        technicians:[],
        reason:'',
        vip:false,
        active: false,
    };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleVinChange(event){
        const value = event.target.value;
        this.setState({vin:value})
        }
    handleOwnerChange(event){
    const value = event.target.value;
    this.setState({owner:value})
    }
    handleDateChange(event){
    const value = event.target.value;
    this.setState({date:value})
    }
    handleTechnicianChange(event){
    const value = event.target.value;
    this.setState({technician:value})
    }
    handleReasonChange(event){
    const value = event.target.value;
    this.setState({reason:value})
    }
    async componentDidMount() {
        const url = "http://localhost:8080/api/technicians/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians});
        }
    }
    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason: value });
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.technicians
        const serviceUrl = "http://localhost:8080/api/appointments/"
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        header: {
            'Content-Type': 'application/json'
        }}
        const response = await fetch(serviceUrl, fetchConfig);
        if(response.ok) {
            const newService = await response.json();
        this.setState ({
            vin:'',
            owner:'',
            date:'',
            technician:'',
            reason:'',
            vip:false,
            active: false,
        });
    }
    }
    render() {
    let messageClasses = "alert alert-success mb-0 d-none"
    let formClasses = ""
    if (this.state.hasMadeAppt){
        messageClasses = "alert alert-success mb-0"
        formClasses = "d-none"
    }
    function reload(){
        window.location.reload()
    }
    return(
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1 style= {{color:"green"}}>New Service Appointment</h1>
                <form className={formClasses} onSubmit={this.handleSubmit} id="create-service-form">
                <div className="form-floating mb-3">
                    <input onChange={this.handleVinChange} value = {this.state.vin} placeholder="vin" required type="text" id="vin" name="vin" className="form-control" />
                    <label htmlFor="vin">Vin number (17 characters long)</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleOwnerChange} value = {this.state.owner} placeholder="owner" required type="text" id="owner" name="owner" className="form-control"/>
                    <label htmlFor="owner">Customer's Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleDateChange} value = {this.state.date} placeholder="time" required type="datetime-local" name="time" id="time" className="form-control" />
                    <label htmlFor="time">Date of Service</label>
                </div>
                <div className="form-floating mb-3">
                <select onChange={this.handleTechnicianChange} required name="technicians" id="technicians" className="form-select">
                                <option value="">Choose a technician</option>
                                {this.state.technicians.map(tech => {
                                    return (<option key={tech.employee_number} value={tech.employee_number}>{tech.name}</option>
                                    )
                                })}
                            </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleReasonChange} value = {this.state.reason} placeholder="Reason for the service" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">The reason for the service appointment</label>
                </div>
                <button className="btn btn-outline-success">Register</button>
                </form>
                <div className={messageClasses}>
                <h3 style= {{color:"green"}} >Appointment registered!</h3>
                <button onClick={reload} className="btn btn-outline-success">Go Back</button>
                </div>
            </div>
        </div>
        // </div>
    )
    }
}

export default ServiceAppointmentForm;
