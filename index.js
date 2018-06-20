#!/usr/bin/env node

/* 
 * wsdgen utility
 * 2018-06
 * mamund
 */

"use strict";

var wsd = require('websequencediagrams');
var program = require('commander');
var fs = require('fs');

program
  .arguments('<file>')
  .action(function(file){wsdgen(file)})
  .parse(process.argv);

function wsdgen(file) {
  var diag;

  diag = readWSD(file);
} 


function readWSD(file) {
  var rtn = '';

   fs.readFile(file,'utf8',function(err,contents) {
    if(err) {
      console.log(err);
    } else  {
      rtn = contents;
    }
  });
  return rtn;
}

