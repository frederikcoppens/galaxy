define(["libs/underscore"],function(k){function d(l){return $("<div/>").text(l).html()}function e(m,n,l){h("GET",m,{},n,l)}function h(q,m,n,p,l){if(q=="GET"||q=="DELETE"){if(m.indexOf("?")==-1){m+="?"}else{m+="&"}m+=$.param(n)}var o=new XMLHttpRequest();o.open(q,m,true);o.setRequestHeader("Accept","application/json");o.setRequestHeader("Cache-Control","no-cache");o.setRequestHeader("X-Requested-With","XMLHttpRequest");o.setRequestHeader("Content-Type","application/json");o.onloadend=function(){var r=o.status;try{response=jQuery.parseJSON(o.responseText)}catch(s){response=o.responseText}if(r==200){p&&p(response)}else{l&&l(response)}};if(q=="GET"||q=="DELETE"){o.send()}else{o.send(JSON.stringify(n))}}function i(o,l){var m=$('<div class="'+o+'"></div>');m.appendTo(":eq(0)");var n=m.css(l);m.remove();return n}function g(l){if(!$('link[href^="'+l+'"]').length){$('<link href="'+galaxy_config.root+l+'" rel="stylesheet">').appendTo("head")}}function j(l,m){if(l){return k.defaults(l,m)}else{return m}}function b(m,o){var n="";if(m>=100000000000){m=m/100000000000;n="TB"}else{if(m>=100000000){m=m/100000000;n="GB"}else{if(m>=100000){m=m/100000;n="MB"}else{if(m>=100){m=m/100;n="KB"}else{if(m>0){m=m*10;n="b"}else{return"<strong>-</strong>"}}}}}var l=(Math.round(m)/10);if(o){return l+" "+n}else{return"<strong>"+l+"</strong> "+n}}function a(){return"x"+Math.random().toString(36).substring(2,9)}function c(l){var m=$("<p></p>");m.append(l);return m}function f(){var n=new Date();var l=(n.getHours()<10?"0":"")+n.getHours();var m=(n.getMinutes()<10?"0":"")+n.getMinutes();var o=n.getDate()+"/"+(n.getMonth()+1)+"/"+n.getFullYear()+", "+l+":"+m;return o}return{cssLoadFile:g,cssGetAttribute:i,get:e,merge:j,bytesToString:b,uuid:a,time:f,wrap:c,request:h,sanitize:d}});