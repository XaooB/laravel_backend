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
            $userPrivilege = DB::table('users')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->select('privileges.Name')->where('users.id', $_SESSION['iduser'])->value('privileges.Name');
            if(in_array($userPrivilege, $privileges)){
            return $next($request);
            }
            else
            {
                $data = array();
                array_push($data, ['message' => 'access denied, you do not have permission.']);
                $response = response($data)
                ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
                ->header('Content-Type', 'application/json');
                return $response;
            }
        }
        else
        {
            $data = array();
            array_push($data, ['status' => 'priv fail']);
            $response = response($data)
            ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
            ->header('Content-Type', 'application/json');
            return $response;
        }
    }
}
