function IFCDate (a, b, c, d, e, f, g) {
	var date;
	var toDayOfYear = function (y, m, d) {
		y = y || new Date().getFullYear();
		m = m || 0;
		d = d || 1;
		var date      = new Date(y, 0);
		var dayOfYear = (m * 28) + d;
		return (date.isLeapYear() && m > 5)
			? dayOfYear += 1
			: dayOfYear;
	}
	switch (arguments.length) {
		case 0:
			date = new Date();
			break;
		case 1:
			if (a instanceof Date) {
				date = a;
			} else {
				date = new Date(a);
			}
			break;
		case 2:
			var dayOfYear = toDayOfYear(a, b);
			date = Date.fromDayOfYear(a, dayOfYear);
			break;
		case 3:
			var dayOfYear = toDayOfYear(a, b, c);
			date = Date.fromDayOfYear(a, dayOfYear);
			break;
		case 4:
			var dayOfYear = toDayOfYear(a, b, c);
			date = Date.fromDayOfYear(a, dayOfYear);
			date.setHours(d);
			break;
		case 5:
			var dayOfYear = toDayOfYear(a, b, c);
			date = Date.fromDayOfYear(a, dayOfYear);
			date.setHours(d);
			date.setMinutes(e);
			break;
		case 6:
			var dayOfYear = toDayOfYear(a, b, c);
			date = Date.fromDayOfYear(a, dayOfYear);
			date.setHours(d);
			date.setMinutes(e);
			date.setSeconds(f);
			break;
		default:
			var dayOfYear = toDayOfYear(a, b, c);
			date = Date.fromDayOfYear(a, dayOfYear);
			date.setHours(d);
			date.setMinutes(e);
			date.setSeconds(f);
			date.setMilliseconds(g);
			break;
	}
	date.__proto__ = IFCDate.prototype;
	return date;
}

IFCDate.prototype.__proto__ = Date.prototype;

/* UTILITY FUNCTION TO RETURN NEW DATE OBJECT BASED ON YEAR AND DAY */
Date.fromDayOfYear = function (year, day) {
	year = year || new Date().getFullYear();
	var date = new Date(year, 0);       // initialize a date in `year-01-01`
	return new Date(date.setDate(day)); // add the number of days
}

/* CALCULATE IF GIVEN YEAR IS A LEAP YEAR
// There is a leap year in every year whose number is divisible by 4, but not if the year number is divisible by 100, unless it is also divisible by 400.
// Returns Boolean
*/
Date.prototype.isLeapYear = function (year) {
    year = year || this.getFullYear();
    return !(year % 4) && (!!(year % 100) || !(year % 400));
};

// Get Day of Year in Gregorian Calendar
Date.prototype.getDayOfYear = function () {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var m = this.getMonth();
    var d = this.getDate();
    var dayOfYear = dayCount[m] + d;
    return m > 1 && this.isLeapYear() ? dayOfYear + 1 : dayOfYear;
};

// Get Day of Year in Gregorian Calendar
IFCDate.prototype.getDayOfYear = function () {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var m = this.getGregorianMonth();
    var d = this.getGregorianDate();
    var dayOfYear = dayCount[m] + d;
    return m > 1 && this.isLeapYear() ? dayOfYear + 1 : dayOfYear;
};

IFCDate.prototype.toGregorianDateString = Date.prototype.toDateString;
IFCDate.prototype.getGregorianMonth     = Date.prototype.getMonth;
IFCDate.prototype.getGregorianDate      = Date.prototype.getDate;
IFCDate.prototype.getGregorianDay       = Date.prototype.getDay;


IFCDate.prototype.getLeapDay = function () {
	// Index of extra day within an intercalary (leap) year
    // return 366; // Pancronometer
    return 169; // Cotsworth
    // return 57;  // Gregorian
};

IFCDate.prototype.getYearDay = function () {
	return this.isLeapYear() && (this.getLeapDay() !== 366) ? 366 : 365;
};

/* CALCULATE MONTH BASED ON NORMALIZED DAY */
IFCDate.prototype.getMonth = function (dayOfYear, normalizedDay) {
	var IFCNormalizedDay = normalizedDay || this.getNormalizedDay(dayOfYear);
	var index      = parseInt((IFCNormalizedDay / 28), 10);
	var IFCLeapDay = this.getLeapDay();
	var IFCYearDay = this.getYearDay();

	return !(IFCNormalizedDay % 28)
		|| dayOfYear === IFCLeapDay
		|| dayOfYear === IFCYearDay
		? index - 1
		: index;
};

/* CALCULATE DAY OF MONTH BASED ON NORMALIZED DAY */
IFCDate.prototype.getDate = function (dayOfYear, normalizedDay) {
	var IFCNormalizedDay = normalizedDay || this.getNormalizedDay(dayOfYear);
	var IFCLeapDay = this.getLeapDay();
	var IFCYearDay = this.getYearDay();

	if (dayOfYear === IFCLeapDay) {
		return IFCLeapDay === 366 ? 30 : 29;
	} else if (dayOfYear === IFCYearDay) {
		return 29;
	} else {
		var remainder = IFCNormalizedDay % 28;
		return remainder > 0 ? remainder : 28;
	}
};

/* CALCULATE DAY OF MONTH BASED ON NORMALIZED DAY */
IFCDate.prototype.getDay = function (dayOfYear, normalizedDay) {
	var IFCNormalizedDay = normalizedDay || this.getNormalizedDay(dayOfYear);
	var IFCLeapDay = this.getLeapDay();
	var IFCYearDay = this.getYearDay();
	if (dayOfYear === IFCLeapDay) {
		return 8;
	} else if (dayOfYear === IFCYearDay) {
		return 7;
	} else {
		return (IFCNormalizedDay - 1) % 7;
	}
};

/* CALCULATE IFC NORMALIZED DAY 
   Used for easier calculating of months, dates and days in IFC. */
IFCDate.prototype.getNormalizedDay = function (dayOfYear) {
	var isLeapYear = this.isLeapYear();
	var IFCLeapDay = this.getLeapDay();
	return isLeapYear && (dayOfYear > IFCLeapDay)
		? dayOfYear - 1
		: dayOfYear;
};

IFCDate.prototype.toDateString = function () {
	const MONTHS = {
		cotsworth: [
			"January", "February", "March", "April", "May", "June", "Sol", "July", "August", "September", "October", "November", "December"
		],
		latin_sequential: [
			"Primo", "Secundo", "Tertio", "Quarto", "Quinto", "Sexto", "Septimo", "Octavo", "Nano", "Decimo", "Undecimo", "Duodecimo", "Decimotertio"
		],
		esperanto: [
			"Januaro", "Februaro", "Marto", "Aprilo", "Majo", "Junio", "Sol", "Julio", "Aŭgusto", "Septembro", "Oktobro", "Novembro", "Decembro"
		],
		esperanto_sequential: [
			"Unua", "Dua", "Tria", "Kvara", "Kvina", "Sesa", "Sepa", "Oka", "Naŭa", "Deka", "Dekunua", "Dekdua", "Dektria"
		]
	};
	const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Dies Anno (Year Day)", "Dies Intercalaris (Leap Day)"];
	
	var type       = 'cotsworth';
	var year       = this.getFullYear();
	var dayOfYear  = this.getDayOfYear();
	var IFCNormalizedDay = this.getNormalizedDay(dayOfYear);
	var IFCMonth   = this.getMonth(dayOfYear, IFCNormalizedDay);
	var IFCDate    = this.getDate(dayOfYear, IFCNormalizedDay);
	var IFCDay     = this.getDay(dayOfYear, IFCNormalizedDay);

	return `${DAYS[IFCDay]}, ${IFCDate} ${MONTHS[type][IFCMonth]} ${year}`;
};

// REMOVED TO REDUCE SIDE EFFECTS IMPOSED ON Date Object
// Date.prototype.toIFCDateString = IFCDate.prototype.toDateString;
// Date.prototype.getIFCMonth     = IFCDate.prototype.getMonth;
// Date.prototype.getIFCDate      = IFCDate.prototype.getDate;
// Date.prototype.getIFCDay       = IFCDate.prototype.getDay;