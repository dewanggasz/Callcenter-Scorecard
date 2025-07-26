// File: frontend/src/pages/EditScorecard.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import styles from './CreateScorecard.module.scss'; // Kita bisa gunakan style yang sama
import Card from '../components/ui/Card';

const EditScorecard = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

  // State
  const [agents, setAgents] = useState([]);
  const [formState, setFormState] = useState({
    agent_id: '',
    scorecard_date: '',
    notes: '',
    details: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Mengambil data master dan data scorecard yang akan diedit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, scorecardRes] = await Promise.all([
          apiClient.get('/users/agents'),
          apiClient.get(`/scorecards/${id}`)
        ]);

        setAgents(agentsRes.data);
        
        // Isi form dengan data yang ada
        const scorecardData = scorecardRes.data;
        setFormState({
          agent_id: scorecardData.agent_id,
          scorecard_date: scorecardData.scorecard_date,
          notes: scorecardData.notes || '',
          details: scorecardData.details.map(d => ({
            kpi_id: d.kpi_id,
            name: d.kpi.name,
            value: d.value,
            score: d.score
          }))
        });

      } catch (err) {
        setError('Gagal memuat data untuk diedit.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDetailChange = (kpi_id, field, value) => {
    setFormState(prevState => ({
      ...prevState,
      details: prevState.details.map(detail =>
        detail.kpi_id === kpi_id ? { ...detail, [field]: value } : detail
      )
    }));
  };

  const handleFormChange = (e) => {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      agent_id: formState.agent_id,
      scorecard_date: formState.scorecard_date,
      notes: formState.notes,
      details: formState.details.map(({ kpi_id, value, score }) => ({ kpi_id, value, score })),
    };

    try {
      await apiClient.put(`/scorecards/${id}`, payload);
      navigate('/scorecards'); // Kembali ke daftar scorecard
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui scorecard.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Memuat form edit...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.createScorecard}>
      <h1>Edit Scorecard</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="agent_id">Pilih Agen</label>
              <select id="agent_id" name="agent_id" value={formState.agent_id} onChange={handleFormChange} required>
                <option value="" disabled>-- Pilih seorang agen --</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="scorecard_date">Tanggal Scorecard</label>
              <input type="date" id="scorecard_date" name="scorecard_date" value={formState.scorecard_date} onChange={handleFormChange} required />
            </div>
          </div>
        </Card>

        <h2 className={styles.kpiHeader}>Detail KPI</h2>
        <div className={styles.kpiGrid}>
          {formState.details.map(detail => (
            <Card key={detail.kpi_id}>
              <div className={styles.kpiItem}>
                <label>{detail.name}</label>
                <div className={styles.kpiInputs}>
                  <input 
                    type="text" 
                    placeholder="Nilai" 
                    value={detail.value}
                    onChange={(e) => handleDetailChange(detail.kpi_id, 'value', e.target.value)}
                    required
                  />
                  <input 
                    type="number" 
                    placeholder="Skor" 
                    min="0"
                    max="100"
                    step="0.1"
                    value={detail.score}
                    onChange={(e) => handleDetailChange(detail.kpi_id, 'score', e.target.value)}
                    required
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <h2 className={styles.kpiHeader}>Catatan Tambahan</h2>
        <Card>
          <textarea 
            className={styles.notes}
            name="notes"
            placeholder="Tambahkan catatan relevan di sini..."
            value={formState.notes}
            onChange={handleFormChange}
          />
        </Card>

        {error && <p className={styles.error}>{error}</p>}
        
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditScorecard;
