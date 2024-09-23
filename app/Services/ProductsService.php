<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Config;

class ProductsService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = Config::get('services.dummyApi.url');
    }

    /**
     * Fetch products from the third-party API using query parameter 'q' for search.
     *
     * @param string|null $search
     * @return array
     */
    public function fetchProducts($search = null)
    {
        $url = "{$this->baseUrl}";
        $params = [];

        // If search is provided, pass it as the query param 'q'
        if ($search) {
            $params['q'] = $search;
        }
        $params['limit'] = 0;

        $response = Http::get($url, $params);

        if ($response->failed()) {
            throw new \Exception('Failed to fetch products from the API.');
        }

        return $response->json()['products'];
    }
}
