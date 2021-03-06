<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LeagueScoreboardController;

class UpdateLeagueScoreboardCL extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:update_league_scoreboard_CL';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aktualizacja tabeli ligowej UEFA Champions League';

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
        LeagueScoreboardController::update_league_scoreboard_CL();
        $this->info('pomyslnie zaktualizowano tabelę ligową UEFA Champions League!');
    }
}
