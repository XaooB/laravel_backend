<?php

use Faker\Generator as Faker;

$factory->define(App\Surveys::class, function (Faker $faker) {
    return [
        'Topic' => $faker->text(15)
    ];
});
