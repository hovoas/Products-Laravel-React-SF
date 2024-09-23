<?php

use Inertia\Inertia;

use App\Http\Controllers\ProductsController;


Route::get('/', [ProductsController::class, 'index'])->name('products.index');