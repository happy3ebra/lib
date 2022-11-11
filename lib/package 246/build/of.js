!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.of=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var of = {}, nodeTypes = [1, 3, 9, 11], types = ['String', 'RegExp', 'Array', 'Object', 'Function', 'Boolean', 'Number', 'Undefined', 'Arguments', 'Date', 'Null'];
function toString(obj) { return Object.prototype.toString.call(obj); }
of.type = function(obj) { return toString(obj).substring(8).slice(0, -1); };
function toFunc(type) { return function(obj) { return toString(obj) === '[object ' + type + ']'; }; }
of.element = of.type.element = function(node) { return node.nodeName && (nodeTypes.indexOf(node.nodeType) > -1); };
for (var i = 0, l = types.length; i < l; i++) {
	var type = types[i], name = type.toLowerCase();
	of[name] = toFunc(type);
}
module.exports = of;
},{}]},{},[1])(1)
});