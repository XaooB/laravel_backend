<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidatorController extends Controller
{
	public static function checkString($stringToValidate, $maxLenght)
	{
		if(isset($stringToValidate) && strlen($stringToValidate) <= $maxLenght && preg_match('/^[A-Za-z0-9_-]*$/', $stringToValidate) == 1)
			return true;
		else
			return false;
	}

	public static function insertStringInsideString($originalString, $insertString, $position)
	{
		return $str = substr($originalString, 0, $position) . $insertString . substr($originalString, $position);
	}
}
