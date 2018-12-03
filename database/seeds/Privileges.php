<?php

use Illuminate\Database\Seeder;

class Privileges extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Privileges::class, 30)->create();
    }
}
