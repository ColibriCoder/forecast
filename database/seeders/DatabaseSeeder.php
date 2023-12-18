<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Media;
use App\Models\Feedback;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
		Media::insert([
			'title' => 'Perkūnija',
			'name' => 'thunderstorm',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Perkūnija su lietumi',
			'name' => 'thunderstorm_rain',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Sninga',
			'name' => 'snowfall',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Saulėta',
			'name' => 'sunny',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Debesuota su pragiedruliais',
			'name' => 'sunny_cloudy',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Debesuota su pragiedruliais 2',
			'name' => 'sunny_cloudy_2',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Saulėta lietinga',
			'name' => 'sunny_rainy',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		Media::insert([
			'title' => 'Saulėta lietinga 2',
			'name' => 'sunny_rainy_2',
			'type' => 'forecast_image',
			'path' => '/storage',
			'extention' => 'svg'
		]);
		
        \App\Models\Forecast::factory(10)->create();

		\App\Models\Feedback::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'a@dm.in',
			'password' => '$2y$10$HhuCpmf3ldjiDhSJFx7Eteo64lb6s5Z2zY5wy7s4sz2atPyPQt1Sm',
			'is_admin' => 1
        ]);

		User::factory()->create([
            'name' => 'Vartotojas',
            'email' => 'vart@oto.jas',
			'password' => '$2y$10$yaPMziO1OQDCDP1y4Isw9uDcAKOXPw0p0pX66WS.FfmLACfRvxWpC'
        ]);


    }
}
