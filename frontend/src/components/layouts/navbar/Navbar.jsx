import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
    return (
        <header>
            <nav className='nav-container'>
                <svg
                    className='logo'
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 14 14">
                    <path
                        fill="#F6B312"
                        fillRule="evenodd"
                        d="M7.41 1.713a.5.5 0 0 0-.82 0L3.432 6.225L.854 3.646A.5.5 0 0 0 0 4v6.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a.5.5 0 0 0-.854-.354l-2.578 2.579z"
                        clipRule="evenodd" />
                </svg>
                <div className='nav-div'>
                    <ol className='nav-ol'>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/about">Sobre mi</Link></li>
                        <li><Link to="/posts">Posts</Link></li>
                        <li><Link to="/contacts">Contacto</Link></li>
                    </ol>
                </div>
            </nav>
        </header>
    )
}

