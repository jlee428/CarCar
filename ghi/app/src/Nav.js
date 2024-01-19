import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="nav-link" to="/SalesPersonForm">Add Salesperson</NavLink></li>
                <NavLink className="nav-link" to="/CustomerForm">Add Customer</NavLink>
                <NavLink className="nav-link" to="/SalesRecordForm">Add Sale</NavLink>
                <li><hr className="dropdown-divider"></hr></li>
                <NavLink className="nav-link" to="/SalesRecord">Sales Record</NavLink>
                <NavLink className="nav-link" to="/SaleHistoryList">Salesperson History</NavLink>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="nav-link" to="/technicians/">Add Technician</NavLink></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><NavLink className="nav-link" to="/appointments/active">Service Appointment List</NavLink></li>
                <li><NavLink className="nav-link" to="/appointments/new">Create Service Appointment</NavLink></li>
                <li><NavLink className="nav-link" to="/appointments/history">Service History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="nav-link" to="/automobiles/new">Add Automobile</NavLink></li>
                <li><NavLink className="nav-link" to="/automobiles/list">Automobile List Form</NavLink></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><NavLink className="nav-link" to="/manufacturers/new">Add Manufacturer</NavLink></li>
                <li><NavLink className="nav-link" to="/manufacturers/list">Manufacturer List Form</NavLink></li>
                <li><hr className="dropdown-divider"></hr></li>
                <li><NavLink className="nav-link" to="/models/new">Add Vehicle Model</NavLink></li>
                <li><NavLink className="nav-link" to="/models/list">Vehicle Model List Form</NavLink></li>
              </ul>
            </li>
          </ul>


        </div>
      </div>
    </nav>
  )
}

export default Nav;
// import { NavLink } from 'react-router-dom';

// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
//       <div className="container-fluid">
//         <NavLink className="navbar-brand" to="/">CarCar</NavLink>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           </ul>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Nav;
