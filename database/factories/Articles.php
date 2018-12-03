<?php

use Faker\Generator as Faker;

$factory->define(App\Articles::class, function (Faker $faker) {
    return [
        'idCategory' => $faker->numberBetween(1, 20),
        'idUser' => $faker->numberBetween(2, 2),
        'Title' => $faker->title,
        'Image' => 'www.image.com',
        'Content' => $faker->paragraph,
		'Views' => $faker->numberBetween(10, 1000000000)
    ];
});
