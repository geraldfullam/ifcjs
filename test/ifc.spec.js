var should  = require('chai').should();
var IFCDate = require('../src/ifc.js');

describe('IFCDate static properties and methods', function () {
  context('IFCDate.length', function () {
    var IFCLength  = IFCDate.length,
        dateLength = Date.length;

    console.log('\n==IFCDate.length==\n');
    console.log('IFCDate.length :', IFCLength);
    console.log('Date.length    :', dateLength);
    console.log('\n');

    it('should return a number', function () {
      IFCLength.should.be.a('number');
    });
    it('should equal the return from Date.length', function () {
      IFCLength.should.equal(dateLength);
    });
  });
  context('IFCDate.now()', function () {
    var IFCNow  = IFCDate.now(),
        dateNow = Date.now();

    console.log('\n==IFCDate.now()==\n');
    console.log('IFCDate.now() :', IFCNow);
    console.log('Date.now()    :', dateNow);
    console.log('\n');

    it('should return a number', function () {
      IFCNow.should.be.a('number');
    });
    it('should equal the return from Date.now()', function () {
      IFCNow.should.equal(dateNow);
    });
  });
  context.skip('IFCDate.parse()', function () {
    var IFCParsed  = IFCDate.parse('2016-01-01'),
        dateParsed = Date.parse('2016-01-01');

    console.log('\n==IFCDate.parse()==\n');
    console.log("IFCDate.parse('2016-01-01') :", IFCParsed);
    console.log("Date.parse('2016-01-01')    :", dateParsed);
    console.log('\n');

    it('should return a number', function () {
      IFCParsed.should.be.a('number');
    });
    it('should equal the return from Date.parse() given IFC-equivalent UTC date', function () {
      IFCParsed.should.equal(dateParsed);
    });
  });
  context('IFCDate.UTC()', function () {
    var year         = 2016,
        month        = 0,
        day          = 1,
        hour         = 12,
        minutes      = 30,
        seconds      = 30,
        milliseconds = 500;

    console.log('\n==IFCDate.UTC()==\n');

    context('when no arguments are provided', function () {
      var IFCUTC  = IFCDate.UTC(),
          dateUTC = Date.UTC();

      console.log('IFCDate.UTC() :', IFCUTC);
      console.log('Date.UTC()    :', dateUTC);
      console.log('\n');

      it('should return NaN', function () {
        IFCUTC.should.be.NaN;
      });
      it('and Date.UTC() should both pass the isNaN test', function () {
        Number.isNaN(IFCUTC).should.equal(Number.isNaN(dateUTC));
      });
    });
    context('when 1 argument is provided', function () {
      var IFCUTC  = IFCDate.UTC(year),
          dateUTC = Date.UTC(year);

      console.log('IFCDate.UTC(' + year + ') :', IFCUTC);
      console.log('Date.UTC(' + year + ')    :', dateUTC);
      console.log('\n');

      it('should return NaN', function () {
        IFCUTC.should.be.NaN;
      });
      it('and Date.UTC() should both pass the isNaN test', function () {
        Number.isNaN(IFCUTC).should.equal(Number.isNaN(dateUTC));
      });
    });
    context('when 2 arguments are provided', function () {
      var IFCUTC  = IFCDate.UTC(year, month),
          dateUTC = Date.UTC(year, month);

      console.log(`IFCDate.UTC(${year}, ${month}) :`, IFCUTC);
      console.log(`Date.UTC(${year}, ${month})    :`, dateUTC);
      console.log('\n');

      it('should return a number', function () {
        IFCUTC.should.be.a('number');
      });
      it('should equal the return from Date.UTC() given IFC-equivalent UTC date', function () {
        IFCUTC.should.equal(dateUTC);
      });
    });
  });
});

describe('new IFCDate() from constructor function', function () {
  context('when no arguments are provided', function () {
    var date = new IFCDate();
    context('and when called directly', function () {
      it('should be instance of IFCDate', function () {
        date.should.be.instanceof(IFCDate);
      });
      it('should be instance of Date', function () {
        date.should.be.instanceof(Date);
      });
    });
    context('and when .toString() is called', function () {
      var dateString = date.toString();
      it('should return a string', function () {
        dateString.should.be.a('string');
      });
      it('should take the form "Day, DD Month YYYY HH:MM:SS GMT-0000 (TTT)"', function () {
        dateString.should.match(/.+?, \d\d? \w+? \d{4} \d\d:\d\d:\d\d GMT-\d{4} \([A-Z]{3}\)/);
      });
    });
    context('and when .toDateString() is called', function () {
      var dateString = date.toDateString();
      it('should return a string', function () {
        dateString.should.be.a('string');
      });
      it('should take the form "Day, DD Month YYYY"', function () {
        dateString.should.match(/.+?, \d\d? \w+? \d{4}/);
      });
    });
  });
});
