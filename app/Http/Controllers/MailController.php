<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Http\Requests\MailRequest;
use App\Jobs\SendEmail;
use Log;

class MailController extends Controller
{
	public function sendMailNotification(MailRequest $request)
	{
		if($request->validated())
		{
			SendEmail::dispatch($request->subject, $request->message, $request->users)->onConnection('redis')->onQueue('default');
        	Log::info('Dispatched mails');
        	return response()->json(['message' => 'success'], 200);
		}
		return response()->json(['message' => 'invalid data'], 400);
	}
}