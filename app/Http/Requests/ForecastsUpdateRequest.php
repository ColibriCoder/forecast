<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ForecastsUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
			'update' => 'array',
			'update.*.id' => 'numeric',
			'update.*.date' => 'string|nullable',
			'update.*.temperature' => 'numeric|required',
			'update.*.sunshine_percentage' => 'numeric|nullable',
			'update.*.cloudiness_percentage' => 'numeric|nullable',
			'update.*.rainfall_percentage' => 'numeric|nullable',
			'update.*.snowfall_percentage' => 'numeric|nullable',
			'update.*.thunderstorms_percentage' => 'numeric|nullable',
			'update.*.icon_media_id' => 'numeric|nullable',
			'add' => 'array',
			'add.*.date' => 'string|nullable',
			'add.*.temperature' => 'numeric|nullable',
			'add.*.sunshine_percentage' => 'numeric|nullable',
			'add.*.cloudiness_percentage' => 'numeric|nullable',
			'add.*.rainfall_percentage' => 'numeric|nullable',
			'add.*.snowfall_percentage' => 'numeric|nullable',
			'add.*.thunderstorms_percentage' => 'numeric|nullable',
			'add.*.icon_media_id' => 'numeric|nullable',
			'delete' => 'array',
			'delete.*' => 'int'
        ];
    }
}
