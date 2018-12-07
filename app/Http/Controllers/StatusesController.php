<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Statuses;
use App\Http\Resources\Statuses as StatusesResource;
use App\Http\Controllers\Auth;

class StatusesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statuses = Statuses::all();
        return response()->json(StatusesResource::collection($statuses));
    }

    // STAFF AREA ----------------------------------------------------------------------------------------------------------------------------------------------

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
        if($request->status != null){
            $statuses = new Statuses;
            $statuses->Name = $request->status;
            if(Statuses::where('Name', '=' , $statuses->Name)->exists()) { return response()->json(['message' => 'failure']); }
            else {if($statuses->save()) { return response()->json(['message' => 'success']);} }
            return response()->json(['message' => 'connection failure']);
        }
        return response()->json(['message' => 'failure']);
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
        /*
            Aby wysłać dane (modyfikacja) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="PUT">
        */
        if(Privileges::where('idStatus', '=' , $id)->update(['Name' => $request->status])) {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'failure']);}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /*
            Aby wysłać dane (usunięcie) z FRONT należy przesłać dane metodą POST z dodatkową ukrytą wartością:
            <input type="hidden" name="_method" value="DELETE">
        */
        if(Players::where('idStatus', '=' , $id)->delete()) {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'failure']);}
    }
}
