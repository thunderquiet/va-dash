import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

window.onload = function (){
    run_app();
}

console.log("here2");
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import regeneratorRuntime from "regenerator-runtime";


// based on the guide here: https://www.freakyjolly.com/react-table-tutorial/
function DashTable( {data, columns} )
{
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        }
    )

     return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div >
    )
}


function run_app()
{
    const client = new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache()
    });

    let chart_option = {
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        yAxis: [ { type: 'value' } ],
        xAxis: [],
        series: [],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                bottom: 10,
                start: 10,
                end: 100
            }
        ]
    };
    let chart_data = {};
    let table_data = [];

    // TODO - we should expose the start date to the user so he can select the range instead
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const sdate = new Date(year, month - 1, day);

    const GET_PRICES = gql`query GetPrices{ prices(first: 200) { data {ticker, date, close} } }`;
    
    client
      .query({ query: GET_PRICES })
      .then( (result) => {
        for( let i = 0; i < result.data.prices.data.length; i++)
        {
            let row = result.data.prices.data[i];
            if( Date.parse(row.date) < Date.parse(sdate) )
                continue;
            if( !(row.ticker in chart_data) )
                chart_data[row.ticker] = {"dates": [], "vals":[] };
            chart_data[row.ticker]["dates"].push( echarts.format.formatTime( row.date ) );
            chart_data[row.ticker]["vals"].push( row.close );
            table_data.push( { "ticker": row.ticker, "close": row.close, "date": row.date } );
        }

        // populate the chart
        for( const ticker in chart_data )
        {
            chart_option.xAxis.push({
                type: 'category',
                scale: true,
                boundaryGap: false,
                inverse: true,
                axisLine: {onZero: false},
                splitLine: {show: false},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax',
                data: chart_data[ticker]["dates"]
            });

            chart_option.series.push({
                    name: ticker,
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: chart_data[ticker]["vals"]
            });
        }
        price_chart.setOption(chart_option);

        let table_columns = [
            { Header: "Date", accessor: "date", },
            { Header: "Ticker", accessor: "ticker", },
            { Header: "Close", accessor: "close", }
          ];
        ReactDOM.render( <DashTable data={table_data} columns={table_columns} />, document.getElementById('table'));

    });

    var price_chart = echarts.init(document.getElementById('chart'));

}


