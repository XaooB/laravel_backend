<?php

use Illuminate\Database\Seeder;

class Surveys extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Surveys::class, 10)->create();
    }
}
