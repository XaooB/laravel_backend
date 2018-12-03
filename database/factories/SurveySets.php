<?php

use Faker\Generator as Faker;

$factory->define(App\SurveySets::class, function (Faker $faker) {
    return [
        'idSurvey' => $faker->numberBetween(1, 10),
        'Answer' => $faker->text(15)
    ];
});