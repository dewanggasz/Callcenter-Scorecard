import { useState, useEffect } from 'react';
import KpiCard from '../components/dashboard/KpiCard';
import apiClient from '../services/api';
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Array dependensi kosong, sehingga hanya berjalan sekali saat komponen dimuat

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.dashboard}>
      {dashboardData && (
        <>
          <div className={styles.dashboard__grid}>
            {dashboardData.kpis.map((kpi, index) => (
              <KpiCard 
                key={index}
                title={kpi.title}
                value={kpi.value}
              />
            ))}
          </div>
          <div className={styles.dashboard__chartArea}>
            {/* Area untuk grafik, kita bisa tambahkan komponen Chart di sini nanti */}
            <h3>Performance Trend</h3>
            <p>Chart component will be placed here.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;