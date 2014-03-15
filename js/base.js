"use strict";
// Install app
function initialize() {
   //Do your map stuff
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 
      'https://maps.googleapis.com/maps/api/js?v=3&sensor=true&callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;
(function(){
	var App = function(){
		var app = {};
		var violet = Violet.init({
		  consumer_key: '0v1Zex2YYmAiVoMqccdnkg',
		  consumer_secret: 'HYv9z60dgi4XbcCO1o6Ie1QP7TKuFn0LvX2VIq8',
		  access_token: '7611042-2RaZcpiBp1ytiSL99HvOTKiZn0Ee88E7ol7Ey8uupv',
		  access_token_secret: 'eFQZTy3kAltUfBz2hx4evu7GgnzkbyYv3QPFAZQYjfRhZ'
		});
		app.login = function(){
			violet.oauth.obtainAuthorizeURI((function(uri_str){
				console.log(uri_str);
				var uri_callback = function(tokens){
				  console.log(tokens.oauth_token); // access_token
				  console.log(tokens.oauth_token_secret); // access_token_secret
				  console.log(tokens.user_id);
				  console.log(tokens.screen_name);
				};
				var uri_error = function(){};
				violet.oauth.obtainAccessToken(pin, token_callback, token_error);
			}), (function() {
				console.log("Error");
			}));
		};
		app.sample = function(clbk){
			violet.streaming.sample(clbk, (function(xhr){
				console.log("Error"+xhr);
			}));
		};
		app.stop = function(){
			violet.streaming.stop();
		};
		app.showMap = function() {
			var map = new google.maps.Map ($content[0], options);
		};
		return app;
	};
	var app = App();
	if (navigator.mozApps) {
		var twlink = document.querySelector("#login");
		twlink.onclick = function(){
			app.login();
		};
		var start = document.querySelector("#start");
		start.onclick = function(){
			app.sample(function(tw){
				var geo = {};
				if(tw.coordinates != null){
					geo.lng = tw.coordinates.coordinates[0];
					geo.lat = tw.coordinates.coordinates[1];
				}else if(tw.place != null){
					var pl = tw.place.bounding_box;
					var cr = pl.coordinates[0];
					geo.lng = (cr[0][0]+cr[1][0]+cr[2][0]+cr[3][0])/4;
					geo.lat = (cr[0][1]+cr[1][1]+cr[2][1]+cr[3][1])/4;
				}else{
					return;
				}
				console.log("lat: " + geo.lat + " lng: " +geo.lng );
			});
		};
	} else {
		console.log("Open Web Apps not supported");
	}
})();
