<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScorecardRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Hanya user yang terotentikasi yang boleh membuat scorecard
        return true;
    }

    public function rules(): array
    {
        return [
            'agent_id' => 'required|exists:users,id',
            'scorecard_date' => 'required|date',
            'notes' => 'nullable|string',
            'details' => 'required|array',
            'details.*.kpi_id' => 'required|exists:kpis,id',
            'details.*.value' => 'required',
            'details.*.score' => 'required|numeric|min:0|max:100',
        ];
    }
}
