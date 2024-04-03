<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Carbon\Carbon;

Route::get('/', function () {
    return Inertia::render('Home', [
        'currentYear' => Carbon::now()->year
    ]);
})->name('home');

Route::get('/shop', [ProductController::class, 'index'])->name('shop');

Route::get('/checkout', [OrderController::class, 'index'])->name('checkout');

Route::get('/order-confirmation', [OrderController::class, 'viewOrderConfirmation'])->name('order-confirmation');
Route::post('/order-confirmation', [OrderController::class, 'createOrder'])->name('send-order');

