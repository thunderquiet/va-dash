<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        // TODO - this should actually go into a scheduled job so that data would get automatically updated
        $api_key = config('app.VA_API_KEY');
        $symbols = [ "USDJPY", "JPXN" ];
        foreach( $symbols as $symbol )
        {
	        $url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=$symbol&apikey=$api_key";

	        $json = file_get_contents($url);
			$json_data = json_decode($json, true);

			foreach($json_data["Time Series (Daily)"] as $date => $item)
			{
		        // TODO - the "laravel" way of doing this will be to create a factory and model classes
		        DB::table('prices')->insert([
		            'ticker' => $symbol,
		            'date' => $date,
					'open' => $item["1. open"],
					'high' => $item["2. high"],
					'low' => $item["3. low"],
					'close' => $item["4. close"],
					'vol' => $item["5. volume"]
		        ]);
			}
		}



    }
}
