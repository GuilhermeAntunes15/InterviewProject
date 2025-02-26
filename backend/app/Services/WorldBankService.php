<?php 

namespace App\Services;

class WorldBankService {
    public function getEconomicData($countryCode, $indicator) {
        $url = "http://api.worldbank.org/v2/country/{$countryCode}/indicator/{$indicator}?format=json";
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
}