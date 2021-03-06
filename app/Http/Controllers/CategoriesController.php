<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Categories;
use App\Http\Resources\Categories as CategoriesResource;
use App\Http\Controllers\Auth;
use Illuminate\Support\Facades\Cookie;
use Facades\App\CacheData\CategoriesCache;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = CategoriesCache::index();
        return response()->json($categories);
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
        if(isset($request->category))
        {
            $categories = new Categories;
            $categories->Name = $request->category;
            if(Categories::where('Name', $request->category)->exists()) 
                return response()->json(['status' => false, 'error' => 'wrong data']);
            else
            {
                if($categories->save())
                    return response()->json(['status' => true, 'error' => '']);
            }
        }
        return response()->json(['status' => false, 'error' => 'wrong data']);
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
            if(isset($request->category))
            {
                if(Categories::where('idCategory', $id)->update(['Name' => $request->category]))
                    return response()->json(['status' => true, 'error' => '']);
                else
                    return response()->json(['status' => false, 'error' => 'wrong data']);
            }
            else 
                return response()->json(['status' => false, 'error' => 'wrong data']);
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
            if(Categories::where('idCategory', $id)->delete())
                return response()->json(['status' => true, 'error' => '']);
            else 
                return response()->json(['status' => false, 'error' => 'wrong data']);
        }
    }
