import { useState, useEffect } from 'react';
import apiClient from '../services/api';
import styles from './ScorecardListPage.module.scss';

const ScorecardListPage = () => {
    const [scorecards, setScorecards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchScorecards = async () => {
        try {
        setLoading(true);
        const response = await apiClient.get('/scorecards');
        setScorecards(response.data.data); // Akses array 'data' dari respons paginasi
        } catch (err) {
        setError('Failed to fetch scorecards.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    fetchScorecards();
    }, []);

    if (loading) return <div>Loading scorecards...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
    <div className={styles.listPage}>
        <h1>Daftar Scorecard</h1>
        
        <div className={styles.tableContainer}>
        <table className={styles.table}>
            <thead>
            <tr>
                <th>Tanggal</th>
                <th>Nama Agent</th>
                <th>Evaluator</th>
                <th>Skor Keseluruhan</th>
                <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {scorecards.length > 0 ? (
                scorecards.map(scorecard => (
                <tr key={scorecard.id}>
                    <td>{new Date(scorecard.scorecard_date).toLocaleDateString('id-ID')}</td>
                    <td>{scorecard.agent?.name || 'N/A'}</td>
                    <td>{scorecard.evaluator?.name || 'N/A'}</td>
                    <td>{scorecard.overall_score || '-'}</td>
                    <td>
                    <div className={styles.actions}>
                        <button className={styles.actionButton}>Lihat</button>
                        <button className={`${styles.actionButton} ${styles.edit}`}>Edit</button>
                        <button className={`${styles.actionButton} ${styles.delete}`}>Hapus</button>
                    </div>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="5">Belum ada data scorecard.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default ScorecardListPage;