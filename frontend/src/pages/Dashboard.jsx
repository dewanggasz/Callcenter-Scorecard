import KpiCard from '../components/dashboard/KpiCard';
import styles from './Dashboard.module.scss';

// Data dummy untuk ditampilkan. Nanti ini akan datang dari API.
const kpiData = [
  { title: 'Handled Calls', value: '1,204' },
  { title: 'Average Handling Time (AHT)', value: '4:32' },
  { title: 'First Call Resolution (FCR)', value: '89%' },
  { title: 'Quality Score', value: '95.5%' },
  { title: 'CSAT', value: '92%' },
  { title: 'Attendance', value: '98%' },
];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__grid}>
        {kpiData.map((kpi, index) => (
          <KpiCard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            // Anda bisa menambahkan ikon di sini nanti
            // icon={<i className="fas fa-phone"></i>} 
          />
        ))}
      </div>
      {/* Area untuk grafik atau tabel akan ditambahkan di sini nanti */}
    </div>
  );
};

export default Dashboard;