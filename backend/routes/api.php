<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiseaseController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeatherController;
use App\Http\Controllers\WorldBankController;

// api routes
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', [AuthController::class, 'register']);
// Route::get('/weather/{city}', [App\Http\Controllers\WeatherController::class, 'getWeather']);
// Route::post('/preferences', [App\Http\Controllers\PreferenceController::class, 'save']);
// Route::put('/profile', [App\Http\Controllers\UserController::class, 'updateProfile']);
// Route::get('/worldbank/{countryCode}/{indicator}', [WorldBankController::class, 'getEconomicData']);
// Route::get('/covid/global', [DiseaseController::class, 'getGlobalCovidData']);

// Route::get('/users', [UserController::class, 'index']);
// Route::get('/users/{id}', [UserController::class, 'show']);
// Route::put('/users/{id}', [UserController::class, 'update']);
// Route::delete('/users/{id}', [UserController::class, 'destroy']);
// Route::get('/system/status', [SystemController::class, 'status']);
// Route::get('/health/check', [HealthController::class, 'check']);


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');


// Rotas protegidas (exemplo: admin)
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::get('/system/status', [SystemController::class, 'status']);
    Route::get('/health/check', [HealthController::class, 'check']);
});

// Outras rotas públicas
Route::get('/weather/{city}', [WeatherController::class, 'getWeather']);
Route::get('/worldbank/{countryCode}/{indicator}', [WorldBankController::class, 'getEconomicData']);
Route::get('/covid/global', [DiseaseController::class, 'getGlobalCovidData']);