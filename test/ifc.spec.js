var should = require('chai').should();
var IFCDate = require('../src/ifc.js');

describe('IFCDate static properties and methods', function () {
  context('IFCDate.length', function () {
    var IFCLength  = IFCDate.length,
        dateLength = Date.length;
    console.log('IFCDate.length : ', IFCLength);
    console.log('Date.length: ', dateLength);
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
    console.log('IFCDate.now() : ', IFCNow);
    console.log('Date.now(): ', dateNow);
    it('should return a number', function () {
      IFCNow.should.be.a('number');
    });
    it('should equal the return from Date.now()', function () {
      IFCNow.should.equal(dateNow);
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
