/*global $ */// Utility function for sliding from section to section
function slideToNextRow(e,t){var n=$(".row").index($(e).closest(".row")),r=$(".row")[n+1];$("html, body").delay(t).animate({scrollTop:$(r).offset().top},"slow");return!1}$("#url-help").click(function(){var e="https://cloud.box.com/shared/static/4qhegqxubg8ox0uj5ys8.pdf";$("#document-url").val(e);return!1});$("#token-button").click(function(){$(this).off("click");slideToNextRow(this,0);window.boxViewToken=$("#box-view-token").val()});$("#convert-button").click(function(){$(this).off("click");$.ajax({type:"POST",contentType:"application/json",data:JSON.stringify({box_view_token:window.boxViewToken,url:$("#document-url").val()}),dataType:"json",url:"/upload"}).done(function(e){$("#convert-result, #document-result-copy").text(JSON.stringify(e,undefined,2));$("#document-id-help").text("Hint, it's: "+e.id)});$("#convert-code").fadeIn("slow",function(){$(this).delay(500).tooltip("show");$("#convert-result").delay(1e3).fadeIn("slow",function(){$(this).delay(500).tooltip("show");$("#convert-button").click(function(){slideToNextRow(this,0);$("#document-result-copy").delay(200).fadeIn().animate({top:0},1e3);$("iframe").delay("slow").fadeIn("slow");return!1}).delay(1e3).animate({opacity:".3"},function(){$(this).text("Got it! Next step...",function(){}).animate({opacity:"1"})})})});return!1});$("#session-button").click(function(){$(this).off("click");$.ajax({type:"POST",contentType:"application/json",data:JSON.stringify({box_view_token:window.boxViewToken,document_id:$("#document-id").val()}),dataType:"json",url:"/session"}).done(function(e){$("iframe").attr("src",e.session_url)});$("#document-result-copy").fadeOut("fast",function(){$("#session-code").fadeIn("slow",function(){$(this).delay(500).tooltip("show");$("#session-result").delay(1e3).fadeIn("slow",function(){$(this).delay(500).tooltip("show");$("#session-button").click(function(){slideToNextRow(this,0);$("iframe").delay("slow").fadeIn("slow");return!1}).delay(1e3).animate({opacity:".3"},function(){$(this).text("Got it! Next step...",function(){}).animate({opacity:"1"})})})})});return!1});