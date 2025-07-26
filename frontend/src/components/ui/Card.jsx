import styles from './Card.module.scss';

/**
 * Komponen Card generik untuk membungkus konten.
 * @param {object} props
 * @param {React.ReactNode} props.children - Konten yang akan ditampilkan di dalam card.
 * @param {string} [props.className] - Class tambahan untuk kustomisasi style.
 */
const Card = ({ children, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {children}
    </div>
  );
};

export default Card;