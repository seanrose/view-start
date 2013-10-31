/* global $, analytics */// Utility function for sliding from section to section
function slideToNextRow(e,t){var n=$(".row").index($(e).closest(".row")),r=$(".row")[n+1];$("html, body").delay(t).animate({scrollTop:$(r).offset().top},"slow");return!1}function preventDefault(e){e=e||window.event;e.preventDefault&&e.preventDefault();e.returnValue=!1}function keydown(e){for(var t=keys.length;t--;)if(e.keyCode===keys[t]){preventDefault(e);return}}function wheel(e){preventDefault(e)}function disableScroll(){window.addEventListener&&window.addEventListener("DOMMouseScroll",wheel,!1);window.onmousewheel=document.onmousewheel=wheel;document.onkeydown=keydown}function enableScroll(){window.removeEventListener&&window.removeEventListener("DOMMouseScroll",wheel,!1);window.onmousewheel=document.onmousewheel=document.onkeydown=null}function triggerFailModal(e){$(e).closest(".row").addClass("blurred");$("#fail-modal").modal()}function buildUploadRequestString(e,t){var n='curl https://view-api.box.com/1/documents \\\r\n-H "Authorization: Token ',r='" \\\r\n-H "Content-Type: application/json" \\\r\n-d \'{"url": "',i="\"}' \\\r\n-X POST";return n+e+r+t+i}function buildSessionRequestString(e,t){var n='curl https://view-api.box.com/1/sessions \\\r\n-H "Authorization: Token ',r='" \\\r\n-H "Content-Type: application/json" \\\r\n-d \'{"document_id": "',i="\"}' \\\r\n-X POST";return n+e+r+t+i}function unbindSubmitEvents(e){$(e).off("submit");$(e).find("input").off("blur")}function slideInUploadResult(){$("#document-result-copy").delay(3e3).queue(function(e){$(this).addClass("fade-in").animate({top:0},1e3,function(){$(this).children("span").addClass("flashing-highlight")});e()})}function uploadAnimation(){$("#upload-svg").addClass("shrink-up");$("#upload-prompt").addClass("fade-out");slideToNextRow("#upload-svg",2100)}function convertAnimation(){$("#doc-svg").addClass("spin-and-fade-out");$("#html-svg").delay(3600).queue(function(e){$("#doc-svg").remove();$(this).removeClass("hidden").addClass("fade-in-and-spin");slideToNextRow(this,3e3);slideInUploadResult();e()})}function welcomeAnimation(){$("#welcome, #crocobox, #motivation, #get-started").addClass("fade-in");$("#get-started").addClass("fade-in").click(function(){slideToNextRow(this,0)})}function recenterScreenOnBlur(){$("input").blur(function(){$(this).off("blur");var e=$(this).closest(".row");$("html, body").animate({scrollTop:$(e).offset().top},"fast")})}function fadeInButtonsOnFocus(){$("input").focus(function(){$(this).off("focus");$(this).parent().siblings("button").addClass("fade-in")})}function convertDocumentAnimation(){$("#convert-document").submit(function(){var e=this;analytics.track("Uploaded Document for Conversion");unbindSubmitEvents(this);$.ajax({type:"POST",contentType:"application/json",data:JSON.stringify({box_view_token:window.boxViewToken,url:$("#document-url").val()}),dataType:"json",url:"/upload",error:function(t){analytics.track("Error: "+t.responseText);triggerFailModal(e)}}).done(function(e){e.status="done";e.id="<span>"+e.id+"</span>";$("#convert-result, #document-result-copy").html(JSON.stringify(e,undefined,2));$("#document-id-help").html("Hint, it's: "+e.id)});$("#convert-code").text(buildUploadRequestString(window.boxViewToken,$("#document-url").val()));$("#convert-code").addClass("fade-in").tooltip("toggle");$("#convert-result").delay(1200).queue(function(e){$(this).addClass("fade-in").tooltip("toggle");$("#convert-button").click(function(){slideToNextRow(this,0);convertAnimation();return!1}).delay(1700).queue(function(e){$(this).cssFadeOut();e()});e()});return!1})}function createSessionAnimation(){$("#create-session").submit(function(){var e=this;analytics.track("Created Session");unbindSubmitEvents(this);$.ajax({type:"POST",contentType:"application/json",data:JSON.stringify({box_view_token:window.boxViewToken,document_id:$("#document-id").val()}),dataType:"json",url:"/session",error:function(t){analytics.track("Error: "+t.responseText);triggerFailModal(e,status)}}).done(function(e){$("iframe").attr("src",e.session_url);$("#doc-help-link").attr("href",e.session_url)});$("#session-code").text(buildSessionRequestString(window.boxViewToken,$("#document-id").val()));$("#document-result-copy").removeClass("transparent fade-in").fadeOut("slow",function(){$("#session-code").addClass("fade-in").tooltip("toggle");$("#session-result").delay(1200).queue(function(e){$(this).addClass("fade-in").tooltip("toggle");$("#session-button").click(function(){slideToNextRow(this,0);$("iframe").addClass("fade-in");$(".doc-help").delay(1200).queue(function(e){$(this).addClass("fade-in");e()});enableScroll();analytics.track("Completed Quickstart");return!1}).delay(1700).queue(function(e){$(this).cssFadeOut();e()});e()})});return!1})}var keys=[38,40];$.fn.cssFadeOut=function(){$(this).removeClass("transparent fade-in").addClass("fade-switch").delay(400).queue(function(e){$(this).text("Got it! Next step...");e()});return this};$("#url-help").click(function(){analytics.track("Clicked Document Help URL");var e="https://cloud.box.com/shared/static/4qhegqxubg8ox0uj5ys8.pdf";$("#document-url").val(e).focus();return!1});$("#set-token").submit(function(){analytics.track("Set API Key");unbindSubmitEvents(this);slideToNextRow(this,0);window.boxViewToken=$("#box-view-token").val();uploadAnimation();return!1});disableScroll();recenterScreenOnBlur();fadeInButtonsOnFocus();welcomeAnimation();convertDocumentAnimation();createSessionAnimation();