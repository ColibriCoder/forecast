<?php

use App\Http\Controllers\ForecastsController;
use App\Http\Controllers\FeedbackController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__.'/auth.php';


Route::middleware(['auth', 'verified'])->group(function () {
	Route::middleware('is_admin')->group(function () {
		Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback');
		Route::delete('/feedback/{id}', [FeedbackController::class, 'destroy']);
		Route::post('/feedback', [FeedbackController::class, 'store']);
		Route::get('/forecasts', [ForecastsController::class, 'index'])->name('forecasts');
		Route::post('/forecasts', [ForecastsController::class, 'editData']);
	});
	Route::get('/', [ForecastsController::class, 'show'])->name('dashboard');
	Route::get('/{date}', [ForecastsController::class, 'forecastByDate']);
});