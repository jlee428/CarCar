import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './Services/TechnicianForm';
import ServiceHistory from './Services/ServiceHistory';
import ServiceAppointmentForm from './Services/ServiceAppointmentForm';
import ServiceAppointmentList from './Services/ServiceAppointmentList';
import AutomobileList from './Inventory/AutomobileList';
import AutomobilesForm from './Inventory/AutomobilesForm';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturerList';
import VehicleModelForm from './Inventory/VehicleModelForm';
import VehicleModelList from './Inventory/VehicleModelList';
import SaleRecordList from './Sales/SalesList';
import SalesRecordForm from './Sales/SaleRecordForm';
import CustomerForm from './Sales/CustomerForm';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesHistoryList from './Sales/SalesHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/" element={<TechnicianForm />} />
          <Route path="appointments">
            <Route path="new" element={<ServiceAppointmentForm />} />
            <Route path="active" element={<ServiceAppointmentList />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="automobiles">
            <Route path='new' element={<AutomobilesForm />} />
            <Route path='list' element={<AutomobileList />} />
          </Route>
          <Route path="manufacturers">
            <Route path='list' element={<ManufacturerList />} />
            <Route path='new' element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route path='list' element={<VehicleModelList />} />
            <Route path='new' element={<VehicleModelForm />} />
          </Route>
          <Route path="/CustomerForm" element={<CustomerForm />} />
          <Route path="/SalesPersonForm" element={<SalesPersonForm />} />
          <Route path="/SaleHistoryList" element={<SalesHistoryList />} />
          <Route path="/SalesRecord" element={<SaleRecordList />} />
          <Route path="/SalesRecordForm" element={<SalesRecordForm />} />
        </Routes>
      </div>
      {/* <Footer /> */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
