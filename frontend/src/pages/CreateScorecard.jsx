import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import styles from './CreateScorecard.module.scss';
import Card from '../components/ui/Card';

const CreateScorecard = () => {
    // State untuk master data
    const [agents, setAgents] = useState([]);
    const [kpis, setKpis] = useState([]);

    // State untuk form
    const [selectedAgent, setSelectedAgent] = useState('');
    const [scorecardDate, setScorecardDate] = useState(new Date().toISOString().split('T')[0]);
    const [details, setDetails] = useState([]);
    const [notes, setNotes] = useState('');

    // State untuk UI
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    // Mengambil data master (agents & kpis) saat komponen dimuat
    useEffect(() => {
    const fetchMasterData = async () => {
        try {
        const [agentsRes, kpisRes] = await Promise.all([
            apiClient.get('/users/agents'),
            apiClient.get('/kpis'),
        ]);
        
        setAgents(agentsRes.data);
        setKpis(kpisRes.data);

        // Inisialisasi state 'details' berdasarkan data KPI yang diterima
        const initialDetails = kpisRes.data.map(kpi => ({
            kpi_id: kpi.id,
            name: kpi.name, // Simpan nama untuk ditampilkan di UI
            value: '',
            score: ''
        }));
        setDetails(initialDetails);

        } catch (err) {
        setError('Failed to load required data. Please refresh the page.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    fetchMasterData();
    }, []);

    // Handler untuk mengubah nilai di dalam form details
    const handleDetailChange = (kpi_id, field, value) => {
    setDetails(prevDetails => 
        prevDetails.map(detail => 
        detail.kpi_id === kpi_id ? { ...detail, [field]: value } : detail
        )
    );
    };

    // Handler untuk submit form
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAgent) {
        setError('Please select an agent.');
        return;
    }
    
    setSubmitting(true);
    setError('');

    const payload = {
        agent_id: selectedAgent,
        scorecard_date: scorecardDate,
        notes: notes,
        details: details.map(({ kpi_id, value, score }) => ({ kpi_id, value, score })),
    };

    try {
        await apiClient.post('/scorecards', payload);
        // Jika berhasil, arahkan ke halaman lain (misalnya daftar scorecard)
        navigate('/dashboard'); // Untuk sementara, kembali ke dashboard
    } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while submitting the scorecard.');
        console.error(err);
    } finally {
        setSubmitting(false);
    }
    };

    if (loading) return <div>Loading form...</div>;
    if (error && !agents.length) return <div className={styles.error}>{error}</div>;

    return (
    <div className={styles.createScorecard}>
        <h1>Create New Scorecard</h1>
        <form onSubmit={handleSubmit}>
        <Card>
            <div className={styles.formGrid}>
            {/* Agent Selection */}
            <div className={styles.formGroup}>
                <label htmlFor="agent">Select Agent</label>
                <select id="agent" value={selectedAgent} onChange={(e) => setSelectedAgent(e.target.value)} required>
                <option value="" disabled>-- Choose an agent --</option>
                {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                ))}
                </select>
            </div>

            {/* Date Selection */}
            <div className={styles.formGroup}>
                <label htmlFor="date">Scorecard Date</label>
                <input type="date" id="date" value={scorecardDate} onChange={(e) => setScorecardDate(e.target.value)} required />
            </div>
            </div>
        </Card>

        <h2 className={styles.kpiHeader}>KPI Details</h2>
        <div className={styles.kpiGrid}>
            {details.map(detail => (
            <Card key={detail.kpi_id}>
                <div className={styles.kpiItem}>
                <label>{detail.name}</label>
                <div className={styles.kpiInputs}>
                    <input 
                    type="text" 
                    placeholder="Value" 
                    value={detail.value}
                    onChange={(e) => handleDetailChange(detail.kpi_id, 'value', e.target.value)}
                    required
                    />
                    <input 
                    type="number" 
                    placeholder="Score" 
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
        
        <h2 className={styles.kpiHeader}>Additional Notes</h2>
        <Card>
            <textarea 
            className={styles.notes}
            placeholder="Add any relevant notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            />
        </Card>

        {error && <p className={styles.error}>{error}</p>}
        
        <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitButton} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Scorecard'}
            </button>
        </div>
        </form>
    </div>
    );
};

export default CreateScorecard;