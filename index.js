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
var diag = {text:"",type:"",style:"",file:""};

program
  .arguments('<file>')
  .action(function(file){wsdgen(file)})
  .parse(process.argv);

function wsdgen(file) {
  var text;

  diag.file = file;
  diag.type = "png";
  diag.style = "vs2010"; 
  diag.text = readWSD(diag);
  writeWSD(diag);
} 

// read the wsd file
function readWSD(diag) {
  var rtn;

  rtn = fs.readFileSync(diag.file,'utf8');
  return rtn;
}

// make the wsd call
function writeWSD(diag) {
  var text = ((diag.text&&diag.text!=="")?diag.text:"missing WSD");
  var style = ((diag.style&&diag.style!=="")?diag.style:"vs2010");
  var type = ((diag.type&&diag.type!=="")?diag.type:"png");
  var outfile = ((diag.file&&diag.file!=="")?diag.file.replace('.wsd','.png'):"wsdgen.png");

  wsd.diagram(text, style, type, function(err, buf){
    if(err) {
      console.error(err);
    } else {
      console.log('writing '+outfile);
      fs.writeFileSync(outfile, buf);
   }
  });
}
// eof

