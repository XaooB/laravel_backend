<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JD\Cloudder\Facades\Cloudder;

class CloudinaryController extends Controller
{
	public function saveImage($image_url, $table, $column, $id)
	{
		DB::table($table)
            ->where($column, $id)
            ->update(['Image' => $image_url]);
	}

    public static function uploadImage(Request $request, $table, $column, $id)
   	{
       $this->validate($request,['image_name'=>'required|mimes:jpeg,bmp,jpg,png|between:1, 6000',]);
       $image_name = time() . '.' . $request->file('image_name')->getRealPath();
       Cloudder::upload($image_name, null);
       list($width, $height) = getimagesize($image_name);
       $image_url= Cloudder::show(Cloudder::getPublicId(), ["width" => $width, "height"=>$height]);
       //Save images
       $this->saveImage($image_url, $table, $column, $id);
       return redirect()->back()->with('status', 'Image Uploaded Successfully');
   	}
}
