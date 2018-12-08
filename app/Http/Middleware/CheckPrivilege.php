<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

if(!isset($_SESSION)) { session_start(); } 

class CheckPrivilege
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
            $privileges = $request->route()->getAction()['privileges'];
            if(in_array($_SESSION['privileges'], $privileges)){
                return $next($request);
            }
            else
            {
                return response()->json([
                'status' => false,
                'message' => 'access denied, you do not have permission.']]);
            }
        }
        else
        {
            return response()->json([
                'status' => false,
                'message' => 'priv fail']);
        }
    }
}
