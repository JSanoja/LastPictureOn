jQuery( document ).ready(function( $ ) {
// Code that uses jQuery's $ can follow here.
var ig = {};
// !!! USE YOUR OWN TOKEN
ig.token = '640195662.38a901c.474b8ce4f26b40e6abca52f1da0cb8dd';

ig.init = function() {
$('.instagram').each(function(i) {
  var args = {};
  args.container = $(this);
  args.userid = args.container.data('userid');
  args.limit = args.container.data('limit');
  args.feedurl = 'https://api.instagram.com/v1/users/'+args.userid+'/media/recent/?access_token='+ig.token+'&count='+args.limit+'&callback=?';
  // console.log(args.feedurl);
  args.html = '';
  // PASS ARGS TO QUERY
  ig.query(args);
});
}

ig.query = function(args) {
$.getJSON(args.feedurl, {}, function(data) {
  // PASS QUERY DATA TO BUILDER
  ig.build(data, args);
});
}



ig.build = function(data, args) {

$.each(data.data,function (i,item) {
  // console.log(item);
  if (item.caption) var caption = item.caption.text;
  var foto = item.images.standard_resolution.url;
  args.html += '<img class="imagen" src="'+foto+'" />';
  if (caption) args.html += '<div class="caption"><div class="pie">'+caption+'</div></div>';
  // PASS TO OUTPUT
  ig.output(args);
});
}

ig.output = function(args) {
args.container.html(args.html);
}

ig.init();


var fb = {};
// !!! USE YOUR OWN TOKEN
fb.token = 'EAAJt9QgvHRMBAA0OWkjcj8p9mUS0RZBWiRk2rzPwF8k4XPPJrawUiMMWiPohEGpiqNCHG5daH5gts4AXCb5sa4BqsdHZBTsdBesEsDQGMCbUHRhpY0HEpHUsgioZCl49zDObBOZBvLybp6opvnZAQA2KcLw9ZAm1JjFVZB2qb5C7CCouFZAvylEx5YTPx6W4mh8ZD';
  fb.init = function() {
    $('.facebook').each(function(i) {
      var fb_args = {};
      fb_args.container = $(this);
      fb_args.feedurl = 'https://graph.facebook.com/v2.11/me?fields=photos.limit(1)&access_token='+fb.token;
      // console.log(fb_args.feedurl);
      fb_args.html = '';
      // PASS ARGS TO QUERY
      fb.query(fb_args);
    });
  }
  fb.query = function(fb_args) {
    // console.log(fb_args);
    $.getJSON(fb_args.feedurl, {}, function(data) {
      // PASS QUERY DATA TO BUILDER
      // console.log(data);
      fb.build(data, fb_args);
    });
  }
  fb.build = function(data, fb_args) {

  $.each(data.photos.data,function (i,item) {
    //console.log(item);
    var caption = item.name;
    var id= item.id;
    var foto = 'https://graph.facebook.com/v2.11/'+id+'/picture?access_token=' + fb.token;
    fb_args.html += '<img class="imagen" src="'+foto+'" />';
    if (caption) fb_args.html += '<div class="caption"><div class="pie">'+caption+'</div></div>';
    // PASS TO OUTPUT
    fb.output(fb_args);
  });
  }

  fb.output = function(fb_args) {
  fb_args.container.html(fb_args.html);
  }

  fb.init();

}); //ready
