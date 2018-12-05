<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

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
        if(DB::table('users')->join('statuses', 'users.idStatus', '=', 'statuses.idStatus')->select('statuses.Name')->where('users.remember_token', $request->cookie('token'))->value('statuses.Name') == 'aktywny')
        {
            $response = $next($request)
                ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
                ->header('Content-Type', 'application/json');
            return $response;
        }
        else
        {
            $data = array();
            array_push($data, ['status' => false]);
            $response = response($data)
                ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
                ->header('Content-Type', 'application/json');
            return $response;
        }
    }
}
