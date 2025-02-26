<?php

namespace App\Services;

class DiseaseService {
    public function getGlobalCovidData() {
        $url = "https://disease.sh/v3/covid-19/all";
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
}