<?php

use Faker\Generator as Faker;

$factory->define(App\Privileges::class, function (Faker $faker) {
    return [
        'Name' => $faker->text(15)
    ];
});
