<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SystemController extends Controller {
    public function status() {
        $status = [
            'database' => $this->checkDatabase(),
            'server_time' => now()->toDateTimeString(),
            'memory_usage' => memory_get_usage(true) / 1024 / 1024 . ' MB',
        ];
        return response()->json($status);
    }

    private function checkDatabase() {
        try {
            DB::connection()->getPdo();
            return 'Connected';
        } catch (\Exception $e) {
            return 'Disconnected: ' . $e->getMessage();
        }
    }
}