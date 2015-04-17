'use strict';

var assert = require('power-assert');
var test = require('../build/src/components/test');

describe('Component', function () {
  it('should say something', function () {
    var hoge = {foo : false};
    assert(hoge.foo);
  });
});
