//  Wee need lite js to run early script
window.gvnews = window.gvnews || {};
window.gvnews.library = window.gvnews.library || {};

window.gvnews.library = function gvnews_library() {
    'use strict';
    var base = this;
    base.win = window;
    base.doc = document;
    base.noop = function () {};
    base.globalBody = base.doc.getElementsByTagName('body')[0];
    base.globalBody = base.globalBody ? base.globalBody : base.doc;
    base.win.gvnewsDataStorage = base.win.gvnewsDataStorage || {
        _storage: new WeakMap(),
        put: function (element, key, obj) {
            if (!this._storage.has(element)) {
                this._storage.set(element, new Map());
            }
            this._storage.get(element).set(key, obj);
        },
        get: function (element, key) {
            return this._storage.get(element).get(key);
        },
        has: function (element, key) {
            return this._storage.has(element) && this._storage.get(element).has(key);
        },
        remove: function (element, key) {
            var ret = this._storage.get(element).delete(key);
            if (!this._storage.get(element).size === 0) {
                this._storage.delete(element);
            }
            return ret;
        },
    };
    base.windowWidth = function () {
        return base.win.innerWidth || base.docEl.clientWidth || base.globalBody.clientWidth;
    };
    base.windowHeight = function () {
        return base.win.innerHeight || base.docEl.clientHeight || base.globalBody.clientHeight;
    };
    base.requestAnimationFrame =
    base.win.requestAnimationFrame ||
    base.win.webkitRequestAnimationFrame ||
    base.win.mozRequestAnimationFrame ||
    base.win.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (cb) {
        return setTimeout(cb, 1000 / 60);
    };
    base.cancelAnimationFrame =
    base.win.cancelAnimationFrame ||
    base.win.webkitCancelAnimationFrame ||
    base.win.webkitCancelRequestAnimationFrame ||
    base.win.mozCancelAnimationFrame ||
    base.win.msCancelRequestAnimationFrame ||
    base.win.oCancelRequestAnimationFrame ||
    function (id) {
        clearTimeout(id);
    };
    base.classListSupport = 'classList' in document.createElement('_');
    base.hasClass = base.classListSupport
        ? function (el, str) {
            return el.classList.contains(str);
        }
        : function (el, str) {
            return el.className.indexOf(str) >= 0;
        };
    base.addClass = base.classListSupport
        ? function (el, str) {
            if (!base.hasClass(el, str)) {
                el.classList.add(str);
            }
        }
        : function (el, str) {
            if (!base.hasClass(el, str)) {
                el.className += ' ' + str;
            }
        };
    base.removeClass = base.classListSupport
        ? function (el, str) {
            if (base.hasClass(el, str)) {
                el.classList.remove(str);
            }
        }
        : function (el, str) {
            if (base.hasClass(el, str)) {
                el.className = el.className.replace(str, '');
            }
        };
    base.objKeys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
    base.isObjectSame = function (o1, o2) {
        var is_same = true;
        if (JSON.stringify(o1) !== JSON.stringify(o2)) {
            is_same = false;
        }

        return is_same;
    };
    base.extend = function () {
        var obj,
            name,
            copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;

        for (; i < length; i++) {
            if ((obj = arguments[i]) !== null) {
                for (name in obj) {
                    copy = obj[name];

                    if (target === copy) {
                        continue;
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    base.dataStorage = base.win.gvnewsDataStorage;
    base.isVisible = function (ele) {
        return (ele.offsetWidth !== 0 && ele.offsetHeight !== 0) || ele.getBoundingClientRect().length;
    };
    base.getHeight = function (ele) {
        return ele.offsetHeight || ele.clientHeight || ele.getBoundingClientRect().height;
    };
    base.getWidth = function (ele) {
        return ele.offsetWidth || ele.clientWidth || ele.getBoundingClientRect().width;
    };
    base.supportsPassive = false;
    // Test via a getter in the options object to see if the passive property is accessed
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                base.supportsPassive = true;
            },
        });
        if ('createEvent' in base.doc) {
            base.win.addEventListener('test', null, opts);
        } else if ('fireEvent' in base.doc) {
            base.win.attachEvent('test', null);
        }
    } catch (e) {}

    base.passiveOption = base.supportsPassive ? { passive: true } : false;
    base.setStorage = function (name, value) {
        name = 'gvnews-' + name;
        var itemAbstract = {
                expired: Math.floor((new Date().getTime() + 1000 * 60 * 60 * 12) / 1000),
            },
            value = Object.assign(itemAbstract, value);
        localStorage.setItem(name, JSON.stringify(value));
    };
    base.getStorage = function (name) {
        name = 'gvnews-' + name;
        var value = localStorage.getItem(name);
        if (null !== value && 0 < value.length) {
            return JSON.parse(localStorage.getItem(name));
        }
        return {};
    };
    base.expiredStorage = function () {
        var name = 'gvnews-',
            selectedStorage;
        for (var key in localStorage) {
            if (key.indexOf(name) > -1) {
                selectedStorage = base.getStorage(key.replace(name, ''));
                if ('undefined' !== selectedStorage.expired) {
                    if (selectedStorage.expired < Math.floor(new Date().getTime() / 1000)) {
                        localStorage.removeItem(key);
                    }
                }
            }
        }
    };
    base.addEvents = function (el, obj, preventScrolling) {
        for (var prop in obj) {
            var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? base.passiveOption : false;
            if ('createEvent' in base.doc) {
                el.addEventListener(prop, obj[prop], option);
            } else if ('fireEvent' in base.doc) {
                el.attachEvent('on' + prop, obj[prop]);
            }
        }
    };
    base.removeEvents = function (el, obj) {
        for (var prop in obj) {
            if ('createEvent' in base.doc) {
                el.removeEventListener(prop, obj[prop]);
            } else if ('fireEvent' in base.doc) {
                el.detachEvent('on' + prop, obj[prop]);
            }
        }
    };
    base.triggerEvents = function (ele, eventType, params) {
        var evt,
            params = params || { detail: null };
        if ('createEvent' in base.doc) {
            evt = base.doc.createEvent('CustomEvent') || new CustomEvent(eventType);
            evt.initCustomEvent ? evt.initCustomEvent(eventType, true, false, params) : {};
            ele.dispatchEvent(evt);
            return;
        } else if ('fireEvent' in base.doc) {
            evt = base.doc.createEventObject();
            evt.eventType = eventType;
            ele.fireEvent('on' + evt.eventType, evt);
            return;
        }
    };
    base.getParents = function (el, parentSelector) {
        if (parentSelector === undefined) {
            parentSelector = base.doc;
        }
        var parents = [],
            p = el.parentNode,
            match = false;
        while (!match) {
            if (p) {
                var o = p,
                    parentExist = o.querySelectorAll(parentSelector);
                if (parentExist.length) {
                    match = true;
                } else {
                    parents.push(o);
                    p = o.parentNode;
                }
            } else {
                parents = [];
                match = true;
            }
        }
        return parents;
    };
    base.forEach = function forEach(arr, callback, scope) {
        for (var i = 0, l = arr.length; i < l; i++) {
            callback.call(scope, arr[i], i);
        }
    };
    base.getText = function getText(ele) {
        return ele.innerText || ele.textContent;
    };
    base.setText = function setText(ele, value) {
        var text = 'object' === typeof value ? value.innerText || value.textContent : value;
        if (ele.innerText) {
            ele.innerText = text;
        }
        if (ele.textContent) {
            ele.textContent = text;
        }
    };
    base.httpBuildQuery = function httpBuildQuery(initialObj) {
        var reducer = function reducer(obj) {
            var parentPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            return function (prev, key) {
                var val = obj[key];
                key = encodeURIComponent(key);
                var prefix = parentPrefix ? ''.concat(parentPrefix, '[').concat(key, ']') : key;

                if (val == null || typeof val === 'function') {
                    prev.push(''.concat(prefix, '='));
                    return prev;
                }

                if (['number', 'boolean', 'string'].includes(typeof val)) {
                    prev.push(''.concat(prefix, '=').concat(encodeURIComponent(val)));
                    return prev;
                }

                prev.push(base.objKeys(val).reduce(reducer(val, prefix), []).join('&'));
                return prev;
            };
        };
        return base.objKeys(initialObj).reduce(reducer(initialObj), []).join('&');
    };
    base.get = function get(url, params, callback, run) {
        callback = 'function' === typeof callback ? callback : base.noop;
        return base.ajax('GET', url, params, callback, run);
    };
    base.post = function post(url, params, callback, run) {
        callback = 'function' === typeof callback ? callback : base.noop;
        return base.ajax('POST', url, params, callback, run);
    };
    base.ajax = function ajax(method, url, params, callback, run) {
    /* Create XMLHttpRequest object and set variables */
        var xhr = new XMLHttpRequest(),
            target = url,
            args = base.httpBuildQuery(params),
            valid_methods = ['GET', 'POST'];
        method = -1 != valid_methods.indexOf(method) ? method : 'GET';
        /* Set request method and target URL */
        xhr.open(method, target + ('GET' == method ? '?' + args : ''), true);
        /* Set request headers */
        if ('POST' == method) {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        /* Hook into onreadystatechange */
        xhr.onreadystatechange = function () {
            if (4 === xhr.readyState && 200 <= xhr.status && 300 > xhr.status) {
                if ('function' === typeof callback) {
                    callback.call(undefined, xhr.response);
                }
            }
        };
        if ('undefined' !== typeof run) {
            if (!run) {
                /* Send request */
                var send = function () {
                    xhr.send('POST' == method ? args : null);
                };
                return {
                    xhr: xhr,
                    send: send,
                };
            }
        }
        xhr.send('POST' == method ? args : null);
        return {
            xhr: xhr,
        };
    };
    base.scrollTo = function scrollTo(to, callback, duration) {
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) {
                return (c / 2) * t * t + b;
            }
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        function scrollTo(to, callback, duration) {
            this.start = this.position();
            this.change = to - this.start;
            this.currentTime = 0;
            this.increment = 20;
            this.duration = 'undefined' === typeof duration ? 500 : duration;
            this.callback = callback;
            this.finish = false;
            this.animateScroll();
        }

        scrollTo.prototype.stop = function () {
            this.finish = true;
        };

        scrollTo.prototype.move = function (amount) {
            base.doc.documentElement.scrollTop = amount;
            base.globalBody.parentNode.scrollTop = amount;
            base.globalBody.scrollTop = amount;
        };

        scrollTo.prototype.position = function () {
            return base.doc.documentElement.scrollTop || base.globalBody.parentNode.scrollTop || base.globalBody.scrollTop;
        };

        scrollTo.prototype.animateScroll = function () {
            this.currentTime += this.increment;
            var val = Math.easeInOutQuad(this.currentTime, this.start, this.change, this.duration);
            this.move(val);
            if (this.currentTime < this.duration && !this.finish) {
                base.requestAnimationFrame.call(base.win, this.animateScroll.bind(this));
            } else {
                if (this.callback && 'function' === typeof this.callback) {
                    this.callback();
                }
            }
        };

        return new scrollTo(to, callback, duration);
    };
    base.unwrap = function unwrap(ele) {
        var parent = ele,
            childrens;
        base.forEach(ele, function (ele, i) {
            if (!childrens) {
                childrens = ele;
            } else {
                childrens += ele;
            }
        });
        parent.replaceWith(childrens);
    };
    base.performance = {
        start: function performanceStart(name) {
            performance.mark(name + 'Start');
        },
        stop: function performanceStop(name) {
            performance.mark(name + 'End');
            performance.measure(name, name + 'Start', name + 'End');
        },
    };
    base.fps = function () {
        var startTime = 0,
            currentTime = 0,
            frameNumber = 0,
            init = function () {
                var start = (startTime = 0),
                    fps = 0,
                    second = 0,
                    element = document.getElementById('fpsTable'),
                    inject = function (element) {
                        if (typeof document.getElementsByTagName('body')[0] === 'undefined') {
                            base.requestAnimationFrame.call(base.win, function () {
                                inject(element);
                            });
                        } else {
                            document.getElementsByTagName('body')[0].appendChild(element);
                        }
                    };
                if (element === null) {
                    element = document.createElement('div');
                    element.style.position = 'fixed';
                    element.style.top = '120px';
                    element.style.left = '10px';
                    element.style.width = '100px';
                    element.style.height = '20px';
                    element.style.border = '1px solid black';
                    element.style.fontSize = '11px';
                    element.style.zIndex = '100000';
                    element.style.backgroundColor = 'white';
                    element.id = 'fpsTable';

                    inject(element);
                }
                var calculate = function () {
                    frameNumber++;
                    currentTime = Date.now();
                    second = (currentTime - startTime) / 1e3;
                    fps = (frameNumber / second).toPrecision(2);
                    if (fps != start) {
                        start = fps;
                        element.innerHTML = start + 'fps';
                    }
                    if (1 < second) {
                        startTime = currentTime;
                        frameNumber = 0;
                    }
                    base.requestAnimationFrame.call(base.win, calculate);
                };
                calculate();
            };
        init();
    };
    base.instr = function instr(a, b) {
        for (var c = 0; c < b.length; c++) {
            if (-1 !== a.toLowerCase().indexOf(b[c].toLowerCase())) {
                return !0;
            }
        }
    };
    base.winLoad = function winLoad(cb, timeout) {
        function c(c) {
            if ('complete' === base.doc.readyState || 'interactive' === base.doc.readyState) return !c || timeout ? setTimeout(cb, timeout || 1) : cb(c), 1;
        }
        c() || base.addEvents(base.win, { load: c });
    };
    base.docReady = function docReady(cb, timeout) {
        function c(c) {
            if ('complete' === base.doc.readyState || 'interactive' === base.doc.readyState) return !c || timeout ? setTimeout(cb, timeout || 1) : cb(c), 1;
        }
        c() || base.addEvents(base.doc, { DOMContentLoaded: c });
    };
    base.fireOnce = function fireOnce() {
        base.docReady(function () {
            base.assets = base.assets || [];
            if (base.assets.length) {
                base.boot();
                base.load_assets();
            }
        }, 50);
    };
    base.boot = function boot() {
        if (base.length) {
            base.doc.querySelectorAll('style[media]').forEach(function (a) {
                'not all' == a.getAttribute('media') && a.removeAttribute('media');
            });
        }
    };
    base.create_js = function create_js(url, status) {
        var s = base.doc.createElement('script');
        s.setAttribute('src', url);
        switch (status) {
            case 'defer':
                s.setAttribute('defer', true);
                break;
            case 'async':
                s.setAttribute('async', true);
                break;
            case 'deferasync':
                s.setAttribute('defer', true);
                s.setAttribute('async', true);
                break;
        }
        base.globalBody.appendChild(s);
    };
    base.load_assets = function load_assets() {
        if ('object' === typeof base.assets) {
            base.forEach(base.assets.slice(0), function (ele, i) {
                var status = '';
                if (ele.defer) {
                    status += 'defer';
                }
                if (ele.async) {
                    status += 'async';
                }
                base.create_js(ele.url, status);
                var index = base.assets.indexOf(ele);
                if (index > -1) {
                    base.assets.splice(index, 1);
                }
            });
        }
        base.assets = GVNewsConfig.au_scripts = window.gvnewsads = [];
    };
    base.setCookie = function setCookie(name, value, days) {
        var expires = '';
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    };
    base.getCookie = function getCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    base.eraseCookie = function eraseCookie(name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };
    base.docReady(function () {
        base.globalBody = base.globalBody == base.doc ? base.doc.getElementsByTagName('body')[0] : base.globalBody;
        base.globalBody = base.globalBody ? base.globalBody : base.doc;
    });
    base.winLoad(function () {
        base.winLoad(function () {
            var show_notice = false;
            if ('undefined' !== typeof window.gvnewsadmin) {
                if ('undefined' !== typeof window.file_version_checker) {
                    var version_check = base.objKeys(window.file_version_checker);
                    if (version_check.length) {
                        version_check.forEach(function (key) {
                            if (!show_notice && window.file_version_checker[key] !== '10.0.4') {
                                show_notice = true;
                            }
                        });
                    } else {
                        show_notice = true;
                    }
                } else {
                    show_notice = true;
                }
            }
            if (show_notice) {
                window.gvnewsHelper.getMessage();
                window.gvnewsHelper.getNotice();
            }
        }, 2500);
    });
};
window.gvnews.library = new window.gvnews.library();
