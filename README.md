# Scraping PoE trade website

## Prerequisites

Make sure you have Node.js installed - https://nodejs.org/en/download/

Download repository - https://github.com/checkmatez/poe-trade-scraper

## How to use

Run `yarn scrape <POESESSID> <URL_TO_TRADE_SEARCH>` in your terminal window from the repository root.

Where `POESESSID` is the cookie value which you can obtain if you open Chrome dev tools on the trade web-site and go into Application > Cookies.

And `URL_TO_TRADE_SEARCH` is optional and will default to https://www.pathofexile.com/trade/search/Hardcore%20Sanctum/r80dVGCQ

Script will gather first number inside explicits section for each item and output it in the console and also to the file `data.txt`.

MAKE SURE YOUR POESESSID IS NOT LEAVING YOUR COMPUTER, DON'T LEAK IT BY ACCIDENT, ESPECIALLY ON STREAM.

## TODO

- Implement scrolling to get more items. Currently it works only with first page of results.
- Make it more user-friendly, publish package to npm.

## This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
