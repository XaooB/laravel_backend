<?php

use Faker\Generator as Faker;

$factory->define(App\Categories::class, function (Faker $faker) {
    return [
        'Name' => $faker->unique()->text(15)
    ];
});
