import { NavLink } from 'react-router-dom';
    import styles from './Sidebar.module.scss';

    const Sidebar = () => {
      return (
        <aside className={styles.sidebar}>
          <div className={styles.sidebar__logo}>
            <h2>Scorecard</h2>
          </div>
          <nav className={styles.sidebar__nav}>
            <ul>
              <li>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/scorecards" 
                  className={({ isActive }) => isActive ? styles.active : ''}
                >
                  Scorecards
                </NavLink>
              </li>
              {/* Tambahkan menu lain di sini sesuai role */}
            </ul>
          </nav>
        </aside>
      );
    };

    export default Sidebar;