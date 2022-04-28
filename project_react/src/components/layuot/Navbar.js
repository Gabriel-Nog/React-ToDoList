import styles from './Navbar.module.css';
import logo from '../../img/costs_logo.png'
import { Link } from 'react-router-dom';
import Container from './Container';
function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <Link to={'/'}>
                    <img src={logo} alt="Costs" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to={'/'}>Início</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to={'/projects'}>Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to={'/company'}>Sobre</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to={'/contact'}>Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar;