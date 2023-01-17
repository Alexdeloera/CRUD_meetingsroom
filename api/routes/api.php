<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScheduleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('updateMeeting', [ScheduleController::class, 'update']);
Route::post('deleteMeeting', [ScheduleController::class, 'destroy']);
Route::post('showMeetings', [ScheduleController::class, 'index']);
Route::post('addMeeting', [ScheduleController::class, 'create']);
