<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ClubsController;

class UpdateClubsCL extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:update_clubs_CL';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aktualizacja klubów ligi UEFA Champions League';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        ClubsController::update_clubs_CL();
        $this->info('pomyslnie zaktualizowano kluby ligi UEFA Champions League!');
    }
}
