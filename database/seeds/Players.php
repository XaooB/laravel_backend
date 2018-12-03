<?php

use Illuminate\Database\Seeder;

class Players extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Players::class, 30)->create();
    }
}
