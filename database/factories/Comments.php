<?php

use Faker\Generator as Faker;

$factory->define(App\Comments::class, function (Faker $faker) {
    return [
        'idArticle' => $faker->numberBetween(1, 30),
        'idReference' => $faker->numberBetween(0, 50),
        'idUser' => $faker->numberBetween(2, 2),
        'Content' => $faker->paragraph
    ];
});
