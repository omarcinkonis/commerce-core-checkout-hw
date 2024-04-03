<?php 

$jsonData = json_decode($orderData, true);

echo "Thank you for your order. Here are the order details:\n\n";

echo "Customer details:\n";
echo 'First name: ' . $jsonData["firstName"] . '; Last name: ' . $jsonData["lastName"] . ";\n\n";

echo "Shipping details:\n";
echo 'Street Address: ' . $jsonData["address"]["streetAddress"] . ";\n";
echo 'Country: ' . $jsonData["address"]["country"] . ";\n";
echo 'Region or state: ' . $jsonData["address"]["regionOrState"] . ";\n";
echo 'Postal code: ' . $jsonData["address"]["postalCode"] . ";\n\n";

echo "Payment details:\n";
echo 'Card number: ' . $jsonData["paymentOption"]["cardNumber"] . ";\n";
echo 'Expiration date: ' . $jsonData["paymentOption"]["expirationDate"] . ";\n";
echo 'CVV: ' . $jsonData["paymentOption"]["cvv"] . ";\n\n";

echo "Ordered products:\n";
foreach($jsonData["order"] as $order) {
    if (!is_array($order)) {
        continue;
    }
    echo "Product name: " . $order["name"] . ";\n";
    echo "Price: " . $order["price"] . ";\n";
    echo "Image: " . $order["image"] . ";\n";
    echo "Quantity: " . $order["quantity"] . ";\n\n";
}
echo "Total price: " . $jsonData["order"]["totalPrice"] . ".";
echo "\n\n";
