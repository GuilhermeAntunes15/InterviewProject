<?php 

namespace App\Http\Controllers;

use App\Services\WeatherService;
use App\Services\WorldBankService;
use App\Services\DiseaseService;

class HealthController extends Controller {
    protected $weatherService;
    protected $worldBankService;
    protected $diseaseService;

    public function __construct(
        WeatherService $weatherService,
        WorldBankService $worldBankService,
        DiseaseService $diseaseService
    ) {
        $this->weatherService = $weatherService;
        $this->worldBankService = $worldBankService;
        $this->diseaseService = $diseaseService;
    }

    public function check() {
        $health = [
            'weather_api' => $this->checkWeatherApi(),
            'worldbank_api' => $this->checkWorldBankApi(),
            'disease_api' => $this->checkDiseaseApi(),
        ];
        return response()->json($health);
    }

    private function checkWeatherApi() {
        try {
            $data = $this->weatherService->getWeather('London');
            return $data['cod'] === 200 ? 'Healthy' : 'Unhealthy';
        } catch (\Exception $e) {
            return 'Unhealthy: ' . $e->getMessage();
        }
    }

    private function checkWorldBankApi() {
        try {
            $data = $this->worldBankService->getEconomicData('USA', 'NY.GDP.MKTP.CD');
            return isset($data[1]) ? 'Healthy' : 'Unhealthy';
        } catch (\Exception $e) {
            return 'Unhealthy: ' . $e->getMessage();
        }
    }

    private function checkDiseaseApi() {
        try {
            $data = $this->diseaseService->getGlobalCovidData();
            return isset($data['cases']) ? 'Healthy' : 'Unhealthy';
        } catch (\Exception $e) {
            return 'Unhealthy: ' . $e->getMessage();
        }
    }
}