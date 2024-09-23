<?php

namespace App\Http\Controllers;

use App\Services\ProductsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    protected $productService;

    public function __construct(ProductsService $productsService)
    {
        $this->productsService = $productsService;
    }

    public function index(Request $request)
    {
        $search = $request->input('search');

        try {
            $products = $this->productsService->fetchProducts($search);
        } catch (\Exception $e) {
            return Inertia::render('Error', ['message' => 'Failed to retrieve products.']);
        }

        return Inertia::render('Products', [
            'products' => $products,
            'search' => $search,
        ]);
    }
}

