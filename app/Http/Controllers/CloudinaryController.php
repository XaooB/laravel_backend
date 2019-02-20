<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JD\Cloudder\Facades\Cloudder;

if(!isset($_SESSION)) { session_start(); }

class CloudinaryController extends Controller
{
    public static function uploadImage($path, $image_name, $table)
    {
        $image_name = substr($image_name, 0, -4);
        Cloudder::upload($path, $image_name, ['folder' => $table]);
        list($width, $height) = getimagesize($path);
        $image_url = Cloudder::show(Cloudder::getPublicId(), ['width' => $width, 'height' => $height]);
        return $image_url;
    }
}