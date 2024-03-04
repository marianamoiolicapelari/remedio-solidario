import { Outlet, Link } from 'react-router-dom'

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  console.log("Renderizando Home")
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: '100vh', width: '250px', backgroundColor: '#247ba0', padding: '20px' }}>
        <nav>
          <ul>
            <li><Link to="/home/paciente">Paciente</Link></li>
            <li><Link to="/home/medicamento">Medicamento</Link></li>
            <li><Link to="/home/dispensacao">Dispensação</Link></li>
          </ul>
        </nav>
      </div>
      <div style={{ flex: 1, padding: '20px', backgroundColor: 'white'}}>
        <Outlet />
      </div>
    </div>
  )
}

export default Home

