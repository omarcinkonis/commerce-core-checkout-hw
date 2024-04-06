<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id'); // $table->id();

            // check your database, foreign id was not added
            // you must use $table->id(); in create_users_table
            // then use constrained() after foreignId()
            //
            // when you use foreign ids, you should specify what happens on delete, for example:
            // $table->foreignId('user_id')->constrained('users')->nullOnDelete();
            // you will get constraint violation error when related user is deleted without onDelete()
            $table->foreignId('user_id');
            $table->foreignId('product_id');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
