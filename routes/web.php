<?php

use Illuminate\Support\Facades\Route;

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
    return view('App');
});


//our own quick-n-dirty REST endpoint
Route::get('/prices', function () {   
    $args = array();
	parse_str($_SERVER['QUERY_STRING'], $args);

	$sdate = date("ymd",strtotime("-1 month") );
	$edate = now();
	if( array_key_exists('sdate', $args) )
		$sdate = $args["sdate"];
	if( array_key_exists("edate", $args) )
		$edate = $args["edate"];

    $prices = DB::select('select * from prices where date between ? and ?', [$sdate, $edate]);
    return response()->json( $prices, 200);

});





