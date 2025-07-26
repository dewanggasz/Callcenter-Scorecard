  import { Outlet } from 'react-router-dom';
    import Sidebar from './Sidebar';
    import Header from './Header';
    import styles from './MainLayout.module.scss';

    const MainLayout = () => {
      return (
        <div className={styles.layout}>
          <Sidebar />
          <div className={styles.layout__main}>
            <Header />
            <main className={styles.layout__content}>
              <Outlet /> {/* Halaman seperti Dashboard akan dirender di sini */}
            </main>
          </div>
        </div>
      );
    };

    export default MainLayout;