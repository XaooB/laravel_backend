<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PlayersController;

class UpdatePlayers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:update_players';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aktualizacja danych o zawodnikach';

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
        PlayersController::update_players();
        $this->info('pomyslnie zaktualizowano dane o zawodnikach!');
    }
}
