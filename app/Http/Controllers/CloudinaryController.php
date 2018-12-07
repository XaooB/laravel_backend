<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use JD\Cloudder\Facades\Cloudder;

class CloudinaryController extends Controller
{
	public static function saveImage($image_url, $table, $column, $id)
	{
    /* DELETING OLD IMAGE (NEEDS FIXATION)
    $currentUrl = DB::table($table)->select('Image')->where($column, $id)->value('Image');
    $currentImageId = explode('/' . $table . '/', $currentUrl);
    Cloudder::destroyImage($currentUrl);
    Cloudder::delete(substr($currentImageId[1], 0, -4), ['folder' => $table]);*/
    DB::table($table)->where($column, $id)->update(['Image' => $image_url]);
	}

  public static function uploadImage($path, $image_name, $table, $column, $id)
  {
    $image_name = substr($image_name, 0, -4);
    Cloudder::upload($path, $image_name, ['folder' => $table]);
    list($width, $height) = getimagesize($path);
    $image_url= Cloudder::show(Cloudder::getPublicId(), ['width' => $width, 'height' => $height]);
    $_SESSION['image'] = $image_url;
    self::saveImage($image_url, $table, $column, $id);
  }
}