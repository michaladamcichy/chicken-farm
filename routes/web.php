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

Route::get('/', 'MainController@show');
Route::get('/chickenHouse/{id}', 'ChickenHouseController@show');
Route::get('/business', 'BusinessController@show');
Route::get('/customers', 'CustomersController@show');
Route::get('/products', 'ProductsController@show');
Route::get('/transactions', 'TransactionsController@show');
Route::get('/storage', 'StorageController@show');
Route::post('/addChicken', 'ChickenHouseController@addChicken');
Route::delete('/killChicken/{id}', 'ChickenHouseController@killChicken');
Route::post('/updateChicken', 'ChickenHouseController@updateChicken');
Route::post('/addChickenhouse', 'MainController@addChickenhouse');
Route::post('/updateChickenhouse', 'MainController@updateChickenhouse');
Route::delete('/deleteChickenhouse/{id}', 'MainController@deleteChickenhouse');