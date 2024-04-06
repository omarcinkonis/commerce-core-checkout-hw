<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // model table names must be plural
        // some Laravel functionality will not work due to missing 's' at the end
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('price');
            $table->string('image');
            $table->timestamps();
        });

        // do not seed in migrations, seeding is not a responsibility of migration
        // use seeder https://laravel.com/docs/11.x/seeding
        DB::table('product')->insert([
            ['name' => 'CoreProduct', 'price' => 39.99, 'image' => 'assets/core-product.png'],
            ['name' => 'Extra CoreProduct', 'price' => 9.99, 'image' => 'assets/extra-core-product.png'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
