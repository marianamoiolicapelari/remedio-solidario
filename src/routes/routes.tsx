import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Paciente from '../pages/Paciente'
import Medicamento from '../pages/Medicamento'
import Dispensacao from '../pages/Dispensacao'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />}>
            <Route path='paciente' element={<Paciente />} />
            <Route path="medicamento" element={<Medicamento />} />
            <Route path="dispensacao" element={<Dispensacao />} />
      </Route>      
    </Routes>
  )
}
