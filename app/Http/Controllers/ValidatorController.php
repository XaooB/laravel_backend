<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidatorController extends Controller
{
	public static function checkString($stringToValidate, $maxLenght)
	{
		if(isset($stringToValidate) && strlen($stringToValidate) <= $maxLenght && preg_match('/^[A-Za-z0-9_ -]*$/', $stringToValidate) == 1)
			return true;
		else
			return false;
	}

	public static function insertStringInsideString($originalString, $insertString, $position)
	{
		return $str = substr($originalString, 0, $position) . $insertString . substr($originalString, $position);
	}

	public static function checkUploadFile($file, &$msg)
	{
		if($file != null)
		{
			if((($file->getSize() / 1024) / 1024) < 2)
			{
				$msg = "file is valid";
				return true;
			}
			else
				$msg = "file is too large";
		}
		else
			$msg = "file does not exist";
		return false;
	}
}
