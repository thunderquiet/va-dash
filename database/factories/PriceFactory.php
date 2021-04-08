<?php

namespace Database\Factories;

use App\Models\Price;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PriceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Price::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'date' => now()
        ];

        // $table->id();
        // $table->timestamp('date');
        // $table->float('open');
        // $table->float('close');
        // $table->float('high');
        // $table->float('low');
        // $table->float('vol');
        // $table->float('adj_close');
        // $table->float('div');
        // $table->float('split');

    }
}
