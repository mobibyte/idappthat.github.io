
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("FixUsernames", function(request, response) {
  var User = Parse.Object.extend("_User");
  var query = new Parse.Query(User);
  query.find({
    success: function(results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        result.set("username", result.get("email"));
        result.save(null, {
          success: function(r) { console.log(result.get("email")); },
          error: function(err) { console.log(err); }
        });
      }
      response.success();
    },
    error: function(err) {
      console.error('error')
    }
  });
});
