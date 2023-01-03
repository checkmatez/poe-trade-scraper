# Scraping PoE trade website

## How to use

Download appropriate binary from `./dist` directory and run it with arguments:

```
scrape <POESESSID> <URL_TO_TRADE_SEARCH>
```

Where `POESESSID` is the cookie value which you can obtain if you open Chrome dev tools on the trade web-site and go into Application > Cookies.

`URL_TO_TRADE_SEARCH` is optional and will default to https://www.pathofexile.com/trade/search/Hardcore%20Sanctum/r80dVGCQ

If you are on Windows, you can provide arguments by doing the following:

1. Make a shortcut of the `.exe` file
2. Right-click it and select properties
3. Append arguments to the `target` field.

The script will collect first numbers inside explicits section for each item and output it in the console and also to the file `data.txt`.

MAKE SURE YOUR POESESSID IS NOT LEAVING YOUR COMPUTER, DON'T LEAK IT BY ACCIDENT, ESPECIALLY ON STREAM.

## TODO

- Implement scrolling to get more items. Currently it works only with first page of results.

## This product isn't affiliated with or endorsed by Grinding Gear Games in any way.
