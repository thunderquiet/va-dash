## Market Data Dashboard Project

Build a web based dashboard with charts to display major indices and FX pairs price market data. There are basic requirements and extra challenges. Estimated workload (for basic requirements) should be 4~6 hours; if you feel this will take much longer please reach out to us so that we can scale down the project accordingly. 

> There will be a 30 minutes project discussion after we review your work. Please have fun!

### Resources & Stack
#### Basic
 - Market data provider (free): https://www.alphavantage.co/ 
 - Frontend: React
 - Charting: Echarts (https://echarts.apache.org/)
 - Backend: PHP (Laravel) 
 - Database: MySQL


#### Extra
 - Source Control: Git 
 - Frontend: Apollo Client, Material-UI
 - Backend: GraphQL(Laravel Lighthouse)
 - Hosting: AWS, Heroku or similar, please use free account

### Requirements

#### Basic 

1. Source in below ticker’s pricing data from Alphavantage by using its API. Note that you will need to find out the full ticker name on Alphavantage first in order to query it. 

 - iShares JPX-Nikkei 400 ETF (“JPXN”)
 - USD/JPY


2. Store historical daily price (close) time series in the database. Ticker name, date and close price should be stored. 

![resources/img/tableDataScreenshot.png]

3. Create a webpage by using React and Echarts to show the price line chart of each ticker, for the past 30 days. Example below (from Yahoo! Finance). Note it doesn’t have to be exactly the same, for example, the volume bar chart is not required. 

#### Extra

1. Ensure that the GraphQL schema is a single tree structure.
2. Allow users to be able to filter tables based on categories.
3. Users should be able to see multiple pages of prices or scroll down this table to see previous prices.
4. Users should be able to fetch previous years time series data to ensure that once fetched it is cached and not fetched again.

### Acceptance Criteria

#### Basic

1. Users can see all line charts of tickers listed above on a single web page. 
2. The charts should show the latest 30 days price. 
3. Login or authentication is not necessary.

#### Extra

1. A user should be able to see a table of prices for the past 30 days of tickers.
2. A user should be able  to categorize their investments in multiple custom categories(e.g. by country, risk level, etc) which can be created/edited by the user. 
3. Take into account that multiple users will be using this system in the future.


### Getting Started

1. Head over to the Laravel installation page and download Laravel for your specific Operating System: https://laravel.com/docs/8.x/installation

2. Install Composer: https://getcomposer.org/download/

3. Install Node: https://nodejs.org/en/download/

> Note: Make your installations `global`

4. Using Terminal or Command prompt. `cd` into this directory and run the following commands: 

````
composer install
composer require laravel/ui --dev
php artisan ui react
npm install
npm run watch
````

In a new terminal window/tab, run: 

````
php artisan serve 
````

5. Complete required tasks. 

Good luck. 

