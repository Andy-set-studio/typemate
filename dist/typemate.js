(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*------------------------------------*\
    TYPEMATE

    Run text filters across DOM elements
    to help achieve nice typesetting
    on dynamic content.
\*------------------------------------*/
var TypeMate = function () {
    function TypeMate(parent) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, TypeMate);

        var self = this;

        // Set some settings, by merging defaults and passed settings
        self.settings = _extends({
            minWords: 4,
            selector: 'p',
            ignoreClass: 'js-typemate__ignore'
        }, settings);

        // Either load from root or the passed parent element
        if (typeof parent === 'undefined') {
            self.elems = [].concat(_toConsumableArray(document.querySelectorAll(self.settings.selector)));
        } else {
            self.elems = [].concat(_toConsumableArray(parent.querySelectorAll(self.settings.selector)));
        }
    }

    /**
        * Apply formatting to the loaded elements
        * @return void
        */


    _createClass(TypeMate, [{
        key: 'apply',
        value: function apply() {
            var self = this;

            self.elems.map(function (elem) {

                // Bail out if the ignore class is present on this element  
                if (elem.classList.contains(self.settings.ignoreClass)) {
                    return false;
                }

                // The result string will be tacked on to this 
                var result = '';

                // Split words/tags into array
                var textItems = elem.innerHTML.trim().replace(/&nbsp;/g, '').split(/ (?=[^>]*(?:<|$))/);

                // Check if the text warrants this module
                if (textItems.length < self.settings.minWords) {
                    return;
                }

                // Run widows filter 
                textItems = self.preventWidows(textItems);

                // Join the words back together
                result = textItems.join(' ');

                // Replace whitespace after no break spaces
                result = result.replace(/&nbsp; /g, '&nbsp;');

                // Set the content of the element with our shiny string
                elem.innerHTML = result;
            });
        }

        /**
            * Apply the widows filter to the passed text and return it
            * @param {string} textItems 
            */

    }, {
        key: 'preventWidows',
        value: function preventWidows(textItems) {

            // Find the second to last work
            var targetWord = textItems[textItems.length - 2];

            // Stick a no break space to the end of the word and replace the instance in the array
            textItems[textItems.length - 2] = targetWord + '&nbsp;';

            return textItems;
        }

        /**
            * Reset any formatting 
            * @return void
            */

    }, {
        key: 'reset',
        value: function reset() {
            var self = this;

            self.elems.map(function (elem) {
                elem.innerHTML = elem.innerHTML.replace(/&nbsp;/g, ' ');
            });
        }
    }]);

    return TypeMate;
}();

exports.default = TypeMate;

},{}]},{},[1]);
