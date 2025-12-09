import { useParams } from 'react-router-dom'

function RoomDetail() {
  const { slug } = useParams()
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="neu-raised p-12 text-center">
        <h1 className="font-heading text-4xl mb-4">Detalle de Habitación</h1>
        <p className="text-text-secondary">Habitación: {slug}</p>
      </div>
    </div>
  )
}

export default RoomDetail