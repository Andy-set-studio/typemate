!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define("typemate",[],n):"object"==typeof exports?exports.typemate=n():e.typemate=n()}("undefined"!=typeof self?self:this,function(){return function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n,t){"use strict";function r(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),s=function(){function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,e);var i=this;i.settings=Object.assign({minWords:4,selector:"p",ignoreClass:"js-typemate__ignore"},t),i.elems=[].concat(void 0===n?r(document.querySelectorAll(i.settings.selector)):r(n.querySelectorAll(i.settings.selector)))}return i(e,[{key:"apply",value:function(){var e=this;e.elems.map(function(n){if(n.classList.contains(e.settings.ignoreClass))return!1;var t="",r=n.innerHTML.trim().replace(/&nbsp;/g,"").split(/ (?=[^>]*(?:<|$))/);r.length<e.settings.minWords||(r=e.preventOrphans(r),t=r.join(" "),t=t.replace(/&nbsp; /g,"&nbsp;"),n.innerHTML=t)})}},{key:"preventOrphans",value:function(e){var n=e[e.length-2];return e[e.length-2]=n+"&nbsp;",e}},{key:"reset",value:function(){this.elems.map(function(e){e.innerHTML=e.innerHTML.replace(/&nbsp;/g," ")})}}]),e}();e.exports=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new s(e,n)}}])});