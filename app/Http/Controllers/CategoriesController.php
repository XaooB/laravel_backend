<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Categories;
use App\Http\Resources\Categories as CategoriesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Cookie;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Categories::all();
        return response()->json(CategoriesResource::collection($categories));
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
        if($request->name != null){
            $categories = new Categories;
            $categories->Name = $request->cname;
            if(Categories::where('Name', '=' , $categories->Name)->exists()) { return response()->json(['message' => 'connection failure']); }
            else {if($categories->save()) { return response()->json(['message' => 'success']);} }
            return response()->json(['message' => 'failure']);
        }
        return response()->json(['message' => 'connection failure']);
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
        if($request->cname != null){
            if(Categories::where('idCategory', '=' , $id)->update(['Name' => $request->cname])) { return response()->json(['message' => 'success']); }
        else { return response()->json(['message' => 'failure']); }
        }
        return response()->json(['message' => 'connection failure']);
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
        if(Categories::where('idCategory', '=' , $id)->delete()) {return response()->json(['message' => 'success']);}
        else {return response()->json(['message' => 'failure']);}
    }
}
