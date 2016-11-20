function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++)i[t] = e[t];
        return i
    }
    return Array.from(e)
}
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++)i[t] = e[t];
        return i
    }
    return Array.from(e)
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = Array(e.length); t < e.length; t++)i[t] = e[t];
        return i
    }
    return Array.from(e)
}
top !== window && (xalert("For security reasons, framing is not allowed."), top.location.replace(document.location)), function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-ajax-pagination", function (t, i, n, o) {
        this.replaceWith.apply(this, e.parseHTML(o))
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0;
    i = require("github/inspect")["default"], n = require("github/failbot").reportError, t = function (e) {
        return Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.name = "DataRemoteError", this.message = e
    }, t.prototype = new Error, t.prototype.constructor = t, o = function () {
        return e("#ajax-error-message").show(function () {
            return e(this).addClass("visible")
        })
    }, e(document).on("ajaxError", "[data-remote]", function (e, r, s, a) {
        var u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0;
        if (this === e.target && "abort" !== a && "canceled" !== a) {
            if (c = "." + this.className.split(" ").sort().join("."), u = new t(a + " (" + r.status + ") from " + c), n(u, {
                    dataRemote: {
                        target: i(this),
                        method: null != (l = this.getAttribute("method")) ? l : "GET",
                        url: null != (d = null != (h = this.href) ? h : this.action) ? d : window.location.href,
                        dataType: null != (f = this.getAttribute("data-type")) ? f : "intelligent guess"
                    }
                }), /<html/.test(r.responseText))throw o(), e.stopImmediatePropagation(), u;
            return setTimeout(function () {
                if (!e.isDefaultPrevented())throw o(), u
            }, 0)
        }
    }), e(document).on("ajaxSend", "[data-remote]", function () {
        return e("#ajax-error-message").hide().removeClass("visible")
    }), e(document).on("click", ".js-ajax-error-dismiss", function () {
        return e("#ajax-error-message").hide().removeClass("visible"), !1
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSend", "[data-remote]", function (t) {
        return this !== t.target || t.isDefaultPrevented() ? void 0 : e(this).addClass("loading")
    }), e(document).on("ajaxComplete", "[data-remote]", function (t) {
        return this === t.target ? e(this).removeClass("loading") : void 0
    })
}.call(this), function () {
    var e = void 0, t = void 0, i = void 0, n = {}.hasOwnProperty, o = [].slice;
    i = function (e) {
        return console && console.warn ? console.warn(e) : void 0
    }, e = {
        host: "collector.githubapp.com",
        type: "page_view",
        dimensions: {},
        measures: {},
        context: {},
        actor: {},
        image: new Image,
        performance: {},
        expectedPerformanceTimingKeys: ["connectEnd", "connectStart", "domComplete", "domContentLoadedEventEnd", "domContentLoadedEventStart", "domInteractive", "domLoading", "domainLookupEnd", "domainLookupStart", "fetchStart", "loadEventEnd", "loadEventStart", "navigationStart", "redirectEnd", "redirectStart", "requestStart", "responseEnd", "responseStart", "secureConnectionStart", "unloadEventEnd", "unloadEventStart"],
        recordPageView: function () {
            return this.applyMetaTags(), null == this.app ? !1 : null == this.host ? (i("Host not set, you are doing something wrong"), !1) : (this.image.src = this._src(), this._clearPerformance(), !0)
        },
        setHost: function (e) {
            return this.host = e
        },
        setApp: function (e) {
            return this.app = e
        },
        setDimensions: function (e) {
            return this.dimensions = e
        },
        addDimensions: function (e) {
            var t = void 0, i = void 0, o = void 0;
            null == this.dimensions && (this.dimensions = {}), i = [];
            for (t in e)n.call(e, t) && (o = e[t], i.push(this.dimensions[t] = o));
            return i
        },
        setMeasures: function (e) {
            return this.measures = e
        },
        addMeasures: function (e) {
            var t = void 0, i = void 0, o = void 0;
            null == this.measures && (this.measures = {}), i = [];
            for (t in e)n.call(e, t) && (o = e[t], i.push(this.measures[t] = o));
            return i
        },
        setContext: function (e) {
            return this.context = e
        },
        addContext: function (e) {
            var t = void 0, i = void 0, o = void 0;
            null == this.context && (this.context = {}), i = [];
            for (t in e)n.call(e, t) && (o = e[t], i.push(this.context[t] = o));
            return i
        },
        setActor: function (e) {
            return this.actor = e
        },
        push: function (e) {
            return this.applyCall(e)
        },
        enablePerformance: function () {
            return this.performance = this._performanceTiming()
        },
        _recordSrc: function (e, t, i, n) {
            return "//" + this.host + "/" + this.app + "/" + e + "?" + this._queryString(t, i, n)
        },
        _src: function () {
            return "//" + this.host + "/" + this.app + "/" + this.type + "?" + this._queryString()
        },
        _queryString: function (e, t, i) {
            var n = void 0, o = void 0, r = void 0;
            return o = function () {
                var e = void 0, t = void 0;
                e = this._params(), t = [];
                for (n in e)r = e[n], t.push("dimensions[" + n + "]=" + r);
                return t
            }.call(this), o.push(this._encodeObject("dimensions", this._merge(this.dimensions, e))), o.push(this._encodeObject("measures", this._merge(this.measures, t))), null != this.performance && o.push(this._encodeObject("measures", {performance_timing: this.performance})), o.push(this._encodeObject("context", this._merge(this.context, i))), o.push(this._actor()), o.push(this._encodeObject("dimensions", {cid: this._clientId()})), o.join("&")
        },
        _clearPerformance: function () {
            return this.performance = null
        },
        _performanceTiming: function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
            if (null == window.performance || null == window.performance.timing || null == window.performance.timing.navigationStart)return null;
            for (u = {}, s = this.expectedPerformanceTimingKeys, t = 0, n = s.length; n > t; t++)i = s[t], u[i] = null != (a = window.performance.timing[i]) ? a : 0;
            l = 1, r = [], e = u.navigationStart;
            for (i in u)c = u[i], o = 0 === c ? null : c - e, r.push(o);
            return l + "-" + r.join("-")
        },
        _params: function () {
            return {
                page: this._encode(this._page()),
                title: this._encode(this._title()),
                referrer: this._encode(this._referrer()),
                user_agent: this._encode(this._agent()),
                screen_resolution: this._encode(this._screenResolution()),
                pixel_ratio: this._encode(this._pixelRatio()),
                browser_resolution: this._encode(this._browserResolution()),
                tz_seconds: this._encode(this._tzSeconds()),
                timestamp: (new Date).getTime()
            }
        },
        _page: function () {
            try {
                return document.location.href
            } catch (e) {
            }
        },
        _title: function () {
            try {
                return document.title
            } catch (e) {
            }
        },
        _referrer: function () {
            var e = void 0;
            e = "";
            try {
                e = window.top.document.referrer
            } catch (t) {
                if (window.parent)try {
                    e = window.parent.document.referrer
                } catch (t) {
                }
            }
            return "" === e && (e = document.referrer), e
        },
        _agent: function () {
            try {
                return navigator.userAgent
            } catch (e) {
            }
        },
        _screenResolution: function () {
            try {
                return screen.width + "x" + screen.height
            } catch (e) {
                return "unknown"
            }
        },
        _pixelRatio: function () {
            return window.devicePixelRatio
        },
        _browserResolution: function () {
            var e = void 0, t = void 0;
            try {
                return t = 0, e = 0, "number" == typeof window.innerWidth ? (t = window.innerWidth, e = window.innerHeight) : null != document.documentElement && null != document.documentElement.clientWidth ? (t = document.documentElement.clientWidth, e = document.documentElement.clientHeight) : null != document.body && null != document.body.clientWidth && (t = document.body.clientWidth, e = document.body.clientHeight), t + "x" + e
            } catch (i) {
                return "unknown"
            }
        },
        _tzSeconds: function () {
            try {
                return -60 * (new Date).getTimezoneOffset()
            } catch (e) {
                return ""
            }
        },
        _merge: function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, r = void 0, s = void 0, a = void 0;
            for (s = 1 <= arguments.length ? o.call(arguments, 0) : [], n = {}, e = 0, i = s.length; i > e; e++) {
                r = s[e];
                for (t in r)a = r[t], n[t] = a
            }
            return n
        },
        _encodeObject: function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
            if (r = [], null != Array.isArray && Array.isArray(t) || "[object Array]" === Object.prototype.toString.call(t))for (n = 0, o = t.length; o > n; n++)i = t[n], r.push(this._encodeObject(e + "[]", i)); else if (t === Object(t))for (s in t)r.push(this._encodeObject(e + "[" + s + "]", t[s])); else r.push(e + "=" + this._encode(t));
            return r.join("&")
        },
        _actor: function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            t = [], s = this.actor;
            for (o in s)if (a = s[o], e = "dimensions[actor_" + o + "]", a.join)for (n = 0, r = a.length; r > n; n++)i = a[n], t.push(e + "[]=" + this._encode(i)); else t.push(e + "=" + this._encode(a));
            return t.join("&")
        },
        _getCookie: function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
            for (s = [], r = document.cookie.split(";"), i = 0, o = r.length; o > i; i++)t = r[i], a = t.trim().split("="), a.length < 2 || (n = a[0], u = a[1], n === e && s.push({
                key: n,
                value: u
            }));
            return s
        },
        _clientId: function () {
            var e = void 0;
            return e = this._getClientId(), "" === e && (e = this._setClientId()), e
        },
        _getClientId: function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
            for (n = this._getCookie("_octo"), t = [], r = 0, s = n.length; s > r; r++)i = n[r], a = i.value.split("."), o = a.shift(), "GH1" === o && a.length > 1 && (u = a.shift().split("-"), 1 === u.length && (u[1] = "1"), u[0] *= 1, u[1] *= 1, e = a.join("."), t.push([u, e]));
            return e = "", t.length > 0 && (e = t.sort().reverse()[0][1]), e
        },
        _setClientId: function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
            return o = (new Date).getTime(), e = Math.round(Math.random() * (Math.pow(2, 31) - 1)) + "." + Math.round(o / 1e3), t = "GH1.1." + e, n = new Date(o + 63072e6).toGMTString(), i = "." + document.domain.split(".").reverse().slice(0, 2).reverse().join("."), document.cookie = "_octo=" + t + "; expires=" + n + "; path=/; domain=" + i, e
        },
        _encode: function (e) {
            return null != e ? window.encodeURIComponent(e) : ""
        },
        applyQueuedCalls: function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0;
            for (o = [], i = 0, n = e.length; n > i; i++)t = e[i], o.push(this.applyCall(t));
            return o
        },
        applyCall: function (e) {
            var t = void 0, n = void 0;
            return n = e[0], t = e.slice(1), this[n] ? this[n].apply(this, t) : i(n + " is not a valid method")
        },
        applyMetaTags: function () {
            var e = void 0;
            return e = this.loadMetaTags(), e.host && this.setHost(e.host), e.app && this.setApp(e.app), this._objectIsEmpty(e.actor) || this.setActor(e.actor), this.addDimensions(e.dimensions), this.addMeasures(e.measures), this.addContext(e.context)
        },
        loadMetaTags: function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
            for (o = {
                dimensions: {},
                measures: {},
                context: {},
                actor: {}
            }, n = document.getElementsByTagName("meta"), e = 0, t = n.length; t > e; e++)if (i = n[e], i.name && i.content) {
                var r = i.name.match(this.octolyticsMetaTagName);
                if (r)switch (r[1]) {
                    case"host":
                        o.host = i.content;
                        break;
                    case"app-id":
                        o.app = i.content;
                        break;
                    case"app":
                        o.app = i.content;
                        break;
                    case"dimension":
                        this._addField(o.dimensions, r[2], i);
                        break;
                    case"measure":
                        this._addField(o.measures, r[2], i);
                        break;
                    case"context":
                        this._addField(o.context, r[2], i);
                        break;
                    case"actor":
                        this._addField(o.actor, r[2], i)
                }
            }
            return o
        },
        _addField: function (e, t, i) {
            return i.attributes["data-array"] ? (null == e[t] && (e[t] = []), e[t].push(i.content)) : e[t] = i.content
        },
        _objectIsEmpty: function (e) {
            var t = void 0;
            for (t in e)if (n.call(e, t))return !1;
            return !0
        },
        octolyticsMetaTagName: /^octolytics-(host|app-id|app|dimension|measure|context|actor)-?(.*)/
    }, window._octo ? window._octo.slice && (t = window._octo.slice(0), window._octo = e, window._octo.applyQueuedCalls(t)) : window._octo = e
}.call(this), function () {
    var e = require("github/document-ready"), t = e.ready;
    t.then(function () {
        _octo.push(["enablePerformance"]), _octo.push(["recordPageView"])
    }), document.addEventListener("pjax:complete", function () {
        _octo.push(["recordPageView"])
    })
}(), function () {
    function e() {
        u(this)
    }

    var t = require("github/jquery")["default"], i = require("github/visible")["default"], n = require("github/focused")["default"], o = require("github/throttled-input"), r = o.addThrottledInputEventListener, s = o.removeThrottledInputEventListener, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0;
    a = require("github/sliding-promise-queue")["default"], d = require("delegated-events").fire, l = require("github/fetch").fetchText, v = new WeakMap, f = new WeakMap, h = function (e, i) {
        var n = void 0;
        return (n = v.get(e)) || (n = new a, v.set(e, n)), i.value.trim() ? (i.authenticity_token = null != e.form.elements.authenticity_token ? e.form.elements.authenticity_token.value : void 0, n.push(l(e.getAttribute("data-autocheck-url"), {
            method: "post",
            body: t.param(i),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }))) : Promise.reject(new Error("empty"))
    }, c = function (e) {
        return m(e), e.classList.add("errored"), t(e).find("p.note").hide()
    }, m = function (e) {
        return e.classList.remove("errored"), e.classList.remove("warn"), t(e).find("p.note").show(), t(e).find("dd.error").remove(), t(e).find("dd.warning").remove()
    }, u = function (e) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, l = void 0;
        return n = t(e), r = {value: e.value}, d(e, "autocheck:send", r), s = t.param(r).split("&").sort().join("&"), s !== f.get(e) ? (f.set(e, s), n.closest("dl.form-group").removeClass("errored successed"), e.classList.remove("is-autocheck-successful", "is-autocheck-errored"), l = function (t) {
            return e.classList.toggle("is-autocheck-loading", t), n.closest("dl.form-group").toggleClass("is-loading", t)
        }, o = function () {
            return l(!1), d(e, "autocheck:complete")
        }, a = function (t) {
            var i = void 0;
            return e.classList.add("is-autocheck-successful"), i = e.closest("dl.form-group"), m(i), i.classList.add("successed"), d(e, "autocheck:success", t), o()
        }, u = function (t) {
            var n = void 0, r = void 0;
            return n = e.closest("dl.form-group"), "empty" === t.message ? m(n) : i(e) && (e.classList.add("is-autocheck-errored"), r = (null != t.response ? t.response.text() : void 0) || Promise.resolve("Something went wrong"), r.then(function (i) {
                var o = void 0;
                return /<html/.test(i) && (i = "Something went wrong."), c(n), o = document.createElement("dd"), o.classList.add("error"), null != t.response && t.response.headers.get("Content-Type").match("text/html") ? o.innerHTML = i : o.textContent = i, n.append(o), d(e, "autocheck:error")
            })), o()
        }, l(!0), h(e, r).then(a, u)) : void 0
    }, t(document).on("change", "input[data-autocheck-url]", function () {
        u(this)
    }), n(document, "input[data-autocheck-url]", {
        focusin: function () {
            r(this, e, {wait: 300})
        }, focusout: function () {
            s(this, e)
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/observe"), n = i.observe, o = require("github/throttled-input"), r = o.addThrottledInputEventListener, s = o.removeThrottledInputEventListener, a = require("github/navigation").focus, u = require("github/navigation").pop, c = require("github/navigation").push, l = void 0, d = void 0, h = void 0, f = void 0, v = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    d = require("github/sliding-promise-queue")["default"], f = require("github/fetch").fetchText, l = function () {
        function i() {
            this.onNavigationOpen = v(this.onNavigationOpen, this), this.onNavigationKeyDown = v(this.onNavigationKeyDown, this), this.onInputChange = v(this.onInputChange, this), this.onResultsMouseDown = v(this.onResultsMouseDown, this), this.onInputBlur = v(this.onInputBlur, this), this.onInputFocus = v(this.onInputFocus, this), this.focusedInput = this.focusedResults = null, this.mouseDown = !1, this.fetchQueue = new d
        }

        return i.prototype.bindEvents = function (t, i) {
            return e(t).on("blur", this.onInputBlur), r(t, this.onInputChange), e(i).on("mousedown", this.onResultsMouseDown), e(i).on("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), e(i).on("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
        }, i.prototype.unbindEvents = function (t, i) {
            return e(t).off("blur", this.onInputBlur), s(t, this.onInputChange), e(i).off("mousedown", this.onResultsMouseDown), e(i).off("navigation:open", "[data-autocomplete-value]", this.onNavigationOpen), e(i).off("navigation:keydown", "[data-autocomplete-value]", this.onNavigationKeyDown)
        }, i.prototype.onInputFocus = function (t) {
            var i = void 0, n = void 0;
            i = e(t).closest(".js-autocomplete-container"), n = i.find(".js-autocomplete")[0], this.focusedInput = t, this.focusedResults = n, this.bindEvents(t, n), e(t).attr("autocomplete", "off"), e(t).trigger("autocomplete:focus"), this.fetchResults(t.value)
        }, i.prototype.onInputBlur = function () {
            var t = void 0, i = void 0;
            t = this.focusedInput, i = this.focusedResults, this.mouseDown || (this.hideResults(), this.inputValue = null, this.focusedInput = this.focusedResults = null, this.unbindEvents(t, i), e(t).trigger("autocomplete:blur"))
        }, i.prototype.onResultsMouseDown = function () {
            var t = void 0;
            this.mouseDown = !0, t = function (i) {
                return function () {
                    return i.mouseDown = !1, e(document).off("mouseup", t)
                }
            }(this), e(document).on("mouseup", t)
        }, i.prototype.onInputChange = function (t) {
            var i = void 0;
            i = t.currentTarget, this.inputValue !== i.value && (e(i).removeData("autocompleted"), e(i).trigger("autocomplete:autocompleted:changed")), this.fetchResults(i.value)
        }, i.prototype.fetchResults = function (t) {
            var i = void 0, n = void 0, o = void 0, r = this.focusedResults.getAttribute("data-search-url");
            return r ? (i = e(this.focusedInput).closest(".js-autocomplete-container"), o = t.trim() ? (r += ~r.indexOf("?") ? "&" : "?", r += "q=" + encodeURIComponent(t), i.addClass("is-sending"), f(r)) : e(this.focusedResults).find("[data-autocomplete-value]").length > 0 ? this.hideResults() : Promise.resolve(""), n = function () {
                return i.removeClass("is-sending")
            }, this.fetchQueue.push(o).then(function (i) {
                return function (n) {
                    return e(i.focusedResults).find(".js-autocomplete-results").html(n), i.onResultsChange(t)
                }
            }(this)).then(n, n)) : void 0
        }, i.prototype.onResultsChange = function (t) {
            var i = void 0;
            if (i = e(this.focusedResults).find("[data-autocomplete-value]"), 0 === i.length)this.hideResults(); else if (this.inputValue !== t && (this.inputValue = t, this.showResults(), e(this.focusedInput).is("[data-autocomplete-autofocus]"))) {
                var n = this.focusedResults.querySelector(".js-navigation-container");
                n && a(n)
            }
        }, i.prototype.onNavigationKeyDown = function (e) {
            switch (e.hotkey) {
                case"tab":
                    return this.onNavigationOpen(e), !1;
                case"esc":
                    return this.hideResults(), !1
            }
        }, i.prototype.onNavigationOpen = function (t) {
            var i = void 0, n = void 0;
            i = t.currentTarget, i.classList.contains("disabled") || (n = e(i).attr("data-autocomplete-value"), this.inputValue = n, e(this.focusedInput).val(n), e(this.focusedInput).data("autocompleted", n), e(this.focusedInput).trigger("autocomplete:autocompleted:changed", [n]), e(this.focusedInput).trigger("autocomplete:result", [n]), e(i).removeClass("active"), this.focusedInput === document.activeElement ? this.hideResults() : this.onInputBlur())
        }, i.prototype.showResults = function (i, n) {
            var o = void 0, r = void 0, s = void 0, a = void 0;
            if (null == i && (i = this.focusedInput), null == n && (n = this.focusedResults), !t(n)) {
                r = e(i).offset(), s = r.top, o = s + e(i).innerHeight(), a = e(i).innerWidth(), e(n).css({
                    display: "block",
                    position: "absolute",
                    width: a + 2
                }), e(n).offset({top: o + 5}), e(i).addClass("js-navigation-enable");
                var u = n.querySelector(".js-navigation-container");
                return u && c(u), e(n).show()
            }
        }, i.prototype.hideResults = function (i, n) {
            if (null == i && (i = this.focusedInput), null == n && (n = this.focusedResults), this.inputValue = null, n && t(n)) {
                e(i).removeClass("js-navigation-enable");
                var o = n.querySelector(".js-navigation-container");
                return o && u(o), e(n).hide()
            }
        }, i
    }(), h = new l, e(document.activeElement).is(".js-autocomplete-field") && h.onInputFocus(document.activeElement), n(".js-autocomplete-field", function () {
        e(this).on("focus", function () {
            return h.onInputFocus(this)
        })
    })
}.call(this), function () {
    function e() {
        var e, i, o, s, a;
        return regeneratorRuntime.async(function (u) {
            for (; ;)switch (u.prev = u.next) {
                case 0:
                    return e = this.form, e.classList.add("is-sending"), u.prev = 2, i = t(e).serialize(), o = (e.action + "&" + i).replace(/[?&]/, "?"), u.next = 7, regeneratorRuntime.awrap(d.push(n(o)));
                case 7:
                    return s = u.sent, a = document.getElementById(e.getAttribute("data-results-container")), a.innerHTML = s, u.abrupt("return", r(null, "", "?" + i));
                case 11:
                    return u.prev = 11, e.classList.remove("is-sending"), u.finish(11);
                case 14:
                case"end":
                    return u.stop()
            }
        }, null, this, [[2, , 11, 14]])
    }

    var t = require("github/jquery")["default"], i = require("github/fetch"), n = i.fetchText, o = require("github/history"), r = o.replaceState, s = require("github/sliding-promise-queue")["default"], a = require("github/focused")["default"], u = require("github/throttled-input"), c = u.addThrottledInputEventListener, l = u.removeThrottledInputEventListener, d = new s;
    a(document, ".js-autosearch-field", {
        focusin: function () {
            c(this, e)
        }, focusout: function () {
            l(this, e)
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("change", "form[data-autosubmit]", function () {
        return e(this).submit()
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/observe"), n = i.observe, o = require("github/throttled-input"), r = o.addThrottledInputEventListener, s = void 0, a = void 0, u = void 0, c = void 0;
    s = require("github/pjax"), a = require("github/history").replaceState, c = null, u = function () {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, u = void 0, l = void 0;
        return c && c.abort(), u = e(this).attr("data-item-name") || "items", l = parseInt(e(this).attr("data-item-minimum")) || 0, o = parseInt(e(this).attr("data-item-count")) || 0, r = Math.max(l, parseInt(this.value) || 0), t = r > 300, e(".js-purchase-button").prop("disabled", 0 === r || t), e(".js-downgrade-button").prop("disabled", r === o), i = {}, i[u] = r, c = e.ajax({
            url: e(this).attr("data-url"),
            data: i
        }), n = function (i) {
            var n = void 0, o = void 0, u = void 0;
            e(".js-contact-us").toggleClass("d-none", !t), e(".js-payment-summary").toggleClass("d-none", t), e(".js-billing-section").toggleClass("has-removed-contents", i.free), e(".js-upgrade-info").toggleClass("d-none", 0 >= r), e(".js-downgrade-info").toggleClass("d-none", r >= 0), e(".js-extra-seats-line-item").toggleClass("d-none", i.no_additional_seats), n = i.selectors;
            for (o in n)u = n[o], e(o).text(u);
            return a(s.getState(), null, i.url)
        }, c.then(n)
    }, n(".js-addon-purchase-field", function () {
        return r(this, u), {
            add: function () {
                t(this) && u.call(e(".js-addon-purchase-field")[0])
            }
        }
    }), n(".js-addon-downgrade-field", function () {
        return e(this).on("change", u), {
            add: function () {
                t(this) && u.call(e(".js-addon-downgrade-field")[0])
            }
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0, o = [].indexOf || function (e) {
            for (var t = 0, i = this.length; i > t; t++)if (t in this && this[t] === e)return t;
            return -1
        };
    i(".js-card-select-number-field", {
        add: function () {
            e(this).payment("formatCardNumber")
        }
    }), i(".js-card-cvv", {
        add: function () {
            e(this).payment("formatCardCVC")
        }
    }), i(".js-card-select-number-field", function () {
        var t = void 0, i = void 0, n = void 0;
        i = e(this).closest("form"), t = i.find(".js-card"), n = i.find(".js-card-select-type-field"), e(this).on("input", function () {
            var i = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            if (a = e(this).val(), s = e.payment.cardType(a))for (o = 0, r = t.length; r > o; o++)i = t[o], e(i).toggleClass("enabled", e(i).attr("data-name") === s), e(i).toggleClass("disabled", e(i).attr("data-name") !== s); else t.removeClass("enabled disabled");
            n.val(s)
        })
    }), e(document).on("blur", ".js-card-select-number-field", function () {
        e(this).val(e.payment.formatCardNumber(e(this).val()))
    }), e(document).on("click", ".js-card", function () {
        var t = void 0, i = void 0;
        t = e(this).closest("form"), i = t.find(".js-card-select-number-field"), i.focus()
    }), e(document).on("click", ".js-enter-new-card", function (t) {
        var i = void 0, n = void 0;
        i = e(this).closest(".js-setup-creditcard"), n = i.find(".js-card-select-number-field"), i.removeClass("has-credit-card"), n.attr("required", "required"), n.attr("data-encrypted-name", "billing[credit_card][number]"), t.preventDefault()
    }), e(document).on("click", ".js-cancel-enter-new-card", function (t) {
        var i = void 0, n = void 0;
        i = e(this).closest(".js-setup-creditcard"), n = i.find(".js-card-select-number-field"), i.addClass("has-credit-card"), n.removeAttr("required"), n.removeAttr("data-encrypted-name"), t.preventDefault()
    }), n = function (t) {
        var i = void 0, n = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
        n = t.find("option:selected").text(), s = {
            Austria: "ATU000000000",
            Belgium: "BE0000000000",
            Bulgaria: "BG000000000...",
            Croatia: "",
            Cyprus: "CY000000000X",
            "Czech Republic": "CZ00000000...",
            Denmark: "DK00 00 00 00",
            Estonia: "EE000000000",
            Finland: "FI00000000",
            France: "FRXX 000000000",
            Germany: "DE000000000",
            Greece: "EL000000000",
            Hungary: "HU00000000",
            Iceland: "",
            Ireland: "IE...",
            Italy: "IT00000000000",
            Latvia: "LV00000000000",
            Lithuania: "LT000000000...",
            Luxembourg: "LU00000000",
            Malta: "MT00000000",
            Netherlands: "NL000000000B00",
            Norway: "",
            Poland: "PL0000000000",
            Portugal: "PT000000000",
            Romania: "RO...",
            Slovakia: "SK0000000000",
            Slovenia: "",
            Spain: "ES...",
            Sweden: "SE000000000000",
            Switzerland: "",
            "United Kingdom": "GB..."
        }, r = ["Angola", "Antigua and Barbuda", "Aruba", "Bahamas", "Belize", "Benin", "Botswana", "Cameroon", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Cook Islands", "C\xf4te d'Ivoire", "Djibouti", "Dominica", "Fiji", "French Southern Lands", "Ghana", "Guyana", "Hong Kong", "Ireland", "Kiribati", "Korea, North", "Malawi", "Maritania", "Mauritius", "Montserrat", "Nauru", "Niue", "Qatar", "Saint Kitts and Nevis", "Saint Lucia", "Sao Tome and Principe", "Seychelles", "Sierra Leone", "Sint Maarten (Dutch part)", "Solomon Islands", "Somalia", "Suriname", "Syria", "Togo", "Tokelau", "Tonga", "United Arab Emirates", "Vanuatu", "Yemen", "Zimbabwe"], a = s[n], e(".js-setup-creditcard").toggleClass("is-vat-country", null != a), u = null != a ? "(" + a + ")" : "", i = t.parents(".js-setup-creditcard").find(".js-vat-help-text"), i.html(u), "United States of America" !== n ? (e(".js-setup-creditcard").addClass("is-international"), e(".js-select-state").removeAttr("required").val("")) : (e(".js-setup-creditcard").removeClass("is-international"), e(".js-select-state").attr("required", "required")), o.call(r, n) >= 0 ? (e(".js-setup-creditcard").addClass("no-postcodes"), e(".js-postal-code-field").removeAttr("required").val("")) : (e(".js-setup-creditcard").removeClass("no-postcodes"), e(".js-postal-code-field").attr("required", "required"))
    }, e(document).on("change", ".js-select-country", function () {
        n(e(this))
    }), i(".js-select-country", function () {
        n(e(this))
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe;
    e(document).on("change", ".js-payment-methods .js-payment-method", function () {
        var t = void 0, i = void 0;
        t = e(this).closest(".js-payment-methods"), i = e(this).attr("data-selected-tab"), t.find(".js-selected-payment-method").removeClass("active"), t.find("." + i).addClass("active")
    }), i(".js-selected-payment-method:not(.active)", {
        add: function () {
            e(this).addClass("has-removed-contents")
        }, remove: function () {
            e(this).removeClass("has-removed-contents")
        }
    }), i(".js-billing-payment-methods", function () {
        e(this).removeClass("disabled")
    }), e(document).on("click", ".js-toggle-change-payment-method", function () {
        var e = void 0;
        e = this.closest(".js-change-payment-method-container"), e.querySelector(".js-change-payment-method").classList.toggle("has-removed-contents"), e.querySelector(".js-current-payment-method").classList.toggle("d-none")
    })
}(), define("github/accessibility", ["exports", "./inspect"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e) {
        e.prototype = new Error, e.prototype.constructor = e
    }

    function o(e) {
        this.name = "ImageWithoutAltAttributeError", this.stack = (new Error).stack, this.element = e, this.message = "Missing alt attribute on " + f["default"](e)
    }

    function r(e) {
        this.name = "LinkWithoutLabelError", this.stack = (new Error).stack, this.element = e, this.message = "Missing text, title, or aria-label attribute on " + f["default"](e)
    }

    function s(e) {
        this.name = "LinkWithoutLabelOrRoleError", this.stack = (new Error).stack, this.element = e, this.message = "Missing href or role=button on " + f["default"](e)
    }

    function a(e) {
        this.name = "LabelMissingControl", this.stack = (new Error).stack, this.element = e, this.message = "Label missing control on " + f["default"](e)
    }

    function u(e) {
        this.name = "ButtonWithoutLabelError", this.stack = (new Error).stack, this.element = e, this.message = "Missing text or aria-label attribute on " + f["default"](e)
    }

    function c(e) {
        return "true" === e.getAttribute("aria-hidden") || e.closest('[aria-hidden="true"]')
    }

    function l(e) {
        return "string" == typeof e && !!e.trim()
    }

    function d(e) {
        switch (e.nodeType) {
            case Node.ELEMENT_NODE:
                if (l(e.getAttribute("alt")) || l(e.getAttribute("aria-label")))return !0;
                for (var t = e.childNodes, i = 0; i < t.length; i++) {
                    var n = t[i];
                    if (d(n))return !0
                }
                break;
            case Node.TEXT_NODE:
                return l(e.data)
        }
    }

    function h(e, t) {
        for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var l = i[n];
            l.hasAttribute("alt") || t(new o(l))
        }
        for (var h = e.querySelectorAll("a"), f = 0; f < h.length; f++) {
            var v = h[f];
            if (v.hasAttribute("name") || c(v))return;
            null == v.getAttribute("href") && "button" !== v.getAttribute("role") ? t(new s(v)) : d(v) || t(new r(v))
        }
        for (var m = e.querySelectorAll("button"), p = 0; p < m.length; p++) {
            var g = m[p];
            c(g) || d(g) || t(new u(g))
        }
        for (var b = e.querySelectorAll("label"), y = 0; y < b.length; y++) {
            var j = b[y], w = j.control || document.getElementById(j.getAttribute("for")) || j.querySelector("input");
            w || t(new a(j))
        }
        for (var x = e.querySelectorAll("input[type=text], textarea"), q = 0; q < x.length; q++) {
            var k = x[q];
            !k.labels || k.labels.length || c(k) || k.hasAttribute("aria-label") || t(new r(k))
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.scanForProblems = h;
    var f = i(t);
    n(o), n(r), n(s), n(a), n(u)
}), define("github/accessibility-report", ["./document-ready", "./failbot", "./accessibility"], function (e, t, i) {
    function n(e) {
        return document.body.classList.contains("zhio") || e.element.classList.contains("zh-login-status") || e.element.closest(".octotree_sidebar") || e.element.closest(".markdown-body")
    }

    function o(e) {
        if (!n(e)) {
            document.documentElement.classList.contains("is-staff") && console.warn(e.name + ": " + e.message);
            var i = document.querySelector("meta[name=accessibility-logger]");
            i && "1" === i.getAttribute("value") && t.reportError(e, {
                bucket: "github-accessibility",
                message: e.message,
                "class": e.name
            })
        }
    }

    e.ready.then(function () {
        requestIdleCallback(function () {
            i.scanForProblems(document, o)
        })
    }), document.addEventListener("pjax:end", function (e) {
        requestIdleCallback(function () {
            i.scanForProblems(e.target, o)
        })
    })
}), define("github/bulk-actions", ["delegated-events", "./sliding-promise-queue", "./debounce", "./fetch"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        var t, i, o, r, s, a, c, l, d, h, f, v, m, p, g, b;
        return regeneratorRuntime.async(function (y) {
            for (; ;)switch (y.prev = y.next) {
                case 0:
                    return t = e.target, i = Array.from(t.querySelectorAll(".js-bulk-actions-toggle:checked")), o = i.map(function (e) {
                        return e.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")
                    }).sort(), r = t.getAttribute("data-bulk-actions-url"), s = t.getAttribute("data-bulk-actions-parameter"), a = o.map(function (e) {
                        return s + "[]=" + e
                    }).join("&"), c = r + "?" + a, y.prev = 7, y.next = 10, regeneratorRuntime.awrap(u.push(n.fetchText(c)));
                case 10:
                    l = y.sent, d = t.querySelector(".js-bulk-actions"), d.innerHTML = l;
                case 13:
                    for (y.prev = 13, h = o.length > 0, f = t.querySelectorAll(".js-bulk-actions-show-on-selected"), v = 0; v < f.length; v++)m = f[v], m.classList.toggle("d-none", !h);
                    for (p = t.querySelectorAll(".js-bulk-actions-hide-on-selected"), g = 0; g < p.length; g++)b = p[g], b.classList.toggle("d-none", h);
                    return y.finish(13);
                case 20:
                case"end":
                    return y.stop()
            }
        }, null, this, [[7, , 13, 20]])
    }

    var s = o(t), a = o(i), u = new s["default"];
    e.on("change", ".js-bulk-actions-toggle", function () {
        var t = this.closest(".js-bulk-actions-container");
        e.fire(t, "bulk-actions:update")
    }), e.on("bulk-actions:update", ".js-bulk-actions-container", a["default"](r, 100))
}), define("github/once", ["exports"], function (e) {
    function t(e, t) {
        return new Promise(function (i) {
            e.addEventListener(t, function n(o) {
                e.removeEventListener(t, n), i(o)
            })
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = t
}), define("github/details", ["./hash-change", "delegated-events", "./once", "./perform-transition", "./setimmediate"], function (e, t, i, n, o) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var t = e.querySelectorAll("input[autofocus], textarea[autofocus]"), i = t[t.length - 1];
        i && document.activeElement !== i && i.focus()
    }

    function a(e) {
        e.classList.contains("tooltipped") && (e.classList.remove("tooltipped"), l["default"](e, "mouseleave").then(function () {
            return e.classList.add("tooltipped")
        }))
    }

    function u(e) {
        var t = e.closest(".js-edit-repository-meta");
        t && t.reset()
    }

    var c = r(e), l = r(i), d = r(n), h = r(o);
    t.on("click", ".js-details-target", function (e) {
        var t = this, i = t.getAttribute("data-details-container") || ".js-details-container", n = t.closest(i);
        d["default"](n, function () {
            n.classList.toggle("open"), h["default"](function () {
                s(n), a(t), u(t), t.blur && t.blur();
                var e = new CustomEvent("details:toggled", {bubbles: !0, cancelable: !1});
                e.relatedTarget = t, n.dispatchEvent(e)
            })
        }), e.preventDefault()
    }), c["default"](function (e) {
        for (var t = e.target; (t = t.parentNode) && t !== document.documentElement;)t.matches(".js-details-container") && t.classList.add("open")
    })
}), define("github/dismiss-notice", ["./jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = t(e);
    i["default"](document).on("ajaxSuccess", ".js-dismiss-notice", function () {
        this.closest(".js-dismissible-notice").classList.add("d-none")
    })
}), define("github/sticky-scroll-into-view", ["exports", "./fragment-target"], function (e, t) {
    function i(e) {
        if (Array.isArray(e)) {
            for (var t = 0, i = Array(e.length); t < e.length; t++)i[t] = e[t];
            return i
        }
        return Array.from(e)
    }

    function n(e) {
        var t = e.ownerDocument;
        e.scrollIntoView(), t.defaultView.scrollBy(0, -r(t))
    }

    function o(e) {
        var i = t.findFragmentTarget(e);
        i && n(i)
    }

    function r(e) {
        var t = e.querySelectorAll(".js-sticky-offset-scroll");
        return Math.max.apply(Math, i(Array.from(t).map(function (e) {
            var t = e.getBoundingClientRect(), i = t.top, n = t.height;
            return 0 === i ? n : 0
        })))
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.scrollToFragmentTarget = o, e.computeFixedYOffset = r
}), define("github/fixed-offset-fragment-navigation-observer", ["./sticky-scroll-into-view", "./hash-change"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n() {
        e.computeFixedYOffset(document) && e.scrollToFragmentTarget(document)
    }

    var o = i(t);
    o["default"](n)
}), define("github/gfm", ["delegated-events"], function (e) {
    e.on("click", ".email-hidden-toggle", function (e) {
        var t = this.nextElementSibling;
        t.style.display = "", t.classList.toggle("expanded"), e.preventDefault()
    })
}), define("github/git-clone-help", ["delegated-events"], function (e) {
    e.on("click", ".js-git-clone-help-container .js-git-clone-help-switcher", function () {
        var e = this.closest(".js-git-clone-help-container"), t = this.getAttribute("data-url");
        if (e.querySelector(".js-git-clone-help-field").value = t, this.matches(".js-git-protocol-clone-url"))for (var i = e.querySelectorAll(".js-git-clone-help-text"), n = 0; n < i.length; n++) {
            var o = i[n];
            o.textContent = t
        }
        var r = e.querySelector(".js-clone-url-button.selected");
        r && r.classList.remove("selected"), this.closest(".js-clone-url-button").classList.add("selected")
    })
}), define("github/google-analytics-overrides", ["exports", "./google-analytics"], function (e, t) {
    function i(e) {
        var t = document.querySelectorAll(e);
        return t.length > 0 ? t[t.length - 1] : void 0
    }

    function n() {
        var e = i("meta[name=analytics-location]");
        return e ? e.content : window.location.pathname
    }

    function o() {
        var e = i("meta[name=analytics-location-query-strip]"), t = "";
        e || (t = window.location.search);
        var n = i("meta[name=analytics-location-params]");
        n && (t += (t ? "&" : "?") + n.content);
        for (var o = document.querySelectorAll("meta[name=analytics-param-rename]"), r = 0; r < o.length; r++) {
            var s = o[r], a = s.content.split(":", 2);
            t = t.replace(new RegExp("(^|[?&])" + a[0] + "($|=)", "g"), "$1" + a[1] + "$2")
        }
        return t
    }

    function r() {
        return n() + o()
    }

    function s() {
        var e = document.title, t = i("meta[name=analytics-location]");
        return t && (e = e.replace(/([\w-]+\/)+[\w\.-]+/g, "private/private")), e
    }

    function a() {
        var e = window.location.protocol + "//" + window.location.host + r();
        t.setGlobalLocation(e), t.setGlobalTitle(s());
        for (var i = document.querySelectorAll("meta.js-ga-set"), n = 0; n < i.length; n++) {
            var o = i[n];
            t.setDimension(o.name, o.content)
        }
    }

    function u() {
        for (var e = document.querySelectorAll("meta[name=analytics-virtual-pageview]"), i = 0; i < e.length; i++) {
            var n = e[i];
            t.trackPageview(n.content, {title: ""})
        }
        t.trackPageview()
    }

    function c(e) {
        var t = e.trim().split(/\s*,\s*/);
        return {category: t[0], action: t[1], label: t[2], value: t[3]}
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateGlobalFields = a, e.trackPageviews = u, e.extractEventParams = c
}), define("github/google-analytics-tracking", ["./google-analytics-overrides", "./google-analytics", "./observe", "./document-ready"], function (e, t, i, n) {
    var o = document.querySelector("meta[name=google-analytics]");
    o && (t.setGlobalAccount(o.content, "github.com"), e.updateGlobalFields()), n.ready.then(function () {
        return e.trackPageviews()
    }), document.addEventListener("pjax:complete", function () {
        setTimeout(function () {
            e.updateGlobalFields(), e.trackPageviews()
        }, 20)
    }, !1), i.observe("[data-ga-load]", function () {
        var i = e.extractEventParams(this.getAttribute("data-ga-load"));
        i.interactive = !1, t.trackEvent(i)
    }), i.observe("meta[name=analytics-event]", function () {
        var i = e.extractEventParams(this.content);
        i.interactive = !1, t.trackEvent(i)
    }), window.addEventListener("click", function (i) {
        var n = void 0;
        if (i.target.closest && (n = i.target.closest("[data-ga-click]"))) {
            var o = e.extractEventParams(n.getAttribute("data-ga-click"));
            t.trackEvent(o)
        }
    }, !0)
}), define("github/homepage/play-video", ["delegated-events"], function (e) {
    function t(e, t) {
        void 0 === t && (t = 0);
        var i = e.getBoundingClientRect(), n = i.top - t, o = i.bottom - window.innerHeight + t;
        0 > n ? window.scrollBy(0, n) : o > 0 && window.scrollBy(0, o)
    }

    e.on("click", ".js-video-play, .js-video-close, .is-expanded", function (e) {
        e.preventDefault();
        var i = this, n = i.classList.contains("js-video-play"), o = i.closest(".js-video-container"), r = o.querySelector(".js-video-iframe"), s = document.querySelector(".js-video-bg");
        n ? r.src = r.getAttribute("data-src") : r.removeAttribute("src"), o.classList.toggle("is-expanded", n), s.classList.toggle("is-expanded", n), t(r, 20)
    })
}), define("github/link-prefetch-viewed", ["./observe"], function (e) {
    e.observe("link[rel=prefetch-viewed]", {
        init: function () {
            requestIdleCallback(function () {
                fetch(location.href, {
                    method: "HEAD",
                    credentials: "same-origin",
                    headers: {Purpose: "prefetch-viewed"}
                })
            })
        }
    })
}), define("github/perform-transition", ["exports", "./jquery"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e, t) {
        if (!a)return void t.apply(e);
        var i = s["default"](e).find(".js-transitionable");
        i = i.add(s["default"](e).filter(".js-transitionable"));
        for (var n = function (e, t) {
            var n = i[e], a = s["default"](n), u = o(n);
            a.one("transitionend", function () {
                n.style.display = null, n.style.visibility = null, u && r(n, function () {
                    n.style.height = null
                })
            }), n.style.display = "block", n.style.visibility = "visible", u && r(n, function () {
                n.style.height = a.height() + "px"
            }), n.offsetHeight
        }, u = 0, c = i.length; c > u; u++)n(u, c);
        t.apply(e);
        for (var l = 0, d = i.length; d > l; l++) {
            var h = i[l];
            o(h) && (0 === s["default"](h).height() ? h.style.height = h.scrollHeight + "px" : h.style.height = "0px")
        }
    }

    function o(e) {
        return "height" === s["default"](e).css("transitionProperty")
    }

    function r(e, t) {
        e.style.transition = "none", t(e), e.offsetHeight, e.style.transition = null
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = n;
    var s = i(t), a = "ontransitionend" in window
}), define("github/menu", ["exports", "./jquery", "./fire", "delegated-events", "./hotkey", "./observe", "./perform-transition"], function (e, t, i, n, o, r, s) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e) {
        p && c(p), n.fire(e, "menu:activate") && (h["default"](document).on("keydown.menu", d), h["default"](document).on("click.menu", l), p = e, m["default"](e, function () {
            e.classList.add("active");
            var t = e.querySelector(".js-menu-content [tabindex]");
            t && t.focus();
            var i = e.querySelector(".js-menu-content");
            i && (i.setAttribute("aria-hidden", "false"), i.setAttribute("aria-expanded", "true"));
            var n = e.querySelector(".js-menu-target");
            n && n.setAttribute("aria-expanded", "true")
        }), f["default"](e, "menu:activated", {async: !0}))
    }

    function c(e) {
        e && n.fire(e, "menu:deactivate") && (h["default"](document).off(".menu"), p = null, m["default"](e, function () {
            e.classList.remove("active");
            var t = e.querySelector(".js-menu-content");
            t && (t.setAttribute("aria-hidden", "true"), t.setAttribute("aria-expanded", "false"));
            var i = e.querySelector(".js-menu-target");
            i && i.setAttribute("aria-expanded", "false")
        }), f["default"](e, "menu:deactivated", {async: !0}))
    }

    function l(e) {
        p && (h["default"](e.target).closest(p)[0] || (e.preventDefault(), c(p)))
    }

    function d(e) {
        if (p && "esc" === v["default"](e.originalEvent)) {
            var t = h["default"](document.activeElement).parents().get();
            t.indexOf(p) >= 0 && document.activeElement.blur(), e.preventDefault(), c(p)
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.activate = u, e.deactivate = c;
    var h = a(t), f = a(i), v = a(o), m = a(s), p = null;
    h["default"](document).on("click", ".js-menu-container", function (e) {
        var t = this, i = h["default"](e.target).closest(".js-menu-target")[0];
        i ? (e.preventDefault(), t === p ? c(t) : u(t)) : h["default"](e.target).closest(".js-menu-content")[0] || t === p && (e.preventDefault(), c(t))
    }), h["default"](document).on("click", ".js-menu-container .js-menu-close", function (e) {
        c(this.closest(".js-menu-container")), e.preventDefault()
    }), r.observe(".js-menu-container.active", {
        add: function () {
            document.body.classList.add("menu-active")
        }, remove: function () {
            document.body.classList.remove("menu-active")
        }
    })
}), define.amd = "sortablejs", function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(e) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = e() : "undefined" != typeof Package ? Sortable = e() : window.Sortable = e()
}(function () {
    "use strict";
    function e(e, t) {
        if (!e || !e.nodeType || 1 !== e.nodeType)throw"Sortable: `el` must be HTMLElement, and not " + {}.toString.call(e);
        this.el = e, this.options = t = g({}, t), e[N] = this;
        var i = {
            group: Math.random(),
            sort: !0,
            disabled: !1,
            store: null,
            handle: null,
            scroll: !0,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            draggable: /[uo]l/i.test(e.nodeName) ? "li" : ">*",
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            ignore: "a, img",
            filter: null,
            animation: 0,
            setData: function (e, t) {
                e.setData("Text", t.textContent)
            },
            dropBubble: !1,
            dragoverBubble: !1,
            dataIdAttr: "data-id",
            delay: 0,
            forceFallback: !1,
            fallbackClass: "sortable-fallback",
            fallbackOnBody: !1
        };
        for (var n in i)!(n in t) && (t[n] = i[n]);
        V(t);
        for (var r in this)"_" === r.charAt(0) && (this[r] = this[r].bind(this));
        this.nativeDraggable = t.forceFallback ? !1 : F, o(e, "mousedown", this._onTapStart), o(e, "touchstart", this._onTapStart), this.nativeDraggable && (o(e, "dragover", this), o(e, "dragenter", this)), W.push(this._onDragOver), t.store && this.sort(t.store.get(this))
    }

    function t(e) {
        w && w.state !== e && (a(w, "display", e ? "none" : ""), !e && w.state && x.insertBefore(w, b), w.state = e)
    }

    function i(e, t, i) {
        if (e) {
            i = i || R, t = t.split(".");
            var n = t.shift().toUpperCase(), o = new RegExp("\\s(" + t.join("|") + ")(?=\\s)", "g");
            do if (">*" === n && e.parentNode === i || ("" === n || e.nodeName.toUpperCase() == n) && (!t.length || ((" " + e.className + " ").match(o) || []).length == t.length))return e; while (e !== i && (e = e.parentNode))
        }
        return null
    }

    function n(e) {
        e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.preventDefault()
    }

    function o(e, t, i) {
        e.addEventListener(t, i, !1)
    }

    function r(e, t, i) {
        e.removeEventListener(t, i, !1)
    }

    function s(e, t, i) {
        if (e)if (e.classList)e.classList[i ? "add" : "remove"](t); else {
            var n = (" " + e.className + " ").replace(H, " ").replace(" " + t + " ", " ");
            e.className = (n + (i ? " " + t : "")).replace(H, " ")
        }
    }

    function a(e, t, i) {
        var n = e && e.style;
        if (n) {
            if (void 0 === i)return R.defaultView && R.defaultView.getComputedStyle ? i = R.defaultView.getComputedStyle(e, "") : e.currentStyle && (i = e.currentStyle), void 0 === t ? i : i[t];
            t in n || (t = "-webkit-" + t), n[t] = i + ("string" == typeof i ? "" : "px")
        }
    }

    function u(e, t, i) {
        if (e) {
            var n = e.getElementsByTagName(t), o = 0, r = n.length;
            if (i)for (; r > o; o++)i(n[o], o);
            return n
        }
        return []
    }

    function c(e, t, i, n, o, r, s) {
        var a = R.createEvent("Event"), u = (e || t[N]).options, c = "on" + i.charAt(0).toUpperCase() + i.substr(1);
        a.initEvent(i, !0, !0), a.to = t, a.from = o || t, a.item = n || t, a.clone = w, a.oldIndex = r, a.newIndex = s, t.dispatchEvent(a), u[c] && u[c].call(e, a)
    }

    function l(e, t, i, n, o, r) {
        var s, a, u = e[N], c = u.options.onMove;
        return s = R.createEvent("Event"), s.initEvent("move", !0, !0), s.to = t, s.from = e, s.dragged = i, s.draggedRect = n, s.related = o || t, s.relatedRect = r || t.getBoundingClientRect(), e.dispatchEvent(s), c && (a = c.call(u, s)), a
    }

    function d(e) {
        e.draggable = !1
    }

    function h() {
        $ = !1
    }

    function f(e, t) {
        var i = e.lastElementChild, n = i.getBoundingClientRect();
        return (t.clientY - (n.top + n.height) > 5 || t.clientX - (n.right + n.width) > 5) && i
    }

    function v(e) {
        for (var t = e.tagName + e.className + e.src + e.href + e.textContent, i = t.length, n = 0; i--;)n += t.charCodeAt(i);
        return n.toString(36)
    }

    function m(e) {
        var t = 0;
        if (!e || !e.parentNode)return -1;
        for (; e && (e = e.previousElementSibling);)"TEMPLATE" !== e.nodeName.toUpperCase() && t++;
        return t
    }

    function p(e, t) {
        var i, n;
        return function () {
            void 0 === i && (i = arguments, n = this, setTimeout(function () {
                1 === i.length ? e.call(n, i[0]) : e.apply(n, i), i = void 0
            }, t))
        }
    }

    function g(e, t) {
        if (e && t)for (var i in t)t.hasOwnProperty(i) && (e[i] = t[i]);
        return e
    }

    var b, y, j, w, x, q, k, S, L, C, A, E, T, _, M, D, P, I = {}, H = /\s+/g, N = "Sortable" + (new Date).getTime(), O = window, R = O.document, z = O.parseInt, F = !!("draggable" in R.createElement("div")), B = function (e) {
        return e = R.createElement("x"), e.style.cssText = "pointer-events:auto", "auto" === e.style.pointerEvents
    }(), $ = !1, U = Math.abs, W = ([].slice, []), Y = p(function (e, t, i) {
        if (i && t.scroll) {
            var n, o, r, s, a = t.scrollSensitivity, u = t.scrollSpeed, c = e.clientX, l = e.clientY, d = window.innerWidth, h = window.innerHeight;
            if (S !== i && (k = t.scroll, S = i, k === !0)) {
                k = i;
                do if (k.offsetWidth < k.scrollWidth || k.offsetHeight < k.scrollHeight)break; while (k = k.parentNode)
            }
            k && (n = k, o = k.getBoundingClientRect(), r = (U(o.right - c) <= a) - (U(o.left - c) <= a), s = (U(o.bottom - l) <= a) - (U(o.top - l) <= a)), r || s || (r = (a >= d - c) - (a >= c), s = (a >= h - l) - (a >= l), (r || s) && (n = O)), (I.vx !== r || I.vy !== s || I.el !== n) && (I.el = n, I.vx = r, I.vy = s, clearInterval(I.pid), n && (I.pid = setInterval(function () {
                n === O ? O.scrollTo(O.pageXOffset + r * u, O.pageYOffset + s * u) : (s && (n.scrollTop += s * u), r && (n.scrollLeft += r * u))
            }, 24)))
        }
    }, 30), V = function (e) {
        var t = e.group;
        t && "object" == typeof t || (t = e.group = {name: t}), ["pull", "put"].forEach(function (e) {
            e in t || (t[e] = !0)
        }), e.groups = " " + t.name + (t.put.join ? " " + t.put.join(" ") : "") + " "
    };
    return e.prototype = {
        constructor: e, _onTapStart: function (e) {
            var t = this, n = this.el, o = this.options, r = e.type, s = e.touches && e.touches[0], a = (s || e).target, u = a, l = o.filter;
            if (!("mousedown" === r && 0 !== e.button || o.disabled) && (a = i(a, o.draggable, n))) {
                if (E = m(a), "function" == typeof l) {
                    if (l.call(this, e, a, this))return c(t, u, "filter", a, n, E), void e.preventDefault()
                } else if (l && (l = l.split(",").some(function (e) {
                        return e = i(u, e.trim(), n), e ? (c(t, e, "filter", a, n, E), !0) : void 0
                    })))return void e.preventDefault();
                (!o.handle || i(u, o.handle, n)) && this._prepareDragStart(e, s, a)
            }
        }, _prepareDragStart: function (e, t, i) {
            var n, r = this, a = r.el, c = r.options, l = a.ownerDocument;
            i && !b && i.parentNode === a && (M = e, x = a, b = i, y = b.parentNode, q = b.nextSibling, _ = c.group, n = function () {
                r._disableDelayedDrag(), b.draggable = !0, s(b, r.options.chosenClass, !0), r._triggerDragStart(t)
            }, c.ignore.split(",").forEach(function (e) {
                u(b, e.trim(), d)
            }), o(l, "mouseup", r._onDrop), o(l, "touchend", r._onDrop), o(l, "touchcancel", r._onDrop), c.delay ? (o(l, "mouseup", r._disableDelayedDrag), o(l, "touchend", r._disableDelayedDrag), o(l, "touchcancel", r._disableDelayedDrag), o(l, "mousemove", r._disableDelayedDrag), o(l, "touchmove", r._disableDelayedDrag), r._dragStartTimer = setTimeout(n, c.delay)) : n())
        }, _disableDelayedDrag: function () {
            var e = this.el.ownerDocument;
            clearTimeout(this._dragStartTimer), r(e, "mouseup", this._disableDelayedDrag), r(e, "touchend", this._disableDelayedDrag), r(e, "touchcancel", this._disableDelayedDrag), r(e, "mousemove", this._disableDelayedDrag), r(e, "touchmove", this._disableDelayedDrag)
        }, _triggerDragStart: function (e) {
            e ? (M = {
                target: b,
                clientX: e.clientX,
                clientY: e.clientY
            }, this._onDragStart(M, "touch")) : this.nativeDraggable ? (o(b, "dragend", this), o(x, "dragstart", this._onDragStart)) : this._onDragStart(M, !0);
            try {
                R.selection ? R.selection.empty() : window.getSelection().removeAllRanges()
            } catch (t) {
            }
        }, _dragStarted: function () {
            x && b && (s(b, this.options.ghostClass, !0), e.active = this, c(this, x, "start", b, x, E))
        }, _emulateDragOver: function () {
            if (D) {
                if (this._lastX === D.clientX && this._lastY === D.clientY)return;
                this._lastX = D.clientX, this._lastY = D.clientY, B || a(j, "display", "none");
                var e = R.elementFromPoint(D.clientX, D.clientY), t = e, i = " " + this.options.group.name, n = W.length;
                if (t)do {
                    if (t[N] && t[N].options.groups.indexOf(i) > -1) {
                        for (; n--;)W[n]({clientX: D.clientX, clientY: D.clientY, target: e, rootEl: t});
                        break
                    }
                    e = t
                } while (t = t.parentNode);
                B || a(j, "display", "")
            }
        }, _onTouchMove: function (t) {
            if (M) {
                e.active || this._dragStarted(), this._appendGhost();
                var i = t.touches ? t.touches[0] : t, n = i.clientX - M.clientX, o = i.clientY - M.clientY, r = t.touches ? "translate3d(" + n + "px," + o + "px,0)" : "translate(" + n + "px," + o + "px)";
                P = !0, D = i, a(j, "webkitTransform", r), a(j, "mozTransform", r), a(j, "msTransform", r), a(j, "transform", r), t.preventDefault()
            }
        }, _appendGhost: function () {
            if (!j) {
                var e, t = b.getBoundingClientRect(), i = a(b), n = this.options;
                j = b.cloneNode(!0), s(j, n.ghostClass, !1), s(j, n.fallbackClass, !0), a(j, "top", t.top - z(i.marginTop, 10)), a(j, "left", t.left - z(i.marginLeft, 10)), a(j, "width", t.width), a(j, "height", t.height), a(j, "opacity", "0.8"), a(j, "position", "fixed"), a(j, "zIndex", "100000"), a(j, "pointerEvents", "none"), n.fallbackOnBody && R.body.appendChild(j) || x.appendChild(j), e = j.getBoundingClientRect(), a(j, "width", 2 * t.width - e.width), a(j, "height", 2 * t.height - e.height)
            }
        }, _onDragStart: function (e, t) {
            var i = e.dataTransfer, n = this.options;
            this._offUpEvents(), "clone" == _.pull && (w = b.cloneNode(!0), a(w, "display", "none"), x.insertBefore(w, b)), t ? ("touch" === t ? (o(R, "touchmove", this._onTouchMove), o(R, "touchend", this._onDrop), o(R, "touchcancel", this._onDrop)) : (o(R, "mousemove", this._onTouchMove), o(R, "mouseup", this._onDrop)), this._loopId = setInterval(this._emulateDragOver, 50)) : (i && (i.effectAllowed = "move", n.setData && n.setData.call(this, i, b)), o(R, "drop", this), setTimeout(this._dragStarted, 0))
        }, _onDragOver: function (e) {
            var n, o, r, s = this.el, u = this.options, c = u.group, d = c.put, v = _ === c, m = u.sort;
            if (void 0 !== e.preventDefault && (e.preventDefault(), !u.dragoverBubble && e.stopPropagation()), P = !0, _ && !u.disabled && (v ? m || (r = !x.contains(b)) : _.pull && d && (_.name === c.name || d.indexOf && ~d.indexOf(_.name))) && (void 0 === e.rootEl || e.rootEl === this.el)) {
                if (Y(e, u, this.el), $)return;
                if (n = i(e.target, u.draggable, s), o = b.getBoundingClientRect(), r)return t(!0), void(w || q ? x.insertBefore(b, w || q) : m || x.appendChild(b));
                if (0 === s.children.length || s.children[0] === j || s === e.target && (n = f(s, e))) {
                    if (n) {
                        if (n.animated)return;
                        g = n.getBoundingClientRect()
                    }
                    t(v), l(x, s, b, o, n, g) !== !1 && (b.contains(s) || (s.appendChild(b), y = s), this._animate(o, b), n && this._animate(g, n))
                } else if (n && !n.animated && n !== b && void 0 !== n.parentNode[N]) {
                    L !== n && (L = n, C = a(n), A = a(n.parentNode));
                    var p, g = n.getBoundingClientRect(), k = g.right - g.left, S = g.bottom - g.top, E = /left|right|inline/.test(C.cssFloat + C.display) || "flex" == A.display && 0 === A["flex-direction"].indexOf("row"), T = n.offsetWidth > b.offsetWidth, M = n.offsetHeight > b.offsetHeight, D = (E ? (e.clientX - g.left) / k : (e.clientY - g.top) / S) > .5, I = n.nextElementSibling, H = l(x, s, b, o, n, g);
                    if (H !== !1) {
                        if ($ = !0, setTimeout(h, 30), t(v), 1 === H || -1 === H)p = 1 === H; else if (E) {
                            var O = b.offsetTop, R = n.offsetTop;
                            p = O === R ? n.previousElementSibling === b && !T || D && T : R > O
                        } else p = I !== b && !M || D && M;
                        b.contains(s) || (p && !I ? s.appendChild(b) : n.parentNode.insertBefore(b, p ? I : n)), y = b.parentNode, this._animate(o, b), this._animate(g, n)
                    }
                }
            }
        }, _animate: function (e, t) {
            var i = this.options.animation;
            if (i) {
                var n = t.getBoundingClientRect();
                a(t, "transition", "none"), a(t, "transform", "translate3d(" + (e.left - n.left) + "px," + (e.top - n.top) + "px,0)"), t.offsetWidth, a(t, "transition", "all " + i + "ms"), a(t, "transform", "translate3d(0,0,0)"), clearTimeout(t.animated), t.animated = setTimeout(function () {
                    a(t, "transition", ""), a(t, "transform", ""), t.animated = !1
                }, i)
            }
        }, _offUpEvents: function () {
            var e = this.el.ownerDocument;
            r(R, "touchmove", this._onTouchMove), r(e, "mouseup", this._onDrop), r(e, "touchend", this._onDrop), r(e, "touchcancel", this._onDrop)
        }, _onDrop: function (t) {
            var i = this.el, n = this.options;
            clearInterval(this._loopId), clearInterval(I.pid), clearTimeout(this._dragStartTimer), r(R, "mousemove", this._onTouchMove), this.nativeDraggable && (r(R, "drop", this), r(i, "dragstart", this._onDragStart)), this._offUpEvents(), t && (P && (t.preventDefault(), !n.dropBubble && t.stopPropagation()), j && j.parentNode.removeChild(j), b && (this.nativeDraggable && r(b, "dragend", this), d(b), s(b, this.options.ghostClass, !1), s(b, this.options.chosenClass, !1), x !== y ? (T = m(b), T >= 0 && (c(null, y, "sort", b, x, E, T), c(this, x, "sort", b, x, E, T), c(null, y, "add", b, x, E, T), c(this, x, "remove", b, x, E, T))) : (w && w.parentNode.removeChild(w), b.nextSibling !== q && (T = m(b), T >= 0 && (c(this, x, "update", b, x, E, T), c(this, x, "sort", b, x, E, T)))), e.active && ((null === T || -1 === T) && (T = E), c(this, x, "end", b, x, E, T), this.save())), x = b = y = j = q = w = k = S = M = D = P = T = L = C = _ = e.active = null)
        }, handleEvent: function (e) {
            var t = e.type;
            "dragover" === t || "dragenter" === t ? b && (this._onDragOver(e), n(e)) : ("drop" === t || "dragend" === t) && this._onDrop(e)
        }, toArray: function () {
            for (var e, t = [], n = this.el.children, o = 0, r = n.length, s = this.options; r > o; o++)e = n[o], i(e, s.draggable, this.el) && t.push(e.getAttribute(s.dataIdAttr) || v(e));
            return t
        }, sort: function (e) {
            var t = {}, n = this.el;
            this.toArray().forEach(function (e, o) {
                var r = n.children[o];
                i(r, this.options.draggable, n) && (t[e] = r)
            }, this), e.forEach(function (e) {
                t[e] && (n.removeChild(t[e]), n.appendChild(t[e]))
            })
        }, save: function () {
            var e = this.options.store;
            e && e.set(this)
        }, closest: function (e, t) {
            return i(e, t || this.options.draggable, this.el)
        }, option: function (e, t) {
            var i = this.options;
            return void 0 === t ? i[e] : (i[e] = t, void("group" === e && V(i)))
        }, destroy: function () {
            var e = this.el;
            e[N] = null, r(e, "mousedown", this._onTapStart), r(e, "touchstart", this._onTapStart), this.nativeDraggable && (r(e, "dragover", this), r(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function (e) {
                e.removeAttribute("draggable")
            }), W.splice(W.indexOf(this._onDragOver), 1), this._onDrop(), this.el = e = null
        }
    }, e.utils = {
        on: o, off: r, css: a, find: u, is: function (e, t) {
            return !!i(e, t, e)
        }, extend: g, throttle: p, closest: i, toggleClass: s, index: m
    }, e.create = function (t, i) {
        return new e(t, i)
    }, e.version = "1.4.2", e
}), delete define.amd, define("github/has-interactions", ["exports"], function (e) {
    function t(e) {
        return i(e) || o(e) || r(e) || s(e)
    }

    function i(e) {
        for (var t = e.querySelectorAll("input, textarea"), i = 0, n = t.length; n > i; i++) {
            var o = t[i];
            if (o.value !== o.defaultValue)return !0
        }
        return !1
    }

    function n(e) {
        if (1 !== e.nodeType)return !1;
        var t = e.nodeName.toLowerCase(), i = (e.getAttribute("type") || "").toLowerCase(), n = "input" === t && "submit" !== i && "reset" !== i;
        return "select" === t || "textarea" === t || n
    }

    function o(e) {
        var t = e.ownerDocument.activeElement;
        return n(t) && e === t || e.contains(t)
    }

    function r(e) {
        return e.matches(":active")
    }

    function s(e) {
        return e.closest(".is-dirty") || e.querySelector(".is-dirty") ? !0 : !1
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.hasInteractions = t, e.hasDirtyFields = i, e.hasFocus = o, e.hasMousedown = r, e.markedAsDirty = s
}), define("github/scrollby", ["exports", "./jquery", "./scrollto"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, t, i) {
        if (0 === t && 0 === i)return [0, 0];
        var n = r(e);
        a["default"](e, {top: n.top + i, left: n.left + t});
        var o = r(e);
        return [o.left - n.left, o.top - n.top]
    }

    function r(e) {
        return e.offsetParent ? {
            top: s["default"](e).scrollTop(),
            left: s["default"](e).scrollLeft()
        } : {top: s["default"](document).scrollTop(), left: s["default"](document).scrollLeft()}
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = o;
    var s = n(t), a = n(i)
}), define("github/cumulative-scrollby", ["exports", "./dimensions", "./scrollby"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, i, n) {
        for (var o = t.overflowParent(e), a = 0, u = 0; o;) {
            var c = r["default"](o, i - a, n - u), l = s(c, 2), d = l[0], h = l[1];
            if (a += d, u += h, a === i && u === n)break;
            o = t.overflowParent(o)
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = o;
    var r = n(i), s = function () {
        function e(e, t) {
            var i = [], n = !0, o = !1, r = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
            } catch (u) {
                o = !0, r = u
            } finally {
                try {
                    !n && a["return"] && a["return"]()
                } finally {
                    if (o)throw r
                }
            }
            return i
        }

        return function (t, i) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }()
}), define("github/not-scrolling", ["exports", "./normalized-event-timestamp", "./debounce", "./setimmediate"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        return new Promise(function (i) {
            if (e === window && t.timeSinceTimestamp(u) > 500)return void a["default"](i);
            var n = s["default"](function () {
                e.removeEventListener("scroll", n, {capture: !0, passive: !0}), i()
            }, 500);
            e.addEventListener("scroll", n, {capture: !0, passive: !0}), n()
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = r;
    var s = o(i), a = o(n), u = 0;
    window.addEventListener("scroll", function (e) {
        u = t.normalizedTimestamp(e.timeStamp)
    }, {capture: !0, passive: !0})
}), define("github/preserve-position", ["exports", "./jquery", "./cumulative-scrollby", "./not-scrolling"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        return h["default"](window).then(function () {
            return a(s(), e)
        })
    }

    function s() {
        if (document.activeElement !== document.body)return document.activeElement;
        var e = document.querySelectorAll(":hover"), t = e.length;
        return t ? e[t - 1] : void 0
    }

    function a(e, t) {
        if (!e)return t();
        var i = u(e), n = t.call(e), o = c(i);
        if (o) {
            e = o.element;
            var r = o.top, s = o.left, a = e.getBoundingClientRect(), l = a.top, h = a.left;
            return d["default"](e, h - s, l - r), n
        }
    }

    function u(e) {
        for (var t = []; e;) {
            var i = e.getBoundingClientRect(), n = i.top, o = i.left;
            t.push({element: e, top: n, left: o}), e = e.parentElement
        }
        return t
    }

    function c(e) {
        for (var t = 0, i = e.length; i > t; t++) {
            var n = e[t];
            if (l["default"].contains(document, n.element))return n
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.preserveInteractivePosition = r, e.preservingScrollPosition = a;
    var l = o(t), d = o(i), h = o(n)
}), define("github/milestone-dragging", ["./jquery", "sortablejs", "./debounce", "./fetch", "./has-interactions", "./hotkey", "./navigation", "./observe", "./preserve-position", "./google-analytics"], function (e, t, i, n, o, r, s, a, u, c) {
    function l(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function d(e) {
        var t, i;
        return regeneratorRuntime.async(function (r) {
            for (; ;)switch (r.prev = r.next) {
                case 0:
                    if (!o.hasInteractions(e)) {
                        r.next = 2;
                        break
                    }
                    return r.abrupt("return");
                case 2:
                    return t = e.getAttribute("data-url"), r.next = 5, regeneratorRuntime.awrap(n.fetchSafeDocumentFragment(document, t));
                case 5:
                    i = r.sent, u.preserveInteractivePosition(function () {
                        e.replaceWith(i)
                    });
                case 7:
                case"end":
                    return r.stop()
            }
        }, null, this)
    }

    function h(e, t) {
        return e.querySelectorAll(".js-draggable-issue")[t]
    }

    function f(e, t) {
        w({
            item: t,
            newIndex: Array.from(e.querySelectorAll(".js-draggable-issue")).indexOf(t),
            trackingLabel: "keyboard-shortcut"
        }), s.refocus(t.closest(".js-navigation-container"), t)
    }

    function v() {
        if (!j.has(this)) {
            var e = g["default"].create(this, {
                animation: 150,
                item: ".js-draggable-issue",
                handle: ".js-drag-handle",
                onUpdate: w,
                chosenClass: "is-dragging"
            });
            j.set(this, e)
        }
    }

    function m() {
        j.get(this).destroy()
    }

    var p = l(e), g = l(t), b = l(i), y = l(r), j = new WeakMap;
    p["default"](document).on("socket:message", ".js-milestone-issues", function () {
        var e = this.querySelector(".js-draggable-issues-container");
        return "1" === e.getAttribute("data-is-sorting") ? void e.removeAttribute("data-is-sorting") : void d(this)
    }), p["default"](document).on("ajaxSuccess", ".js-milestone-sort-form", function (e, t, i, n) {
        n.error ? this.querySelector(".js-milestone-changed").classList.remove("d-none") : this.querySelector(".js-timestamp").value = n.updated_at
    });
    var w = b["default"](function (e) {
        var t = e.newIndex, i = e.item, n = i.closest(".js-draggable-issues-container"), o = i.getAttribute("data-id"), r = h(n, t - 1), s = r && r.getAttribute("data-id"), a = n.closest(".js-milestone-sort-form");
        a.querySelector(".js-item-id").value = o, a.querySelector(".js-prev-id").value = s || "", c.trackEvent({
            category: "Milestone",
            action: "reorder",
            label: e.trackingLabel || "drag-and-drop"
        }), n.setAttribute("data-is-sorting", "1"), p["default"](a).submit()
    }, 200);
    p["default"](document).on("navigation:keydown", function (e) {
        if (e.target) {
            var t = e.target.closest(".js-draggable-issue");
            if (t) {
                var i = t.closest(".js-draggable-issues-container");
                if ("J" === y["default"](e.originalEvent)) {
                    var n = t.nextElementSibling;
                    n && (t.parentNode.insertBefore(t, n.nextElementSibling), f(i, t), e.preventDefault(), e.stopPropagation())
                } else"K" === y["default"](e.originalEvent) && (t.parentNode.insertBefore(t, t.previousElementSibling), f(i, t), e.preventDefault(), e.stopPropagation())
            }
        }
    }), a.observe(".js-draggable-issues-container", {add: v, remove: m}), a.observe(".js-backfill-status", function () {
        var e = this;
        setTimeout(function () {
            e.setAttribute("src", e.getAttribute("data-xsrc"))
        }, 3e3)
    })
}), define("github/mobile-preference", ["delegated-events"], function (e) {
    e.on("submit", ".js-mobile-preference-form", function () {
        var e = this.querySelector(".js-mobile-preference-anchor-field");
        e.value = window.location.hash.substr(1)
    })
}), define("github/capture-keypresses", ["exports"], function (e) {
    function t(e) {
        var t = e.createElement("textarea");
        return t.style.position = "fixed", t.style.top = 0, t.style.left = 0, t.style.opacity = 0, e.body.appendChild(t), t.focus(), function () {
            return t.blur(), t.remove(), t.value
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = t
}), define("github/pjax/capture-keypresses", ["delegated-events", "../capture-keypresses"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(t), o = null;
    e.on("pjax:click", ".js-pjax-capture-input", function () {
        o = n["default"](document)
    }), e.on("pjax:end", "#js-repo-pjax-container", function () {
        if (o) {
            var t = o(), i = document.querySelector(".js-pjax-restore-captured-input");
            i && t && (i.value = t, e.fire(i, "change")), o = null
        }
    })
}), define("github/pjax/history-navigate", ["../history", "delegated-events"], function (e, t) {
    t.on("pjax:click", ".js-pjax-history-navigate", function (t) {
        this.href === e.getBackURL() ? (history.back(), t.detail.relatedEvent.preventDefault(), t.preventDefault()) : this.href === e.getForwardURL() && (history.forward(), t.detail.relatedEvent.preventDefault(), t.preventDefault())
    })
}), define("github/pjax/link-prefetch", ["../pjax", "../observe", "./prefetch"], function (e, t, i) {
    t.observe("link[rel=pjax-prefetch]", {
        init: function (t) {
            var n = e.fetch(t, {headers: {Purpose: "prefetch"}});
            i.setPrefetchResponse(t, n)
        }
    })
}), define("github/magic-move", ["exports", "./once"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n() {
        return new Promise(window.requestAnimationFrame)
    }

    function o(e) {
        for (var t = new WeakMap, i = 0; i < e.length; i++) {
            var n = e[i];
            t.set(n, n.getBoundingClientRect())
        }
        return t
    }

    function r(e, t, i) {
        var o, r, s, u;
        return regeneratorRuntime.async(function (c) {
            for (; ;)switch (c.prev = c.next) {
                case 0:
                    return o = t.get(e), r = i.get(e), s = o.left - r.left, u = o.top - r.top, c.next = 6, regeneratorRuntime.awrap(n());
                case 6:
                    return e.style.transform = "translateZ(0) translate(" + s + "px, " + u + "px)", e.style.transition = "transform 0s", c.next = 10, regeneratorRuntime.awrap(n());
                case 10:
                    return e.style.transform = "", e.style.transition = "", c.abrupt("return", a["default"](e, "transitionend"));
                case 13:
                case"end":
                    return c.stop()
            }
        }, null, this)
    }

    function s(e, t) {
        for (var i = o(e), n = [], s = 0; s < e.length; s++) {
            var a = e[s];
            n.push(r(a, t, i))
        }
        return Promise.all(n)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.recordPositions = o, e.animate = s;
    var a = i(t)
}), define("github/project-updater", ["exports", "./magic-move", "./debounce", "./fetch"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        e && (h && clearTimeout(h), document.querySelector(".js-project-updated-message").textContent = e, h = setTimeout(function () {
            document.querySelector(".js-project-updated-message").textContent = ""
        }, 3e3))
    }

    function s(e) {
        for (; e.firstChild;)e.removeChild(e.firstChild)
    }

    function a(e, t) {
        var i = "project-column-" + e.id, n = document.getElementById(i);
        if (n)return n;
        var o = document.createElement("include-fragment");
        return o.id = i, o.src = t + "/" + e.id, o
    }

    function u(e, t) {
        var i = "card-" + e, n = document.getElementById(i);
        if (n)return n;
        var o = function () {
            var n = document.createElement("include-fragment");
            return n.id = i, n.src = t + "/" + e, n.onerror = function () {
                n.remove()
            }, {v: n}
        }();
        return "object" == typeof o ? o.v : void 0
    }

    function c(e, t) {
        var i = Array.from(e.querySelectorAll(".js-project-column")), n = i.map(function (e) {
            return e.getAttribute("data-id")
        }), o = t.columns.map(function (e) {
            return String(e.id)
        });
        return o.join(",") !== n.join(",")
    }

    function l(e, i) {
        var o, l, d, h, f, v, m, p, g, b, y, j, w, x, q, k, S, L, C, A, E, T, _, M, D, P;
        return regeneratorRuntime.async(function (I) {
            for (; ;)switch (I.prev = I.next) {
                case 0:
                    if (o = document.activeElement, l = e.querySelectorAll(".js-project-column"), d = t.recordPositions(l), h = e.getAttribute("data-url"), f = e.getAttribute("data-columns-url"), v = e.getAttribute("data-cards-url"), I.t0 = i.state, I.t0) {
                        I.next = 11;
                        break
                    }
                    return I.next = 10, regeneratorRuntime.awrap(n.fetchJSON(h));
                case 10:
                    I.t0 = I.sent;
                case 11:
                    if (m = I.t0, !c(e, m)) {
                        I.next = 22;
                        break
                    }
                    for (p = {}, g = document.createDocumentFragment(), b = m.columns, y = 0; y < b.length; y++)j = b[y], w = a(j, f), x = w.querySelector(".js-project-column-cards"), x && (p[x.id] = x.scrollTop, g.appendChild(w));
                    s(e), e.appendChild(g);
                    for (q in p)x = document.getElementById(q), x.scrollTop = p[q];
                    return I.next = 22, regeneratorRuntime.awrap(t.animate(l, d));
                case 22:
                    k = e.querySelectorAll(".js-project-column-card"), S = t.recordPositions(k), L = m.columns, C = 0;
                case 26:
                    if (!(C < L.length)) {
                        I.next = 42;
                        break
                    }
                    if (A = L[C], E = document.getElementById("project-column-" + A.id)) {
                        I.next = 31;
                        break
                    }
                    return I.abrupt("return");
                case 31:
                    for (E.querySelector(".js-project-column-name").textContent = A.name, E.querySelector(".js-column-card-count").textContent = A.card_ids.length,
                             T = document.createDocumentFragment(), _ = A.card_ids, M = 0; M < _.length; M++)D = _[M], T.appendChild(u(D, v));
                    P = E.querySelector(".js-project-column-cards"), s(P), P.appendChild(T);
                case 39:
                    C++, I.next = 26;
                    break;
                case 42:
                    return I.next = 44, regeneratorRuntime.awrap(t.animate(k, S));
                case 44:
                    r(i.message), document.activeElement !== o && o.focus();
                case 46:
                case"end":
                    return I.stop()
            }
        }, null, this)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateProject = void 0;
    var d = o(i), h = void 0;
    e.updateProject = d["default"](l, 100)
}), define("github/projects", ["delegated-events", "./jquery", "sortablejs", "./menu", "./hash-change", "./hotkey", "./observe", "./project-updater"], function (e, t, i, n, o, r, s, a) {
    function u(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function c(e, t) {
        if (!t)return e.elements.namedItem("card_id").value = "", e.elements.namedItem("content_id").value = "", void(e.elements.namedItem("content_type").value = "");
        var i = t.getAttribute("data-card-id");
        i ? (e.elements.namedItem("card_id").value = i, e.elements.namedItem("content_id").value = "", e.elements.namedItem("content_type").value = "") : (e.elements.namedItem("card_id").value = "", e.elements.namedItem("content_id").value = t.getAttribute("data-content-id"), e.elements.namedItem("content_type").value = t.getAttribute("data-content-type")), e.elements.namedItem("client_uid").value = b
    }

    function l(t, i) {
        var n = document.querySelector(".js-create-project-column");
        c(n, i), e.fire(t, "click"), t.querySelector(".js-project-column-card").remove()
    }

    function d(e) {
        var t = e.item, i = t.closest(".js-new-project-column");
        if (i)return l(i, t);
        var n = t.closest(".js-project-column");
        if (n) {
            var o = n.querySelector(".js-project-content-form");
            o.reset(), c(o, t);
            var r = t.previousElementSibling;
            r ? o.elements.namedItem("previous_card_id").value = r.getAttribute("data-card-id") : o.elements.namedItem("previous_card_id").value = "", v["default"](o).submit()
        }
    }

    function h(e) {
        var t = e.item, i = document.querySelector(".js-reorder-columns-form");
        i.elements.namedItem("column_id").value = t.getAttribute("data-id");
        var n = t.previousElementSibling;
        n ? i.elements.namedItem("previous_column_id").value = n.getAttribute("data-id") : i.elements.namedItem("previous_column_id").value, v["default"](i).submit()
    }

    function f(e) {
        "esc" === g["default"](e) && this.closest(".js-details-container").classList.remove("open")
    }

    var v = u(t), m = u(i), p = u(o), g = u(r), b = void 0, y = document.querySelector(".js-client-uid");
    y && (b = y.getAttribute("data-uid")), v["default"](document).on("ajaxSuccess", ".js-project-update-card", function (e, t, i, n) {
        var o = v["default"].parseHTML(n)[0], r = o.getAttribute("data-card-id"), s = void 0;
        if (r && (s = document.querySelector('[data-card-id="' + r + '"]')), !s) {
            var a = o.getAttribute("data-content-type"), u = o.getAttribute("data-content-id");
            s = document.querySelector('[data-content-type="' + a + '"][data-content-id="' + u + '"]')
        }
        v["default"](s).replaceWith(o)
    }), v["default"](document).on("ajaxSuccess", ".js-create-project-column", function (t, i, n, o) {
        var r = v["default"].parseHTML(o)[0], s = r.classList.contains("js-column-form-container");
        if (s)this.closest(".js-column-form-container").replaceWith(r); else {
            var a = document.querySelector(".js-project-columns-container");
            a.insertAdjacentHTML("beforeend", o), Array.from(document.querySelectorAll(".js-create-project-column")).forEach(function (e) {
                c(e, null)
            }), e.fire(document, "facebox:close")
        }
    }), v["default"](document).on("ajaxSuccess", ".js-update-project-column", function (t, i, n, o) {
        var r = v["default"].parseHTML(o)[0], s = r.classList.contains("js-column-form-container");
        if (s)this.closest(".js-column-form-container").replaceWith(r); else {
            var a = this.getAttribute("data-column-id");
            document.querySelector('.js-project-column[data-id="' + a + '"]').replaceWith(r), e.fire(document, "facebox:close")
        }
    }), v["default"](document).on("ajaxSuccess", ".js-delete-project-column", function () {
        var t = this.getAttribute("data-column-id");
        document.querySelector('.js-project-column[data-id="' + t + '"]').remove(), e.fire(document, "facebox:close")
    }), v["default"](document).on("facebox:afterClose", function () {
        a.updateProject(document.querySelector(".js-project-columns-container"), {})
    }), v["default"](document).on("ajaxSuccess", ".js-delete-card", function () {
        this.closest(".js-project-column-card").remove()
    }), v["default"](document).on("ajaxSuccess", ".js-note-form", function (t, i, n, o) {
        var r = v["default"].parseHTML(o)[0], s = r.classList.contains("js-note-form-container");
        if (s)this.closest(".js-note-form-container").replaceWith(r); else {
            var a = this.getAttribute("data-card-id");
            document.getElementById("card-" + a).replaceWith(r), e.fire(document, "facebox:close")
        }
    }), e.on("click", ".js-card-link-fallback", function () {
        n.deactivate(this.closest(".js-menu-container"))
    }), p["default"](function (e) {
        e.target.matches && e.target.matches(".js-project-column-card") && !function () {
            var t = e.target.closest(".js-column-subcontainer");
            t.scrollTop = 0;
            var i = e.target;
            i.classList.add("highlighted"), setTimeout(function () {
                i.classList.remove("highlighted")
            }, 4e3)
        }()
    }), e.on("click", ".js-toggle-project-triage", function () {
        var e = document.querySelector(".js-project-triage-pane");
        e.classList.toggle("d-none")
    }), v["default"](document).on("ajaxSuccess", ".js-project-search-form", function (e, t, i, n) {
        this.querySelector(".js-project-search-results").innerHTML = n
    }), s.observe(".js-project-column-card", function () {
        if (this.getAttribute("data-card-id")) {
            var e = this.getAttribute("data-content-type"), t = this.getAttribute("data-content-id"), i = document.getElementById("card-" + e + "-" + t);
            i && i.remove()
        }
    }), s.observe(".js-project-note-form", {
        add: function () {
            this.addEventListener("keydown", f)
        }, remove: function () {
            this.removeEventListener("keydown", f)
        }
    }), v["default"](document).on("ajaxSuccess", ".js-project-note-form", function (e, t, i, n) {
        var o = this.closest(".js-project-column").querySelector(".js-project-column-cards");
        this.querySelector("textarea").value = "", v["default"](o).prepend(n)
    }), v["default"](document).on("socket:message", ".js-project-columns-container", function (e, t) {
        b !== t.client_uid && (a.updateProject(this, t), v["default"](".js-project-search-form").submit())
    }), s.observe(".js-project-columns-drag-container", function () {
        m["default"].create(this, {animation: 150, item: ".js-project-column", group: "project-column", onUpdate: h})
    }), s.observe(".js-card-drag-container", function () {
        m["default"].create(this, {
            animation: 150,
            item: ".js-project-column-card",
            group: "project-card",
            onAdd: d,
            onUpdate: d
        })
    }), s.observe(".js-project-search-results-drag-container", function () {
        m["default"].create(this, {
            sort: !1,
            animation: 150,
            item: ".js-project-column-card",
            group: {name: "project-card", put: !1, pull: !0},
            onAdd: d,
            onUpdate: d
        })
    })
}), define("github/pulls/change-base", ["../jquery", "../menu", "../facebox"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var o = n(e), r = n(i);
    o["default"](document).on("selectmenu:select", ".js-pull-base-branch-item", function (e) {
        var i = this.closest(".js-select-menu");
        t.deactivate(i), e.preventDefault(), i.querySelector(".js-pull-change-base-branch-field").value = this.getAttribute("data-branch"), r["default"](i.querySelector(".js-change-base-facebox").innerHTML)
    })
}), define("github/pulls/reviews", ["../jquery", "../menu", "../hash-change", "../once", "../inflector"], function (e, t, i, n, o) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e, t) {
        var i = e.closest(".js-review-state-classes"), n = i.querySelectorAll(".js-pending-review-comment").length;
        t && (n += t), i.classList.toggle("is-review-pending", n > 0);
        for (var r = document.querySelectorAll(".js-pending-review-comment-count"), s = 0; s < r.length; s++) {
            var a = r[s];
            a.textContent = n
        }
        for (var u = document.querySelectorAll(".js-pending-comment-count-type"), c = 0; c < u.length; c++) {
            var d = u[c];
            o.pluralizeNode(n, d)
        }
        n > 0 && !function () {
            var t = e.querySelector(".js-menu-target");
            t.classList.add("anim-pulse-in"), l["default"](t, "animationend").then(function () {
                return t.classList.remove("anim-pulse-in")
            })
        }()
    }

    function a(e) {
        var t = document.querySelector(".js-reviews-container");
        t && requestIdleCallback(function () {
            return s(t, e)
        })
    }

    var u = r(e), c = r(i), l = r(n);
    c["default"](function () {
        var e = window.location.hash.slice(1);
        if ("submit-review" === e) {
            var i = document.querySelector(".js-reviews-container");
            t.activate(i)
        }
    }), u["default"](document).on("navigation:open", ".js-submit-review-menu .js-navigation-item", function () {
        var e = document.querySelector(".js-submit-review-button");
        e.textContent = this.getAttribute("data-button-text")
    }), u["default"](document).on("ajaxSuccess", ".js-inline-comment-form", function () {
        a()
    }), u["default"](document).on("ajaxSuccess", ".js-pending-review-comment .js-comment-delete", function () {
        a(-1)
    })
}), define("github/select-menu/ajax", ["../jquery", "../menu"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(e);
    n["default"](document).on("ajaxSuccess", ".js-select-menu:not([data-multiple])", function () {
        t.deactivate(this)
    }), n["default"](document).on("ajaxSend", ".js-select-menu:not([data-multiple])", function () {
        n["default"](this).addClass("is-loading")
    }), n["default"](document).on("ajaxComplete", ".js-select-menu", function () {
        n["default"](this).removeClass("is-loading")
    }), n["default"](document).on("ajaxError", ".js-select-menu", function () {
        n["default"](this).addClass("has-error")
    }), n["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        n["default"](this).removeClass("is-loading has-error")
    })
}), define("github/select-menu/base", ["../jquery", "../menu", "delegated-events"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        var t = new CustomEvent("selectmenu:select", {bubbles: !0, cancelable: !0});
        return e.dispatchEvent(t), t.defaultPrevented
    }

    var r = n(e);
    r["default"](document).on("navigation:open", ".js-select-menu:not([data-multiple]) .js-navigation-item", function () {
        var e = o(this);
        if (!e) {
            var n = r["default"](this), s = this.closest(".js-select-menu");
            r["default"](s).find(".js-navigation-item.selected").removeClass("selected"), n.addClass("selected"), n.removeClass("indeterminate"), n.find("input[type=radio], input[type=checkbox]").prop("checked", !0).change(), i.fire(this, "selectmenu:selected"), r["default"](s).hasClass("is-loading") || t.deactivate(s)
        }
    }), r["default"](document).on("navigation:open", ".js-select-menu[data-multiple] .js-navigation-item", function () {
        var e = o(this);
        if (!e) {
            var t = r["default"](this), n = t.hasClass("selected");
            t.toggleClass("selected", !n), t.removeClass("indeterminate"), t.find("input[type=radio], input[type=checkbox]").prop("checked", !n).change(), i.fire(this, "selectmenu:selected")
        }
    })
}), define("github/select-menu/button", ["../jquery"], function (e) {
    function t(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var i = t(e);
    i["default"](document).on("selectmenu:selected", ".js-select-menu .js-navigation-item", function () {
        var e = this.closest(".js-select-menu"), t = i["default"](this).find(".js-select-button-text");
        t[0] && i["default"](e).find(".js-select-button").html(t.html());
        var n = i["default"](this).find(".js-select-menu-item-gravatar");
        t[0] && i["default"](e).find(".js-select-button-gravatar").html(n.html())
    })
}), define("github/select-menu/css", ["../jquery", "../visible"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(e), o = i(t);
    n["default"](document).on("selectmenu:change", ".js-select-menu .select-menu-list", function (e) {
        var t = n["default"](this).find(".js-navigation-item");
        if (t.removeClass("last-visible"), n["default"](Array.from(t).filter(o["default"])).last().addClass("last-visible"), !this.hasAttribute("data-filterable-for")) {
            var i = n["default"](e.target).hasClass("filterable-empty");
            n["default"](this).toggleClass("filterable-empty", i)
        }
    })
}), define("github/select-menu/filterable", ["../jquery", "delegated-events"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(e);
    n["default"](document).on("menu:activated selectmenu:load", ".js-select-menu", function () {
        var e = this.querySelector(".js-filterable-field");
        e && e.focus()
    }), n["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        var e = this.querySelector(".js-filterable-field");
        e && (e.value = "", t.fire(e, "filterable:change"));
        for (var i = this.querySelectorAll(".js-navigation-item.selected"), n = 0; n < i.length; n++) {
            var o = i[n], r = o.querySelector("input[type=radio], input[type=checkbox]");
            r && o.classList.toggle("selected", r.checked)
        }
        if (this.contains(document.activeElement))try {
            document.activeElement.blur()
        } catch (s) {
        }
    })
}), define("github/select-menu/navigation", ["../navigation", "../jquery"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(t);
    n["default"](document).on("menu:activate", ".js-select-menu", function () {
        n["default"](this).find(":focus").blur(), n["default"](this).find(".js-menu-target").addClass("selected");
        var t = this.querySelector(".js-navigation-container");
        t && e.push(t)
    }), n["default"](document).on("menu:deactivate", ".js-select-menu", function () {
        n["default"](this).find(".js-menu-target").removeClass("selected");
        var t = this.querySelector(".js-navigation-container");
        t && e.pop(t)
    }), n["default"](document).on("filterable:change selectmenu:tabchange", ".js-select-menu .select-menu-list", function () {
        var t = this.closest(".js-select-menu"), i = t.querySelector(".js-navigation-container");
        i && e.refocus(i, this)
    })
}), define("github/select-menu/new", ["../jquery", "delegated-events"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e, t) {
        for (var i = e.querySelectorAll(".js-select-button-text, .js-select-menu-filter-text"), n = 0, o = i.length; o > n; n++) {
            var r = i[n], s = r.textContent.toLowerCase().trim();
            if (s === t.toLowerCase())return !0
        }
        return !1
    }

    var o = i(e);
    o["default"](document).on("filterable:change", ".js-select-menu .select-menu-list", function (e) {
        e = e.originalEvent;
        var i = this.querySelector(".js-new-item-form");
        if (i) {
            var r = e.relatedTarget.value;
            if ("" === r || n(this, r))o["default"](this).removeClass("is-showing-new-item-form"); else {
                o["default"](this).addClass("is-showing-new-item-form");
                var s = i.querySelector(".js-new-item-name");
                "innerText" in s ? s.innerText = r : s.textContent = r;
                var a = i.querySelector(".js-new-item-value");
                a && (a.value = r)
            }
        }
        t.fire(e.target, "selectmenu:change")
    })
}), define("github/select-menu/tabs", ["../jquery", "delegated-events", "../observe"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, i) {
        for (var n = e.getAttribute("data-tab-filter"), o = e.closest(".js-select-menu"), r = o.querySelectorAll(".js-select-menu-tab-bucket"), s = 0; s < r.length; s++) {
            var a = r[s];
            a.getAttribute("data-tab-filter") === n && (a.classList.toggle("selected", i), i && t.fire(a, "selectmenu:tabchange"))
        }
    }

    var r = n(e);
    r["default"](document).on("menu:activate selectmenu:load", ".js-select-menu", function () {
        var e = r["default"](this).find(".js-select-menu-tab");
        return e.attr("aria-selected", "false").removeClass("selected"), e.first().attr("aria-selected", "true").addClass("selected")
    }), r["default"](document).on("click", ".js-select-menu .js-select-menu-tab", function () {
        var e = this.closest(".js-select-menu"), t = e.querySelector(".js-select-menu-tab.selected");
        t && (t.classList.remove("selected"), t.setAttribute("aria-selected", !1)), this.classList.add("selected"), this.setAttribute("aria-selected", !0);
        var i = e.querySelector(".js-filterable-field");
        if (i) {
            var n = this.getAttribute("data-filter-placeholder");
            n && i.setAttribute("placeholder", n), i.focus()
        }
        return !1
    }), i.observe(".js-select-menu .js-select-menu-tab.selected", {
        add: function () {
            o(this, !0)
        }, remove: function () {
            o(this, !1)
        }
    })
}), define("github/select-menu", ["./select-menu/ajax", "./select-menu/base", "./select-menu/button", "./select-menu/css", "./select-menu/filterable", "./select-menu/loading", "./select-menu/navigation", "./select-menu/new", "./select-menu/tabs"], function () {
}), define("github/skip-autofill", [], function () {
    document.addEventListener("focus", function (e) {
        e.target.nodeType !== Node.DOCUMENT_NODE && e.target.classList.contains("js-skip-password-autofill") && (e.target.type = "password")
    }, !0)
}), define("github/sticky", ["./observe"], function (e) {
    function t() {
        f.length ? i() : n()
    }

    function i() {
        h || (window.addEventListener("resize", o, {passive: !0}), document.addEventListener("scroll", o, {passive: !0}), h = !0)
    }

    function n() {
        window.removeEventListener("resize", o, {passive: !0}), document.removeEventListener("scroll", o, {passive: !0}), h = !1
    }

    function o() {
        f.forEach(function (e) {
            if (e.element.offsetHeight > 0) {
                var t = e.element, i = e.placeholder, n = e.top, o = t.getBoundingClientRect();
                if (i) {
                    var r = i.getBoundingClientRect();
                    t.classList.contains("is-stuck") ? r.top > parseInt(n) ? a(e) : u(e) : o.top <= parseInt(n) && s(e)
                } else o.top <= parseInt(n) ? s(e) : a(e)
            }
        })
    }

    function r(e) {
        var t = window.getComputedStyle(e), i = t.position;
        return /sticky/.test(i)
    }

    function s(e) {
        var t = e.element, i = e.placeholder, n = e.top;
        if (i) {
            var o = t.getBoundingClientRect();
            t.style.top = n, t.style.left = o.left + "px", t.style.width = o.width + "px", t.style.marginTop = 0, t.style.position = "fixed", i.style.display = "block"
        }
        t.classList.add("is-stuck")
    }

    function a(e) {
        var t = e.element, i = e.placeholder;
        i && (t.style.position = "static", t.style.marginTop = i.style.marginTop, i.style.display = "none"), t.classList.remove("is-stuck")
    }

    function u(e) {
        var t = e.element, i = e.placeholder, n = e.offsetParent, o = e.top;
        if (i) {
            var r = t.getBoundingClientRect(), s = i.getBoundingClientRect();
            if (t.style.left = s.left + "px", t.style.width = s.width + "px", n) {
                var a = n.getBoundingClientRect();
                a.bottom < r.height + parseInt(o) && (t.style.top = a.bottom - r.height + "px")
            }
        }
    }

    function c(e) {
        if (r(e))return null;
        var t = e.previousElementSibling;
        if (t && t.classList.contains("is-placeholder"))return t;
        var i = document.createElement("div");
        return i.style.visibility = "hidden", i.style.display = "none", i.style.height = window.getComputedStyle(e).height, i.className = e.className, i.classList.remove("js-sticky"), i.classList.add("is-placeholder"), e.parentNode.insertBefore(i, e)
    }

    function l(e) {
        var t = c(e), i = window.getComputedStyle(e).position;
        e.style.position = "static";
        var n = e.offsetParent;
        e.style.position = "fixed";
        var o = window.getComputedStyle(e).top, r = {
            element: e,
            placeholder: t,
            offsetParent: n,
            top: "auto" == o ? 0 : o
        };
        e.style.position = i, f.push(r)
    }

    function d(e) {
        var t = f.map(function (e) {
            return e.element
        }).indexOf(e);
        f.splice(t, 1)
    }

    var h = !1, f = [];
    e.observe(".js-sticky", {
        add: function () {
            l(this), o(), t()
        }, remove: function () {
            d(this), t()
        }
    })
}), define("github/sudo-required", ["./jquery", "delegated-events", "./observe", "./sudo"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        u || (e.preventDefault(), e.stopImmediatePropagation(), a["default"]().then(function () {
            u = !0, s["default"](e.target)[e.type](), u = !1
        })["catch"](function (i) {
            t.fire(e.target, "sudo:failed", {error: i})
        }))
    }

    var s = o(e), a = o(n), u = !1;
    i.observe("a.js-sudo-required", {
        add: function () {
            s["default"](this).on("click", r)
        }, remove: function () {
            s["default"](this).off("click", r)
        }
    }), i.observe("form.js-sudo-required", {
        add: function () {
            s["default"](this).on("submit", r)
        }, remove: function () {
            s["default"](this).off("submit", r)
        }
    })
}), define("github/toggler", ["./jquery", "delegated-events"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(e);
    t.on("click", ".js-toggler-container .js-toggler-target", function (e) {
        if (1 === e.which) {
            var t = this.closest(".js-toggler-container");
            t.classList.toggle("on")
        }
    }), n["default"](document).on("ajaxSend", ".js-toggler-container", function () {
        this.classList.remove("success", "error"), this.classList.add("loading")
    }), n["default"](document).on("ajaxComplete", ".js-toggler-container", function () {
        this.classList.remove("loading")
    }), n["default"](document).on("ajaxSuccess", ".js-toggler-container", function () {
        this.classList.add("success")
    }), n["default"](document).on("ajaxError", ".js-toggler-container", function () {
        this.classList.add("error")
    })
}), define("github/touch-events-observer", ["./observe"], function (e) {
    function t() {
    }

    e.observe(".js-touch-events", {
        add: function (e) {
            e.addEventListener("click", t)
        }, remove: function (e) {
            e.removeEventListener("click", t)
        }
    })
}), define("github/tutorial", ["./jquery", "delegated-events"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(e);
    t.on("click", ".js-dismiss-review-tutorial", function () {
        n["default"](document.querySelector(".js-dismiss-review-tutorial-form")).submit();
        for (var e = document.querySelectorAll(".js-dismissible-notice-review-start"), t = 0; t < e.length; t++) {
            var i = e[t];
            i.classList.add("d-none")
        }
    }), t.on("click", ".js-dismiss-notice-review-finish", function () {
        n["default"](document.querySelector(".js-dismiss-review-tutorial-finish-form")).submit();
        for (var e = document.querySelectorAll(".js-dismissible-notice-review-finish"), t = 0; t < e.length; t++) {
            var i = e[t];
            i.classList.add("d-none")
        }
    }), t.on("click", ".js-dismiss-notice-review-callout", function () {
        n["default"](document.querySelector(".js-dismiss-review-callout-form")).submit();
        for (var e = document.querySelectorAll(".js-dismissible-notice-review-callout"), t = 0; t < e.length; t++) {
            var i = e[t];
            i.classList.add("d-none")
        }
    })
}), define.amd = "jstimezonedetect", function (e) {
    var t = function () {
        "use strict";
        var e = "s", i = {
            DAY: 864e5,
            HOUR: 36e5,
            MINUTE: 6e4,
            SECOND: 1e3,
            BASELINE_YEAR: 2014,
            MAX_SCORE: 864e6,
            AMBIGUITIES: {
                "America/Denver": ["America/Mazatlan"],
                "Europe/London": ["Africa/Casablanca"],
                "America/Chicago": ["America/Mexico_City"],
                "America/Asuncion": ["America/Campo_Grande", "America/Santiago"],
                "America/Montevideo": ["America/Sao_Paulo", "America/Santiago"],
                "Asia/Beirut": ["Asia/Amman", "Asia/Jerusalem", "Europe/Helsinki", "Asia/Damascus", "Africa/Cairo", "Asia/Gaza", "Europe/Minsk"],
                "Pacific/Auckland": ["Pacific/Fiji"],
                "America/Los_Angeles": ["America/Santa_Isabel"],
                "America/New_York": ["America/Havana"],
                "America/Halifax": ["America/Goose_Bay"],
                "America/Godthab": ["America/Miquelon"],
                "Asia/Dubai": ["Asia/Yerevan"],
                "Asia/Jakarta": ["Asia/Krasnoyarsk"],
                "Asia/Shanghai": ["Asia/Irkutsk", "Australia/Perth"],
                "Australia/Sydney": ["Australia/Lord_Howe"],
                "Asia/Tokyo": ["Asia/Yakutsk"],
                "Asia/Dhaka": ["Asia/Omsk"],
                "Asia/Baku": ["Asia/Yerevan"],
                "Australia/Brisbane": ["Asia/Vladivostok"],
                "Pacific/Noumea": ["Asia/Vladivostok"],
                "Pacific/Majuro": ["Asia/Kamchatka", "Pacific/Fiji"],
                "Pacific/Tongatapu": ["Pacific/Apia"],
                "Asia/Baghdad": ["Europe/Minsk", "Europe/Moscow"],
                "Asia/Karachi": ["Asia/Yekaterinburg"],
                "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"]
            }
        }, n = function (e) {
            var t = -e.getTimezoneOffset();
            return null !== t ? t : 0
        }, o = function () {
            var t = n(new Date(i.BASELINE_YEAR, 0, 2)), o = n(new Date(i.BASELINE_YEAR, 5, 2)), r = t - o;
            return 0 > r ? t + ",1" : r > 0 ? o + ",1," + e : t + ",0"
        }, r = function () {
            var e, t;
            if ("undefined" != typeof Intl && "undefined" != typeof Intl.DateTimeFormat && (e = Intl.DateTimeFormat(), "undefined" != typeof e && "undefined" != typeof e.resolvedOptions))return t = e.resolvedOptions().timeZone, t && (t.indexOf("/") > -1 || "UTC" === t) ? t : void 0
        }, s = function (e) {
            for (var t = new Date(e, 0, 1, 0, 0, 1, 0).getTime(), i = new Date(e, 12, 31, 23, 59, 59).getTime(), n = t, o = new Date(n).getTimezoneOffset(), r = null, s = null; i - 864e5 > n;) {
                var u = new Date(n), c = u.getTimezoneOffset();
                c !== o && (o > c && (r = u), c > o && (s = u), o = c), n += 864e5
            }
            return r && s ? {s: a(r).getTime(), e: a(s).getTime()} : !1
        }, a = function h(e, t, n) {
            "undefined" == typeof t && (t = i.DAY, n = i.HOUR);
            for (var o = new Date(e.getTime() - t).getTime(), r = e.getTime() + t, s = new Date(o).getTimezoneOffset(), a = o, u = null; r - n > a;) {
                var c = new Date(a), l = c.getTimezoneOffset();
                if (l !== s) {
                    u = c;
                    break
                }
                a += n
            }
            return t === i.DAY ? h(u, i.HOUR, i.MINUTE) : t === i.HOUR ? h(u, i.MINUTE, i.SECOND) : u
        }, u = function (e, t, i, n) {
            if ("N/A" !== i)return i;
            if ("Asia/Beirut" === t) {
                if ("Africa/Cairo" === n.name && 13983768e5 === e[6].s && 14116788e5 === e[6].e)return 0;
                if ("Asia/Jerusalem" === n.name && 13959648e5 === e[6].s && 14118588e5 === e[6].e)return 0
            } else if ("America/Santiago" === t) {
                if ("America/Asuncion" === n.name && 14124816e5 === e[6].s && 1397358e6 === e[6].e)return 0;
                if ("America/Campo_Grande" === n.name && 14136912e5 === e[6].s && 13925196e5 === e[6].e)return 0
            } else if ("America/Montevideo" === t) {
                if ("America/Sao_Paulo" === n.name && 14136876e5 === e[6].s && 1392516e6 === e[6].e)return 0
            } else if ("Pacific/Auckland" === t && "Pacific/Fiji" === n.name && 14142456e5 === e[6].s && 13961016e5 === e[6].e)return 0;
            return i
        }, c = function (e, n) {
            for (var o = function (t) {
                for (var o = 0, r = 0; r < e.length; r++)if (t.rules[r] && e[r]) {
                    if (!(e[r].s >= t.rules[r].s && e[r].e <= t.rules[r].e)) {
                        o = "N/A";
                        break
                    }
                    if (o = 0, o += Math.abs(e[r].s - t.rules[r].s), o += Math.abs(t.rules[r].e - e[r].e), o > i.MAX_SCORE) {
                        o = "N/A";
                        break
                    }
                }
                return o = u(e, n, o, t)
            }, r = {}, s = t.olson.dst_rules.zones, a = s.length, c = i.AMBIGUITIES[n], l = 0; a > l; l++) {
                var d = s[l], h = o(s[l]);
                "N/A" !== h && (r[d.name] = h)
            }
            for (var f in r)if (r.hasOwnProperty(f))for (var v = 0; v < c.length; v++)if (c[v] === f)return f;
            return n
        }, l = function (e) {
            var i = function () {
                for (var e = [], i = 0; i < t.olson.dst_rules.years.length; i++) {
                    var n = s(t.olson.dst_rules.years[i]);
                    e.push(n)
                }
                return e
            }, n = function (e) {
                for (var t = 0; t < e.length; t++)if (e[t] !== !1)return !0;
                return !1
            }, o = i(), r = n(o);
            return r ? c(o, e) : e
        }, d = function () {
            var e = r();
            return e || (e = t.olson.timezones[o()], "undefined" != typeof i.AMBIGUITIES[e] && (e = l(e))), {
                name: function () {
                    return e
                }
            }
        };
        return {determine: d}
    }();
    t.olson = t.olson || {}, t.olson.timezones = {
        "-720,0": "Etc/GMT+12",
        "-660,0": "Pacific/Pago_Pago",
        "-660,1,s": "Pacific/Apia",
        "-600,1": "America/Adak",
        "-600,0": "Pacific/Honolulu",
        "-570,0": "Pacific/Marquesas",
        "-540,0": "Pacific/Gambier",
        "-540,1": "America/Anchorage",
        "-480,1": "America/Los_Angeles",
        "-480,0": "Pacific/Pitcairn",
        "-420,0": "America/Phoenix",
        "-420,1": "America/Denver",
        "-360,0": "America/Guatemala",
        "-360,1": "America/Chicago",
        "-360,1,s": "Pacific/Easter",
        "-300,0": "America/Bogota",
        "-300,1": "America/New_York",
        "-270,0": "America/Caracas",
        "-240,1": "America/Halifax",
        "-240,0": "America/Santo_Domingo",
        "-240,1,s": "America/Asuncion",
        "-210,1": "America/St_Johns",
        "-180,1": "America/Godthab",
        "-180,0": "America/Argentina/Buenos_Aires",
        "-180,1,s": "America/Montevideo",
        "-120,0": "America/Noronha",
        "-120,1": "America/Noronha",
        "-60,1": "Atlantic/Azores",
        "-60,0": "Atlantic/Cape_Verde",
        "0,0": "UTC",
        "0,1": "Europe/London",
        "60,1": "Europe/Berlin",
        "60,0": "Africa/Lagos",
        "60,1,s": "Africa/Windhoek",
        "120,1": "Asia/Beirut",
        "120,0": "Africa/Johannesburg",
        "180,0": "Asia/Baghdad",
        "180,1": "Europe/Moscow",
        "210,1": "Asia/Tehran",
        "240,0": "Asia/Dubai",
        "240,1": "Asia/Baku",
        "270,0": "Asia/Kabul",
        "300,1": "Asia/Yekaterinburg",
        "300,0": "Asia/Karachi",
        "330,0": "Asia/Kolkata",
        "345,0": "Asia/Kathmandu",
        "360,0": "Asia/Dhaka",
        "360,1": "Asia/Omsk",
        "390,0": "Asia/Rangoon",
        "420,1": "Asia/Krasnoyarsk",
        "420,0": "Asia/Jakarta",
        "480,0": "Asia/Shanghai",
        "480,1": "Asia/Irkutsk",
        "525,0": "Australia/Eucla",
        "525,1,s": "Australia/Eucla",
        "540,1": "Asia/Yakutsk",
        "540,0": "Asia/Tokyo",
        "570,0": "Australia/Darwin",
        "570,1,s": "Australia/Adelaide",
        "600,0": "Australia/Brisbane",
        "600,1": "Asia/Vladivostok",
        "600,1,s": "Australia/Sydney",
        "630,1,s": "Australia/Lord_Howe",
        "660,1": "Asia/Kamchatka",
        "660,0": "Pacific/Noumea",
        "690,0": "Pacific/Norfolk",
        "720,1,s": "Pacific/Auckland",
        "720,0": "Pacific/Majuro",
        "765,1,s": "Pacific/Chatham",
        "780,0": "Pacific/Tongatapu",
        "780,1,s": "Pacific/Apia",
        "840,0": "Pacific/Kiritimati"
    }, t.olson.dst_rules = {
        years: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        zones: [{
            name: "Africa/Cairo",
            rules: [{e: 12199572e5, s: 12090744e5}, {e: 1250802e6, s: 1240524e6}, {
                e: 12858804e5,
                s: 12840696e5
            }, !1, !1, !1, {e: 14116788e5, s: 1406844e6}]
        }, {
            name: "Africa/Casablanca",
            rules: [{e: 12202236e5, s: 12122784e5}, {e: 12508092e5, s: 12438144e5}, {
                e: 1281222e6,
                s: 12727584e5
            }, {e: 13120668e5, s: 13017888e5}, {e: 13489704e5, s: 1345428e6}, {
                e: 13828392e5,
                s: 13761e8
            }, {e: 14142888e5, s: 14069448e5}]
        }, {
            name: "America/Asuncion",
            rules: [{e: 12050316e5, s: 12243888e5}, {e: 12364812e5, s: 12558384e5}, {
                e: 12709548e5,
                s: 12860784e5
            }, {e: 13024044e5, s: 1317528e6}, {e: 1333854e6, s: 13495824e5}, {
                e: 1364094e6,
                s: 1381032e6
            }, {e: 13955436e5, s: 14124816e5}]
        }, {
            name: "America/Campo_Grande",
            rules: [{e: 12032172e5, s: 12243888e5}, {e: 12346668e5, s: 12558384e5}, {
                e: 12667212e5,
                s: 1287288e6
            }, {e: 12981708e5, s: 13187376e5}, {e: 13302252e5, s: 1350792e6}, {
                e: 136107e7,
                s: 13822416e5
            }, {e: 13925196e5, s: 14136912e5}]
        }, {
            name: "America/Goose_Bay",
            rules: [{e: 122559486e4, s: 120503526e4}, {e: 125704446e4, s: 123648486e4}, {
                e: 128909886e4,
                s: 126853926e4
            }, {e: 13205556e5, s: 129998886e4}, {e: 13520052e5, s: 13314456e5}, {
                e: 13834548e5,
                s: 13628952e5
            }, {e: 14149044e5, s: 13943448e5}]
        }, {
            name: "America/Havana",
            rules: [{e: 12249972e5, s: 12056436e5}, {e: 12564468e5, s: 12364884e5}, {
                e: 12885012e5,
                s: 12685428e5
            }, {e: 13211604e5, s: 13005972e5}, {e: 13520052e5, s: 13332564e5}, {
                e: 13834548e5,
                s: 13628916e5
            }, {e: 14149044e5, s: 13943412e5}]
        }, {
            name: "America/Mazatlan",
            rules: [{e: 1225008e6, s: 12074724e5}, {e: 12564576e5, s: 1238922e6}, {
                e: 1288512e6,
                s: 12703716e5
            }, {e: 13199616e5, s: 13018212e5}, {e: 13514112e5, s: 13332708e5}, {
                e: 13828608e5,
                s: 13653252e5
            }, {e: 14143104e5, s: 13967748e5}]
        }, {
            name: "America/Mexico_City",
            rules: [{e: 12250044e5, s: 12074688e5}, {e: 1256454e6, s: 12389184e5}, {
                e: 12885084e5,
                s: 1270368e6
            }, {e: 1319958e6, s: 13018176e5}, {e: 13514076e5, s: 13332672e5}, {
                e: 13828572e5,
                s: 13653216e5
            }, {e: 14143068e5, s: 13967712e5}]
        }, {
            name: "America/Miquelon",
            rules: [{e: 12255984e5, s: 12050388e5}, {e: 1257048e6, s: 12364884e5}, {
                e: 12891024e5,
                s: 12685428e5
            }, {e: 1320552e6, s: 12999924e5}, {e: 13520016e5, s: 1331442e6}, {
                e: 13834512e5,
                s: 13628916e5
            }, {e: 14149008e5, s: 13943412e5}]
        }, {
            name: "America/Santa_Isabel",
            rules: [{e: 12250116e5, s: 1207476e6}, {e: 12564612e5, s: 12389256e5}, {
                e: 12885156e5,
                s: 12703752e5
            }, {e: 13199652e5, s: 13018248e5}, {e: 13514148e5, s: 13332744e5}, {
                e: 13828644e5,
                s: 13653288e5
            }, {e: 1414314e6, s: 13967784e5}]
        }, {
            name: "America/Santiago",
            rules: [{e: 1206846e6, s: 1223784e6}, {e: 1237086e6, s: 12552336e5}, {
                e: 127035e7,
                s: 12866832e5
            }, {e: 13048236e5, s: 13138992e5}, {e: 13356684e5, s: 13465584e5}, {
                e: 1367118e6,
                s: 13786128e5
            }, {e: 13985676e5, s: 14100624e5}]
        }, {
            name: "America/Sao_Paulo",
            rules: [{e: 12032136e5, s: 12243852e5}, {e: 12346632e5, s: 12558348e5}, {
                e: 12667176e5,
                s: 12872844e5
            }, {e: 12981672e5, s: 1318734e6}, {e: 13302216e5, s: 13507884e5}, {
                e: 13610664e5,
                s: 1382238e6
            }, {e: 1392516e6, s: 14136876e5}]
        }, {
            name: "Asia/Amman",
            rules: [{e: 1225404e6, s: 12066552e5}, {e: 12568536e5, s: 12381048e5}, {
                e: 12883032e5,
                s: 12695544e5
            }, {e: 13197528e5, s: 13016088e5}, !1, !1, {e: 14147064e5, s: 13959576e5}]
        }, {
            name: "Asia/Damascus",
            rules: [{e: 12254868e5, s: 120726e7}, {e: 125685e7, s: 12381048e5}, {
                e: 12882996e5,
                s: 12701592e5
            }, {e: 13197492e5, s: 13016088e5}, {e: 13511988e5, s: 13330584e5}, {
                e: 13826484e5,
                s: 1364508e6
            }, {e: 14147028e5, s: 13959576e5}]
        }, {name: "Asia/Dubai", rules: [!1, !1, !1, !1, !1, !1, !1]}, {
            name: "Asia/Gaza",
            rules: [{e: 12199572e5, s: 12066552e5}, {e: 12520152e5, s: 12381048e5}, {
                e: 1281474e6,
                s: 126964086e4
            }, {e: 1312146e6, s: 130160886e4}, {e: 13481784e5, s: 13330584e5}, {
                e: 13802292e5,
                s: 1364508e6
            }, {e: 1414098e6, s: 13959576e5}]
        }, {
            name: "Asia/Irkutsk",
            rules: [{e: 12249576e5, s: 12068136e5}, {e: 12564072e5, s: 12382632e5}, {
                e: 12884616e5,
                s: 12697128e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Jerusalem",
            rules: [{e: 12231612e5, s: 12066624e5}, {e: 1254006e6, s: 1238112e6}, {
                e: 1284246e6,
                s: 12695616e5
            }, {e: 131751e7, s: 1301616e6}, {e: 13483548e5, s: 13330656e5}, {
                e: 13828284e5,
                s: 13645152e5
            }, {e: 1414278e6, s: 13959648e5}]
        }, {
            name: "Asia/Kamchatka",
            rules: [{e: 12249432e5, s: 12067992e5}, {e: 12563928e5, s: 12382488e5}, {
                e: 12884508e5,
                s: 12696984e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Krasnoyarsk",
            rules: [{e: 12249612e5, s: 12068172e5}, {e: 12564108e5, s: 12382668e5}, {
                e: 12884652e5,
                s: 12697164e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Omsk",
            rules: [{e: 12249648e5, s: 12068208e5}, {e: 12564144e5, s: 12382704e5}, {
                e: 12884688e5,
                s: 126972e7
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Vladivostok",
            rules: [{e: 12249504e5, s: 12068064e5}, {e: 12564e8, s: 1238256e6}, {
                e: 12884544e5,
                s: 12697056e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yakutsk",
            rules: [{e: 1224954e6, s: 120681e7}, {e: 12564036e5, s: 12382596e5}, {
                e: 1288458e6,
                s: 12697092e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yekaterinburg",
            rules: [{e: 12249684e5, s: 12068244e5}, {e: 1256418e6, s: 1238274e6}, {
                e: 12884724e5,
                s: 12697236e5
            }, !1, !1, !1, !1]
        }, {
            name: "Asia/Yerevan",
            rules: [{e: 1224972e6, s: 1206828e6}, {e: 12564216e5, s: 12382776e5}, {
                e: 1288476e6,
                s: 12697272e5
            }, {e: 13199256e5, s: 13011768e5}, !1, !1, !1]
        }, {
            name: "Australia/Lord_Howe",
            rules: [{e: 12074076e5, s: 12231342e5}, {e: 12388572e5, s: 12545838e5}, {
                e: 12703068e5,
                s: 12860334e5
            }, {e: 13017564e5, s: 1317483e6}, {e: 1333206e6, s: 13495374e5}, {
                e: 13652604e5,
                s: 1380987e6
            }, {e: 139671e7, s: 14124366e5}]
        }, {
            name: "Australia/Perth",
            rules: [{e: 12068136e5, s: 12249576e5}, !1, !1, !1, !1, !1, !1]
        }, {
            name: "Europe/Helsinki",
            rules: [{e: 12249828e5, s: 12068388e5}, {e: 12564324e5, s: 12382884e5}, {
                e: 12884868e5,
                s: 1269738e6
            }, {e: 13199364e5, s: 13011876e5}, {e: 1351386e6, s: 13326372e5}, {
                e: 13828356e5,
                s: 13646916e5
            }, {e: 14142852e5, s: 13961412e5}]
        }, {
            name: "Europe/Minsk",
            rules: [{e: 12249792e5, s: 12068352e5}, {e: 12564288e5, s: 12382848e5}, {
                e: 12884832e5,
                s: 12697344e5
            }, !1, !1, !1, !1]
        }, {
            name: "Europe/Moscow",
            rules: [{e: 12249756e5, s: 12068316e5}, {e: 12564252e5, s: 12382812e5}, {
                e: 12884796e5,
                s: 12697308e5
            }, !1, !1, !1, !1]
        }, {
            name: "Pacific/Apia",
            rules: [!1, !1, !1, {e: 13017528e5, s: 13168728e5}, {e: 13332024e5, s: 13489272e5}, {
                e: 13652568e5,
                s: 13803768e5
            }, {e: 13967064e5, s: 14118264e5}]
        }, {
            name: "Pacific/Fiji", rules: [!1, !1, {e: 12696984e5, s: 12878424e5}, {e: 13271544e5, s: 1319292e6}, {
                e: 1358604e6, s: 13507416e5
            }, {e: 139005e7, s: 1382796e6}, {e: 14215032e5, s: 14148504e5}]
        }, {
            name: "Europe/London",
            rules: [{e: 12249828e5, s: 12068388e5}, {e: 12564324e5, s: 12382884e5}, {
                e: 12884868e5,
                s: 1269738e6
            }, {e: 13199364e5, s: 13011876e5}, {e: 1351386e6, s: 13326372e5}, {
                e: 13828356e5,
                s: 13646916e5
            }, {e: 14142852e5, s: 13961412e5}]
        }]
    }, "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = t : "undefined" != typeof define && null !== define && null != define.amd ? define([], function () {
        return t
    }) : "undefined" == typeof e ? window.jstz = t : e.jstz = t
}(), delete define.amd, define("github/tz-cookie", ["jstimezonedetect", "./timezone"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n() {
        try {
            return o["default"].determine().name()
        } catch (e) {
            if (!(e instanceof RangeError))throw e
        }
    }

    var o = i(e), r = i(t);
    requestIdleCallback(function () {
        var e = r["default"]() || n();
        if (e) {
            var t = "https:" === location.protocol ? "secure" : "";
            document.cookie = "tz=" + encodeURIComponent(e) + "; path=/; " + t
        }
    })
}), define("github/u2f", ["exports"], function (e) {
    function t() {
        for (var e = arguments.length, t = Array(e), i = 0; e > i; i++)t[i] = arguments[i];
        return new Promise(function (e, i) {
            var n;
            (n = window.u2f).sign.apply(n, t.concat([function (t) {
                if (null != t.errorCode && 0 !== t.errorCode) {
                    var n = new Error("Signing request failed");
                    n.code = t.errorCode, i(n)
                } else e(t)
            }]))
        })
    }

    function i() {
        for (var e = arguments.length, t = Array(e), i = 0; e > i; i++)t[i] = arguments[i];
        return new Promise(function (e, i) {
            var n;
            (n = window.u2f).register.apply(n, t.concat([function (t) {
                if (null != t.errorCode && 0 !== t.errorCode) {
                    var n = new Error("Device registration failed");
                    n.code = t.errorCode, i(n)
                } else e(t)
            }]))
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.u2fSign = t, e.u2fRegister = i
}), define("github/u2f-auth-form", ["exports", "delegated-events", "./u2f"], function (e, t, i) {
    function n() {
        Array.from(document.querySelectorAll(".js-u2f-error")).forEach(function (e) {
            return e.classList.add("d-none")
        }), document.querySelector(".js-u2f-login-waiting").classList.remove("d-none");
        var e = document.querySelector(".js-u2f-auth-form"), n = "true" === e.getAttribute("data-remote"), o = e.querySelector(".js-u2f-auth-response"), r = e.getAttribute("data-app-id"), s = e.getAttribute("data-challenge"), a = JSON.parse(e.getAttribute("data-sign-requests"));
        i.u2fSign(r, s, a).then(function (i) {
            o.value = JSON.stringify(i), n ? t.fire(e, "submit") : e.submit()
        })["catch"](function (e) {
            var t = ".js-u2f-auth-error";
            switch (e.code) {
                case 4:
                    t = ".js-u2f-auth-not-registered-error";
                    break;
                case 5:
                    t = ".js-u2f-auth-timeout"
            }
            document.querySelector(t).classList.remove("d-none"), document.querySelector(".js-u2f-login-waiting").classList.add("d-none")
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.waitForDevice = n
}), define("github/u2f-login", ["./feature-detection", "./observe", "delegated-events", "./u2f-auth-form"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var r = o(e);
    i.on("click", ".js-u2f-auth-retry", function () {
        n.waitForDevice()
    }), t.observe(".js-u2f-auth-form-body", function () {
        this.classList.toggle("unavailable", !r["default"].u2f), r["default"].u2f && n.waitForDevice()
    })
}), define("github/u2f-settings", ["./jquery", "./feature-detection", "./fetch", "./observe", "delegated-events", "./u2f"], function (e, t, i, n, o, r) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t, i) {
        return null == i ? JSON.parse(e.getAttribute(t)) : void e.setAttribute(t, JSON.stringify(i))
    }

    function u(e) {
        var t = document.querySelector(".js-add-u2f-registration-form");
        return a(t, "data-sign-requests", e)
    }

    function c(e) {
        var t = document.querySelector(".js-add-u2f-registration-form");
        return a(t, "data-register-requests", e)
    }

    function l(e) {
        e.register_requests && c(e.register_requests), e.sign_requests && u(e.sign_requests)
    }

    function d(e) {
        var t = document.createElement("div");
        t.innerHTML = e;
        var i = t.firstChild;
        document.querySelector(".js-u2f-registrations").appendChild(i)
    }

    function h(e, t) {
        var i = document.querySelector(".js-new-u2f-registration");
        i.classList.add("is-showing-error"), i.classList.remove("is-sending"), Array.from(i.querySelectorAll(".js-u2f-error")).forEach(function (e) {
            return e.classList.add("d-none")
        });
        var n = i.querySelector(e);
        null != t && (n.textContent = t), n.classList.remove("d-none")
    }

    function f() {
        var e = document.querySelector(".js-new-u2f-registration");
        e.classList.remove("is-sending", "is-active"), document.querySelector(".js-u2f-registration-nickname-field").value = ""
    }

    function v(e) {
        var t = document.querySelector(".js-add-u2f-registration-form");
        t.elements.response.value = JSON.stringify(e), i.fetchJSON(t.action, {
            method: t.method,
            body: new FormData(t)
        }).then(function (e) {
            l(e), f(), d(e.registration)
        })["catch"](function (e) {
            e.response ? e.response.json().then(function (e) {
                l(e), h(".js-u2f-server-error", e.error)
            }) : h(".js-u2f-network-error")
        })
    }

    function m() {
        var e = document.querySelector(".js-new-u2f-registration");
        e.classList.add("is-sending"), e.classList.remove("is-showing-error");
        var t = document.querySelector(".js-add-u2f-registration-form"), i = t.getAttribute("data-app-id");
        r.u2fRegister(i, c(), u()).then(v)["catch"](function (e) {
            var t = ".js-u2f-other-error";
            switch (e.code) {
                case 4:
                    t = ".js-u2f-registered-error";
                    break;
                case 5:
                    t = ".js-u2f-timeout-error"
            }
            h(t)
        })
    }

    var p = s(e), g = s(t);
    p["default"](document).on("ajaxSend", ".js-u2f-registration-delete", function () {
        this.closest(".js-u2f-registration").classList.add("is-sending")
    }), p["default"](document).on("ajaxSuccess", ".js-u2f-registration-delete", function (e, t) {
        l(t.responseJSON), this.closest(".js-u2f-registration").remove()
    }), o.on("click", ".js-add-u2f-registration-link", function () {
        var e = document.querySelector(".js-new-u2f-registration");
        e.classList.add("is-active"), e.classList.remove("is-showing-error");
        var t = document.querySelector(".js-u2f-registration-nickname-field");
        t.focus()
    }), o.on("click", ".js-u2f-register-retry", function () {
        m()
    }), o.on("submit", ".js-add-u2f-registration-form", function (e) {
        e.preventDefault(), m()
    }), n.observe(".js-u2f-box", function () {
        this.classList.toggle("available", g["default"].u2f)
    })
}), define("github/xhr", ["exports"], function (e) {
    function t(e) {
        return new Promise(function (t, i) {
            e.onload = function () {
                200 === e.status ? t(e.responseText) : i(new Error("XMLHttpRequest " + e.statusText))
            }, e.onerror = i, e.send()
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.send = t
}), define("github/updatable-content", ["exports", "./jquery", "./has-interactions", "./preserve-position", "./xhr"], function (e, t, i, n, o) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        var t, n;
        return regeneratorRuntime.async(function (r) {
            for (; ;)switch (r.prev = r.next) {
                case 0:
                    if (!l.get(e)) {
                        r.next = 2;
                        break
                    }
                    return r.abrupt("return");
                case 2:
                    return t = new XMLHttpRequest, t.open("GET", e.getAttribute("data-url")), t.setRequestHeader("Accept", "text/html"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest"), l.set(e, t), r.prev = 7, r.next = 10, regeneratorRuntime.awrap(o.send(t));
                case 10:
                    if (n = r.sent, !i.hasInteractions(e)) {
                        r.next = 13;
                        break
                    }
                    throw new Error("element had interactions");
                case 13:
                    return r.abrupt("return", u(e, n));
                case 16:
                    r.prev = 16, r.t0 = r["catch"](7), "XMLHttpRequest abort" !== r.t0.message && console.warn("Failed to update content", e, r.t0);
                case 19:
                    return r.prev = 19, l["delete"](e), r.finish(19);
                case 22:
                case"end":
                    return r.stop()
            }
        }, null, this, [[7, 16, 19, 22]])
    }

    function a(e, t) {
        var i;
        return regeneratorRuntime.async(function (n) {
            for (; ;)switch (n.prev = n.next) {
                case 0:
                    return i = l.get(e), i && i.abort(), n.abrupt("return", u(e, t));
                case 3:
                case"end":
                    return n.stop()
            }
        }, null, this)
    }

    function u(e, t) {
        return n.preserveInteractivePosition(function () {
            var i = c["default"](c["default"].parseHTML(t.trim()));
            return c["default"](e).replaceWith(i), i
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateContent = s, e.replaceContent = a;
    var c = r(t), l = new WeakMap
}), define("github/updatable-content-observer", ["./jquery", "./updatable-content"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var n = i(e);
    n["default"](document).on("socket:message", ".js-updatable-content", function (e) {
        this === e.target && t.updateContent(this)
    })
}), define("github/upload/avatar", ["../facebox", "../fetch", "delegated-events"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    var o = n(e);
    i.on("upload:setup", ".js-upload-avatar-image", function (e) {
        var t = e.detail.policyRequest, i = this.getAttribute("data-alambic-organization"), n = this.getAttribute("data-alambic-owner-type"), o = this.getAttribute("data-alambic-owner-id");
        i && t.body.append("organization_id", i), n && t.body.append("owner_type", n), o && t.body.append("owner_id", o)
    }), i.on("upload:complete", ".js-upload-avatar-image", function (e) {
        var i = e.detail.result, n = "/settings/avatars/" + i.id;
        o["default"](function () {
            t.fetchText(n).then(o["default"])
        })
    })
}), define("github/text", ["exports"], function (e) {
    function t(e, t, i) {
        var n = e.value.substring(0, e.selectionEnd), o = e.value.substring(e.selectionEnd);
        n = n.replace(t, i), o = o.replace(t, i), e.value = n + o, e.selectionStart = n.length, e.selectionEnd = n.length
    }

    function i(e, t) {
        var i = e.selectionEnd, n = e.value.substring(0, i), o = e.value.substring(i), r = "" === e.value || n.match(/\n$/) ? "" : "\n";
        e.value = n + r + t + o, e.selectionStart = i + t.length, e.selectionEnd = i + t.length
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.replaceText = t, e.insertText = i
}), define("github/png-scanner", ["exports"], function (e) {
    function t(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var i = function () {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        return function (t, i, n) {
            return i && e(t.prototype, i), n && e(t, n), t
        }
    }(), n = 2303741511, o = 4, r = function () {
        function e(i) {
            t(this, e), this.dataview = new DataView(i), this.pos = 0
        }

        return i(e, null, [{
            key: "fromFile", value: function (t) {
                return new Promise(function (i, n) {
                    var o = new FileReader;
                    o.onload = function () {
                        i(new e(o.result))
                    }, o.onerror = function () {
                        n(o.error)
                    }, o.readAsArrayBuffer(t)
                })
            }
        }]), i(e, [{
            key: "advance", value: function (e) {
                return this.pos += e
            }
        }, {
            key: "readInt", value: function (e) {
                var t = this.dataview["getUint" + 8 * e](this.pos);
                return this.advance(e), t
            }
        }, {
            key: "readChar", value: function () {
                return this.readInt(1)
            }
        }, {
            key: "readShort", value: function () {
                return this.readInt(2)
            }
        }, {
            key: "readLong", value: function () {
                return this.readInt(4)
            }
        }, {
            key: "readString", value: function (e) {
                for (var t = [], i = 0; e > i; i++)t.push(String.fromCharCode(this.readChar()));
                return t.join("")
            }
        }, {
            key: "scan", value: function (e) {
                if (this.readLong() !== n)throw new Error("invalid PNG");
                for (this.advance(4); ;) {
                    var t = this.readLong(), i = this.readString(4), r = this.pos + t + o;
                    if (e.call(this, i, t) === !1 || "IEND" === i)break;
                    this.pos = r
                }
            }
        }]), e
    }();
    e["default"] = r
}), define("github/image-dimensions", ["exports", "./png-scanner"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e) {
        if ("image/png" !== e.type)return Promise.resolve({});
        var t = e.slice(0, 10240, e.type);
        return o["default"].fromFile(t).then(function (e) {
            var t = {};
            return e.scan(function (e) {
                switch (e) {
                    case"IHDR":
                        return t.width = this.readLong(), void(t.height = this.readLong());
                    case"pHYs":
                        var i = this.readLong(), n = this.readLong(), o = this.readChar(), s = void 0;
                        return 1 === o && (s = r), s && (t.ppi = Math.round((i + n) / 2 * s)), !1;
                    case"IDAT":
                        return !1
                }
            }), t
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = n;
    var o = i(t), r = .0254
}), define("github/html-validation", ["exports"], function (e) {
    function t(e) {
        if (null == o) {
            var t = e.createElement("input");
            "checkValidity" in t ? (t.required = !0, t.value = "hi", o = t.cloneNode().checkValidity()) : o = !1
        }
        return o
    }

    function i(e) {
        if (t(e.ownerDocument))return e.checkValidity();
        if ("FORM" === e.tagName) {
            for (var n = e.elements, o = 0; o < n.length; o++) {
                var r = n[o];
                if (!i(r))return !1
            }
            return !0
        }
        if (e.hasAttribute("required") && !e.value)return !1;
        if (e.hasAttribute("pattern")) {
            var s = new RegExp("^(?:" + e.getAttribute("pattern") + ")$");
            if (0 !== e.value.search(s))return !1
        }
        return !0
    }

    function n(e, t) {
        var n = "FORM" === e.tagName ? e : e.form;
        null == t && (t = i(n));
        for (var o = n.querySelectorAll("button[data-disable-invalid]"), r = 0; r < o.length; r++) {
            var s = o[r];
            s.disabled = !t
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.checkValidity = i, e.revalidate = n;
    var o = void 0
}), define("github/upload/markdown", ["../text", "../image-dimensions", "delegated-events", "../html-validation", "../setimmediate"], function (e, t, i, n, o) {
    function r(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function s(e) {
        return e.toLowerCase().replace(/[^a-z0-9\-_]+/gi, ".").replace(/\.{2,}/g, ".").replace(/^\.|\.$/gi, "")
    }

    function a(e) {
        var t = c(e) ? "!" : "";
        return t + "[Uploading " + e.name + "\u2026]()"
    }

    function u(e) {
        return s(e).replace(/\.[^.]+$/, "").replace(/\./g, " ")
    }

    function c(e) {
        return ["image/gif", "image/png", "image/jpg", "image/jpeg"].indexOf(e.type) > -1
    }

    function l(e) {
        var t = e.split(".").pop().toLowerCase();
        return ["gif", "png", "jpg", "jpeg"].indexOf(t) > -1
    }

    var d = r(t), h = r(o), f = 144;
    i.on("upload:setup", ".js-upload-markdown-image", function (t) {
        var i = this.querySelector(".js-comment-field");
        e.insertText(i, a(t.detail.file) + "\n"), n.revalidate(i, !1)
    }), i.on("upload:complete", ".js-upload-markdown-image", function (t) {
        function i(t) {
            var i = "[" + o.file.name + "](" + o.policy.asset.href + ")";
            if (c(o.file)) {
                var r = u(o.policy.asset.name), a = o.policy.asset.href;
                if (t && t.ppi === f) {
                    var d = Math.round(t.width / 2);
                    i = '<img width="' + d + '" alt="' + r + '" src="' + a + '">'
                } else i = "![" + r + "](" + a + ")"
            }
            e.replaceText(s, l, i), n.revalidate(s)
        }

        var o = t.detail, r = this, s = r.querySelector(".js-comment-field"), l = a(o.file);
        d["default"](o.file).then(i, function (e) {
            i(), h["default"](function () {
                throw e
            })
        })
    }), i.on("upload:error", ".js-upload-markdown-image", function (t) {
        var i = this.querySelector(".js-comment-field"), o = a(t.detail.file);
        e.replaceText(i, o, ""), n.revalidate(i)
    }), i.on("upload:invalid", ".js-upload-markdown-image", function (t) {
        var i = this.querySelector(".js-comment-field"), o = a(t.detail.file);
        e.replaceText(i, o, ""), n.revalidate(i)
    }), i.on("upload:drop:links", ".js-upload-markdown-image", function (t) {
        var i = this.querySelector(".js-comment-field");
        t.detail.links.forEach(function (t) {
            var n = l(t) ? "\n![](" + t + ")\n" : t;
            e.insertText(i, n)
        })
    }), i.on("upload:drop:text", ".js-upload-markdown-image", function (t) {
        var i = this.querySelector(".js-comment-field");
        e.insertText(i, t.detail.text)
    })
}), define("github/upload/release-file", ["delegated-events", "../setimmediate"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e) {
        return e.closest("form").querySelector("#release_id").value
    }

    var o = i(t);
    e.on("click", ".js-release-remove-file", function () {
        var e = this.closest(".js-release-file");
        e.classList.add("delete"), e.querySelector("input.destroy").value = "true"
    }), e.on("click", ".js-release-undo-remove-file", function () {
        var e = this.closest(".js-release-file");
        e.classList.remove("delete"), e.querySelector("input.destroy").value = ""
    });
    var r = [];
    e.on("release:saved", ".js-release-form", function () {
        o["default"](function () {
            r.forEach(function (e) {
                return e()
            }), r.length = 0
        });
        var e = 0;
        Array.from(this.querySelectorAll(".js-releases-field .js-release-file")).forEach(function (t) {
            t.classList.contains("delete") ? t.remove() : t.classList.contains("js-template") || e++
        });
        var t = this.querySelector(".js-releases-field");
        t.classList.toggle("not-populated", !e), t.classList.toggle("is-populated", e)
    }), e.on("upload:setup", ".js-upload-release-file", function (e) {
        function t() {
            o.body.append("release_id", n(a));
            var e = document.querySelectorAll(".js-releases-field .js-release-file.delete .id");
            if (e.length) {
                var t = Array.from(e).map(function (e) {
                    return e.value
                });
                o.body.append("deletion_candidates", t.join(","))
            }
        }

        var i = e.detail, o = i.policyRequest, s = i.preprocess, a = this;
        n(a) ? t() : (s.push(new Promise(function (e) {
            return r.push(e)
        }).then(t)), 1 === r.length && document.querySelector(".js-save-draft").click())
    }), e.on("upload:start", ".js-upload-release-file", function (e) {
        var t = e.detail.policy;
        this.querySelector(".js-upload-meter").classList.remove("d-none");
        var i = t.asset.replaced_asset;
        i && Array.from(document.querySelectorAll(".js-releases-field .js-release-file .id")).forEach(function (e) {
            Number(e.value) === i && e.closest(".js-release-file").remove()
        })
    }), e.on("upload:complete", ".js-upload-release-file", function (e) {
        var t = e.detail, i = t.policy, n = document.querySelector(".js-releases-field"), o = n.querySelector(".js-template").cloneNode(!0);
        o.classList.remove("template", "js-template"), o.querySelector("input.id").value = i.asset.id || t.result.id;
        var r = i.asset.name || i.asset.href.split("/").pop();
        Array.from(o.querySelectorAll(".filename")).forEach(function (e) {
            "INPUT" === e.tagName ? e.value = r : e.textContent = r
        });
        var s = i.asset.size ? "(" + (i.asset.size / 1048576).toFixed(2) + " MB)" : "";
        o.querySelector(".filesize").textContent = s, n.appendChild(o), n.classList.remove("not-populated"), n.classList.add("is-populated"), this.querySelector(".js-upload-meter").classList.add("d-none")
    }), e.on("upload:progress", ".js-upload-release-file", function (e) {
        var t = this.querySelector(".js-upload-meter");
        t.style.width = e.detail.percent + "%"
    })
}), define("github/upload/upload-manifest-file", ["../fetch", "../jquery", "../observe", "delegated-events", "../once", "../pjax"], function (e, t, i, n, o, r) {
    function s(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function a(e, t) {
        var i = e.closest(".js-upload-manifest-file-container"), n = i.querySelector(".js-upload-progress");
        n.classList.add("active"), e.classList.add("is-progress-bar");
        var o = n.querySelector(".js-upload-meter-text");
        o.querySelector(".js-upload-meter-range-start").textContent = t.batch.uploaded + 1, o.querySelector(".js-upload-meter-range-end").textContent = t.batch.size
    }

    function u(e) {
        e.classList.remove("is-progress-bar");
        var t = e.closest(".js-upload-manifest-file-container"), i = t.querySelector(".js-upload-progress");
        i.classList.remove("active");
        var n = t.querySelector(".js-upload-meter-text");
        n.querySelector(".js-upload-meter-filename").textContent = ""
    }

    function c(e) {
        return e._path ? e._path + "/" + e.name : e.name
    }

    function l() {
        u(this)
    }

    var d = s(t), h = s(o), f = s(r), v = [], m = new WeakMap;
    n.on("upload:drop:setup", ".js-upload-manifest-file", function (e) {
        var t = e.detail.files, i = parseInt(this.getAttribute("data-directory-upload-max-files"), 10);
        t.length > i && (e.preventDefault(), this.classList.add("is-too-many"))
    }), n.on("upload:drop:setup", ".js-upload-manifest-tree-view", function (e) {
        e.preventDefault();
        var t = e.detail.upload, i = document.querySelector("#js-repo-pjax-container");
        h["default"](i, "pjax:success").then(function () {
            t(i.querySelector(".js-uploadable-container"))
        }), f["default"]({url: this.getAttribute("data-drop-url"), container: i})
    }), n.on("upload:setup", ".js-upload-manifest-file", function (t) {
        function i() {
            o.body.append("upload_manifest_id", m.get(s))
        }

        var n = t.detail, o = n.policyRequest, r = n.preprocess;
        a(this, t.detail);
        var s = this;
        if (m.get(s) ? i() : r.push(new Promise(function (e) {
                return v.push(e)
            }).then(i)), !(v.length > 1 || m.get(s))) {
            var u = this.closest(".js-upload-manifest-file-container").querySelector(".js-upload-manifest-form");
            e.fetchJSON(u.action, {method: u.method, body: new FormData(u)}).then(function (e) {
                var t = document.querySelector(".js-manifest-commit-form");
                t.elements.manifest_id.value = e.upload_manifest.id, m.set(s, e.upload_manifest.id), v.forEach(function (e) {
                    return e()
                }), v.length = 0
            })
        }
    }), n.on("upload:start", ".js-upload-manifest-file", function (e) {
        var t = e.detail, i = this.closest(".js-upload-manifest-file-container"), n = i.querySelector(".js-upload-progress"), o = n.querySelector(".js-upload-meter-text");
        o.querySelector(".js-upload-meter-range-start").textContent = t.batch.uploaded + 1, o.querySelector(".js-upload-meter-filename").textContent = c(t.file)
    }), n.on("upload:complete", ".js-upload-manifest-file", function (e) {
        var t = e.detail, i = document.querySelector(".js-manifest-commit-file-template"), n = i.rows[0].cloneNode(!0);
        n.querySelector(".name").textContent = c(t.file);
        var o = t.policy.asset.id || t.result.id;
        n.querySelector(".js-remove-manifest-file-form").elements.file_id.value = o;
        var r = document.querySelector(".js-manifest-file-list");
        r.classList.remove("d-none"), this.classList.add("is-file-list");
        var s = document.querySelector(".js-upload-progress");
        s.classList.add("is-file-list");
        var a = r.querySelector(".js-manifest-file-list-root");
        a.appendChild(n), t.batch.isFinished() && u(this)
    }), n.on("upload:progress", ".js-upload-manifest-file", function (e) {
        var t = e.detail, i = this.closest(".js-upload-manifest-file-container"), n = i.querySelector(".js-upload-meter");
        n.style.width = t.batch.percent() + "%"
    }), n.on("upload:error", ".js-upload-manifest-file", l), n.on("upload:invalid", ".js-upload-manifest-file", l), d["default"](document).on("ajaxSuccess", ".js-remove-manifest-file-form", function () {
        var e = this.closest(".js-manifest-file-list-root");
        if (this.closest(".js-manifest-file-entry").remove(), !e.hasChildNodes()) {
            var t = e.closest(".js-manifest-file-list");
            t.classList.add("d-none");
            var i = document.querySelector(".js-upload-manifest-file");
            i.classList.remove("is-file-list");
            var n = document.querySelector(".js-upload-progress");
            n.classList.remove("is-file-list")
        }
    }), i.observe(".js-manifest-ready-check", function () {
        var t = this.getAttribute("data-redirect-url");
        e.fetchPoll(this.getAttribute("data-poll-url")).then(function () {
            window.location = t
        })["catch"](function () {
            document.querySelector(".js-manifest-ready-check").classList.add("d-none"), document.querySelector(".js-manifest-ready-check-failed").classList.remove("d-none")
        })
    })
}), define("github/uploads", ["./fetch", "delegated-events", "./observe", "./upload/avatar", "./upload/markdown", "./upload/release-file", "./upload/upload-manifest-file"], function (e, t, i) {
    function n(e) {
        return e.closest("form").elements.authenticity_token.value
    }

    function o(e, t) {
        var i;
        (i = e.classList).remove.apply(i, O), e.classList.add(t)
    }

    function r(i, n) {
        i.files.forEach(function (r) {
            var c = s(r, n), l = [];
            t.fire(n, "upload:setup", {
                batch: i,
                file: r,
                policyRequest: c,
                preprocess: l
            }) && Promise.all(l).then(function () {
                return e.fetchJSON(c.url, c)
            }).then(function (e) {
                var t = u(i, r, e, n);
                R.upload(r, t)
            })["catch"](function (e) {
                if (t.fire(n, "upload:invalid", {
                        batch: i,
                        file: r,
                        error: e
                    }), e.response)e.response.text().then(function (t) {
                    var i = e.response.status, s = a({status: i, body: t}, r);
                    o(n, s)
                }); else {
                    var s = a({status: 0});
                    o(n, s)
                }
            })
        })
    }

    function s(e, t) {
        var i = t.getAttribute("data-upload-policy-url"), o = t.getAttribute("data-upload-repository-id"), r = new FormData;
        return r.append("name", e.name), r.append("size", e.size), r.append("content_type", e.type), r.append("authenticity_token", n(t)), o && r.append("repository_id", o), e._path && r.append("directory", e._path), {
            url: i,
            method: "post",
            body: r,
            headers: {}
        }
    }

    function a(e, t) {
        if (400 === e.status)return "is-bad-file";
        if (422 !== e.status)return "is-failed";
        var i = JSON.parse(e.body);
        if (!i || !i.errors)return "is-failed";
        for (var n = 0, o = i.errors.length; o > n; n++) {
            var r = i.errors[n];
            switch (r.field) {
                case"size":
                    var s = t ? t.size : null;
                    return null != s && 0 === parseInt(s) ? "is-empty" : "is-too-big";
                case"file_count":
                    return "is-too-many";
                case"width":
                case"height":
                    return "is-bad-dimensions";
                case"name":
                    return "already_exists" === r.code ? "is-duplicate-filename" : "is-bad-file";
                case"content_type":
                    return "is-bad-file";
                case"uploader_id":
                    return "is-bad-permissions";
                case"repository_id":
                    return "is-repository-required";
                case"format":
                    return "is-bad-format"
            }
        }
        return "is-failed"
    }

    function u(i, r, s, u) {
        return {
            to: s.upload_url,
            form: s.form,
            header: s.header,
            sameOrigin: s.same_origin,
            csrf: n(u),
            start: function () {
                o(u, "is-uploading"), t.fire(u, "upload:start", {batch: i, file: r, policy: s})
            },
            progress: function (e) {
                i.progress(r, e), t.fire(u, "upload:progress", {batch: i, file: r, percent: e})
            },
            complete: function (a) {
                if (i.completed(r), a && a.href && (s.asset || (s.asset = {}), s.asset.href = a.href), s.asset_upload_url && s.asset_upload_url.length > 0) {
                    var c = new FormData;
                    c.append("authenticity_token", n(u)), e.fetchJSON(s.asset_upload_url, {method: "put", body: c})
                }
                t.fire(u, "upload:complete", {batch: i, file: r, policy: s, result: a}), o(u, "is-default")
            },
            error: function (e) {
                t.fire(u, "upload:error", {batch: i, file: r, policy: s});
                var n = a(e);
                o(u, n)
            }
        }
    }

    function c(e) {
        return Array.from(e.types).indexOf("Files") >= 0
    }

    function l(e) {
        return Array.from(e.types).indexOf("text/uri-list") >= 0
    }

    function d(e) {
        return Array.from(e.types).indexOf("text/plain") >= 0
    }

    function h(e) {
        var t = [];
        return e.forEach(function (e) {
            Array.isArray(e) ? t = t.concat(h(e)) : t.push(e)
        }), t
    }

    function f(e) {
        return e.name.startsWith(".")
    }

    function v(e) {
        return Array.from(e).filter(function (e) {
            return !f(e)
        })
    }

    function m(e, t) {
        return t.getFilesAndDirectories ? t.getFilesAndDirectories().then(function (e) {
            var i = v(e).map(function (e) {
                return m(t.path, e)
            });
            return Promise.all(i)
        }) : (t._path = e, t)
    }

    function p(e) {
        return m("", e).then(h)
    }

    function g(e) {
        return new Promise(function (t, i) {
            e.file(t, i)
        })
    }

    function b(e) {
        return new Promise(function (t, i) {
            e.createReader().readEntries(t, i)
        })
    }

    function y(e, t) {
        return t.isDirectory ? b(t).then(function (e) {
            var i = v(e).map(function (e) {
                return y(t.fullPath, e)
            });
            return Promise.all(i)
        }) : g(t).then(function (t) {
            return t._path = e, t
        })
    }

    function j(e) {
        return e.items && Array.from(e.items).some(function (e) {
                return e.webkitGetAsEntry && e.webkitGetAsEntry().isDirectory
            })
    }

    function w(e) {
        var t = Array.from(e.items).map(function (e) {
            return e.webkitGetAsEntry()
        }), i = v(t).map(function (e) {
            return y("", e)
        });
        return Promise.all(i).then(h)
    }

    function x(e, t) {
        var i = new z(e);
        r(i, t)
    }

    function q(e) {
        return c(e) ? "copy" : l(e) ? "link" : d(e) ? "copy" : "none"
    }

    function k(e) {
        switch (e) {
            case"image/gif":
                return "image.gif";
            case"image/png":
                return "image.png";
            case"image/jpeg":
                return "image.jpg"
        }
    }

    function S(e) {
        e.preventDefault()
    }

    function L(e) {
        e.preventDefault()
    }

    function C(e) {
        var t = this;
        if (!$) {
            clearTimeout(F), F = setTimeout(function () {
                return t.classList.remove("dragover")
            }, 200);
            var i = q(e.dataTransfer);
            e.dataTransfer.dropEffect = i, this.classList.add("dragover"), e.stopPropagation(), e.preventDefault()
        }
    }

    function A(e) {
        e.dataTransfer.dropEffect = "none", this.classList.remove("dragover"), e.stopPropagation(), e.preventDefault()
    }

    function E(e) {
        e.target.classList && e.target.classList.contains("js-document-dropzone") && this.classList.remove("dragover")
    }

    function T(e) {
        var i = this;
        this.classList.remove("dragover"), document.body.classList.remove("dragover");
        var n = e.dataTransfer;
        if (c(n))!function () {
            var e = null;
            e = i.hasAttribute("data-directory-upload") && n.getFilesAndDirectories ? p(n) : i.hasAttribute("data-directory-upload") && j(n) ? w(n) : Promise.resolve(v(n.files));
            var r = i;
            e.then(function (e) {
                if (!e.length)return void o(r, "is-hidden-file");
                var i = x.bind(null, e), n = !t.fire(r, "upload:drop:setup", {upload: i, files: e});
                n || x(e, r)
            })
        }(); else if (l(n)) {
            var r = (n.getData("text/uri-list") || "").split("\r\n");
            r.length && t.fire(this, "upload:drop:links", {links: r})
        } else d(n) && t.fire(this, "upload:drop:text", {text: n.getData("text/plain")});
        e.stopPropagation(), e.preventDefault()
    }

    function _(e) {
        if (e.clipboardData && e.clipboardData.items) {
            var t = Array.from(e.clipboardData.items).map(function (e) {
                return [e, k(e.type)]
            }).filter(function (e) {
                return e[1]
            }).shift();
            if (t) {
                var i = H(t, 2), n = i[0], o = i[1], r = n.getAsFile();
                r.name = o, x([r], this), e.preventDefault()
            }
        }
    }

    function M(e) {
        e.target.classList.contains("js-manual-file-chooser") && (x(e.target.files, this), e.target.value = "")
    }

    function D() {
        var e = this.querySelector(".js-uploadable-container");
        o(e, "is-default")
    }

    function P() {
        $ = !0
    }

    function I() {
        $ = !1
    }

    var H = function () {
        function e(e, t) {
            var i = [], n = !0, o = !1, r = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
            } catch (u) {
                o = !0, r = u
            } finally {
                try {
                    !n && a["return"] && a["return"]()
                } finally {
                    if (o)throw r
                }
            }
            return i
        }

        return function (t, i) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(), N = function () {
        function e() {
            this.uploads = [], this.busy = !1
        }

        return e.prototype.upload = function (e, t) {
            function i() {
            }

            this.uploads.push({
                file: e,
                to: t.to,
                sameOrigin: t.sameOrigin,
                csrf: t.csrf,
                form: t.form || {},
                header: t.header || {},
                start: t.start || i,
                progress: t.progress || i,
                complete: t.complete || i,
                error: t.error || i
            }), this.process()
        }, e.prototype.process = function () {
            var e = this;
            if (!this.busy && 0 !== this.uploads.length) {
                var t = this.uploads.shift();
                this.busy = !0;
                var i = new XMLHttpRequest;
                i.open("POST", t.to, !0);
                for (var n in t.header)i.setRequestHeader(n, t.header[n]);
                i.onloadstart = function () {
                    t.start()
                }, i.onload = function () {
                    204 === i.status ? t.complete({}) : 201 === i.status ? t.complete(JSON.parse(i.responseText)) : t.error({
                        status: i.status,
                        body: i.responseText
                    }), e.busy = !1, e.process()
                }, i.onerror = function () {
                    t.error({status: 0, body: ""})
                }, i.upload.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var i = Math.round(e.loaded / e.total * 100);
                        t.progress(i)
                    }
                };
                var o = new FormData;
                t.sameOrigin && o.append("authenticity_token", t.csrf);
                for (var r in t.form)o.append(r, t.form[r]);
                o.append("file", t.file), i.send(o)
            }
        }, e
    }(), O = ["is-default", "is-uploading", "is-bad-file", "is-duplicate-filename", "is-too-big", "is-too-many", "is-hidden-file", "is-failed", "is-bad-dimensions", "is-empty", "is-bad-permissions", "is-repository-required", "is-bad-format"], R = new N, z = function () {
        function e(e) {
            this.files = Array.from(e), this.percentages = this.files.map(function () {
                return 0
            }), this.size = this.files.length, this.total = this.files.reduce(function (e, t) {
                return e + t.size
            }, 0), this.uploaded = 0
        }

        return e.prototype.percent = function () {
            var e = this, t = this.files.map(function (t, i) {
                return t.size * e.percentages[i] / 100
            }).reduce(function (e, t) {
                return e + t
            });
            return Math.round(t / this.total * 100)
        }, e.prototype.progress = function (e, t) {
            var i = this.files.indexOf(e);
            return this.percentages[i] = t
        }, e.prototype.completed = function () {
            return this.uploaded += 1
        }, e.prototype.isFinished = function () {
            return this.uploaded === this.files.length
        }, e
    }(), F = null, B = 0, $ = !1;
    i.observe(".js-document-dropzone", {
        add: function () {
            document.body.addEventListener("dragstart", P), document.body.addEventListener("dragend", I), document.body.addEventListener("dragenter", C), document.body.addEventListener("dragover", C), document.body.addEventListener("dragleave", E), this.addEventListener("drop", T)
        }, remove: function () {
            document.body.removeEventListener("dragstart", P), document.body.removeEventListener("dragend", I), document.body.removeEventListener("dragenter", C), document.body.removeEventListener("dragover", C), document.body.removeEventListener("dragleave", E), this.removeEventListener("drop", T)
        }
    }), i.observe(".js-uploadable-container", {
        add: function () {
            0 === B++ && (document.addEventListener("drop", S), document.addEventListener("dragover", L)), this.addEventListener("dragenter", C), this.addEventListener("dragover", C), this.addEventListener("dragleave", A), this.addEventListener("drop", T), this.addEventListener("paste", _), this.addEventListener("change", M), this.closest("form").addEventListener("reset", D)
        }, remove: function () {
            0 === --B && (document.removeEventListener("drop", S), document.removeEventListener("dragover", L)), this.removeEventListener("dragenter", C), this.removeEventListener("dragover", C), this.removeEventListener("dragleave", A), this.removeEventListener("drop", T), this.removeEventListener("paste", _), this.removeEventListener("change", M), this.closest("form").removeEventListener("reset", D)
        }
    })
}), define("github/user-select-contain", ["delegated-events"], function (e) {
    function t() {
        var e = document.createElement("div");
        return e.style.cssText = "-ms-user-select: element; user-select: contain;", "element" === e.msUserSelect || "contain" === e.userSelect
    }

    !t() && window.getSelection && e.on("click", ".user-select-contain", function () {
        var e = window.getSelection();
        if (e.rangeCount) {
            var t = e.getRangeAt(0).commonAncestorContainer;
            this.contains(t) || e.selectAllChildren(this)
        }
    })
}), define("github-bootstrap", ["./github/accessibility-report", "./github/bulk-actions", "./github/details", "./github/dismiss-notice", "./github/feature-detection", "./github/fixed-offset-fragment-navigation-observer", "./github/gfm", "./github/git-clone-help", "./github/google-analytics-tracking", "./github/hash-change", "./github/homepage/play-video", "./github/link-prefetch-viewed", "./github/menu", "./github/milestone-dragging", "./github/mobile-preference", "./github/pjax", "./github/pjax/capture-keypresses", "./github/pjax/history-navigate", "./github/pjax/link-prefetch", "./github/project-updater", "./github/projects", "./github/pulls/change-base", "./github/pulls/reviews", "./github/select-menu", "./github/skip-autofill", "./github/sticky", "./github/sudo-required", "./github/toggler", "./github/touch-events-observer", "./github/tutorial", "./github/tz-cookie", "./github/u2f-login", "./github/u2f-settings", "./github/updatable-content-observer", "./github/uploads", "./github/user-select-contain"], function () {
}), require("github-bootstrap"), define("github/stats", ["exports", "./proxy-site-detection", "./document-ready"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        var t = document.querySelector("meta[name=" + e + "]");
        return t ? t.getAttribute("content") : void 0
    }

    function r() {
        a = null;
        var e = o("browser-stats-url"), t = o("request-id");
        e && !s["default"](document) && (fetch(e, {
            method: "post",
            body: JSON.stringify([{requestId: t}].concat(u)),
            headers: {"Content-Type": "application/json"}
        }), u = [])
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = function (e) {
        u.push(e), i.loaded.then(function () {
            a || (a = requestIdleCallback(r))
        })
    };
    var s = n(t), a = null, u = []
}), function () {
    var e = require("github/stats")["default"], t = require("github/feature-detection")["default"];
    e({
        browserfeatures: {
            classlist_multi_arg: t.classListMultiArg,
            classlist: t.classList,
            closest: t.closest,
            custom_elements: t.registerElement,
            custom_event: t.CustomEvent,
            emoji: t.emoji,
            emoji_unicode_6: t.emojiUnicodeVersion >= 6,
            emoji_unicode_7: t.emojiUnicodeVersion >= 7,
            emoji_unicode_8: t.emojiUnicodeVersion >= 8,
            emoji_unicode_9: t.emojiUnicodeVersion >= 9,
            fetch: t.fetch,
            matches: t.matches,
            performance_getentries: t.performanceGetEntries,
            performance_mark: t.performanceMark,
            performance_now: t.performanceNow,
            promise: t.Promise,
            send_beacon: t.sendBeacon,
            string_ends_with: t.stringEndsWith,
            string_starts_with: t.stringStartsWith,
            timezone: t.timezone,
            url: t.URL,
            url_search_params: t.URLSearchParams,
            weakmap: t.WeakMap
        }
    })
}(), function () {
    function e() {
        var e = void 0, i = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
        (o = function () {
            try {
                return localStorage.getItem("bundle-urls")
            } catch (e) {
            }
        }()) && (r = function () {
            try {
                return JSON.parse(o)
            } catch (e) {
            }
        }()), null == r && (r = {}), a = t();
        try {
            localStorage.setItem("bundle-urls", JSON.stringify(a))
        } catch (u) {
        }
        return i = function () {
            var t = void 0;
            t = [];
            for (e in a)s = a[e], r[e] !== s && t.push(e);
            return t
        }(), i.length ? n({downloadedbundles: i}) : void 0
    }

    function t() {
        var e = void 0, t = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        for (d = {}, u = i("script"), t = 0, o = u.length; o > t; t++)l = u[t], a = l.src.match(/\/([\w-]+)-[0-9a-f]{64}\.js$/), null != a && (e = a[1], d[e + ".js"] = l.src);
        for (c = i("link[rel=stylesheet]"), n = 0, r = c.length; r > n; n++)s = c[n], a = s.href.match(/\/([\w-]+)-[0-9a-f]{64}\.css$/), null != a && (e = a[1], d[e + ".css"] = s.href);
        return d
    }

    var i = require("github/jquery")["default"], n = require("github/stats")["default"];
    i(window).on("load", e)
}(), function () {
    function e(e) {
        e.preventDefault(), e.stopPropagation()
    }

    var t = require("github/observe"), i = t.observe;
    i("a.btn.disabled", {
        add: function (t) {
            t.addEventListener("click", e)
        }, remove: function (t) {
            t.removeEventListener("click", e)
        }
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/setimmediate")["default"], i = void 0, n = void 0, o = void 0;
    i = function (t) {
        return e(t).closest(".js-check-all-container")[0] || document.body
    }, n = function (e, i, n, o) {
        null == o && (o = !1), i.indeterminate = o, i.checked !== n && (i.checked = n, t(function () {
            var t = new CustomEvent("change", {bubbles: !0, cancelable: !1});
            t.relatedTarget = e, i.dispatchEvent(t)
        }))
    }, e(document).on("change", "input.js-check-all", function (t) {
        var o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
        if (!e(t.relatedTarget).is("input.js-check-all-item")) {
            for (o = e(i(this)), r = o.find("input.js-check-all-item"), s = 0, u = r.length; u > s; s++)a = r[s], n(this, a, this.checked);
            r.removeClass("is-last-changed")
        }
    }), o = null, e(document).on("mousedown", "input.js-check-all-item", function (e) {
        o = e.shiftKey
    }), e(document).on("change", "input.js-check-all-item", function (t) {
        var r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0;
        if (!e(t.relatedTarget).is("input.js-check-all, input.js-check-all-item")) {
            if (r = e(i(this)), a = r.find("input.js-check-all")[0], s = r.find("input.js-check-all-item"), o && (m = s.filter(".is-last-changed")[0]))for (u = s.toArray(), g = [u.indexOf(m), u.indexOf(this)].sort(), y = g[0], d = g[1], b = u.slice(y, +d + 1 || 9e9), h = 0, p = b.length; p > h; h++)v = b[h], n(this, v, this.checked);
            o = null, s.removeClass("is-last-changed"), e(this).addClass("is-last-changed"), j = s.length, l = function () {
                var e = void 0, t = void 0, i = void 0;
                for (i = [], e = 0, t = s.length; t > e; e++)v = s[e], v.checked && i.push(v);
                return i
            }().length, c = l === j, f = j > l && l > 0, n(this, a, c, f)
        }
    }), e(document).on("change", "input.js-check-all-item", function () {
        var t = void 0, n = void 0, o = void 0;
        t = e(i(this)), n = t.find(".js-check-all-count"), n.length && (o = t.find("input.js-check-all-item:checked").length, n.text(o))
    })
}.call(this), function () {
    function e(e) {
        var t = document.createElement("pre");
        return t.style.width = "1px", t.style.height = "1px", t.style.position = "fixed", t.style.top = "5px", t.textContent = e, t
    }

    function t(e) {
        var t = getSelection();
        t.removeAllRanges();
        var i = document.createRange();
        i.selectNodeContents(e), t.addRange(i), document.execCommand("copy"), t.removeAllRanges()
    }

    function i(i) {
        var n = e(i);
        document.body.appendChild(n), t(n), document.body.removeChild(n)
    }

    function n(e) {
        e.select(), document.execCommand("copy"), getSelection().removeAllRanges()
    }

    function o(e) {
        return "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName
    }

    var r = require("github/jquery")["default"], s = require("github/observe"), a = s.observe, u = require("github/once")["default"], c = require("github/failbot"), l = c.reportError, d = require("github/inspect")["default"], h = require("zeroclipboard");
    if (r(document).on("click", ".is-copy-enabled .js-zeroclipboard", function () {
            var e = this, r = this.getAttribute("data-clipboard-text");
            if (r)i(r); else {
                var s = this.closest(".js-zeroclipboard-container"), a = s.querySelector(".js-zeroclipboard-target");
                o(a) ? "hidden" === a.type ? i(a.value) : n(a) : t(a)
            }
            var c = this.getAttribute("data-copied-hint"), l = this.getAttribute("aria-label");
            c && c !== l && (this.setAttribute("aria-label", c), u(this, "mouseleave").then(function () {
                null != l ? e.setAttribute("aria-label", l) : e.removeAttribute("aria-label")
            })), this.blur()
        }), !document.documentElement.classList.contains("is-copy-enabled")) {
        var f = void 0, v = void 0, m = null != (f = r("link[rel=assets]").prop("href")) ? f : "/";
        h.config({
            swfPath: m + "static/flash/ZeroClipboard.v" + h.version + ".swf",
            trustedOrigins: [location.hostname],
            flashLoadTimeout: 1e4,
            cacheBust: null != (v = /MSIE/.test(navigator.userAgent) || /Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/.test(navigator.userAgent)) ? v : {"true": !1}
        }), r(document).on("click", "#global-zeroclipboard-html-bridge", function (e) {
            e.stopImmediatePropagation()
        }), a("button.js-zeroclipboard", function (e) {
            var t = void 0, i = void 0, n = void 0;
            n = new h(e), n.on("copy", function (e) {
                var t = void 0, i = void 0, n = void 0, s = void 0, a = void 0;
                return t = e.target, null == t.getAttribute("data-clipboard-text") ? (s = r(t).closest(".js-zeroclipboard-container").find(".js-zeroclipboard-target")[0], s ? (a = o(s) ? s.value : s.textContent, i = e.clipboardData, i.setData("text/plain", a.trim())) : (n = new Error("source of clipboard text not found"), l(n, {
                    eventType: "copy",
                    eventTarget: d(t)
                }))) : void 0
            }), n.on("aftercopy", function () {
                var t = void 0;
                return t = r(this).attr("data-copied-hint"), r("#global-zeroclipboard-html-bridge").attr("aria-label", t || "Copied!"), e.blur()
            }), n.on("error", function () {
                return r("#global-zeroclipboard-html-bridge, .js-zeroclipboard").remove(), r(".js-zeroclipboard-container").addClass("has-zeroclipboard-disabled")
            }), i = function () {
                var e = void 0;
                return this.classList.remove("tooltipped", "tooltipped-s"), e = r(this).attr("aria-label"), r("#global-zeroclipboard-html-bridge").addClass("tooltipped tooltipped-s").attr("aria-label", e || "Copy to clipboard.")
            }, t = function () {
                return r("#global-zeroclipboard-html-bridge").removeClass("tooltipped tooltipped-s")
            }, r(e).hover(i, t)
        })
    }
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/updatable-content"), i = t.replaceContent, n = require("github/html-validation"), o = n.revalidate, r = void 0;
    r = require("github/setimmediate")["default"], e(document).on("ajaxBeforeSend", ".js-new-comment-form", function (t) {
        return this === t.target && e(this).data("remote-xhr") ? (r(function () {
            throw new Error("canceled comment form submission")
        }), !1) : void 0
    }), e(document).on("ajaxSend", ".js-new-comment-form", function (t) {
        return this === t.target ? e(this).find(".js-comment-form-error").hide() : void 0
    }), e(document).on("ajaxSuccess", ".js-new-comment-form", function (t, n, r, s) {
        var a = void 0, u = void 0;
        if (this === t.target) {
            this.reset(), e(this).find(".js-resettable-field").each(function () {
                this.value = this.getAttribute("data-reset-value")
            }), o(this), e(this).find(".js-write-tab").click(), a = s.updateContent;
            for (u in a) {
                var c = a[u], l = document.querySelector(u);
                l ? i(l, c) : console.warn("couldn't find " + u + " for immediate update")
            }
        }
    }), e(document).on("ajaxError", ".js-new-comment-form", function (t, i) {
        var n = void 0, o = void 0;
        if (this === t.target)return o = "You can't comment at this time", 422 === i.status && (n = JSON.parse(i.responseText), n.errors && (o += " \u2014 your comment ", o += " " + n.errors.join(", "))), o += ". ", e(this).find(".js-comment-form-error").show().text(o), !1
    })
}.call(this), function () {
    var e = require("github/observe"), t = e.observe;
    t(".js-comment-and-button", function () {
        function e() {
            var e = this.value.trim();
            e !== o && (o = e, t.textContent = e ? t.getAttribute("data-comment-text") : n)
        }

        var t = this, i = t.form.querySelector(".js-comment-field"), n = t.textContent, o = !1;
        return {
            add: function () {
                i.addEventListener("input", e), i.addEventListener("change", e)
            }, remove: function () {
                i.removeEventListener("input", e), i.removeEventListener("change", e)
            }
        }
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0;
    t = require("github/has-interactions").hasDirtyFields, e(document).on("click", ".js-comment-edit-button", function () {
        var t = void 0;
        t = e(this).closest(".js-comment"), t.addClass("is-comment-editing"), t.find(".js-write-tab").click(), t.find(".js-comment-field").focus().trigger("change")
    }), e(document).on("click", ".js-comment-cancel-button", function () {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
        if (i = e(this).closest("form"), t(i[0]) && !confirm(e(this).attr("data-confirm-text")))return !1;
        for (s = i.find("input, textarea"), o = 0, r = s.length; r > o; o++)n = s[o], n.value = n.defaultValue;
        return e(this).closest(".js-comment").removeClass("is-comment-editing"), !1
    }), e(document).on("ajaxSend", ".js-comment-delete, .js-comment-update, .js-issue-update", function (t, i) {
        var n = void 0;
        if (t.target === t.currentTarget) {
            n = e(this).closest(".js-comment"), n.addClass("is-comment-loading"), n.find(".btn-sm").addClass("disabled");
            var o = n.attr("data-body-version");
            return o ? i.setRequestHeader("X-Body-Version", o) : void 0
        }
    }), e(document).on("ajaxError", ".js-comment-update", function (t, i, n, o) {
        var r = void 0, s = void 0, a = void 0, u = void 0;
        if (t.target === t.currentTarget && (console.error("ajaxError for js-comment-update", o), 422 === i.status))try {
            if (a = JSON.parse(i.responseText), r = e(this).closest(".js-comment"), a.stale)return i.stale = !0, r.addClass("is-comment-stale"), r.find(".btn-sm").addClass("disabled"), t.preventDefault();
            if (a.errors)return u = "There was an error posting your comment: " + a.errors.join(", "), r.find(".js-comment-update-error").text(u).show(), t.preventDefault()
        } catch (c) {
            return s = c, console.error("Error trying to handle ajaxError for js-comment-update: " + s)
        }
    }), e(document).on("ajaxComplete", ".js-comment-delete, .js-comment-update", function (t, i) {
        var n = void 0;
        if (t.target === t.currentTarget)return n = e(this).closest(".js-comment"), n.removeClass("is-comment-loading"), n.find(".btn-sm").removeClass("disabled"), i.stale ? n.find(".form-actions button[type=submit].btn-sm").addClass("disabled") : void 0
    }), e(document).on("ajaxSuccess", ".js-comment-delete", function () {
        var t = void 0, i = void 0;
        return t = e(this).closest(".js-comment"), i = e(this).closest(".js-comment-container"), 1 !== i.find(".js-comment").length && (i = t), i.fadeOut(function () {
            return t.remove()
        })
    }), e(document).on("ajaxSuccess", ".js-comment-update", function (t, i, n, o) {
        var r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        if (t.target === t.currentTarget) {
            for (r = e(this).closest(".js-comment"), s = e(this).closest(".js-comment-container"), s.length || (s = r), r.find(".js-comment-body").html(o.body), r.find(".js-comment-update-error").hide(), r.attr("data-body-version", o.newBodyVersion), l = r.find("input, textarea"), u = 0, c = l.length; c > u; u++)a = l[u], a.defaultValue = a.value;
            return r.removeClass("is-comment-stale"), r.removeClass("is-comment-editing")
        }
    }), e(document).on("ajaxSuccess", ".js-issue-update", function (e, t, i, n) {
        var o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        for (s = this, o = s.closest(".js-details-container"), o.classList.remove("open"), null != n.issue_title && (o.querySelector(".js-issue-title").textContent = n.issue_title, u = o.closest(".js-issues-results"), l = u && u.querySelector(".js-merge-pull-request textarea"), l && l.value === l.defaultValue && (l.value = l.defaultValue = n.issue_title)), document.title = n.page_title, d = s.elements, a = 0, c = d.length; c > a; a++)r = d[a], r.defaultValue = r.value
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("focusin", ".js-write-bucket", function () {
        return e(this).addClass("focused")
    }), e(document).on("focusout", ".js-write-bucket", function () {
        return e(this).removeClass("focused")
    })
}.call(this), function () {
    var e = require("github/menu").deactivate, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0;
    f = require("github/observe").observe, o = require("delegated-events"), a = require("github/hotkey")["default"], c = function (e) {
        return e.trim().split("\n").length > 1
    }, p = function (e, t) {
        return Array(t + 1).join(e)
    }, j = function (e, t) {
        for (; e[t] && null != e[t - 1] && !e[t - 1].match(/\s/);)t--;
        return t
    }, y = function (e, t) {
        for (; e[t] && !e[t].match(/\s/);)t++;
        return t
    }, n = null, u = function (e, t) {
        var i = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
        if (c = t.text, u = t.selectionStart, a = t.selectionEnd, s = e.selectionStart, null === n || n) {
            e.contenteditable = !0;
            try {
                n = document.execCommand("insertText", !1, c)
            } catch (l) {
                n = !1
            }
            e.contenteditable = !1
        }
        if (!n) {
            r = e.value.slice(0, e.selectionStart), i = e.value.slice(e.selectionEnd);
            try {
                document.execCommand("ms-beginUndoUnit")
            } catch (d) {
            }
            e.value = r + c + i;
            try {
                document.execCommand("ms-endUndoUnit")
            } catch (d) {
            }
            o.fire(e, "input")
        }
        return null != u && null != a ? e.setSelectionRange(u, a) : e.setSelectionRange(s, e.selectionEnd)
    }, g = function (e, t) {
        var n = void 0, o = void 0;
        return o = e.value.slice(e.selectionStart, e.selectionEnd), n = t.orderedList ? m(e) : t.multiline && c(o) ? d(e, t) : i(e, t), u(e, n)
    }, r = function (e, t, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0;
        return e.selectionStart === e.selectionEnd ? (e.selectionStart = j(e.value, e.selectionStart), e.selectionEnd = y(e.value, e.selectionEnd)) : (s = e.selectionStart - t.length, r = e.selectionEnd + i.length, n = e.value.slice(s, e.selectionStart) === t, o = e.value.slice(e.selectionEnd, r) === i, n && o && (e.selectionStart = s, e.selectionEnd = r)), e.value.slice(e.selectionStart, e.selectionEnd)
    }, h = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
        return i = e.value.slice(0, e.selectionStart), t = e.value.slice(e.selectionEnd), o = null != (a = i.match(/\n*$/)) ? a[0].length : void 0, n = null != (u = t.match(/^\n*/)) ? u[0].length : void 0, i.match(/\S/) && 2 > o && (r = p("\n", 2 - o)), t.match(/\S/) && 2 > n && (s = p("\n", 2 - n)), null == r && (r = ""), null == s && (s = ""), {
            newlinesToAppend: r,
            newlinesToPrepend: s
        }
    }, i = function (e, t) {
        var i = void 0, n = void 0, o = void 0, s = void 0, a = void 0, u = void 0, l = void 0, d = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0, w = void 0, x = void 0, q = void 0, k = void 0, S = void 0, L = void 0;
        if (v = t.prefix, k = t.suffix, n = t.blockPrefix, o = t.blockSuffix, b = t.replaceNext, m = t.prefixSpace, j = t.scanFor, L = t.surroundWithNewlines, d = e.selectionStart, l = e.selectionEnd, w = e.value.slice(e.selectionStart, e.selectionEnd), p = c(w) && n.length > 0 ? n + "\n" : v, S = c(w) && o.length > 0 ? "\n" + o : k, m && (i = e.value[e.selectionStart - 1], 0 === e.selectionStart || null == i || i.match(/\s/) || (p = " " + p)), w = r(e, p, S), q = e.selectionStart, x = e.selectionEnd, s = b.length > 0 && S.indexOf(b) > -1 && w.length > 0, L && (g = h(e), a = g.newlinesToAppend, u = g.newlinesToPrepend, p = a + v, S += u), w.startsWith(p) && w.endsWith(S))return y = w.slice(p.length, w.length - S.length), d === l ? (f = d - p.length, f = Math.max(f, q), f = Math.min(f, q + y.length), q = x = f) : (q = q, x = q + y.length), {
            text: y,
            selectionStart: q,
            selectionEnd: x
        };
        if (s)return j.length > 0 && w.match(j) ? (S = S.replace(b, w), y = p + S, q = x = q + p.length, {
            text: y,
            selectionStart: q,
            selectionEnd: x
        }) : (y = p + w + S, q = q + p.length + w.length + S.indexOf(b), x = q + b.length, {
            text: y,
            selectionStart: q,
            selectionEnd: x
        });
        if (y = p + w + S, q = d + p.length, x = l + p.length, t.trimFirst) {
            var C = w.match(/^\s*|\s*$/g), A = C[0] || "", E = C[1] || "";
            y = A + p + w.trim() + S + E, q += A.length, x -= E.length
        }
        return {text: y, selectionStart: q, selectionEnd: x}
    }, d = function (e, t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, f = void 0, v = void 0, m = void 0;
        return s = t.prefix, l = t.suffix, d = t.surroundWithNewlines, f = e.value.slice(e.selectionStart, e.selectionEnd), c = e.selectionStart, u = e.selectionEnd, n = f.split("\n"), v = function () {
            var e = void 0, t = void 0, o = void 0;
            for (o = [], e = 0, t = n.length; t > e; e++)i = n[e], o.push(i.startsWith(s) && i.endsWith(l));
            return o
        }(), m = v.every(function (e) {
            return e
        }), m ? (f = function () {
            var e = void 0, t = void 0, o = void 0;
            for (o = [], e = 0, t = n.length; t > e; e++)i = n[e], o.push(i.slice(s.length, i.length - l.length));
            return o
        }().join("\n"), u = c + f.length) : (f = function () {
            var e = void 0, t = void 0, o = void 0;
            for (o = [], e = 0, t = n.length; t > e; e++)i = n[e], o.push(s + i + l);
            return o
        }().join("\n"), d && (a = h(e), o = a.newlinesToAppend, r = a.newlinesToPrepend, c += o.length, u = c + f.length, f = o + f + r)), {
            text: f,
            selectionStart: c,
            selectionEnd: u
        }
    }, m = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        return s = /^\d+\.\s+/, l = e.value.slice(e.selectionStart, e.selectionEnd), n = l.split("\n"), d = n.every(function (e) {
            return s.test(e)
        }), d ? (n = function () {
            var e = void 0, t = void 0, o = void 0;
            for (o = [], e = 0, t = n.length; t > e; e++)i = n[e], o.push(i.replace(s, ""));
            return o
        }(), l = n.join("\n")) : (n = function () {
            var e = void 0, o = void 0, r = void 0;
            for (r = [], t = e = 0, o = n.length; o > e; t = ++e)i = n[t], r.push(t + 1 + ". " + i);
            return r
        }(), l = n.join("\n"), a = h(e), o = a.newlinesToAppend, r = a.newlinesToPrepend, c = e.selectionStart + o.length, u = c + l.length, l = o + l + r), {
            text: l,
            selectionStart: c,
            selectionEnd: u
        }
    }, o.on("click", ".js-toolbar-item", function () {
        return e(this.closest(".js-menu-container")), t(this)
    }), t = function (e) {
        var t = void 0, i = void 0, n = void 0;
        return t = e.closest(".js-previewable-comment-form"), n = t.querySelector(".js-improved-comment-field"), i = {
            prefix: e.getAttribute("data-prefix") || "",
            suffix: e.getAttribute("data-suffix") || "",
            blockPrefix: e.getAttribute("data-block-prefix") || "",
            blockSuffix: e.getAttribute("data-block-suffix") || "",
            multiline: e.hasAttribute("data-multiline"),
            replaceNext: e.getAttribute("data-replace-next") || "",
            prefixSpace: e.hasAttribute("data-prefix-space"),
            scanFor: e.getAttribute("data-scan-for") || "",
            surroundWithNewlines: e.hasAttribute("data-surround-with-newlines"),
            orderedList: e.hasAttribute("data-ordered-list"),
            trimFirst: e.hasAttribute("data-trim-first")
        }, n.focus(), g(n, i)
    }, l = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl", b = new WeakMap, s = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = b.get(e);
        if (s)return s;
        for (s = {}, o = e.querySelectorAll(".js-toolbar-item[data-toolbar-hotkey]"), t = 0, n = o.length; n > t; t++)r = o[t], i = r.getAttribute("data-toolbar-hotkey"), s[l + "+" + i] = r;
        return b.set(e, s), s
    }, v = function () {
        var e = void 0, i = void 0;
        if (!b.get(this))return b.set(this, !0), i = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"), e = s(i), this.addEventListener("keydown", function (i) {
            var n = e[a(i)];
            n && (t(n), i.preventDefault())
        })
    }, f(".js-improved-comment-field", function () {
        this.addEventListener("focus", v)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = require("github/normalized-event-timestamp"), o = n.normalizedTimestamp, r = n.timeSinceTimestamp, s = require("github/focused"), a = s.onFocusedKeydown, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0;
    h = require("github/fetch").fetchText, g = require("github/stats")["default"], u = require("github/sliding-promise-queue")["default"], b = function (e) {
        var t = void 0;
        return null != (t = e.closest("form").elements.authenticity_token) ? t.value : void 0
    }, c = function (t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
        return i = t.closest(".js-previewable-comment-form"), o = t.classList.contains("js-preview-tab"), o && (s = i.querySelector(".js-write-bucket"), r = i.querySelector(".js-preview-body"), r.style.minHeight = e(s).height() + "px"), i.classList.toggle("preview-selected", o), i.classList.toggle("write-selected", !o), n = i.querySelector(".tabnav-tab.selected"), n.setAttribute("aria-selected", !1), n.classList.remove("selected"), t.classList.add("selected"), t.setAttribute("aria-selected", !0), a = i.querySelector(".js-write-tab"), o ? a.setAttribute("data-hotkey", "ctrl+P,meta+P") : a.removeAttribute("data-hotkey"), Promise.resolve(i)
    }, e(document).on("click", ".js-write-tab", function () {
        var e = void 0;
        return c(this).then(function (e) {
            return e.querySelector(".js-comment-field").focus()
        }), e = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"), null != e && e.classList.remove("d-none"), !1
    }), e(document).on("click", ".js-preview-tab", function (e) {
        var t = o(e.timeStamp), i = void 0;
        return c(this).then(function (e) {
            p(e, t)
        }), i = this.closest(".js-previewable-comment-form").querySelector(".js-toolbar"), null != i && i.classList.add("d-none"), !1
    }), e(document).on("preview:render", ".js-previewable-comment-form", function (e) {
        var t = e.originalEvent.detail.requestedAt || o(e.timeStamp), i = void 0;
        return i = this.querySelector(".js-preview-tab"), c(i).then(function (e) {
            p(e, t)
        })
    }), m = new u, v = new WeakMap, f = !1, l = function (e, t) {
        var i = void 0, n = void 0, o = void 0, r = void 0;
        if (r = {
                url: e.getAttribute("data-preview-url"),
                data: {text: t, authenticity_token: b(e)},
                headers: {"content-type": "application/x-www-form-urlencoded; charset=UTF-8"}
            }, i = !e.dispatchEvent(new CustomEvent("preview:setup", {
                bubbles: !0,
                cancelable: !0,
                detail: r
            })))return Promise.reject(new Error("preview canceled"));
        t = JSON.stringify(r);
        var s = v.get(e);
        return s && (n = s[0], o = s[1]), n !== t && (f = !1, o = m.push(d(r)), o.then(function () {
            return f = !0
        }), v.set(e, [t, o])), o
    }, d = function (t) {
        return h(t.url, {method: "post", body: e.param(t.data), headers: t.headers})
    }, p = function (e, t) {
        var i = void 0, n = void 0;
        return n = e.querySelector(".js-comment-field"), i = e.querySelector(".comment-body"), l(e, n.value).then(function (e) {
            var n = void 0;
            return i.innerHTML = e || "<p>Nothing to preview</p>", n = r(t), g({preview_delay: {ms: n, version: 2}})
        }), f ? void 0 : i.innerHTML = "<p>Loading preview&hellip;</p>"
    }, i(".js-preview-tab", function (e) {
        var t = void 0, i = void 0;
        e.addEventListener("mouseenter", function () {
            i || (i = e.closest(".js-previewable-comment-form"), t = i.querySelector(".js-comment-field")), l(i, t.value)
        })
    }), a(document, ".js-comment-field", function () {
        var e = void 0;
        return e = this.closest(".js-previewable-comment-form"), function (t) {
            return "ctrl+P" !== t.hotkey && "meta+P" !== t.hotkey || !e.classList.contains("write-selected") ? void 0 : (this.blur(), e.dispatchEvent(new CustomEvent("preview:render", {
                bubbles: !0,
                cancelable: !1,
                detail: {requestedAt: o(t.timeStamp)}
            })), t.stopImmediatePropagation(), !1)
        }
    })
}.call(this), function () {
    var e = require("github/stats")["default"], t = require("github/hash-change")["default"];
    t(function (t) {
        var i = window.location.hash.slice(1);
        return i && /\/(issues|pulls?)\/\d+/.test(t.newURL) ? e({
            conversation_anchor: {
                anchor: i,
                matches_element: t.target !== window
            }
        }) : void 0
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0, o = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    n = function () {
        function t(t) {
            this.clearCropFormValues = o(this.clearCropFormValues, this), this.setCropFormValues = o(this.setCropFormValues, this), this.setCurrentSelection = o(this.setCurrentSelection, this), this.setTrueSize = o(this.setTrueSize, this);
            var i = void 0, n = void 0, r = void 0;
            this.$container = e(t), this.spinner = this.$container.find(".profile-picture-spinner"), this.img = this.$container.find(".js-croppable-avatar"), this.croppedX = this.$container.find(".js-crop-cropped-x"), this.croppedY = this.$container.find(".js-crop-cropped-y"), this.croppedW = this.$container.find(".js-crop-cropped-width"), this.croppedH = this.$container.find(".js-crop-cropped-height"), i = this.img.parent("div").width(), r = {
                aspectRatio: 1,
                onSelect: this.setCropFormValues,
                onRelease: this.clearCropFormValues,
                bgColor: "",
                maxSize: [3e3, 3e3],
                boxWidth: i,
                boxHeight: i
            }, this.setTrueSize(r), this.setCurrentSelection(r), n = this, this.img.Jcrop(r, function () {
                return n.spinner.addClass("d-none"), n.jcrop = this
            })
        }

        return t.prototype.setTrueSize = function (e) {
            var t = void 0, i = void 0;
            return i = parseInt(this.img.attr("data-true-width")), t = parseInt(this.img.attr("data-true-height")), 0 !== i && 0 !== t ? e.trueSize = [i, t] : void 0
        }, t.prototype.setCurrentSelection = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0;
            return i = parseInt(this.croppedW.val()), t = parseInt(this.croppedH.val()), 0 !== i && 0 !== t ? (n = parseInt(this.croppedX.val()), o = parseInt(this.croppedY.val()), e.setSelect = [n, o, n + i, o + t]) : void 0
        }, t.prototype.setCropFormValues = function (e) {
            return this.croppedX.val(e.x), this.croppedY.val(e.y), this.croppedW.val(e.w), this.croppedH.val(e.h)
        }, t.prototype.clearCropFormValues = function () {
            return this.croppedX.val("0"), this.croppedY.val("0"), this.croppedW.val("0"), this.croppedH.val("0")
        }, t
    }(), i(".js-croppable-container", {
        add: function (e) {
            return new n(e)
        }
    }), document.addEventListener("facebox:afterClose", function () {
        e(".js-avatar-field").val("")
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("menu:activate", ".js-select-menu", function () {
        e(this).addClass("is-dirty")
    }), e(document).on("menu:deactivate", ".js-select-menu", function () {
        e(this).removeClass("is-dirty")
    })
}(),function () {
    function e(e) {
        return "INPUT" === e.nodeName ? e.value || "Submit" : e.innerHTML || ""
    }

    function t(e, t) {
        "INPUT" === e.nodeName ? e.value = t : e.innerHTML = t
    }

    var i = require("github/jquery")["default"], n = new WeakMap, o = ["input[type=submit][data-disable-with]", "button[data-disable-with]"].join(", ");
    i(document).on("submit:prepare", "form", function () {
        for (var i = this.querySelectorAll(o), r = 0; r < i.length; r++) {
            var s = i[r];
            n.set(s, e(s));
            var a = s.getAttribute("data-disable-with");
            a && t(s, a), s.disabled = !0
        }
    }), i(document).on("ajaxComplete", "form", function (e) {
        if (this === e.target)for (var i = this.querySelectorAll(o), r = 0; r < i.length; r++) {
            var s = i[r], a = n.get(s);
            null != a && (t(s, a), s.disabled = !1, n["delete"](s))
        }
    })
}(),function () {
    var e = require("github/jquery")["default"], t = require("github/facebox")["default"];
    e(document).on("click", "[data-facebox]", function () {
        t({div: this.getAttribute("data-facebox")}, this.getAttribute("data-facebox-class"))
    })
}(),function () {
    function e(e) {
        var t = e.querySelectorAll("input[autofocus], textarea[autofocus]"), i = t[t.length - 1];
        i && document.activeElement !== i && i.focus()
    }

    function t() {
        var e = window.location.hash.slice(1);
        if (e)for (var t = document.querySelectorAll("[data-hashchange-activated]"), i = 0; i < t.length; i++) {
            var n = t[i];
            if (n.getAttribute("data-hashchange-activated") === e)return n
        }
    }

    function i(e) {
        var t = void 0, i = void 0, o = void 0, s = void 0, a = void 0, u = void 0;
        ("tab" === (a = e.hotkey) || "shift+tab" === a) && (e.preventDefault(), i = n("#facebox"), t = n(Array.from(i.find("input, button, .btn, textarea")).filter(r)).filter(function () {
            return !this.disabled
        }), s = "shift+tab" === e.hotkey ? -1 : 1, o = t.index(t.filter(":focus")), u = o + s, u === t.length || -1 === o && "tab" === e.hotkey ? t.first().focus() : -1 === o ? t.last().focus() : t.get(u).focus())
    }

    var n = require("github/jquery")["default"], o = require("github/hash-change")["default"], r = require("github/visible")["default"], s = require("github/history"), a = s.getState, u = s.replaceState, c = require("github/observe"), l = c.observe, d = require("github/facebox"), h = d.addFaceboxEventListener, f = d.close, v = d.teardownOnClose;
    o(function () {
        var e = t();
        e && setTimeout(function () {
            e.click()
        }, 0)
    }), document.addEventListener("facebox:close", function () {
        var e = t();
        e && /facebox/.test(e.rel) && u(a(), null, window.location.href.split("#")[0])
    }), document.addEventListener("facebox:reveal", function () {
        var t = document.getElementById("facebox");
        setTimeout(function () {
            e(t)
        }, 0), n(document).on("keydown", i)
    }), document.addEventListener("facebox:afterClose", function () {
        n(document).off("keydown", i), n("#facebox :focus").blur()
    }), l("a[rel*=facebox]", function () {
        h(this)
    }), document.addEventListener("facebox:close", v), n(document).on("click", ".js-facebox-close", f)
}.call(this),define("github/fuzzy-filter", ["exports"], function (e) {
    function t(e, t) {
        var i = a(e, t);
        if (i && -1 === t.indexOf("/")) {
            var n = e.substring(e.lastIndexOf("/") + 1);
            i += a(n, t)
        }
        return i
    }

    function i(e, i) {
        e = function () {
            for (var n = [], o = 0, r = e.length; r > o; o++) {
                var s = e[o], a = t(s, i);
                a && n.push([s, a])
            }
            return n
        }(), e.sort(n);
        for (var o = [], r = 0, s = e.length; s > r; r++) {
            var a = e[r];
            o.push(a[0])
        }
        return o
    }

    function n(e, t) {
        var i = e[0], n = t[0], o = e[1], r = t[1];
        return o > r ? -1 : r > o ? 1 : n > i ? -1 : i > n ? 1 : 0
    }

    function o(e) {
        var t = e.toLowerCase(), i = "+.*?[]{}()^$|\\".replace(/(.)/g, "\\$1"), n = new RegExp("\\(([" + i + "])\\)", "g");
        return e = t.replace(/(.)/g, "($1)(.*?)").replace(n, "(\\$1)"), new RegExp("(.*)" + e + "$", "i")
    }

    function r(e, t, i) {
        null == i && (i = null);
        var n = e.innerHTML.trim();
        if (t) {
            null == i && (i = o(t));
            var r = n.match(i);
            if (!r)return;
            var s = !1;
            n = [];
            var a = void 0, u = void 0, c = void 0;
            for (a = u = 1, c = r.length; c >= 1 ? c > u : u > c; a = c >= 1 ? ++u : --u) {
                var l = r[a];
                l && (a % 2 === 0 ? s || (n.push("<mark>"), s = !0) : s && (n.push("</mark>"), s = !1), n.push(l))
            }
            e.innerHTML = n.join("")
        } else {
            var d = n.replace(/<\/?mark>/g, "");
            n !== d && (e.innerHTML = d)
        }
    }

    function s(e, t, i) {
        null == i && (i = o(t));
        for (var n = e.match(i), r = [], s = null, a = 1; a < n.length; a++) {
            var u = n[a];
            u && (a % 2 === 0 ? s || (s = [], r.push(s)) : s = null, s ? s.push(u) : r.push(u))
        }
        return r.map(function (e) {
            return "string" == typeof e ? e : [e.join("")]
        })
    }

    function a(e, t) {
        if (e === t)return 1;
        var i = e.length, n = 0, o = 0, r = void 0, s = void 0, a = void 0;
        for (r = s = 0, a = t.length; a > s; r = ++s) {
            var u = t[r], c = e.indexOf(u.toLowerCase()), l = e.indexOf(u.toUpperCase()), d = Math.min(c, l), h = d > -1 ? d : Math.max(c, l);
            if (-1 === h)return 0;
            n += .1, e[h] === u && (n += .1), 0 === h && (n += .8, 0 === r && (o = 1)), " " === e.charAt(h - 1) && (n += .8), e = e.substring(h + 1, i)
        }
        var f = t.length, v = n / f, m = (v * (f / i) + v) / 2;
        return o && 1 > m + .1 && (m += .1), m
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.fuzzyScore = t, e.fuzzySort = i, e.fuzzyRegexp = o, e.fuzzyHighlightElement = r, e.fuzzyHighlight = s
}),define("github/fuzzy-filter-sort-list", ["exports", "./fuzzy-filter", "./jquery"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e, i, n) {
        var o = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0, w = void 0, x = void 0, q = void 0, k = void 0, S = void 0, L = void 0, C = void 0, A = void 0;
        if (null == n && (n = {}), e) {
            i = i.toLowerCase();
            var E = null != (k = n.content) ? k : s, T = null != (S = n.text) ? S : a, _ = null != (L = n.score) ? L : t.fuzzyScore, M = n.limit;
            n.mark === !0 ? x = l : null != n.mark && null != n.mark.call && (x = n.mark);
            var D = c.get(e);
            for (D ? o = u["default"](e).children() : (o = D = u["default"](e).children(), c.set(e, D.slice(0))), h = 0, b = o.length; b > h; h++)f = o[h], e.removeChild(f), f.style.display = "";
            var P = document.createDocumentFragment();
            if (C = 0, A = 0, i) {
                for (v = D.slice(0), p = 0, j = v.length; j > p; p++)f = v[p], null == f.fuzzyFilterTextCache && (f.fuzzyFilterTextCache = T(E(f))), f.fuzzyFilterScoreCache = _(f.fuzzyFilterTextCache, i, f);
                for (v.sort(r), q = t.fuzzyRegexp(i), g = 0, w = v.length; w > g; g++)f = v[g], (!M || M > C) && f.fuzzyFilterScoreCache > 0 && (A++, x && (d = E(f), x(d), x(d, i, q)), P.appendChild(f)), C++
            } else for (m = 0, y = D.length; y > m; m++)f = D[m], (!M || M > C) && (A++, x && x(E(f)), P.appendChild(f)), C++;
            return e.appendChild(P), A
        }
    }

    function r(e, t) {
        var i = e.fuzzyFilterScoreCache, n = t.fuzzyFilterScoreCache, o = e.fuzzyFilterTextCache, r = t.fuzzyFilterTextCache;
        return i > n ? -1 : n > i ? 1 : r > o ? -1 : o > r ? 1 : 0
    }

    function s(e) {
        return e
    }

    function a(e) {
        return e.textContent.toLowerCase().trim()
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = o;
    var u = n(i), c = new WeakMap, l = t.fuzzyHighlightElement
}),define("github/prefix-filter-list", ["exports", "./jquery"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e, t, i) {
        var n = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        if (null == i && (i = {}), e) {
            t = t.toLowerCase();
            var h = null != (l = i.text) ? l : o, f = s["default"](e).children(), v = i.limit;
            for (i.mark === !0 ? c = r : null != i.mark && null != i.mark.call && (c = i.mark), d = 0, n = 0, u = f.length; u > n; n++)a = f[n], 0 === h(a).indexOf(t) ? v && d >= v ? a.style.display = "none" : (d++, a.style.display = "", c && (c(a), c(a, t))) : a.style.display = "none";
            return d
        }
    }

    function o(e) {
        return e.textContent.toLowerCase().trim()
    }

    function r(e, t) {
        var i = e.innerHTML;
        if (t) {
            var n = new RegExp(t, "i");
            e.innerHTML = i.replace(n, "<mark>$&</mark>")
        } else {
            var o = i.replace(/<\/?mark>/g, "");
            i !== o && (e.innerHTML = o)
        }
    }

    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e["default"] = n;
    var s = i(t)
}),define("github/substring-filter-list", ["exports", "./jquery"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e, t, i) {
        var n = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        if (null == i && (i = {}), e) {
            t = t.toLowerCase();
            var h = null != (l = i.text) ? l : o, f = i.limit, v = s["default"](e).children();
            for (i.mark === !0 ? c = r : null != i.mark && null != i.mark.call && (c = i.mark), d = 0, n = 0, u = v.length; u > n; n++)a = v[n], -1 !== h(a).indexOf(t) ? f && d >= f ? a.style.display = "none" : (d++, a.style.display = "", c && (c(a), c(a, t))) : a.style.display = "none";
            return d
        }
    }

    function o(e) {
        return e.textContent.toLowerCase().trim()
    }

    function r(e, t) {
        var i = e.innerHTML;
        if (t) {
            var n = new RegExp(t, "i");
            e.innerHTML = i.replace(n, "<mark>$&</mark>")
        } else {
            var o = i.replace(/<\/?mark>/g, "");
            i !== o && (e.innerHTML = o)
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = n;
    var s = i(t)
}),function () {
    function e(e, t) {
        var i = e.hasAttribute("data-filterable-highlight"), n = e.getAttribute("data-filterable-limit"), a = 0;
        switch (e.getAttribute("data-filterable-type")) {
            case"fuzzy":
                a = o(e, t, {mark: i, limit: n});
                break;
            case"substring":
                a = s(e, t, {mark: i, limit: n});
                break;
            default:
                a = r(e, t, {mark: i, limit: n})
        }
        e.classList.toggle("filterable-active", t.length > 0), e.classList.toggle("filterable-empty", 0 === a)
    }

    var t = require("github/jquery")["default"], i = require("github/observe"), n = i.observe, o = require("github/fuzzy-filter-sort-list")["default"], r = require("github/prefix-filter-list")["default"], s = require("github/substring-filter-list")["default"], a = require("github/setimmediate")["default"], u = require("delegated-events"), c = u.fire, l = require("github/throttled-input"), d = l.addThrottledInputEventListener, h = l.removeThrottledInputEventListener;
    n(".js-filterable-field", function () {
        function e() {
            var e = this;
            i !== this.value && (i = this.value, a(function () {
                c(e, "filterable:change")
            }))
        }

        function t() {
            var e = this;
            a(function () {
                c(e, "filterable:change")
            })
        }

        var i = this.value;
        return {
            add: function () {
                this.addEventListener("focus", t), d(this, e)
            }, remove: function () {
                this.removeEventListener("focus", t), h(this, e)
            }
        }
    }), t(document).on("filterable:change", ".js-filterable-field", function () {
        for (var t = this.value.trim().toLowerCase(), i = document.querySelectorAll("[data-filterable-for=" + this.id + "]"), n = 0; n < i.length; n++) {
            var o = i[n];
            e(o, t);
            var r = new CustomEvent("filterable:change", {bubbles: !0, cancelable: !1});
            r.relatedTarget = this, o.dispatchEvent(r)
        }
    })
}(),function () {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-flash-close", function () {
        var t = e(this).closest(".flash-messages");
        e(this).closest(".flash").fadeOut(300, function () {
            e(this).remove(), 0 === t.find(".flash").length && t.remove()
        })
    })
}(),function () {
    var e = require("github/jquery")["default"], t = new WeakMap, i = require("github/fire")["default"];
    e(document).on("focusin.delay", function (n) {
        var o = void 0;
        o = n.target, t.get(o) || i(o, "focusin:delay", function () {
            t.set(o, !0), e(o).trigger("focusin:delayed")
        })
    }), e(document).on("focusout.delay", function (n) {
        return setTimeout(function () {
            var o = void 0;
            o = n.target, o !== document.activeElement && i(o, "focusout:delay", function () {
                t["delete"](n.target), e(o).trigger("focusout:delayed")
            })
        }, 200)
    })
}(),define("github/local-storage", ["exports"], function (e) {
    function t(e) {
        try {
            return localStorage.getItem(e)
        } catch (t) {
            return null
        }
    }

    function i(e, t) {
        try {
            localStorage.setItem(e, t)
        } catch (i) {
        }
    }

    function n(e) {
        try {
            localStorage.removeItem(e)
        } catch (t) {
        }
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.getItem = t, e.setItem = i, e.removeItem = n
}),function () {
    var e = require("github/local-storage"), t = e.getItem, i = e.removeItem, n = require("github/observe"), o = n.observe;
    o(".js-force-push-default-branch-notice", function () {
        var e = "true" === t("hide-force-push-default-branch-notice");
        this.classList.toggle("d-none", e), e && (this.submit(), i("hide-force-push-default-branch-notice"))
    })
}(),function () {
    function e(e) {
        var t = document.createElement("img");
        return t.className = "emoji", t.alt = ":" + e.getAttribute("alias") + ":", t.height = 20, t.width = 20, t
    }

    var t = require("github/feature-detection")["default"];
    if (!t.emoji) {
        var i = Object.create(HTMLElement.prototype);
        i.createdCallback = function () {
            this.textContent = "", this.image = e(this), this.appendChild(this.image)
        }, i.attachedCallback = function () {
            this.image.src = this.getAttribute("fallback-src")
        }, window.GEmojiElement = document.registerElement("g-emoji", {prototype: i})
    }
}(),function () {
    function e() {
        var e = void 0, i = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        if (l = this.getAttribute("data-url")) {
            for (c = n(l), a = this.getAttribute("data-id"), o = document.querySelectorAll(".js-issue-link[data-id='" + a + "']"), s = 0, u = o.length; u > s; s++)i = o[s], i.removeAttribute("data-url");
            return e = function (e) {
                return t(o, e.title)
            }, r = function (e) {
                return function (i) {
                    var n = void 0, r = void 0;
                    return r = (null != i.response ? i.response.status : void 0) || 500, n = function () {
                        switch (r) {
                            case 404:
                                return this.getAttribute("data-permission-text");
                            default:
                                return this.getAttribute("data-error-text")
                        }
                    }.call(e), t(o, n)
                }
            }(this), c.then(e, r)
        }
    }

    function t(e, t) {
        var i = void 0, n = void 0, o = void 0, r = void 0;
        for (r = [], n = 0, o = e.length; o > n; n++)i = e[n], r.push(i.setAttribute("title", t));
        return r
    }

    var i = require("github/fetch"), n = i.fetchJSON, o = require("github/observe"), r = o.observe;
    r(".js-issue-link", function () {
        this.addEventListener("mouseenter", e)
    })
}.call(this),function () {
    var e = require("github/jquery")["default"], t = require("github/updatable-content"), i = t.replaceContent;
    e(document).on("ajaxSuccess", ".js-immediate-updates", function (e, t, n, o) {
        var r = void 0, s = void 0, a = void 0;
        if (this === e.target) {
            s = o.updateContent;
            for (a in s) {
                r = s[a];
                var u = document.querySelector(a);
                u && i(u, r)
            }
        }
    })
}(),function () {
    function e(e, t) {
        e.closest("label").classList.toggle("selected", t)
    }

    var t = require("github/observe"), i = t.observe;
    i(".labeled-button:checked", {
        add: function () {
            e(this, !0)
        }, remove: function () {
            e(this, !1)
        }
    })
}(),function () {
    function e(e) {
        "enter" === e.hotkey && (t(this).click(), e.preventDefault())
    }

    var t = require("github/jquery")["default"];
    t(document).on("focus", "div.btn-sm, span.btn-sm", function () {
        t(this).on("keydown", e)
    }), t(document).on("blur", "div.btn-sm, span.btn-sm", function () {
        t(this).off("keydown", e)
    })
}.call(this),function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-notice-dismiss", function () {
        e(this).closest(".js-notice").fadeOut()
    })
}(),function () {
    var e = require("delegated-events"), t = e.on;
    t("click", ".js-permalink-shortcut", function (e) {
        window.location = this.href + window.location.hash, e.preventDefault()
    })
}(),function () {
    function e() {
        t(0), o.classList.add("is-loading"), a = setTimeout(i, 0)
    }

    function t(e) {
        0 === e && (null == u && (u = getComputedStyle(r).transition), r.style.transition = "none"), s = e, r.style.width = s + "%", 0 === e && (r.clientWidth, r.style.transition = u)
    }

    function i() {
        0 === s && (s = 12), t(Math.min(s + 3, 95)), a = setTimeout(i, 500)
    }

    function n() {
        clearTimeout(a), t(100), o.classList.remove("is-loading")
    }

    var o = document.getElementById("js-pjax-loader-bar");
    if (o) {
        var r = o.firstElementChild, s = 0, a = null, u = null;
        document.addEventListener("pjax:start", e), document.addEventListener("pjax:end", n), document.addEventListener("pjax:timeout", function (e) {
            e.preventDefault()
        })
    }
}(),function () {
    document.addEventListener("pjax:click", function (e) {
        return window.onbeforeunload ? e.preventDefault() : void 0
    })
}.call(this),function () {
    var e = void 0, t = void 0;
    e = require("delegated-events"), t = function () {
        var e = void 0, t = void 0;
        return t = function () {
            var t = void 0, i = void 0, n = void 0;
            for (n = [], t = 0, i = arguments.length; i > t; t++)e = arguments[t], n.push(e.split("/", 3).join("/"));
            return n
        }.apply(this, arguments), t[0] === t[1]
    }, e.on("pjax:click", "#js-repo-pjax-container a[href]", function (e) {
        return t(this.pathname, location.pathname) ? void 0 : e.preventDefault()
    }), e.on("pjax:click", ".js-comment-body", function (e) {
        return "files" === e.target.pathname.split("/")[3] ? e.preventDefault() : void 0
    })
}.call(this),function () {
    var e = require("github/jquery")["default"], t = void 0;
    t = {}, e(function () {
        return t[document.location.pathname] = e("head [data-pjax-transient]")
    }), document.addEventListener("pjax:beforeReplace", function (i) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
        for (n = i.detail.contents, r = s = 0, a = n.length; a > s; r = ++s)o = n[r], o && ("pjax-head" === o.id ? (t[document.location.pathname] = e(o).children(), n[r] = null) : "js-flash-container" === o.id && (e("#js-flash-container").replaceWith(o), n[r] = null))
    }), document.addEventListener("pjax:end", function () {
        var i = void 0, n = void 0, o = void 0;
        return i = t[document.location.pathname], i ? (e("head [data-pjax-transient]").remove(), o = e(i).not("title, script, link[rel='stylesheet']"), n = e(i).filter("link[rel='stylesheet']"), e(document.head).append(o.attr("data-pjax-transient", !0)), e(document.head).append(n)) : void 0
    })
}.call(this),function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0;
    i = require("github/pjax"), n = function (e) {
        return null != e.getAttribute("data-pjax-preserve-scroll") ? !1 : 0
    }, t = function (t) {
        var i = void 0, n = void 0;
        i = e(t), n = i.add(i.parents("[data-pjax]")).map(function () {
            var e = void 0;
            return e = this.getAttribute("data-pjax"), null != e && "true" !== e ? e : void 0
        });
        var o = n[0];
        return o ? document.querySelector(o) : e(t).closest("[data-pjax-container]")[0]
    }, e(document).on("click", "[data-pjax] a, a[data-pjax]", function (e) {
        var o = this;
        if (null == o.getAttribute("data-skip-pjax") && null == o.getAttribute("data-remote")) {
            var r = t(o);
            return r ? i.click(e, {container: r, scrollTo: n(o)}) : void 0
        }
    }), e(document).on("submit", "form[data-pjax]", function (e) {
        var o = this, r = t(o);
        return r ? i.submit(e, {container: r, scrollTo: n(o)}) : void 0
    })
}.call(this),function () {
    function e(e) {
        e.detail && e.detail.url && (window.performance.mark(a), r = e.detail.url)
    }

    function t() {
        o(function () {
            if (window.performance.getEntriesByName(a).length) {
                window.performance.mark(u), window.performance.measure(s, a, u);
                var e = window.performance.getEntriesByName(s), t = e.pop(), o = t ? t.duration : null;
                o && (n({pjax: {url: r, ms: Math.round(o)}}), i())
            }
        })
    }

    function i() {
        window.performance.clearMarks(a), window.performance.clearMarks(u), window.performance.clearMeasures(s)
    }

    var n = require("github/stats")["default"], o = require("github/setimmediate")["default"], r = null, s = "last_pjax_request", a = "pjax_start", u = "pjax_end";
    document.addEventListener("pjax:start", e), document.addEventListener("pjax:end", t)
}(),function () {
    var e = require("github/document-ready"), t = e.ready;
    t.then(function () {
        document.body.classList.contains("js-print-popup") && (window.print(), setTimeout(window.close, 1e3))
    })
}(),function () {
    var e = require("github/jquery")["default"], t = require("github/failbot"), i = t.errorContext, n = require("github/focused"), o = n.onFocusedInput;
    e(function () {
        var t = void 0, n = void 0;
        return document.documentElement.classList.contains("is-employee") ? (t = function () {
            return "qi:" + document.location
        }, n = [], e(document).on("submit", ".js-quick-issue-form", function () {
            var i = void 0;
            e(".facebox-content > *").hide(), e(".facebox-content .js-quick-issue-thanks").show(), i = t();
            try {
                localStorage.removeItem(i)
            } catch (n) {
            }
            return !0
        }), o(document, ".js-quick-issue-body", function () {
            return function () {
                var i = void 0, n = void 0;
                i = t(), n = e(this).val();
                try {
                    return localStorage.setItem(i, n)
                } catch (o) {
                }
            }
        }), document.addEventListener("facebox:reveal", function () {
            var i = void 0, n = void 0, o = void 0;
            return e(".facebox-content .quick-issue-link").remove(), o = e(".facebox-content .js-quick-issue-body"), o.length ? (n = t(), i = function () {
                try {
                    return localStorage.getItem(n)
                } catch (e) {
                }
            }(), i && o.val(i), o.focus()) : void 0
        }), e(window).on("error", function (t) {
            return n.push(i(t.originalEvent.error)), e(".js-captured-errors").val(JSON.stringify(n))
        }), e(document).on("ajaxSuccess", ".js-quick-issue-form", function (t, i) {
            return e(".js-quick-issue-thanks").append(i.responseText)
        })) : void 0
    })
}.call(this),function () {
    var e = require("github/jquery")["default"], t = require("github/focused"), i = t.onFocusedKeydown;
    i(document, ".js-quick-submit", function () {
        return function (t) {
            var i = void 0, n = void 0;
            return "ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? (n = e(this).closest("form"), i = n.find("input[type=submit], button[type=submit]").first(), i.prop("disabled") || n.submit(), !1) : void 0
        }
    })
}(),function () {
    var e = require("github/jquery")["default"], t = require("github/navigation").push, i = require("github/navigation").pop, n = require("github/navigation").clear, o = void 0, r = void 0, s = void 0, a = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    r = require("github/sliding-promise-queue")["default"], s = require("github/fetch").fetchText, o = function () {
        function o(i) {
            this.resultsChanged = a(this.resultsChanged, this), this.fetchResults = a(this.fetchResults, this), this.onFieldInput = a(this.onFieldInput, this), this.onNavigationKeyDown = a(this.onNavigationKeyDown, this), this.teardown = a(this.teardown, this), this.$field = e(i), this.$form = e(i.form), this.fetchQueue = new r, this.$field.on("input.results", this.onFieldInput), this.$field.on("focusout:delayed.results", this.teardown), this.$form.on("submit.results", this.teardown), this.$results = e(".js-quicksearch-results"), t(this.$results[0]), this.$results.on("navigation:keydown.results", this.onNavigationKeyDown)
        }

        return o.prototype.teardown = function () {
            this.$field.off(".results"), this.$form.off(".results"), this.$results.off(".results"), this.$results.removeClass("active"), i(this.$results[0])
        }, o.prototype.onNavigationKeyDown = function (e) {
            if ("esc" === e.hotkey)this.$results.removeClass("active"), n(this.$results[0]); else if ("enter" === e.hotkey && !e.target.classList.contains("js-navigation-item"))return this.$form.submit(), !1
        }, o.prototype.onFieldInput = function () {
            return this.fetchResults(this.$field.val())
        }, o.prototype.fetchResults = function (e) {
            var t = void 0, i = void 0, n = this.$results.attr("data-quicksearch-url");
            return n ? (i = e.trim() ? (n += ~n.indexOf("?") ? "&" : "?", n += this.$form.serialize(), this.$form.addClass("is-sending"), s(n)) : Promise.resolve(""), t = function (e) {
                return function () {
                    return e.$form.removeClass("is-sending")
                }
            }(this), this.fetchQueue.push(i).then(function (e) {
                return function (t) {
                    return e.$results.html(t), e.resultsChanged()
                }
            }(this)).then(t, t)) : void 0
        }, o.prototype.resultsChanged = function () {
            var e = void 0;
            return e = "" !== this.$field.val(), this.$results.toggleClass("active", e)
        }, o
    }(), e(document).on("focusin:delayed", ".js-quicksearch-field", function () {
        new o(this)
    })
}.call(this),define("github/markdown-parsing", ["exports"], function (e) {
    function t() {
        var e = arguments[0], t = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
        return t.some(function (t) {
            return e.classList.contains(t)
        })
    }

    function i(e) {
        for (var t = e.parentNode.children, i = 0; i < t.length; ++i)if (t[i] === e)return i
    }

    function n(e) {
        return "IMG" === e.nodeName || null != e.firstChild
    }

    function o(e) {
        return "INPUT" === e.nodeName && "checkbox" === e.type
    }

    function r(e) {
        var t = e.childNodes[0], i = e.childNodes[1];
        return t && e.childNodes.length < 3 ? !("OL" !== t.nodeName && "UL" !== t.nodeName || i && (i.nodeType !== Node.TEXT_NODE || i.textContent.trim())) : void 0
    }

    function s(e, t) {
        var i = void 0, r = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: function (e) {
                return e.nodeName in c && (n(e) || o(e)) ? NodeFilter.FILTER_ACCEPT : void 0
            }
        }), s = [];
        for (i = r.nextNode(); i;)s.push(i), i = r.nextNode();
        s.reverse().forEach(function (e) {
            return t(e, c[e.nodeName](e))
        })
    }

    function a(e) {
        var t = e.getRangeAt(0).cloneContents();
        u = 0;
        var n = e.anchorNode.parentNode.closest("li");
        if (n && ("OL" === n.parentNode.nodeName && (u = i(n)), !t.querySelector("li"))) {
            var o = document.createElement("li"), r = document.createElement(n.parentNode.nodeName);
            o.append(t), r.append(o), t = document.createDocumentFragment(), t.appendChild(r)
        }
        return s(t, function (e, t) {
            return e.replaceWith(t)
        }), t
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = s, e.selectionToMarkdown = a;
    var u = 0, c = {
        INPUT: function (e) {
            return e.checked ? "[x] " : "[ ] "
        }, CODE: function (e) {
            var t = e.textContent;
            return "PRE" === e.parentNode.nodeName ? e.textContent = t.replace(/^/gm, "    ") : t.indexOf("`") >= 0 ? "`` " + t + " ``" : "`" + t + "`"
        }, PRE: function (e) {
            var t = e.parentNode;
            return "DIV" === t.nodeName && t.classList.contains("highlight") && (e.textContent = e.textContent.replace(/^/gm, "    "), e.append("\n\n")), e
        }, STRONG: function (e) {
            return "**" + e.textContent + "**"
        }, EM: function (e) {
            return "_" + e.textContent + "_"
        }, BLOCKQUOTE: function (e) {
            var t = e.textContent.trim().replace(/^/gm, "> "), i = document.createElement("pre");
            return i.textContent = t + "\n\n", i
        }, A: function (e) {
            var i = e.textContent;
            return t(e, "issue-link", "user-mention", "team-mention") ? i : /^https?:/.test(i) && i === e.getAttribute("href") ? i : "[" + i + "](" + e.getAttribute("href") + ")"
        }, IMG: function (e) {
            var i = e.getAttribute("alt");
            return t(e, "emoji") ? i : "![" + i + "](" + e.getAttribute("src") + ")"
        }, LI: function (e) {
            var t = e.parentNode;
            if (!r(e))switch (t.nodeName) {
                case"UL":
                    e.prepend("* ");
                    break;
                case"OL":
                    if (u > 0 && !t.previousSibling) {
                        var n = i(e) + u + 1;
                        e.prepend(n + "\\. ")
                    } else e.prepend(i(e) + 1 + ". ")
            }
            return e
        }, OL: function (e) {
            var t = document.createElement("li");
            return t.append(document.createElement("br")), e.append(t), e
        }, H1: function (e) {
            var t = parseInt(e.nodeName.slice(1));
            return e.prepend(Array(t + 1).join("#") + " "), e
        }
    };
    c.UL = c.OL;
    for (var l = 2; 6 >= l; ++l)c["H" + l] = c.H1
}),function () {
    function e(e, t) {
        var i = document.createElement("div"), n = void 0;
        i.appendChild(t), i.style.cssText = "position:absolute;left:-9999px;", document.body.appendChild(i);
        try {
            var o = document.createRange();
            o.selectNodeContents(i), e.removeAllRanges(), e.addRange(o), n = e.toString(), e.removeAllRanges()
        } finally {
            document.body.removeChild(i)
        }
        return n
    }

    var t = require("delegated-events"), i = t.on, n = require("github/markdown-parsing"), o = n.selectionToMarkdown, r = require("github/setimmediate")["default"];
    i("quote:selection", ".js-quote-markdown", function (t) {
        var i = t.detail.selection;
        try {
            var n = e(i, o(i));
            return t.detail.selectionText = n.replace(/^\n+/, "").replace(/\s+$/, "")
        } catch (s) {
            r(function () {
                throw s
            })
        }
    })
}(),function () {
    function e(e) {
        var n = e.toString().trim();
        if (n) {
            var o = e.focusNode;
            o.nodeType != Node.ELEMENT_NODE && (o = o.parentNode);
            var a = o.closest(".js-quote-selection-container");
            if (a) {
                var u = {selection: e, selectionText: n};
                if (!r(a, "quote:selection", u))return !0;
                n = u.selectionText;
                var c = Array.from(a.querySelectorAll(".js-quote-selection-target")).filter(i)[0];
                if (c) {
                    var l = "> " + n.replace(/\n/g, "\n> ") + "\n\n", d = c.value;
                    return d && (l = d + "\n\n" + l), c.value = l, t(c).trigger("change"), s(c, {
                        duration: 300,
                        complete: function () {
                            c.focus(), c.selectionStart = c.value.length, c.scrollTop = c.scrollHeight
                        }
                    }), !0
                }
            }
        }
    }

    var t = require("github/jquery")["default"], i = require("github/visible")["default"], n = require("github/hotkey")["default"], o = require("delegated-events"), r = o.fire, s = require("github/scrollto")["default"];
    t(document).on("keydown", function (t) {
        "r" != n(t) || t.isDefaultPrevented() || t.isFormInteraction() || !e(window.getSelection()) || t.preventDefault()
    })
}(),function () {
    function e() {
        var e = this.getAttribute("data-reaction-label");
        this.closest(".js-add-reaction-popover").querySelector(".js-reaction-description").textContent = e
    }

    function t() {
        this.closest(".js-add-reaction-popover").querySelector(".js-reaction-description").textContent = "Pick your reaction"
    }

    var i = require("github/jquery")["default"], n = require("github/menu").deactivate;
    i(document).on("ajaxSuccess", ".js-pick-reaction", function (e, t, o, r) {
        n(this.closest(".js-menu-container"));
        var s = this.closest(".js-comment");
        if (s) {
            var a, u, c = i.parseHTML(r.reactions_container.trim()), l = i.parseHTML(r.comment_header_reaction_button.trim());
            (a = s.querySelector(".js-reactions-container")).replaceWith.apply(a, _toConsumableArray(c)), (u = s.querySelector(".js-comment-header-reaction-button")).replaceWith.apply(u, _toConsumableArray(l)), s.classList.remove("is-reacting")
        }
    }), i(document).on("menu:activated", ".js-reaction-popover-container", function () {
        i(this).on("mouseenter", ".js-reaction-option-item", e), i(this).on("mouseleave", ".js-reaction-option-item", t), this.closest(".js-comment").classList.add("is-reacting")
    }), i(document).on("menu:deactivated", ".js-reaction-popover-container", function () {
        i(this).off("mouseenter", ".js-reaction-option-item", e), i(this).off("mouseleave", ".js-reaction-option-item", t), this.closest(".js-comment").classList.remove("is-reacting")
    })
}(),function () {
    var e = require("github/observe"), t = e.observe;
    t(".has-removed-contents", function () {
        var e = void 0;
        return {
            add: function (t) {
                e = Array.from(t.childNodes), e.forEach(function (e) {
                    return t.removeChild(e)
                })
            }, remove: function (t) {
                e.forEach(function (e) {
                    return t.appendChild(e)
                })
            }
        }
    })
}(),function () {
    var e = require("github/jquery")["default"], t = require("delegated-events"), i = t.fire, n = void 0, o = void 0;
    n = require("github/fetch").fetchText, e(document).on("focusin", ".js-repo-filter .js-filterable-field", function () {
        var e = this.closest(".js-repo-filter").querySelector(".js-more-repos-link");
        e && o(e)
    }), e(document).on("click", ".js-repo-filter .js-repo-filter-tab", function (e) {
        var t = void 0, n = void 0, r = void 0, s = void 0, a = void 0;
        t = this.closest(".js-repo-filter");
        var u = t.querySelector(".js-more-repos-link");
        for (u && o(u), a = t.querySelectorAll(".js-repo-filter-tab"), r = 0, s = a.length; s > r; r++)n = a[r], n.classList.toggle("filter-selected", n === this);
        i(t.querySelector(".js-filterable-field"), "filterable:change"), e.preventDefault()
    }), e(document).on("filterable:change", ".js-repo-filter .js-repo-list", function () {
        var t = this.closest(".js-repo-filter"), i = t.querySelector(".js-repo-filter-tab.filter-selected"), n = i ? i.getAttribute("data-filter") : void 0;
        n && e(this).children().not(n).hide()
    }), o = function (e) {
        var t = void 0, o = void 0;
        if (!e.classList.contains("is-loading"))return e.classList.add("is-loading"), o = function (t) {
            var n = e.closest(".js-repo-filter");
            n.querySelector(".js-repo-list").innerHTML = t;
            var o = n.querySelector(".js-filterable-field");
            return o && i(o, "filterable:change"), e.remove()
        }, t = function () {
            return e.classList.remove("is-loading")
        }, n(e.href).then(o).then(t, t)
    }, e(document).on("click", ".js-more-repos-link", function (e) {
        e.preventDefault(), o(this)
    })
}.call(this),function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
    o = require("github/setimmediate")["default"], t = function (e) {
        null == e && (e = window.location);
        var t = document.querySelector("meta[name=session-resume-id]");
        return t ? t.content : e.pathname
    }, r = null, e(window).on("submit:prepare", function (e) {
        r = e.target, o(function () {
            return e.isDefaultPrevented() ? r = null : void 0
        })
    }), i = function (t) {
        var i = void 0, n = void 0, o = void 0, s = void 0;
        if (o = "session-resume:" + t, s = function (e) {
                return e.id && e.value !== e.defaultValue && e.form !== r
            }, n = function () {
                var t = void 0, n = void 0, o = void 0, r = void 0;
                for (o = e(".js-session-resumable"), r = [], t = 0, n = o.length; n > t; t++)i = o[t], s(i) && r.push([i.id, i.value]);
                return r
            }(), n.length)try {
            sessionStorage.setItem(o, JSON.stringify(n))
        } catch (a) {
        }
    }, n = function (t) {
        var i = void 0, n = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
        r = "session-resume:" + t;
        var l = function () {
            try {
                return sessionStorage.getItem(r)
            } catch (e) {
            }
        }();
        if (l) {
            try {
                sessionStorage.removeItem(r)
            } catch (d) {
            }
            for (i = [], a = JSON.parse(l), n = 0, s = a.length; s > n; n++) {
                u = a[n], t = u[0], c = u[1];
                var h = new CustomEvent("session:resume", {
                    bubbles: !0,
                    cancelable: !0,
                    detail: {targetId: t, targetValue: c}
                });
                if (document.dispatchEvent(h), !h.defaultPrevented) {
                    var f = document.getElementById(t);
                    f && f.value === f.defaultValue && (f.value = c, i.push(f))
                }
            }
            o(function () {
                return e(i).trigger("change")
            })
        }
    }, e(window).on("pageshow pjax:end", function () {
        n(t())
    }), e(window).on("pagehide", function () {
        i(t())
    }), window.addEventListener("pjax:beforeReplace", function (e) {
        var n = void 0, r = void 0, s = void 0;
        null != e.detail.previousState && (s = e.detail.previousState.url), s ? (r = t(new URL(s)), i(r)) : (n = new Error("pjax:beforeReplace event.detail.previousState.url is undefined"), o(function () {
            throw n
        }))
    })
}.call(this),function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0;
    t = require("github/debounce")["default"], i = function () {
        var i = void 0, n = void 0, o = void 0;
        i = null, o = t(function () {
            return i = null
        }, 200), n = {x: 0, y: 0}, e(this).on("mousemove.userResize", function (t) {
            var r = void 0;
            (n.x !== t.clientX || n.y !== t.clientY) && (r = this.style.height, i && i !== r && e(this).trigger("user:resize"), i = r, o()), n = {
                x: t.clientX,
                y: t.clientY
            }
        })
    }, n = function () {
        e(this).off("mousemove.userResize")
    }, e.event.special["user:resize"] = {setup: i, teardown: n}
}.call(this),function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/dimensions"), n = i.overflowOffset, o = require("github/observe"), r = o.observe, s = void 0, a = void 0, u = void 0, c = void 0;
    u = function (t) {
        return e(t).on("user:resize.trackUserResize", function () {
            return e(t).addClass("is-user-resized"), e(t).css({"max-height": ""})
        })
    }, c = function (t) {
        return e(t).off("user:resize.trackUserResize")
    }, e(document).on("reset", "form", function () {
        var t = void 0;
        t = e(this).find("textarea.js-size-to-fit"), t.removeClass("is-user-resized"), t.css({
            height: "",
            "max-height": ""
        })
    }), r("textarea.js-size-to-fit", {add: u, remove: c}), s = function (i) {
        var o = void 0, r = void 0, s = void 0;
        o = e(i), r = null, s = function () {
            var s = void 0, a = void 0, u = void 0, c = void 0;
            i.value !== r && t(i) && (c = n(o[0]), c.top < 0 || c.bottom < 0 || (u = o.outerHeight() + c.bottom, i.style.maxHeight = u - 100 + "px", s = i.parentNode, a = s.style.height, s.style.height = e(s).css("height"), i.style.height = "auto", o.innerHeight(i.scrollHeight), s.style.height = a, r = i.value))
        }, o.on("change.sizeToFit", function () {
            return s()
        }), o.on("input.sizeToFit", function () {
            return s()
        }), i.value && s()
    }, a = function (t) {
        e(t).off(".sizeToFit")
    }, r("textarea.js-size-to-fit:not(.is-user-resized)", {add: s, remove: a})
}.call(this),function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-social-container", function (t, i, n, o) {
        return e(this).find(".js-social-count").text(o.count)
    })
}.call(this),define.amd = "reconnectingwebsocket",function (e, t) {
    "function" == typeof define && define.amd ? define([], t) : "undefined" != typeof module && module.exports ? module.exports = t() : e.ReconnectingWebSocket = t()
}(this, function () {
    function e(t, i, n) {
        function o(e, t) {
            var i = document.createEvent("CustomEvent");
            return i.initCustomEvent(e, !1, !1, t), i
        }

        var r = {
            debug: !1,
            automaticOpen: !0,
            reconnectInterval: 1e3,
            maxReconnectInterval: 3e4,
            reconnectDecay: 1.5,
            timeoutInterval: 2e3,
            maxReconnectAttempts: null
        };
        n || (n = {});
        for (var s in r)"undefined" != typeof n[s] ? this[s] = n[s] : this[s] = r[s];
        this.url = t, this.reconnectAttempts = 0, this.readyState = WebSocket.CONNECTING, this.protocol = null;
        var a, u = this, c = !1, l = !1, d = document.createElement("div");
        d.addEventListener("open", function (e) {
            u.onopen(e)
        }), d.addEventListener("close", function (e) {
            u.onclose(e)
        }), d.addEventListener("connecting", function (e) {
            u.onconnecting(e)
        }), d.addEventListener("message", function (e) {
            u.onmessage(e)
        }), d.addEventListener("error", function (e) {
            u.onerror(e)
        }), this.addEventListener = d.addEventListener.bind(d), this.removeEventListener = d.removeEventListener.bind(d), this.dispatchEvent = d.dispatchEvent.bind(d), this.open = function (t) {
            if (a = new WebSocket(u.url, i || []), t) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts)return
            } else d.dispatchEvent(o("connecting")), this.reconnectAttempts = 0;
            (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "attempt-connect", u.url);
            var n = a, r = setTimeout(function () {
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "connection-timeout", u.url), l = !0, n.close(), l = !1
            }, u.timeoutInterval);
            a.onopen = function (i) {
                clearTimeout(r), (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onopen", u.url), u.protocol = a.protocol, u.readyState = WebSocket.OPEN, u.reconnectAttempts = 0;
                var n = o("open");
                n.isReconnect = t, t = !1, d.dispatchEvent(n)
            }, a.onclose = function (i) {
                if (clearTimeout(r), a = null, c)u.readyState = WebSocket.CLOSED, d.dispatchEvent(o("close")); else {
                    u.readyState = WebSocket.CONNECTING;
                    var n = o("connecting");
                    n.code = i.code, n.reason = i.reason, n.wasClean = i.wasClean, d.dispatchEvent(n), t || l || ((u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onclose", u.url), d.dispatchEvent(o("close")));
                    var r = u.reconnectInterval * Math.pow(u.reconnectDecay, u.reconnectAttempts);
                    setTimeout(function () {
                        u.reconnectAttempts++, u.open(!0)
                    }, r > u.maxReconnectInterval ? u.maxReconnectInterval : r)
                }
            }, a.onmessage = function (t) {
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onmessage", u.url, t.data);
                var i = o("message");
                i.data = t.data, d.dispatchEvent(i)
            }, a.onerror = function (t) {
                (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "onerror", u.url, t), d.dispatchEvent(o("error"))
            }
        }, 1 == this.automaticOpen && this.open(!1), this.send = function (t) {
            if (a)return (u.debug || e.debugAll) && console.debug("ReconnectingWebSocket", "send", u.url, t), a.send(t);
            throw"INVALID_STATE_ERR : Pausing to reconnect websocket"
        }, this.close = function (e, t) {
            "undefined" == typeof e && (e = 1e3), c = !0, a && a.close(e, t)
        }, this.refresh = function () {
            a && a.close()
        }
    }

    if ("WebSocket" in window)return e.prototype.onopen = function (e) {
    }, e.prototype.onclose = function (e) {
    }, e.prototype.onconnecting = function (e) {
    }, e.prototype.onmessage = function (e) {
    }, e.prototype.onerror = function (e) {
    }, e.debugAll = !1, e.CONNECTING = WebSocket.CONNECTING, e.OPEN = WebSocket.OPEN, e.CLOSING = WebSocket.CLOSING, e.CLOSED = WebSocket.CLOSED, e
}),delete define.amd,function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
    "undefined" != typeof WebSocket && null !== WebSocket && (n = require("reconnectingwebsocket"), c = {}, r = {}, o = null, a = function () {
        var t = void 0, i = void 0;
        if (t = document.head.querySelector("link[rel=web-socket]"))return i = new n(t.href), i.reconnectInterval = 2e3 * Math.random() + 1e3, i.reconnectDecay = 2, i.maxReconnectAttempts = 5, i.addEventListener("open", function () {
            try {
                for (var e in c)i.send("subscribe:" + e)
            } catch (t) {
                i.refresh()
            }
        }), i.addEventListener("message", function (t) {
            var i = void 0, n = void 0, o = void 0;
            o = JSON.parse(t.data), n = o[0], i = o[1], n && i && e(r[n]).trigger("socket:message", [i, n])
        }), i
    }, s = function (e) {
        var t = void 0, i = void 0;
        return null != (t = null != (i = e.getAttribute("data-channel")) ? i.split(/\s+/) : void 0) ? t : []
    }, u = function (e) {
        var t = void 0, i = void 0, n = void 0, u = void 0, l = void 0;
        if (null != o ? o : o = a())for (l = o, u = s(e), t = 0, i = u.length; i > t; t++)n = u[t], l.readyState !== WebSocket.OPEN || c[n] || l.send("subscribe:" + n), c[n] = !0, null == r[n] && (r[n] = []), r[n].push(e)
    }, l = function (t) {
        var i = void 0, n = void 0, o = void 0, a = void 0;
        for (a = s(t), i = 0, n = a.length; n > i; i++)o = a[i], r[o] = e(r[o]).not(t).slice(0)
    }, i(".js-socket-channel[data-channel]", {add: u, remove: l}))
}.call(this),function () {
    var e = require("delegated-events"), t = e.on, i = void 0, n = void 0, o = void 0;
    if (o = null != (n = document.querySelector("meta[name=user-login]")) ? n.content : void 0, null != o) {
        i = String(!!o.length);
        try {
            localStorage.setItem("logged-in", i)
        } catch (r) {
            return
        }
        window.addEventListener("storage", function (e) {
            var n = void 0;
            e.storageArea === localStorage && "logged-in" === e.key && e.newValue !== i && (i = e.newValue, n = document.querySelector(".js-stale-session-flash"), n.classList.toggle("is-signed-in", "true" === i), n.classList.toggle("is-signed-out", "false" === i), n.classList.remove("d-none"), window.addEventListener("popstate", function (e) {
                null != e.state.container && location.reload()
            }), t("submit", "form", function (e) {
                e.preventDefault()
            }))
        })
    }
}(),define("github/text-field-mirror", ["exports"], function (e) {
    function t(e, t) {
        var r = e.nodeName.toLowerCase();
        if ("textarea" !== r && "input" !== r)throw new Error("expected textField to a textarea or input");
        var s = o.get(e);
        if (s && s.parentElement === e.parentElement)s.innerHTML = ""; else {
            s = document.createElement("div"), o.set(e, s);
            var a = window.getComputedStyle(e), u = i.slice(0);
            "textarea" === r ? u.push("white-space:pre-wrap;") : u.push("white-space:nowrap;");
            for (var c = 0, l = n.length; l > c; c++) {
                var d = n[c];
                u.push(d + ":" + a.getPropertyValue(d) + ";")
            }
            s.style.cssText = u.join(" ")
        }
        var h = void 0;
        t !== !1 && (h = document.createElement("span"), h.style.cssText = "position: absolute;", h.className = "text-field-mirror-marker", h.innerHTML = "&nbsp;");
        var f = void 0, v = void 0;
        if ("number" == typeof t) {
            var m = e.value.substring(0, t);
            m && (v = document.createTextNode(m)), m = e.value.substring(t), m && (f = document.createTextNode(m))
        } else {
            var p = e.value;
            p && (v = document.createTextNode(p))
        }
        return v && s.appendChild(v), h && s.appendChild(h), f && s.appendChild(f), s.parentElement || e.parentElement.insertBefore(s, e), s.scrollTop = e.scrollTop, s.scrollLeft = e.scrollLeft, s
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = t;
    var i = ["position:absolute;", "overflow:auto;", "word-wrap:break-word;", "top:0px;", "left:-9999px;"], n = ["box-sizing", "font-family", "font-size", "font-style", "font-variant", "font-weight", "height", "letter-spacing", "line-height", "max-height", "min-height", "padding-bottom", "padding-left", "padding-right", "padding-top", "border-bottom", "border-left", "border-right", "border-top", "text-decoration", "text-indent", "text-transform", "width", "word-spacing"], o = new WeakMap
}),define("github/text-field-selection-position", ["exports", "./jquery", "./text-field-mirror"], function (e, t, i) {
    function n(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function o(e) {
        var t = arguments.length <= 1 || void 0 === arguments[1] ? e.selectionEnd : arguments[1], i = s["default"](e, t), n = r["default"](i).find(".text-field-mirror-marker").position();
        return n.top += parseInt(r["default"](i).css("border-top-width"), 10), n.left += parseInt(r["default"](i).css("border-left-width"), 10), setTimeout(function () {
            r["default"](i).remove()
        }, 5e3), n
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = o;
    var r = n(t), s = n(i)
}),define("github/suggester", ["exports", "./fetch", "./navigation", "./jquery", "./hotkey", "./stats", "./text-field-selection-position"], function (e, t, i, n, o, r, s) {
    function a(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function u(e, t) {
        if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
    }

    Object.defineProperty(e, "__esModule", {value: !0});
    var c = a(n), l = a(o), d = a(r), h = a(s), f = function () {
        function e(e, t) {
            var i = [], n = !0, o = !1, r = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
            } catch (u) {
                o = !0, r = u
            } finally {
                try {
                    !n && a["return"] && a["return"]()
                } finally {
                    if (o)throw r
                }
            }
            return i
        }

        return function (t, i) {
            if (Array.isArray(t))return t;
            if (Symbol.iterator in Object(t))return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }(), v = function () {
        function e(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        return function (t, i, n) {
            return i && e(t.prototype, i), n && e(t, n), t
        }
    }(), m = {}, p = function () {
        function e(t) {
            u(this, e), this.setup = this.setup.bind(this), this.teardown = this.teardown.bind(this), this.textarea = t.input, this.types = t.types, this.suggester = t.suggester, this.repositionManually = t.repositionManually, this.teardownManually = t.teardownManually, this.onActivate = t.onActivate, this.suggestions = t.suggestions || document.createElement("div"), this.disable = t.disable
        }

        return v(e, [{
            key: "setup", value: function () {
                c["default"](this.textarea.form).on("reset.suggester", this.deactivate.bind(this)), c["default"](this.textarea).on("paste.suggester", this.onPaste.bind(this)), c["default"](this.textarea).on("input.suggester", this.onInput.bind(this)), c["default"](this.suggester).on("navigation:keydown.suggester", "[data-value]", this.onNavigationKeyDown.bind(this)), c["default"](this.suggester).on("navigation:open.suggester", "[data-value]", this.onNavigationOpen.bind(this)), this.teardownManually || c["default"](this.textarea).on("focusout:delayed.suggester", this.teardown), this.loadSuggestions()
            }
        }, {
            key: "teardown", value: function () {
                this.deactivate(), c["default"](this.textarea).off(".suggester"), c["default"](this.textarea.form).off(".suggester"), c["default"](this.suggester).off(".suggester"), this.onSuggestionsLoaded = function () {
                    return null
                }
            }
        }, {
            key: "onPaste", value: function () {
                this.deactivate(), this.justPasted = !0
            }
        }, {
            key: "onInput", value: function () {
                return this.justPasted ? void(this.justPasted = !1) : this.checkQuery() ? !1 : void 0
            }
        }, {
            key: "onNavigationKeyDown", value: function (e) {
                switch (l["default"](e.originalEvent)) {
                    case"tab":
                        return this.onNavigationOpen(e), !1;
                    case"esc":
                        return this.deactivate(), e.stopImmediatePropagation(), !1
                }
            }
        }, {
            key: "_getDataValue", value: function (e) {
                return this.currentSearch.type.getValue ? this.currentSearch.type.getValue(e) : e.getAttribute("data-value")
            }
        }, {
            key: "_findIndexOfPick", value: function (e, t) {
                for (var i = 1, n = 0; n < e.length; n++) {
                    var o = e[n];
                    if (this._getDataValue(o) === t)return i;
                    i++
                }
                return -1
            }
        }, {
            key: "logMention", value: function (e, i, n, o) {
                var r = n.getAttribute("data-mentionable-type");
                if (r) {
                    var s = n.getAttribute("data-mentionable-id");
                    if (s) {
                        var a = new FormData;
                        a.append("authenticity_token", i), a.append("mentionable_type", r), a.append("mentionable_id", s), a.append("query_string", o), t.fetch(e, {
                            method: "POST",
                            body: a
                        })
                    }
                }
            }
        }, {
            key: "onNavigationOpen", value: function (e) {
                var t = this, i = this._getDataValue(e.target), n = this.currentSearch.type.typeid, o = this.suggester.querySelector("ul.suggestions").children, r = this._findIndexOfPick(o, i), s = this.currentSearch.query.length, a = this.textarea.value.substring(0, this.currentSearch.endIndex), u = this.textarea.value.substring(this.currentSearch.endIndex);
                this.currentSearch.type.onSelection ? this.currentSearch.type.onSelection(i) : (a = a.replace(this.currentSearch.type.match, this.currentSearch.type.replace.replace("$value", i)), this.textarea.value = a + u), this.deactivate(), this.textarea.focus(), this.textarea.selectionStart = a.length, this.textarea.selectionEnd = a.length, d["default"]({
                    suggesterBehavior: {
                        version: 1,
                        typeid: n,
                        indexOfPick: r,
                        numCharacters: s
                    }
                });
                var c = this.suggester.getAttribute("data-log-mention-url");
                if (c) {
                    var l = this.suggester.getAttribute("data-log-mention-csrf-token");
                    l && requestIdleCallback(function () {
                        return t.logMention(c, l, e.target, t.currentSearch.query)
                    })
                }
            }
        }, {
            key: "checkQuery", value: function () {
                var e = this, t = this.searchQuery();
                if (t) {
                    if (this.currentSearch && this.currentSearch === t.query)return;
                    return this.currentSearch = t, this.search(t.type, t.query).then(function (i) {
                        return i ? e.activate(t.startIndex) : e.deactivate()
                    }), this.currentSearch.query
                }
                return this.currentSearch = null, void this.deactivate()
            }
        }, {
            key: "activate", value: function (e) {
                this.onActivate && this.onActivate(this.suggester), this.repositionManually || c["default"](this.suggester).css(h["default"](this.textarea, e + 1)), this.suggester.classList.contains("active") || (this.suggester.classList.add("active"), this.textarea.classList.add("js-navigation-enable"), i.push(this.suggester), i.focus(this.suggester))
            }
        }, {
            key: "deactivate", value: function () {
                this.suggester.classList.contains("active") && (this.suggester.classList.remove("active"), c["default"](this.suggester).find(".suggestions").hide(), this.textarea.classList.remove("js-navigation-enable"), i.pop(this.suggester))
            }
        }, {
            key: "search", value: function (e, t) {
                var n = this;
                return e.search(this.suggestions, t).then(function (e) {
                    var t = f(e, 2), o = t[0], r = t[1];
                    if (r > 0) {
                        var s = o[0].cloneNode(!0);
                        return n.suggester.innerHTML = "", n.suggester.appendChild(s), c["default"](s).show(), i.focus(n.suggester), !0
                    }
                    return !1
                })
            }
        }, {
            key: "searchQuery", value: function () {
                var e = this.textarea.selectionEnd, t = this.textarea.value.substring(0, e);
                if (!this.disable || !this.disable(t))for (var i in this.types) {
                    var n = this.types[i], o = t.match(n.match);
                    if (o)return n.normalizeMatch ? n.normalizeMatch(n, e, o) : this.normalizeMatch(n, e, o)
                }
            }
        }, {
            key: "normalizeMatch", value: function (e, t, i) {
                var n = i[2], o = i[3], r = t - n.length, s = t;
                return {type: e, text: n, query: o, startIndex: r, endIndex: s}
            }
        }, {
            key: "loadSuggestions", value: function () {
                var e = this;
                if (!this.suggestions.hasChildNodes()) {
                    var i = this.suggester.getAttribute("data-url");
                    if (i) {
                        var n = m[i] || (m[i] = t.fetchText(i));
                        return n.then(function (t) {
                            return e.onSuggestionsLoaded(t)
                        })
                    }
                }
            }
        }, {
            key: "onSuggestionsLoaded", value: function (e) {
                var t = this;
                return c["default"].parseHTML(e).forEach(function (e) {
                    return t.suggestions.appendChild(e)
                }), document.activeElement === this.textarea ? (this.currentSearch = null, this.checkQuery()) : void 0
            }
        }]), e
    }();
    e["default"] = p
}),function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0;
    u = require("github/feature-detection")["default"], t = require("github/suggester")["default"];
    var g = require("github/fuzzy-filter-sort-list")["default"];
    f = function (e, t, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0;
        return s = i[3], o = i[4], r = t - o.length, n = t, {type: e, text: s, query: o, startIndex: r, endIndex: n}
    }, p = {
        mention: {
            typeid: "mention",
            match: /(^|\s)(@([a-z0-9\-_\/]*))$/i,
            replace: "$1@$value ",
            search: function (t, i) {
                var o = void 0, r = void 0, s = void 0;
                return s = l(i), o = e(t).find("ul.mention-suggestions"), r = g(o[0], i, {
                    limit: 5,
                    text: n,
                    score: function (e, t, i) {
                        var n = s.score(e, t, i), o = i.getAttribute("data-mentionable-score");
                        return null !== o ? n * parseFloat(o) : n
                    }
                }), Promise.resolve([o, r])
            }
        },
        auditLogUser: {
            typeid: "auditLogUser",
            match: /(^|\s)((\-?actor:|\-?user:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (t, i) {
                var n = void 0, o = void 0;
                return n = e(t).find("ul.user-suggestions"), o = g(n[0], i, {limit: 5}), Promise.resolve([n, o])
            },
            normalizeMatch: f
        },
        auditLogOrg: {
            typeid: "auditLogOrg",
            match: /(^|\s)((\-?org:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (t, i) {
                var n = void 0, o = void 0;
                return n = e(t).find("ul.org-suggestions"), o = g(n[0], i, {limit: 5}), Promise.resolve([n, o])
            },
            normalizeMatch: f
        },
        auditLogAction: {
            typeid: "auditLogAction",
            match: /(^|\s)((\-?action:)([a-z0-9\.\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (t, i) {
                var n = void 0, o = void 0;
                return n = e(t).find("ul.action-suggestions"), o = g(n[0], i, {limit: 5}), Promise.resolve([n, o])
            },
            normalizeMatch: f
        },
        auditLogRepo: {
            typeid: "auditLogRepo",
            match: /(^|\s)((\-?repo:)([a-z0-9\/\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (t, i) {
                var n = void 0, o = void 0;
                return n = e(t).find("ul.repo-suggestions"), o = g(n[0], i, {limit: 5}), Promise.resolve([n, o])
            },
            normalizeMatch: f
        },
        auditLogCountry: {
            typeid: "auditLogCountry",
            match: /(^|\s)((\-?country:)([a-z0-9\-\+_]*))$/i,
            replace: "$1$3$value ",
            search: function (t, i) {
                var n = void 0, o = void 0;
                return n = e(t).find("ul.country-suggestions"), o = g(n[0], i, {limit: 5}), Promise.resolve([n, o])
            },
            normalizeMatch: f
        },
        emoji: {
            typeid: "emoji", match: /(^|\s)(:([a-z0-9\-\+_]*))$/i, replace: "$1$value ", getValue: function (e) {
                return u.emoji && e.getAttribute("data-raw-value") || e.getAttribute("data-value")
            }, search: function (t, i) {
                var n = void 0, o = void 0;
                return n = e(t).find("ul.emoji-suggestions"), i = " " + i.toLowerCase().replace(/_/g, " "), o = g(n[0], i, {
                    limit: 5,
                    text: a,
                    score: s
                }), Promise.resolve([n, o])
            }
        },
        hashed: {
            typeid: "issue",
            match: /(^|\s)(\#([a-z0-9\-_\/]*))$/i,
            replace: "$1#$value ",
            search: function (t, i) {
                var o = void 0, r = void 0, s = void 0, a = void 0;
                return o = e(t).find("ul.hashed-suggestions"), r = /^\d+$/.test(i) ? (s = new RegExp("\\b" + i), function (e) {
                    return h(e, s)
                }) : l(i).score, a = g(o[0], i, {limit: 5, text: n, score: r}), Promise.resolve([o, a])
            }
        }
    }, r = {}, a = function (e) {
        var t = void 0;
        return t = e.getAttribute("data-emoji-name"), r[t] = " " + n(e).replace(/_/g, " "), t
    }, n = function (e) {
        return e.getAttribute("data-text").trim().toLowerCase()
    }, s = function (e, t) {
        var i = void 0;
        return i = r[e].indexOf(t), i > -1 ? 1e3 - i : 0
    }, h = function (e, t) {
        var i = void 0;
        return i = e.search(t), i > -1 ? 1e3 - i : 0
    }, v = function (e, t) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
        if (c = i(e, t[0]), 0 !== c.length) {
            if (1 === t.length)return [c[0], 1, []];
            for (a = null, o = 0, r = c.length; r > o; o++)u = c[o], (n = d(e, t, u + 1)) && (s = n[n.length - 1] - u, (!a || s < a[1]) && (a = [u, s, n]));
            return a
        }
    }, i = function (e, t) {
        var i = void 0, n = void 0;
        for (i = 0, n = []; (i = e.indexOf(t, i)) > -1;)n.push(i++);
        return n
    }, d = function (e, t, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0;
        for (o = [], n = r = 1, s = t.length; s >= 1 ? s > r : r > s; n = s >= 1 ? ++r : --r) {
            if (i = e.indexOf(t[n], i), -1 === i)return;
            o.push(i++)
        }
        return o
    }, c = function () {
        return 2
    }, l = function (e) {
        var t = void 0, i = void 0;
        return e ? (t = e.toLowerCase().split(""), i = function (i) {
            var n = void 0, o = void 0;
            return i && (n = v(i, t)) ? (o = e.length / n[1], o /= n[0] / 2 + 1) : 0
        }) : i = c, {score: i}
    }, o = function (e) {
        var t = void 0;
        return t = e.match(/`{3,}/g), t || (t = m(e).match(/`/g)), null != t && t.length % 2
    }, m = function (e) {
        return e.replace(/`{3,}[^`]*\n(.+)?\n`{3,}/g, "")
    }, e(document).on("focusin:delayed", ".js-suggester-field", function () {
        new t({
            input: this,
            suggester: this.closest(".js-suggester-container").querySelector(".js-suggester"),
            types: p,
            disable: o
        }).setup()
    })
}.call(this),function () {
    function e() {
        return "survey-" + document.querySelector(".js-survey").getAttribute("data-survey-slug")
    }

    function t() {
        return parseInt(f(e())) || 0
    }

    function i() {
        var i = arguments.length <= 0 || void 0 === arguments[0] ? 1 : arguments[0];
        v(e(), t() + i)
    }

    function n() {
        return "github.dev" === location.hostname || location.search.match(/show-survey=1/) ? !0 : t() < g
    }

    function o(e) {
        if (e.getAttribute("data-optional-question"))return !0;
        var t = e.querySelector("input.js-other-choice"), i = e.querySelector("input[type=text]");
        if (t && t.checked) {
            var n = i.value.trim();
            return n
        }
        return e.querySelector("input:checked") ? !0 : !1
    }

    function r(e) {
        var t = e.closest(".js-survey"), i = t.querySelector(".js-survey-button");
        i.disabled = !o(e)
    }

    function s(e) {
        var t = e.querySelector("input.js-other-choice"), i = e.querySelector("input[type=text]");
        t && (i.classList.toggle("d-none", !t.checked), t.checked && i.focus())
    }

    function a(e, t) {
        var n = e.querySelector(".js-survey-form"), o = e.querySelectorAll(".js-survey-box-header, .js-survey-body, .js-survey-footer"), r = e.querySelector(".js-survey-complete");
        t.classList.toggle("d-none", !0), Array.from(o).forEach(function (e) {
            return e.classList.toggle("d-none", !0)
        }), r.classList.toggle("d-none", !1), p({
            category: "survey",
            action: "click",
            label: "submit"
        }), i(g), c(n).submit(), e.classList.contains("js-survey-fixed") && setTimeout(function () {
            return e.classList.toggle("anim-fade-down", !0)
        }, 5e3)
    }

    function u(e, t, i) {
        var n = i.getAttribute("data-next-question"), o = e.querySelector(".js-question-" + n), s = e.querySelector(".js-question-number");
        p({
            category: "survey",
            action: "click",
            label: "next",
            value: n
        }), s.textContent = parseInt(n) + 1, o.classList.toggle("d-none", !1), r(o), o.getAttribute("data-last-question") && (o.querySelector("textarea").focus(), t.textContent = "Submit", t.classList.add("btn-primary"))
    }

    var c = require("github/jquery")["default"], l = require("github/observe"), d = l.observe, h = require("github/local-storage"), f = h.getItem, v = h.setItem, m = require("github/google-analytics"), p = m.trackEvent, g = 3;
    d(".js-survey", function () {
        n() ? (p({
            category: "survey",
            action: "show",
            interactive: !1
        }), i(), this.classList.toggle("d-none", !1)) : this.classList.toggle("d-none", !0)
    }), c(document).on("ajaxSuccess", ".js-survey-form", function () {
        p({category: "survey", action: "success"})
    }), c(document).on("click", ".js-survey-button", function () {
        var e = this.closest(".js-survey"), t = e.querySelector(".js-question:not(.d-none)"), i = t.getAttribute("data-last-question"), n = this;
        t.classList.toggle("d-none", !0), i ? a(e, n) : u(e, n, t)
    }), c(document).on("click", ".js-dismiss-survey", function (e) {
        p({
            category: "survey",
            action: "click",
            label: "dismiss"
        }), document.querySelector(".js-survey").classList.toggle("anim-fade-down", !0), i(g), e.preventDefault()
    }), c(document).on("change", ".js-survey", function () {
        var e = this.querySelector(".js-question:not(.d-none)");
        r(e), s(e)
    }), d(".js-survey input[type=text]", function () {
        c(this).on("input", function () {
            var e = this.closest(".js-survey"), t = e.querySelector(".js-question:not(.d-none)");
            r(t)
        })
    })
}();
var _createClass = function () {
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    return function (t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t
    }
}();
!function () {
    var e = require("github/jquery")["default"], t = require("github/suggester")["default"], i = require("github/fuzzy-filter").fuzzyScore, n = require("github/hotkey")["default"], o = require("github/observe"), r = o.observe, s = require("github/fuzzy-filter-sort-list")["default"], a = function () {
        function o(e) {
            _classCallCheck(this, o), this.container = e.container, this.selections = e.selections, this.inputWrap = e.inputWrap, this.input = e.input, this.suggestions = e.suggestions, this.tagTemplate = e.tagTemplate
        }

        return _createClass(o, [{
            key: "setup", value: function () {
                var e = this;
                this.container.addEventListener("click", function (t) {
                    t.target.matches(".js-remove") ? e.removeTag(t) : e.onFocus()
                }), this.input.addEventListener("focus", this.onFocus.bind(this)), this.input.addEventListener("blur", this.onBlur.bind(this)), this.input.addEventListener("keydown", this.onKeyDown.bind(this)), this.setupSuggester()
            }
        }, {
            key: "setupSuggester", value: function () {
                var e = this.suggestions.cloneNode(!0);
                this.container.appendChild(e), new t({
                    input: this.input,
                    suggester: this.suggestions,
                    suggestions: e,
                    repositionManually: !0,
                    teardownManually: !0,
                    onActivate: this.repositionSuggester.bind(this),
                    types: {
                        tag: {
                            match: /.+/i,
                            onSelection: this.selectTag.bind(this),
                            search: this.filterSuggestions.bind(this),
                            normalizeMatch: this.normalizeSuggestionMatch.bind(this)
                        }
                    }
                }).setup(), this.container.classList.add("js-suggester-container"), this.suggestions.classList.add("js-navigation-container", "suggester")
            }
        }, {
            key: "onFocus", value: function () {
                this.inputWrap.classList.add("focus"), this.input != document.activeElement && this.input.focus()
            }
        }, {
            key: "onBlur", value: function () {
                this.inputWrap.classList.remove("focus")
            }
        }, {
            key: "onKeyDown", value: function (e) {
                switch (n(e)) {
                    case"backspace":
                        this.onBackspace(e);
                        break;
                    case"enter":
                    case"tab":
                    case",":
                        !this.isSuggesterVisible() && this.val() && (e.preventDefault(), this.selectTag(this.val()))
                }
            }
        }, {
            key: "selectTag", value: function (e) {
                var t = this.normalizeTag(e);
                t && (this.selections.appendChild(this.templateTag(t)), this.input.value = "")
            }
        }, {
            key: "removeTag", value: function (e) {
                e.preventDefault(), e.target.closest(".tag-input-tag").remove()
            }
        }, {
            key: "templateTag", value: function (e) {
                var t = this.tagTemplate.cloneNode(!0);
                return t.querySelector("input").value = e, t.querySelector(".js-placeholder-tag-name").replaceWith(e), t.classList.remove("d-none", "js-template"), t
            }
        }, {
            key: "normalizeTag", value: function (e) {
                return e.toLowerCase().trim().replace(/[\s,']+/g, "-")
            }
        }, {
            key: "onBackspace", value: function () {
                if (!this.val()) {
                    var e = this.selections.querySelector("li:last-child .js-remove");
                    e && e.click()
                }
            }
        }, {
            key: "val", value: function () {
                return this.input.value
            }
        }, {
            key: "repositionSuggester", value: function (e) {
                e.style.position = "absolute", e.style.top = this.container.clientHeight + "px"
            }
        }, {
            key: "filterSuggestions", value: function (t, n) {
                var o = this.selectedTags(), r = e(t).find("ul.js-tag-suggestions"), a = s(r[0], n, {
                    limit: 5,
                    score: function (e, t) {
                        return o.indexOf(e) >= 0 ? 0 : i(e, t)
                    }
                });
                return Promise.resolve([r, a])
            }
        }, {
            key: "normalizeSuggestionMatch", value: function (e, t, i) {
                return {type: e, text: i[0], query: i[0]}
            }
        }, {
            key: "selectedTags", value: function () {
                var e = this.selections.querySelectorAll("input");
                return [].concat(_toConsumableArray(e)).map(function (e) {
                    return e.value
                })
            }
        }, {
            key: "isSuggesterVisible", value: function () {
                return !!this.suggestions.offsetParent
            }
        }]), o
    }();
    r(".js-tag-input-container", function () {
        var e = this.querySelector(".js-template");
        e.remove(), new a({
            container: this,
            inputWrap: this.querySelector(".js-tag-input-wrapper"),
            input: this.querySelector('input[type="text"]'),
            suggestions: this.querySelector(".js-tag-input-options"),
            selections: this.querySelector(".js-tag-input-selected-tags"),
            tagTemplate: e
        }).setup()
    })
}(), function () {
    function e(e, t, i) {
        var n = e.replace(/\r/g, "").replace(I, "").replace(H, "").split("\n"), o = 0;
        return e.split("\n").map(function (e) {
            return n.indexOf(e) >= 0 && e.match(P) && (o += 1, o === t && (e = i ? e.replace(S, k) : e.replace(L, q))), e
        }).join("\n")
    }

    function t(e) {
        return e.replace(/([\[\]])/g, "\\$1").replace(/\s/, "\\s").replace("x", "[xX]")
    }

    function i(e) {
        e.target.classList.add("hovered")
    }

    function n(e) {
        e.target.classList.remove("hovered")
    }

    function o(e, t) {
        if (e.parentNode === t.parentNode)for (; e;) {
            if (e === t)return !0;
            e = e.previousElementSibling
        }
        return !1
    }

    function r(e, t) {
        return e.closest(".js-comment-body") === t.closest(".js-comment-body")
    }

    function s(e) {
        var t = e.closest(".js-comment-body"), i = Array.from(t.children).filter(function (e) {
            return "OL" === e.nodeName || "UL" === e.nodeName
        });
        return i.indexOf(e)
    }

    function a(e) {
        e.dataTransfer.setData("text/plain", e.target.textContent.trim()), M = e.target, C = !1, A = e.target, D = A.closest(".contains-task-list"), A.classList.add("is-ghost"), _ = Array.from(A.parentNode.children), T = _.indexOf(A), E = _[T + 1] || null
    }

    function u(e) {
        if (A) {
            var t = e.currentTarget;
            if (!r(A, t))return void e.stopPropagation();
            e.preventDefault(), e.dataTransfer.dropEffect = "move", M !== t && A && (A.classList.add("is-dragging"), M = t, o(A, t) ? t.before(A) : t.after(A))
        }
    }

    function c(e) {
        if (A) {
            C = !0;
            var t = Array.from(A.parentNode.children).indexOf(A), i = e.currentTarget.closest(".contains-task-list");
            if (T !== t || D !== i) {
                D === i && t > T && t++;
                var n = e.target.closest(".js-task-list-container");
                g(n, "reordered", {src: [s(D), T], dst: [s(i), t]})
            }
        }
    }

    function l() {
        A.classList.remove("is-dragging"), A.classList.remove("is-ghost"), C || D.insertBefore(A, E), A = null, E = null, C = !1, M = null
    }

    function d(e) {
        if (A) {
            var t = e.currentTarget;
            if (!r(A, t))return void e.stopPropagation();
            e.preventDefault(), e.dataTransfer.dropEffect = "move"
        }
    }

    function h() {
        var e = document.createElement("span"), t = document.createElementNS("http://www.w3.org/2000/svg", "svg"), i = document.createElementNS("http://www.w3.org/2000/svg", "path");
        return e.classList.add("handle"), t.classList.add("drag-handle"), t.setAttribute("aria-hidden", "true"), t.setAttribute("width", "16"), t.setAttribute("height", "15"), t.setAttribute("version", "1.1"), t.setAttribute("viewBox", "0 0 16 15"), i.setAttribute("d", "M12,4V5H4V4h8ZM4,8h8V7H4V8Zm0,3h8V10H4v1Z"), t.appendChild(i), e.appendChild(t), e
    }

    function f() {
        this.closest(".task-list-item").setAttribute("draggable", !0)
    }

    function v() {
        A || this.closest(".task-list-item").setAttribute("draggable", !1)
    }

    function m(e) {
        e.querySelectorAll(".js-task-list-field").length > 0 && (e.classList.add("is-task-list-enabled"), Array.from(e.querySelectorAll(".task-list-item")).forEach(function (e) {
            return e.classList.add("enabled")
        }), Array.from(e.querySelectorAll(".task-list-item-checkbox")).forEach(function (e) {
            return e.disabled = !1
        }))
    }

    function p(e) {
        e.classList.remove("is-task-list-enabled"), Array.from(e.querySelectorAll(".task-list-item")).forEach(function (e) {
            return e.classList.remove("enabled")
        }), Array.from(e.querySelectorAll(".task-list-item-checkbox")).forEach(function (e) {
            return e.disabled = !0
        })
    }

    function g(e, t, i) {
        var n = e.querySelector("form.js-comment-update");
        p(e);
        var o = document.createElement("input");
        if (o.setAttribute("type", "hidden"), o.setAttribute("name", "task_list_track"), o.setAttribute("value", t), n.appendChild(o), i) {
            var r = document.createElement("input");
            r.setAttribute("type", "hidden"), r.setAttribute("name", "task_list_reorder"), r.setAttribute("value", JSON.stringify(i)), n.appendChild(r)
        }
        if (!n.elements.task_list_key) {
            var s = document.createElement("input");
            s.setAttribute("type", "hidden"), s.setAttribute("name", "task_list_key"), s.setAttribute("value", n.querySelector(".js-task-list-field").getAttribute("name").split("[")[0]), n.appendChild(s)
        }
        e.classList.remove("is-comment-stale"), b(n).submit()
    }

    var b = require("jquery"), y = require("github/observe"), j = y.observe, w = require("delegated-events"), x = w.on, q = "[ ]", k = "[x]", S = RegExp("" + t(q)), L = RegExp("" + t(k)), C = !1, A = null, E = null, T = null, _ = null, M = null, D = null, P = RegExp("^(?:\\s*(?:>\\s*)*(?:[-+*]|(?:\\d+\\.)))\\s*(" + t(k) + "|" + t(q) + ")\\s+(?!\\(.*?\\))(?=(?:\\[.*?\\]\\s*(?:\\[.*?\\]|\\(.*?\\))\\s*)*(?:[^\\[]|$))"), I = /^`{3}(?:\s*\w+)?[\S\s].*[\S\s]^`{3}$/gm, H = RegExp("^(" + t(k) + "|" + t(q) + ").+$", "g");
    j(".contains-task-list", function () {
        var e = this.closest(".js-task-list-container");
        e && m(e)
    }), x("change", ".task-list-item-checkbox", function () {
        var t = this.closest(".js-task-list-container"), i = t.querySelector(".js-task-list-field"), n = 1 + Array.from(t.querySelectorAll(".task-list-item-checkbox")).indexOf(this), o = this.checked;
        i.value = e(i.value, n, o), g(t, "checked:" + (o ? 1 : 0))
    }), j(".js-reorderable-task-lists .js-comment-body > .contains-task-list > .task-list-item", function () {
        if (!(this.closest(".js-comment-body").querySelectorAll(".task-list-item").length <= 1) && this.closest(".is-task-list-enabled")) {
            var e = h();
            this.insertBefore(e, this.firstChild), e.addEventListener("mouseenter", f), e.addEventListener("mouseleave", v), this.addEventListener("dragstart", a), this.addEventListener("dragenter", u), this.addEventListener("dragend", l), this.addEventListener("drop", c), this.addEventListener("dragover", d), this.addEventListener("mouseenter", i), this.addEventListener("mouseleave", n)
        }
    }), b(document).on("ajaxSuccess", "form.js-comment-update", function (e, t) {
        if (this.elements.task_list_reorder) {
            var i = JSON.parse(t.responseText);
            i.source && (this.querySelector(".js-task-list-field").value = i.source)
        }
    }), b(document).on("ajaxComplete", "form.js-comment-update", function (e, t) {
        var i = this.elements.task_list_track;
        i && i.remove();
        var n = this.elements.task_list_reorder;
        if (n && n.remove(), 200 !== t.status || /^\s*</.test(t.responseText)) {
            if (422 === t.status && t.stale) {
                var o = JSON.parse(t.responseText);
                if (o) {
                    var r = o.updated_markdown, s = o.updated_html, a = o.version;
                    if (r && s && a) {
                        var u = this.closest(".js-task-list-container"), c = u.querySelector(".js-comment-body"), l = u.querySelector(".js-task-list-field");
                        c.innerHTML = s, l.value = r, u.dataset.bodyVersion = a
                    }
                } else window.location.reload()
            }
        } else m(this.closest(".js-task-list-container"))
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
    t = require("github/fetch").fetchJSON, n = require("github/observe").observe, i = function () {
        var i = void 0, n = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
        if (c = this.getAttribute("data-url"))return u = t(c), s = this.getAttribute("data-id"), a = e(".js-team-mention[data-id='" + s + "']"), a.removeAttr("data-url"), i = function (e) {
            return 0 === e.total ? e.members.push("This team has no members") : e.total > e.members.length && e.members.push(e.total - e.members.length + " more"), r(a, o(e.members))
        }, n = function (e) {
            return function (t) {
                var i = void 0, n = void 0;
                return n = (null != t.response ? t.response.status : void 0) || 500, i = function () {
                    switch (n) {
                        case 404:
                            return this.getAttribute("data-permission-text");
                        default:
                            return this.getAttribute("data-error-text")
                    }
                }.call(e), r(a, i)
            }
        }(this), u.then(i, n)
    }, r = function (e, t) {
        return e.attr("aria-label", t), e.addClass("tooltipped tooltipped-s tooltipped-multiline")
    }, o = function (e) {
        var t = void 0;
        return 0 === e.length ? "" : 1 === e.length ? e[0] : 2 === e.length ? e.join(" and ") : ([].splice.apply(e, [-1, 9e9].concat(t = "and " + e.slice(-1))), e.join(", "))
    }, n(".js-team-mention", function () {
        e(this).on("mouseenter", i)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxBeforeSend", function (t, i, n) {
        var o = void 0;
        n.crossDomain || (o = e(".js-timeline-marker"), o.length && i.setRequestHeader("X-Timeline-Last-Modified", o.attr("data-last-modified")))
    })
}.call(this);
var _slicedToArray = function () {
    function e(e, t) {
        var i = [], n = !0, o = !1, r = void 0;
        try {
            for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
        } catch (u) {
            o = !0, r = u
        } finally {
            try {
                !n && a["return"] && a["return"]()
            } finally {
                if (o)throw r
            }
        }
        return i
    }

    return function (t, i) {
        if (Array.isArray(t))return t;
        if (Symbol.iterator in Object(t))return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}();
(function () {
    function e(e) {
        for (var t = 0; t < l.length; t++) {
            var i = l[t].exec(e);
            if (null != i)return [i[1], i[2]]
        }
    }

    function t(e, t, i) {
        var n = new URL(e.getAttribute("data-fragment-url"), window.location.origin), o = new URLSearchParams(n.search.slice(1));
        o.append("focus_type", t), o.append("focus_value", i), n.search = o.toString(), e.src = n.toString()
    }

    function i() {
        return window.location.hash.slice(1)
    }

    var n = require("github/dimensions"), o = n.overflowOffset, r = require("github/observe"), s = r.observe, a = require("delegated-events"), u = a.on;
    u("click", ".js-timeline-progressive-disclosure-button", function () {
        var e = this.closest(".js-timeline-progressive-disclosure-container");
        e.src = this.getAttribute("data-url")
    });
    var c = null;
    s(".js-timeline-progressive-disclosure-container", function () {
        return {
            add: function (e) {
                return e.addEventListener("loadstart", function () {
                    return this.classList.add("is-loading"), !0
                }), e.addEventListener("loadend", function () {
                    return this.classList.remove("is-loading"), !0
                }), e.addEventListener("load", function () {
                    if (e === c) {
                        c = null;
                        var t = i(), n = document.getElementById(t);
                        if (n) {
                            var r = n.closest(".js-details-container");
                            null != r && r.classList.add("open");
                            var s = o(n);
                            (s.top < 0 || s.bottom < 0) && n.scrollIntoView()
                        }
                    }
                    return !0
                }), e.addEventListener("error", function () {
                    return this.src = "", !0
                })
            }
        }
    });
    var l = [/^(commitcomment)-(\d+)$/, /^(commits-pushed)-([0-9a-f]{7})$/, /^(discussion)_r(\d+)$/, /^(discussion-diff)-(\d+)(?:[LR]-?\d+)?$/, /^(event)-(\d+)$/, /^(issuecomment)-(\d+)$/, /^(ref-commit)-([0-9a-f]{7})$/, /^(ref-issue)-(\d+)$/, /^(ref-pullrequest)-(\d+)$/];
    !function () {
        var n = i();
        if (!document.getElementById(n)) {
            var o = document.querySelector(".js-timeline-progressive-disclosure-container");
            if (o) {
                var r = e(n);
                if (r) {
                    var s = _slicedToArray(r, 2), a = s[0], u = s[1];
                    return t(o, a, u), c = o
                }
            }
        }
    }()
}).call(this), function () {
    function e() {
        if (!window.performance.timing)try {
            return sessionStorage.setItem("navigationStart", Date.now())
        } catch (e) {
        }
    }

    function t() {
        return setTimeout(function () {
            var e = void 0, t = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
            if (d = {}, d.crossBrowserLoadEvent = Date.now(), window.performance.timing) {
                s = window.performance.timing;
                for (t in s)h = s[t], "number" == typeof h && (d[t] = h);
                var f = null != (a = window.chrome) && "function" == typeof a.loadTimes && null != (u = a.loadTimes()) ? u.firstPaintTime : void 0;
                f && (d.chromeFirstPaintTime = Math.round(1e3 * f))
            } else r = function () {
                try {
                    return sessionStorage.getItem("navigationStart")
                } catch (e) {
                }
            }(), r && (d.simulatedNavigationStart = parseInt(r, 10));
            for (l = function () {
                var e = void 0, t = void 0, n = void 0, o = void 0;
                for (n = window.performance.getEntriesByType("resource"), o = [], e = 0, t = n.length; t > e; e++)c = n[e], o.push(i.extend({}, c));
                return o
            }(), e = 0, o = l.length; o > e; e++)c = l[e], delete c.toJSON;
            return Object.keys(d).length > 1 || l.length ? n({timing: d, resources: l}) : void 0
        }, 0)
    }

    var i = require("github/jquery")["default"], n = require("github/stats")["default"];
    i(window).on("pagehide", e), i(window).on("load", t)
}.call(this), define("github/page-focused", ["exports"], function (e) {
    function t(e) {
        return new Promise(function (t) {
            function i() {
                e.hasFocus() && (t(), e.removeEventListener("visibilitychange", i), window.removeEventListener("focus", i), window.removeEventListener("blur", i))
            }

            e.addEventListener("visibilitychange", i), window.addEventListener("focus", i), window.addEventListener("blur", i), i()
        })
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = t
}), define("github/in-viewport", ["exports", "./jquery", "./observe", "./page-focused"], function (e, t, i, n) {
    function o(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function r(e) {
        var t = e.getBoundingClientRect(), i = d["default"](window).height(), n = d["default"](window).width();
        if (0 === t.height)return !1;
        if (t.height < i)return t.top >= 0 && t.left >= 0 && t.bottom <= i && t.right <= n;
        var o = Math.ceil(i / 2);
        return t.top >= 0 && t.top + o < i
    }

    function s(e) {
        for (var t = e.elements, i = [], n = 0, o = t.length; o > n; n++) {
            var s = t[n];
            if (r(s)) {
                var a = e["in"];
                i.push(null != a ? a.call(s, s, e) : void 0)
            } else {
                var u = e.out;
                i.push(null != u ? u.call(s, s, e) : void 0)
            }
        }
        return i
    }

    function a(e) {
        document.hasFocus() && window.scrollY !== v && (v = window.scrollY, e.checkPending || (e.checkPending = !0, window.requestAnimationFrame(function () {
            e.checkPending = !1, s(e)
        })))
    }

    function u(e, t) {
        0 === t.elements.length && (window.addEventListener("scroll", t.scrollHandler, {
            capture: !0,
            passive: !0
        }), h["default"](document).then(function () {
            return s(t)
        })), t.elements.push(e)
    }

    function c(e, t) {
        var i = t.elements.indexOf(e);
        -1 !== i && t.elements.splice(i, 1), 0 === t.elements.length && window.removeEventListener("scroll", t.scrollHandler, {
            capture: !0,
            passive: !0
        })
    }

    function l(e, t) {
        null != t.call && (t = {"in": t});
        var n = {id: f++, selector: e, "in": t["in"], out: t.out, elements: [], checkPending: !1};
        return n.scrollHandler = function () {
            a(n)
        }, i.observe(e, {
            add: function (e) {
                u(e, n)
            }, remove: function (e) {
                c(e, n)
            }
        }), n
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = l;
    var d = o(t), h = o(n), f = 0, v = -1
}), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = require("github/in-viewport")["default"], o = void 0, r = void 0, s = void 0;
    s = 0, r = function () {
        var t = void 0;
        if (document.hasFocus() && (t = document.querySelector(".js-timeline-marker-form")))return e(t).submit()
    }, n(".js-unread-item", {
        "in": function () {
            o(this)
        }
    }), i(".js-unread-item", {
        add: function () {
            return s++
        }, remove: function () {
            return s--, 0 === s ? r(this) : void 0
        }
    }), o = function (e) {
        return e.classList.remove("js-unread-item", "unread-item")
    }, e(document).on("socket:message", ".js-discussion", function (e) {
        var t = void 0, i = void 0, n = void 0, r = void 0;
        if (this === e.target)for (r = document.querySelectorAll(".js-unread-item"), i = 0, n = r.length; n > i; i++)t = r[i], o(t)
    })
}.call(this), function () {
    function e() {
        var e = o ? "(" + o + ") " : "";
        return document.title.match(n) ? document.title = document.title.replace(n, e) : document.title = "" + e + document.title
    }

    var t = require("github/observe"), i = t.observe, n = void 0, o = void 0;
    o = 0, n = /^\(\d+\)\s+/, i(".js-unread-item", {
        add: function () {
            return o++, e()
        }, remove: function () {
            return o--, e()
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0;
    t = require("github/fragment-target").findElementByFragmentName, i = function () {
        var e = void 0, i = void 0;
        if (location.hash && !document.querySelector(":target")) {
            try {
                e = decodeURIComponent(location.hash.slice(1))
            } catch (n) {
                return
            }
            i = t(document, "user-content-" + e), null != i && i.scrollIntoView();
        }
    }, window.addEventListener("hashchange", i), e(i), document.addEventListener("pjax:success", i)
}.call(this), function () {
    function e() {
        var e = r(this);
        return e && s(this), function () {
            var t = r(this);
            t !== e && s(this), e = t
        }
    }

    var t = require("github/jquery")["default"], i = require("github/observe"), n = i.observe, o = require("github/html-validation"), r = o.checkValidity, s = o.revalidate, a = require("github/focused"), u = a.onFocusedInput, c = ["input[pattern]", "input[required]", "textarea[required]", "select[required]"].join(",");
    u(document, c, e), t(document).on("change", c, e), n(c, function (e) {
        e.form && s(e)
    }), t(document).on("submit", ".js-normalize-submit", function (e) {
        return r(this) ? void 0 : e.preventDefault()
    })
}.call(this), function () {
    var e = require("github/observe"), t = e.observe, i = void 0;
    t(".will-transition-once", {
        add: function () {
            this.addEventListener("transitionend", i)
        }, remove: function () {
            this.removeEventListener("transitionend", i)
        }
    }), i = function (e) {
        return e.target.classList.remove("will-transition-once")
    }
}.call(this), function () {
    var e = require("github/observe"), t = e.observe, i = require("github/google-analytics"), n = i.trackEvent, o = new WeakMap;
    t(".js-signup-form", function () {
        var e = this;
        e.addEventListener("input", function (t) {
            if (t.target.closest("input[type=text]") && !o.get(e)) {
                var i = e.querySelector(".js-signup-source");
                n({category: "Signup", action: "Attempt", label: i.value}), o.set(e, !0)
            }
        })
    })
}(), function () {
    var e = require("delegated-events"), t = e.on, i = require("github/fetch"), n = i.fetchText;
    t("click", ".js-new-user-contrib-example", function (e) {
        var t = void 0, i = void 0, o = void 0;
        e.preventDefault(), t = document.querySelector(".js-calendar-graph"), t.classList.contains("sample-graph") || (t.classList.add("sample-graph"), i = function (e) {
            var i = document.createElement("div");
            i.innerHTML = e;
            var n = void 0;
            n = t.querySelector(".js-calendar-graph-svg"), n.replaceWith(i.children[0])
        }, o = function () {
            return t.classList.remove("sample-graph")
        }, n(this.getAttribute("href")).then(i, o))
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    d = require("github/fetch"), c = d.fetchJSON, l = d.fetchPoll, s = function () {
        function e(e, t, i) {
            this.container = e, this.width = t, this.height = i, this.initError = f(this.initError, this), this.init = f(this.init, this), this.loaderInterval = null, this.loaderOffset = 0, this.ctx = this.initCanvas(this.container, this.width, this.height), this.startLoader("Loading graph data"), this.loadMeta()
        }

        return e.prototype.initCanvas = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            return o = e.getElementsByTagName("canvas")[0], o.style.zIndex = "0", n = o.width, i = o.height, r = o.getContext("2d"), s = window.devicePixelRatio || 1, t = r.webkitBackingStorePixelRatio || r.mozBackingStorePixelRatio || r.msBackingStorePixelRatio || r.oBackingStorePixelRatio || r.backingStorePixelRatio || 1, a = s / t, 1 === a ? r : (o.width = n * a, o.height = i * a, o.style.width = n + "px", o.style.height = i + "px", r.scale(a, a), r)
        }, e.prototype.startLoader = function (e) {
            return this.ctx.save(), this.ctx.font = "14px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#cacaca", this.ctx.textAlign = "center", this.ctx.fillText(e, this.width / 2, 155), this.ctx.restore(), this.displayLoader()
        }, e.prototype.stopLoader = function () {
            var e = void 0;
            return e = this.container.querySelector(".large-loading-area"), e.classList.add("d-none")
        }, e.prototype.displayLoader = function () {
            var e = void 0;
            return e = this.container.querySelector(".large-loading-area"), e.classList.remove("d-none")
        }, e.prototype.loadMeta = function () {
            var e = void 0, t = void 0;
            return e = function (e) {
                return e.json()
            }, t = this.container.getAttribute("data-network-graph-meta-url"), l(t, {headers: {accept: "application/json"}}).then(e, this.initError).then(this.init)
        }, e.prototype.init = function (e) {
            var t = void 0, i = void 0, s = void 0, c = void 0, l = void 0, d = void 0;
            if (h) {
                for (this.focus = e.focus, this.nethash = e.nethash, this.spaceMap = e.spacemap, this.userBlocks = e.blocks, this.commits = function () {
                    var i = void 0, o = void 0, r = void 0, a = void 0;
                    for (r = e.dates, a = [], s = i = 0, o = r.length; o > i; s = ++i)t = r[s], a.push(new n(s, t));
                    return a
                }(), this.users = {}, l = e.users, i = 0, c = l.length; c > i; i++)d = l[i], this.users[d.name] = d;
                return this.chrome = new a(this, this.ctx, this.width, this.height, this.focus, this.commits, this.userBlocks, this.users), this.graph = new u(this, this.ctx, this.width, this.height, this.focus, this.commits, this.users, this.spaceMap, this.userBlocks, this.nethash), this.mouseDriver = new r(this.container, this.chrome, this.graph), this.keyDriver = new o(this.chrome, this.graph), this.stopLoader(), this.graph.drawBackground(), this.chrome.draw(), this.graph.requestInitialChunk()
            }
        }, e.prototype.initError = function () {
            return this.stopLoader(), this.ctx.clearRect(0, 0, this.width, this.height), this.startLoader("Graph could not be drawn due to a network problem.")
        }, e
    }(), n = function () {
        function e(e, t) {
            this.time = e, this.date = new Date(t), this.requested = null, this.populated = null
        }

        return e.prototype.populate = function (e, t, i) {
            return this.user = t, this.author = e.author, this.date = new Date(e.date.replace(" ", "T")), this.gravatar = e.gravatar, this.id = e.id, this.login = e.login, this.message = e.message, this.space = e.space, this.time = e.time, this.parents = this.populateParents(e.parents, i), this.requested = !0, this.populated = new Date
        }, e.prototype.populateParents = function (e, t) {
            var i = void 0, n = void 0, o = void 0;
            return o = function () {
                var o = void 0, r = void 0, s = void 0;
                for (s = [], o = 0, r = e.length; r > o; o++)i = e[o], n = t[i[1]], n.id = i[0], n.space = i[2], s.push(n);
                return s
            }()
        }, e
    }(), a = function () {
        function e(e, t, i, n, o, r, s, a) {
            this.network = e, this.ctx = t, this.width = i, this.height = n, this.focus = o, this.commits = r, this.userBlocks = s, this.users = a, this.namesWidth = 120, this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], this.userBgColors = ["#fff", "#f7f7f7"], this.headerColor = "#f7f7f7", this.dividerColor = "#ddd", this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.nameLineHeight = 24, this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.activeUser = null
        }

        return e.prototype.moveX = function (e) {
            return this.offsetX += e, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight ? this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight : void 0
        }, e.prototype.moveY = function (e) {
            return this.offsetY += e, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
        }, e.prototype.calcContentHeight = function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
            for (t = 0, o = this.userBlocks, i = 0, n = o.length; n > i; i++)e = o[i], t += e.count;
            return t * this.nameLineHeight
        }, e.prototype.hover = function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0;
            for (r = this.userBlocks, n = 0, o = r.length; o > n; n++)if (i = r[n], e > 0 && e < this.namesWidth && t > this.graphTopOffset + this.offsetY + i.start * this.nameLineHeight && t < this.graphTopOffset + this.offsetY + (i.start + i.count) * this.nameLineHeight)return this.users[i.name];
            return null
        }, e.prototype.draw = function () {
            return this.drawTimeline(this.ctx), this.drawUsers(this.ctx)
        }, e.prototype.drawTimeline = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0;
            for (e.fillStyle = this.headerColor, e.fillRect(0, 0, this.width, this.headerHeight), e.fillStyle = this.dividerColor, e.fillRect(0, this.headerHeight - 1, this.width, 1), c = parseInt((0 - this.offsetX) / this.nameLineHeight), 0 > c && (c = 0), u = c + parseInt(this.width / (this.nameLineHeight - 1)), u > this.commits.length && (u = this.commits.length), e.save(), e.translate(this.offsetX, 0), a = null, s = null, r = o = h = c, f = u; f >= h ? f > o : o > f; r = f >= h ? ++o : --o)t = this.commits[r], l = this.months[t.date.getMonth()], l !== a && (e.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", e.fillStyle = "#555", d = this.ctx.measureText(l).width, e.fillText(l, r * this.nameLineHeight - d / 2, this.headerHeight / 2 + 4), a = l), n = t.date.getDate(), n !== s && (e.font = "12px 'Helvetica Neue', Arial, sans-serif", e.fillStyle = "#555", i = this.ctx.measureText(n).width, e.fillText(n, r * this.nameLineHeight - i / 2, this.headerHeight + this.dateRowHeight / 2 + 3), s = n, e.fillStyle = "#ddd", e.fillRect(r * this.nameLineHeight, this.headerHeight, 1, 6));
            return e.restore()
        }, e.prototype.drawUsers = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            for (e.fillStyle = "#fff", e.fillRect(0, 0, this.namesWidth, this.height), e.save(), e.translate(0, this.headerHeight + this.dateRowHeight + this.offsetY), s = this.userBlocks, n = i = 0, o = s.length; o > i; n = ++i)t = s[n], e.fillStyle = this.userBgColors[n % 2], e.fillRect(0, t.start * this.nameLineHeight, this.namesWidth, t.count * this.nameLineHeight), this.activeUser && this.activeUser.name === t.name && (e.fillStyle = "rgba(0, 0, 0, 0.05)", e.fillRect(0, t.start * this.nameLineHeight, this.namesWidth, t.count * this.nameLineHeight)), r = (t.start + t.count / 2) * this.nameLineHeight + 3, e.fillStyle = "rgba(0, 0, 0, 0.1)", e.fillRect(0, t.start * this.nameLineHeight + t.count * this.nameLineHeight - 1, this.namesWidth, 1), e.fillStyle = "#333", e.font = "13px 'Helvetica Neue', Arial, sans-serif", e.textAlign = "center", e.fillText(t.name, this.namesWidth / 2, r, 96);
            return e.restore(), e.fillStyle = this.headerColor, e.fillRect(0, 0, this.namesWidth, this.headerHeight), e.fillStyle = "#777", e.font = "12px 'Helvetica Neue', Arial, sans-serif", e.fillText("Owners", 40, this.headerHeight / 2 + 3), a = 10, e.fillStyle = this.dividerColor, e.fillRect(this.namesWidth - 1, a, 1, this.headerHeight - 2 * a), e.fillStyle = this.dividerColor, e.fillRect(0, this.headerHeight - 1, this.namesWidth, 1), e.fillStyle = this.dividerColor, e.fillRect(this.namesWidth - 1, this.headerHeight, 1, this.height - this.headerHeight)
        }, e
    }(), u = function () {
        function t(e, t, i, n, o, r, s, a, u, c) {
            var l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0, w = void 0, x = void 0, q = void 0, k = void 0, S = void 0, L = void 0;
            for (this.network = e, this.ctx = t, this.width = i, this.height = n, this.focus = o, this.commits = r, this.users = s, this.spaceMap = a, this.userBlocks = u, this.nethash = c, this.namesWidth = 120, this.headerHeight = 40, this.dateRowHeight = 30, this.graphTopOffset = 10 + this.headerHeight + this.dateRowHeight, this.bgColors = ["#fff", "#f9f9f9"], this.nameLineHeight = 24, this.spaceColors = ["#c0392b", "#3498db", "#2ecc71", "#8e44ad", "#f1c40f", "#e67e22", "#34495e", "#e74c3c", "#2980b9", "#1abc9c", "#9b59b6", "#f39c12", "#7f8c8d", "#2c3e50", "#d35400", "#e74c3c", "#95a5a6", "#bdc3c7", "#16a085", "#27ae60"], this.offsetX = this.namesWidth + (this.width - this.namesWidth) / 2 - this.focus * this.nameLineHeight, this.offsetY = 0, this.bgCycle = 0, this.marginMap = {}, this.gravatars = {}, this.activeCommit = null, this.contentHeight = this.calcContentHeight(), this.graphMidpoint = this.namesWidth + (this.width - this.namesWidth) / 2, this.showRefs = !0, this.lastHotLoadCenterIndex = null, this.connectionMap = {}, this.spaceUserMap = {}, w = this.userBlocks, f = 0, p = w.length; p > f; f++)for (l = w[f], v = m = x = l.start, q = l.start + l.count; q >= x ? q > m : m > q; v = q >= x ? ++m : --m)this.spaceUserMap[v] = this.users[l.name];
            for (this.headsMap = {}, k = this.userBlocks, y = 0, g = k.length; g > y; y++)for (l = k[y], L = this.users[l.name], S = L.heads, j = 0, b = S.length; b > j; j++)d = S[j], this.headsMap[d.id] || (this.headsMap[d.id] = []), h = {
                name: L.name,
                head: d
            }, this.headsMap[d.id].push(h)
        }

        return t.prototype.moveX = function (e) {
            return this.offsetX += e, this.offsetX > this.graphMidpoint ? this.offsetX = this.graphMidpoint : this.offsetX < this.graphMidpoint - this.commits.length * this.nameLineHeight && (this.offsetX = this.graphMidpoint - this.commits.length * this.nameLineHeight), this.hotLoadCommits()
        }, t.prototype.moveY = function (e) {
            return this.offsetY += e, this.offsetY > 0 || this.contentHeight < this.height - this.graphTopOffset ? this.offsetY = 0 : this.offsetY < -this.contentHeight + this.height / 2 ? this.offsetY = -this.contentHeight + this.height / 2 : void 0
        }, t.prototype.toggleRefs = function () {
            return this.showRefs = !this.showRefs
        }, t.prototype.calcContentHeight = function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
            for (t = 0, o = this.userBlocks, i = 0, n = o.length; n > i; i++)e = o[i], t += e.count;
            return t * this.nameLineHeight
        }, t.prototype.hover = function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
            for (c = this.timeWindow(), o = n = r = c.min, s = c.max; s >= r ? s >= n : n >= s; o = s >= r ? ++n : --n)if (i = this.commits[o], a = this.offsetX + i.time * this.nameLineHeight, u = this.offsetY + this.graphTopOffset + i.space * this.nameLineHeight, e > a - 5 && a + 5 > e && t > u - 5 && u + 5 > t)return i;
            return null
        }, t.prototype.hotLoadCommits = function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
            return o = 200, t = parseInt((-this.offsetX + this.graphMidpoint) / this.nameLineHeight), 0 > t && (t = 0), t > this.commits.length - 1 && (t = this.commits.length - 1), this.lastHotLoadCenterIndex && Math.abs(this.lastHotLoadCenterIndex - t) < 10 ? void 0 : (this.lastHotLoadCenterIndex = t, e = this.backSpan(t, o), n = this.frontSpan(t, o), e || n ? (r = e ? e[0] : n[0], i = n ? n[1] : e[1], this.requestChunk(r, i)) : void 0)
        }, t.prototype.backSpan = function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
            for (r = null, n = i = u = e; (0 >= u ? 0 >= i : i >= 0) && n > e - t; n = 0 >= u ? ++i : --i)if (!this.commits[n].requested) {
                r = n;
                break
            }
            if (null !== r) {
                for (s = null, a = null, n = o = c = r; (0 >= c ? 0 >= o : o >= 0) && n > r - t; n = 0 >= c ? ++o : --o)if (this.commits[n].requested) {
                    s = n;
                    break
                }
                return s ? a = s + 1 : (a = r - t, 0 > a && (a = 0)), [a, r]
            }
            return null
        }, t.prototype.frontSpan = function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
            for (c = null, n = i = r = e, s = this.commits.length; (s >= r ? s > i : i > s) && e + t > n; n = s >= r ? ++i : --i)if (!this.commits[n].requested) {
                c = n;
                break
            }
            if (null !== c) {
                for (l = null, d = null, n = o = a = c, u = this.commits.length; (u >= a ? u > o : o > u) && c + t > n; n = u >= a ? ++o : --o)if (this.commits[n].requested) {
                    l = n;
                    break
                }
                return d = l ? l - 1 : c + t >= this.commits.length ? this.commits.length - 1 : c + t, [c, d]
            }
            return null
        }, t.prototype.chunkUrl = function () {
            return document.querySelector(".js-network-graph-container").getAttribute("data-network-graph-chunk-url")
        }, t.prototype.requestInitialChunk = function () {
            var t = void 0;
            if (h) {
                var i = e.param({nethash: this.nethash});
                return t = this.chunkUrl() + "?" + i, c(t).then(function (e) {
                    return function (t) {
                        return e.importChunk(t), e.draw(), e.network.chrome.draw()
                    }
                }(this))
            }
        }, t.prototype.requestChunk = function (t, i) {
            var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            if (h) {
                for (o = n = r = t, s = i; s >= r ? s >= n : n >= s; o = s >= r ? ++n : --n)this.commits[o].requested = new Date;
                return a = this.chunkUrl() + "?" + e.param({
                        nethash: this.nethash,
                        start: t,
                        end: i
                    }), c(a).then(function (e) {
                    return function (t) {
                        return e.importChunk(t), e.draw(), e.network.chrome.draw(), e.lastHotLoadCenterIndex = e.focus
                    }
                }(this))
            }
        }, t.prototype.importChunk = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
            if (e.commits) {
                for (a = e.commits, u = [], n = 0, r = a.length; r > n; n++)t = a[n], c = this.spaceUserMap[t.space], i = this.commits[t.time], i.populate(t, c, this.commits), u.push(function () {
                    var e = void 0, t = void 0, n = void 0, r = void 0;
                    for (n = i.parents, r = [], e = 0, t = n.length; t > e; e++)s = n[e], r.push(function () {
                        var e = void 0, t = void 0, n = void 0, r = void 0;
                        for (r = [], o = e = t = s.time + 1, n = i.time; n >= t ? n > e : e > n; o = n >= t ? ++e : --e)this.connectionMap[o] = this.connectionMap[o] || [], r.push(this.connectionMap[o].push(i));
                        return r
                    }.call(this));
                    return r
                }.call(this));
                return u
            }
        }, t.prototype.timeWindow = function () {
            var e = void 0, t = void 0;
            return t = parseInt((this.namesWidth - this.offsetX + this.nameLineHeight) / this.nameLineHeight), 0 > t && (t = 0), e = t + parseInt((this.width - this.namesWidth) / this.nameLineHeight), e > this.commits.length - 1 && (e = this.commits.length - 1), {
                min: t,
                max: e
            }
        }, t.prototype.draw = function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0, w = void 0, x = void 0, q = void 0, k = void 0, S = void 0, L = void 0, C = void 0, A = void 0, E = void 0, T = void 0, _ = void 0, M = void 0, D = void 0, P = void 0;
            for (this.drawBackground(), P = this.timeWindow(), m = P.min, v = P.max, this.ctx.save(), this.ctx.translate(this.offsetX, this.offsetY + this.graphTopOffset), i = {}, x = this.spaceMap, s = r = 0, c = x.length; c > r; s = ++r)for (M = this.spaceMap.length - s - 1, a = u = k = m, S = v; S >= k ? S >= u : u >= S; a = S >= k ? ++u : --u)e = this.commits[a], e.populated && e.space === M && (this.drawConnection(e), i[e.id] = !0);
            for (s = f = L = m, C = v; C >= L ? C >= f : f >= C; s = C >= L ? ++f : --f)if (t = this.connectionMap[s])for (p = 0, l = t.length; l > p; p++)e = t[p], i[e.id] || (this.drawConnection(e), i[e.id] = !0);
            for (A = this.spaceMap, s = b = 0, d = A.length; d > b; s = ++b)for (M = this.spaceMap.length - s - 1, a = j = E = m, T = v; T >= E ? T >= j : j >= T; a = T >= E ? ++j : --j)e = this.commits[a], e.populated && e.space === M && (e === this.activeCommit ? this.drawActiveCommit(e) : this.drawCommit(e));
            if (this.showRefs)for (a = w = _ = m, q = v; q >= _ ? q >= w : w >= q; a = q >= _ ? ++w : --w)if (e = this.commits[a], e.populated && (o = this.headsMap[e.id]))for (y = 0, D = 0, h = o.length; h > D; D++)n = o[D], this.spaceUserMap[e.space].name === n.name && (g = this.drawHead(e, n.head, y), y += g);
            return this.ctx.restore(), this.activeCommit ? this.drawCommitInfo(this.activeCommit) : void 0
        }, t.prototype.drawBackground = function () {
            var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
            for (this.ctx.clearRect(0, 0, this.width, this.height), this.ctx.save(), this.ctx.translate(0, this.offsetY + this.graphTopOffset), this.ctx.clearRect(0, -10, this.width, this.height), o = this.userBlocks, i = t = 0, n = o.length; n > t; i = ++t)e = o[i], this.ctx.fillStyle = this.bgColors[i % 2], this.ctx.fillRect(0, e.start * this.nameLineHeight - 10, this.width, e.count * this.nameLineHeight), this.ctx.fillStyle = "#DDDDDD", this.ctx.fillRect(0, (e.start + e.count) * this.nameLineHeight - 11, this.width, 1);
            return this.ctx.restore()
        }, t.prototype.drawCommit = function (e) {
            var t = void 0, i = void 0;
            return t = e.time * this.nameLineHeight, i = e.space * this.nameLineHeight, this.ctx.beginPath(), this.ctx.arc(t, i, 3, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(e.space), this.ctx.fill()
        }, t.prototype.drawActiveCommit = function (e) {
            var t = void 0, i = void 0;
            return t = e.time * this.nameLineHeight, i = e.space * this.nameLineHeight, this.ctx.beginPath(), this.ctx.arc(t, i, 6, 0, 2 * Math.PI, !1), this.ctx.fillStyle = this.spaceColor(e.space), this.ctx.fill()
        }, t.prototype.drawCommitInfo = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
            return t = 3, i = 340, l = 56, c = e.message ? this.splitLines(e.message, 48) : [], s = Math.max(l, 38 + 16 * c.length), n = this.offsetX + e.time * this.nameLineHeight, o = this.graphTopOffset + this.offsetY + e.space * this.nameLineHeight, a = 0, u = 0, a = n < this.graphMidpoint ? n + 10 : n - (i + 10), u = o < 40 + (this.height - 40) / 2 ? o + 10 : o - s - 10, this.ctx.save(), this.ctx.translate(a, u), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.2)", this.ctx.lineWidth = 1, this.roundRect(0, 0, i, s, t), r = this.gravatars[e.gravatar], r ? this.drawGravatar(r, 10, 10) : (r = new Image, r.src = e.gravatar, r.onload = function (t) {
                return function () {
                    return t.activeCommit === e ? (t.drawGravatar(r, a + 10, u + 10), t.gravatars[e.gravatar] = r) : void 0
                }
            }(this)), this.ctx.fillStyle = "#000", this.ctx.font = "bold 12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillText(e.author, 55, 24), this.ctx.fillStyle = "#bbb", this.ctx.font = "11px Consolas, Menlo, Courier, monospace", this.ctx.fillText(e.id.slice(0, 7), 280, 24), this.drawMessage(c, 55, 41), this.ctx.restore()
        }, t.prototype.drawGravatar = function (e, t, i) {
            var n = void 0;
            return n = 32, this.ctx.save(), this.ctx.fillStyle = "#fff", this.ctx.strokeStyle = "rgba(0, 0, 0, 0.0)", this.ctx.lineWidth = .1, this.roundRect(t + 2, i + 2, n, n, 4), this.ctx.clip(), this.ctx.drawImage(e, t + 2, i + 2, n, n), this.ctx.restore()
        }, t.prototype.roundRect = function (e, t, i, n, o) {
            return this.ctx.beginPath(), this.ctx.moveTo(e, t + o), this.ctx.lineTo(e, t + n - o), this.ctx.quadraticCurveTo(e, t + n, e + o, t + n), this.ctx.lineTo(e + i - o, t + n), this.ctx.quadraticCurveTo(e + i, t + n, e + i, t + n - o), this.ctx.lineTo(e + i, t + o), this.ctx.quadraticCurveTo(e + i, t, e + i - o, t), this.ctx.lineTo(e + o, t), this.ctx.quadraticCurveTo(e, t, e, t + o), this.ctx.fill(), this.ctx.stroke()
        }, t.prototype.drawMessage = function (e, t, i) {
            var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            for (this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.fillStyle = "#000000", a = [], o = n = 0, r = e.length; r > n; o = ++n)s = e[o], a.push(this.ctx.fillText(s, t, i + 16 * o));
            return a
        }, t.prototype.splitLines = function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            for (a = e.split(" "), r = [], o = "", i = 0, n = a.length; n > i; i++)s = a[i], o.length + 1 + s.length < t ? o = "" === o ? s : o + " " + s : (r.push(o), o = s);
            return r.push(o), r
        }, t.prototype.drawHead = function (e, t, i) {
            var n = void 0, o = void 0, r = void 0, s = void 0;
            return this.ctx.font = "11px 'Helvetica Neue', Arial, sans-serif", this.ctx.save(), n = this.ctx.measureText(t.name).width, this.ctx.restore(), r = e.time * this.nameLineHeight, s = e.space * this.nameLineHeight + 5 + i, o = 2.5, this.ctx.save(), this.ctx.translate(r, s - o), this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)", this.ctx.beginPath(), this.ctx.moveTo(0, o), this.ctx.lineTo(-4, 10), this.ctx.quadraticCurveTo(-9, 10, -9, 15), this.ctx.lineTo(-9, 15 + n), this.ctx.quadraticCurveTo(-9, 15 + n + 5, -4, 15 + n + 5), this.ctx.lineTo(4, 15 + n + 5), this.ctx.quadraticCurveTo(9, 15 + n + 5, 9, 15 + n), this.ctx.lineTo(9, 15), this.ctx.quadraticCurveTo(9, 10, 4, 10), this.ctx.lineTo(0, o), this.ctx.fill(), this.ctx.fillStyle = "#fff", this.ctx.font = "12px 'Helvetica Neue', Arial, sans-serif", this.ctx.textBaseline = "middle", this.ctx.scale(.85, .85), this.ctx.rotate(Math.PI / 2), this.ctx.fillText(t.name, 19, -.5), this.ctx.restore(), n + this.nameLineHeight
        }, t.prototype.drawConnection = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
            for (r = e.parents, s = [], i = t = 0, n = r.length; n > t; i = ++t)o = r[i], 0 === i ? o.space === e.space ? s.push(this.drawBasicConnection(o, e)) : s.push(this.drawBranchConnection(o, e)) : s.push(this.drawMergeConnection(o, e));
            return s
        }, t.prototype.drawBasicConnection = function (e, t) {
            var i = void 0;
            return i = this.spaceColor(t.space), this.ctx.strokeStyle = i, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(e.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.stroke()
        }, t.prototype.drawBranchConnection = function (e, t) {
            var i = void 0;
            return i = this.spaceColor(t.space), this.ctx.strokeStyle = i, this.ctx.lineWidth = 2, this.ctx.beginPath(), this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, t.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight), this.ctx.stroke(), this.threeClockArrow(i, t.time * this.nameLineHeight, t.space * this.nameLineHeight)
        }, t.prototype.drawMergeConnection = function (e, t) {
            var i = void 0, n = void 0, o = void 0;
            return i = this.spaceColor(e.space), this.ctx.strokeStyle = i, this.ctx.lineWidth = 2, this.ctx.beginPath(), e.space > t.space ? (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), o = this.safePath(e.time, t.time, e.space), o ? (this.ctx.lineTo(t.time * this.nameLineHeight - 10, e.space * this.nameLineHeight), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight + 15), this.ctx.lineTo(t.time * this.nameLineHeight - 5.7, t.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(i, t.time * this.nameLineHeight, t.space * this.nameLineHeight)) : (n = this.closestMargin(e.time, t.time, e.space, -1), e.space === t.space + 1 && e.space === n + 1 ? (this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.5, n * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(i, t.time * this.nameLineHeight, n * this.nameLineHeight), this.addMargin(e.time, t.time, n)) : e.time + 1 === t.time ? (n = this.closestMargin(e.time, t.time, t.space, 0), this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 15, t.space * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.5, t.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(i, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)) : (this.ctx.lineTo(e.time * this.nameLineHeight + 10, e.space * this.nameLineHeight - 10), this.ctx.lineTo(e.time * this.nameLineHeight + 10, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 10, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 10, t.space * this.nameLineHeight + 15), this.ctx.lineTo(t.time * this.nameLineHeight - 5.7, t.space * this.nameLineHeight + 7.5), this.ctx.stroke(), this.oneClockArrow(i, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)))) : (n = this.closestMargin(e.time, t.time, t.space, -1), n < t.space ? (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, t.space * this.nameLineHeight - 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.4, t.space * this.nameLineHeight - 7.7), this.ctx.stroke(), this.fourClockArrow(i, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)) : (this.ctx.moveTo(e.time * this.nameLineHeight, e.space * this.nameLineHeight), this.ctx.lineTo(e.time * this.nameLineHeight, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, n * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 12.7, t.space * this.nameLineHeight + 10), this.ctx.lineTo(t.time * this.nameLineHeight - 9.4, t.space * this.nameLineHeight + 7.7), this.ctx.stroke(), this.twoClockArrow(i, t.time * this.nameLineHeight, t.space * this.nameLineHeight), this.addMargin(e.time, t.time, n)))
        }, t.prototype.addMargin = function (e, t, i) {
            return this.marginMap[i] || (this.marginMap[i] = []), this.marginMap[i].push([e, t])
        }, t.prototype.oneClockArrow = function (e, t, i) {
            return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 3, i + 10.5), this.ctx.lineTo(t - 9, i + 5.5), this.ctx.lineTo(t - 2.6, i + 3.5), this.ctx.fill()
        }, t.prototype.twoClockArrow = function (e, t, i) {
            return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 12.4, i + 6.6), this.ctx.lineTo(t - 9.3, i + 10.6), this.ctx.lineTo(t - 3.2, i + 2.4), this.ctx.fill()
        }, t.prototype.threeClockArrow = function (e, t, i) {
            return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 10, i - 3.5), this.ctx.lineTo(t - 10, i + 3.5), this.ctx.lineTo(t - 4, i), this.ctx.fill()
        }, t.prototype.fourClockArrow = function (e, t, i) {
            return this.ctx.fillStyle = e, this.ctx.beginPath(), this.ctx.moveTo(t - 12.4, i - 6.6), this.ctx.lineTo(t - 9.3, i - 10.6), this.ctx.lineTo(t - 3.2, i - 2.4), this.ctx.fill()
        }, t.prototype.safePath = function (e, t, i) {
            var n = void 0, o = void 0, r = void 0, s = void 0;
            for (s = this.spaceMap[i], n = 0, o = s.length; o > n; n++)if (r = s[n], this.timeInPath(e, r))return r[1] === t;
            return !1
        }, t.prototype.closestMargin = function (e, t, i, n) {
            var o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
            for (a = this.spaceMap.length, s = n, r = !1, o = !1, u = !1; !o || !r;) {
                if (i + s >= 0 && this.safeMargin(e, t, i + s))return i + s;
                0 > i + s && (r = !0), i + s > a && (o = !0), u === !1 && 0 === s ? (s = -1, u = !0) : s = 0 > s ? -s - 1 : -s - 2
            }
            return i > 0 ? i - 1 : 0
        }, t.prototype.safeMargin = function (e, t, i) {
            var n = void 0, o = void 0, r = void 0, s = void 0;
            if (!this.marginMap[i])return !0;
            for (s = this.marginMap[i], n = 0, o = s.length; o > n; n++)if (r = s[n], this.pathsCollide([e, t], r))return !1;
            return !0
        }, t.prototype.pathsCollide = function (e, t) {
            return this.timeWithinPath(e[0], t) || this.timeWithinPath(e[1], t) || this.timeWithinPath(t[0], e) || this.timeWithinPath(t[1], e)
        }, t.prototype.timeInPath = function (e, t) {
            return e >= t[0] && e <= t[1]
        }, t.prototype.timeWithinPath = function (e, t) {
            return e > t[0] && e < t[1]
        }, t.prototype.spaceColor = function (e) {
            return 0 === e ? "#000000" : this.spaceColors[e % this.spaceColors.length]
        }, t
    }(), r = function () {
        function t(t, i, n) {
            this.chrome = i, this.graph = n, this.out = f(this.out, this), this.move = f(this.move, this), this.docmove = f(this.docmove, this), this.down = f(this.down, this), this.up = f(this.up, this), this.dragging = !1, this.lastPoint = {
                x: 0,
                y: 0
            }, this.lastHoverCommit = null, this.lastHoverUser = null, this.pressedCommit = null, this.pressedUser = null, this.canvas = t.getElementsByTagName("canvas")[0], this.canvasOffset = e(this.canvas).offset(), this.canvas.style.cursor = "move", document.body.addEventListener("mouseup", this.up), document.body.addEventListener("mousemove", this.docmove), this.canvas.addEventListener("mousedown", this.down), this.canvas.addEventListener("mousemove", this.move), this.canvas.addEventListener("mouseout", this.out)
        }

        return t.prototype.up = function () {
            return this.dragging = !1, this.pressedCommit && this.graph.activeCommit === this.pressedCommit ? window.open("/" + this.graph.activeCommit.user.name + "/" + this.graph.activeCommit.user.repo + "/commit/" + this.graph.activeCommit.id) : this.pressedUser && this.chrome.activeUser === this.pressedUser && (window.location = "/" + this.chrome.activeUser.name + "/" + this.chrome.activeUser.repo + "/network"), this.pressedCommit = null, this.pressedUser = null
        }, t.prototype.down = function () {
            return this.graph.activeCommit ? this.pressedCommit = this.graph.activeCommit : this.chrome.activeUser ? this.pressedUser = this.chrome.activeUser : this.dragging = !0
        }, t.prototype.docmove = function (e) {
            var t = void 0, i = void 0;
            return t = e.pageX, i = e.pageY, this.dragging && (this.graph.moveX(t - this.lastPoint.x), this.graph.moveY(i - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(t - this.lastPoint.x), this.chrome.moveY(i - this.lastPoint.y), this.chrome.draw()), this.lastPoint.x = t, this.lastPoint.y = i
        }, t.prototype.move = function (e) {
            var t = void 0, i = void 0, n = void 0, o = void 0;
            return n = e.pageX, o = e.pageY, this.dragging ? (this.graph.moveX(n - this.lastPoint.x), this.graph.moveY(o - this.lastPoint.y), this.graph.draw(), this.chrome.moveX(n - this.lastPoint.x), this.chrome.moveY(o - this.lastPoint.y), this.chrome.draw()) : (i = this.chrome.hover(n - this.canvasOffset.left, o - this.canvasOffset.top), i !== this.lastHoverUser ? (this.canvas.style.cursor = i ? "pointer" : "move", this.chrome.activeUser = i, this.chrome.draw(), this.lastHoverUser = i) : (t = this.graph.hover(n - this.canvasOffset.left, o - this.canvasOffset.top), t !== this.lastHoverCommit && (this.canvas.style.cursor = t ? "pointer" : "move", this.graph.activeCommit = t, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = t))), this.lastPoint.x = n, this.lastPoint.y = o
        }, t.prototype.out = function () {
            return this.graph.activeCommit = null, this.chrome.activeUser = null, this.graph.draw(), this.chrome.draw(), this.lastHoverCommit = null, this.lastHoverUser = null
        }, t
    }(), o = function () {
        function t(e, t) {
            this.chrome = e, this.graph = t, this.down = f(this.down, this), this.dirty = !1, document.addEventListener("keydown", this.down)
        }

        return t.prototype.moveBothX = function (e) {
            return this.graph.moveX(e), this.chrome.moveX(e), this.graph.activeCommit = null, this.dirty = !0
        }, t.prototype.moveBothY = function (e) {
            return this.graph.moveY(e), this.chrome.moveY(e), this.graph.activeCommit = null, this.dirty = !0
        }, t.prototype.toggleRefs = function () {
            return this.graph.toggleRefs(), this.dirty = !0
        }, t.prototype.redraw = function () {
            return this.dirty && (this.graph.draw(), this.chrome.draw()), this.dirty = !1
        }, t.prototype.down = function (t) {
            if (e(t.target).is("input"))return !0;
            if (t.shiftKey)switch (t.which) {
                case 37:
                case 72:
                    return this.moveBothX(999999), this.redraw();
                case 38:
                case 75:
                    return this.moveBothY(999999), this.redraw();
                case 39:
                case 76:
                    return this.moveBothX(-999999), this.redraw();
                case 40:
                case 74:
                    return this.moveBothY(-999999), this.redraw()
            } else switch (t.which) {
                case 37:
                case 72:
                    return this.moveBothX(100), this.redraw();
                case 38:
                case 75:
                    return this.moveBothY(30), this.redraw();
                case 39:
                case 76:
                    return this.moveBothX(-100), this.redraw();
                case 40:
                case 74:
                    return this.moveBothY(-30), this.redraw();
                case 84:
                    return this.toggleRefs(), this.redraw()
            }
        }, t
    }(), h = !1, i(".js-network-graph-container", {
        add: function () {
            return h = !0, new s(this, 980, 600)
        }, remove: function () {
            return h = !1
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0;
    n = function () {
        var t = void 0, i = void 0;
        i = e(this), t = i.find(":selected"), t.attr("data-already-member") ? (e(".js-account-membership-form").addClass("is-member"), e(".js-account-membership-form").removeClass("is-not-member")) : (e(".js-account-membership-form").removeClass("is-member"), e(".js-account-membership-form").addClass("is-not-member"))
    }, i(".js-account-membership", n), e(document).on("change", ".js-account-membership", n)
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
    n = require("github/fetch").fetchPoll,
        c = null, a = 300, u = [".", ".", "."], s = 0, i = function () {
        return e(".js-audit-log-export-button").removeClass("disabled")
    }, t = function () {
        return e(".js-audit-log-export-button").addClass("disabled")
    }, r = function () {
        var i = void 0, n = void 0;
        return i = e(".js-audit-log-export-status"), i.data("oldText", i.text()), n = function () {
            var e = void 0;
            return e = u.slice(0, s).join(""), i.text("Exporting" + e), s >= 3 ? s = 0 : s += 1
        }, c = setInterval(n, a), t()
    }, l = function () {
        var t = void 0;
        return i(), t = e(".js-audit-log-export-status"), t.text(t.data("oldText")), clearInterval(c), s = 0
    }, o = function () {
        return l(), e("#ajax-error-message").show(function () {
            return this.classList.add("visible")
        })
    }, e(document).on("ajaxSend", ".js-audit-log-export", r), e(document).on("ajaxError", ".js-audit-log-export", o), e(document).on("ajaxSuccess", ".js-audit-log-export", function (e, t, i, r) {
        var s = void 0;
        return s = function () {
            return l(), window.location = r.export_url
        }, n(r.job_url).then(s, o)
    }), e(document).on("navigation:open", ".audit-search-form .js-suggester", function () {
        return e(this).closest("form").submit()
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0, o = void 0;
    e(document).on("submit", ".js-find-coupon-form", function (t) {
        var i = void 0, n = void 0;
        return i = t.target.action, n = e("#code").val(), window.location = i + "/" + encodeURIComponent(n), t.stopPropagation(), t.preventDefault()
    }), e(document).on("click", ".js-choose-account", function (t) {
        return e(".js-plan-row, .js-choose-plan").removeClass("selected"), e(".js-plan").val(""), e(".js-billing-section").addClass("has-removed-contents"), n(e(this).closest(".js-account-row")), t.stopPropagation(), t.preventDefault()
    }), e(document).on("click", ".js-choose-plan", function (t) {
        return o(e(this).closest(".js-plan-row")), t.stopPropagation(), t.preventDefault()
    }), i(".js-choose-plan-radio:checked", {
        add: function () {
            o(e(this).closest(".js-plan-row"))
        }
    }), i(".js-plan-row.selected", {
        add: function () {
            return e(this).closest("form").find(".js-redeem-button").prop("disabled", e(this).hasClass("free-plan"))
        }
    }), n = function (t) {
        var i = void 0, n = void 0, r = void 0, s = void 0;
        if (t.length)return r = t.attr("data-login"), s = t.attr("data-plan"), e(".js-account-row, .js-choose-account").removeClass("selected"), t.addClass("selected"), t.find(".js-choose-account").addClass("selected"), e(".js-account").val(r), e(".js-plan-section").removeClass("d-none"), e(".js-billing-plans").addClass("d-none"), n = e(".js-plans-for-" + r), n.removeClass("d-none"), i = e(".js-plan-row", n), o(1 === i.length ? i : e("[data-name='" + s + "']", n))
    }, o = function (t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
        if (t.length)return r = t.attr("data-name"), n = parseInt(t.attr("data-cost"), 10), s = t.closest(".js-billing-plans"), o = "true" === s.attr("data-has-billing"), i = s.attr("data-login"), e(".js-plan-row, .js-choose-plan").removeClass("selected"), t.addClass("selected"), t.find(".js-choose-plan").addClass("selected"), t.find(".js-choose-plan-radio").prop("checked", !0), e(".js-plan").val(r), 0 === n || o ? e(".js-billing-section").addClass("has-removed-contents") : e(".js-billing-section[data-login='" + i + "']").removeClass("has-removed-contents")
    }, e(function () {
        return n(e(".js-account-row.selected")), o(e(".js-plan-row.selected"))
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/html-validation"), i = t.revalidate;
    e(document).on("change", ".js-survey-select", function () {
        var t = void 0, i = void 0, n = void 0, o = void 0;
        return n = e(this)[0], i = e(this).closest(".js-survey-question-form"), t = i.find(".js-survey-other-text"), o = n.options[n.selectedIndex], o.classList.contains("js-survey-option-other") ? (i.addClass("is-other-selected"), t.attr("required", "required"), t.focus()) : (t.removeAttr("required"), i.removeClass("is-other-selected"))
    }), e(document).on("change", ".js-survey-radio", function () {
        var t = void 0, n = void 0, o = void 0;
        t = e(this)[0], o = e(this).closest(".js-survey-question-form"), n = o.find(".js-survey-other-text"), t.classList.contains("js-survey-radio-other") ? (o.addClass("is-other-selected"), n.attr("required", "required"), n.focus()) : (n.removeAttr("required"), o.removeClass("is-other-selected")), i(this)
    })
}.call(this), define("github/blob-anchor", ["exports"], function (e) {
    function t(e) {
        var t = e.match(/\#?(?:L)(\d+)/g);
        return t ? t.map(function (e) {
            return parseInt(e.replace(/\D/g, ""))
        }) : []
    }

    function i(e) {
        var t = e.match(/(file-.+?-)L\d+?/i);
        return t ? t[1] : ""
    }

    function n(e) {
        var n = t(e), o = i(e);
        return {lineRange: n, anchorPrefix: o}
    }

    function o(e) {
        var t = e.lineRange, i = e.anchorPrefix;
        switch (t.sort(r), t.length) {
            case 1:
                return "#" + i + "L" + t[0];
            case 2:
                return "#" + i + "L" + t[0] + "-L" + t[1];
            default:
                return "#"
        }
    }

    function r(e, t) {
        return e - t
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.parseLineRange = t, e.parseAnchorPrefix = i, e.parseFileAnchor = n, e.formatLineRange = o
}), function () {
    var e = require("github/jquery")["default"], t = require("delegated-events"), i = t.fire, n = require("github/blob-anchor"), o = n.parseLineRange, r = n.parseFileAnchor, s = n.formatLineRange, a = require("github/hash-change")["default"], u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
    d = !1, u = function (t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
        if (r = t.lineRange, i = t.anchorPrefix, o = e(".js-file-line"), o.length) {
            if (o.css("background-color", ""), 1 === r.length)return e("#" + i + "LC" + r[0]).css("background-color", "#f8eec7");
            if (r.length > 1) {
                for (n = r[0], s = []; n <= r[1];)e("#" + i + "LC" + n).css("background-color", "#f8eec7"), s.push(n++);
                return s
            }
        }
    }, l = function (t) {
        var i = void 0, n = void 0, o = void 0;
        return null == t && (t = r(window.location.hash)), o = t.lineRange, i = t.anchorPrefix, u(t), !d && (n = e("#" + i + "LC" + o[0])).length && e(window).scrollTop(n.offset().top - .33 * e(window).height()), d = !1
    }, h = function (e, t) {
        var i = void 0, n = void 0, o = void 0;
        return o = "FORM" === e.nodeName ? "action" : "href", i = e.getAttribute(o), (n = i.indexOf("#")) >= 0 && (i = i.substr(0, n)), i += t, e.setAttribute(o, i)
    }, a(function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        if (document.querySelector(".js-file-line-container")) {
            for (setTimeout(l, 0), t = window.location.hash, o = document.querySelectorAll(".js-update-url-with-hash"), r = [], i = 0, n = o.length; n > i; i++)e = o[i], r.push(h(e, t));
            return r
        }
    }), c = function (t) {
        var i = void 0, n = void 0;
        return d = !0, n = null != (i = e(window).scrollTop()) ? i : 0, t(), e(window).scrollTop(n)
    }, e(document).on("mousedown", ".js-line-number", function (e) {
        var t = void 0, i = void 0;
        return t = r(this.id), e.shiftKey && (i = o(window.location.hash), t.lineRange.unshift(i[0])), c(function () {
            return window.location.hash = s(t)
        }), !1
    }), e(document).on("submit", ".js-jump-to-line-form", function () {
        var e = this.querySelector(".js-jump-to-line-field"), t = e.value.replace(/[^\d\-]/g, "");
        return t && (window.location.hash = "L" + t), i(document, "facebox:close"), !1
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/focused"), n = i.onFocusedKeydown, o = require("github/focused"), r = o.onFocusedInput, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0, w = void 0, x = void 0, q = void 0, k = void 0, S = void 0, L = void 0;
    l = require("github/fetch").fetchText, b = require("github/observe").observe, v = function (e) {
        var t = void 0, i = void 0, n = void 0;
        return i = e[0], t = i.querySelector(".js-blob-filename"), t ? "." === (n = t.value) || ".." === n || ".git" === n ? !1 : /\S/.test(t.value) : !0
    }, s = function (e) {
        var t = void 0;
        return t = e.querySelector(".js-blob-contents"), t ? "true" === t.getAttribute("data-allow-unchanged") ? !0 : d(t) : !0
    }, g = function (e) {
        var t = void 0;
        return t = e.querySelector(".js-new-filename-field"), d(t)
    }, a = function (i) {
        var n = void 0;
        return i = e(".js-blob-form"), n = i[0], Array.from(i.find(".js-check-for-fork")).some(t) ? !1 : v(i) ? s(n) || g(n) : !1
    }, q = function (t) {
        var i = void 0;
        return i = t.find(".js-blob-contents")[0], i ? e(i).attr("data-allow-unchanged") ? !0 : d(i) : !1
    }, m = function (e) {
        var t = void 0, i = void 0;
        return i = e[0], t = i.querySelector(".js-blob-contents"), d(t) || g(i)
    }, u = null, c = function (t) {
        var i = void 0;
        return i = e(t).attr("data-github-confirm-unload"), ("yes" === i || "true" === i) && (i = ""), null == i && (i = "false"), "no" === i || "false" === i ? null : function () {
            return i
        }
    }, y = function () {
        var t = void 0;
        return t = e(".js-blob-form"), t[0] ? (t.find(".js-blob-submit").prop("disabled", !a(t)), t.find(".js-blob-contents-changed").val(q(t)), u ? m(t) ? window.onbeforeunload = u : window.onbeforeunload = null : void 0) : void 0
    }, j = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        for (o = e.querySelectorAll("input"), r = [], i = 0, n = o.length; n > i; i++)t = o[i], "hidden" === t.getAttribute("type") && t.getAttribute("class") && (null == t.getAttribute("data-default-value") ? r.push(t.setAttribute("data-default-value", t.value)) : r.push(void 0));
        return r
    }, d = function (e) {
        return null == e ? !0 : "hidden" === e.type ? e.value !== e.getAttribute("data-default-value") : e.value !== e.defaultValue
    }, w = function (t) {
        var i = void 0, n = void 0, o = void 0;
        return i = t.querySelector(".js-blob-contents"), o = t.querySelector(".js-new-filename-field"), n = t.querySelector(".js-blob-filename"), i && o && n && null != n.defaultValue && n.defaultValue.length ? e(i).data("old-filename", o.value) : void 0
    }, b(".js-blob-form", function () {
        j(this), w(this), y(), u = c(this), e(this).on("submit", function () {
            return window.onbeforeunload = null
        })
    }), e(document).on("change", ".js-blob-contents", function () {
        return x(e(".js-blob-filename")), y()
    }), r(document, ".js-blob-filename", function () {
        return function () {
            return e(".js-blob-contents").attr("data-filename", e(this).val()), p(e(this).val()), x(e(this))
        }
    }), r(document, ".js-breadcrumb-nav", function () {
        return function () {
            return L(e(this)), x(e(this))
        }
    }), n(document, ".js-breadcrumb-nav", function () {
        return function (t) {
            return 8 === t.keyCode && 0 === this.selectionStart && 0 === this.selectionEnd && 1 !== e(this).parent().children(".separator").length && (f(e(this), !0), t.preventDefault()), x(e(this))
        }
    }), x = function (e) {
        return null != e[0] && (S(e), k(e)), y()
    }, L = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
        for (n = []; e.val().split("/").length > 1;)t = e.val(), o = t.split("/"), i = o[0], s = o.slice(1).join("/"), "" === i || "." === i || ".git" === i ? (e.val(s), r = function () {
            e[0].focus(), e[0].setSelectionRange(0, 0)
        }, n.push(window.setTimeout(r, 1))) : ".." === i ? n.push(f(e)) : n.push(h(e, i, s));
        return n
    }, p = function (t) {
        var i = void 0, n = void 0;
        return i = e(".js-gitignore-template"), n = e(".js-license-template"), /^(.+\/)?\.gitignore$/.test(t) ? i.addClass("is-visible") : /^(.+\/)?(licen[sc]e|copying)($|\.)/i.test(t) ? n.addClass("is-visible") : (i.removeClass("is-visible"), n.removeClass("is-visible"))
    }, k = function (t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, h = void 0, f = void 0, v = void 0;
        return o = t.closest("form"), n = e(".js-blob-contents"), i = o.find(".js-new-blob-commit-summary"), u = t.val() ? "Create " + t.val() : "Create new file", f = n.data("old-filename"), c = e(".js-new-filename-field").val(), n.removeData("new-filename"), u = (null != f ? f.length : void 0) && c !== f && null != t[0] ? (n.data("new-filename", !0), s = d(n[0]), r = s ? "Update and rename" : "Rename", t.val().length && c.length ? (v = f.split("/"), l = c.split("/"), h = !0, a = v.length - 1, v.forEach(function (e, t) {
            return t !== a && e !== l[t] ? h = !1 : void 0
        }), v.length === l.length && h ? r + " " + v[a] + " to " + l[a] : r + " " + f + " to " + c) : r + " " + f) : (null != f ? f.length : void 0) && c === f ? "Update " + t.val() : u, i.attr("placeholder", u), e(".js-commit-message-fallback").val(u)
    }, S = function (t) {
        var i = void 0, n = void 0;
        return i = e(".breadcrumb").children(".js-path-segment"), n = "", i.each(function () {
            var t = void 0;
            return t = e(this), n = n + t.text() + "/"
        }), n += t.val(), e(".js-new-filename-field").val(n)
    }, f = function (e, t) {
        var i = void 0, n = void 0;
        return null == t && (t = !1), t || e.val(e.val().replace("../", "")), n = function () {
            e[0].focus(), e[0].setSelectionRange(0, 0)
        }, 1 !== e.parent().children(".separator").length && (e.prev().remove(), i = e.prev().children().children().html(), e.prev().remove(), t && (e.val("" + i + e.val()), n = function () {
            t && (e[0].focus(), e[0].setSelectionRange(i.length, i.length))
        })), p(e.val()), window.setTimeout(n, 1)
    }, h = function (t, i, n) {
        var o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        return null == n && (n = ""), i = i.replace(/[^-.a-z_0-9]+/gi, "-"), i = i.replace(/^-+|-+$/g, ""), i.length > 0 && (l = t.parent().children(".js-repo-root, [itemtype]").children("a").last().attr("href"), l || (o = t.parent().children(".js-repo-root, [itemtype]").children("span").children("a").last(), r = o.attr("data-branch"), u = o.attr("href"), l = u + "/tree/" + r), s = e(".js-crumb-template").clone().removeClass("js-crumb-template"), s.find("a[itemscope]").attr("href", l + "/" + i), s.find("span").text(i), a = e(".js-crumb-separator").clone().removeClass("js-crumb-separator"), t.before(s, a)), t.val(n), p(t.val()), c = function () {
            t[0].focus(), t[0].setSelectionRange(0, 0)
        }, window.setTimeout(c, 1)
    }, r(document, ".js-new-blob-commit-summary", function () {
        var t = void 0;
        return t = e(this).closest(".js-file-commit-form"), function () {
            return t.toggleClass("is-too-long-error", e(this).val().length > 50)
        }
    }), b(".js-check-for-fork", function () {
        this.addEventListener("load", function () {
            return y()
        })
    }), e(document).on("change", ".js-gitignore-template input[type=radio]", function () {
        var t = void 0;
        return t = e(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"), l(this.getAttribute("data-template-url")).then(function (e) {
            return t.setCode(e)
        })
    }), e(document).on("change", ".js-license-template input[type=radio]", function () {
        var t = void 0, i = void 0;
        return t = e(this).closest(".js-blob-form").find(".js-code-editor").data("code-editor"), i = e(this).attr("data-template-contents"), t.setCode(i)
    }), n(document, ".js-new-blob-commit-description", function () {
        return function (t) {
            return "ctrl+enter" === t.hotkey || "meta+enter" === t.hotkey ? (e(this).closest("form").submit(), !1) : void 0
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0;
    t = function (t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
        for (t = t.toLowerCase(), i = e(".js-csv-data tbody tr"), r = [], n = 0, o = i.length; o > n; n++)s = i[n], a = e(s).text().toLowerCase(), -1 === a.indexOf(t) ? r.push(e(s).hide()) : r.push(e(s).show());
        return r
    }, i = function (e) {
        var i = void 0;
        i = e.target.value, null != i && t(i), e.preventDefault()
    }, e(document).on("focus", ".js-csv-filter-field", function () {
        return e(this).on("keyup", i)
    }), e(document).on("blur", ".js-csv-filter-field", function () {
        return e(this).off("keyup", i)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/throttled-input"), i = t.addThrottledInputEventListener, n = void 0, o = void 0, r = void 0;
    r = require("github/history").replaceState, o = require("github/observe").observe, n = null, o(".js-branch-search-field", function () {
        var t = void 0, o = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0;
        o = e(this), s = o.closest(".js-branch-search"), t = s.closest(".js-branches"), a = t.find(".js-branches-subnav .js-subnav-item"), p = s.prop("action"), m = s.attr("data-reset-url"), g = s.attr("data-results-container"), h = /\S/, l = function () {
            return h.test(o.val())
        }, f = function (t, i) {
            var n = void 0;
            return r(null, "", i), n = document.getElementById(g), e(n).html(t)
        }, c = null, u = function (t) {
            return c && c.readyState < 4 && c.abort(), c = e.ajax(t)
        }, d = function () {
            var e = void 0, i = void 0;
            return null === n && (n = a.filter(".selected")), e = l(), i = e ? p + "?" + s.serialize() : m, u({
                url: i,
                context: s
            }).always(function () {
                return t.removeClass("is-loading")
            }).done(function (e) {
                return f(e, i)
            }), t.toggleClass("is-search-mode", e), t.addClass("is-loading"), a.removeClass("selected"), e ? a.filter(".js-branches-all").addClass("selected") : (n.addClass("selected"), n = null)
        }, v = function () {
            var e = void 0;
            return e = l(), o.val(""), e ? d() : void 0
        }, i(o[0], d), o.on("keyup", function (e) {
            return "esc" === e.hotkey ? (v(), this.blur()) : void 0
        })
    }), e(document).on("submit", ".js-branch-search", !1), e(document).on("click", ".js-clear-branch-search", function (t) {
        var i = void 0;
        if (1 === t.which)return i = e(this).closest(".js-branch-search").find(".js-branch-search-field"), i.focus().val("").trigger("input"), t.preventDefault()
    }), e(document).on("ajaxSend", ".js-branch-destroy, .js-branch-restore", function (t, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
        return o = e(this), a = o.is(".js-branch-destroy"), s = o.closest(".js-branch-row").attr("data-branch-name"), n = o.closest(".js-branches").find(".js-branch-row").filter(function () {
            return this.getAttribute("data-branch-name") === s
        }), r = o.find("button[type=submit]"), r.blur().removeClass("tooltipped"), n.addClass("loading"), i.done(function () {
            return n.toggleClass("is-deleted", a)
        }).always(function () {
            return n.removeClass("loading"), r.addClass("tooltipped")
        })
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/focused"), i = t.onFocusedInput, n = void 0, o = void 0;
    n = function () {
        var t = void 0, i = void 0, n = void 0, r = void 0, s = void 0, a = void 0;
        return s = [], i = e(".js-advanced-search-input").val(), a = {
            Repositories: 0,
            Users: 0,
            Code: 0
        }, t = e("input[type=text].js-advanced-search-prefix, select.js-advanced-search-prefix"), s = o(t, function (e, t, i) {
            return "" === e ? "" : ("" !== t && a[i]++, "" !== t ? "" + e + t : void 0)
        }), e.merge(s, o(e("input[type=checkbox].js-advanced-search-prefix"), function (t, i, n) {
            var o = void 0;
            return o = e(this).prop("checked"), o !== !1 && a[n]++, o !== !1 ? "" + t + o : void 0
        })), n = function (e) {
            return e.Users > e.Code && e.Users > e.Repositories ? "Users" : e.Code > e.Users && e.Code > e.Repositories ? "Code" : "Repositories"
        }, r = e.trim(s.join(" ")), e(".js-type-value").val(n(a)), e(".js-search-query").val(e.trim(i + " " + r)), e(".js-advanced-query").empty(), e(".js-advanced-query").text("" + r), e(".js-advanced-query").prepend(e("<span>").text(e.trim(i)), " ")
    }, o = function (t, i) {
        return e.map(t, function (t) {
            var n = void 0, o = void 0, r = void 0, s = void 0;
            return r = e.trim(e(t).val()), n = e(t).attr("data-search-prefix"), o = e(t).attr("data-search-type"), s = function (e) {
                return -1 !== e.search(/\s/g) ? '"' + e + '"' : e
            }, "" === n ? i.call(t, n, r, o) : -1 !== r.search(/\,/g) && "location" !== n ? r.split(/\,/).map(function (r) {
                return i.call(t, n, s(e.trim(r)), o)
            }) : i.call(t, n, s(r), o)
        })
    }, i(document, ".js-advanced-search-prefix", function () {
        return function () {
            return n()
        }
    }), e(document).on("change", ".js-advanced-search-prefix", n), e(document).on("focusin", ".js-advanced-search-input", function () {
        return e(this).closest(".js-advanced-search-label").addClass("focus")
    }), e(document).on("focusout", ".js-advanced-search-input", function () {
        return e(this).closest(".js-advanced-search-label").removeClass("focus")
    }), e(document).on("click", ".js-see-all-search-cheatsheet", function () {
        return e(".js-more-cheatsheet-info").removeClass("d-none"), !1
    }), e(function () {
        return e(".js-advanced-search-input").length ? n() : void 0
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("navigation:keyopen", ".commits-list-item", function () {
        return e(this).find(".commit-title > a").first().click(), !1
    }), e(document).on("navigation:keydown", ".commits-list-item", function (t) {
        return "c" === t.hotkey ? (e(this).find(".commit-title > a").first().click(), !1) : void 0
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/hash-change")["default"], i = require("github/visible")["default"], n = void 0, o = void 0;
    n = require("delegated-events"), o = require("github/observe").observe, e(document).on("click", ".js-compare-tabs a", function () {
        return e(this).closest(".js-compare-tabs").find("a").removeClass("selected"), e(this).addClass("selected"), e("#commits_bucket, #files_bucket, #commit_comments_bucket").hide(), e(this.hash).show(), !1
    }), t(function () {
        return e(this).closest("#files_bucket")[0] && !i(this) ? e('a.tabnav-tab[href="#files_bucket"]').click() : void 0
    }), e(document).on("click", ".js-toggle-range-editor-cross-repo", function () {
        return e(".js-range-editor").toggleClass("is-cross-repo"), !1
    }), n.on("pjax:click", ".js-range-editor", function (t) {
        var i = void 0;
        i = t.detail.options, e(".js-compare-pr").hasClass("open") && !i.url.match(/expand=1/) && (null == i.data && (i.data = {}), i.data.expand = "1")
    }), e(document).on("navigation:open", "form.js-commitish-form", function () {
        var t = void 0, i = void 0, n = void 0;
        return i = e(this), n = i.find(".js-new-item-name").text(), t = e("<input>", {
            type: "hidden",
            name: "new_compare_ref",
            value: n
        }), i.append(t), i.submit()
    }), o(".js-compare-pr.open", {
        add: function () {
            return document.body.classList.add("is-pr-composer-expanded")
        }, remove: function () {
            return document.body.classList.remove("is-pr-composer-expanded")
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/hash-change")["default"], i = require("github/preserve-position"), n = i.preservingScrollPosition, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
    r = require("github/fetch").fetchText, c = require("github/dimensions").overflowOffset, s = require("github/fragment-target").findElementByFragmentName, t(function () {
        var t = void 0, i = void 0, n = void 0, r = void 0, l = void 0, d = void 0, h = void 0, f = void 0;
        return n = window.location.hash, n && (l = u(n)) && (t = l[1], f = l[2], r = l[3], !s(document, n.slice(1))) ? (h = 0, d = 1, (i = function () {
            var u = void 0, l = void 0;
            if ((l = e(s(document, t)).next()[0]) && (u = a(l, f, r)))return e(u).parents(".js-details-container").addClass("open"), o(u).then(function () {
                var e = void 0, t = void 0, o = void 0, r = s(document, n.slice(1));
                if (r) {
                    if (t = c(r), o = t.top, e = t.bottom, 0 > o || 0 > e)return r.scrollIntoView()
                } else if (d > h)return h++, i()
            })
        })()) : void 0
    }), e(document).on("click", ".js-expand", function () {
        return o(this), !1
    }), o = function (t) {
        var i = void 0;
        return i = t.getAttribute("data-url"), i += "&anchor=" + encodeURIComponent(t.hash.slice(1)), i = i.replace(/[?&]/, "?"), new Promise(function (o, s) {
            return r(i).then(function (i) {
                var r = void 0, s = void 0;
                return r = e(t).closest(".js-expandable-line"), s = r.next(".file-diff-line"), n(s[0], function () {
                    r.replaceWith(i)
                }), o()
            }, s)
        })
    }, u = function (e) {
        var t = void 0, i = void 0;
        return t = e.match(/\#(diff\-[a-f0-9]+)([L|R])(\d+)$/i), null != t && 4 === t.length ? t : (i = e.match(/\#(discussion\-diff\-[0-9]+)([L|R])(\d+)$/i), null != i && 4 === i.length ? i : null)
    }, a = function (t, i, n) {
        var o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        for (n = parseInt(n, 10), c = e(t).find(".js-expand"), a = 0, u = c.length; u > a; a++)if (r = c[a], o = "R" === i ? "data-right-range" : "data-left-range", l = r.getAttribute(o).split("-"), d = l[0], s = l[1], parseInt(d, 10) <= n && n <= parseInt(s, 10))return r;
        return null
    }
}.call(this), function () {
    function e(e) {
        var t = e.closest("tr");
        return l(t).next(".js-inline-comments-container")[0]
    }

    function t(e) {
        var t = e.closest("tr"), i = s("#js-inline-comments-single-container-template"), n = i.querySelector(".js-inline-comment-form");
        return n && c(n, {
            path: e.getAttribute("data-path"),
            anchor: e.getAttribute("data-anchor"),
            position: e.getAttribute("data-position"),
            line: e.getAttribute("data-line")
        }), t.after(i), i
    }

    function i(e) {
        var t = e.querySelector(".js-inline-comment-form-container");
        t.classList.add("open"), t.querySelector(".js-write-tab").click(), t.querySelector(".js-comment-field").focus()
    }

    function n(e) {
        e.reset(), l(e).closest(".js-inline-comment-form-container").removeClass("open"), r()
    }

    function o(e) {
        return l(e).find(".js-toggle-file-notes").prop("checked", !0).trigger("change")
    }

    function r() {
        for (var e = document.querySelectorAll(".file .js-inline-comments-container"), t = 0; t < e.length; t++) {
            var i = e[t], n = l(i).find(".js-comments-holder > *"), o = n.length > 0, r = l(i).find(".js-inline-comment-form-container").hasClass("open");
            o || r || l(i).remove()
        }
    }

    function s(e) {
        var t = document.querySelector(e), i = t.firstElementChild.cloneNode(!0);
        return i.querySelector("textarea").value = "", i
    }

    function a(e, t, i) {
        var n = l(e).find(".js-line-comments." + t)[0];
        if (n)return n;
        n = s("#js-inline-comments-split-form-container-template"), n.classList.add(t);
        var o = n.querySelector(".js-inline-comment-form");
        o && c(o, i);
        var r = l(e).find("." + t);
        return r.last().after(n), r.remove(), n
    }

    function u(e) {
        var t = l(e).next(".js-inline-comments-container")[0];
        return t ? t : (t = l("#js-inline-comments-split-container-template").clone().children()[0], l(e).after(t), t)
    }

    function c(e, t) {
        for (var i = e.elements, n = 0; n < i.length; n++) {
            var o = i[n];
            o.name in t && (o.value = t[o.name])
        }
        var r = e.querySelector(".js-comment-field");
        r.id = r.id.replace(/^r\d+ /, "").replace("${anchor}", t.anchor).replace("${position}", t.position)
    }

    var l = require("github/jquery")["default"], d = require("github/observe"), h = d.observe, f = require("delegated-events"), v = f.on, m = require("github/focused"), p = m.onFocusedKeydown, g = require("github/parse-html"), b = g.parseHTML;
    v("click", ".js-add-single-line-comment", function () {
        o(this.closest(".file"));
        var n = e(this) || t(this), r = Array.from(n.querySelectorAll(".js-line-comments")).pop();
        i(r)
    }), v("click", ".js-add-split-line-comment", function () {
        o(this.closest(".file"));
        var e = void 0;
        switch (this.getAttribute("data-type")) {
            case"addition":
                e = "js-addition";
                break;
            case"deletion":
                e = "js-deletion"
        }
        var t = u(this.closest("tr")), n = a(t, e, {
            type: this.getAttribute("data-type"),
            anchor: this.getAttribute("data-anchor"),
            path: this.getAttribute("data-path"),
            position: this.getAttribute("data-position"),
            line: this.getAttribute("data-line")
        }), r = Array.from(n.querySelectorAll(".js-line-comments")).pop();
        i(r)
    }), v("click", ".js-toggle-inline-comment-form", function () {
        i(this.closest(".js-line-comments"))
    }), v("quote:selection", ".js-line-comments", function () {
        i(this)
    }), p(document, ".js-inline-comment-form .js-comment-field", function () {
        return function (e) {
            return l(this).hasClass("js-navigation-enable") ? void 0 : "esc" === e.hotkey && 0 === this.value.length ? (n(this.closest(".js-inline-comment-form")), !1) : void 0
        }
    }), v("click", ".js-hide-inline-comment-form", function () {
        n(this.closest(".js-inline-comment-form"))
    }), l(document).on("ajaxSuccess", ".js-inline-comment-form", function (e, t, i, o) {
        if (this === e.target) {
            var r = o.inline_comment;
            if (r) {
                var s = l(this).closest(".js-line-comments");
                s.find(".js-comments-holder").append(r)
            }
            var a = o.inline_comment_thread;
            if (a) {
                var u = this.closest(".js-line-comments");
                u.replaceWith(b(document, a))
            }
            n(this)
        }
    }), l(document).on("ajaxError", ".js-inline-comment-form", function (e, t) {
        if (this === e.target) {
            var i = void 0, n = JSON.parse(t.responseText), o = this.querySelector(".js-comment-form-error");
            return i = n.errors ? n.errors.join(", ") : "There was an error posting your comment.", o.innerText = i, o.style.display = "block", e.preventDefault()
        }
    }), l(document).on("session:resume", function (e) {
        e = e.originalEvent;
        var t = void 0;
        (t = e.detail.targetId.match(/^new_inline_comment_diff_([\w-]+)_(\d+)$/)) && l(".js-add-line-comment[data-anchor=" + t[1] + "][data-position=" + t[2] + "]").click()
    }), h(".js-comment", {remove: r})
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0, o = void 0;
    n = function (t, n, o) {
        return i(t, function (t) {
            var i = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
            return c = null, r = s = function () {
                c && o(c, !1), c = null
            }, a = function (t) {
                c && o(c, !1), c = e(t.target).closest(n)[0], c && o(c, !0)
            }, i = function () {
                return t.addEventListener("mouseenter", r), t.addEventListener("mouseleave", s), t.addEventListener("mouseover", a)
            }, u = function () {
                return t.removeEventListener("mouseenter", r), t.removeEventListener("mouseleave", s), t.removeEventListener("mouseover", a)
            }, {add: i, remove: u}
        })
    }, o = function (e) {
        return Math.floor(e / 2)
    }, n(".diff-table", "td.blob-code, td.blob-num", function (e, t) {
        var i = void 0, n = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
        if (h = e.parentNode, i = h.children, 4 === i.length)for (s = a = 0, c = i.length; c > a; s = ++a)r = i[s], r === e && (n = o(s));
        for (d = [], s = u = 0, l = i.length; l > u; s = ++u)r = i[s], (null == n || o(s) === n) && d.push(r.classList.toggle("is-hovered", t));
        return d
    })
}.call(this), function () {
    var e = require("delegated-events"), t = e.on, i = require("github/observe"), n = i.observe, o = require("github/hash-change")["default"], r = void 0, s = void 0, a = void 0;
    t("click", ".js-linkable-line-number", function (e) {
        window.location.hash = this.id, e.preventDefault()
    }), r = null, a = function (e) {
        return Math.floor(e / 2)
    }, s = function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, s = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
        if (r) {
            for (s = 0, c = r.length; c > s; s++)i = r[s], i.classList.remove("selected-line");
            r = null
        }
        if (o = window.location.hash.substring(1), o && (h = document.getElementById(o)), h && h.classList.contains("js-linkable-line-number")) {
            if (d = h.parentNode, e = d.children, 4 === e.length)for (n = u = 0, l = e.length; l > u; n = ++u)i = e[n], i === h && (t = a(n));
            r = function () {
                var o = void 0, r = void 0, s = void 0;
                for (s = [], n = o = 0, r = e.length; r > o; n = ++o)i = e[n], (null == t || a(n) === t) && (i.classList.toggle("selected-line"), s.push(i));
                return s
            }()
        }
    }, o(s), n(".blob-expanded", s)
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-rich-diff.collapsed .js-expandable", function (t) {
        t.preventDefault(), e(t.target).closest(".js-rich-diff").removeClass("collapsed")
    }), e(document).on("click", ".js-show-rich-diff", function (t) {
        t.preventDefault(), e(this).closest(".js-warn-no-visible-changes").addClass("d-none").hide().siblings(".js-no-rich-changes").removeClass("d-none").show()
    })
}(), function () {
    function e() {
        var e = document.querySelector("meta[name=diff-view]"), t = e && e.content, i = document.querySelector(".file-diff-split"), n = "split" === t && i || document.querySelector(".wants-full-width-container");
        document.body.classList.toggle("full-width", n)
    }

    var t = require("github/observe"), i = t.observe;
    i("meta[name=diff-view]", {add: e, remove: e}), i(".file-diff-split", {
        add: e,
        remove: e
    }), i(".js-compare-tabs .tabnav-tab.selected", {add: e, remove: e}), i(".wants-full-width-container", {
        add: e,
        remove: e
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe;
    e(document).on("change", ".js-toggle-file-notes", function () {
        return e(this).closest(".file").toggleClass("show-inline-notes", this.checked)
    }), e(document).on("click", ".js-toggle-all-file-notes", function () {
        var t = void 0, i = void 0;
        return t = e(".js-toggle-file-notes"), i = 0 === t.filter(":checked").length, t.prop("checked", i).trigger("change"), !1
    }), i(".js-inline-comments-container", function () {
        var t = void 0, i = void 0, n = e(this).closest(".file")[0];
        return n ? (t = i = function () {
            var e = void 0;
            e = null != n.querySelector(".js-inline-comments-container"), n.classList.toggle("has-inline-notes", e)
        }, {add: t, remove: i}) : void 0
    })
}.call(this), function () {
    function e(e) {
        var t = void 0, i = void 0, n = void 0;
        n = e.parentElement, i = n.querySelectorAll("td.js-line-comments").length, t = n.querySelectorAll("td.js-line-comments.is-collapsed").length, n.classList.toggle("is-collapsed", t > 0 && i === t)
    }

    var t = require("github/observe"), i = t.observe;
    i("td.js-line-comments.is-collapsed", {
        add: function (t) {
            e(t)
        }, remove: function (t) {
            e(t)
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("focusin", ".js-url-field", function () {
        var t = void 0;
        return t = this, setTimeout(function () {
            return e(t).select()
        }, 0)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/google-analytics"), i = t.trackEvent;
    document.querySelector(".js-account-membership-form") && (e(document).one("change.early-access-tracking", ".js-account-membership-form", function () {
        i({category: "Large File Storage", action: "attempt", label: "location: early access form"})
    }), e(document).on("submit.early-access-tracking", ".js-account-membership-form", function () {
        i({category: "Large File Storage", action: "submit", label: "location: early access form"})
    }))
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/focused"), n = i.onFocusedInput, o = void 0, r = void 0;
    r = require("github/fetch").fetchText, o = function () {
        return e(Array.from(e(".js-repo-toggle-team:checked")).filter(t))
    }, n(document, ".js-repository-name", function () {
        var t = void 0, i = void 0, n = void 0;
        return n = /[^0-9A-Za-z_\-.]/g, i = e(".js-form-note"), t = e(".js-rename-repository-button"), function () {
            i.html("Will be renamed as <strong>" + this.value.replace(n, "-") + "</strong>"), n.test(this.value) ? i.show() : i.hide(), this.value && this.value !== e(this).attr("data-original-name") ? t.prop("disabled", !1) : t.prop("disabled", !0)
        }
    }), e(document).on("click", ".js-repo-team-suggestions-view-all", function () {
        return r(this.href).then(function (t) {
            return function (i) {
                var n = void 0, r = void 0;
                return r = o().map(function () {
                    return this.value
                }), n = e(t).closest("ul"), n.html(i), r.each(function () {
                    return n.find(".js-repo-toggle-team[value=" + this + "]").prop("checked", !0)
                })
            }
        }(this)), !1
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
    r = require("github/observe").observe, a = function (e, t) {
        var i = void 0;
        return i = t.querySelector(".js-repo-access-error"), i.textContent = e, i.classList.remove("d-none")
    }, o = function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
        for (n = document.querySelectorAll(".js-repo-access-error"), o = [], t = 0, i = n.length; i > t; t++)e = n[t], e.textContent = "", o.push(e.classList.add("d-none"));
        return o
    }, t = function (e) {
        return e.classList.toggle("is-empty", !e.querySelector(".js-repo-access-entry"));
    }, s = function () {
        var t = document.getElementById("collaborators");
        t && (t.querySelector(".js-add-new-collab").disabled = !0, e(t.querySelector(".js-add-repo-access-field")).data("autocompleted"))
    }, r(".js-add-new-collab", s), i = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = document.querySelector(".js-repo-access-team-select");
        if (a) {
            for (s = 0, r = a.querySelectorAll(".js-repo-access-team-select-option"), t = 0, o = r.length; o > t; t++)i = r[t], n = i.classList, e === i.getAttribute("data-team-id") && (n.add("has-access"), n.remove("selected")), n.contains("has-access") || s++;
            if (0 === s)return a.closest(".js-repo-access-group").classList.add("no-form")
        }
    }, n = function (e) {
        var t = void 0, i = document.querySelector(".js-repo-access-team-select");
        return i ? (null != (t = i.querySelector("[data-team-id='" + e + "']")) && t.classList.remove("has-access"), i.closest(".js-repo-access-group").classList.remove("no-form")) : void 0
    }, e(document).on("autocomplete:autocompleted:changed", ".js-add-repo-access-field", function () {
        return e(this).data("autocompleted") ? this.form.querySelector(".js-add-new-collab").disabled = !1 : s()
    }), e(document).on("selectmenu:selected", ".js-repo-access-team-select", function () {
        var t = void 0, i = void 0;
        return t = this.querySelector(".js-repo-access-team-select-option.selected").getAttribute("data-team-id"), i = this.closest(".js-repo-access-group").querySelector(".js-add-repo-access-field"), i.value = t, e(i.form).submit()
    }), e(document).on("ajaxSend", ".js-add-repo-access-form", function () {
        o()
    }), e(document).on("ajaxSuccess", ".js-add-repo-access-form", function (e, n, o, r) {
        var u = void 0, c = void 0, l = void 0, d = void 0;
        return c = this.closest(".js-repo-access-group"), u = this.querySelector(".js-add-repo-access-field"), l = "teams" === c.id ? c.querySelector(".js-repo-access-list") : c.querySelector(".js-repo-access-list-invites"), d = u.value, u.value = "", r.error ? a(r.error, c) : (s(), l.insertAdjacentHTML("beforeend", r.html), t(c), "teams" === c.id ? i(d) : void 0)
    }), e(document).on("ajaxSuccess", ".js-remove-repo-access-form", function () {
        var e = void 0, i = void 0;
        return o(), e = this.closest(".js-repo-access-entry"), i = this.closest(".js-repo-access-group"), "teams" === i.id && n(e.getAttribute("data-team-id")), e.remove(), t(i)
    }), e(document).on("ajaxError", ".js-remove-repo-access-form", function () {
        return a(this.getAttribute("data-error-message"), this.closest(".js-repo-access-group")), !1
    })
}.call(this), function () {
    function e(e) {
        var t = e.querySelector(".js-authorized-pushers"), i = parseInt(t.getAttribute("data-limit")), n = t.querySelectorAll(".js-authorized-user-or-team").length;
        t.classList.toggle("at-limit", n >= i)
    }

    var t = require("github/jquery")["default"], i = require("github/fetch"), n = i.fetchText, o = require("delegated-events"), r = o.on, s = require("github/observe"), a = s.observe, u = require("github/throttled-input"), c = u.addThrottledInputEventListener;
    t(document).on("change", ".js-default-branch", function () {
        var e = document.querySelector(".js-default-branch-confirmation"), t = document.querySelector(".js-change-default-branch-button");
        t.disabled = this.value === e.getAttribute("data-original-value"), e.value = this.value
    }), r("change", ".js-repo-features-form input[type=checkbox]", function () {
        var e = this.closest(".js-repo-option").querySelector(".js-status-indicator");
        e.classList.remove("status-indicator-success", "status-indicator-failed"), e.classList.add("status-indicator-loading")
    }), t(document).on("ajaxSuccess", ".js-repo-features-form", function (e, i, n, o) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-success")
        }), /^\s*</.test(o) && t(document.querySelector(".js-repo-nav")).replaceWith(o)
    }), t(document).on("ajaxError", ".js-repo-features-form", function () {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed");
            var t = e.closest(".js-repo-option").querySelector("input[type=checkbox]");
            t.checked = !t.checked
        })
    }), r("change", ".js-merge-features-form input[type=checkbox]", function () {
        Array.from(this.form.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        });
        var e = this.closest(".js-repo-option"), t = e.querySelector(".js-status-indicator");
        t.classList.remove("status-indicator-success", "status-indicator-failed"), t.classList.add("status-indicator-loading")
    }), t(document).on("ajaxSuccess", ".js-merge-features-form", function () {
        Array.from(this.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        }), Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-success")
        })
    }), t(document).on("ajaxError", ".js-merge-features-form", function (e) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed");
            var t = e.closest(".js-repo-option");
            t.classList.add("errored");
            var i = t.querySelector("input[type=checkbox]");
            i.checked = !i.checked
        }), Array.from(this.querySelectorAll(".status-indicator-success")).forEach(function (e) {
            e.classList.remove("status-indicator-success")
        }), e.preventDefault()
    }), t(document).on("change", ".js-protect-branch", function () {
        var e = this.closest(".js-protected-branch-settings"), t = this.checked;
        Array.from(e.querySelectorAll(".js-protected-branch-options")).forEach(function (e) {
            e.classList.toggle("active", t)
        }), Array.from(e.querySelectorAll(".js-protected-branch-option")).forEach(function (e) {
            t ? e.removeAttribute("disabled") : e.setAttribute("disabled", "disabled")
        })
    }), t(document).on("change", ".js-required-status-toggle", function () {
        var e = this.closest(".js-protected-branch-settings"), t = e.querySelector(".js-required-statuses");
        t.classList.toggle("d-none", !this.checked)
    }), t(document).on("change", ".js-required-status-checkbox", function () {
        var e = this.closest(".js-protected-branches-item");
        e.querySelector(".js-required-status-badge").classList.toggle("d-none", !this.checked)
    }), t(document).on("change", ".js-authorized-branch-pushers-toggle", function () {
        var e = this.closest(".js-protected-branch-settings"), t = e.querySelector(".js-authorized-pushers");
        t.classList.toggle("d-none", !this.checked), t.querySelector(".js-autocomplete-field").focus()
    }), t(document).on("change", ".js-protected-branch-include-admin-toggle", function () {
        var e = this.closest(".js-protected-branch-settings"), t = e.querySelectorAll(".js-protected-branch-admin-permission");
        Array.from(t).forEach(function (e) {
            e.classList.toggle("d-none"), e.classList.toggle("active", !e.classList.contains("d-none"))
        })
    }), t(document).on("autocomplete:result", ".js-add-protected-branch-user-or-team", function (t, i) {
        var o = this.closest(".js-protected-branch-options"), r = this.closest(".js-autocomplete-container"), s = new URL(r.getAttribute("data-url"), window.location.origin), a = new URLSearchParams(s.search.slice(1));
        a.append("item", i), s.search = a.toString();
        var u = o.querySelector(".js-authorized-users-and-teams"), c = u.querySelector("div[data-user-or-team-name='" + i + "']");
        c ? (r.querySelector(".js-autocomplete-field").value = "", c.querySelector(".js-protected-branch-pusher").classList.add("user-already-added")) : n(s.toString()).then(function (t) {
            r.querySelector(".js-autocomplete-field").value = "", u.insertAdjacentHTML("beforeend", t), e(o)
        })
    }), r("click", ".js-remove-authorized-user-or-team", function () {
        var t = this.closest(".js-protected-branch-options");
        this.closest(".js-authorized-user-or-team").remove(), e(t)
    }), a("#pages-cname-field", function () {
        c(this, function () {
            var e = document.querySelector(".js-pages-cname-save-btn");
            e.disabled = this.value === this.defaultValue
        })
    }), t(document).on("selectmenu:selected", ".js-pages-source", function () {
        var e = document.querySelector(".js-pages-source-btn-text"), t = document.querySelector(".js-pages-source-save-btn");
        t.disabled = e.innerHTML === e.getAttribute("data-original-text")
    }), a(".js-enable-btn", function () {
        this.disabled = !1, this.classList.remove("tooltipped"), this.removeAttribute("aria-label")
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/observe"), n = i.observe, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
    d = ["is-render-pending", "is-render-ready", "is-render-loading", "is-render-loaded"].reduce(function (e, t) {
        return e + " " + t
    }), l = function (e) {
        var t = void 0;
        return t = e.data("timing"), null != t ? (t.load = t.hello = null, t.helloTimer && (clearTimeout(t.helloTimer), t.helloTimer = null), t.loadTimer ? (clearTimeout(t.loadTimer), t.loadTimer = null) : void 0) : void 0
    }, a = function (e) {
        var t = void 0, i = void 0, n = void 0;
        if (!e.data("timing"))return t = 10, i = 45, n = {
            load: null,
            hello: null,
            helloTimer: null,
            loadTimer: null
        }, n.load = Date.now(), n.helloTimer = setTimeout(h(e, function () {
            return !n.hello
        }), 1e3 * t), n.loadTimer = setTimeout(h(e), 1e3 * i), e.data("timing", n)
    }, c = function (e) {
        return e.addClass("is-render-requested")
    }, u = function (e) {
        return e.removeClass(d), e.addClass("is-render-failed"), l(e)
    }, h = function (e, i) {
        return null == i && (i = function () {
            return !0
        }), function () {
            var n = void 0, o = void 0;
            return n = function () {
                try {
                    return Array.from(e).some(t)
                } catch (i) {
                    return Array.from(e).filter(t).length > 0
                }
            }(), !n || e.hasClass("is-render-ready") || e.hasClass("is-render-failed") || e.hasClass("is-render-failed-fatally") || !i() ? void 0 : (o = e.data("timing")) ? (console.error("Render timeout: " + JSON.stringify(o) + " Now: " + Date.now()), u(e)) : console.error("No timing data on $:", e)
        }
    }, o = function (t) {
        var i = void 0, n = void 0;
        i = e(t || this), (null != (n = i.data("timing")) ? n.load : 0) || (l(i), a(i), i.addClass("is-render-automatic"), c(i))
    }, n(".js-render-target", o), r = function (t) {
        var i = void 0;
        return i = ".js-render-target", e(t ? i + "[data-identity='" + t + "']" : i)
    }, e(window).on("message", function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
        return l = null != (c = e.originalEvent) ? c : e, n = l.data, a = l.origin, n && a && (d = function () {
            try {
                return JSON.parse(n)
            } catch (t) {
                return e = t, n
            }
        }(), h = d.type, o = d.identity, i = d.body, u = d.payload, h && i && 1 === (t = r(o)).length && a === t.attr("data-host") && "render" === h) ? s(t, h, o, i, u) : void 0
    }), s = function (e, t, i, n, o) {
        var r = void 0, s = void 0, a = void 0, c = void 0, l = void 0, h = void 0;
        switch (n) {
            case"hello":
                if (l = e.data("timing") || {untimed: !0}, l.hello = Date.now(), r = {
                        type: "render:cmd",
                        body: {cmd: "ack", ack: !0}
                    }, a = {
                        type: "render:cmd",
                        body: {cmd: "branding", branding: !1}
                    }, h = null != (c = e.find("iframe").get(0)) ? c.contentWindow : void 0, "function" == typeof h.postMessage && h.postMessage(JSON.stringify(r), "*"), "function" == typeof h.postMessage && h.postMessage(JSON.stringify(a), "*"), e.hasClass("is-local"))return s = e.parents(".js-code-editor").data("code-editor"), a = {
                    type: "render:data",
                    body: s.code()
                }, "function" == typeof h.postMessage ? h.postMessage(JSON.stringify(a), "*") : null;
                break;
            case"error":
                return u(e);
            case"error:fatal":
                return u(e), e.addClass("is-render-failed-fatal");
            case"error:invalid":
                return u(e, "invalid"), e.addClass("is-render-failed-invalid");
            case"loading":
                return e.removeClass(d), e.addClass("is-render-loading");
            case"loaded":
                return e.removeClass(d), e.addClass("is-render-loaded");
            case"ready":
                if (e.removeClass(d), e.addClass("is-render-ready"), null != o && null != o.height)return e.height(o.height);
                break;
            case"resize":
                return null != o && null != o.height && e.hasClass("is-render-ready") ? e.height(o.height) : console.error("Resize event sent without height or before ready");
            default:
                return console.error("Unknown message [" + t + "]=>'" + n + "'")
        }
    }
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(function () {
        var t = void 0, i = void 0;
        return t = e(".js-newsletter-frequency-choice"), t.length ? (i = function () {
            var e = void 0;
            return t.find(".selected").removeClass("selected"), e = t.find("input[type=radio]:enabled:checked"), e.closest(".newsletter-frequency-choice").addClass("selected")
        }, t.on("change", "input[type=radio]", function () {
            return i()
        }), i()) : void 0
    }), e(document).on("ajaxSuccess", ".js-subscription-toggle", function () {
        var t = void 0;
        return t = e(this).find(".selected .notice"), t.addClass("visible"), setTimeout(function () {
            return t.removeClass("visible")
        }, 2e3)
    }), e(document).on("ajaxSuccess", ".js-explore-newsletter-subscription-container", function (t, i) {
        return e(this).replaceWith(i.responseText)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("navigation:open", ".js-create-branch", function () {
        return e(this).submit(), !1
    })
}(), function () {
    var e = require("delegated-events"), t = e.on;
    t("click", ".js-toggle-lang-stats", function (e) {
        var t = document.querySelector(".js-stats-switcher-viewport"), i = 0 !== t.scrollTop ? "is-revealing-overview" : "is-revealing-lang-stats";
        t.classList.toggle(i), e.preventDefault()
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    t = function () {
        function t(t) {
            var i = void 0;
            i = e(t), this.name = i.attr("data-theme-name"), this.slug = i.attr("data-theme-slug"), this.baseHref = i.attr("href")
        }

        return t.prototype.wrappedKey = function (e, t) {
            return null == t && (t = null), t ? t + "[" + e + "]" : e
        }, t.prototype.params = function (e) {
            var t = void 0;
            return null == e && (e = null), t = {}, t[this.wrappedKey("theme_slug", e)] = this.slug, t
        }, t.prototype.previewSrc = function () {
            return [this.baseHref, e.param(this.params())].join("&")
        }, t
    }(), i = function () {
        function i() {
            this.updateScrollLinks = n(this.updateScrollLinks, this), this.scrollThemeLinksContainer = n(this.scrollThemeLinksContainer, this), this.onPublishClick = n(this.onPublishClick, this), this.onHideClick = n(this.onHideClick, this), this.onThemeLinkClick = n(this.onThemeLinkClick, this), this.onThemeNavNextClick = n(this.onThemeNavNextClick, this), this.onThemeNavPrevClick = n(this.onThemeNavPrevClick, this), this.onScrollForwardsClick = n(this.onScrollForwardsClick, this), this.onScrollBackwardsClick = n(this.onScrollBackwardsClick, this), this.onPagePreviewLoad = n(this.onPagePreviewLoad, this), this.$pagePreview = e("#page-preview"), this.$contextLoader = e(".theme-picker-spinner"), this.$fullPicker = e(".theme-picker-thumbs"), this.$miniPicker = e(".theme-picker-controls"), this.$scrollBackwardsLinks = e(".theme-toggle-full-left"), this.$scrollForwardsLinks = e(".theme-toggle-full-right"), this.$prevLinks = e(".theme-picker-prev"), this.$nextLinks = e(".theme-picker-next"), this.themeLinksContainer = this.$fullPicker.find(".js-theme-selector"), this.themeLinks = this.themeLinksContainer.find(".theme-selector-thumbnail"), this.themes = [], this.themeLinks.each(function (e) {
                return function (i, n) {
                    return e.themes.push(new t(n))
                }
            }(this)), this.selectedTheme = this.themes[0], this.$pagePreview.on("load", this.onPagePreviewLoad), this.$scrollBackwardsLinks.click(this.onScrollBackwardsClick), this.$scrollForwardsLinks.click(this.onScrollForwardsClick), this.$prevLinks.click(this.onThemeNavPrevClick), this.$nextLinks.click(this.onThemeNavNextClick), this.themeLinks.click(this.onThemeLinkClick), e(".theme-picker-view-toggle").click(this.onHideClick), e("#page-edit").click(this.onEditClick), e("#page-publish").click(this.onPublishClick), this.theme(this.selectedTheme), this.updateScrollLinks()
        }

        return i.prototype.onPagePreviewLoad = function () {
            var e = void 0, t = void 0;
            return this.$contextLoader.removeClass("visible"), e = this.$pagePreview[0].contentDocument ? this.$pagePreview[0].contentDocument : this.$pagePreview[0].contentWindow.document, t = this.getDocHeight(e) + "px", this.$pagePreview.css("visibility", "hidden"), this.$pagePreview.height("10px"), this.$pagePreview.height(t), this.$pagePreview.css("visibility", "visible")
        }, i.prototype.onScrollBackwardsClick = function () {
            return this.scrollThemeLinksContainer(-1)
        }, i.prototype.onScrollForwardsClick = function () {
            return this.scrollThemeLinksContainer(1)
        }, i.prototype.onThemeNavPrevClick = function () {
            return this.theme(this.prevTheme())
        }, i.prototype.onThemeNavNextClick = function () {
            return this.theme(this.nextTheme())
        }, i.prototype.onThemeLinkClick = function (e) {
            return this.theme(this.themeForLink(e.currentTarget)), !1
        }, i.prototype.onHideClick = function (t) {
            var i = void 0;
            return this.$fullPicker.toggle(), this.$miniPicker.toggle(), this.scrollToTheme(this.theme(), !1), i = e(t.currentTarget), i.toggleClass("open")
        }, i.prototype.onEditClick = function () {
            return e("#page-edit-form").submit(), !1
        }, i.prototype.onPublishClick = function () {
            var t = void 0;
            return t = e("#page-publish-form"), t.find('input[name="page[theme_slug]"]').val(this.theme().slug), e("#page-publish-form").submit(), !1
        }, i.prototype.scrollThemeLinksContainer = function (e) {
            var t = void 0, i = void 0, n = void 0;
            return i = this.themeLinksContainer.scrollLeft(), n = this.themeLinksContainer.outerWidth(!0), t = i + n * e, this.themeLinksContainer.animate({scrollLeft: t}, 400, function (e) {
                return function () {
                    return e.updateScrollLinks()
                }
            }(this)), !1
        }, i.prototype.updateScrollLinks = function () {
            var e = void 0, t = void 0, i = void 0;
            return e = this.themeLinksContainer.scrollLeft(), 0 >= e ? (this.$scrollBackwardsLinks.addClass("disabled"), this.$scrollForwardsLinks.removeClass("disabled")) : (this.$scrollBackwardsLinks.removeClass("disabled"), i = this.themeLinksContainer[0].scrollWidth, t = i - this.themeLinksContainer.outerWidth(!0), e >= t ? this.$scrollForwardsLinks.addClass("disabled") : this.$scrollForwardsLinks.removeClass("disabled"))
        }, i.prototype.selectedThemeIndex = function () {
            return this.themes.indexOf(this.selectedTheme)
        }, i.prototype.prevTheme = function () {
            var e = void 0;
            return e = (this.selectedThemeIndex() - 1) % this.themes.length, 0 > e && (e += this.themes.length), this.themes[e]
        }, i.prototype.nextTheme = function () {
            return this.themes[(this.selectedThemeIndex() + 1) % this.themes.length]
        }, i.prototype.themeForLink = function (t) {
            return this.themes[this.themeLinks.index(e(t))]
        }, i.prototype.linkForTheme = function (t) {
            return e(this.themeLinks[this.themes.indexOf(t)])
        }, i.prototype.scrollToTheme = function (e, t) {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            return null == t && (t = !0), i = this.linkForTheme(e), a = this.themes.indexOf(e), r = i.outerWidth(!0), o = a * r, n = this.themeLinksContainer.scrollLeft(), s = n + this.themeLinksContainer.outerWidth(!0), n > o || o + r > s ? t ? this.themeLinksContainer.animate({scrollLeft: o}, 500) : this.themeLinksContainer.scrollLeft(o) : void 0
        }, i.prototype.theme = function (e) {
            return null == e && (e = null), e ? (this.selectedTheme = e, this.showPreviewFor(e), this.themeLinks.removeClass("selected"), this.linkForTheme(e).addClass("selected"), this.scrollToTheme(e), this.$miniPicker.find(".js-theme-name").text(e.name), !1) : this.selectedTheme
        }, i.prototype.showPreviewFor = function (e) {
            var t = void 0;
            return this.$contextLoader.addClass("visible"), t = this.$fullPicker.find("form"), t.find('input[name="theme_slug"]').val(e.slug), t.submit()
        }, i.prototype.getDocHeight = function (e) {
            var t = void 0, i = void 0;
            return this.$pagePreview.height("auto"), t = e.body, i = e.documentElement, Math.max(t.scrollHeight, t.offsetHeight, i.clientHeight, i.scrollHeight, i.offsetHeight)
        }, i
    }(), e(function () {
        return document.getElementById("theme-picker-wrap") ? new i : void 0
    })
}.call(this), function () {
    function e(e) {
        document.querySelector(".js-gist-dropzone").classList.remove("d-none"), e.stopPropagation(), e.preventDefault()
    }

    function t(e) {
        null != e.target.classList && e.target.classList.contains("js-gist-dropzone") && e.target.classList.add("d-none")
    }

    function i(e) {
        var t = void 0, i = void 0, o = void 0, r = void 0, s = void 0, u = void 0;
        for (u = e.dataTransfer.files, r = 0, s = u.length; s > r; r++)o = u[r], a({
            category: "Interaction",
            action: "File Drop",
            label: o.type
        }), t = function (t) {
            var i = void 0;
            return o = t.file, i = t.data, e.target.dispatchEvent(new CustomEvent("gist:filedrop", {
                bubbles: !0,
                cancelable: !0,
                detail: {file: o, text: i}
            }))
        }, i = function () {
        }, n(o).then(t, i);
        document.querySelector(".js-gist-dropzone").classList.add("d-none"), e.stopPropagation(), e.preventDefault()
    }

    function n(e) {
        return new Promise(function (t, i) {
            var n = void 0;
            return n = new FileReader, n.onload = function () {
                var o = void 0;
                return o = n.result, o && !/\0/.test(o) ? t({file: e, data: o}) : i(new Error("invalid file"))
            }, n.readAsText(e)
        })
    }

    var o = require("github/observe"), r = o.observe, s = require("github/google-analytics"), a = s.trackEvent;
    r(".js-gist-dropzone", {
        add: function () {
            document.body.addEventListener("dragenter", e), document.body.addEventListener("dragleave", t), document.body.addEventListener("dragover", e), document.body.addEventListener("drop", i)
        }, remove: function () {
            document.body.removeEventListener("dragenter", e), document.body.removeEventListener("dragleave", t), document.body.removeEventListener("dragover", e), document.body.removeEventListener("drop", i)
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = require("github/focused")["default"], o = require("github/throttled-input"), r = o.addThrottledInputEventListener, s = o.removeThrottledInputEventListener, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0;
    c = require("github/fetch").fetchJSON, u = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        for (n = e.querySelector(".js-gist-files"), d = document.getElementById("js-gist-file-template"), t = document.createElement("div"), t.innerHTML = d.textContent, c = t.querySelectorAll("[id]"), o = 0, s = c.length; s > o; o++)i = c[o], i.removeAttribute("id");
        for (u = t.querySelector(".js-code-textarea"), null != u && u.setAttribute("id", "blob_contents_" + Date.now()), l = t.children, r = 0, a = l.length; a > r; r++)i = l[r], n.append(i);
        return n.lastElementChild
    }, v = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
        for (r = e.querySelectorAll(".js-gist-file"), n = 0, o = r.length; o > n; n++)if (t = r[n], i = t.querySelector(".js-gist-filename"), s = t.querySelector(".js-blob-contents"), !i.value && !s.value)return t;
        return u(e)
    }, f = function (t) {
        var i = void 0;
        return i = t.closest(".js-code-editor"), new Promise(function (t) {
            var n = e(i).data("code-editor");
            return n ? t(n) : e(i).one("codeEditor:ready", function () {
                return t(e(this).data("code-editor"))
            })
        })
    }, a = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0;
        for (n = e.querySelectorAll(".js-code-textarea"), t = 0, i = n.length; i > t; t++)if (o = n[t], o.value.trim().length > 0)return !0;
        return !1
    }, d = function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
        for (n = document.querySelectorAll(".js-gist-create"), o = [], t = 0, i = n.length; i > t; t++)e = n[t], o.push(e.disabled = !a(e.form));
        return o
    }, e(document).on("change", ".js-code-textarea", function () {
        return d()
    }), l = function () {
        var e = void 0, t = void 0;
        return t = this, (e = t.getAttribute("data-language-detection-url")) ? c(e + "?filename=" + encodeURIComponent(t.value)).then(function (e) {
            return f(t).then(function (t) {
                return t.setMode(e.language)
            })
        }) : void 0
    }, n(document, ".js-gist-filename", {
        focusin: function () {
            var e = this, t = this.closest(".js-code-editor");
            f(t).then(function (t) {
                return t.ace ? void r(e, l) : !1
            })
        }, focusout: function () {
            s(this, l)
        }
    }), e(document).on("click", ".js-add-gist-file", function () {
        var e = void 0;
        return e = this.closest(".js-blob-form"), u(e).scrollIntoView(), !1
    }), e(document).on("gist:filedrop", ".js-blob-form", function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        return o = e.originalEvent.detail, t = o.file, r = o.text, i = v(this), n = i.querySelector(".js-gist-filename"), n.value = t.name, l.call(n), f(n).then(function (e) {
            return e.setCode(r)
        }), i.scrollIntoView()
    }), e(document).on("click", ".js-remove-gist-file", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
        for (e = this.closest(".js-gist-file"), o = e.querySelectorAll(".js-gist-deleted input"), t = 0, n = o.length; n > t; t++)i = o[t], i.disabled = !1;
        return e.querySelector(".js-code-editor").remove(), !1
    }), e(function () {
        return d()
    }), h = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        for (i = e.querySelectorAll(".js-remove-gist-file"), r = [], n = 0, o = i.length; o > n; n++)t = i[n], r.push(t.classList.toggle("d-none", i.length < 2));
        return r
    }, i(".js-remove-gist-file", function () {
        var e = void 0;
        return e = this.closest(".js-gist-files"), {
            add: function () {
                return h(e)
            }, remove: function () {
                return h(e)
            }
        }
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxComplete", ".js-gist-file-update-container .js-comment-update", function (e, t) {
        var i = void 0;
        200 === t.status && (i = JSON.parse(t.responseText), this.action = i.url)
    })
}(), function () {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-skip-to-content", function () {
        return e("#start-of-content").next().attr("tabindex", "-1").focus(), !1
    })
}(), function () {
    function e(e) {
        try {
            return e.toLocaleString()
        } catch (t) {
            if (t instanceof RangeError)return e.toString();
            throw t
        }
    }

    function t(t) {
        var i = t.target, n = parseInt(i.value, 10) || 0, o = i.getAttribute("data-price"), r = n * o, s = i.form, a = s.querySelector(".js-job-posting-credit-total-cost");
        a.textContent = e(r);
        var u = s.querySelector(".js-job-posting-units");
        u.textContent = "job credit" + (1 === n ? "" : "s")
    }

    var i = require("github/observe"), n = i.observe;
    n(".js-job-posting-credit-credits-purchased", function () {
        this.addEventListener("change", t), this.addEventListener("keyup", t)
    })
}(), function () {
    function e(e) {
        var t = e.target, i = t.querySelector("button[type=submit]");
        i.disabled && e.preventDefault()
    }

    function t(e, t) {
        Array.from(e).forEach(function (e) {
            return e.classList.toggle("d-none", !t)
        })
    }

    function i(e, i) {
        var n = e.querySelectorAll(".js-job-posting-form-edit-section");
        t(n, i)
    }

    function n(e, i) {
        var n = e.querySelectorAll(".js-job-posting-form-preview-section");
        t(n, i)
    }

    function o(e, t) {
        var i = e.querySelector(".js-job-posting-form-preview");
        i.innerHTML = t
    }

    function r(e) {
        for (var t = [], i = e.elements, n = 0; n < i.length; n++) {
            var o = i[n];
            if ("_method" !== o.name && "" !== o.name) {
                var r = "INPUT" === o.tagName && "checkbox" === o.type, s = r && o.checked;
                (r && s || !r) && t.push(o.name + "=" + encodeURIComponent(o.value))
            }
        }
        return t.join("&")
    }

    function s(e) {
        var t = e.target, i = t.parentNode.querySelector(".selected");
        if (i)i.classList.remove("selected"), t.classList.add("selected"); else {
            var s = document.querySelector(".js-job-posting-form-tabs");
            s.querySelector(".selected.tabnav-tab").classList.remove("selected"), s.querySelector(".js-show-job-posting-preview").classList.add("selected")
        }
        window.scrollTo(0, 0);
        var a = t.form, u = document.querySelector(".js-job-posting-preview-loading").innerHTML;
        document.querySelector(".js-job-posting-form-preview").innerHTML = u, n(a, !0);
        for (var c = a.querySelectorAll(".js-job-posting-form-edit-section"), l = 0; l < c.length; l++)c[l].classList.add("d-none");
        var h = t.getAttribute("data-url"), f = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            body: r(a)
        };
        d(h, f).then(function (e) {
            o(a, e)
        })
    }

    function a(e) {
        var t = e.target, o = t.parentNode.querySelector(".selected");
        o && (o.classList.remove("selected"), t.classList.add("selected"));
        var r = t.form;
        i(r, !0), n(r, !1)
    }

    var u = require("github/observe"), c = u.observe, l = require("github/fetch"), d = l.fetchText;
    c(".js-job-posting-form", function () {
        this.addEventListener("submit", e)
    }), c(".js-show-job-posting-preview", function () {
        this.addEventListener("click", s)
    }), c(".js-show-job-posting-form", function () {
        this.addEventListener("click", a)
    })
}(), function () {
    function e() {
        var e = b(".js-job-search-input")[0];
        if ("undefined" != typeof e) {
            var t = e.value, n = b("input[type=text].js-job-search-prefix, select.js-job-search-prefix, input[type=hidden].js-job-search-prefix"), o = i(n, function (e, t) {
                return "" === e ? "" : "" !== t ? e + t : void 0
            }), r = "input[type=checkbox].js-job-search-prefix";
            b.merge(o, i(b(r), function (e, t) {
                return "true" === t ? e + t : void 0
            }));
            var s = b.trim(o.join(" "));
            b(".js-hidden-job-query").val(b.trim(t + " " + s))
        }
    }

    function t(e) {
        return -1 !== e.search(/\s/g) ? '"' + e.replace(/"/g, '\\"') + '"' : e
    }

    function i(e, i) {
        return b.map(e, function (e) {
            var n = null;
            if (b(e).is("[type=checkbox]"))n = b(e).prop("checked") ? "true" : "false"; else {
                var o = e.getAttribute("data-search-value");
                n = null === o ? e.value.trim() : o
            }
            var r = e.getAttribute("data-search-prefix");
            return "" === r ? i.call(e, r, n) : -1 !== n.search(/\,/g) && r.indexOf("location") < 0 ? n.split(/\,/).map(function (n) {
                return i.call(e, r, t(n.trim()))
            }) : i.call(e, r, t(n))
        })
    }

    function n(e) {
        var i = e[0].getAttribute("data-suggestion");
        null === i && (i = e[0].getAttribute("data-value"));
        var n = e.closest(".js-suggester-container"), o = n.find('input[type="text"]:not(.js-applied-suggestions-value)'), r = n.find(".js-job-search-prefix"), s = e[0].getAttribute("data-search-prefix");
        null !== s && (i = s + t(i)), r.val(i).change(), null === s && o.val(e[0].getAttribute("data-value")).change(), e.closest(".js-suggester").empty().addClass("d-none"), o.focus()
    }

    function o(e) {
        var t = e[0].getAttribute("data-value"), i = e.closest(".js-suggester-container"), n = i.find(".js-job-search-prefix"), o = e[0].getAttribute("data-search-prefix");
        n.attr("data-search-prefix", o).attr("data-search-value", t).attr("name", "exact_location"), n.val(e[0].getAttribute("data-value")).change(), e.closest(".js-suggester").empty().addClass("d-none"), n.focus()
    }

    function r(e) {
        var t = e[0].getAttribute("data-geonameid"), i = e.closest(".js-suggester-container"), n = i.find('input[type="text"]:not(.js-applied-suggestions-value)'), o = i.find(".applied-suggestions"), r = document.createElement("li");
        r.className = "applied-suggestion";
        var s = i.find(".js-applied-suggestions-value"), a = s[0].value, u = "";
        u = a.length < 1 ? t : a.split(",").concat(t).join(","), s.val(u).change(), r.appendChild(document.createTextNode(e.text()));
        var c = document.createElement("button");
        c.setAttribute("data-value", t), b(c).append("&times;"), c.className = "js-remove-suggestion remove-suggestion tooltipped tooltipped-e", c.setAttribute("aria-label", "Remove"), c.type = "button", r.appendChild(c), o[0].appendChild(r), n.val(""), o.removeClass("d-none"), e.closest(".js-suggester").empty().addClass("d-none"), n.focus()
    }

    function s(e) {
        var t = e.getAttribute("data-default-search-prefix");
        e.setAttribute("data-search-prefix", t), e.removeAttribute("data-search-value")
    }

    function a(e, t) {
        var i = e.find(".js-navigation-item");
        if (!(i.length < 1)) {
            var n = e.find(".js-navigation-item.navigation-focus"), o = null;
            if (n.length > 0) {
                var r = n.next(), s = n.prev();
                n.removeClass("navigation-focus"), o = 1 === t ? r.length > 0 ? r : i.first() : s.length > 0 ? s : i.last()
            } else o = 1 === t ? i.first() : i.last();
            o.addClass("navigation-focus")
        }
    }

    function u(e, t) {
        var i = e.closest(".js-suggester-container")[0], n = i.querySelector(".js-suggester");
        n.innerHTML = t, n.querySelectorAll("li").length > 0 ? (n.classList.remove("d-none"), n.style.display = "block") : n.classList.add("d-none")
    }

    function c(e, t, i) {
        var n = e[0].value.trim(), o = e.closest(".js-suggester-container"), r = o[0].querySelector(".octospinner");
        if (o.find(".js-suggester").empty(), !(n.length < 1)) {
            r.classList.remove("d-none");
            var s = t.indexOf("?") > -1 ? "&" : "?";
            t += s + "q=" + i(n), x(t).then(function (t) {
                u(e, t), r.classList.add("d-none")
            })
        }
    }

    function l(e, t) {
        c(e, t, function (e) {
            return 'title:"' + encodeURIComponent(e) + '"'
        })
    }

    function d(e, t) {
        c(e, t, function (e) {
            return encodeURIComponent(e)
        })
    }

    function h(e) {
        for (; e.hasChildNodes();)e.removeChild(e.lastChild);
        e.classList.add("d-none")
    }

    function f(e, t, i, n) {
        var o = b(t.target), r = o.closest(".js-suggester-container"), s = r.find(".js-suggester");
        if (q[e] && clearTimeout(q[e]), 38 === t.keyCode)return void a(s, -1);
        if (40 === t.keyCode)return void a(s, 1);
        if (9 === t.keyCode) {
            var u = s.find(".js-navigation-item.navigation-focus");
            return void(u.length > 0 ? (t.preventDefault(), n(u)) : h(s[0]))
        }
        if (27 === t.keyCode)return void h(s[0]);
        if (13 === t.keyCode) {
            var c = s.find(".js-navigation-item.navigation-focus");
            return void(c.length > 0 && (t.preventDefault(), n(c)))
        }
        var l = r[0].querySelector(".js-navigation-container").getAttribute("data-url");
        q[e] = setTimeout(function () {
            i(o, l)
        }, 500)
    }

    function v(e) {
        var t = e.target;
        t.classList.contains("js-navigation-item") || (t = t.closest(".js-navigation-item"));
        var i = t.closest(".js-job-search-suggester").querySelector(".navigation-focus");
        null !== i && i.classList.remove("navigation-focus"), t.classList.add("navigation-focus")
    }

    function m(e) {
        var t = e.target;
        t.classList.contains("js-navigation-item") || (t = t.closest(".js-navigation-item")), t.classList.remove("navigation-focus")
    }

    function p(e) {
        var t = e.target;
        t.classList.contains("js-navigation-item") || (t = t.closest(".js-navigation-item"));
        var i = t.getAttribute("data-search-prefix"), s = t.closest(".js-suggester"), a = s.classList.contains("js-job-search-suggester-with-list");
        "title:" === i ? n(b(t)) : a ? r(b(t)) : o(b(t))
    }

    function g(e) {
        e.preventDefault();
        var t = b(e.target), i = t[0].getAttribute("data-value"), n = t.closest(".js-suggester-container"), o = n[0].querySelector(".js-applied-suggestions-value"), r = o.value.split(","), s = r.indexOf(i);
        s > -1 && r.splice(s, 1), o.value = r.join(",");
        var a = t.closest(".applied-suggestions")[0];
        t.closest("li").remove(), a.querySelectorAll("li").length < 1 && a.classList.add("d-none")
    }

    var b = require("github/jquery")["default"], y = require("github/observe"), j = y.observe, w = require("github/fetch"), x = w.fetchText;
    b(document).on("focusin", ".js-job-search-prefix", function () {
        var t = document.getElementById("job-title-suggester");
        h(t);
        var i = document.getElementById("job-location-suggester");
        return h(i), function () {
            e()
        }
    }), b(document).on("focusin", ".js-job-search-input", function () {
        b(this).closest(".js-advanced-search-label").addClass("focus")
    }), b(document).on("change", ".js-job-search-prefix", e), b(document).on("ajaxSuccess", ".js-job-search-unwatch", function (e) {
        var t = b(e.target), i = t.closest(".menu");
        t.closest(".menu-item").remove(), i.find(".menu-item").length < 1 && (b(".search-job-postings-watched, .js-job-search-watch").removeClass("d-none"), b(".js-watched-orgs").addClass("d-none"))
    }), b(document).on("ajaxSuccess", ".js-org-job-search-unwatch", function () {
        b(".js-org-job-search-watch").removeClass("d-none")
    }), b(document).on("ajaxSuccess", ".js-job-search-watch", function (e, t, i, n) {
        b(".js-job-search-watch")[0].classList.add("d-none"), b(".js-job-search-watches").empty().append(b(n))
    }), b(document).on("ajaxSuccess", ".js-org-job-search-watch", function (e, t, i, n) {
        b(".js-org-job-search-watch")[0].classList.add("d-none"), b(".js-org-job-search-unwatch").removeClass("d-none"), Array.from(document.querySelectorAll(".js-org-job-search-id")).forEach(function (e) {
            e.value = n.saved_search.id
        })
    }), b(".js-select-menu.js-job-search-watch, .js-select-menu.js-org-job-search-watch").on("menu:activated", function (e) {
        b(e.target).find(".js-job-search-title").focus()
    }), b(document).on("submit", ".js-job-search-unwatch, .js-org-job-search-unwatch", function (e) {
        var t = e.target;
        t.blur(), t.classList.add("d-none")
    });
    var q = {};
    q.jobTitle = null, q.jobLocation = null, j(".js-job-search-input", function () {
        this.addEventListener("keydown", function (e) {
            f("jobTitle", e, l, n)
        })
    }), j(".js-job-search-suggester .js-navigation-item", function () {
        this.addEventListener("mouseover", v), this.addEventListener("mouseout", m), this.addEventListener("click", p)
    }), j(".js-job-posting-location", function () {
        this.addEventListener("keydown", function (e) {
            s(e.target), f("jobLocation", e, d, o)
        })
    }), j(".js-job-posting-location-with-list", function () {
        this.addEventListener("keydown", function (e) {
            f("jobLocation", e, d, r)
        })
    }), j(".js-job-search-input, .js-job-search-hidden", function () {
        e()
    }), j(".js-remove-suggestion", function () {
        this.addEventListener("click", g)
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/sudo")["default"], i = require("github/throttled-input"), n = i.addThrottledInputEventListener, o = require("github/facebox")["default"], r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0, h = void 0;
    d = require("github/fetch"), a = d.fetch, u = d.fetchText, c = require("delegated-events").fire, l = require("github/observe").observe, r = {
        isHttpFragment: function (e) {
            return 0 === "http://".indexOf(e) || 0 === "https://".indexOf(e)
        }, isValidHttpUrl: function (e) {
            var t = void 0, i = void 0, n = void 0;
            return e = e.trim(), n = function () {
                try {
                    return new URL(e)
                } catch (t) {
                }
            }(), null == n ? !1 : (t = /^https?/.test(n.protocol), i = n.href === e || n.href === e + "/", t && i)
        }
    }, l(".js-hook-url-field", function (t) {
        var i = void 0, o = void 0, s = void 0;
        i = e(t), o = function (t) {
            var i = void 0, n = void 0;
            return i = e(t).closest("form"), n = /^https:\/\/.+/.test(t.val()), i.toggleClass("is-ssl", n)
        }, s = function (e) {
            var t = void 0, i = void 0;
            return t = e.val(), i = r.isHttpFragment(t) || r.isValidHttpUrl(t), e.closest("form").toggleClass("is-invalid-url", !i)
        }, i.on("keyup", function () {
            return o(i)
        }), n(i[0], function () {
            s(i)
        }), o(i), s(i)
    }), e(document).on("click", ".js-hook-toggle-ssl-verification", function (t) {
        return t.preventDefault(), e(".js-ssl-hook-fields").toggleClass("is-not-verifying-ssl"), e(".js-ssl-hook-fields").hasClass("is-not-verifying-ssl") ? (e(".js-hook-ssl-verification-field").val("1"), c(document, "facebox:close")) : e(".js-hook-ssl-verification-field").val("0")
    }), s = function (t) {
        var i = void 0;
        return i = e(".js-hook-event-checkbox"), i.prop("checked", !1), null != t ? i.filter(t).prop("checked", !0) : void 0
    }, e(document).on("change", ".js-hook-event-choice", function () {
        var t = void 0;
        return t = "custom" === e(this).val(), e(".js-hook-events-field").toggleClass("is-custom", t), !0
    }), e(document).on("submit", ".js-hook-form", function () {
        var t = void 0, i = void 0;
        return t = e(this), i = t.find(".js-hook-event-choice:checked").val(), "custom" === i && e(".js-hook-wildcard-event").prop("checked", !1), "push" === i && s('[value="push"]'), "all" === i && s(".js-hook-wildcard-event"), !0
    }), e(document).on("details:toggled", ".js-hook-secret", function () {
        var t = void 0, i = void 0;
        return t = e(this), i = t.find("input[type=password]"), t.hasClass("open") ? i.removeAttr("disabled").focus() : i.attr("disabled", "disabled")
    }), e(document).on("details:toggled", ".js-hook-delivery-item", function () {
        var i = void 0, n = void 0;
        return i = e(this), n = this.querySelector(".js-hook-delivery-details"), i.data("details-load-initiated") ? void 0 : t().then(function () {
            var t = void 0, o = void 0;
            return i.data("details-load-initiated", !0), n.classList.add("is-loading"), t = function (t) {
                return e(n).replaceWith(t), n.classList.remove("is-loading")
            }, o = function () {
                return n.classList.add("has-error"), n.classList.remove("is-loading")
            }, u(n.getAttribute("data-url")).then(t, o)
        })
    }), e(document).on("click", ".js-hook-delivery-details .js-tabnav-tab", function () {
        var t = void 0, i = void 0, n = void 0;
        return i = e(this), t = i.closest(".js-hook-delivery-details"), t.find(".js-tabnav-tab").removeClass("selected"), n = t.find(".js-tabnav-tabcontent").removeClass("selected"), i.addClass("selected"), n.filter(function () {
            return this.getAttribute("data-tab-name") === i.attr("data-tab-target")
        }).addClass("selected")
    }), e(document).on("click", ".js-hook-deliveries-pagination-button", function (i) {
        var n = void 0, o = void 0;
        return i.preventDefault(), o = this, n = e(this).parent(), t().then(function () {
            return n.addClass("loading"), u(o.getAttribute("href")).then(function (e) {
                return n.replaceWith(e)
            })
        })
    }), e(document).on("click", ".js-redeliver-hook-delivery-init-button", function (e) {
        var i = void 0;
        return e.preventDefault(), i = this.getAttribute("href"), t().then(function () {
            return o({div: i})
        })
    }), e(document).on("ajaxSuccess", ".js-redeliver-hook-form", function (t, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0;
        return s = this.getAttribute("data-delivery-guid"), n = e(".js-hook-delivery-details").filter(function () {
            return this.getAttribute("data-delivery-guid") === s
        }), r = n.closest(".js-hook-delivery-item"), c(document, "facebox:close"), o = e(i.responseText), n.replaceWith(o), o.on("load", function () {
            return n = r.find(".js-hook-delivery-details"), r.find(".js-item-status").removeClass("success pending failure").addClass(n.attr("data-status-class")), r.find(".js-item-status-tooltip").attr("aria-label", n.attr("data-status-message"))
        })
    }), e(document).on("ajaxError", ".js-redeliver-hook-form", function () {
        return e(this).siblings(".js-redelivery-dialog").addClass("failed")
    }), e(document).on("submit", ".js-test-hook-form", function (i) {
        var n = void 0;
        return i.preventDefault(), n = this, t().then(function () {
            var t = void 0, i = void 0, o = void 0, r = void 0;
            return r = document.querySelector(".js-test-hook-message"), r.classList.remove("error", "success"), t = function () {
                return n.dispatchEvent(new CustomEvent("ajaxComplete", {bubbles: !0}))
            }, i = function () {
                return r.classList.add("success")
            }, o = function (e) {
                var t = void 0;
                return r.classList.add("error"), t = r.querySelector(".js-test-hook-message-errors"), null != e.response ? e.response.json().then(function (e) {
                    return t.textContent = e.errors
                }) : t.textContent = "Network request failed"
            }, a(n.action, {
                method: n.method,
                body: e(n).serialize(),
                headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
            }).then(i, o).then(t, t)
        })
    }), h = function () {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        return n = e(this), o = n.find(".js-value"), t = n.closest("form"), i = t.find(".js-enforcement-value")[0], i.value = o.text().split("_")[0], r = t.find(".js-final-value")[0], "undefined" != typeof r && (o.text().split("_")[1] ? r.value = !1 : r.value = !0), t.submit()
    }, e(document).on("click", ".js-hook-enforcement-select .js-navigation-item", h)
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe").observe;
    t(".js-integration-permissions-selector", function () {
        e("[id^=integration_permission_]").on("change", function () {
            var t = this.getAttribute("data-permission"), i = this.getAttribute("data-resource"), n = Array.from(document.querySelectorAll(".js-integration-" + i + "-hook-event"));
            "none" !== t ? (e(".js-integration-hook-" + i + "-event-permission-error").addClass("d-none"), n.forEach(function (e) {
                return e.readOnly = !1
            }), this.closest(".js-list-group-item").classList.remove("disabled")) : (this.closest(".js-list-group-item").classList.add("disabled"), n.forEach(function (e) {
                e.readOnly = !0, e.checked = !1
            }))
        }), e(".js-integration-hook-event").on("click", function () {
            return this.readOnly === !0 ? (e(this.closest(".js-send-events")).find(".js-integration-hook-event-permission-error").removeClass("d-none"), !1) : void 0
        })
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("navigation:open", ".js-issues-custom-filter", function () {
        var t = void 0, i = void 0, n = void 0, o = void 0;
        return i = e(this), o = i.find(".js-new-item-name").text(), n = i.attr("data-name"), t = e("<input>", {
            type: "hidden",
            name: n,
            value: o
        }), i.append(t), i.submit()
    })
}.call(this), function () {
    function e() {
        var e = t(this), i = t(this).closest(".js-label-editor");
        "#" !== e.val().charAt(0) && e.val("#" + e.val()), i.removeClass("is-valid is-not-valid");
        var n = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.val());
        n ? (i.addClass("is-valid"), u(e, e.val())) : (i.addClass("is-not-valid"), c(e))
    }

    var t = require("github/jquery")["default"], i = require("github/setimmediate")["default"], n = require("github/focused")["default"], o = require("github/throttled-input"), r = o.addThrottledInputEventListener, s = o.removeThrottledInputEventListener, a = void 0, u = void 0, c = void 0;
    u = function (e, t) {
        return e.closest(".js-label-editor").find(".js-color-editor-bg").css("background-color", t), e.css("color", a(t, -.5)), e.css("border-color", t)
    }, c = function (e) {
        var i = void 0, n = void 0;
        return n = "#c00", i = t(e).closest(".js-color-editor"), i.find(".js-color-editor-bg").css("background-color", n), e.css("color", "#c00"), e.css("border-color", n)
    }, a = function (e, t) {
        var i = void 0, n = void 0, o = void 0;
        for (e = String(e).toLowerCase().replace(/[^0-9a-f]/g, ""), e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), t = t || 0, o = "#", i = void 0, n = 0; 3 > n;)i = parseInt(e.substr(2 * n, 2), 16), i = Math.round(Math.min(Math.max(0, i + i * t), 255)).toString(16), o += ("00" + i).substr(i.length), n++;
        return o
    }, n(document, ".js-color-editor-input", {
        focusin: function () {
            r(this, e)
        }, focusout: function () {
            s(this, e)
        }
    }), t(document).on("mousedown", ".js-color-chooser-color", function () {
        var e = void 0, i = void 0, n = void 0;
        return t(this).closest(".js-color-editor").removeClass("open"), e = t(this).closest(".js-label-editor"), i = "#" + t(this).attr("data-hex-color"), n = e.find(".js-color-editor-input"), e.removeClass("is-valid is-not-valid"), n.val(i), u(n, i)
    }), t(document).on("submit", ".js-label-editor form", function () {
        var e = void 0, i = void 0;
        return e = t(this).find(".js-color-editor-input"), i = e.val(), i.length < 6 && (i = i[1] + i[1] + i[2] + i[2] + i[3] + i[3]), e.val(i.replace("#", ""))
    }), t(document).on("focusin", ".js-label-editor", function () {
        return t(this).closest(".js-label-editor").addClass("open")
    }), t(document).on("reset", ".js-create-label", function () {
        var e = void 0, n = void 0, o = void 0;
        return e = t(this).find(".color-chooser span").removeAttr("data-selected"), o = e.eq(Math.floor(Math.random() * e.length)), n = "#" + o.attr("data-selected", "").attr("data-hex-color"), i(function (e) {
            return function () {
                var i = void 0;
                return i = t(e).find(".js-color-editor-input"), i.attr("data-original-color", n).attr("value", n), u(i, i.val())
            }
        }(this))
    })
}.call(this), function () {
    function e(e, t) {
        return e.closest("div.js-details-container").classList.toggle("is-empty", t)
    }

    function t(e) {
        var t = void 0, i = void 0, n = void 0;
        return t = document.querySelector(".js-labels-count"), n = a(t.textContent), i = n + e, t.textContent = s(i), o(i, document.querySelector(".js-labels-label")), i
    }

    var i = require("github/jquery")["default"], n = require("github/inflector"), o = n.pluralizeNode, r = require("github/number-helpers"), s = r.formatNumber, a = r.parseFormattedNumber;
    i(document).on("click", ".js-edit-label", function () {
        i(this).closest(".labels-list-item").addClass("edit")
    }), i(document).on("click", ".js-edit-label-cancel", function () {
        this.form.reset(), i(this).closest(".labels-list-item").removeClass("edit")
    }), i(document).on("ajaxSuccess", ".js-create-label", function (n, o, r, s) {
        this.reset(), i(this).nextAll(".table-list").prepend(s), t(1), e(this, !1)
    }), i(document).on("ajaxSuccess", ".js-update-label", function (e, t, n, o) {
        i(this).closest(".labels-list-item").replaceWith(o)
    }), i(document).on("ajaxSend", ".js-update-label, .js-create-label", function () {
        i(this).find(".error").text("")
    }), i(document).on("ajaxError", ".js-update-label, .js-create-label", function (e, t) {
        return i(this).find(".error").text(t.responseText), !1
    }), i(document).on("ajaxSuccess", ".js-delete-label", function () {
        var n = void 0;
        n = t(-1), e(this, 0 === n), i(this).closest(".labels-list-item").fadeOut()
    })
}.call(this), function () {
    var e = require("github/hash-change")["default"];
    e(function (e) {
        var t = void 0, i = void 0;
        i = e.newURL;
        var n = i.match(/\/issues#issue\/(\d+)$/);
        return n ? (t = n[1], window.location = i.replace(/\/?#issue\/.+/, "/" + t)) : void 0
    }), e(function (e) {
        var t = void 0, i = void 0, n = void 0;
        n = e.newURL;
        var o = n.match(/\/issues#issue\/(\d+)\/comment\/(\d+)$/);
        return o ? (i = o[1], t = o[2], window.location = n.replace(/\/?#issue\/.+/, "/" + i + "#issuecomment-" + t)) : void 0
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe, n = void 0;
    i(".js-issues-list-check:checked", {
        add: function () {
            return e(this).closest(".js-issue-row").addClass("selected")
        }, remove: function () {
            return e(this).closest(".js-issue-row").removeClass("selected")
        }
    }), e(document).on("navigation:keydown", ".js-issue-row", function (e) {
        return "x" === e.hotkey ? (n(this), !1) : void 0
    }), e("#js-issues-search").focus(function () {
        return this.value = this.value
    }), n = function (t) {
        var i = t.querySelector(".js-issues-list-check");
        i && (i.checked = !i.checked, e(i).trigger("change"))
    }
}.call(this), function () {
    var e = require("delegated-events"), t = e.on, i = e.fire, n = require("github/text"), o = n.insertText;
    t("selectmenu:selected", ".js-saved-reply-container", function (e) {
        var t = e.target.querySelector(".js-saved-reply-body"), n = t.textContent.trim(), r = this.closest(".js-previewable-comment-form"), s = r.querySelector(".js-comment-field");
        o(s, n), i(s, "change");
        var a = r.querySelector(".js-saved-reply-id");
        a.value = t.getAttribute("data-saved-reply-id")
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
    t = require("github/fetch").fetchText, e(document).on("selectmenu:selected", ".js-issue-sidebar-form", function (t) {
        var i = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        r = t.target, l = function (t) {
            return function () {
                return t.matches("form") ? e(t).submit() : n(t)
            }
        }(this);
        var d = r.closest(".js-select-menu");
        if (u = d.hasAttribute("data-multiple"), !r.hasAttribute("data-clear-assignees")) {
            if (u) {
                var h = d.getAttribute("data-max-options");
                if (h) {
                    var f = Number(h), v = d.querySelectorAll('input[type="checkbox"]:checked').length, m = v > f;
                    d.querySelector(".js-max-warning").classList.toggle("d-none", !m)
                }
                return e(this).off(".deferredSubmit"), e(this).one("menu:deactivate.deferredSubmit", l)
            }
            return l()
        }
        for (a = r.closest(".js-menu-content"), c = a.querySelectorAll('input[name="issue[user_assignee_ids][]"]:checked'), o = 0, s = c.length; s > o; o++)i = c[o], i.disabled = !1, i.checked = !1;
        l()
    }), r = function (t, i) {
        t.replaceWith.apply(t, e.parseHTML(i))
    }, e(document).on("ajaxSuccess", ".js-discussion-sidebar-item", function (e, t, i, n) {
        var o = void 0;
        o = e.target.classList, o.contains("js-issue-sidebar-form") && r(this, n)
    }), e(document).on("click", "div.js-issue-sidebar-form .js-issue-assign-self", function (e) {
        var t = void 0;
        t = this.closest(".js-issue-sidebar-form"), n(t, {name: this.name, value: this.value}), e.preventDefault()
    }), n = function (i, n) {
        var s = void 0;
        s = o(i), n && s.push(n), s.push({
            name: "authenticity_token",
            value: i.closest("form").elements.authenticity_token.value
        }), t(i.getAttribute("data-url"), {
            method: "post",
            body: e.param(s),
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).then(function (e) {
            return r(i.closest(".js-discussion-sidebar-item"), e)
        })
    }, o = function (t) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
        for (n = t.closest("form"), a = e(n).serializeArray(), u = [], o = 0, r = a.length; r > o; o++)s = a[o], e.contains(t, i(n, s)) && u.push(s);
        return u
    }, i = function (e, t) {
        var i = void 0, n = void 0, o = void 0, r = void 0;
        for (r = e.elements, n = 0, o = r.length; o > n; n++)if (i = r[n], i.name === t.name && i.value === t.value)return i
    }
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/menu").deactivate, i = void 0, n = void 0, o = void 0, r = void 0;
    o = require("github/fetch"), i = o.fetchJSON, n = o.fetchPoll, r = require("github/setimmediate")["default"];
    var s = require("github/select-menu/loading"), a = s.setLoadingData;
    e(document).on("change", ".js-issues-list-check", function () {
        e("#js-issues-toolbar").toggleClass("triage-mode", e(".js-issues-list-check:checked").length > 0)
    }), e(document).on("change", ".js-issues-list-check", function () {
        for (var e = document.querySelectorAll(".js-issues-list-check:checked"), t = Array.from(e).map(function (e) {
            return [e.name, e.value]
        }), i = document.querySelectorAll("#js-issues-toolbar .js-issues-toolbar-triage .js-select-menu"), n = 0; n < i.length; n++) {
            var o = i[n];
            a(o, t), o.classList.add("js-load-contents")
        }
    }), e(document).on("selectmenu:selected", ".js-issues-toolbar-triage .js-navigation-item", function () {
        var i = void 0, n = void 0, o = void 0, s = void 0, a = void 0, u = this.closest(".js-menu-container").hasAttribute("data-submits-hash");
        i = e(this).closest("form"), s = e(this).hasClass("selected"), o = e(this).attr("data-name"), a = e(this).attr("data-value"), n = u ? e("<input>", {
            type: "hidden",
            name: o + "[" + a + "]",
            value: s ? "1" : "0"
        }) : e("<input>", {type: "hidden", name: o, value: s ? a : ""}), r(function (e) {
            return function () {
                t(e.closest(".js-menu-container"))
            }
        }(this)), i.find(".js-issues-triage-fields").append(n), i.addClass("will-submit")
    }), e(document).on("menu:deactivate", ".js-issues-toolbar-triage .js-menu-container", function (o) {
        var r = void 0, s = void 0;
        (r = this.querySelector("form.will-submit")) && (this.classList.add("is-loading"), s = i(r.getAttribute("action"), {
            method: r.getAttribute("method"),
            body: e.param(e(r).serializeArray()),
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }), s.then(function (e) {
            return function (i) {
                var o = void 0, r = void 0, s = void 0;
                return s = n(i.job.url, {headers: {accept: "application/json"}}), o = function () {
                    return t(e.closest(".js-menu-container")), location.reload()
                }, r = function () {
                    return e.classList.add("has-error")
                }, s.then(o, r)
            }
        }(this)), r.classList.remove("will-submit"), o.preventDefault())
    })
}.call(this), define("github/date-input", ["exports", "./jquery"], function (e, t) {
    function i(e) {
        return e && e.__esModule ? e : {"default": e}
    }

    function n(e, t) {
        "object" != typeof t && (t = {}), o["default"].extend(this, n.DEFAULT_OPTS, t), this.input = o["default"](e), this.bindMethodsToObj("show", "hide", "hideIfClickOutside", "keydownHandler", "selectDate"), this.build(), this.selectDate(), this.show(), this.input.hide(), this.input.data("datePicker", this)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e["default"] = n;
    var o = i(t);
    n.DEFAULT_OPTS = {
        month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        short_month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        short_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        start_of_week: 1
    }, n.prototype = {
        build: function () {
            var e = o["default"]('<p class="month-nav"><span class="date-button prev" title="[Page-Up]">\u25c0</span> <span class="month-name"></span> <span class="date-button next" title="[Page-Down]">\u25b6</span></p>');
            this.monthNameSpan = o["default"](".month-name", e), o["default"](".prev", e).click(this.bindToObj(function () {
                this.moveMonthBy(-1)
            })), o["default"](".next", e).click(this.bindToObj(function () {
                this.moveMonthBy(1)
            }));
            var t = o["default"]('<p class="year-nav"><span class="date-button prev" title="[Ctrl+Page-Up]">\u25c0</span> <span class="year-name"></span> <span class="date-button next" title="[Ctrl+Page-Down]">\u25b6</span></p>');
            this.yearNameSpan = o["default"](".year-name", t), o["default"](".prev", t).click(this.bindToObj(function () {
                this.moveMonthBy(-12)
            })), o["default"](".next", t).click(this.bindToObj(function () {
                this.moveMonthBy(12)
            }));
            var i = o["default"]("<div></div>").append(e, t), n = "<table><thead><tr>";
            o["default"](this.adjustDays(this.short_day_names)).each(function () {
                n += "<th>" + this + "</th>"
            }), n += "</tr></thead><tbody></tbody></table>", this.dateSelector = this.rootLayers = o["default"]('<div class="date-selector"></div>').append(i, n).insertAfter(this.input), this.tbody = o["default"]("tbody", this.dateSelector), this.input.change(this.bindToObj(function () {
                this.selectDate()
            })), this.selectDate()
        }, selectMonth: function (e) {
            var t = new Date(e.getFullYear(), e.getMonth(), 1);
            if (!this.currentMonth || this.currentMonth.getFullYear() != t.getFullYear() || this.currentMonth.getMonth() != t.getMonth()) {
                this.currentMonth = t;
                for (var i = this.rangeStart(e), n = this.rangeEnd(e), r = this.daysBetween(i, n), s = "", a = 0; r >= a; a++) {
                    var u = new Date(i.getFullYear(), i.getMonth(), i.getDate() + a, 12, 0);
                    this.isFirstDayOfWeek(u) && (s += "<tr>"), s += u.getMonth() == e.getMonth() ? '<td class="selectable-day" date="' + this.dateToString(u) + '">' + u.getDate() + "</td>" : '<td class="unselected-month" date="' + this.dateToString(u) + '">' + u.getDate() + "</td>", this.isLastDayOfWeek(u) && (s += "</tr>")
                }
                this.tbody.empty().append(s), this.monthNameSpan.empty().append(this.monthName(e)), this.yearNameSpan.empty().append(this.currentMonth.getFullYear()), o["default"](".selectable-day", this.tbody).mousedown(this.bindToObj(function (e) {
                    this.changeInput(o["default"](e.target).attr("date"))
                })), o["default"]("td[date='" + this.dateToString(new Date) + "']", this.tbody).addClass("today"), o["default"]("td.selectable-day", this.tbody).mouseover(function () {
                    o["default"](this).addClass("hover")
                }), o["default"]("td.selectable-day", this.tbody).mouseout(function () {
                    o["default"](this).removeClass("hover")
                })
            }
            o["default"](".selected", this.tbody).removeClass("selected"), o["default"]('td[date="' + this.selectedDateString + '"]', this.tbody).addClass("selected")
        }, selectDate: function (e) {
            "undefined" == typeof e && (e = this.stringToDate(this.input.val())), e || (e = new Date), this.selectedDate = e, this.selectedDateString = this.dateToString(this.selectedDate), this.selectMonth(this.selectedDate)
        }, resetDate: function () {
            o["default"](".selected", this.tbody).removeClass("selected"), this.changeInput("")
        }, changeInput: function (e) {
            this.input.val(e).change(), this.hide()
        }, show: function () {
            this.rootLayers.css("display", "block"), o["default"]([window, document.body]).click(this.hideIfClickOutside), this.input.unbind("focus", this.show), this.rootLayers.keydown(this.keydownHandler), this.setPosition()
        }, hide: function () {
        }, hideIfClickOutside: function (e) {
            e.target == this.input[0] || this.insideSelector(e) || this.hide()
        }, insideSelector: function (e) {
            var t = o["default"](e.target);
            return t.parents(".date-selector").length || t.is(".date-selector")
        }, keydownHandler: function (e) {
            switch (e.keyCode) {
                case 9:
                case 27:
                    return void this.hide();
                case 13:
                    this.changeInput(this.selectedDateString);
                    break;
                case 33:
                    this.moveDateMonthBy(e.ctrlKey ? -12 : -1);
                    break;
                case 34:
                    this.moveDateMonthBy(e.ctrlKey ? 12 : 1);
                    break;
                case 38:
                    this.moveDateBy(-7);
                    break;
                case 40:
                    this.moveDateBy(7);
                    break;
                case 37:
                    this.moveDateBy(-1);
                    break;
                case 39:
                    this.moveDateBy(1);
                    break;
                default:
                    return
            }
            e.preventDefault()
        }, stringToDate: function (e) {
            var t = e.match(/^(\d{1,2}) ([^\s]+) (\d{4,4})$/);
            return t ? new Date(t[3], this.shortMonthNum(t[2]), t[1], 12, 0) : null
        }, dateToString: function (e) {
            return e.getDate() + " " + this.short_month_names[e.getMonth()] + " " + e.getFullYear()
        }, setPosition: function () {
            var e = this.input.offset();
            this.rootLayers.css({
                top: e.top + this.input.outerHeight(),
                left: e.left
            }), this.ieframe && this.ieframe.css({
                width: this.dateSelector.outerWidth(),
                height: this.dateSelector.outerHeight()
            })
        }, moveDateBy: function (e) {
            var t = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate() + e);
            this.selectDate(t)
        }, moveDateMonthBy: function (e) {
            var t = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + e, this.selectedDate.getDate());
            t.getMonth() == this.selectedDate.getMonth() + e + 1 && t.setDate(0), this.selectDate(t)
        }, moveMonthBy: function (e) {
            var t = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + e, this.currentMonth.getDate());
            this.selectMonth(t)
        }, monthName: function (e) {
            return this.month_names[e.getMonth()]
        }, bindToObj: function (e) {
            var t = this;
            return function () {
                return e.apply(t, arguments)
            }
        }, bindMethodsToObj: function () {
            for (var e = 0; e < arguments.length; e++)this[arguments[e]] = this.bindToObj(this[arguments[e]])
        }, indexFor: function (e, t) {
            for (var i = 0; i < e.length; i++)if (t == e[i])return i
        }, monthNum: function (e) {
            return this.indexFor(this.month_names, e)
        }, shortMonthNum: function (e) {
            return this.indexFor(this.short_month_names, e)
        }, shortDayNum: function (e) {
            return this.indexFor(this.short_day_names, e)
        }, daysBetween: function (e, t) {
            return e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate()), t = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), (t - e) / 864e5
        }, changeDayTo: function (e, t, i) {
            var n = i * (Math.abs(t.getDay() - e - 7 * i) % 7);
            return new Date(t.getFullYear(), t.getMonth(), t.getDate() + n)
        }, rangeStart: function (e) {
            return this.changeDayTo(this.start_of_week, new Date(e.getFullYear(), e.getMonth()), -1)
        }, rangeEnd: function (e) {
            return this.changeDayTo((this.start_of_week - 1) % 7, new Date(e.getFullYear(), e.getMonth() + 1, 0), 1)
        }, isFirstDayOfWeek: function (e) {
            return e.getDay() == this.start_of_week
        }, isLastDayOfWeek: function (e) {
            return e.getDay() == (this.start_of_week - 1) % 7
        }, adjustDays: function (e) {
            for (var t = [], i = 0; i < e.length; i++)t[i] = e[(i + this.start_of_week) % 7];
            return t
        }
    }
}), function () {
    var e = require("github/jquery")["default"], t = require("github/date-input")["default"], i = require("github/has-interactions"), n = i.hasDirtyFields, o = require("github/observe"), r = o.observe;
    r("input.js-date-input", function () {
        e(this).next(".date-selector").remove(), new t(this)
    }), e(document).on("click", ".js-date-input-clear", function () {
        return e("input.js-date-input").data("datePicker").resetDate(), !1
    }), e(document).on("change click", ".js-milestone-edit-form", function () {
        var e = this.querySelector(".js-milestone-edit-cancel");
        n(this) ? e.setAttribute("data-confirm", e.getAttribute("data-confirm-changes")) : e.removeAttribute("data-confirm")
    })
}(), function () {
    function e(e) {
        return e.classList.contains("read") ? void 0 : (e.classList.toggle("unread"), e.classList.toggle("read"))
    }

    var t = require("github/jquery")["default"];
    t(document).on("click", ".js-notification-target", function (t) {
        t.which > 1 || e(this.closest(".js-notification"))
    }), t(document).on("ajaxSuccess", ".js-delete-notification", function () {
        e(this.closest(".js-notification"))
    }), t(document).on("ajaxSuccess", ".js-mute-notification", function () {
        var t = void 0;
        e(this.closest(".js-notification")), t = this.closest(".js-notification"), t.classList.contains("muted") ? this.action = this.action.replace("unmute", "mute") : this.action = this.action.replace("mute", "unmute"), t.classList.toggle("muted")
    }), t(document).on("ajaxSuccess", ".js-unmute-notification", function () {
        var e = void 0;
        e = this.closest(".js-notification"), e.classList.contains("muted") ? this.action = this.action.replace("unmute", "mute") : this.action = this.action.replace("mute", "unmute"), e.classList.toggle("muted")
    }), t(document).on("ajaxSuccess", ".js-mark-visible-as-read", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
        for (e = this.closest(".js-notifications-browser"), o = e.querySelectorAll(".unread"), i = 0, n = o.length; n > i; i++)t = o[i], t.classList.remove("unread"), t.classList.add("read");
        return null != (r = e.querySelector(".js-mark-visible-as-read")) && r.classList.add("mark-all-as-read-confirmed"), null != (s = e.querySelector(".js-mark-as-read-confirmation")) ? s.classList.add("mark-all-as-read-confirmed") : void 0
    }), t(document).on("ajaxSuccess", ".js-mark-remaining-as-read", function () {
        var e = void 0, t = void 0, i = void 0;
        return e = this.closest(".js-notifications-browser"), null != (t = e.querySelector(".js-mark-remaining-as-read")) && t.classList.add("d-none"), null != (i = e.querySelector(".js-mark-remaining-as-read-confirmation")) ? i.classList.remove("d-none") : void 0
    }), t(document).on("navigation:keydown", ".js-notification", function (e) {
        switch (e.hotkey) {
            case"I":
            case"e":
            case"y":
                return t(this).find(".js-delete-notification").submit(), !1;
            case"M":
            case"m":
                return t(this).find(".js-mute-notification").submit(), !1
        }
    }), t(document).on("navigation:keyopen", ".js-notification", function () {
        e(this)
    }), t(document).on("ajaxSend", ".js-notifications-subscription", function () {
        this.querySelector(".js-spinner").classList.remove("d-none")
    }), t(document).on("ajaxComplete", ".js-notifications-subscription", function () {
        this.querySelector(".js-spinner").classList.add("d-none")
    })
}.call(this), function () {
    function e() {
        t(".js-setting-toggle .js-status-indicator").removeClass("status-indicator-success").removeClass("status-indicator-loading").removeClass("status-indicator-failed")
    }

    var t = require("github/jquery")["default"], i = require("github/updatable-content"), n = i.replaceContent;
    t(document).on("ajaxSend", ".js-setting-toggle", function () {
        e(), t(this).find(".js-status-indicator").addClass("status-indicator-loading")
    }), t(document).on("ajaxError", ".js-setting-toggle", function () {
        e(), t(this).find(".js-status-indicator").addClass("status-indicator-failed")
    }), t(document).on("ajaxSuccess", ".js-setting-toggle", function () {
        e(), t(this).find(".js-status-indicator").addClass("status-indicator-success")
    }), t(document).on("change", ".js-participating-email input, .js-subscribed-email input", function () {
        t(".js-participating-email input:checked")[0] || t(".js-subscribed-email input:checked")[0] ? t(".js-notification-emails").removeClass("d-none") : t(".js-notification-emails").addClass("d-none")
    }), t(document).on("ajaxSend", ".js-unignore-form, .js-ignore-form", function () {
        t(this).closest(".js-subscription-row").addClass("loading")
    }), t(document).on("ajaxError", ".js-unignore-form, .js-ignore-form", function () {
        t(this).closest(".js-subscription-row").removeClass("loading"), t(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem unignoring this repo.")
    }), t(document).on("ajaxSuccess", ".js-unignore-form", function () {
        t(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
    }), t(document).on("ajaxSuccess", ".js-ignore-form", function () {
        t(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
    }), t(document).on("ajaxSend", ".js-unsubscribe-form, .js-subscribe-form", function () {
        t(this).closest(".js-subscription-row").addClass("loading")
    }), t(document).on("ajaxError", ".js-unsubscribe-form, .js-subscribe-form", function () {
        t(this).closest(".js-subscription-row").removeClass("loading"), t(this).find(".btn-sm").addClass("btn-danger").attr("title", "There was a problem with unsubscribing :(")
    }), t(document).on("ajaxSuccess", ".js-unsubscribe-form", function () {
        t(this).closest(".js-subscription-row").removeClass("loading").addClass("unsubscribed")
    }), t(document).on("ajaxSuccess", ".js-subscribe-form", function () {
        t(this).closest(".js-subscription-row").removeClass("loading unsubscribed")
    }), t(document).on("ajaxSuccess", ".js-thread-subscription-status", function (e, t, i, o) {
        n(document.querySelector(".js-thread-subscription-status"), o)
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
    i = require("delegated-events").fire, r = require("github/observe").observe, e(document).on("ajaxSend", ".js-toggler-container .js-set-approval-state", function () {
        return this.closest(".js-toggler-container").classList.add("loading")
    }), e(document).on("ajaxComplete", ".js-toggler-container .js-set-approval-state", function () {
        return this.closest(".js-toggler-container").classList.remove("loading")
    }), e(document).on("ajaxSuccess", ".js-toggler-container .js-set-approval-state", function (e, t, i, n) {
        if (1 === n.approval_state)this.closest(".js-toggler-container").classList.add("on"); else if (2 === n.approval_state) {
            var o = this.closest(".js-toggler-container");
            o.classList.add("revoked"), o.classList.remove("on")
        }
    }), e(document).on("ajaxSuccess", ".js-request-approval-facebox-form", function () {
        var e = void 0;
        return e = this.getAttribute("data-container-id"), document.getElementById(e).classList.add("on"),
            i(document, "facebox:close")
    }), s = function (e) {
        return e.querySelectorAll(".js-integrations-install-repo-picked .js-repository-picker-result").length
    }, t = function (e) {
        return s(e) > 0
    }, o = function (e) {
        var t = +e.getAttribute("data-max-repos");
        return t ? s(e) >= t : void 0
    }, n = function (e) {
        var i = void 0;
        return i = e.querySelector(".js-all-repositories-radio"), i.checked || t(e)
    }, a = function () {
        var t = 0;
        0 !== document.querySelectorAll(".js-integrations-install-repo-picked:not(.d-none)").length && (t = document.querySelectorAll(".js-repository-picker-result:not(.d-none)").length);
        var i = "";
        if (t > 0) {
            var n = t > 1 ? "repositories" : "repository";
            i = "Selected " + t + " " + n
        }
        return e(".js-integration-total-repos").text(i)
    }, r(".js-integrations-install-form", function () {
        var t = void 0, i = void 0, r = void 0, s = void 0, u = void 0, c = void 0;
        u = this, s = u.querySelector(".js-integrations-install-form-submit"), t = u.querySelector(".js-autocomplete"), r = t.getAttribute("data-search-url"), i = u.querySelector(".js-autocomplete-field"), c = function () {
            return s.disabled = !n(this), null !== u.querySelector(".flash") ? (i.disabled = o(this), u.querySelector(".flash").classList.toggle("d-none", !o(this))) : void 0
        }, this.addEventListener("change", c), c.call(this), e(document).on("click", ".js-repository-picker-remove", function () {
            var e = void 0;
            return e = this.closest(".js-repository-picker-result"), e.remove(), 0 === document.querySelector(".js-integrations-install-repo-picked").children.length && document.querySelector(".js-min-repository-error").classList.remove("d-none"), a(), c.call(u)
        }), e(document).on("focus", ".js-integrations-install-repo-picker .js-autocomplete-field", function () {
            return document.querySelector(".js-select-repositories-radio").checked = !0, c.call(u)
        }), e(document).on("autocomplete:autocompleted:changed", ".js-integrations-install-repo-picker", function () {
            var e = void 0, i = void 0, n = void 0, o = void 0, s = void 0;
            for (s = r, o = document.querySelectorAll(".js-integrations-install-repo-picked .js-selected-repository-field"), i = 0, n = o.length; n > i; i++)e = o[i], s += ~s.indexOf("?") ? "&" : "?", s += e.name + "=" + encodeURIComponent(e.value);
            return t.setAttribute("data-search-url", s)
        }), e(document).on("autocomplete:result", ".js-integrations-install-repo-picker", function (e, t) {
            var n = this.querySelector("#repo-result-" + t), o = u.querySelector(".js-integrations-install-repo-picked");
            return n.classList.remove("d-none"), o.insertBefore(n, o.firstChild), i.value = "", u.querySelector(".js-autocomplete-results").innerHTML = "", document.querySelector(".js-min-repository-error").classList.add("d-none"), a(), c.call(u)
        }), e(document).on("click", ".js-all-repositories-radio", function () {
            document.querySelector(".js-integrations-install-repo-picked, .js-min-repository-error").classList.add("d-none"), a()
        }), e(document).on("click", ".js-select-repositories-radio", function () {
            document.querySelector(".js-integrations-install-repo-picked").classList.remove("d-none"), a()
        }), e(document).on("submit", ".js-integrations-install-form", function () {
            this.querySelector(".js-all-repositories-radio").checked ? Array.from(this.querySelectorAll('input[name="repository_ids[]"]')).forEach(function (e) {
                return e.remove()
            }) : e(".js-autocomplete-results").empty()
        })
    })
}.call(this), function () {
    var e = require("delegated-events"), t = e.on;
    t("submit", ".org form[data-results-container]", function (e) {
        e.preventDefault()
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = void 0, n = void 0;
    n = require("github/fetch").fetchText, i = function () {
        return e(Array.from(e(".js-invitation-toggle-team:checked")).filter(t))
    }, e(document).on("click", ".js-invitations-team-suggestions-view-all", function () {
        return n(this.href).then(function (t) {
            return function (n) {
                var o = void 0, r = void 0;
                return r = i().map(function () {
                    return this.value
                }), o = e(t).closest("ul"), o.html(n), r.each(function () {
                    return o.find(".js-invitation-toggle-team[value=" + this + "]").prop("checked", !0)
                })
            }
        }(this)), !1
    })
}.call(this), function () {
    function e() {
        var e = document.querySelector(".js-org-reinstate-forms"), t = document.querySelectorAll(".js-org-reinstate-option:checked");
        if (e && 1 === t.length) {
            for (var i = t[0].getAttribute("data-form"), n = e.getElementsByClassName("js-togglable-form"), o = 0; o < n.length; o++) {
                var r = n[o];
                r.classList.add("d-none")
            }
            var s = document.getElementById(i);
            s.classList.remove("d-none")
        }
    }

    var t = require("delegated-events"), i = t.on, n = require("github/observe"), o = n.observe;
    i("change", ".js-org-reinstate-option", e), o(".js-org-reinstate-forms", e)
}.call(this), define("github/org-sidebar-stats", ["exports", "./inflector"], function (e, t) {
    function i(e, i) {
        var n = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2], o = e.querySelector("." + i), r = o.parentNode.querySelector(".js-stat-label");
        o.textContent = n, t.pluralizeNode(n, r)
    }

    Object.defineProperty(e, "__esModule", {value: !0}), e.updateStat = i
}), function () {
    function e() {
        var e = Array.from(document.querySelectorAll(".js-bulk-actions-container .js-bulk-actions-toggle:checked"));
        return e.map(function (e) {
            return e.closest(".js-bulk-actions-item").getAttribute("data-bulk-actions-id")
        }).sort()
    }

    var t = require("github/jquery")["default"], i = require("github/sudo")["default"], n = require("github/fetch"), o = n.fetchText, r = require("delegated-events"), s = r.on, a = require("github/org-sidebar-stats"), u = a.updateStat, c = require("github/setimmediate")["default"], l = require("github/focused"), d = l.onFocusedKeydown, h = require("github/throttled-input"), f = h.dispatchThrottledInputEvent, v = require("github/facebox")["default"];
    s("click", ".js-member-remove-confirm-button", function (t) {
        t.preventDefault();
        var i = new URL(this.getAttribute("data-url"), window.location.origin), n = new URLSearchParams(i.search.slice(1)), r = this.getAttribute("data-member-id");
        if (r)n.append("member_ids[]", r); else for (var s = e(), a = 0; a < s.length; a++) {
            var u = s[a];
            n.append("member_ids[]", u)
        }
        i.search = n.toString(), v(function () {
            o(i.toString()).then(v)
        })
    }), s("click", ".js-member-search-filter", function (e) {
        e.preventDefault();
        var t = this.getAttribute("data-filter"), i = this.closest(".js-select-menu").getAttribute("data-filter-on"), n = document.querySelector(".js-member-filter-field"), o = n.value, r = new RegExp(i + ":[a-z]+"), s = o.toString().trim().replace(r, "");
        n.value = (s + " " + t).replace(/\s\s/, " "), n.focus(), f(n)
    }), t(document).on("ajaxSend ajaxComplete", ".js-add-team-member-or-repo-form", function (e) {
        this === e.target && this.classList.toggle("is-sending", "ajaxSend" === e.type)
    });
    var m = navigator.userAgent.match(/Macintosh/) ? "meta" : "ctrl";
    d(document, ".js-add-team-member-or-repo-form .js-autocomplete-field", function () {
        return function (e) {
            return "enter" === e.hotkey || e.hotkey === m + "+enter" ? e.preventDefault() : void 0
        }
    }), t(document).on("autocomplete:result", ".js-bulk-add-team-form .js-autocomplete-field", function (e) {
        var n = this, r = t(this).data("autocompleted");
        r.indexOf("/") > 0 && !function () {
            var t = n.form.action, r = n.form.method, s = new FormData(n.form);
            i().then(function () {
                v(function () {
                    o(t, {method: r, body: s}).then(v)
                })
            }), e.stopPropagation()
        }()
    }), t(document).on("autocomplete:result", ".js-add-team-member-or-repo-form", function () {
        return c(function (e) {
            return function () {
                return t(e).submit()
            }
        }(this))
    }), t(document).on("ajaxSuccess", ".js-add-team-member-or-repo-form", function (e, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, c = void 0, l = void 0, d = void 0;
        try {
            d = JSON.parse(i.responseText)
        } catch (h) {
        }
        d ? (n = t(d.list_item_html), d.stat_count_class && null != d.item_count && u(document.body, d.stat_count_class, d.item_count)) : n = t(i.responseText), o = t(".js-member-list"), this.querySelector(".js-autocomplete-field").value = "";
        var f = n.attr("data-login");
        if (f)for (l = o.children(), r = 0, a = l.length; a > r; r++)if (s = l[r], s.getAttribute("data-login") === f)return;
        return o.prepend(n), c = !o.children().length, o.closest(".js-org-section").toggleClass("is-empty", c), o.siblings(".js-subnav").addClass("subnav-bordered")
    }), t(document).on("ajaxSuccess", ".js-remove-team-repository", function (e, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
        o = t(this), n = o.closest(".js-org-section"), r = n.find(".js-org-list"), o.closest(".js-org-repo").remove(), s = !r.children().length, n.toggleClass("is-empty", s), s && (r.removeClass("table-list-bordered"), r.siblings(".js-subnav").removeClass("subnav-bordered"));
        try {
            a = JSON.parse(i.responseText)
        } catch (c) {
        }
        return a && null != a.item_count ? u(document.body, "js-repositories-count", a.item_count) : void 0
    }), t(document).on("ajaxError", ".js-add-team-member-or-repo-form, .js-remove-team-repository", function (e, i) {
        var n = void 0, o = void 0, r = void 0;
        if (!/<html/.test(i.responseText)) {
            o = t(".js-member-list, .js-member-listings-container").siblings(".js-blankslate");
            try {
                r = JSON.parse(i.responseText), n = r.message_html
            } catch (s) {
                n = t(i.responseText)
            }
            return t(".flash-messages").remove(), o.before(n), !1
        }
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("delegated-events"), i = t.on, n = require("github/facebox")["default"];
    i("click", ".js-remove-member-button", function (t) {
        t.preventDefault();
        var i = t.currentTarget;
        return n(function () {
            var t = void 0;
            return t = e.ajax({
                url: i.getAttribute("data-url"),
                data: {
                    member_ids: [i.getAttribute("data-user-id")],
                    redirect_to_path: i.getAttribute("data-redirect-to-path")
                }
            }), t.done(function (e) {
                return n(e)
            })
        })
    })
}.call(this), function () {
    var e = require("delegated-events").on;
    e("change", ".js-change-org-role-selector", function (e) {
        var t = e.target.form.querySelector(".js-change-org-role-submit");
        t && (t.disabled = !1)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0;
    i = require("github/debounce")["default"], e(document).on("change", ".js-customize-member-privileges-default-repository-permission-radio", function () {
        var e = void 0;
        return e = document.querySelector(".js-migrate-ability-list-item-default-repository-permission"), e.classList.toggle("migrate-ability-not-possible", n()), s()
    }), e(document).on("change", ".js-customize-member-privileges-repository-creation-radio", function () {
        var e = void 0;
        return e = document.querySelector(".js-migrate-ability-list-item-members-can-create-repositories"), e.classList.toggle("migrate-ability-not-possible", o()), s()
    }), e(document).on("change", ".js-customize-member-privileges-team-privacy-radio", function () {
        var e = void 0;
        return e = document.querySelector(".js-migrate-ability-list-item-team-privacy"), e.classList.toggle("migrate-ability-not-possible", r()), s()
    }), s = function () {
        var e = void 0;
        return e = document.querySelector(".js-save-member-privileges-button-container"), e.classList.toggle("member-privilege-radios-preserved", t())
    }, n = function () {
        return "" === document.querySelector(".js-customize-member-privileges-default-repository-permission-radio:checked").value
    }, o = function () {
        return "0" === document.querySelector(".js-customize-member-privileges-repository-creation-radio:checked").value
    }, r = function () {
        return "secret" === document.querySelector(".js-customize-member-privileges-team-privacy-radio:checked").value
    }, t = function () {
        return n() && o() && r()
    }, e(function () {
        var e = void 0, t = void 0, n = void 0, o = void 0, r = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        return a = document.querySelector(".js-org-migration-settings-sidebar"), null != a ? (u = a.getBoundingClientRect(), c = 16, l = u.top + window.pageYOffset - c, t = a.style.position, n = a.style.top, e = a.style.left, o = a.style.width, r = i(function () {
            var i = void 0, r = void 0;
            return i = a.parentNode.getBoundingClientRect(), r = i.right - u.width, window.pageYOffset >= l ? (a.style.position = "fixed", a.style.top = c + "px", a.style.left = r + "px", a.style.width = "250px") : (a.style.position = t, a.style.top = n, a.style.left = e, a.style.width = o)
        }, 5), window.addEventListener("scroll", r, {passive: !0}), window.addEventListener("resize", r, {passive: !0}), s()) : void 0
    })
}.call(this), function () {
    var e = void 0, t = void 0, i = void 0;
    e = require("github/fetch").fetchText, t = require("github/observe").observe;
    var n = require("github/throttled-input"), o = n.addThrottledInputEventListener;
    t(".js-rename-owners-team-input", function () {
        o(this, function () {
            var t = void 0, n = void 0, o = void 0, r = void 0;
            return t = this.form, n = this.value.trim().toLowerCase(), "owners" === n || "" === n ? i(!1, "") : (t.classList.add("is-sending"), r = new URL(this.getAttribute("data-check-url"), window.location.origin), o = new URLSearchParams(r.search.slice(1)), o.append("name", n), r.search = o.toString(), e(r.toString()).then(function (e) {
                var n = void 0;
                return e = e.trim(), n = "" === e, t.classList.remove("is-sending"), i(n, e)
            }))
        })
    }), i = function (e, t) {
        return document.querySelector(".js-rename-owners-team-button").classList.toggle("disabled", !e), document.querySelector(".js-rename-owners-team-errors").innerHTML = t, document.querySelector(".js-rename-owners-team-note").classList.toggle("d-none", "" !== t)
    }
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/focused"), i = t.onFocusedInput;
    i(document, ".js-new-organization-name", function () {
        var e = void 0;
        return (e = this.closest("dd").querySelector(".js-field-hint-name")) ? function () {
            return "innerText" in e ? e.innerText = this.value : e.textContent = this.value
        } : void 0
    }), e(document).on("ajaxSend", ".js-org-list-item .js-org-remove-item", function () {
        return this.closest(".js-org-list-item").classList.add("d-none")
    }), e(document).on("ajaxSuccess", ".js-org-list-item .js-org-remove-item", function () {
        return this.closest(".js-org-list-item").remove()
    }), e(document).on("ajaxError", ".js-org-list-item .js-org-remove-item", function () {
        this.closest(".js-org-list-item").classList.remove("d-none");
        var e = this.getAttribute("data-error-message");
        return e ? alert(e) : void 0
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0;
    e(document).on("click", ".js-org-billing-plans .js-choose-plan", function () {
        return t(e(this).closest(".js-plan-row")), !1
    }), t = function (t) {
        var n = void 0, o = void 0, r = void 0, s = void 0;
        return r = t.attr("data-name"), o = parseInt(t.attr("data-cost"), 10), n = parseInt(null != (s = t.attr("data-balance")) ? s : "0", 10), e(".js-org-billing-plans").find(".js-plan-row, .js-choose-plan").removeClass("selected"), t.find(".js-choose-plan").addClass("selected"), t.addClass("selected"), e(".js-plan").val(r), 0 === o && 0 === n ? e(".js-billing-section").addClass("has-removed-contents") : (e(".js-billing-section").removeClass("has-removed-contents"), null != t.attr("data-balance") ? i(r) : void 0)
    }, i = function (t) {
        return e(".js-plan-change-message").addClass("d-none"), e('.js-plan-change-message[data-name="' + t + '"]').removeClass("d-none")
    }, e(function () {
        return e(".selected .js-choose-plan").click()
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0;
    t = function (t) {
        var i = void 0, n = void 0, o = void 0, r = void 0;
        n = t.selectors;
        for (o in n)r = n[o], e(o).text(r);
        return i = 100 === t.filled_seats_percent, e(".js-live-update-seats-percent").css("width", t.filled_seats_percent + "%"), e(".js-need-more-seats").toggleClass("d-none", !i), e(".js-add-team-member-or-repo-form").toggleClass("d-none", i)
    }, e(document).on("ajaxSuccess", ".js-per-seat-invite-field, .js-per-seat-invite .js-org-remove-item", function (e, i) {
        return t(JSON.parse(i.responseText))
    })
}.call(this), function () {
    var e = require("delegated-events"), t = e.on, i = require("github/fetch"), n = i.fetchText, o = require("github/hotkey")["default"], r = require("github/observe"), s = r.observe, a = require("github/throttled-input"), u = a.dispatchThrottledInputEvent, c = require("github/facebox")["default"];
    t("click", ".js-repo-search-filter", function () {
        var e = this.getAttribute("data-filter"), t = this.getAttribute("data-negate"), i = document.querySelector(".js-repo-filter-field"), n = i.value;
        if (n.indexOf(t) > -1 && (n = n.replace(t, ""), n = n.replace(/^\s*/, "")), -1 === n.indexOf(e)) {
            var o = n && n.match(/\s$/) ? "" : " ";
            i.value = "" + n + o + e + " ", i.focus(), u(i)
        }
        document.body.classList.remove("menu-active")
    }), s(".js-repository-fallback-search", function () {
        this.addEventListener("keypress", function (e) {
            if ("enter" === o(e)) {
                var t = new URL(this.getAttribute("data-url"), window.location.origin), i = new URLSearchParams(t.search.slice(1)), n = i.get("q") || "";
                i.set("q", n + " " + this.value), t.search = i.toString(), window.location = t.toString()
            }
        })
    }), t("click", ".js-team-repo-higher-access", function () {
        var e = this.getAttribute("data-url");
        c(function () {
            n(e).then(c)
        })
    })
}(), function () {
    var e = require("github/jquery")["default"];
    e(document).on("selectmenu:selected", ".js-select-repo-permission", function () {
        return e(this).submit()
    }), e(document).on("ajaxSend", ".js-select-repo-permission", function () {
        return this.classList.remove("was-successful")
    }), e(document).on("ajaxSuccess", ".js-select-repo-permission", function (e, t, i, n) {
        var o = void 0;
        return this.classList.add("was-successful"), null != (o = this.closest(".js-org-repo")) ? o.classList.toggle("with-higher-access", n.members_with_higher_access) : void 0
    })
}(), function () {
    var e = require("github/observe"), t = e.observe, i = require("github/facebox")["default"];
    t(".js-two-factor-needs-enforced", function () {
        this.addEventListener("submit", function (e) {
            var t = e.target, n = t.querySelector("input[type=checkbox]");
            n.checked && (e.preventDefault(), i({div: "#confirm-2fa-requirement"}))
        })
    }), t(".js-two-factor-enforcement-poller", function () {
        var e = this.getAttribute("data-redirect-url");
        this.addEventListener("load", function () {
            window.location.href = e
        })
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(document).on("click", ".js-change-default-repository-permission-confirm", function (t) {
        t.preventDefault(), e(document).find(".js-change-default-repository-permission-form").submit()
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/sudo")["default"];
    e(document).on("autocomplete:autocompleted:changed", ".js-team-add-user-name", function () {
        var t = void 0;
        return t = e(".js-team-add-user-button")[0], t.disabled = !e(this).data("autocompleted")
    }), e(document).on("click", ".js-team-remove-user", function (t) {
        var i = void 0;
        t.preventDefault(), e(".js-team-add-user-form").removeClass("d-none"), e(".js-team-add-user-name").focus(), i = e(this).closest("li").remove(), i.attr("data-login")
    }), e(document).on("click", ".js-team-add-user-button", function (i) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
        if (i.preventDefault(), o = e(".js-team-add-user-name"), u = o.val(), u && o.data("autocompleted")) {
            for (o.val(""), a = e(".js-team-user-logins li"), n = 0, r = a.length; r > n; n++)if (s = a[n], e(s).attr("data-login") === u)return;
            return t().then(function () {
                return e.ajax({
                    url: e(".js-team-add-user-form").attr("data-template-url"),
                    data: {member: u},
                    success: function (t) {
                        return e(".js-team-user-logins").append(t), e(".js-login-field").prop("disabled", !1), e(".js-team-add-user-form").addClass("d-none")
                    }
                }), e(".js-team-add-user-name").focus()
            })
        }
    })
}.call(this), function () {
    var e = void 0;
    e = require("github/observe").observe;
    var t = require("github/jquery")["default"], i = require("github/throttled-input"), n = i.addThrottledInputEventListener;
    t(document).on("ajaxSend", ".js-ldap-import-groups-container", function (e, t) {
        return t.setRequestHeader("X-Context", "import")
    }), t(document).on("autocomplete:autocompleted:changed", ".js-team-ldap-group-field", function () {
        var e = void 0;
        (e = this.closest(".js-ldap-group-adder")) && (e.classList.remove("is-exists"), e.querySelector(".js-ldap-group-adder-button").disabled = !t(this).data("autocompleted"))
    }), t(document).on("navigation:open", ".js-team-ldap-group-autocomplete-results .js-navigation-item", function () {
        var e = void 0, i = void 0;
        return e = t(this).closest(".js-ldap-group-adder"), i = t(this).attr("data-dn"), e.find(".js-team-ldap-dn-field").val(i), t(this).closest(".js-ldap-import-groups-container").find(".js-ldap-group-dn").map(function (n, o) {
            t(o).text() === i && (e.addClass("is-exists"), e[0].querySelector(".js-ldap-group-adder-button").disabled = !0)
        })
    }), t(document).on("ajaxSend", ".js-import-container", function () {
        this.classList.add("is-importing"), this.querySelector(".js-ldap-group-adder-button").disabled = !0
    }), t(document).on("ajaxComplete", ".js-import-container", function () {
        return t(this).removeClass("is-importing")
    }), t(document).on("ajaxSuccess", ".js-ldap-group-adder", function (e, i, n, o) {
        return t(this).closest(".js-ldap-import-groups-container").removeClass("is-empty").find(".js-ldap-imported-groups").prepend(t(o)), this.reset(), t(this).find(".js-team-ldap-group-field").focus(), this.querySelector(".js-ldap-group-adder-button").disabled = !0, t(".js-import-form-actions").removeClass("d-none")
    }), t(document).on("submit", ".js-team-remove-group", function () {
        this.closest(".js-team").classList.add("is-removing"), document.querySelector(".js-team-ldap-group-field").focus()
    }), t(document).on("ajaxSuccess", ".js-team-remove-group", function () {
        this.closest(".js-team").remove(), document.querySelector(".js-team:not(.is-removing)") || (document.querySelector(".js-ldap-import-groups-container").classList.add("is-empty"), document.querySelector(".js-import-form-actions").classList.add("d-none"))
    }), t(document).on("ajaxError", ".js-team-remove-group", function () {
        this.closest(".js-team").classList.remove("is-removing")
    }), t(document).on("click", ".js-edit-team", function (e) {
        return t(this).closest(".js-team").hasClass("is-removing") ? !1 : (e.preventDefault(), t(this).closest(".js-team").addClass("is-editing"), t(this).closest(".js-team").find(".js-team-name-field").focus())
    }), t(document).on("click", ".js-save-button", function () {
        return t(this).hasClass("disabled") ? !1 : t(this).closest(".js-team").addClass("is-sending")
    }), t(document).on("click", ".js-cancel-team-edit", function (e) {
        var i = void 0, n = void 0;
        return e.preventDefault(), n = t(this).closest(".js-team").removeClass("is-editing"), i = n.find(".js-team-form").removeClass("is-exists"), i.find(".js-slug").text(i.find(".js-slug").attr("data-original-slug")), i[0].reset()
    }), t(document).on("ajaxSuccess", ".js-team-form:not(.is-checking)", function (e, i, n, o) {
        return i.nameCheck ? void 0 : t(this).closest(".js-team").removeClass("is-editing").replaceWith(t(o))
    }), t(document).on("ajaxSuccess", ".js-team-form.is-checking", function (e, i, n, o) {
        var r = void 0, s = void 0;
        return r = t(this).removeClass("is-checking"), "function" == typeof(s = r.find(".js-team-name-field")).removeData && s.removeData("autocheck-xhr"), o.error ? (r.find(".js-save-button").addClass("disabled"), "exists" === o.error ? (r.addClass("is-exists"), r.find(".js-slug").html(o.slug)) : void 0) : (r.find(".js-slug").html(o.slug), r.find(".js-save-button").removeClass("disabled"))
    }), t(document).on("ajaxError", ".js-team-form", function (e, t) {
        return t.nameCheck && "abort" === t.statusText ? !1 : void 0
    }), e(".js-team-name-field", function () {
        n(this, function () {
            var e = void 0, i = void 0, n = void 0, o = void 0;
            return i = t(this), e = i.closest(".js-team-form"), null != (n = i.data("autocheck-xhr")) && n.abort(), e.removeClass("is-exists").addClass("is-checking"), e.find(".js-save-button").addClass("disabled"), o = t.ajax({
                url: i.attr("data-check-url"),
                type: "GET",
                context: this,
                data: {name: this.value}
            }), o.nameCheck = !0, i.data("autocheck-xhr", o)
        })
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("github/throttled-input"), i = t.dispatchThrottledInputEvent;
    e(document).on("click", ".js-show-own-teams", function () {
        var t = void 0, n = void 0, o = void 0, r = void 0;
        return t = e(".js-team-search-field"), r = t.val(), o = e(this).attr("data-me"), -1 === r.indexOf("@" + o) && (n = r ? " " : "", t.val("" + r + n + "@" + o), t.focus(), i(t[0])), !1
    })
}.call(this), function () {
    var e = void 0, t = void 0, i = void 0;
    t = require("github/fetch").fetchText, i = require("github/observe").observe;
    var n = require("github/throttled-input"), o = n.addThrottledInputEventListener;
    e = function (e) {
        var i = void 0, n = void 0, o = void 0, r = void 0;
        o = e.value.trim(), i = e.form, i.classList.add("is-sending"), i.classList.remove("is-name-check-fail"), i.classList.remove("is-name-check-success"), r = new URL(e.getAttribute("data-check-url"), window.location.origin), n = new URLSearchParams(r.search.slice(1)), n.append("name", o), r.search = n.toString(), t(r.toString()).then(function (t) {
            var n = void 0, r = void 0, s = void 0, a = void 0, u = void 0;
            return i.classList.remove("is-sending"), i.querySelector(".js-team-name-errors").innerHTML = t || "", s = null != (a = e.getAttribute("data-original")) ? a.trim() : void 0, r = s && o === s, n = !!i.querySelector(".js-error"), u = (n || !o) && !r, i.querySelector(".js-create-team-button").disabled = u, i.classList.toggle("is-name-check-fail", n), i.classList.toggle("is-name-check-success", !n && o)
        })
    }, i(".js-new-team", function () {
        o(this, function () {
            e(this)
        })
    }), i(".js-new-org-team", function () {
        var t = void 0;
        t = this.querySelector(".js-new-team"), t.value && e(t)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("delegated-events"), i = t.on, n = t.fire;
    i("click", ".js-team-description-toggle", function () {
        return e(".js-description-toggler").toggleClass("on")
    }), e(document).on("ajaxComplete", ".js-team-description-form", function () {
        var t = void 0;
        return t = e(".js-team-description-field").val(), e(".js-description-toggler").toggleClass("on"), t.trim() ? e(".js-team-description .description").text(t) : e(".js-team-description .description").html("<span class='link'>This team has no description</span>")
    }), e(document).on("ajaxSuccess", ".js-add-team-members-form", function (t, i) {
        var o = void 0;
        return o = e(document).find(".js-member-listings-container"), n(document, "facebox:close"), o.html(i.responseText)
    }), i("click", ".js-rename-owners-team-next-btn", function () {
        return document.querySelector(".js-rename-owners-team-about-content").classList.toggle("migrate-owners-content-hidden"), document.querySelector(".js-rename-owners-team-rename-form").classList.toggle("migrate-owners-content-hidden")
    })
}.call(this), function () {
    var e = require("github/observe"), t = e.observe;
    t(".js-org-transform-poller", function () {
        var e = void 0;
        e = this.getAttribute("data-redirect-url"), this.addEventListener("load", function () {
            return window.location.href = e
        })
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(function () {
        var t = void 0;
        return e("#load-readme").click(function () {
            var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0;
            return n = e("#gollum-editor-body"), i = e("#editor-body-buffer"), r = e("#undo-load-readme"), a = i.text(), t(n, i), o = e(this), o.prop("disabled", !0), o.text(o.attr("data-readme-name") + " loaded"), r.show(), s = function () {
                return e(this).val() !== a && r.hide(), n.off("change keyup", s)
            }, n.on("change keyup", s), !1
        }), e("#undo-load-readme").click(function () {
            var i = void 0;
            return t(e("#gollum-editor-body"), e("#editor-body-buffer")), i = e("#load-readme"), i.prop("disabled", !1), i.text("Load " + i.attr("data-readme-name")), e(this).hide(), !1
        }), t = function (t, i) {
            var n = void 0, o = void 0, r = void 0;
            return n = e(t), o = e(i), r = n.val(), n.val(o.text()), o.text(r)
        }
    })
}.call(this), function () {
    function e(e, t) {
        var i = e.querySelector("table.timeline-commits > tbody"), n = t.querySelectorAll("table.timeline-commits > tbody > tr.commit");
        Array.from(n).forEach(function (e) {
            i.appendChild(e)
        }), t.remove()
    }

    var t = require("github/observe"), i = t.observe;
    i(".discussion-item.discussion-commits", {
        add: function (t) {
            var i = t.previousElementSibling;
            i && i.matches(".discussion-item.discussion-commits") && !t.querySelector(".discussion-item-header") && e(i, t)
        }
    })
}(), function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/updatable-content"), n = i.replaceContent;
    e(document).on("details:toggled", ".js-pull-merging", function () {
        var i = void 0;
        i = e(this).find(".js-merge-pull-request"), i.toggleClass("is-dirty", Array.from(i).some(t))
    }), e(document).on("ajaxSuccess", ".js-merge-pull-request", function (t, i, o, r) {
        var s = void 0, a = void 0, u = void 0;
        this.reset(), e(this).removeClass("is-dirty"), a = r.updateContent;
        for (u in a) {
            s = a[u];
            var c = document.querySelector(u);
            c && n(c, s)
        }
    }), e(document).on("session:resume", function (t) {
        t = t.originalEvent;
        var i = document.getElementById(t.detail.targetId);
        if (i) {
            var n = e(i).closest(".js-merge-pull-request");
            n.closest(".js-details-container").addClass("open")
        }
    }), e(document).on("change", ".js-merge-method", function () {
        var e = this.closest(".js-merge-pr");
        e.classList.toggle("is-merging", "merge" === this.value), e.classList.toggle("is-squashing", "squash" === this.value), e.classList.toggle("is-rebasing", "rebase" === this.value);
        var t = e.closest(".js-pull-merging"), i = t.getAttribute("data-url");
        i = i.replace(/merge_type=(\w+)/, "merge_type=" + this.value), t.setAttribute("data-url", i)
    }), e(document).on("change", ".js-merge-button-toggle", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        for (n = this.closest(".js-merge-pr"), o = !this.checked, r = n.querySelectorAll(".js-merge-commit-button"), t = 0, i = r.length; i > t; t++)e = r[t], e.disabled = o
    }), e(document).on("navigation:open", ".js-merge-method-menu .js-navigation-item", function () {
        var e = this.closest(".js-merge-pr"), t = e.querySelector(".js-merge-title"), i = e.querySelector(".js-merge-message");
        t.defaultValue === t.value && (t.defaultValue = this.getAttribute("data-input-title-value")), i.defaultValue === i.value && (i.defaultValue = this.getAttribute("data-input-message-value"))
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0;
    t = require("github/fetch").fetchText, e(document).on("ajaxError", ".js-handle-pull-merging-errors", function (t, i) {
        var n = void 0, o = void 0, r = void 0;
        return n = this.closest(".js-pull-merging"), n.classList.add("is-error"), 422 === i.status && (r = i.responseText) && (o = n.querySelector(".js-pull-merging-error"), e(o).replaceWith(r)), !1
    }), e(document).on("click", ".js-pull-merging-refresh", function () {
        var i = void 0, n = void 0;
        return i = this.closest(".js-pull-merging"), n = i.getAttribute("data-url"), t(n).then(function (t) {
            return e(i).replaceWith(t)
        }), !1
    })
}.call(this), function () {
    function e() {
        i(".pull-request-ref-restore").removeClass("last").last().addClass("last")
    }

    function t() {
        var e = i("#js-pull-restorable").length;
        i(".js-pull-discussion-timeline").toggleClass("is-pull-restorable", e)
    }

    var i = require("github/jquery")["default"], n = require("github/observe"), o = n.observe;
    o(".pull-request-ref-restore", {add: e, remove: e}), o("#js-pull-restorable", {add: t, remove: t})
}(), function () {
    var e = require("github/jquery")["default"], t = require("delegated-events"), i = t.on;
    i("change", ".js-collab-checkbox", function () {
        Array.from(this.form.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        });
        var e = this.closest(".js-collab-option"), t = e.querySelector(".js-status-indicator");
        t.classList.remove("status-indicator-success", "status-indicator-failed"), t.classList.add("status-indicator-loading")
    }), e(document).on("ajaxSuccess", ".js-collab-form", function () {
        Array.from(this.querySelectorAll(".errored")).forEach(function (e) {
            return e.classList.remove("errored")
        }), Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-success")
        })
    }), e(document).on("ajaxError", ".js-collab-form", function (e) {
        Array.from(this.querySelectorAll(".status-indicator-loading")).forEach(function (e) {
            e.classList.remove("status-indicator-loading"), e.classList.add("status-indicator-failed");
            var t = e.closest(".js-collab-option");
            t.classList.add("errored");
            var i = t.querySelector(".js-collab-checkbox");
            i.checked = !i.checked
        }), Array.from(this.querySelectorAll(".status-indicator-success")).forEach(function (e) {
            e.classList.remove("status-indicator-success")
        }), e.preventDefault()
    })
}(), function () {
    var e = require("github/jquery")["default"];
    e(document).on("pjax:end", function () {
        e(".js-pull-refresh-on-pjax").trigger("socket:message")
    })
}(), function () {
    var e = require("github/jquery")["default"], t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
    i = require("github/fetch").fetchJSON, s = require("github/history").replaceState, n = require("github/observe").observe, o = require("github/pjax"), e(document).on("click", ".js-timeline-tags-expander", function () {
        return e(this).closest(".js-timeline-tags").removeClass("is-collapsed")
    }), a = ["is-default", "is-saving", "is-saved", "is-failed"], u = function (e, t) {
        var i = void 0;
        return (i = e.classList).remove.apply(i, a), e.classList.add(t), e.disabled = "is-saving" === t
    }, e(document).on("click", ".js-save-draft", function () {
        var t = void 0, n = void 0, o = void 0, r = void 0;
        return t = this, r = t.closest("form"), r.querySelector("#release_draft").value = "1", n = function (e) {
            return u(t, "is-saved"), setTimeout(function () {
                return u(t, "is-default")
            }, 5e3), r.dispatchEvent(new CustomEvent("release:saved", {
                bubbles: !0,
                cancelable: !1,
                detail: {release: e}
            }))
        }, o = function () {
            return u(t, "is-failed")
        }, i(r.action, {
            method: r.method,
            body: e(r).serialize(),
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
        }).then(n, o), u(t, "is-saving"), !1
    }), e(document).on("release:saved", ".js-release-form", function (t) {
        var i = void 0, n = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        a = t.originalEvent.detail.release, n = this, c = n.getAttribute("data-repo-url"),
            l = r("tag", c, a.tag_name), i = r("edit", c, a.tag_name), n.setAttribute("action", l), s(o.getState(), document.title, i);
        var d = document.querySelector("#delete_release_confirm form");
        return d && d.setAttribute("action", l), u = n.querySelector("#release_id"), u.value ? void 0 : (u.value = a.id, e(n).append('<input type="hidden" name="_method" value="put">'))
    }), e(document).on("click", ".js-publish-release", function () {
        return e("#release_draft").val("0")
    }), l = ["is-loading", "is-empty", "is-valid", "is-invalid", "is-duplicate", "is-pending"], c = function (t) {
        var i = void 0;
        switch (t) {
            case"is-valid":
                e(".release-target-wrapper").addClass("d-none");
                break;
            case"is-loading":
                break;
            default:
                e(".release-target-wrapper").removeClass("d-none")
        }
        return i = e(".js-release-tag"), i.removeClass(l.join(" ")), i.addClass(t)
    }, t = function (t) {
        return t.val() && t.val() !== t.data("last-checked") ? (c("is-loading"), e.ajax({
            url: t.attr("data-url"),
            type: "GET",
            data: {tag_name: t.val()},
            dataType: "json",
            success: function (i) {
                return "duplicate" === i.status && parseInt(t.attr("data-existing-id")) === parseInt(i.release_id) ? void c("is-valid") : (e(".js-release-tag .js-edit-release-link").attr("href", i.url), c("is-" + i.status))
            },
            error: function () {
                return c("is-invalid")
            },
            complete: function () {
                return t.data("last-checked", t.val())
            }
        })) : void 0
    }, r = function (e, t, i) {
        return t + "/releases/" + e + "/" + i
    }, e(document).on("blur", ".js-release-tag-field", function () {
        return t(e(this))
    }), n(".js-release-tag-field", function () {
        t(e(this))
    }), e(document).on("change", ".js-release-tag", function () {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
        if (n = e(this), t = n.closest("form"), i = t.find(".js-previewable-comment-form"), i.length) {
            for (o = i.data("base-preview-url"), o || (o = i.attr("data-preview-url"), o += o.indexOf("?") >= 0 ? "&" : "?", i.data("base-preview-url", o)), r = [], c = n.find('input[name="release[tag_name]"], input[name="release[target_commitish]"]:checked'), s = 0, u = c.length; u > s; s++)a = c[s], a.value && r.push({
                name: a.name,
                value: a.value
            });
            return i.attr("data-preview-url", o + e.param(r))
        }
    }), n(".js-release-form .js-previewable-comment-form", function () {
        e(this).closest("form").find(".js-release-tag").trigger("change")
    })
}.call(this), function () {
    document.addEventListener("facebox:reveal", function () {
        var e = void 0;
        e = document.querySelector("#facebox .js-fork-select-fragment"), e && e.setAttribute("src", e.getAttribute("data-url"))
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = void 0;
    t = require("github/pjax"), e(document).on("change", ".js-pulse-period", function (i) {
        var n = void 0;
        return n = e(i.target).attr("data-url"), t["default"]({url: n, container: "#js-repo-pjax-container"})
    })
}.call(this), function () {
    function e(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    var t = require("github/jquery")["default"], i = void 0, n = void 0;
    n = require("delegated-events"), i = function () {
        function i() {
            this.validate = e(this.validate, this), this.updateUpsell = e(this.updateUpsell, this), this.selectedPrivacyToggleElement = e(this.selectedPrivacyToggleElement, this), this.handlePrivacyChange = e(this.handlePrivacyChange, this), this.handleOwnerChange = e(this.handleOwnerChange, this), this.elements = {
                $ownerContainer: t(".js-owner-container"),
                $iconPreviewPublic: t(".js-icon-preview-public"),
                $iconPreviewPrivate: t(".js-icon-preview-private"),
                $upgradeUpsell: t("#js-upgrade-container").hide(),
                $upgradeConfirmationCheckbox: t(".js-confirm-upgrade"),
                $upsells: t(".js-upgrade"),
                $privacyToggles: t(".js-privacy-toggle"),
                $privateRadio: t(".js-privacy-toggle[value=false]"),
                $publicRadio: t(".js-privacy-toggle[value=true]"),
                $repoNameField: t("input[type=text].js-repo-name"),
                $form: t("#new_repository"),
                $licenseContainer: t(".js-license-container"),
                $suggestion: t(".js-reponame-suggestion")
            }, this.current_login = t("input[name=owner]:checked").prop("value"), this.privateRepo = this.selectedPrivacyToggleElement() == this.elements.$privateRadio, this.changedPrivacyManually = this.privateRepo, this.elements.$ownerContainer.on("change", "input[type=radio]", this.handleOwnerChange), this.elements.$privacyToggles.on("change", function (e) {
                return function (t) {
                    return e.handlePrivacyChange(t.targetElement, t)
                }
            }(this)), this.elements.$upgradeUpsell.on("change input", "input", this.validate), this.elements.$form.on("repoform:validate", this.validate), this.elements.$suggestion.on("click", function (e) {
                return function (i) {
                    var n = void 0;
                    return n = e.elements.$repoNameField, n.val(t(i.target).text()), n.trigger("change")
                }
            }(this)), this.handleOwnerChange(), this.validate()
        }

        return i.prototype.handleOwnerChange = function () {
            var e = void 0;
            return this.current_login = t("input[name=owner]:checked").prop("value"), this.elements.$repoNameField.trigger("change"), e = this.elements.$ownerContainer.find(".select-menu-item.selected"), this.changedPrivacyManually || ("private" === e.attr("data-default") ? this.elements.$privateRadio.prop("checked", "checked").change() : this.elements.$publicRadio.prop("checked", "checked").change()), "yes" === e.attr("data-permission") ? (t(".with-permission-fields").show(), t(".without-permission-fields").hide(), t(".errored").show(), t("dl.warn").show()) : (t(".with-permission-fields").hide(), t(".without-permission-fields").show(), t(".errored").hide(), t("dl.warn").hide()), this.updateUpsell(), this.handlePrivacyChange()
        }, i.prototype.handlePrivacyChange = function (e, t) {
            var i = void 0;
            return null == e && (e = this.selectedPrivacyToggleElement()), null == t && (t = null), t && !t.isTrigger && (this.changedPrivacyManually = !0), i = this.elements.$upgradeUpsell.find(".js-billing-section"), "false" === e.val() ? (this.privateRepo = !0, this.elements.$upgradeUpsell.show(), i.removeClass("has-removed-contents"), this.elements.$upgradeUpsell.find("input[type=checkbox]").prop("checked", "checked"), this.elements.$iconPreviewPublic.hide(), this.elements.$iconPreviewPrivate.show()) : (this.privateRepo = !1, this.elements.$upgradeUpsell.hide(), i.addClass("has-removed-contents"), this.elements.$upgradeUpsell.find("input[type=checkbox]").prop("checked", null), this.elements.$form.attr("action", this.elements.$form.attr("data-url")), this.elements.$iconPreviewPrivate.hide(), this.elements.$iconPreviewPublic.show()), this.validate()
        }, i.prototype.selectedPrivacyToggleElement = function () {
            return this.elements.$privateRadio.is(":checked") ? this.elements.$privateRadio : this.elements.$publicRadio
        }, i.prototype.updateUpsell = function () {
            var e = this.elements.$upsells.filter("[data-login=" + this.current_login + "]");
            return this.elements.$upgradeUpsell.html(e)
        }, i.prototype.validate = function () {
            var e = void 0, t = void 0;
            return t = !0, this.elements.$repoNameField.is(".is-autocheck-successful") || (t = !1), e = this.elements.$upgradeUpsell.find("input[type=checkbox]"), this.privateRepo && e.length && !e.is(":checked") && (t = !1), this.elements.$form.find("button.primary").prop("disabled", !t)
        }, i
    }(), t(function () {
        return t(".page-new-repo").length ? new i : void 0
    }), n.on("autocheck:send", "#repository_name", function (e) {
        var i = void 0, n = void 0, o = void 0;
        n = e.detail, i = t(this), o = i.closest("form").find("input[name=owner]:checked").val(), n.owner = o, i.trigger("repoform:validate")
    }), n.on("autocheck:complete", "#repository_name", function () {
        return t(this).trigger("repoform:validate")
    }), n.on("autocheck:success", "#repository_name", function (e) {
        var t = void 0, i = void 0, n = void 0;
        null != e.detail && (n = e.detail.trim()), n && (t = this.closest("dl.form-group"), t.classList.add("warn"), i = document.createElement("dd"), i.classList.add("warning"), i.innerHTML = n, t.append(i))
    })
}(), function () {
    var e = require("github/jquery")["default"];
    document.addEventListener("pjax:end", function () {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0, d = void 0;
        if (d = e(document.head).find("meta[name='selected-link']").attr("value"), null != d)for (n = e(".js-sidenav-container-pjax .js-selected-navigation-item").removeClass("selected"), t = 0, r = n.length; r > t; t++)for (i = n[t], u = null != (c = e(i).attr("data-selected-links")) ? c : "", l = u.split(" "), o = 0, s = l.length; s > o; o++)a = l[o], a === d && e(i).addClass("selected")
    })
}.call(this), function () {
    var e = require("github/jquery")["default"], t = require("delegated-events"), i = t.fire;
    e(document).on("change", ".js-repository-import-owner-container input", function () {
        var e = this.getAttribute("data-upsell"), t = this.getAttribute("data-billing-url");
        document.querySelector(".js-repository-import-billing-url").href = t, document.querySelector(".js-repository-import-upsell").classList.toggle("d-none", "false" == e), document.querySelector(".js-repository-import-no-upsell").classList.toggle("d-none", "true" == e)
    }), e(document).on("socket:message", ".repository-import", function (e, t) {
        t.redirect_to && (document.location.href = t.redirect_to, e.stopImmediatePropagation())
    }), e(document).on("change", ".js-repository-import-lfs-opt", function () {
        var e = this.getAttribute("data-percent-used"), t = this.closest(".js-repository-import-lfs-container"), i = this.getAttribute("data-used");
        t.querySelector(".js-repository-import-lfs-warn").classList.toggle("d-none", !(e > 100)), t.querySelector(".js-usage-bar").classList.toggle("exceeded", e >= 100), t.querySelector(".js-usage-bar").setAttribute("aria-label", e + "%"), t.querySelector(".js-repository-import-lfs-progress").style.width = e + "%", t.querySelector("span.js-usage-text").innerText = i
    }), e(document).on("menu:activated selectmenu:load", ".js-repository-import-author-select-menu", function () {
        var e = this.querySelector(".js-repository-import-author-autocomplete");
        e.focus(), e.select()
    }), e(document).on("autocomplete:result", ".js-repository-import-author-autocomplete", function () {
        var e = this.closest(".js-repository-import-author"), t = e.querySelector(".js-author-login-info");
        t.value = this.value, i(t, "change")
    }), e(document).on("ajaxSuccess", ".js-repository-import-author-form", function (t, i, n, o) {
        var r = e.parseHTML(o.trim()), s = this.closest(".js-repository-import-author");
        s.replaceWith.apply(s, _toConsumableArray(r))
    }), e(document).on("click", ".js-repository-import-projects-cancel-button", function () {
        document.querySelector(".js-repository-import-projects-cancel-form").submit()
    })
}(), function () {
    function e() {
        document.body.classList.add("is-sending"), document.body.classList.remove("is-sent", "is-not-sent")
    }

    function t() {
        document.body.classList.add("is-sent"), document.body.classList.remove("is-sending")
    }

    function i(e) {
        e && (document.querySelector(".js-sms-error").textContent = e), document.body.classList.add("is-not-sent"), document.body.classList.remove("is-sending")
    }

    var n = require("github/jquery")["default"], o = require("github/fetch"), r = o.fetch, s = require("delegated-events"), a = s.on;
    n(document).on("ajaxSend", ".js-send-auth-code", e), n(document).on("ajaxSuccess", ".js-send-auth-code", t), n(document).on("ajaxError", ".js-send-auth-code", function (e, t) {
        i(t.responseText)
    }), a("click", ".js-send-two-factor-code", function () {
        var n = this.form, o = n.querySelector(".js-country-code-select").value, s = n.querySelector(".js-sms-number").value, a = o + " " + s, u = n.querySelector(".js-two-factor-secret").value;
        e();
        var c = new FormData;
        c.append("number", a), c.append("two_factor_secret", u), c.append("authenticity_token", n.elements.authenticity_token.value), r(this.getAttribute("data-url"), {
            method: "post",
            body: c
        }).then(function () {
            t(), Array.from(n.querySelectorAll(".js-2fa-enable")).forEach(function (e) {
                return e.disabled = !1
            }), n.querySelector(".js-2fa-otp").focus()
        })["catch"](function (e) {
            e.response && e.response.text().then(i), Array.from(n.querySelectorAll(".js-2fa-enable")).forEach(function (e) {
                return e.disabled = !0
            })
        })
    }), document.addEventListener("facebox:reveal", function () {
        var e = document.querySelector("#facebox .js-two-factor-set-sms-fallback");
        e && (n(".js-configure-sms-fallback .facebox-alert").text("").hide(), n(".js-configure-sms-fallback").show(), n(".js-verify-sms-fallback").hide())
    }), n(document).on("ajaxSuccess", ".js-two-factor-set-sms-fallback", function (e, t) {
        switch (t.status) {
            case 200:
            case 201:
                window.location.reload();
                break;
            case 202:
                n(".js-configure-sms-fallback").hide(), n(".js-verify-sms-fallback").show(), n(".js-fallback-otp").focus()
        }
    }), n(document).on("ajaxError", ".js-two-factor-set-sms-fallback", function (e, t) {
        switch (t.status) {
            case 422:
                window.location.reload();
                break;
            case 429:
                return n(".js-configure-sms-fallback .facebox-alert").text(t.responseText).show(), !1
        }
    })
}(), function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-saved-reply-delete", function () {
        var e = this.closest(".js-saved-reply-container"), t = e.querySelectorAll(".js-saved-reply-list-item").length;
        e.classList.toggle("has-replies", t > 1), this.closest(".js-saved-reply-list-item").remove()
    })
}(),function () {
    function e() {
        var e = this, t = parseInt(e.getAttribute("data-max-length"), 10), i = e.closest(".js-user-profile-bio-container").querySelector(".js-user-profile-bio-message"), n = e.value, o = e.getAttribute("data-bio-label"), r = t - n.length;
        n.length > t || 5 >= r ? (i.textContent = r + " " + o, i.classList.remove("d-none")) : (i.textContent = "", i.classList.add("d-none"))
    }

    function t(e) {
        if (!document.querySelector(".js-blocked-user-list")) {
            var t = e.querySelector(".blankslate");
            t.classList.add("d-none")
        }
    }

    function i(e, t) {
        var i = e.querySelector(".js-add-new-blocked-user");
        i.disabled = !t
    }

    var n = void 0, o = void 0;
    n = require("delegated-events").fire, o = require("github/observe").observe;
    var r = require("github/jquery")["default"], s = require("github/facebox").close;
    o(".js-email-global-unsubscribe-form", function () {
        this.querySelector(".js-email-global-unsubscribe-submit").disabled = !0
    }), r(document).on("change", ".js-email-global-unsubscribe-form", function () {
        var e = void 0, t = void 0;
        return e = function () {
            var e = void 0, i = void 0, n = void 0, o = void 0;
            for (n = this.querySelectorAll(".js-email-global-unsubscribe"), o = [], e = 0, i = n.length; i > e; e++)t = n[e], t.checked && o.push(t);
            return o
        }.call(this), this.querySelector(".js-email-global-unsubscribe-submit").disabled = e[0].defaultChecked
    }), r(document).on("ajaxSend", ".js-remove-ssh-key", function () {
        return r(this).addClass("disabled").find("span").text("Deleting\u2026")
    }), r(document).on("ajaxError", ".js-remove-ssh-key", function () {
        return r(this).removeClass("disabled").find("span").text("Error. Try again.")
    }), r(document).on("ajaxSuccess", ".js-remove-ssh-key", function () {
        return r(this).closest("li").remove(), 0 === r(".js-ssh-keys-box li").length ? r(".js-ssh-keys-container").removeClass("has-keys") : void 0
    }), r(document).on("ajaxSend", ".js-remove-gpg-key", function () {
        return r(this).addClass("disabled").find("span").text("Deleting\u2026")
    }), r(document).on("ajaxError", ".js-remove-gpg-key", function () {
        return r(this).removeClass("disabled").find("span").text("Error. Try again.")
    }), r(document).on("ajaxSuccess", ".js-remove-gpg-key", function () {
        return r(this).closest("li").remove(), 0 === r(".js-gpg-keys-box li").length ? r(".js-gpg-keys-container").removeClass("has-keys") : void 0
    }), r(document).on("ajaxSend", ".js-verify-ssh-key", function () {
        return r(this).addClass("disabled").find("span").text("Verifying\u2026")
    }), r(document).on("ajaxError", ".js-verify-ssh-key", function () {
        return r(this).removeClass("disabled").find("span").text("Error. Try again.")
    }), r(document).on("ajaxSuccess", ".js-verify-ssh-key", function () {
        var e = void 0;
        return e = this.closest("li"), e.querySelector(".js-unverified-user-key-notice").remove(), e.querySelector(".js-user-key-icon").classList.remove("unverified-user-key"), this.remove()
    }), r(document).on("ajaxSuccess", ".js-leave-collaborated-repo", function (e) {
        var t = void 0, i = void 0;
        t = e.target.getAttribute("data-repo-id"), i = document.querySelector(".js-collab-repo[data-repo-id='" + t + "']"), i.remove(), s()
    }), r(document).on("ajaxSuccess", ".js-newsletter-unsubscribe-form", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
        for (n = document.querySelectorAll(".js-newsletter-unsubscribe-message"), o = [], t = 0, i = n.length; i > t; t++)e = n[t], o.push(e.classList.toggle("d-none"));
        return o
    }), r(document).on("click", ".js-show-new-ssh-key-form", function () {
        return r(".js-new-ssh-key-box").toggle().find(".js-ssh-key-title").focus(), !1
    }), r(document).on("click", ".js-show-new-gpg-key-form", function () {
        return r(".js-new-gpg-key-box").toggle().find(".js-gpg-key-public_key").focus(), !1
    }), r(document).on("ajaxSuccess", ".js-revoke-access-form", function () {
        var e = void 0, t = void 0, i = void 0;
        e = this.getAttribute("data-id"), i = this.getAttribute("data-type-name"), t = document.querySelector(".js-revoke-item[data-type='" + i + "'][data-id='" + e + "']"), s(), t.remove(), t.classList.contains("new-token") && document.querySelector(".js-flash-new-token").remove()
    }), r(document).on("click", ".js-delete-oauth-application-image", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, s = void 0;
        return e = r(this).closest(".js-uploadable-container"), t = e.closest("form"), i = this.getAttribute("data-app-logo-destroy-path"), n = this.getAttribute("data-app-logo-destroy-method"), o = this.getAttribute("data-app-logo-destroy-field-name"), s = this.getAttribute("data-app-logo-destroy-field-value"), t.attr("action", i), t.append('<input name="' + o + '" type="hidden" value="' + s + '">'), t.append('<input name="_method" type="hidden" value="' + n + '">'), t.submit(), !1
    }), r(document).on("click", ".js-new-callback", function (e) {
        var t = void 0, i = void 0;
        return e.preventDefault(), t = r(e.currentTarget).closest(".js-callback-urls"), i = t.find(".js-callback-url").first().clone(), i.removeClass("is-default-callback"), i.find("input").val(""), t.addClass("has-many"), r(e.currentTarget).before(i)
    }), r(document).on("click", ".js-delete-callback", function (e) {
        var t = void 0, i = void 0;
        return e.preventDefault(), t = r(e.currentTarget).closest(".js-callback-urls"), r(e.currentTarget).closest(".js-callback-url").remove(), i = t.find(".js-callback-url"), i.length <= 1 ? t.removeClass("has-many") : void 0
    }), r(document).on("click", ".js-oauth-application-whitelist .js-deny-this-request", function (e) {
        return r(e.currentTarget).siblings("#state").val("denied"), r(e.currentTarget).closest(".js-org-application-access-form").submit()
    }), r(document).on("ajaxSuccess", ".js-org-application-access-form", function () {
        return window.location.reload()
    }), r(document).on("click", ".js-user-rename-warning-continue", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
        for (n = document.querySelectorAll(".js-user-rename-warning, .js-user-rename-form"), o = [], t = 0, i = n.length; i > t; t++)e = n[t], o.push(e.classList.toggle("d-none"));
        return o
    }), r(document).on("change", ".js-checkbox-scope", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        for (n = this.closest(".js-check-scope-container"), o = n.querySelectorAll(".js-checkbox-scope"), r = [], t = 0, i = o.length; i > t; t++)e = o[t], e !== this ? (e.checked = this.checked, r.push(e.disabled = this.checked)) : r.push(void 0);
        return r
    }), r(document).on("click", ".js-generate-integration-key", function () {
        var e = void 0;
        return n(document, "facebox:close"), e = document.querySelector(".js-integration-key-management-wrapper"), e.classList.add("downloading")
    }), r(document).on("keyup", ".js-user-profile-bio", e).on("change", ".js-user-profile-bio", e), o(".js-block-users-form", i), r(document).on("ajaxSuccess", ".js-block-users-form", function (e, o, r, s) {
        var a = document.querySelector(".js-user-block-settings-list"), u = a.querySelector(".js-blocked-list");
        i(this);
        var c = this.querySelector(".js-add-blocked-user-field");
        c.value = "", n(c, "change"), t(a), u.insertAdjacentHTML("afterBegin", s)
    }), r(document).on("autocomplete:autocompleted:changed", ".js-add-blocked-user-field", function () {
        i(this.form, r(this).data("autocompleted"))
    })
}.call(this),function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSuccess", ".js-user-sessions-revoke", function () {
        this.closest("li").remove()
    })
}(),function () {
    var e = require("github/jquery")["default"], t = require("github/observe"), i = t.observe;
    e(function () {
        return e(".js-email-notice-trigger").focus(function () {
            return e(".js-email-notice").addClass("notice-highlight")
        }), e(".js-email-notice-trigger").blur(function () {
            return e(".js-email-notice").removeClass("notice-highlight")
        })
    }), i(".js-plan-choice:checked", {
        add: function () {
            return e(this).closest(".plan-row").addClass("selected")
        }, remove: function () {
            return e(this).closest(".plan-row").removeClass("selected")
        }
    }), i(".js-plan-row.selected", {
        add: function () {
            var t = void 0;
            return t = e(this).find(".js-choose-button"), t.text(t.attr("data-selected-text"))
        }, remove: function () {
            var t = void 0;
            return t = e(this).find(".js-choose-button"), t.text(t.attr("data-default-text"))
        }
    }), i(".js-setup-organization:checked", {
        add: function () {
            var t = void 0;
            return t = e(".js-choose-plan-submit"), t.attr("data-default-text") || t.attr("data-default-text", t.text()), t.text(t.attr("data-org-text"))
        }, remove: function () {
            var t = void 0;
            return t = e(".js-choose-plan-submit"), t.text(t.attr("data-default-text"))
        }
    })
}.call(this),function () {
    function e(e) {
        var t = n(".js-site-search-form")[0];
        t.setAttribute("action", t.getAttribute("data-unscoped-search-url")), n(".js-site-search").removeClass("scoped-search"), e.setAttribute("placeholder", e.getAttribute("data-unscoped-placeholder"))
    }

    function t(e) {
        var t = n(".js-site-search-form")[0];
        t.setAttribute("action", t.getAttribute("data-scoped-search-url")), n(".js-site-search").addClass("scoped-search"), e.setAttribute("placeholder", e.getAttribute("data-scoped-placeholder"))
    }

    function i(i) {
        var n = i.target, o = n.value;
        "" === o && "backspace" === i.hotkey && n.classList.contains("is-clearable") && e(n), "" === o && "esc" === i.hotkey && t(n), n.classList.toggle("is-clearable", "" === o)
    }

    var n = require("github/jquery")["default"];
    n(document).on("focus", ".js-site-search-field", function () {
        return n(this).on("keyup", i)
    }), n(document).on("blur", ".js-site-search-field", function () {
        return n(this).off("keyup", i)
    }), n(document).on("focusout", ".js-site-search-focus", function () {
        this.closest(".js-chromeless-input-container").classList.remove("focus"), "" === this.value && this.classList.contains("js-site-search-field") && t(this)
    }), n(document).on("focusin", ".js-site-search-focus", function () {
        this.closest(".js-chromeless-input-container").classList.add("focus")
    })
}.call(this),function () {
    var e = require("github/observe"), t = e.observe, i = require("github/html-validation"), n = i.revalidate;
    t(".js-contact-javascript-flag", function (e) {
        e.value = "true"
    }), t(".js-dmca-comment", function () {
        n(this, !1)
    })
}(),function () {
    var e = require("github/observe"), t = e.observe, i = require("github/jquery")["default"], n = void 0, o = void 0;
    n = function () {
        var e = void 0;
        return e = i("#js-features-branch-diagram"), e.removeClass("preload"), e.find("path").each(function () {
            var e = void 0, t = void 0, n = void 0;
            return i(this).is("#js-branch-diagram-branch") ? n = "stroke-dashoffset 3.5s linear 0.25s" : i(this).is("#js-branch-diagram-master") ? n = "stroke-dashoffset 4.1s linear 0s" : i(this).is("#js-branch-diagram-arrow") && (n = "stroke-dashoffset 0.2s linear 4.3s"), t = i(this).get(0), e = t.getTotalLength(), t.style.transition = t.style.WebkitTransition = "none", t.style.strokeDasharray = e + " " + e, t.style.strokeDashoffset = e, t.getBoundingClientRect(), t.style.transition = t.style.WebkitTransition = n, t.style.strokeDashoffset = "0"
        })
    }, i(document).on("click", ".js-segmented-nav-button", function (e) {
        var t = void 0, n = void 0;
        return n = i(this).attr("data-selected-tab"), t = i(this).closest(".js-segmented-nav"), t.find(".js-segmented-nav-button").removeClass("selected"), t.siblings(".js-selected-nav-tab").removeClass("active"), i(this).addClass("selected"), i("." + n).addClass("active"), e.preventDefault()
    }), o = function () {
        return i(document).scrollTop() >= i("#js-features-branch-diagram").offset().top - 700 ? n() : void 0
    }, t("#js-features-branch-diagram.preload", {
        add: function () {
            return i(window).on("scroll", o)
        }, remove: function () {
            return i(window).off("scroll", o)
        }
    })
}.call(this),function () {
    var e = require("github/jquery")["default"];
    e(document).on("socket:message", ".js-notification-indicator", function (t, i) {
        e(this).attr({
            "aria-label": i.aria_label,
            "data-ga-click": i.ga_click
        }), e("span", this).attr("class", i.span_class)
    })
}(),function () {
    var e = require("github/jquery")["default"], t = require("github/visible")["default"], i = require("github/facebox")["default"], n = require("github/facebox").close, o = void 0, r = void 0;
    o = require("github/fetch").fetchText, r = function () {
        var e = "/site/keyboard_shortcuts?url=" + window.location.pathname;
        return i(function () {
            return o(e).then(function (e) {
                return i(e, "shortcuts")
            })
        })
    }, e(document).on("click", ".js-keyboard-shortcuts", function () {
        return r(), !1
    }), e(document).on("click", ".js-see-all-keyboard-shortcuts", function () {
        return this.remove(), e(".facebox .js-hidden-pane").css("display", "table-row-group"), !1
    }), e(document).on("keypress", function (i) {
        return i.target === document.body && 63 === i.which ? (Array.from(e(".facebox")).some(t) ? n() : r(), !1) : void 0
    })
}.call(this),function () {
    var e = require("github/observe"), t = e.observe;
    t(".js-site-status-container", function () {
        var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0;
        o = this, t = o.querySelector(".js-site-status-message"), i = o.querySelector(".js-site-status-time"), e = o.querySelector(".flash"), n = document.querySelector("meta[name=site-status-api-url]").content, window.fetch(n).then(function (e) {
            return e.json()
        }).then(function (n) {
            var r = void 0;
            null != n.status && "good" !== n.status && (t.textContent = n.body, i.setAttribute("datetime", n.created_on), r = "major" === n.status ? "error" : "warn", e.classList.add("flash-" + r), o.classList.remove("d-none"))
        })
    })
}(),function () {
    var e = require("github/jquery")["default"];
    e(document).on("ajaxSend", ".js-action-ldap-create", function () {
        return e(this).find(".btn-sm").addClass("disabled")
    }), e(document).on("ajaxError", ".js-action-ldap-create", function () {
        return !1
    }), e(document).on("ajaxComplete", ".js-action-ldap-create", function (t, i) {
        var n = void 0, o = void 0;
        return n = e(this), o = 500 === i.status ? "Oops, something went wrong." : i.responseText, n.find(".js-message").show().html(" &ndash; " + o), 200 === i.status && n.find(".btn").hide(), !1
    })
}.call(this),function () {
    function e(t, i) {
        var n = document.getElementById(t.getAttribute("data-results"));
        if (n) {
            var o = g.get(n);
            if (!o)return void(null == p && (p = r(n.getAttribute("data-url")).then(function (i) {
                g.set(n, i.paths), e(t), p = null
            })["catch"](function () {
                p = null
            })));
            var s = n.querySelector(".js-tree-browser-result-template").firstElementChild, d = n.querySelector(".js-tree-finder-results");
            null == i && (i = t.value);
            var h = void 0, f = void 0;
            i ? (h = u(i), f = a(o, i)) : f = o, n.classList.toggle("filterable-empty", !f.length);
            for (var v = document.createDocumentFragment(), m = f.slice(0, 50), b = 0, y = m.length; y > b; b++) {
                var j = m[b], w = s.cloneNode(!0), x = w.getElementsByClassName("js-tree-finder-path")[0], q = new URL(x.href);
                q.pathname = q.pathname + "/" + j, x.href = q.href, x.textContent = j, c(x, i, h), v.appendChild(w)
            }
            d.innerHTML = "", d.appendChild(v), l(d)
        }
    }

    function t(t) {
        e(t.target)
    }

    var i = require("github/observe"), n = i.observe, o = require("github/fetch"), r = o.fetchJSON, s = require("github/fuzzy-filter"), a = s.fuzzySort, u = s.fuzzyRegexp, c = s.fuzzyHighlightElement, l = require("github/navigation").focus, d = require("github/focused"), h = d.onFocusedKeydown, f = require("github/throttled-input"), v = f.addThrottledInputEventListener, m = f.removeThrottledInputEventListener, p = null, g = new WeakMap;
    h(document, ".js-tree-finder-field", function () {
        return function (e) {
            "esc" === e.hotkey && (history.back(), e.preventDefault())
        }
    }), n(".js-tree-finder-field", {
        init: function (t) {
            e(t)
        }, add: function (e) {
            v(e, t), e.focus()
        }, remove: function (e) {
            m(e, t)
        }
    })
}(),function () {
    function e(e, t) {
        var i, n, o, r;
        return regeneratorRuntime.async(function (a) {
            for (; ;)switch (a.prev = a.next) {
                case 0:
                    return i = document.querySelector(".js-calendar-graph"), n = i.getAttribute("data-graph-url"), o = n + "?from=" + g(e) + "&to=" + g(t) + "&full_graph=1", a.next = 5, regeneratorRuntime.awrap(s(document, o));
                case 5:
                    r = a.sent, document.querySelector(".js-contribution-graph").replaceWith(r);
                case 7:
                case"end":
                    return a.stop()
            }
        }, null, this)
    }

    function t(t, i) {
        var n = new Date(Date.parse("1 " + t + " " + i + " 00:00:00 UTC")), o = new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth() + 1, 0));
        e(n, o)
    }

    function i(e) {
        var t = e.closest(".js-details-container");
        t && t.classList.add("open");
        var i = 62, n = e.getBoundingClientRect(), o = 10, r = window.scrollY + n.top - i - o;
        window.scrollTo(0, r)
    }

    function n() {
        var e = window.location.hash;
        if (e && !(e.indexOf("#event-") < 0)) {
            var t = e.slice(1, e.length), n = document.getElementById(t);
            n && i(n)
        }
    }

    var o = require("github/jquery")["default"], r = require("github/fetch"), s = r.fetchSafeDocumentFragment, a = require("github/pjax")["default"], u = require("github/history"), c = u.pushState, l = void 0, d = void 0, h = void 0, f = void 0, v = void 0, m = void 0, p = void 0, g = void 0, b = void 0, y = void 0, j = void 0, w = void 0, x = void 0, q = void 0, k = void 0, S = void 0, L = void 0, C = void 0, A = void 0, E = void 0, T = void 0, _ = void 0;
    m = require("delegated-events"), x = require("github/inflector").pluralize, p = require("github/number-helpers").formatNumber, y = require("github/observe").observe, w = null, q = null, A = null, E = null, f = function () {
        var e = document.querySelector(".js-calendar-graph");
        return e.getAttribute("data-url")
    }, m.on("pjax:send", "#js-contribution-activity", function () {
        this.classList.add("loading")
    }), m.on("pjax:complete", "#js-contribution-activity", function () {
        this.classList.remove("loading")
    }), y(".js-calendar-graph-svg", function () {
        var e = void 0, t = void 0, i = void 0;
        e = this.closest(".js-calendar-graph"), e.addEventListener("mouseover", h), e.addEventListener("mouseout", v), t = e.getAttribute("data-from"), t && (t = q = _(t)), i = e.getAttribute("data-to"), i && (i = _(i))
    }), m.on("click", ".js-calendar-graph rect.day", function (e) {
        var t = _(this.getAttribute("data-date"));
        k(t, e.shiftKey, !1)
    }), h = function (e) {
        return e.target.matches("rect.day") ? T(e.target) : void 0
    }, v = function () {
        var e = void 0;
        return null != (e = document.querySelector(".svg-tip")) ? e.remove() : void 0
    }, l = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], T = function (e) {
        var t = void 0, i = void 0, n = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0;
        return n = _(e.getAttribute("data-date")), i = parseInt(e.getAttribute("data-count")), a = 0 === i ? "No" : p(i), s = l[n.getUTCMonth()].slice(0, 3) + " " + n.getUTCDate() + ", " + n.getUTCFullYear(), r = o('<div class="svg-tip svg-tip-one-line">\n  <strong>' + a + " " + x(i, "contribution") + "</strong> on " + s + "\n</div>").get(0), o(".svg-tip").remove(), document.body.appendChild(r), t = e.getBoundingClientRect(), u = t.left + window.pageXOffset - r.offsetWidth / 2 + t.width / 2, c = t.bottom + window.pageYOffset - r.offsetHeight - 2 * t.height, r.style.top = c + "px", r.style.left = u + "px"
    }, b = function (e) {
        var t = document.getElementById("js-contribution-activity");
        t && a({url: e, container: t, scrollTo: !1, replace: !0})
    }, L = function (e) {
        var t = void 0;
        return w = e, A = null, E = null, t = f() + "?tab=overview&period=" + w, C(), b(t)
    }, S = function (e, t) {
        var i = void 0, n = void 0;
        return n = e.getAttribute("class").trim().split(" "), n = function () {
            var e = void 0, o = void 0, r = void 0;
            for (r = [], e = 0, o = n.length; o > e; e++)i = n[e], i !== t && r.push(i);
            return r
        }(), e.setAttribute("class", n.join(" "))
    }, d = function (e, t) {
        var i = e.getAttribute("class") + " " + t;
        return e.setAttribute("class", i.trim())
    }, C = function (e, t) {
        var i = void 0, n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        for (i = document.querySelector(".js-calendar-graph"), l = i.querySelectorAll("rect.day"), r = 0, a = l.length; a > r; r++)n = l[r], S(n, "active");
        if (i.classList.remove("days-selected"), e || t) {
            for (i.classList.add("days-selected"), o = function (i) {
                var n = void 0;
                return n = _(i.getAttribute("data-date")).getTime(), e && t ? e.getTime() <= n && n <= t.getTime() : n === e.getTime()
            }, c = [], s = 0, u = l.length; u > s; s++)n = l[s], o(n) && c.push(d(n, "active"));
            return c
        }
    }, j = function (e) {
        return ("0" + e).slice(-2)
    }, g = function (e) {
        return e.getUTCFullYear() + "-" + j(e.getUTCMonth() + 1) + "-" + j(e.getUTCDate())
    }, _ = function (e) {
        var t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
        return n = function () {
            var t = void 0, i = void 0, n = void 0, r = void 0;
            for (n = e.split("-"), r = [], t = 0, i = n.length; i > t; t++)o = n[t], r.push(parseInt(o));
            return r
        }(), r = n[0], i = n[1], t = n[2], new Date(Date.UTC(r, i - 1, t))
    }, k = function (e, t, i) {
        var n = void 0, o = void 0, r = void 0, s = void 0, a = void 0, u = void 0, c = void 0, l = void 0;
        return l = f() + "?tab=overview", e >= A && E >= e ? void L("weekly") : ("object" == typeof t && (q = t, t = !0), q && t ? (r = new Date(q.getTime() - 26784e5), o = new Date(q.getTime() + 26784e5), s = e > q ? [q, e] : [e, q], n = s[0], c = s[1], r > n && (n = r), c > o && (c = o), a = [n, c], A = a[0], E = a[1], l += "&from=" + g(n) + "&to=" + g(c)) : (n = e, u = [n, null], A = u[0], E = u[1], l += "&from=" + g(n)), q = e, w = "custom", C(n, c), i ? void 0 : b(l))
    }, o(document).on("change", ".js-period-container", function (e) {
        var t = void 0;
        return e.preventDefault(), e.stopPropagation(), t = e.target.value.toLowerCase(), w !== t ? L(t) : void 0
    }), m.on("click", ".js-year-link", function (i) {
        i.preventDefault(), i.stopPropagation();
        var n = document.querySelector(".js-year-link.selected"), o = i.target;
        n.classList.remove("selected"), o.classList.add("selected");
        var r = o.innerText, s = new Date, a = s.getUTCFullYear();
        if (parseInt(a) === parseInt(r)) {
            var u = s.getUTCMonth(), c = new Date(a, u, 1);
            return e(c, s)
        }
        return t("December", r)
    }), n(), window.addEventListener("hashchange", function (e) {
        var t = e.newURL || window.location.href, n = t.slice(t.indexOf("#") + 1, t.length), o = document.getElementById(n);
        return o ? (e.stopPropagation(), void i(o)) : !0
    }), y(".js-no-contributions-activity", function () {
        this.hasAttribute("data-current-month") && document.querySelector(".contribution-activity-show-more").click()
    }), o(document).on("ajaxSuccess", ".js-show-more-timeline-form", function (e, t, i) {
        document.title = e.target.getAttribute("data-title"), c(null, null, i.url)
    })
}.call(this);
var _slicedToArray = function () {
    function e(e, t) {
        var i = [], n = !0, o = !1, r = void 0;
        try {
            for (var s, a = e[Symbol.iterator](); !(n = (s = a.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
        } catch (u) {
            o = !0, r = u
        } finally {
            try {
                !n && a["return"] && a["return"]()
            } finally {
                if (o)throw r
            }
        }
        return i
    }

    return function (t, i) {
        if (Array.isArray(t))return t;
        if (Symbol.iterator in Object(t))return e(t, i);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
}();
!function () {
    function e(e, t, i) {
        var n = e.querySelector(".js-remaining-pinned-repos-count"), o = n.getAttribute("data-remaining-label"), r = i - t;
        n.textContent = r + " " + o, n.classList.toggle("text-red", 1 > r)
    }

    function t(t) {
        var i = parseInt(t.getAttribute("data-max-repo-count"), 10), n = t.querySelectorAll("input[type=checkbox]:checked").length, o = Array.from(t.querySelectorAll("input[type=checkbox]"));
        n === i ? o.forEach(function (e) {
            return e.disabled = !e.checked
        }) : i > n && o.forEach(function (e) {
            return e.disabled = !1
        });
        var r = t.closest(".js-pinned-repos-selection-form");
        e(r, n, i)
    }

    function i(e) {
        var t = Array.from(e.querySelectorAll(".js-pinned-repo-source:checked")), i = t.map(function (e) {
            return e.value
        }), n = i.indexOf("owned") > -1, o = i.indexOf("contributed") > -1;
        return n && !o || !n && o ? t.forEach(function (e) {
            return e.disabled = !0
        }) : t.forEach(function (e) {
            return e.disabled = !1
        }), [n, o]
    }

    function n(e) {
        var t = e.classList.contains("js-owned-repo"), i = e.classList.contains("js-contributed-repo");
        return [t, i]
    }

    function o(e) {
        "enter" === a(e) && e.preventDefault();
        var t = e.target.closest(".js-pinned-repos-selection-form"), o = t.querySelector(".js-pinned-repos-filter").value.trim().toLowerCase(), r = o.length < 1, s = t.querySelectorAll(".js-pinned-repos-selection"), u = i(t), c = _slicedToArray(u, 2), l = c[0], d = c[1];
        Array.from(s).forEach(function (e) {
            var t = e.querySelector(".js-repo").textContent.trim(), i = n(e), s = _slicedToArray(i, 2), a = s[0], u = s[1], c = e.querySelector('input[type="checkbox"]').checked, h = t.toLowerCase().indexOf(o) > -1, f = (r || h) && (a && l || u && d), v = c || f;
            e.classList.toggle("d-none", !v)
        })
    }

    var r = require("delegated-events"), s = r.on, a = require("github/hotkey")["default"];
    s("change", ".js-pinned-repos-selection-list input[type=checkbox]", function () {
        var e = this.closest(".js-pinned-repos-selection");
        e.classList.toggle("selected", this.checked), t(e.closest(".js-pinned-repos-selection-list"))
    }), s("keyup", ".js-pinned-repos-filter", o), s("change", ".js-pinned-repos-filter", o), s("search", ".js-pinned-repos-filter", o), s("change", ".js-pinned-repo-source", o), document.addEventListener("facebox:reveal", function () {
        var e = document.querySelector("#facebox .js-pinned-repos-settings-fragment");
        e && e.setAttribute("src", e.getAttribute("data-url"))
    })
}(), function () {
    function e(e) {
        var t = e.item, i = e.oldIndex;
        l = t.parentNode.children[i + 1]
    }

    function t(e) {
        var t = e.oldIndex, i = e.newIndex, n = e.item;
        if (t !== i) {
            var o = n.closest(".js-pinned-repos-reorder-form"), s = o.closest(".js-pinned-repos-reorder-container"), a = s.querySelector(".js-pinned-repos-spinner"), u = s.querySelector(".js-pinned-repos-reorder-error");
            u.textContent = "", a.style.display = "inline-block", c.option("disabled", !0), r(o.action, {
                method: o.method,
                body: new FormData(o)
            })["catch"](function () {
                u.textContent = "Something went wrong.";
                var e = n.parentNode;
                l ? e.insertBefore(n, l) : e.appendChild(n)
            }).then(function () {
                a.style.display = "none", c.option("disabled", !1)
            })
        }
    }

    var i = require("delegated-events"), n = i.on, o = require("github/fetch"), r = o.fetchText, s = require("github/observe"), a = s.observe, u = require("sortablejs"), c = null, l = null;
    a(".js-pinned-repos-reorder-list", function () {
        c = u.create(this, {
            animation: 150,
            item: ".js-pinned-repo-list-item",
            handle: ".js-pinned-repository-reorder",
            onUpdate: t,
            onStart: e,
            chosenClass: "is-dragging"
        })
    }), n("submit", ".js-pinned-repos-reorder-form", function (e) {
        e.preventDefault()
    })
}(), function () {
    var e = require("github/observe"), t = e.observe;
    t(".js-user-profile-sticky-fields.is-stuck", function () {
        var e = document.querySelector(".js-user-profile-sticky-bar");
        return {
            add: function () {
                e.classList.add("is-stuck")
            }, remove: function () {
                e.classList.remove("is-stuck")
            }
        }
    }), t(".js-user-profile-follow-button.is-stuck", function () {
        var e = document.querySelector(".js-user-profile-sticky-bar");
        return {
            add: function () {
                e.classList.add("is-follow-stuck")
            }, remove: function () {
                e.classList.remove("is-follow-stuck")
            }
        }
    }), t(".js-user-profile-following-toggle .js-toggler-container.on", function () {
        var e = document.querySelector(".js-user-profile-following-mini-toggle .js-toggler-container");
        return {
            add: function () {
                e.classList.add("on")
            }, remove: function () {
                e.classList.remove("on")
            }
        }
    }), t(".js-user-profile-following-mini-toggle .js-toggler-container.on", function () {
        var e = document.querySelector(".js-user-profile-following-toggle .js-toggler-container");
        return {
            add: function () {
                e.classList.add("on")
            }, remove: function () {
                e.classList.remove("on")
            }
        }
    })
}(), function () {
    var e = require("github/fetch"), t = e.fetch, i = require("github/observe"), n = i.observe;
    n("#js-profile-next-dark-ship", function (e) {
        var i = e.getAttribute("data-url");
        t(i)
    })
}.call(this), function () {
    var e = require("github/jquery")["default"];
    e(function () {
        function t() {
            var i = e("#current-version").val();
            i && n("_current").then(function (n) {
                i == n ? setTimeout(t, 5e3) : o || (e("#gollum-error-message").text("Someone has edited the wiki since you started. Please reload this page and re-apply your changes."), e("#gollum-error-message").show(), e("#gollum-editor-submit").attr("disabled", "disabled"), e("#gollum-editor-submit").attr("value", "Cannot Save, Someone Else Has Edited"))
            })
        }

        var i = require("github/fetch"), n = i.fetchText, o = !1;
        e("#gollum-editor-body").each(t), e("#gollum-editor-submit").click(function () {
            o = !0
        })
    })
}(), function () {
    var e = require("github/observe"), t = e.observe, i = void 0, n = void 0, o = void 0, r = void 0;
    n = null != (o = document.querySelector("meta[name=form-nonce]")) ? o.content : void 0, null != n && (r = require("github/failbot").reportError, i = require("github/inspect")["default"], t("form", function (e) {
        var t = void 0, o = void 0;
        "get" !== e.method.toLowerCase() && (o = e.getAttribute("data-form-nonce"), null != o && o !== n && (t = new Error("Incorrect form-nonce"), r(t, {
            form: i(e),
            method: e.method,
            action: e.action
        })), (null == o || o !== n) && e.remove())
    }))
}.call(this), function () {
    var e = void 0, t = void 0, i = void 0, n = void 0, o = void 0, r = void 0;
    r = require("github/failbot").reportError, n = require("github/proxy-site-detection")["default"], e = "$__", n(document) && (t = {
        url: window.location.href,
        proxyPayload: document.querySelector("meta[name=js-proxy-site-detection-payload]").content
    }, i = new Error, r(i, (o = {}, o["" + e] = btoa(JSON.stringify(t)), o)))
}.call(this);
