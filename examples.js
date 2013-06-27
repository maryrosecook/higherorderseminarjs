;(function() {
  var input = [0, 1, 2, 3, 4];

  // multiply each - iteration
  var output = [];
  for (var i = 0; i < input.length; i++) {
    output.push(input[i] * 2);
  }
  console.log(output);

  // sum - iteration
  var output = 0;
  for (var i = 0; i < input.length; i++) {
    output += input[i];
  }
  console.log(output);

  /* === */

  // a note on iterating: careful with closures!!
  // pretend we are pushing functions into the array.
  var output = [];
  for (var i = 0; i < input.length; i++) {
    output.push({ val : function() { return input[i] * 2 } });
  }
  console.log(output[0].val()); // expects 0, gets NaN!
  console.log(output[4].val()); // expects 8, gets NaN!

  // Array prototype methods to the rescue!

  var output = input.map(function(i){ 
    return { val : function() { return input[i] * 2 } };
  });

  console.log(output[0].val()); // got 0!
  console.log(output[4].val()); // got 8!

  /* === */

  // multiply each - map
  var output = input.map(function(x) {
    return x * 2;
  });
  console.log(output);

  // sum - reduce
  var output = input.reduce(function(acc, x) {
    return acc + x;
  });
  console.log(output);

  // tuples to object with keys+values - reduce
  var input = [["a", 1], ["b", 2], ["c", 3], ["d", 4], ["e", 5]];
  var output = input.reduce(function(acc, x) {
    acc[x[0]] = x[1];
    return acc;
  }, {});
  console.log(output);

  // functions that return functions

  var square = function(input) {
    return input.map(function(x) {
      return x * x;
    });
  };

  var sum = function(input) {
    return input.reduce(function(acc, x) {
      return acc + x;
    });
  };

  var filter = function(f, input) {
    return input.reduce(function(acc, x) {
      return f(x) === true ? acc.concat([x]) : acc;
    }, []);
  };

  // high pass - higher order fn that returns a fn
  var lowPass = function(max) {
    return function(input) {
      return filter(function(x) {
        return x < max;
      }, input);
    };
  };
  var lowPass3 = lowPass(3);
  console.log(lowPass3([0, 1, 2, 3, 4]));

  // approach 1 - nest by hand

  var lowPass15 = lowPass(15);
  console.log(sum(lowPass15(square([0, 1, 2, 3, 4]))));

  // approach 2 - write compose higher order fn

  var compose = function(fn1, fn2) {
    return function(input) {
      return fn2(fn1(input));
    };
  };

  console.log(compose(square, sum)([0, 1, 2, 3, 4]));

  // approach 3 - write a generic composer that can take an arbitrary number of fns
})();
