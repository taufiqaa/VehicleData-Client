import React from "react"
import { Route, Routes} from "react-router-dom"
import Dashboard from './pages/DashboardData';
import AddData from "./pages/AddData";
import EditData from "./pages/EditData";
import DetailData from "./pages/DetailData";


export default function App() {

  return (
    <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/detail-data/:id' element={<DetailData/>} />
    <Route path='/edit-data/:id' element={<EditData/>} />
    <Route path='/add-data' element={<AddData/>} />
  </Routes>
  )
}
