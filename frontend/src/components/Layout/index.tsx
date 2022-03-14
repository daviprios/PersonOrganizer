import styles from './index.module.sass'

import { Link, Outlet } from 'react-router-dom'
import { paths } from '../../Routes'
import PopupManager from './PopupManager'

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.info}>
        <header className={styles.header}>
          <h1>Cadastro Global</h1>
          <p>cadastro geral de sobre tudo de todos</p>
        </header>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <Link to={paths.pages.search}>Pesquisa e Listagem</Link>
            </li>
            <li>
              <Link to={paths.pages.add}>Adição de Cadastro</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet/>
      <PopupManager/>
    </div>
  )
}

export default Layout