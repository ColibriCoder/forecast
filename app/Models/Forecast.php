<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Forecast extends Model
{
    use HasFactory;

	/* The attributes that are mass assignable.
	*
	* @var array<int, string>
	*/
	protected $fillable = [
        'date',
        'temperature',
		'sunshine_percentage',
		'cloudiness_percentage',
		'rainfall_percentage',
		'snowfall_percentage',
		'thunderstorms_percentage',
		'icon_media_id'
    ];

	public function media(): HasOne
	{
		return $this->hasOne(Media::class, 'id', 'icon_media_id');
	}

	public function feedbacks(): HasMany
	{
		return $this->hasMany(Feedback::class, 'date', 'date');
	}
}