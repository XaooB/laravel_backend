<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\DB;
use Socialite;
use App\User;
use Session;
use File;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Facades\App\CacheData\UsersCache;

if(!isset($_SESSION)) { session_start(); } 

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
    // * @var string
     */
    //protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider, Request $request)
    {
        $data = array();
        $user = Socialite::driver($provider)->stateless()->user();
        if(DB::table('users')->join('statuses', 'users.idStatus', 'statuses.idStatus')->where('users.provider_id', $user->id)->where('statuses.Name', 'zablokowany')->count())
            { 
                return response()->json([
                    'message' => 'sorry you are already blocked on this website.', 
                    'reason' => DB::table('user_blockades')->select('Reason')->where('idUser', DB::table('users')->select('id')->where('provider_id', $user->id)->value('id'))->value('Reason')], 401);
            }
        $authUser = $this->findOrCreateUser($user, $provider);
        $userData = UsersCache::by_email($authUser->email);
        $userData->id = $userData->iduser;
        unset($userData->iduser);
        $customClaims = [
            'id' => $userData->id,
            'name' => $userData->name,
            'email' => $userData->email,
            'image' => $userData->image,
            'privileges' => $userData->privilege,
            'tier' => $userData->tier,
            'status' => $userData->status,
            'articles_count' => $userData->articles_count,
            'comments_count' => $userData->comments_count,
            'create_date' => $userData->create_date
        ];
        dd($userData);
        $_SESSION['iduser'] = $userData->id;
        $_SESSION['name'] = $userData->name;
        $_SESSION['email'] = $userData->email;
        $_SESSION['image'] = $userData->image;
        $_SESSION['privileges'] = $userData->privilege;
        $_SESSION['tier'] = $userData->tier;
        $_SESSION['status'] = $userData->status;
        $_SESSION['articles_count'] = $userData->articles_count;
        $_SESSION['comments_count'] = $userData->comments_count;
        $_SESSION['create_date'] = $userData->create_date;
        return redirect(env('APP_URL'))->withCookie(cookie('token', JWTAuth::fromUser($userData, $customClaims)));
    }

    public function findOrCreateUser($user, $provider)
    {
        if(User::where('Email', $user->email)->count() > 0)
        {
            User::where('Email', $user->email)->update(['provider' => strtoupper($provider)]);
        }
        else
        {
            User::create([
                'name' => explode('@', $user->email)[0],
                'email' => $user->email,
                'provider' => strtoupper($provider),
                'provider_id' => $user->id,
                'image' => $user->avatar,
                'idprivilege' => 1,
                'idstatus' => 1]);
        }
        $this->email = $user->email;
        return $user; 
    }
}
