<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

if(!isset($_SESSION)) { session_start(); } 

class APIAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(isset($_SESSION['iduser']))
        {
            if(DB::table('users')->join('statuses', 'users.idStatus', '=', 'statuses.idStatus')->select('statuses.Name')->where('users.id', $_SESSION['iduser'])->value('statuses.Name') == 'aktywny')
            {
                $response = $next($request)
                    ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
                    ->header('Content-Type', 'application/json');
                return $response;
            }
        }
        else
        {
            $data = array();
            array_push($data, ['status' => 'auth fail']);
            $response = response($data)
                ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
                ->header('Content-Type', 'application/json');
            return $response;
        }
    }
}
