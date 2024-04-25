import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Patient from '../pages/Patient'
import Medicine from '../pages/Medicament'
import Dispensation from '../pages/Dispensation'
import PatientRegistration from '../pages/PatientRegistration'
import MedicamentRegistration from '../pages/MedicamentRegistration'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />}>
        <Route path='paciente' element={<Patient />} />
        <Route path='lista-paciente' element={<PatientRegistration />} />
        <Route path="medicamento" element={<Medicine />} />
        <Route path='lista-medicamento' element={<MedicamentRegistration />} />
        <Route path="dispensacao" element={<Dispensation />} />
      </Route>      
    </Routes>
  )
}
