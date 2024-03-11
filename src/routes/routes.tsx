import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Patient from '../pages/Patient'
import Medicine from '../pages/Medicament'
import Dispensation from '../pages/Dispensation'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />}>
            <Route path='paciente' element={<Patient />} />
            <Route path="medicamento" element={<Medicine />} />
            <Route path="dispensacao" element={<Dispensation />} />
      </Route>      
    </Routes>
  )
}
