<?php

namespace App\Jobs;

use Illuminate\Support\Facades\DB;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Inertia\Inertia;
use Mail;
use App\Mail\TestEmail;

class ProcessEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    /*
     * Prepares Order data and sends it via email   
    */
    public function handle(): void
    {
      $orders = DB::select('select * from orders where user_id="'. $this->userId . '"');
      $users = DB::select('select * from users where id="'. $this->userId . '"');
      $addresses = DB::select('select * from adresses where user_id="'. $this->userId . '"');
      $credit_cards = DB::select('select * from credit_cards where user_id="'. $this->userId . '"');

      $products = array();
      foreach($orders as $order) {
        $product = DB::select('select * from product where' . ' id=' . $order->product_id);
        array_push($products, [
                "id" => $product[0]->id,
                "name" => $product[0]->name,
                "price" => $product[0]->price,
                "image" => $product[0]->image,
                "quantity" => $order->quantity,
            ]);
      }

     $completeOrder = array(
         "firstName" => $users[0]->first_name,
         "lastName" => $users[0]->last_name,
         "address" => [
            "streetAddress" => $addresses[0]->street_address,
            "country" => $addresses[0]->country,
            "regionOrState" => $addresses[0]->region_or_state,
            "postalCode" => $addresses[0]->postal_code,
         ],
         "paymentOption" => [
            "cardNumber" => $credit_cards[0]->card_number,
            "expirationDate" => $credit_cards[0]->expiration_date,
            "cvv" => $credit_cards[0]->cvv,
         ],
         "order" => [],
     );

     $total = 0;

     foreach($products as $key => $product) {
      $completeOrder["order"][$key] = [
         "id" => $product["id"],
         "name" => $product["name"],
         "price" => $product["price"],
         "image" => $product["image"],
         "quantity" => $product["quantity"],
      ];

      
        $total += $product["quantity"] * $product["price"];
    } 

        $completeOrder["order"]["totalPrice"] = $total;

        $recipient = env('MAIL_TO_ADDRESS');
        Mail::to($recipient)->send(new TestEmail(json_encode($completeOrder)));
    }
}
