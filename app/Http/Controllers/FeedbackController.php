<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\FeedbackStoreRequest;
use App\Models\Feedback;

class FeedbackController extends Controller
{	
	/**
	 * Shows list of feedbacks
	 *
	 * @return Response
	 * 
	 */
	public function index(): Response
	{
		return Inertia::render('Feedback', [
			'feedbacks' => Feedback::orderBy('updated_at', 'DESC')->get(),
		]);
	}
    
    /**
     * Stores a feedback
     *
     * @param FeedbackStoreRequest $request
     * 
     * @return void
     * 
     */
    public function store(FeedbackStoreRequest $request): void
    {
		Feedback::create($request->validated());
    }
	
	/**
	 * Deletes a feedback
	 *
	 * @param mixed $id
	 * 
	 * @return void
	 * 
	 */
	public function destroy($id): void
	{
		Feedback::find($id)->delete();
	}
}
