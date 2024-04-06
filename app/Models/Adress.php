<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Address, not adress
class Adress extends Model
{
    // you're using HasFactory, although your models don't have factories
    // read: https://laravel.com/docs/10.x/eloquent-factories#defining-model-factories
    use HasFactory;

    protected $fillable = [
        'user_id',
        'street_address',
        'country',
        'region_or_state',
        'postal_code',
    ];

    // do you really need these casts?
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
