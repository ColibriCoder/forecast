<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Media;

class ForecastFactory extends Factory
{
	/**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
			'date' => fake()->unique()->optional()->date('Y-m-d'),
			'temperature' => fake()->optional()->numberBetween(-50, 50),
			'sunshine_percentage' => fake()->optional()->randomElement([0, 50, 100]),
			'cloudiness_percentage' => fake()->optional()->randomElement([0, 50, 100]),
			'rainfall_percentage' => fake()->optional()->randomElement([0, 50, 100]),
			'snowfall_percentage' => fake()->optional()->randomElement([0, 50, 100]),
			'thunderstorms_percentage' => fake()->optional()->randomElement([0, 50, 100]),
			'icon_media_id' => fake()->optional()->randomElement(Media::query()->where('type', 'forecast_image')->get('id'))
        ];
    }
}