var of = require('../../build/of.min.js');

describe("of", function() {

	it("should detect string", function() {
		var str = 'string';
		var result = of.type(str);
		expect(result).toEqual('String');
	});

	it("should detect regexp", function() {
		var reg = /ab+c/;
		var result = of.type(reg);
		expect(result).toEqual('RegExp');
	});

	it("should detect array", function() {
		var array = ['thing', 'other thing'];
		var result = of.type(array);
		expect(result).toEqual('Array');
	});

	it("should detect object", function() {
		var obj = { 'obj': 'property'}
		var result = of.type(obj);
		expect(result).toEqual('Object');
	});

	it("should detect function", function() {
		var func = function() { return true; };
		var result = of.type(func);
		expect(result).toEqual('Function');
	});

	it("should detect boolean", function() {
		var bool = true;
		var result = of.type(bool);
		expect(result).toEqual('Boolean');
	});

	it("should detect number", function() {
		var number = 21;
		var result = of.type(number);
		expect(result).toEqual('Number');
	});

	it("should detect undefined", function() {
		var defined;
		var result = of.type(defined);
		expect(result).toEqual('Undefined');
	})

	it("should detect arguments", function() {
		var result = of.type(arguments);
		expect(result).toEqual('Arguments');
	});

	it("should detect date", function() {
		var date = new Date();
		var result = of.type(date);
		expect(result).toEqual('Date');
	});

	it("should detect null", function() {
		var result = of.type(null);
		expect(result).toEqual('Null');
	});

	it("should detect element", function() {
		if (typeof HTMLElement !== 'undefined') {
			var element = document.createElement('div');
			var result = of.type(element);
			expect(result).toEqual('Element');
		} else {
			expect(true).toEqual(true);
		}
	});

});

describe("of.string", function() {

	it("should return true on string", function() {
		var result = of.string('string');
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of.string({ 'obj':'property' });
		expect(result).toBe(false);
	});

});

describe("of.regexp", function() {

	it("should return true on regexp", function() {
		var result = of.regexp(/ab+c/);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of.regexp({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.array", function() {

	it("should return true on array", function() {
		var result = of.array(['array']);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of.array({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.object", function() {

	it("should return true on array", function() {
		var result = of.object({ 'obj':'property' });
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of.object(['array']);
		expect(result).toBe(false);
	});
	
});

describe("of.function", function() {

	it("should return true on function", function() {
		var func = function() { return true; };
		var result = of['function'](func);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of['function']({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.boolean", function() {

	it("should return true on true", function() {
		var result = of['boolean'](true);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of['boolean']({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.number", function() {

	it("should return true on 0", function() {
		var result = of.number(0);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of.number({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.undefined", function() {

	it("should return true on undefined", function() {
		var result = of['undefined'](undefined);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of['undefined']({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.arguments", function() {

	it("should return true on arguments", function() {
		var result = of['arguments'](arguments);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of['arguments']({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.date", function() {

	it("should return true on true", function() {
		var date = new Date();
		var result = of.date(date);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of.date({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.null", function() {

	it("should return true on null", function() {
		var result = of['null'](null);
		expect(result).toBe(true);
	});

	it("should return false on object", function() {
		var result = of['null']({ 'obj':'property' });
		expect(result).toBe(false);
	});
	
});

describe("of.element", function() {

	if (typeof HTMLElement !== 'undefined') {

		it("should return true on null", function() {
			var element = document.createElement('div');
			var result = of.element(element);
			expect(result).toBe(true);
		});

		it("should return false on object", function() {
			var result = of.element({ 'obj':'property' });
			expect(result).toBe(false);
		});

	} else {
		it("should be true", function() {
			expect(true).toBe(true);
		})
	}

});