import { Routes, Route } from 'react-router-dom'

// Layout
import Layout from './components/layout/Layout'

// Pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Location from './pages/Location'
import Reservations from './pages/Reservations'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/habitaciones" element={<Rooms />} />
        <Route path="/habitaciones/:slug" element={<RoomDetail />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/ubicacion" element={<Location />} />
        <Route path="/reservas" element={<Reservations />} />
      </Routes>
    </Layout>
  )
}

export default App