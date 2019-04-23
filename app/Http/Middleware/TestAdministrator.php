<?php

namespace App\Http\Middleware;

use Closure;

class TestAdministrator
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
            if($_SESSION['email'] == 'testadministrator@portal-wertykalny' && $_SESSION['articles_count'] <= 10)
                return $next($request);
            elseif($_SESSION['email'] == 'testadministrator@portal-wertykalny' && $_SESSION['articles_count'] > 10)
                return response()->json(['status' => false, 'error' => 'reset articles'], 401);
            else
                return $next($request);
        }
        else
            return response()->json(['status' => false, 'error' => 'access denied, you do not have permission'], 401);
    }
}
