<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Facades\App\CacheData\MatchesCache;
use App\Http\Controllers\MatchesController;

class UpdateLive extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:update_live';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aktualizacja';

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
        $date = MatchesCache::next_match_date();
        if($date != null)
        {
            MatchesController::update_live_match();
            $this->info('pomyslnie zaktualizowano!');
        }
        else
            $this->info('brak meczu do aktualizacji!');
    }
}
