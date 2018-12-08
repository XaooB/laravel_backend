<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\User;
use App\UserChanges;
use App\Removals;
use App\UserBlockades;
use App\Notifications;
use App\Http\Resources\Users as UsersResource;
use App\Http\Resources\Removals as RemovalsResource;
use App\Http\Resources\UserChanges as UserChangesResource;
use App\Http\Resources\UserBlockades as UserBlockadesResource;
use App\Http\Resources\Notifications as NotificationsResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\DB;
use Session;
use DateTime;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\CloudinaryController;

if(!isset($_SESSION)) { session_start(); } 

class UsersController extends Controller
{
    public static function buildUserData(&$user)
    {
        $userID = $user;
        if(DB::table('users')->where('id', $userID)->count())
        {
            $user = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'statuses.Name as status', DB::raw('(select count(*) from articles where articles.idUser = users.id) as articles_count'), DB::raw('(select count(*) from comments where comments.idUser = users.id) as comments_count'), 'users.created_at as create_date')->where('id', '=', $userID)->first();
            if(DB::table('removals')->where('id', $userID)->count())
            {
               $user[0]->name .= '(deleted)';
            }
        }
    }
        
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'statuses.Name as status', 'users.created_at as create_date')->get();
        return response()->json($users);
    }

    public function get_user($id)
    {
        $user = $id;
        $this->buildUserData($user);
        return response()->json($user);
    }

    public function get_user_by_name($login)
    {
        $user = DB::table('users')->select('id')->where('Name', $login)->value('id');
        $this->buildUserData($user);
        return response()->json($user);
    }
	
	public function check_user()
	{
        if(isset($_SESSION))
        {
            $data = array($_SESSION);
            return response()->json($data);
        }
        else
            return response($_SESSION);
        
	}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $msg = 'failure';
        if($request->file('image') != null)
        {
            $image_name = 'users' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/users/';
            $request->file('image')->move($destinationFolder, $image_name);
            $path = $destinationFolder . $image_name;
            CloudinaryController::uploadImage($path, $image_name, 'users', 'id', $_SESSION['iduser']);
            $msg = 'success';
        }
        if($request->name != null)
        {
            if(User::where('Name', $request->name)->count() == 0 && User::where('id', $id)->where('id', $_SESSION['iduser'])->update(['Name' => $request->name]))
            { $msg = 'success'; }
            else 
            { return response()->json(['message' => 'user with same name already exists']); }
        }
        return response()->json(['message' => $msg]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id) // ZMIENIC
    {
        if(User::where('id', $id)->where('id', $_SESSION['iduser'])->count()) 
            {
                $user = User::where('id', $id)->where('id', $_SESSION['iduser'])->get();
                $userRemoval = new Removals;
                $userRemoval->id = $user[0]->id;
                $userRemoval->provider = $user[0]->provider;
                $userRemoval->provider_id = $user[0]->provider_id;
                if($userRemoval->save())
                {
                    DB::table('users')->where('id', $_SESSION['iduser'])->update(['idStatus' => DB::table('statuses'->where('Name', 'usunięty')->value('idStatus'))]);
                    return response()->json(['message' => 'user data removed.']); 
                }
                else
                    {return response()->json(['message' => 'connection failure']);}
            }
        else 
            {return response()->json(['message' => 'connection failure']);}
    }

    public function get_images(Request $request)
    {
        if($_SESSION['iduser'] != null && $_SESSION['iduser'] != null && DB::table('users')->where('id', $_SESSION['iduser'])->count()){
            $id = DB::table('users')->select('id')->where('id', $_SESSION['iduser'])->value('id');
            $dir = public_path('images') . '/users/' . $id;
            $userImages = array_diff(scandir($dir), array('.', '..'));
            $images['images'] = array();
            foreach ($userImages as $key => $image) {
                array_push($images['images'], env("APP_PUBLIC_PATH", "http://pw-inz.cba.pl/inz_be/public") . '/images/users/' . $id . '/' . $image);
            }
            return response()->json($images);
        }
    }

    public function get_notifications(Request $request)
    {
        $id = null;
        $id = DB::table('users')->select('id')->where('id', $_SESSION['iduser'])->value('id');
        if($id && $request->from && $request->to)
        {
            $notifications = Notifications::where('idUser', $id)->limit($request->from, $request->to);
            foreach ($notifications as $key => $notification) {
                $this->buildUserData($notification->idUser);
            }
        }
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

    public function change_user_status(Request $request, $id)
    {
        $msg = 'failure';
        $staffPrivilege = $_SESSION['privileges'];
        $userPrivilege = DB::table('users')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->select('privileges.Name')->where('users.id', $id)->value('privileges.Name');
        $ids = $_SESSION['iduser'];
        $msg = $this->change_user_property($id, 'statuses', 'idStatus', $request->status, $ids, $request->reason, $staffPrivilege, $userPrivilege);
        return response()->json(['message' => $msg]);
    }

    public function change_user_privilege(Request $request, $id)
    {
        $msg = 'failure';
        $staffPrivilege = $_SESSION['privileges'];
        $userPrivilege = DB::table('users')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->select('privileges.Name')->where('users.id', $id)->value('privileges.Name');
        $ids = $_SESSION['iduser'];
        $msg = $this->change_user_property($id, 'privileges', 'idPrivilege', $request->privilege,  $ids, null, $staffPrivilege, $userPrivilege);
        return response()->json(['message' => $msg]);
    }
    
    public function change_user_property($id, $table, $property, $data, $idstaff, $reason, $staffPrivilege, $userPrivilege)
    {
        if($staffPrivilege == 'root' || ($staffPrivilege == 'administrator' && $userPrivilege != 'root'))
        {
            $dataID = DB::table($table)->select($property)->where('Name', $data)->value($property);
            if(!User::where($property, $dataID)->where('id', $id)->count())
            {
                if($table == 'privileges')
                {
                    $propertyBefore = DB::table('users')->select('idPrivilege')->where('id', $id)->value('idPrivilege');
                    $propertyAfter = DB::table('privileges')->select('idPrivilege')->where('Name', $data)->value('idPrivilege');
                    if(User::where('id', $id)->update([$property => $dataID])) 
                    {
                        $userChange = new UserChanges;
                        $userChange->idUser = $id;
                        $userChange->idStaff = $idstaff;
                        $userChange->ValueBefore = $propertyBefore;
                        $userChange->ValueAfter = $propertyAfter;
                        if($userChange->save()) { return 'success'; }
                        else { return 'failure'; }
                    }
                    else { return 'failure'; }
                }
                elseif($table == 'statuses')
                {
                    if(User::where('id', $id)->update([$property => $dataID]))
                    {

                        $userBlock = new UserBlockades;
                        $userBlock->idUser = $id;
                        $userBlock->idStaff = $idstaff;
                        $userBlock->Value = $dataID;
                        $userBlock->Reason = $reason;
                        if($userBlock->save()) { return 'success'; }
                        else { return 'failure'; }
                    }
                    else { return 'failure'; }
                }
                else { return 'failure'; }
            }
            else { return 'already set'; }
        }
        else
            return response()->json(['message' => 'access denied']);
    }

    public function get_removal_history()
    {
        $removals = DB::table('removals')->select('id as user', 'created_at as removal_date')->get();
        foreach ($removals as $key => $removal) {
            $this->buildUserData($removal->user);
        }
        return response()->json($removals);
    }

    public function get_blockades()
    {
        $usersBlockades = DB::table('user_blockades')->join('statuses', 'statuses.idStatus', '=', 'user_blockades.Value')->select('idUser as user', 'idStaff as staff', 'statuses.Name as value', 'Reason as reason', 'user_blockades.created_at as date')->get();
        foreach ($usersBlockades as $key => $userBlockade) {
            $this->buildUserData($userBlockade->user);
            $this->buildUserData($userBlockade->staff);
        }
        return response()->json($usersBlockades);
    }

    public function buildChanges($column, $value)
    {
        if($column == 1 && $value == 1)
            $changes = DB::table('user_changes')->join('privileges as priv1', 'priv1.idPrivilege', '=', 'user_changes.ValueBefore')->join('privileges as priv2', 'priv2.idPrivilege', '=', 'user_changes.ValueAfter')->select('idUser as user', 'idStaff as staff', 'priv1.Name as value_before', 'priv2.Name as value_after', 'user_changes.created_at as date')->get();
        else
            $changes = DB::table('user_changes')->join('privileges as priv1', 'priv1.idPrivilege', '=', 'user_changes.ValueBefore')->join('privileges as priv2', 'priv2.idPrivilege', '=', 'user_changes.ValueAfter')->select('idUser as user', 'idStaff as staff', 'priv1.Name as value_before', 'priv2.Name as value_after', 'user_changes.created_at as date')->where($column, $value)->get();
        foreach ($changes as $key => $change) {
            $this->buildUserData($change->user);
            $this->buildUserData($change->staff);
        }
        return $changes;
    }

    public function changes(Request $request)
    {
        if($request->iduser != null)
        {
            return response()->json($this->buildChanges('idUser', $request->iduser));
        }
        elseif($request->idstaff != null)
        {
            return response()->json($this->buildChanges('idStaff', $request->idstaff));
        }
        else
        {
            return response()->json($this->buildChanges(1, 1));
        }
        return response()->json(['message' => 'connection failure']);
    }

    /*
    public function googleLogin(Request $request)  
    {
        $google_redirect_url = route('glogin');
        $gClient = new \Google_Client();
        $gClient->setApplicationName(config('services.google.app_name'));
        $gClient->setClientId(config('services.google.client_id'));
        $gClient->setClientSecret(config('services.google.client_secret'));
        $gClient->setRedirectUri($google_redirect_url);
        $gClient->setDeveloperKey(config('services.google.api_key'));
        $gClient->setScopes(array(
             'https://www.googleapis.com/auth/plus.me',
             'https://www.googleapis.com/auth/userinfo.email',
             'https://www.googleapis.com/auth/userinfo.profile',));
         $google_oauthV2 = new \Google_Service_Oauth2($gClient);
        if ($request->get('code'))
        {
            $gClient->authenticate($request->get('code'));
             $request->session()->put('token', $gClient->getAccessToken());
        }
        if ($request->session()->get('token')) { $gClient->setAccessToken($request->session()->get('token'));}
        if ($gClient->getAccessToken())
        {
            $guser = $google_oauthV2->userinfo->get();  
            $request->session()->put('name', $guser['name']);
            if ($user =User::where('email',$guser['email'])->first()){ logged your user via auth login}
            else{ register your user with response data }               
            return redirect()->route('user.glist');          
        } 
        else
        {
            $authUrl = $gClient->createAuthUrl();
            return redirect()->to($authUrl);
        }
    }
    public function listGoogleUser(Request $request){
        $users = User::orderBy('id','DESC')->paginate(5);
        return view('users.list',compact('users'))->with('i', ($request->input('page', 1) - 1) * 5);;
    }
    */
}
