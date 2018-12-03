<?php

namespace App\Http\Middleware;

use Closure;

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
            ->header('Content-Type', 'application/json');
            //->header('Access-Control-Allow-Origin', 'DOMAIN', true);
            return $response;
    }
}
