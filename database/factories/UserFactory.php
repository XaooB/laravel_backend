<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'Login' => $faker->unique()->name,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'Email' => $faker->unique()->safeEmail,
        'Image' => 'www.image.com',
        'idPrivilege' => $faker->numberBetween(1, 90),
        'idStatus' => $faker->numberBetween(1, 90),
        'remember_token' => str_random(10),
    ];
});
