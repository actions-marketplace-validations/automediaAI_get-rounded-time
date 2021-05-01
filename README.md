[![Test the action workflow](https://github.com/automediaAI/get-rounded-time/workflows/Test%20the%20action/badge.svg)](https://github.com/automediaAI/get-rounded-time/actions?query=workflow:"Test+the+action")
[![codecov](https://codecov.io/gh/automediaAI/get-rounded-time/branch/master/graph/badge.svg)](https://codecov.io/gh/automediaAI/get-rounded-time/branch/master)
[![GitHub release](https://img.shields.io/github/release/automediaAI/get-rounded-time.svg)](https://github.com/automediaAI/get-rounded-time/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-get--current--time-blue?logo=github)](https://github.com/marketplace/actions/get-current-time)
[![](https://img.shields.io/github/contributors/automediaAI/get-rounded-time.svg)](https://github.com/automediaAI/get-rounded-time/graphs/contributors)

# Get Current Time Github Action

This action sets the current ISO8601 time to the `time` output and also provides `readableTime`, `formattedTime`, and many more digital outputs like `year`, `day`, `second`, etc. Useful for setting build times in subsequent steps, renaming your artifact, or keeping the same recorded time for the entire workflow.

## Inputs

### `format`

Time format to use - using [MomemtJS format syntax](https://momentjs.com/docs/#/displaying/format/) - optional

### `utcOffset`

UTC offset to use - using [MomemtJS utcOffset syntax](https://momentjs.com/docs/#/manipulating/utc-offset/) - optional

### `interval`

Interval by which to round off the time - 5, 10, 15, 30 etc - optional

### `intervalType`

Type of Interval - minutes, hours, seconds - Refer to moment.duration docs for all available formats. - optional

### `method`

Rounding method, floor, ceil .... (It supports all the round methods available in NodeJS Math package) - optional

## Outputs

### `time`

The ISO time this action was run, **not** affected by the parameter `utcOffset`  e.g. '2020-01-01T00:30:15.000Z'

### `ISOTime`

Same as `time`

### `readableTime`

Human-friendly time - affected by the parameter `utcOffset`  e.g. 'Wed Jan 01 2020 08:30:15 GMT+0800'

### `formattedTime`

The time this action was run - formatted using `format` and `utcOffset` inputs

### `year,month,day,hour,minute,second,millisecond`

Digital outputs, just as names

## Example usage

```yaml
steps:
  - name: Get current time
    uses: automediaAI/get-rounded-time@v2
    id: current-time
    with:
      format: YYYYMMDD-HH
      utcOffset: "+08:00"
      interval: 15
      intervalType: minutes
      method: ceil
  - name: Use current time
    env:
      TIME: "${{ steps.current-time.outputs.time }}"
      R_TIME: "${{ steps.current-time.outputs.readableTime }}"
      F_TIME: "${{ steps.current-time.outputs.formattedTime }}"
      YEAR: "${{ steps.current-time.outputs.year }}"
      DAY: "${{ steps.current-time.outputs.day }}"
    run: echo $TIME $R_TIME $F_TIME $YEAR $DAY
```

## Run locally

### First

```
npm install
```

### Test

```
npm test
```

And you'll see the console output as following:

***

**PASS**  ./action.test.js

&ensp;&ensp;action
  
  &ensp;&ensp;&ensp;&ensp;**√** Should load (2 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should run with basic functionality (2 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should run with format (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should run with other basic outputs (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should pass format inputs (1 ms)

  &ensp;&ensp;&ensp;&ensp;**√** Should throw error (1 ms)


File       | %&nbsp;Stmts | %&nbsp;Branch | %&nbsp;Funcs | %&nbsp;Lines | Uncovered&nbsp;Line&nbsp;#s
-----------|---------|----------|---------|---------|-------------------
All files  |     100 |      100 |     100 |     100 | 
 action.js |     100 |      100 |     100 |     100 | 

Test Suites: **1 passed**, 1 total

Tests:       **6 passed**, 6 total

Snapshots:   0 total

Time:        2.50 s

Ran all test suites.

***

### Build

```
npm start
```

And you'll see the index.js is generated in the dist folder