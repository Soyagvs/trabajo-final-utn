import './Footer.css'

export const Footer = () => {
  const today = new Date()
  const year = today.getFullYear()
  return (
    <footer className='footer-container'>
      <p className='footer-text'>echa por Agustin | Todos los datos reservados {year}</p>
    </footer>
  )
}

