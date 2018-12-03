<?php

use Faker\Generator as Faker;

$factory->define(App\Players::class, function (Faker $faker) {
    return [
        'Name' => $faker->firstName,
        'Surname' => $faker->lastName,
        'Image' => 'www.image.com',
        'Position' => $faker->text(15),
        'Number' => $faker->numberBetween(1, 30),
    ];
});
