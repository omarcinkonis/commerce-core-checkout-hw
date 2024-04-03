<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Adress;
use App\Models\CreditCard;
use App\Models\Order;
use App\Jobs\ProcessEmail;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
   public function index(Request $request): Response {
      return Inertia::render('Checkout');
   }
   /*
    * Takes in product order and form input values, validates input values, populates database tables and send out an email with all order data  
   */
   public function createOrder(Request $request) {
      
      $requestData = json_decode($request->data, true); //makes an associative array

      $validator = Validator::make($requestData, [
         'firstName' => 'required|string|max:20|regex:/^[a-zA-ZČčĘęĖėĮįŠšŲųŪūŽž]+$/',
         'lastName' => 'required|string|max:20|regex:/^[a-zA-ZČčĘęĖėĮįŠšŲųŪūŽž]+$/',
         'streetAddress' => 'required|string|max:255|regex:/^[a-zA-ZČčĘęĖėĮįŠšŲųŪūŽž0-9\s\-\.\,]+$/',
         'country' => 'required|string|max:255',
         'region' => 'required|string|max:255',
         'postalCode' => 'required|string|max:5|regex:/^\d+$/',
         'cardNumber' => 'string|max:16|regex:/^\d+$/',
         'expirationMonth '=> 'string|max:2|regex:/^\d+$/',
         'expirationYear' => 'string|max:2|regex:/^\d+$/',
         'cvv' => 'string|max:3|regex:/^\d+$/',
      ]);

      if ($validator->fails()) {
         return response()->json(['error' => $validator->errors()], 422);
     }
      
      $order = json_decode($request->data); //makes an object

      $user = User::create([
         'first_name' => $order->firstName,
         'last_name' => $order->lastName,
      ]);

      Adress::create([
         'user_id' => $user->id,
         'street_address' => $order->streetAddress,
         'country' => $order->country,
         'region_or_state' => $order->region,
         'postal_code' => $order->postalCode,
      ]);

      CreditCard::create([
         'user_id' => $user->id,
         'card_number' => $order->cardNumber,
         'expiration_date' => $order->expirationMonth. '/'.$order->expirationYear,
         'cvv' => $order->cvv,
      ]);

      foreach($order->order as $item) {
         Order::create([
            'user_id' => $user->id,
            'product_id' => $item->itemId,
            'quantity' => $item->quantity,
            ]);
      }

      ProcessEmail::dispatch($user->id)->delay(now()->addMinutes(5));
   }

   public function viewOrderConfirmation(Request $request): Response {

      return Inertia::render('OrderConfirmation');
   }
}
