<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::group(['middleware' => 'web', 'middleware' => 'api', 'prefix' => '/v1'], function () {
        
        Route::get('/employees', 'EmployeeController@getAll');
        Route::post('/employees', 'EmployeeController@create');
        Route::put('/employees/{employee_id}', 'EmployeeController@update');
        Route::delete('/employees/{employee_id}', 'EmployeeController@delete');

});
