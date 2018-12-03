<?php

use Faker\Generator as Faker;

$factory->define(App\InjuriesSuspensions::class, function (Faker $faker) {
    return [
        'idUser' => $faker->numberBetween(2, 2),
        'idPlayer' => $faker->numberBetween(1, 30),
        'Type' => $random = rand(0, 1) ? "injury" : "suspension",
        'Description' => $faker->text,
        'ReturnDate' => $faker->dateTime
    ];
});
