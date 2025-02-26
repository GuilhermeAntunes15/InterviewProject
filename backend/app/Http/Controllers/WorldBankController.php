<?php

namespace App\Http\Controllers;

use App\Services\WorldBankService;

class WorldBankController extends Controller {
    protected $worldBankService;

    public function __construct(WorldBankService $worldBankService) {
        $this->worldBankService = $worldBankService;
    }

    public function getEconomicData($countryCode, $indicator) {
        $data = $this->worldBankService->getEconomicData($countryCode, $indicator);
        return response()->json($data);
    }
}