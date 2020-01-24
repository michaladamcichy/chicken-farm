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
Route::post('/feedChickens', 'ChickenHouseController@feedChickens');
Route::get('/getChickenhouseWorkers/{id}', 'ChickenHouseController@getChickenhouseWorkers');
Route::post('/updateWorkersOnDuty', 'ChickenHouseController@updateWorkersOnDuty');
Route::get('/getChickenhousesIds', 'MainController@getChickenhousesIds');
Route::post('/moveChicken', 'ChickenHouseController@moveChicken');
Route::post('/addProduct', 'ProductsController@addProduct');
Route::post('/addCustomer', 'CustomersController@addCustomer');
Route::get('/getProducts', 'ProductsController@getProducts');
Route::post('/addStoragerecord', 'StorageController@addStoragerecord');
Route::post('/updateProduct', 'ProductsController@updateProduct');
Route::delete('/deleteProduct/{id}', 'ProductsController@deleteProduct');
Route::post('/updateCustomer', 'CustomersController@updateCustomer');
Route::delete('/deleteCustomer/{id}', 'CustomersController@deleteCustomer');
Route::post('/updateStoragerecord', 'StorageController@updateStoragerecord');
Route::post('/deleteStoragerecord', 'StorageController@deleteStoragerecord');
Route::get('/getCustomers', 'CustomersController@getCustomers');
Route::post('/addTransaction', 'TransactionsController@addTransaction');
Route::get('/getTransactionItems/{id}', 'TransactionsController@getTransactionItems');
Route::delete('/deleteTransaction/{id}', 'TransactionsController@deleteTransaction');