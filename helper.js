;(function(exports) {
  var arrayEqual = function(a, b) {
    if (!(a instanceof Array) || !(b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  };

  var destroyImplementations = function() {
    Array.prototype.map = undefined;
    Array.prototype.reduce = undefined;
    Array.prototype.filter = undefined;
  };

  exports.helper = {};
  exports.helper.arrayEqual = arrayEqual;
  exports.helper.destroyImplementations = destroyImplementations;
})(this);
