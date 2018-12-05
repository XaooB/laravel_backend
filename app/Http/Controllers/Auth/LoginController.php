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

session_start();

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

    protected $access_token = "";

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToProvider()
    {
        $provider = 'google';
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(Request $request)
    {
        $data = array();
        $provider = 'google';
        $user = Socialite::driver($provider)->stateless()->user();
        if(DB::table('users')->join('statuses', 'users.idStatus', 'statuses.idStatus')->where('users.provider_id', $user->id)->where('statuses.Name', 'zablokowany')->count())
            { 
                return response()->json([
                    'message' => 'sorry you are already blocked on this website.', 
                    'reason' => DB::table('user_blockades')->select('Reason')->where('idUser', DB::table('users')->select('id')->where('provider_id', $user->id)->value('id'))->value('Reason')]);
            }
        $authUser = $this->findOrCreateUser($user, $provider);
        $_SESSION['token'] = $this->access_token;
        return redirect('http://portal-wertykalny.herokuapp.com/');
    }

    public function findOrCreateUser($user)
    {
        $authUser = User::where('provider_id', $user->id)->first();
        // if user do exist in database
        if($authUser) { 
            $this->access_token = $user->token;
            User::where('provider_id', $user->id)->update(['remember_token' => $user->token]);
            return $authUser; }
        // if user doesnt exist in database
        else {
            User::create([
                'name' => explode('@', $user->email)[0],
                'password' => null,
                'email' => $user->email,
                'provider' => 'GOOGLE', //'provider' => strtoupper($provider),
                'provider_id' => $user->id,
                'image' => $user->avatar,
                'idprivilege' => 1,
                'idstatus' => 1]);
            User::where('provider_id', $user->id)->update(['remember_token' => $user->token]);
            $authUser = User::where('provider_id', $user->id)->first();
            if($authUser) { 
                $id = User::select('id')->where('provider_id', $user->id)->value('id');
                File::MakeDirectory(public_path('images') . '/users/' . $id);
                $this->access_token = $user->token;
                return $authUser; 
            }
        }
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    public function generateUserToken($provider_id)
    {
        $date_now = new DateTime(); 
        $token_date = new DateTime(DB::table('users')->select('updated_at')->where('provider_id', $provider_id)->value('updated_at')); 
        $date_diff = $date_now->diff($token_date);
        $total_date_diff = $date_diff->days * 24 * 60;
        $total_date_diff += $date_diff->h * 60;
        $total_date_diff += $date_diff->i;
        if(($total_date_diff >= 180 && User::select('remember_token')->where('provider_id', $provider_id)->value('remember_token') != null) || User::select('remember_token')->where('provider_id', $provider_id)->value('remember_token') == null)
        {
            $userID = User::select('id')->where('provider_id', $provider_id)->value('id');
            $idPriv = User::select('idPrivilege')->where('provider_id', $provider_id)->value('idPrivilege');
            $userPriv = DB::table('privileges')->select('Name')->where('idPrivilege', '=', $idPriv)->value('Name');
            $this->access_token = hash('sha256', (time() . "_" . $userID . "_" . $userPriv . "secretToken"));
            User::where('provider_id', $provider_id)->update(['remember_token' => $this->access_token]);
        }
        else { $this->access_token = User::select('remember_token')->where('provider_id', $provider_id)->value('remember_token'); }
    }
}
