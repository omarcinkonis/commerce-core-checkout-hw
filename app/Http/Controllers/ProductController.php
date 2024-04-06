<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\View\View; // unused
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
        // non-standard approach, you should not be performing selects this way
        // I'm guessing you tried to use the standard approach, but it didn't work
        // it didn't work because your table is 'product', not 'products' and Laravel couldn't find it
        $products = DB::select('select * from product');
        $currentDate = Carbon::now()->year;

        return Inertia::render('Shop', [
            'products' => $products,
            'currentDate' => $currentDate,
        ]);
    }
}
