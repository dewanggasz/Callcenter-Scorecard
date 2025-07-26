<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Scorecards</title>
    <style>
        body {
            font-family: 'Helvetica', sans-serif;
            font-size: 12px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .table th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h2>Laporan Scorecard</h2>
    <table class="table">
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Nama Agent</th>
                <th>Evaluator</th>
                <th>Skor Keseluruhan</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($scorecards as $scorecard)
                <tr>
                    <td>{{ \Carbon\Carbon::parse($scorecard->scorecard_date)->format('d M Y') }}</td>
                    <td>{{ $scorecard->agent->name ?? 'N/A' }}</td>
                    <td>{{ $scorecard->evaluator->name ?? 'N/A' }}</td>
                    <td>{{ $scorecard->overall_score ?? '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
