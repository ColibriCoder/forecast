<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Forecast;
use App\Models\Media;
use App\Http\Requests\ForecastsUpdateRequest;

class ForecastsController extends Controller
{	
	/**
	 * Shows list of forecasts
	 *
	 * @return Response
	 * 
	 */
	public function index(): Response
	{
		$forecasts = Forecast::query()
			->withAvg('feedbacks', 'rating')
			->withCasts(['feedbacks_avg_rating' => 'decimal:2'])
			->orderBy('id', 'DESC')->get();

		return Inertia::render('Forecasts', [
			'forecasts' => $forecasts,
			'forecast_icons' => Media::where('type', 'forecast_image')->get()
		]);
	}
	
	/**
	 * Shows a single forecast
	 *
	 * @return Response
	 * 
	 */
	public function show(): Response
    {
		return Inertia::render('Dashboard', [
			'forecastData' => Forecast::where('date', date('Y-m-d'))->with('media')->first()
		]);
    }
	
	/**
	 * [Description for forecastByDate]
	 *
	 * @param string $date
	 * 
	 * @return JsonResponse
	 * 
	 */
	public function forecastByDate(string $date): JsonResponse
	{
		return response()->json(Forecast::where('date', $date)->with('media')->first());
	}
	
	/**
	 * Updates forecasts table
	 *
	 * @param ForecastsUpdateRequest $request
	 * 
	 * @return void
	 * 
	 */
	public function editData(ForecastsUpdateRequest $request): void
	{
		$data = $request->safe();

		if (!empty($data['delete']) && is_array($data['delete'])) {
			Forecast::whereIn('id', $data['delete'])->delete();
		}

		if (!empty($data['add']) && is_array($data['add'])) {
			Forecast::insert($data['add']);
		}

		if (!empty($data['update']) && is_array($data['update'])) {
			foreach($data['update'] as $forecast) {
				Forecast::where('id', $forecast['id'])->update($forecast);
			}
		}
	}
}
