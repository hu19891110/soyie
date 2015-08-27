var config = require('../config');
var node = require('./node');
var utils = require('../utils');
var plugins = require('./plugins');

module.exports = createAttributeParser;

var ModuleCmders = {};

ModuleCmders['es-src'] = require('./es-command/es-src');
ModuleCmders['es-click'] = require('./es-command/es-click');
ModuleCmders['es-binding'] = require('./es-command/es-binding');
ModuleCmders['es-passview'] = require('./es-command/es-passview');
ModuleCmders['es-html'] = require('./es-command/es-html');

utils.mixin(ModuleCmders, plugins.exports);

function createAttributeParser(DOM, SCOPE, NODE, PATH){
    var AttributeName = DOM.nodeName;
    var isCommandNode = !!ModuleCmders[AttributeName];

    if ( isCommandNode ){
        return ModuleCmders[AttributeName].call(DOM, SCOPE, NODE, PATH);
    }else{
        return normalAttributeParser.call(DOM, SCOPE, PATH);
    }
}

function normalAttributeParser(SCOPE, PATH){
    var DOMObject = new node(this);
    DOMObject.expression = this.nodeValue + '';
    DOMObject.scopePath = PATH;
    if ( DOMObject.expression.split(utils.REGEXP_TAGSPILTOR).length > 1 ){
        DOMObject.listen();
        DOMObject._createCompiler();
        if ( SCOPE ){
            DOMObject.scope = SCOPE;
            DOMObject.value = DOMObject.compile(SCOPE);
        }
        return DOMObject;
    }
}