<?php

use Illuminate\Database\Seeder;

class SurveySets extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\SurveySets::class, 30)->create();
    }
}
