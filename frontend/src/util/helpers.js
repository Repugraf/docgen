export const looseJsonParse = (obj) => Function('"use strict";return (' + obj + ')')();

export const vueInstance = "document.querySelector('div').__vue__";
