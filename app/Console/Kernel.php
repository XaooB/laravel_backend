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
        Commands\UpdateLive::class,
        Commands\UpdateFinished::class,
        Commands\UpdateScheduled::class,
        Commands\UpdatePlayers::class,
        Commands\UpdateClubsCL::class,
        Commands\UpdateClubsPD::class,
        Commands\UpdateLeagueScoreboardCL::class,
        Commands\UpdateLeagueScoreboardPD::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('schedule:update_live')->everyMinute()->runInBackground();
        $schedule->command('schedule:update_finished')->hourlyAt(30)->runInBackground();
        $schedule->command('schedule:update_scheduled')->hourlyAt(30)->runInBackground();
        $schedule->command('schedule:update_league_scoreboard_CL')->dailyAt('3:00')->runInBackground();
        $schedule->command('schedule:update_league_scoreboard_PD')->dailyAt('3:30')->runInBackground();
        $schedule->command('schedule:update_players')->dailyAt('4:00')->runInBackground();
        $schedule->command('schedule:update_clubs_CL')->dailyAt('4:30')->runInBackground();
        $schedule->command('schedule:update_clubs_PD')->dailyAt('5:00')->runInBackground();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
