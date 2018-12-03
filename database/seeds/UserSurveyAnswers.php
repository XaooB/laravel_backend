<?php

use Illuminate\Database\Seeder;

class UserSurveyAnswers extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\UserSurveyAnswers::class, 30)->create();
    }
}
