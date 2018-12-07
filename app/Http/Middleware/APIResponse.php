<?php

namespace App\Http\Middleware;

use Closure;

if(!isset($_SESSION)) { session_start(); } 

class APIResponse
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
        $response = $next($request)
            ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*', true);
            return $response;
    }
}
