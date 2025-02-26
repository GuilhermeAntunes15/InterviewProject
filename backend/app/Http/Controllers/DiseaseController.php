<?php

namespace App\Http\Controllers;

use App\Services\DiseaseService;

class DiseaseController extends Controller {
    protected $diseaseService;

    public function __construct(DiseaseService $diseaseService) {
        $this->diseaseService = $diseaseService;
    }

    public function getGlobalCovidData() {
        $data = $this->diseaseService->getGlobalCovidData();
        return response()->json($data);
    }
}