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
use App\Http\Controllers\ValidatorController;

if(!isset($_SESSION)) { session_start(); } 

class UsersController extends Controller
{
    public static function buildUserData(&$user)
    {
        $userID = $user;
        if(DB::table('users')->where('id', $userID)->count() > 0)
        {
            $user = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'privileges.Tier as tier', 'statuses.Name as status', DB::raw('(select count(*) from articles where articles.idUser = users.id) as articles_count'), DB::raw('(select count(*) from comments where comments.idUser = users.id) as comments_count'), 'users.created_at as create_date')->where('id', '=', $userID)->first();
            if($user->status == 'usunięty')
            {
                $user->email = null;
                $user->name = 'użytkownik usunięty';
                $user->image = null;
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
        $users = DB::table('users')->join('privileges', 'privileges.idPrivilege', '=', 'users.idPrivilege')->join('statuses', 'statuses.idStatus', '=', 'users.idStatus')->select('id as iduser', 'users.Name as name', 'Email as email', 'Image as image', 'privileges.Name as privilege', 'statuses.Name as status', 'users.created_at as create_date')->whereIn('statuses.Name', ['aktywny', 'zablokowany'])->get();
        return response()->json($users);
    }

    public function get_user($id)
    {
        if(isset($_SESSION['iduser']))
        {
            if($id != $_SESSION['iduser'])
            {
                $user = $id;
                $this->buildUserData($user);
                return response()->json($user);
            }
            return response()->json($_SESSION);
        }
        else
        {
            $user = $id;
            $this->buildUserData($user);
            return response()->json($user);
        }
    }

    public function get_user_by_name($login)
    {
        $user = DB::table('users')->select('id')->where('Name', $login)->value('id');
        $this->buildUserData($user);
        return response()->json($user);
    }
	
	public function check_user()
	{
        if(isset($_SESSION['iduser']))
        {
            $data = array($_SESSION);
            return response()->json($data);
        }
        else
            return response()->json($_SESSION);
        
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
        $status = false;
        $msg = '';
        if($request->file('image') != null)
        {
            $image_name = 'users' . $id . time() . '.' . $request->file('image')->getClientOriginalExtension();
            $destinationFolder = public_path('images') . '/users/';
            $request->file('image')->move($destinationFolder, $image_name);
            $path = $destinationFolder . $image_name;
            CloudinaryController::uploadImage($path, $image_name, 'users', 'id', $_SESSION['iduser']);
            $status = true;
            $msg .= 'image updated.';
        }
        $data = json_decode($request->getContent(), true);
        if(ValidatorController::checkString($data['name']))
        {
            if(User::where('Name', $data['name'])->count() == 0 && User::where('id', $id)->where('id', $_SESSION['iduser'])->update(['Name' => $data['name']]))
            { 
                $_SESSION['name'] = $request->name;
                $status = true;
                $msg .= 'name updated.';
            }
            else 
            { 
                $status = false;
                $msg .= 'wrong name data.';
            }
        }
        return response()->json(['status' => $status, 'error' => $msg]);
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
            DB::table('users')->where('id', $_SESSION['iduser'])->update(['idStatus' => DB::table('statuses'->where('Name', 'usunięty')->value('idStatus'))]);
            return response()->json(['status' => true, 'error' => '']);
        }
        else 
            return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    public function get_notifications(Request $request)
    {
        if(isset($_SESSION['iduser']))
        {
            $notifications = array();
            $notifications = DB::table('notifications')->select('idReference as reference')->groupBy('idReference')->get();
            return response()->json($notifications);
        }
        else
                return response()->json(['status' => false, 'error' => 'wrong data']);
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

    public function change_user_status(Request $request, $id)
    {
        $status = false;
        $staffPrivilege = $_SESSION['tier'];
        $userPrivilege = DB::table('users')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->select('privileges.Tier')->where('users.id', $id)->value('privileges.Name');
        $ids = $_SESSION['iduser'];
        $status = $this->change_user_property($id, 'statuses', 'idStatus', $request->status, $ids, $request->reason, $staffPrivilege, $userPrivilege);
        return response()->json(['status' => $status]);
    }

    public function change_user_privilege(Request $request, $id)
    {
        $status = false;
        $staffPrivilege = $_SESSION['tier'];
        $userPrivilege = DB::table('users')->join('privileges', 'users.idPrivilege', '=', 'privileges.idPrivilege')->select('privileges.Tier')->where('users.id', $id)->value('privileges.Name');
        $ids = $_SESSION['iduser'];
        $status = $this->change_user_property($id, 'privileges', 'idPrivilege', $request->privilege,  $ids, null, $staffPrivilege, $userPrivilege);
        return response()->json(['status' => $status]);
    }
    
    public function change_user_property($id, $table, $property, $data, $idstaff, $reason, $staffPrivilege, $userPrivilege)
    {
        if($staffPrivilege > $userPrivilege)
        {
            if(!User::where($property, $dataID)->where('id', $id)->count())
            {
                if($table == 'privileges')
                {
                    $propertyBefore = DB::table('users')->select('idPrivilege')->where('id', $id)->value('idPrivilege');
                    $propertyAfter = DB::table('privileges')->select('idPrivilege')->where('Name', $data)->value('idPrivilege');
                    if(User::where('id', $id)->update([$property => $data])) 
                    {
                        $userChange = new UserChanges;
                        $userChange->idUser = $id;
                        $userChange->idStaff = $idstaff;
                        $userChange->ValueBefore = $propertyBefore;
                        $userChange->ValueAfter = $propertyAfter;
                        if($userChange->save()) 
                            return true;
                        else 
                            return false;
                    }
                    else 
                        return false;
                }
                elseif($table == 'statuses')
                {
                    if(User::where('id', $id)->update([$property => $data]))
                    {

                        $userBlock = new UserBlockades;
                        $userBlock->idUser = $id;
                        $userBlock->idStaff = $idstaff;
                        $userBlock->Value = $dataID;
                        $userBlock->Reason = $reason;
                        if($userBlock->save()) 
                            return true;
                        else 
                            return false;
                    }
                    else 
                        return false;
                }
                else 
                    return false;
            }
            else 
                return false;
        }
        else
            return false;
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
        return response()->json(['status' => false, 'error' => 'failure']);
    }
}
