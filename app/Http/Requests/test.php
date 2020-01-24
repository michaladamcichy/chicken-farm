<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class test extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'birthdate' => 'required|date',
			'weight' => 'required|numeric',
			'type' => 'required'
        ];
    }
	
	public function messages()
	{
		return [
			'birthdate.required' => 'A birthdate is required',
			'weight.required'  => 'A weight is required',
			'type.required'  => 'A type is required',
			'birthdate.date' => 'A birthdate has to be a date',
			'weight.date' => 'Weight has to be a number'
		];
	}
}
