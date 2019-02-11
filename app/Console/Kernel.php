<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Facades\App\CacheData\MatchesCache;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        //$schedule->command('week:matches_update')->weeklyOn(7, '23:00');
        $schedule->command('live:update')->everyMinute()->when(function () {
            $matches = MatchesCache::scheduled_matches(1);
            if($matches[0]->Date)
            {
                
            }
            return true;
        })->sendOutputTo(public_path('wyniki_cron.txt'));
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
