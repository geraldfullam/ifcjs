# IFC.JS
A JavaScript Library for creating and working with dates in the International Fixed Calendar.

The goal is to create a clone of the `Date` Object that extends the prototype with some new methods and overwrites the functionality for several of the native methods.

In doing so, a new `IFCDate` Object is available for creating IFC compatible dates based on a 13-month perennial calendar.
The Gregorian calendar rules for calculating years is maintained and ISO formats are honored where possible.

## Usage
    new IFCDate();
    new IFCDate(dateObject);
    new IFCDate(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
