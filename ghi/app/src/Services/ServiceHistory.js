import React, { useState } from 'react';

function TableStatusMessage(props) {
    const { displayAppointmentsLength, hasSearched } = props;
    if (!hasSearched && displayAppointmentsLength === 0) {
        return (
            <h3 className="text-center">Input a valid VIN on the search bar in the top right of the screen to view its service history</h3>
        )
    }
    if (hasSearched && displayAppointmentsLength === 0) {
        return (
            <h3 className="text-center">No past service appointments found for that VIN.</h3>
        )
    }
}

class ServiceHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAppointments: [],
            displayAppointments: [],
            searchVIN: "",
            hasSearched: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const completedAppointments = data.appointments.filter(appt => appt.active)
            this.setState({ allAppointments: completedAppointments })
        }
    }
    handleSearch(e) {
        e.preventDefault();
        const filteredAppointments = this.state.allAppointments.filter(appt => appt.vin === this.state.searchVIN);
        this.setState(
            {
                displayAppointments: filteredAppointments,
                hasSearched: true
            });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <>
            <div className="d-flex justify-content-between">
                    <h1>Service Appointment History</h1>
                    <form className="d-flex align-items-center" onSubmit={this.handleSearch}>
                        <input
                            className="form-control"
                            type="text"
                            name="searchVIN"
                            id="searchVIN"
                            placeholder="Vehicle VIN"
                            onChange={this.handleChange}
                            value={this.state.searchVIN}
                        />
                        <button className="btn btn-primary text-nowrap">Search VIN</button>
                    </form>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Vin</th>
                            <th>Owner</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.displayAppointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td>{appointment.vin}</td>
                                    <td>{appointment.owner}</td>
                                    <td>{new Date(appointment.date).toLocaleString()}</td>
                                    <td>{new Date(appointment.date).toLocaleTimeString()}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <TableStatusMessage
                    displayAppointmentsLength={this.state.displayAppointments.length}
                    hasSearched={this.state.hasSearched}
                />
            </>
        )
    }
}
export default ServiceHistory;
