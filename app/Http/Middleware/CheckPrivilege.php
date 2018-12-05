<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

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
        if(isset($_SESSION['token']))
        {
            $privileges = $request->route()->getAction()['privileges'];
            $userPrivilege = DB::table('users')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->select('privileges.Name')->where('users.remember_token', $_SESSION['token'])->value('privileges.Name');
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
            array_push($data, ['status' => false]);
            $response = response($data)
            ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
            ->header('Content-Type', 'application/json');
            return $response;
        }
    }
}
