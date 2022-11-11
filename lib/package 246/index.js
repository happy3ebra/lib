var of = {}, 
	nodeTypes = [1, 3, 9, 11], 
	types = ['String', 'RegExp', 'Array', 'Object', 'Function', 'Boolean', 'Number', 'Undefined', 'Arguments', 'Date', 'Null'];

function toString(obj) { 
	return Object.prototype.toString.call(obj); 
}

function toFunc(type) {
	return function(obj) { 
		return toString(obj) === '[object ' + type + ']';
	};
}

of.type = function(obj) {
	return toString(obj).substring(8).slice(0, -1); 
};

of.element = of.type.element = function(node) { 
	return node.nodeName && (nodeTypes.indexOf(node.nodeType) > -1); 
};

for (var i = 0, l = types.length; i < l; i++) {
	var type = types[i], name = type.toLowerCase();
	of[name] = toFunc(type);
}

module.exports = of;