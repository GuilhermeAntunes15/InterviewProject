<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Admin {
    public function handle(Request $request, Closure $next) {
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }
        return response()->json(['message' => 'Acesso negado. Apenas administradores.'], 403);
    }
}