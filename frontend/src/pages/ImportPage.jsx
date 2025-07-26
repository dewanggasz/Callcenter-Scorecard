// File: frontend/src/pages/ImportPage.jsx

import { useState } from 'react';
import apiClient from '../services/api';
import styles from './ImportPage.module.scss';
import Card from '../components/ui/Card';

const ImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Silakan pilih file untuk diunggah.');
      return;
    }

    setIsUploading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await apiClient.post('/import/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mengimpor file.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.importPage}>
      <h1>Impor Scorecard dari CSV</h1>
      
      <Card className={styles.instructionCard}>
        <h3>Petunjuk Format File CSV</h3>
        <p>Pastikan file CSV Anda menggunakan koma (,) sebagai pemisah dan memiliki kolom-kolom berikut di baris pertama (heading):</p>
        <ul>
          <li><code>tanggal</code> (format: YYYY-MM-DD)</li>
          <li><code>nama_agent</code> (harus cocok persis dengan nama di sistem)</li>
          <li><code>catatan</code> (opsional)</li>
          <li>Satu kolom untuk setiap <strong>nilai</strong> KPI dengan format <code>nama_kpi</code> (contoh: <code>handled_calls</code>, <code>average_handling_time_(aht)</code>)</li>
          <li>Satu kolom untuk setiap <strong>skor</strong> KPI dengan format <code>skor_nama_kpi</code> (contoh: <code>skor_handled_calls</code>)</li>
        </ul>
      </Card>

      <Card>
        <div className={styles.uploadArea}>
          {/* Menerima file .csv saja */}
          <input type="file" onChange={handleFileChange} accept=".csv" />
          <button onClick={handleUpload} disabled={isUploading || !selectedFile}>
            {isUploading ? 'Mengunggah...' : 'Unggah dan Proses File CSV'}
          </button>
        </div>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </Card>
    </div>
  );
};

export default ImportPage;
