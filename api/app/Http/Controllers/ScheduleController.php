<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
{
    public function index()
    {
        return Schedule::all();
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sala' => 'required|max:255',
            'fecha_inicial' => 'required',
            'fecha_final' => 'required',
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $schedule = Schedule::create([
            'sala' => $request->sala,
            'fecha_inicial' => $request->fecha_inicial,
            'fecha_final' => $request->fecha_final,
        ]);
    }

    public function update(Request $request)
    {
        Schedule::where('id', $request->id)
            ->update(['sala' => $request->sala, 'fecha_inicial' => $request->fecha_inicial, 'fecha_final' => $request->fecha_final]);
    }

    public function destroy(Request $request)
    {
        $schedule = Schedule::destroy($request->id);
        return $schedule;
    }
}
