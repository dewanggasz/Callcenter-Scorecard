import Card from '../ui/Card';
import styles from './KpiCard.module.scss';

/**
 * Menampilkan satu metrik KPI di dalam sebuah Card.
 * @param {object} props
 * @param {string} props.title - Judul KPI, e.g., "Handled Calls".
 * @param {string} props.value - Nilai dari KPI, e.g., "1,234".
 * @param {React.ReactNode} [props.icon] - Ikon untuk ditampilkan.
 */
const KpiCard = ({ title, value, icon }) => {
  return (
    <Card className={styles.kpiCard}>
      <div className={styles.kpiCard__content}>
        <h3 className={styles.kpiCard__title}>{title}</h3>
        <p className={styles.kpiCard__value}>{value}</p>
      </div>
      {icon && <div className={styles.kpiCard__icon}>{icon}</div>}
    </Card>
  );
};

export default KpiCard;