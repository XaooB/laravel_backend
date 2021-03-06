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
            if($_SESSION['status'] == 'aktywny')
                return $next($request);
            else
                return response()->json(['status' => false, 'error' => 'sorry you are already blocked on this website'], 401);
        }
        else
            return response()->json(['status' => false, 'error' => 'authorization failed'], 401);
    }
}
