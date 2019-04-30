<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\MatchesController;

class UpdateScheduled extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:update_scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aktualizacja zaplanowanych meczów';

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
        MatchesController::update_scheduled_matches();
        $this->info('pomyslnie zaktualizowano zaplanowane mecze!');
    }
}
