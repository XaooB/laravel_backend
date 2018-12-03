<?php

use Illuminate\Database\Seeder;

class InjuriesSuspensions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\InjuriesSuspensions::class, 30)->create();
    }
}
