// File: frontend/src/pages/ScorecardListPage.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Impor Link
import apiClient from '../services/api';
import Modal from '../components/ui/Modal';
import styles from './ScorecardListPage.module.scss';

const ScorecardListPage = () => {
  const [scorecards, setScorecards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scorecardToDelete, setScorecardToDelete] = useState(null);

  useEffect(() => {
    const fetchScorecards = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/scorecards');
        setScorecards(response.data.data);
      } catch (err) {
        setError('Gagal mengambil data scorecard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScorecards();
  }, []);

  const openDeleteModal = (id) => {
    setScorecardToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setScorecardToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!scorecardToDelete) return;

    try {
      await apiClient.delete(`/scorecards/${scorecardToDelete}`);
      setScorecards(prevScorecards => 
        prevScorecards.filter(s => s.id !== scorecardToDelete)
      );
    } catch (err) {
      setError('Gagal menghapus scorecard.');
      console.error(err);
    } finally {
      closeDeleteModal();
    }
  };

  if (loading) return <div>Memuat data scorecard...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
      >
        <p>Apakah Anda yakin ingin menghapus scorecard ini? Tindakan ini tidak dapat dibatalkan.</p>
      </Modal>

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
                        <Link to={`/scorecards/${scorecard.id}/edit`} className={`${styles.actionButton} ${styles.edit}`}>
                          Edit
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(scorecard.id)}
                          className={`${styles.actionButton} ${styles.delete}`}
                        >
                          Hapus
                        </button>
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
    </>
  );
};

export default ScorecardListPage;
