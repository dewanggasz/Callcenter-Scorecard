import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthProvider';
import styles from './ScorecardListPage.module.scss';

const ScorecardListPage = () => {
  const { user } = useAuth(); // Dapatkan data user yang sedang login
  const [scorecards, setScorecards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk modal konfirmasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scorecardToDelete, setScorecardToDelete] = useState(null);

  // Tentukan apakah user adalah admin (SPV atau TL)
  const isAdmin = user && (user.role.name === 'SPV' || user.role.name === 'TL');

  useEffect(() => {
    const fetchScorecards = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/scorecards');
            // Akses array 'data' dari respons paginasi Laravel
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

  // Fungsi untuk membuka modal konfirmasi
  const openDeleteModal = (id) => {
    setScorecardToDelete(id);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeDeleteModal = () => {
    setScorecardToDelete(null);
    setIsModalOpen(false);
  };

  // Fungsi untuk mengkonfirmasi dan menjalankan proses hapus
  const handleConfirmDelete = async () => {
    if (!scorecardToDelete) return;

    try {
      // Kirim request DELETE ke API
      await apiClient.delete(`/scorecards/${scorecardToDelete}`);
      
      // Update UI dengan menghapus item dari state, tanpa perlu refresh halaman
      setScorecards(prevScorecards => 
        prevScorecards.filter(s => s.id !== scorecardToDelete)
      );
    } catch (err) {
      setError('Gagal menghapus scorecard. Silakan coba lagi.');
      console.error(err);
    } finally {
      // Tutup modal setelah selesai
      closeDeleteModal();
    }
  };

  if (loading) return <div>Memuat data scorecard...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      {/* Komponen Modal yang hanya akan tampil jika isModalOpen bernilai true */}
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