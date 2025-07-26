// File: frontend/src/components/layout/Sidebar.jsx
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
              Dasbor
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/scorecards" 
              end // 'end' prop penting agar tidak aktif saat di /scorecards/create
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              Daftar Scorecard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/scorecards/create" 
              className={({ isActive }) => isActive ? styles.active : ''}
            >
              Buat Scorecard
            </NavLink>
          </li>
          {/* Tambahkan menu lain di sini sesuai role */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
