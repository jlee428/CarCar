import React from 'react';

class ServiceAppointmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
        }
    }
    async componentDidMount() {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ appointments: data.appointments.filter(appt => !appt.active) })
        }
    }
    async deleteService(id, owner) {
        const isConfirmed = window.confirm(`Delete this appointment for ${owner}?`)
        if (isConfirmed) {
            const url = `http://localhost:8080/api/appointments/${id}/`;
            const fetchConfig = { method: "delete" };
            const response = await fetch(url, fetchConfig);
            const filteredAppointments = this.state.appointments.filter(appointment => appointment.id !== id)
            if (response.ok) {
                this.setState({ appointments: filteredAppointments })
            }
        }
    }
    async finishedService(id, owner) {
            const URL = `http://localhost:8080/api/appointments/${id}/`;
            const data = { active: true };
            const fetchConfig = { method: "PUT", body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'} };
            const finishedResponse = await fetch(URL, fetchConfig);
            const filteredAppointments = this.state.appointments.filter(appointment => appointment.id !== id)
            if (finishedResponse.ok) {
                this.setState({ appointments: filteredAppointments })
        };
    }
    render() {
    return(
        <div>
            <h1 style= {{color:"green"}} >Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Vin</th>
                    <th>Owner</th>
                    <th>Vip</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Complete</th>
                </tr>
                </thead>
                <tbody>
                {this.state.appointments.map((appointment,i )=> {
                    return (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.owner}</td>
                        <td>{appointment.vip ? 'VIP': false}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{new Date(appointment.date).toLocaleTimeString()}</td>
                        <td>{appointment.technician.name}</td>
                        <td>{appointment.reason}</td>
                        <td><button className="btn btn-success" onClick={() => this.finishedService(appointment.id)} type="button">Finished</button></td>
                        <td><button className="btn btn-danger" onClick={() => this.deleteService(appointment.id)} type="button">Delete</button></td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )};
}

export default ServiceAppointmentList;
