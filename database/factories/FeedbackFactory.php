<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Forecast;

class FeedbackFactory extends Factory
{
	/**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
			'date' => fake()->randomElement(Forecast::whereNotNull('date')->get()->toArray())['date'],
			'rating' => fake()->optional()->numberBetween(0, 5),
			'feedback' => fake()->optional()->sentence(3)
        ];
    }
}