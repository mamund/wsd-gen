#!/usr/bin/env node

/* 
 * wsdgen utility
 * converts valid WSD file into PNG
 * calls http://www.websequencediagrams.com
 * 2018-06
 * mamund
 */

"use strict";

var wsd = require('websequencediagrams');
var program = require('commander');
var fs = require('fs');
var diag = {text:"",type:"",style:"",file:""};

// top-level routine
program
  .arguments('<file>')
  .action(function(file){wsdgen(file)})
  .parse(process.argv);

// do the work
function wsdgen(file) {
  var text;

  diag.file = file;
  diag.type = "png";
  diag.style = "vs2010"; 
  if(readWSD(diag)===true) {
    writeWSD(diag);
  }
} 

// read the wsd 
function readWSD(diag) {
  var rtn = "";

  if(fs.existsSync(diag.file)) {
    diag.text = fs.readFileSync(diag.file,'utf8');
    rtn = true;
  } 
  else {
    console.log("File not found: "+diag.file);
    rtn = false;
  }  

  return rtn;
}

// write the png
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

// *** eof

