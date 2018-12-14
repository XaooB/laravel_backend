<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Google OAuth2
Route::group(['middleware' => ['web']], function () {
    Route::get('auth/google', 'Auth\LoginController@redirectToProvider')->name('login');
    Route::get('auth/google/callback', 'Auth\LoginController@handleProviderCallback');
    Route::get('auth/google/logout', function() {
        session_start();
        session_destroy();
		return redirect('https://portal-wertykalny.herokuapp.com/');
    });
});

/*
Route::post('login', 'PassportController@login');
Route::post('register', 'PassportController@register');
Route::group(['middleware' => 'auth:api'], function(){Route::post('get-details', 'PassportController@get_details');});

Route::get('glogin',array('as'=>'glogin','uses'=>'UsersController@googleLogin')) ;
Route::get('google-user',array('as'=>'user.glist','uses'=>'UsersController@listGoogleUser')) ;
*/

Route::get('test', function() {
    $data = DB::table('survey_sets')->where('idSurvey', 10)->pluck('idSurveySet');
    var_dump(json_decode(json_encode($data), True));
    return;
});

// Use middleware to allow Client-side use API
Route::group(['middleware' => 'apiresponse'], function() {
    // Users routes
    Route::resource('users', 'UsersController')->only(['index']);
    Route::get('users_get_user/{id}', 'UsersController@get_user')->name('users.get_user');
    Route::get('users_get_user_by_name/{login}', 'UsersController@get_user_by_name')->name('users.get_user_by_name');
    Route::get('users_check_user', 'UsersController@check_user')->name('users.check_user');
    // Articles routes
    Route::resource('articles', 'ArticlesController')->only(['index']);
    Route::get('articles_latest/{count}', 'ArticlesController@latest')->name('articles.latest');
    Route::get('articles_latest_main/{count}', 'ArticlesController@latest_main')->name('articles.latest_main');
    Route::get('articles_most_viewed/{count}', 'ArticlesController@most_viewed')->name('articles.most_viewed');
    Route::get('articles_show_article/{id}', 'ArticlesController@show_article')->name('articles.show_article');
    Route::get('articles_show_neighbours/{id}', 'ArticlesController@show_neighbours')->name('articles.show_neighbours');
    Route::get('articles_filtrate/{count}', 'ArticlesController@filtrate')->name('articles.filtrate');
    // Comments routes
    Route::resource('comments', 'CommentsController')->only(['index']);
    Route::get('comments_get_comments/{id}', 'CommentsController@get_comments')->name('comments.get_comments');
    Route::get('comments_get_article_comments/{id}', 'CommentsController@get_article_comments')->name('comments.get_article_comments');
    // Injuries and Suspensions routes
    Route::resource('injuriessuspensions', 'InjuriesSuspensionsController')->only(['index']);
    Route::get('injuriessuspensions_latest_injuries/{count}', 'InjuriesSuspensionsController@latest_injuries')->name('injuriessuspensions.latest_injuries');
    Route::get('injuriessuspensions_latest_suspensions/{count}', 'InjuriesSuspensionsController@latest_suspensions')->name('injuriessuspensions.latest_suspensions');
    Route::get('injuriessuspensions_actual', 'InjuriesSuspensionsController@actual')->name('injuriessuspensions.actual');
    // Players routes
    Route::resource('players', 'PlayersController')->only(['index']);
    Route::get('players_get_squad', 'PlayersController@get_squad')->name('players.get_squad');
    // Survey sets routes
    Route::resource('surveysets', 'SurveySetsController')->only(['index']);
    Route::get('surveysets_get_survey_set/{id}', 'SurveySetsController@get_survey_set')->name('surveysets.get_survey_set');
    Route::get('surveysets_get_latest', 'SurveySetsController@get_latest')->name('surveysets.get_latest');
    // User survey answers routes
    Route::resource('usersurveyanswers', 'UserSurveyAnswersController')->only(['index']);
    // Surveys routes
    Route::resource('surveys', 'SurveysController')->only(['index']);
    Route::get('surveys_get_survey/{id}', 'SurveysController@get_survey')->name('surveys.get_survey');
    Route::get('surveys_latest/{count}', 'SurveysController@latest')->name('surveys.latest');
    // Categories routes
    Route::resource('categories', 'CategoriesController')->only(['index']);
    // Privileges routes
    Route::resource('privileges', 'PrivilegesController')->only(['index']);
    // Statuses routes
    Route::resource('statuses', 'StatusesController')->only(['index']);
    // Clubs routes
    Route::resource('clubs', 'ClubsController')->only(['index']);
    // League scorebaord routes
    Route::resource('leaguescoreboard', 'LeagueScoreboardController')->only(['index']);
    Route::get('leaguescoreboard_get_league_scoreboard/{season}/{league}', 'LeagueScoreboardController@get_league_scoreboard')->name('leaguescoreboard.get_league_scoreboard');
    // Upcoming matches routes
    Route::resource('upcomingmatches', 'UpcomingMatchesController')->only(['index']);
    Route::get('upcomingmatches_get_upcoming_matches/{count}', 'UpcomingMatchesController@get_upcoming_matches')->name('upcomingmatches.get_upcoming_matches');
    // Latest matche result routes
    Route::resource('latestmatchresult', 'LatestMatchResultsController')->only(['index']);
    Route::get('latestmatchresult_get_latest_match_result', 'LatestMatchResultsController@get_latest_match_result')->name('latestmatchresult.get_latest_match_result');
});

// Secure API using SESSION
Route::group(['middleware' => 'apiauth'], function() {
    // Users routes
    Route::resource('users', 'UsersController')->except(['index']);
    //Route::get('users/get_images', 'UsersController@get_images')->name('users.get_images');
    Route::get('users_get_notifications', 'UsersController@get_notifications')->name('users.get_notifications');
    // Comments routes
    Route::resource('comments', 'CommentsController')->except(['index']);
    // User survey answers routes
    Route::resource('usersurveyanswers', 'UserSurveyAnswersController')->except(['index']);
    Route::get('usersurveyanswers_get_user_answer_to_survey/{id_survey}', 'UserSurveyAnswersController@get_user_answer_to_survey')->name('usersurveyanswers.get_user_answer_to_survey');
    // User article likes routes
    Route::resource('userarticlelikes', 'UserLikesController')->except(['index']);

    // Restrict routes to Root/Admin or Moderator/Redactor privileges
    Route::group(['middleware' => 'checkprivilege', 'privileges' => ['root', 'administrator', 'moderator', 'redaktor']], function() {
        // Articles routes
        Route::resource('articles', 'ArticlesController')->except(['index']);
        // Players routes
        Route::resource('players', 'PlayersController')->except(['index']);
    });

    // Restrict routes to Root/Admin or Moderator privileges
    Route::group(['middleware' => 'checkprivilege', 'privileges' => ['root', 'administrator', 'moderator']], function() {

        Route::put('users_change_user_status/{id}', 'UsersController@change_user_status')->name('users.change_user_status');

        Route::get('users_get_blockades', 'UsersController@get_blockades')->name('users.get_blockades');

        Route::get('users_changes', 'UsersController@changes')->name('users.changes');

        Route::get('articles_staff', 'ArticlesController@staff_index')->name('articles.staff_index');
        
        Route::get('articles_staff_show_article/{id}', 'ArticlesController@staff_show_article')->name('articles.staff_show_article');

        Route::put('articles_staff/{id}', 'ArticlesController@staff_update')->name('articles.staff_update');

        Route::put('articles_staff_change_article_visibility/{id}', 'ArticlesController@staff_change_article_visibility')->name('articles.staff_change_article_visibility');

        Route::put('comments_staff_change_comment_visibility/{id}', 'CommentsController@staff_change_comment_visibility')->name('comments.staff_change_article_visibility');

        Route::get('comments_staff_get_article_comments/{id}', 'CommentsController@staff_get_article_comments')->name('comments.staff_get_article_comments');

        Route::resource('leaguescoreboard', 'LeagueScoreboardController')->except(['index']);

        Route::resource('clubs', 'ClubsController')->except(['index']);
        // Categories routes
        Route::resource('categories', 'CategoriesController')->except(['index']);
        // Injuries and Suspensions routes
        Route::resource('injuriessuspensions', 'InjuriesSuspensionsController')->except(['index']);
        // Surveys routes
        Route::resource('surveys', 'SurveysController')->except(['index']);
        // Survey sets routes
        Route::resource('surveysets', 'SurveySetsController')->except(['index']);
    });

    // Restrict routes only to Root/Admin privileges
    Route::group(['middleware' => 'checkprivilege', 'privileges' => ['root', 'administrator']], function() {
        Route::put('users_change_user_privilege/{id}', 'UsersController@change_user_privilege')->name('users.change_user_privilege');
        Route::get('users_get_removal_history', 'UsersController@get_removal_history')->name('users.get_removal_history');
        // Privileges routes
        Route::resource('privileges', 'PrivilegesController')->except(['index']);
        // Statuses routes
        Route::resource('statuses', 'StatusesController')->except(['index']);
    });
});