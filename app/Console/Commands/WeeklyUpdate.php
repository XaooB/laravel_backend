<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class WeeklyUpdate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'week:matches_update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Tygodniowa aktualizacja';

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
        // take matches for next week
        $matches = DB::table('upcoming_matches')->where('Date', '>=', DB::raw('NOW()'))->where('Date', '<=', DB::raw('NOW() + INTERVAL 7 DAY'))->pluck('Date');
        foreach ($matches as $key => $match) {
            
        }
    }
}
