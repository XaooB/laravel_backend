<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'subject' => 'required|min:8|max:64',
            'message' => 'required|min:16|max:512',
            'users' => 'required'
        ];
    }

    public function message()
    {
        return [
            'subject.required' => 'subject is required',
            'subject.min' => 'subject must be longer than 11 characters.',
            'subject.max' => 'subject cannot be longer than 512 characters.',
            'message.required' => 'message is required',
            'users.required' => 'users are required',
            'message.min' => 'message must be longer than 11 characters.',
            'message.max' => 'message cannot be longer than 512 characters.'
        ];
    }
}
