<?php

namespace App\Http\Controllers;

use App\Models\Preference;
use Illuminate\Http\Request;

class PreferenceController extends Controller
{
    public function save(Request $request)
    {
        $preference = Preference::updateOrCreate(
            ['user_id' => $request->user_id],
            ['dashboard_config' => $request->dashboard_config]
        );
        return response()->json($preference);
    }
}