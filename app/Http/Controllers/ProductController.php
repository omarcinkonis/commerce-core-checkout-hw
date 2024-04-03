<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /*
     * Renders Shop view with product data  
    */
    public function index(Request $request): Response
    {
        $products = DB::select('select * from product');
        $currentDate = Carbon::now()->year;

        return Inertia::render('Shop', [
            'products' => $products,
            'currentDate' => $currentDate,
        ]);
    }
}
