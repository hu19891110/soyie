!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.cmd=t()}}(function(){var t;return function e(t,n,r){function o(a,i){if(!n[a]){if(!t[a]){var h="function"==typeof require&&require;if(!i&&h)return h(a,!0);if(s)return s(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[a]={exports:{}};t[a][0].call(f.exports,function(e){var n=t[a][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[a].exports}for(var s="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("url"),o=t("path"),s=t("../loader/module"),a=e.exports=function(t){this.req=r.parse(t),this.map={},this.request()};a.prototype.request=function(){var t=this.req.query;if(t&&t.length){var e={};t.split("&").forEach(function(t){var n,r,o=t.indexOf("=");o>-1?(n=t.substring(0,o),r=t.substring(o+1)):(n=t,r=""),void 0!==e[n]?utils.type(e[n],"Array")?-1===e[n].indexOf(r)&&e[n].push(r):e[n]!==r&&(e[n]=[e[n]],e[n].push(r)):e[n]=r}),t=e}else t={};this.req.query=t},a.prototype.fetch=function(t,e){var n=new s(o.dirname(this.req.pathname),this.map);n.create(t,e)},window.SoyieRequire=e.exports=function(t,e){var n=new a(window.location.href);n.fetch(t,e)}},{"../loader/module":4,path:6,url:12}],2:[function(t,e,n){e.exports=function(t,e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.onreadystatechange=function(){4==n.readyState&&200==n.status&&e(n.responseText)},n.send(null)}},{}],3:[function(t,e,n){e.exports=function(t){var e=[];if(t.length>0){var n=t.match(/[^\.]require\((["|'])([^\1]+?)\1\)/g);n&&n.length&&n.forEach(function(t){var n=/[^\.]require\((["|'])([^\1]+?)\1\)/g.exec(t);n&&n[2]&&e.push(n[2])})}return e}},{}],4:[function(t,e,n){function r(t,e){this.exports={},this.__dirname=t,this.map=e}function o(t,e){t()?"function"==typeof e&&e():setTimeout(function(){o(t,e)},10)}var s=t("./ajax"),a=t("./removeComment"),i=t("./deps"),h=t("path"),u=e.exports=function(t,e){this.__dirname=t,this.map=e};u.prototype.create=function(t,e){var n=h.resolve(this.__dirname,t),r=h.extname(n).toLowerCase();-1===[".js",".json"].indexOf(r)&&(n+=".js");var u=h.dirname(n),f=n,c=this;return c.map[f]?void(200!=c.map[f].status?o(function(){return 200==c.map[f].status},function(){"function"==typeof e&&e(c.map[f].exports)}):"function"==typeof e&&e(c.map[f].exports)):(c.map[f]={},c.map[f].status=0,void s(f,function(t){c.map[f].status=201,".json"==r?(c.map[f].exports=JSON.parse(t),c.map[f].status=200,"function"==typeof e&&e(c.map[f].exports)):c.make(u,f,t,i(a(t)),e)}))},u.prototype.make=function(t,e,n,o,s){var a=new Function("exports","require","module","__dirname","__filename","__devmodel",n),i=this;this.loadDeps(o,t,e,function(){var n=new r(t,i.map),o=n.exports={};n.constructor=a,a(o,n.require.bind(n),n,t,e,!0),i.map[e].exports=n.exports,i.map[e].status=200,"function"==typeof s&&s(i.map[e].exports)})},u.prototype.loadDeps=function(t,e,n,r,o){if(o||(o=0),this.map[n].status=202+o,0===t.length||!t[o])return void r();var s=new u(e,this.map),a=this;s.create(t[o],function(){a.loadDeps(t,e,n,r,o+1)})},r.prototype.require=function(t){t=h.resolve(this.__dirname,t);var e=h.extname(t).toLowerCase();return-1===[".js",".json"].indexOf(e)&&(t+=".js"),this.map[t].exports}},{"./ajax":2,"./deps":3,"./removeComment":5,path:6}],5:[function(t,e,n){var r=/\/\*[\s\S]+?\*\//g,o=/\/\/[^\n]+\n/g;e.exports=function(t){return t.replace(r,"").replace(o,"")}},{}],6:[function(t,e,n){(function(t){function e(t,e){for(var n=0,r=t.length-1;r>=0;r--){var o=t[r];"."===o?t.splice(r,1):".."===o?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function r(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,s=function(t){return o.exec(t).slice(1)};n.resolve=function(){for(var n="",o=!1,s=arguments.length-1;s>=-1&&!o;s--){var a=s>=0?arguments[s]:t.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(n=a+"/"+n,o="/"===a.charAt(0))}return n=e(r(n.split("/"),function(t){return!!t}),!o).join("/"),(o?"/":"")+n||"."},n.normalize=function(t){var o=n.isAbsolute(t),s="/"===a(t,-1);return t=e(r(t.split("/"),function(t){return!!t}),!o).join("/"),t||o||(t="."),t&&s&&(t+="/"),(o?"/":"")+t},n.isAbsolute=function(t){return"/"===t.charAt(0)},n.join=function(){var t=Array.prototype.slice.call(arguments,0);return n.normalize(r(t,function(t,e){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},n.relative=function(t,e){function r(t){for(var e=0;e<t.length&&""===t[e];e++);for(var n=t.length-1;n>=0&&""===t[n];n--);return e>n?[]:t.slice(e,n-e+1)}t=n.resolve(t).substr(1),e=n.resolve(e).substr(1);for(var o=r(t.split("/")),s=r(e.split("/")),a=Math.min(o.length,s.length),i=a,h=0;a>h;h++)if(o[h]!==s[h]){i=h;break}for(var u=[],h=i;h<o.length;h++)u.push("..");return u=u.concat(s.slice(i)),u.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(t){var e=s(t),n=e[0],r=e[1];return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},n.basename=function(t,e){var n=s(t)[2];return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},n.extname=function(t){return s(t)[3]};var a="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return 0>e&&(e=t.length+e),t.substr(e,n)}}).call(this,t("_process"))},{_process:7}],7:[function(t,e,n){function r(){f=!1,i.length?u=i.concat(u):c=-1,u.length&&o()}function o(){if(!f){var t=setTimeout(r);f=!0;for(var e=u.length;e;){for(i=u,u=[];++c<e;)i[c].run();c=-1,e=u.length}i=null,f=!1,clearTimeout(t)}}function s(t,e){this.fun=t,this.array=e}function a(){}var i,h=e.exports={},u=[],f=!1,c=-1;h.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new s(t,e)),1!==u.length||f||setTimeout(o,0)},s.prototype.run=function(){this.fun.apply(null,this.array)},h.title="browser",h.browser=!0,h.env={},h.argv=[],h.version="",h.versions={},h.on=a,h.addListener=a,h.once=a,h.off=a,h.removeListener=a,h.removeAllListeners=a,h.emit=a,h.binding=function(t){throw new Error("process.binding is not supported")},h.cwd=function(){return"/"},h.chdir=function(t){throw new Error("process.chdir is not supported")},h.umask=function(){return 0}},{}],8:[function(e,n,r){(function(e){!function(o){function s(t){throw RangeError(L[t])}function a(t,e){for(var n=t.length,r=[];n--;)r[n]=e(t[n]);return r}function i(t,e){var n=t.split("@"),r="";n.length>1&&(r=n[0]+"@",t=n[1]),t=t.replace(k,".");var o=t.split("."),s=a(o,e).join(".");return r+s}function h(t){for(var e,n,r=[],o=0,s=t.length;s>o;)e=t.charCodeAt(o++),e>=55296&&56319>=e&&s>o?(n=t.charCodeAt(o++),56320==(64512&n)?r.push(((1023&e)<<10)+(1023&n)+65536):(r.push(e),o--)):r.push(e);return r}function u(t){return a(t,function(t){var e="";return t>65535&&(t-=65536,e+=z(t>>>10&1023|55296),t=56320|1023&t),e+=z(t)}).join("")}function f(t){return 10>t-48?t-22:26>t-65?t-65:26>t-97?t-97:q}function c(t,e){return t+22+75*(26>t)-((0!=e)<<5)}function p(t,e,n){var r=0;for(t=n?F(t/_):t>>1,t+=F(t/e);t>S*A>>1;r+=q)t=F(t/S);return F(r+(S+1)*t/(t+C))}function l(t){var e,n,r,o,a,i,h,c,l,m,v=[],d=t.length,g=0,y=E,b=I;for(n=t.lastIndexOf(U),0>n&&(n=0),r=0;n>r;++r)t.charCodeAt(r)>=128&&s("not-basic"),v.push(t.charCodeAt(r));for(o=n>0?n+1:0;d>o;){for(a=g,i=1,h=q;o>=d&&s("invalid-input"),c=f(t.charCodeAt(o++)),(c>=q||c>F((j-g)/i))&&s("overflow"),g+=c*i,l=b>=h?O:h>=b+A?A:h-b,!(l>c);h+=q)m=q-l,i>F(j/m)&&s("overflow"),i*=m;e=v.length+1,b=p(g-a,e,0==a),F(g/e)>j-y&&s("overflow"),y+=F(g/e),g%=e,v.splice(g++,0,y)}return u(v)}function m(t){var e,n,r,o,a,i,u,f,l,m,v,d,g,y,b,x=[];for(t=h(t),d=t.length,e=E,n=0,a=I,i=0;d>i;++i)v=t[i],128>v&&x.push(z(v));for(r=o=x.length,o&&x.push(U);d>r;){for(u=j,i=0;d>i;++i)v=t[i],v>=e&&u>v&&(u=v);for(g=r+1,u-e>F((j-n)/g)&&s("overflow"),n+=(u-e)*g,e=u,i=0;d>i;++i)if(v=t[i],e>v&&++n>j&&s("overflow"),v==e){for(f=n,l=q;m=a>=l?O:l>=a+A?A:l-a,!(m>f);l+=q)b=f-m,y=q-m,x.push(z(c(m+b%y,0))),f=F(b/y);x.push(z(c(f,0))),a=p(n,g,r==o),n=0,++r}++n,++e}return x.join("")}function v(t){return i(t,function(t){return R.test(t)?l(t.slice(4).toLowerCase()):t})}function d(t){return i(t,function(t){return T.test(t)?"xn--"+m(t):t})}var g="object"==typeof r&&r&&!r.nodeType&&r,y="object"==typeof n&&n&&!n.nodeType&&n,b="object"==typeof e&&e;(b.global===b||b.window===b||b.self===b)&&(o=b);var x,w,j=2147483647,q=36,O=1,A=26,C=38,_=700,I=72,E=128,U="-",R=/^xn--/,T=/[^\x20-\x7E]/,k=/[\x2E\u3002\uFF0E\uFF61]/g,L={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},S=q-O,F=Math.floor,z=String.fromCharCode;if(x={version:"1.3.2",ucs2:{decode:h,encode:u},decode:l,encode:m,toASCII:d,toUnicode:v},"function"==typeof t&&"object"==typeof t.amd&&t.amd)t("punycode",function(){return x});else if(g&&y)if(n.exports==g)y.exports=x;else for(w in x)x.hasOwnProperty(w)&&(g[w]=x[w]);else o.punycode=x}(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],9:[function(t,e,n){"use strict";function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.exports=function(t,e,n,s){e=e||"&",n=n||"=";var a={};if("string"!=typeof t||0===t.length)return a;var i=/\+/g;t=t.split(e);var h=1e3;s&&"number"==typeof s.maxKeys&&(h=s.maxKeys);var u=t.length;h>0&&u>h&&(u=h);for(var f=0;u>f;++f){var c,p,l,m,v=t[f].replace(i,"%20"),d=v.indexOf(n);d>=0?(c=v.substr(0,d),p=v.substr(d+1)):(c=v,p=""),l=decodeURIComponent(c),m=decodeURIComponent(p),r(a,l)?o(a[l])?a[l].push(m):a[l]=[a[l],m]:a[l]=m}return a};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},{}],10:[function(t,e,n){"use strict";function r(t,e){if(t.map)return t.map(e);for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r));return n}var o=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};e.exports=function(t,e,n,i){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?r(a(t),function(a){var i=encodeURIComponent(o(a))+n;return s(t[a])?r(t[a],function(t){return i+encodeURIComponent(o(t))}).join(e):i+encodeURIComponent(o(t[a]))}).join(e):i?encodeURIComponent(o(i))+n+encodeURIComponent(o(t)):""};var s=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},a=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}},{}],11:[function(t,e,n){"use strict";n.decode=n.parse=t("./decode"),n.encode=n.stringify=t("./encode")},{"./decode":9,"./encode":10}],12:[function(t,e,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function o(t,e,n){if(t&&u(t)&&t instanceof r)return t;var o=new r;return o.parse(t,e,n),o}function s(t){return h(t)&&(t=o(t)),t instanceof r?t.format():r.prototype.format.call(t)}function a(t,e){return o(t,!1,!0).resolve(e)}function i(t,e){return t?o(t,!1,!0).resolveObject(e):e}function h(t){return"string"==typeof t}function u(t){return"object"==typeof t&&null!==t}function f(t){return null===t}function c(t){return null==t}var p=t("punycode");n.parse=o,n.resolve=a,n.resolveObject=i,n.format=s,n.Url=r;var l=/^([a-z0-9.+-]+:)/i,m=/:[0-9]*$/,v=["<",">",'"',"`"," ","\r","\n","	"],d=["{","}","|","\\","^","`"].concat(v),g=["'"].concat(d),y=["%","/","?",";","#"].concat(g),b=["/","?","#"],x=255,w=/^[a-z0-9A-Z_-]{0,63}$/,j=/^([a-z0-9A-Z_-]{0,63})(.*)$/,q={javascript:!0,"javascript:":!0},O={javascript:!0,"javascript:":!0},A={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},C=t("querystring");r.prototype.parse=function(t,e,n){if(!h(t))throw new TypeError("Parameter 'url' must be a string, not "+typeof t);var r=t;r=r.trim();var o=l.exec(r);if(o){o=o[0];var s=o.toLowerCase();this.protocol=s,r=r.substr(o.length)}if(n||o||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===r.substr(0,2);!a||o&&O[o]||(r=r.substr(2),this.slashes=!0)}if(!O[o]&&(a||o&&!A[o])){for(var i=-1,u=0;u<b.length;u++){var f=r.indexOf(b[u]);-1!==f&&(-1===i||i>f)&&(i=f)}var c,m;m=-1===i?r.lastIndexOf("@"):r.lastIndexOf("@",i),-1!==m&&(c=r.slice(0,m),r=r.slice(m+1),this.auth=decodeURIComponent(c)),i=-1;for(var u=0;u<y.length;u++){var f=r.indexOf(y[u]);-1!==f&&(-1===i||i>f)&&(i=f)}-1===i&&(i=r.length),this.host=r.slice(0,i),r=r.slice(i),this.parseHost(),this.hostname=this.hostname||"";var v="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!v)for(var d=this.hostname.split(/\./),u=0,_=d.length;_>u;u++){var I=d[u];if(I&&!I.match(w)){for(var E="",U=0,R=I.length;R>U;U++)E+=I.charCodeAt(U)>127?"x":I[U];if(!E.match(w)){var T=d.slice(0,u),k=d.slice(u+1),L=I.match(j);L&&(T.push(L[1]),k.unshift(L[2])),k.length&&(r="/"+k.join(".")+r),this.hostname=T.join(".");break}}}if(this.hostname.length>x?this.hostname="":this.hostname=this.hostname.toLowerCase(),!v){for(var S=this.hostname.split("."),F=[],u=0;u<S.length;++u){var z=S[u];F.push(z.match(/[^A-Za-z0-9_-]/)?"xn--"+p.encode(z):z)}this.hostname=F.join(".")}var D=this.port?":"+this.port:"",M=this.hostname||"";this.host=M+D,this.href+=this.host,v&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!q[s])for(var u=0,_=g.length;_>u;u++){var P=g[u],$=encodeURIComponent(P);$===P&&($=escape(P)),r=r.split(P).join($)}var H=r.indexOf("#");-1!==H&&(this.hash=r.substr(H),r=r.slice(0,H));var N=r.indexOf("?");if(-1!==N?(this.search=r.substr(N),this.query=r.substr(N+1),e&&(this.query=C.parse(this.query)),r=r.slice(0,N)):e&&(this.search="",this.query={}),r&&(this.pathname=r),A[s]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var D=this.pathname||"",z=this.search||"";this.path=D+z}return this.href=this.format(),this},r.prototype.format=function(){var t=this.auth||"";t&&(t=encodeURIComponent(t),t=t.replace(/%3A/i,":"),t+="@");var e=this.protocol||"",n=this.pathname||"",r=this.hash||"",o=!1,s="";this.host?o=t+this.host:this.hostname&&(o=t+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(o+=":"+this.port)),this.query&&u(this.query)&&Object.keys(this.query).length&&(s=C.stringify(this.query));var a=this.search||s&&"?"+s||"";return e&&":"!==e.substr(-1)&&(e+=":"),this.slashes||(!e||A[e])&&o!==!1?(o="//"+(o||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):o||(o=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),n=n.replace(/[?#]/g,function(t){return encodeURIComponent(t)}),a=a.replace("#","%23"),e+o+n+a+r},r.prototype.resolve=function(t){return this.resolveObject(o(t,!1,!0)).format()},r.prototype.resolveObject=function(t){if(h(t)){var e=new r;e.parse(t,!1,!0),t=e}var n=new r;if(Object.keys(this).forEach(function(t){n[t]=this[t]},this),n.hash=t.hash,""===t.href)return n.href=n.format(),n;if(t.slashes&&!t.protocol)return Object.keys(t).forEach(function(e){"protocol"!==e&&(n[e]=t[e])}),A[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n;if(t.protocol&&t.protocol!==n.protocol){if(!A[t.protocol])return Object.keys(t).forEach(function(e){n[e]=t[e]}),n.href=n.format(),n;if(n.protocol=t.protocol,t.host||O[t.protocol])n.pathname=t.pathname;else{for(var o=(t.pathname||"").split("/");o.length&&!(t.host=o.shift()););t.host||(t.host=""),t.hostname||(t.hostname=""),""!==o[0]&&o.unshift(""),o.length<2&&o.unshift(""),n.pathname=o.join("/")}if(n.search=t.search,n.query=t.query,n.host=t.host||"",n.auth=t.auth,n.hostname=t.hostname||t.host,n.port=t.port,n.pathname||n.search){var s=n.pathname||"",a=n.search||"";n.path=s+a}return n.slashes=n.slashes||t.slashes,n.href=n.format(),n}var i=n.pathname&&"/"===n.pathname.charAt(0),u=t.host||t.pathname&&"/"===t.pathname.charAt(0),p=u||i||n.host&&t.pathname,l=p,m=n.pathname&&n.pathname.split("/")||[],o=t.pathname&&t.pathname.split("/")||[],v=n.protocol&&!A[n.protocol];if(v&&(n.hostname="",n.port=null,n.host&&(""===m[0]?m[0]=n.host:m.unshift(n.host)),n.host="",t.protocol&&(t.hostname=null,t.port=null,t.host&&(""===o[0]?o[0]=t.host:o.unshift(t.host)),t.host=null),p=p&&(""===o[0]||""===m[0])),u)n.host=t.host||""===t.host?t.host:n.host,n.hostname=t.hostname||""===t.hostname?t.hostname:n.hostname,n.search=t.search,n.query=t.query,m=o;else if(o.length)m||(m=[]),m.pop(),m=m.concat(o),n.search=t.search,n.query=t.query;else if(!c(t.search)){if(v){n.hostname=n.host=m.shift();var d=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;d&&(n.auth=d.shift(),n.host=n.hostname=d.shift())}return n.search=t.search,n.query=t.query,f(n.pathname)&&f(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!m.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var g=m.slice(-1)[0],y=(n.host||t.host)&&("."===g||".."===g)||""===g,b=0,x=m.length;x>=0;x--)g=m[x],"."==g?m.splice(x,1):".."===g?(m.splice(x,1),b++):b&&(m.splice(x,1),b--);if(!p&&!l)for(;b--;b)m.unshift("..");!p||""===m[0]||m[0]&&"/"===m[0].charAt(0)||m.unshift(""),y&&"/"!==m.join("/").substr(-1)&&m.push("");var w=""===m[0]||m[0]&&"/"===m[0].charAt(0);if(v){n.hostname=n.host=w?"":m.length?m.shift():"";var d=n.host&&n.host.indexOf("@")>0?n.host.split("@"):!1;d&&(n.auth=d.shift(),n.host=n.hostname=d.shift())}return p=p||n.host&&m.length,p&&!w&&m.unshift(""),m.length?n.pathname=m.join("/"):(n.pathname=null,n.path=null),f(n.pathname)&&f(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=t.auth||n.auth,n.slashes=n.slashes||t.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var t=this.host,e=m.exec(t);e&&(e=e[0],":"!==e&&(this.port=e.substr(1)),t=t.substr(0,t.length-e.length)),t&&(this.hostname=t)}},{punycode:8,querystring:11}]},{},[1])(1)});