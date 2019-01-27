<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JD\Cloudder\Facades\Cloudder;

if(!isset($_SESSION)) { session_start(); }

class CloudinaryController extends Controller
{
	public static function saveImage($image_url, $table, $column, $id)
	{
        $image_url = ValidatorController::insertStringInsideString($image_url, 's', 4);
        DB::table($table)->where($column, $id)->update(['Image' => $image_url]);
        if($table == 'users' && isset($_SESSION['iduser']))
            $_SESSION['image'] = $image_url;
	}

    public static function uploadImage($path, $image_name, $table, $column, $id)
    {
        $image_name = substr($image_name, 0, -4);
        Cloudder::upload($path, $image_name, ['folder' => $table]);
        list($width, $height) = getimagesize($path);
        $image_url= Cloudder::show(Cloudder::getPublicId(), ['width' => $width, 'height' => $height]);
        self::saveImage($image_url, $table, $column, $id);
    }
}