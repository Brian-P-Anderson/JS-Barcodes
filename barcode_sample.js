// The MIT License (MIT)

// Copyright (c) 2013, Notionovus, LLC.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

// Generic arrays for drawing 5-bit graphics. Building blocks for all barcode symbologies
// Painstakingly derived gobblety-goop, but essentially the two middle sections of image data unique to each graphic
var array5bit_A = new Array ( 'f//AAAAAAAAAAAAAAAAAAAA', 'f//AAAAAAAAAAAAAAAAAAAB', 'f//AAAAAAAAAAAAAAEAAAD/',
 'f//AAAAAAAAAAAAAAEAAAAA', 'f//AAAAAAAAAQAAAP8AAAAA', 'f//AAAAAAAAAQAAAP8AAAAB', 'f//AAAAAAAAAQAAAAAAAAD/',
 'f//AAAAAAAAAQAAAAAAAAAA', 'f//AAABAAAA/wAAAAAAAAAA', 'f//AAABAAAA/wAAAAAAAAAB', 'f//AAABAAAA/wAAAAEAAAD/',
 'f//AAABAAAA/wAAAAEAAAAA', 'f//AAABAAAAAAAAAP8AAAAA', 'f//AAABAAAAAAAAAP8AAAAB', 'f//AAABAAAAAAAAAAAAAAD/',
 'f//AAABAAAAAAAAAAAAAAAA', 'QD/AAD/AAAAAAAAAAAAAAAA', 'QD/AAD/AAAAAAAAAAAAAAAB', 'QD/AAD/AAAAAAAAAAEAAAD/',
 'QD/AAD/AAAAAAAAAAEAAAAA', 'QD/AAD/AAAAAQAAAP8AAAAA', 'QD/AAD/AAAAAQAAAP8AAAAB', 'QD/AAD/AAAAAQAAAAAAAAD/',
 'QD/AAD/AAAAAQAAAAAAAAAA', 'QD/AAAAAAAA/wAAAAAAAAAA', 'QD/AAAAAAAA/wAAAAAAAAAB', 'SL/AADeAAAA/gAAAAIAAAD+',
 'QD/AAAAAAAA/wAAAAEAAAAA', 'QD/AAAAAAAAAAAAAP8AAAAA', 'QD/AAAAAAAAAAAAAP8AAAAB', 'QD/AAAAAAAAAAAAAAAAAAD/',
 'QD/AAAAAAAAAAAAAAAAAAAA');
var array5bit_B = new Array ( 'US0CAuSD38g', 'UUYCA7QBErs', 'ajEDAm49ReY', 'UUoCA+juogg', 'bjEDAjQrOn0', 'bkoDA3iPVH4',
 'ajUDAt82atY', 'UU4CA1nljTg', 'cjEDAghkmFU', 'ckoDA0TA9lY', 'izUEAhrxcbg', 'ck4DAxY8F10', 'bjUDAlvFFR8', 'bk4DAxdhexw',
 'ajkDAr7LFAw', 'UVICAyQ+UJI', 'TTECAq7UnEM', 'TUoCA+Jw8kA', 'ZjUDAmZGozo', 'TU4CA7CME0s', 'ajUDAvnk9E4', 'ak4DA7VAmk0',
 'ZjkDAtle3bI', 'TVICAxOyzrM', 'STUCAqHeHtM', 'SU4CA+16cNA', 'h6QEAZKdo54', 'SVICA62zYxM', 'RTkCAqx1lb4', 'RVICA/z3WM0',
 'QT0CAkdoxRU', 'KFYBA46vJCA');

// Painstakingly derived gobblety-goop, but essentially the front, back and mid-matter common to all barcode images...
var stringStart = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAQAAADLaIVbAAAANUlEQVQIHQEqANX/A';
var stringMid = 'AAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA';
var stringEnd = 'AAAAASUVORK5CYII=" width="';

function genBarcode(inputString,intWidth,intHeight) { // Input is a long string of 1's and 0's, output is the HTML <img> stack
// Pads to the last character to ensure length is divisible by 5
   var intRawmod = inputString.length % 5; // Modulo 5 remainder
   if (intRawmod > 0) for (var i = 0; i < 5 - intRawmod; i++) inputString += "0"; // If not evenly divisible, pad with zeroes
   var arraySeq = new Array (intChunks = inputString.length / 5); // Create array for as many chunks as are now in input string

   for (var i = 0; i < intChunks; i++) arraySeq[i] = parseInt(inputString.substr(i * 5, 5), 2); // Converts string of 1's and 0's to integer array

// Takes integer array and converts to "<img ...>" graphics for display
   var resultString = "";
   for (var i = 0; i < arraySeq.length; i++) {
   	resultString += stringStart + array5bit_A[arraySeq[i]] + stringMid + array5bit_B[arraySeq[i]] + stringEnd + intWidth + '" height="' + intHeight + '">';
   }
   return resultString;
}
///////////////////////////////////////////
// Symbology-specific arrays
// Code 39 Specific Arrays
var arrayCode39Bin = new Array (
 '1010001110111010', '1110100010101110', '1011100010101110', '1110111000101010', // 0, 1, 2, 3
 '1010001110101110', '1110100011101010', '1011100011101010', '1010001011101110', // 4, 5, 6, 7
 '1110100010111010', '1011100010111010', '1110101000101110', '1011101000101110', // 8, 9, A, B
 '1110111010001010', '1010111000101110', '1110101110001010', '1011101110001010', // C, D, E, F
 '1010100011101110', '1110101000111010', '1011101000111010', '1010111000111010', // G, H, I, J
 '1110101010001110', '1011101010001110', '1110111010100010', '1010111010001110', // K, L, M, N
 '1110101110100010', '1011101110100010', '1010101110001110', '1110101011100010', // O, P, Q, R
 '1011101011100010', '1010111011100010', '1110001010101110', '1000111010101110', // S, T, U, V
 '1110001110101010', '1000101110101110', '1110001011101010', '1000111011101010', // W, X, Y, Z
 '1000101011101110', '1110001010111010', '1000111010111010', '1000100010001010', // -, ., (space), $
 '1000100010100010', '1000101000100010', '1010001000100010', '1000101110111010'); // /, +, %, *

var strCode39 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";

// Interleaved 2 of 5 Specific Array
var arrayI2of5 = new Array ('nnwwn', 'wnnnw', 'nwnnw', 'wwnnn', 'nnwnw', 'wnwnn', 'nwwnn', 'nnnww', 'wnnwn', 'nwnwn');

// Code 128 Specific Array
var arrayCode128Bin = new Array ( '11011001100', '11001101100', '11001100110', '10010011000', '10010001100', '10001001100', '10011001000', '10011000100', '10001100100', '11001001000', '11001000100', '11000100100', '10110011100', '10011011100',
 '10011001110', '10111001100', '10011101100', '10011100110', '11001110010', '11001011100', '11001001110', '11011100100', '11001110100', '11101101110', '11101001100', '11100101100', '11100100110', '11101100100', '11100110100', '11100110010',
 '11011011000', '11011000110', '11000110110', '10100011000', '10001011000', '10001000110', '10110001000', '10001101000', '10001100010', '11010001000', '11000101000', '11000100010', '10110111000', '10110001110', '10001101110', '10111011000',
 '10111000110', '10001110110', '11101110110', '11010001110', '11000101110', '11011101000', '11011100010', '11011101110', '11101011000', '11101000110', '11100010110', '11101101000', '11101100010', '11100011010', '11101111010', '11001000010',
 '11110001010', '10100110000', '10100001100', '10010110000', '10010000110', '10000101100', '10000100110', '10110010000', '10110000100', '10011010000', '10011000010', '10000110100', '10000110010', '11000010010', '11001010000', '11110111010',
 '11000010100', '10001111010', '10100111100', '10010111100', '10010011110', '10111100100', '10011110100', '10011110010', '11110100100', '11110010100', '11110010010', '11011011110', '11011110110', '11110110110', '10101111000', '10100011110',
 '10001011110', '10111101000', '10111100010', '11110101000', '11110100010', '10111011110', '10111101110', '11101011110', '11110101110', '11010000100', '11010010000', '11010011100', '1100011101011', '11010111000');

// UPC Specific Arrays
var arrayCodeUPCBin = new Array ( '0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011');


///////////////////////////////////////////
// Global Variables
var strRaw = "";
var strText = "";

///////////////////////////////////////////
// Symbology-specific functions
function funcCode39() { // Code 39
 strRaw = "";
 strText = "*" + strText + "*";
 strText = strText.toUpperCase();
 for (var i = 0; i < strText.length; i++) strRaw += arrayCode39Bin[strCode39.indexOf(strText.charAt(i))];
} // End Code 39

function funcInt2of5() { // Interleaved 2 of 5
 if (strText.length % 2) {
	strText = '0' + strText;
 }
 strRaw = "1010";
 for (var i = 0; i < strText.length / 2; i++) {
	 intEven = parseInt(strText.substr(i * 2, 1), 10);
	 intOdd = parseInt(strText.substr((i * 2) + 1, 1), 10);
	 for (var j = 0; j < 5; j++) {
		if (arrayI2of5[intEven].substr(j,1) == 'w') strRaw += "11";
		strRaw += "1";
		if (arrayI2of5[intOdd].substr(j,1) == 'w') strRaw += "00";
		strRaw += "0";
	 }
 }
 strRaw += "11101";
} // End Interleaved 2 of 5

function funcCode128B() { // Code 128B
var intLength = strText.length;
var arrayData = new Array (intLength + 3);
 arrayData[0] = 104;
 intWtProd = 104;
 arrayData[intLength + 2] = 106;
 for (i = 0; i < intLength; i++) {
 	arrayData[i + 1] = strText.charCodeAt(i) - 32;
 	intWeight = i + 1;
 	intWtProd += intWeight * arrayData[i + 1];
 }
 arrayData[intLength + 1] = intWtProd % 103;
// Converts Code 128B array into string of 1's and 0's
 strRaw = "";
 for (var i = 0; i < arrayData.length; i++) {
  strRaw += arrayCode128Bin[arrayData[i]];
 }
} // End Code 128B

function funcUPC() { // Universal Product Code (UPC)
var intSumOdd = 0;
var intSumEven = 0;
var intCheck = 0;

// Compute check digit and add it to raw string
 for (var i = 0; i < 10; i += 2) {
  intSumEven += parseInt(strText[i]);
  intSumOdd += parseInt(strText[i+1]);
 }
 intCheck = ((intSumOdd * 3) + intSumEven) % 10;
 if (intCheck > 0) {
 	intCheck = 10 - intCheck;
 }
 strText += intCheck;

// Converts Code UPC array into string of 1's and 0's
// Quiet zone and start sequence
 strRaw = "0000000000101";
// Hardcoded zero
 strRaw += "0001101";
// First five bar sequences
 for (var i = 0; i < 5; i++) {
  strRaw += arrayCodeUPCBin[strText[i]];
 }
// Middle sequence
 strRaw += "01010";
// Last six bar sequences, including check digit
 for (var i = 0; i < 6; i++) {
  stringLoop = arrayCodeUPCBin[strText[i+5]];
  for (var j = 0; j < 7; j++) {
   if (stringLoop[j] == '1') {
    strRaw += '0';
   } else {
  	strRaw += '1';
   }
  }
 }
 strRaw += "10100000000000"; // Add required Quiet Zone onto both sides
} // End Universal Product Code (UPC)


var buttonBarcode = document.getElementById("btnGenBar");
buttonBarcode.onclick = function () {
 var intHt = intWd = 0;
 var strImages = "";
 document.getElementById("textImages").value = strImages;
 intWd = document.getElementById("textWidth").value;
 intHt = document.getElementById("textHeight").value;
 strText = document.getElementById("textBarcode").value;
 var selValue = document.getElementById("selList").selectedIndex;
 switch(document.getElementsByTagName("option")[selValue].value) {
  case "Code39" :
   funcCode39();
  break;
  case "Int2of5" :
   funcInt2of5();
  break;
  case "Code128B" :
   funcCode128B();
  break;
  case "UPC" :
   funcUPC();
  break;
  default:
   alert("We should not be here...");
 }
 document.getElementById("result").innerHTML = strImages = genBarcode(strRaw,intWd,intHt);
 document.getElementById("textImages").value = strImages;
 document.getElementById("textImages").select();
}
