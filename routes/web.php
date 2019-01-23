<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    
    return redirect('login');
    
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//router
Route::middleware(['auth'])->group(function(){
    //roles
   Route::resource('roles','RoleController');
   Route::resource('permissions','PermissionController');
   Route::resource('etapaprocesals','etapaprocesalController');
   Route::resource('repatriados','RepatriadosController');
   Route::get('repatriados/char','HomeController@char');
   Route::get('user/pass','UserController@contrasena')->name('users.pass');
   Route::post('user/passchange','UserController@changepass')->name('users.passchange');

    //informe
    Route::post('informe/store','InformeController@store')->name('informes.store')
    ->middleware('permission:informes.create');

    Route::get('informe','InformeController@index')->name('informes.index')
    ->middleware('permission:informes.index');

    Route::get('informe/create','InformeController@create')->name('informes.create')
    ->middleware('permission:informes.create');

    Route::put('informe/{informe}','InformeController@update')->name('informes.update')
    ->middleware('permission:informes.edit');

    Route::get('informe/{informe}','InformeController@show')->name('informes.show')
    ->middleware('permission:informes.show');

    Route::delete('informe/{informe}','InformeController@destroy')->name('informes.destroy')
    ->middleware('permission:informes.destroy');

    Route::get('informe/{informe}/edit','InformeController@edit')->name('informes.edit')
    ->middleware('permission:informes.edit');

    //users
    Route::post('users/store','UserController@store')->name('users.store')
    ->middleware('permission:users.create');

    Route::get('users','UserController@index')->name('users.index')
    ->middleware('permission:users.index');

    Route::get('users/create','UserController@create')->name('users.create')
    ->middleware('permission:users.create');

    Route::put('users/{user}','UserController@update')->name('users.update')
    ->middleware('permission:users.edit');

    Route::get('users/{user}','UserController@show')->name('users.show')
    ->middleware('permission:users.show');

    Route::delete('users/{user}','UserController@destroy')->name('users.destroy')
    ->middleware('permission:users.destroy');

    Route::get('users/{user}/edit','UserController@edit')->name('users.edit')
    ->middleware('permission:users.edit');
});
