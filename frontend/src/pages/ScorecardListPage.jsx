import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthProvider';
import styles from './ScorecardListPage.module.scss';

const ScorecardListPage = () => {
  const { user } = useAuth();
  const [scorecards, setScorecards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scorecardToDelete, setScorecardToDelete] = useState(null);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const isAdmin = user && (user.role.name === 'SPV' || user.role.name === 'TL');

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

  const handleExport = async (format) => {
    const isPdf = format === 'pdf';
    if (isPdf) setIsExportingPdf(true);
    else setIsExportingExcel(true);

    try {
      const response = await apiClient.get(`/export/${format}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `scorecards-${new Date().toISOString().split('T')[0]}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError('Gagal mengekspor data.');
      console.error(err);
    } finally {
      if (isPdf) setIsExportingPdf(false);
      else setIsExportingExcel(false);
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
        <div className={styles.header}>
          <h1>Daftar Scorecard</h1>
          {isAdmin && (
            <div className={styles.exportActions}>
              <button 
                className={styles.exportButton} 
                onClick={() => handleExport('excel')}
                disabled={isExportingExcel}
              >
                {isExportingExcel ? 'Mengekspor...' : 'Export ke Excel'}
              </button>
              <button 
                className={`${styles.exportButton} ${styles.pdfButton}`}
                onClick={() => handleExport('pdf')}
                disabled={isExportingPdf}
              >
                {isExportingPdf ? 'Mengekspor...' : 'Export ke PDF'}
              </button>
            </div>
          )}
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Nama Agent</th>
                <th>Evaluator</th>
                <th>Skor Keseluruhan</th>
                {isAdmin && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {scorecards.length > 0 ? (
                scorecards.map(scorecard => (
                  <tr key={scorecard.id}>
                    <td>{new Date(scorecard.scorecard_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td>{scorecard.agent?.name || 'N/A'}</td>
                    <td>{scorecard.evaluator?.name || 'N/A'}</td>
                    <td>{scorecard.overall_score || '-'}</td>
                    {isAdmin && (
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
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? "5" : "4"}>Belum ada data scorecard.</td>
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