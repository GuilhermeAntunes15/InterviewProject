<?php

namespace App\Services;

class WeatherService
{
    public function getWeather($city)
    {
        $apiKey = env('OPENWEATHERMAP_API_KEY');
        $url = "http://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}";
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
}