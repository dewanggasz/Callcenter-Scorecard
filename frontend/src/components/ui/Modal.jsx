import styles from './Modal.module.scss';

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null;

    return (
    <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
            <h3>{title}</h3>
            <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <div className={styles.content}>
            {children}
        </div>
        <div className={styles.footer}>
            <button onClick={onClose} className={styles.buttonSecondary}>Batal</button>
            <button onClick={onConfirm} className={styles.buttonDanger}>Konfirmasi</button>
        </div>
        </div>
    </div>
    );
};

export default Modal;