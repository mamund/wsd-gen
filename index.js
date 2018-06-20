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
  writeWSD(diag, file);
} 

// read the wsd file
function readWSD(file) {
  var rtn;

  rtn = fs.readFileSync(file,'utf8');
  return rtn;
}

// make the wsd call
function writeWSD(diag, file) {
  var style = "vs2010";
  var type = "png";
  var outfile = file.replace('.wsd','.png');

  wsd.diagram(diag, style, type, function(err, buf){
    if(err) {
      console.error(err);
    } else {
      console.log('writing '+outfile);
      fs.writeFileSync(outfile, buf);
   }
  });
}

// write
