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


Route::get('/employees', function (Request $request) {
    return App\Employee::latest()->get();
});

Route::group(['prefix' => 'employee'], function () {
    Route::post('/', 'EmployeeController@post');
    Route::get('/{id}', 'EmployeeController@get');
    Route::patch('/{id}', 'EmployeeController@patch');
    Route::delete('/{id}', 'EmployeeController@delete');        
});

Route::get('/songs', function (Request $request) {
    return App\Song::latest()->get();
});

Route::group(['prefix' => 'song'], function () {
    Route::post('/', 'SongController@post');
    Route::get('/{id}', 'SongController@get');
    Route::patch('/{id}', 'SongController@patch');
    Route::delete('/{id}', 'SongController@delete');        
});