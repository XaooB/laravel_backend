<?php

use Faker\Generator as Faker;

$factory->define(App\UserSurveyAnswers::class, function (Faker $faker) {
    return [
    	'idSurveySet' => $faker->numberBetween(1, 90),
        'idUser' => $faker->numberBetween(1, 90),
    ];
});