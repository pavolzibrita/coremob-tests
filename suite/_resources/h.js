(function(a) {
    var b = [].slice,
    c = {}.toString,
    d = {}.hasOwnProperty,
    e = {},
    f = ["Object", "Number", "String", "Boolean", "Function", "RegExp", "Array", "Date", "Error"],
    g = function(a) {
        var b = a.location && a.location.search || "";
        return b.replace(/^\?/, "").split("&").map(function(a) {
            var b = a.split("=");
            return {
                key: b[0],
                value: b[1] || !0
            }
        })
    } (a),
    h = [],
    i = [],
    j = {
        nop: function() {},
        uniqueId: function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function(a) {
                var b = Math.random() * 16 | 0;
                return (a === "x" ? b: b & 3 | 8).toString(16)
            }).toUpperCase()
        },
        isKindOf: function(a, b) {
            return a != null && c.call(a) === "[object " + b + "]"
        },
        kindOf: function(a) {
            return a != null && /^\[object (.*)\]$/.exec(c.call(a))[1]
        },
        clone: function(a) {
            var b,
            c,
            d,
            e = [];
            if (Array.isArray(a)) {
                for (d = 0, c = a.length; d < c; d++) b = a[d],
                typeof b == "object" && (b = j.clone(b)),
                e[d] = b;
                return e
            }
            return Object.create({},
            function(a) {
                var b = {};
                return Object.getOwnPropertyNames(a).forEach(function(c) {
                    var d = Object.getOwnPropertyDescriptor(a, c);
                    typeof a[c] == "object" && (d.value = j.clone(a[c])),
                    b[c] = d
                }),
                b
            } (a))
        },
        extend: function(a) {
            var c,
            d,
            e = b.call(arguments, 1),
            f = e.length,
            g = 0;
            for (; g < f; g++) {
                c = j.clone(e[g]);
                for (d in c) a[d] = c[d]
            }
            return a
        }
    },
    k = " -webkit- -moz- -o- -ms- ".split(" "),
    l = "Webkit Moz O ms",
    m = l.split(" "),
    n = l.toLowerCase().split(" ");
    m.push("WebKit", "Moz", "MS", "O"),
    n.push("WebKit", "Moz", "MS", "O"),
    f.forEach(function(a) {
        e["[object " + a + "]"] = a,
        j["is" + a] = function(b) {
            return j.kindOf(b) === a
        }
    }),
    j.isHTML = function(a) {
        return a = a.trim(),
        a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3
    },
    j.prefixes = {
        css: k,
        dom: n,
        cssom: m,
        expandCss: function(a, b) {
            return k.join(a + ";") + (b || "")
        }
    },
    j.get = {
        string: function(a, b) {
            return !! ~ ("" + a).indexOf(b)
        },
        cssProp: function(a, b, c) {
            var d,
            e,
            f,
            g;
            c = c || !1;
            if (!c) return b in a.style;
            d = b.charAt(0).toUpperCase() + b.substr(1),
            e = (b + " " + m.join(d + " ") + d).split(" "),
            f = 0,
            g = e.length;
            for (f = 0; f < g; f++) if (e[f] in a.style) return ! 0;
            return ! 1
        },
        domProp: function(a, b, c) {
            var d,
            e,
            f,
            g;
            c = c || !1;
            if (!c) return a[b] !== undefined ? a[b] : !1;
            d = b.charAt(0).toUpperCase() + b.substr(1),
            e = (b + " " + n.join(d + " ") + d).split(" "),
            f = 0,
            g = e.length;
            for (f = 0; f < g; f++) if (e[f] in a) return a[e[f]];
            return ! 1
        }
    },
    j.inject = function(a, b) {
        var c,
        d,
        e;
        return typeof b == "string" && (j.isHTML(b) ? (d = /^<(\w+)\s*\/?>(?:<\/\1>)?$/.exec(b), d && d.length && d[1] && (b = document.createElement(d[1]))) : b = document.querySelector(b)),
        typeof a == "string" ? (j.isHTML(a) && !/^<style/.test(a) ? c = "innerHTML": (c = "innerText" in b ? "innerText": "textContent", /^<style/.test(a) && (c = "textContent")), b[c] += a) : a.nodeType === 1 && b.appendChild(a),
        b
    },
    j.hostAPI = function(a, b) {
        return j.get.domProp(window, a, b) || !1
    },
    j.API = function(a, b, c, d) {
        var e = j.get.domProp(a, b, c);
        return arguments.length === 4 && e === d ? e: e || undefined
    },
    j.simulate = function(a, b, c) {
        var d;
        a === "click" ? (d = document.createEvent("MouseEvents"), d.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null)) : (d = document.createEvent("HTMLEvents"), d.initEvent(a, !0, !1)),
        d.synthetic = !0,
        c && j.extend(d, c),
        b.dispatchEvent(d)
    },
    j.on = function(a, b) { (i[a] || (i[a] = [])).push(b)
    },
    j.once = function(a, b) {
        function c() {
            b.apply(this, arguments),
            j.off(a, b)
        }
        j.on(a, c)
    },
    j.off = function(a, b) {
        var c = i[a];
        c && (b ? c.splice(c.indexOf(b), 1) : i[a] = [])
    },
    j.emit = function(a) {
        var b = 0,
        c = [].slice.call(arguments, 1),
        d = i[a] || [],
        e = d.length;
        for (; b < e; b++) d[b] && d[b].apply(this, c)
    },
    j.results = {};
    var o = 0,
    p = {
        all: !1
    };
    j.ring = function(a) {
        j.ring.cache.push(a)
    },
    j.ring.cache = [],
    j.ring.getCount = function(a) {
        var b = j.ring.cache[a];
        return b && b.features || 0
    },
    j.ring.totals = function() {
        return a.QUnit.config.stats
    },
    j.next = function() {
        var b = j.ring.cache[o];
        b && b.test(),
        setTimeout(function() {
            a.QUnit.start()
        },
        1e3)
    },
    j.start = function() {
        j.next(),
        j.emit("runner:start")
    },
    j.on("runner:done",
    function() {
        a.QUnit.config.autorun = !1,
        a.QUnit.config.blocking = !1,
        a.QUnit.config.semaphore = 0,
        a.QUnit.load()
    }),
    j.on("runner:ringDone",
    function(b) {
        a.QUnit && (["previousFeature", "previousModule", "previousRing", "currentFeature", "currentModule"].forEach(function(b) {
            a.QUnit.config[b] = ""
        }), a.QUnit.config.autorun = !1, a.QUnit.config.blocking = !1, a.QUnit.config.semaphore = 0, a.QUnit.stop(), console.log("Stopped (" + o + ")"), console.log("Waiting...")),
        o++,
        (p.all || b.failed === 0) && j.next()
    }),
    j.Runner = function() {},
    j.Runner.config = function(b, c) {
        QUnit.config[b] && (a.QUnit.config[b] = c),
        p[b] = c
    },
    g && g.forEach(function(a) {
        p[a.key] = a.value
    }),
    j.prefixes.expand = j.prefixes.expandCss,
    j.test = j.check = j.get,
    a.TopHat = a.Hat = a.H = j
})(typeof exports == "object" && exports || this),
function(a, b) {
    function g(a) {
        var b;
        for (b in a) this[b] = a[b];
        this.history = [Math.PI * 1.5]
    }
    var c = [],
    d = {},
    e = {
        running: "255, 255, 255",
        clear: "255, 255, 255",
        pass: "0, 199, 59",
        fail: "182, 184, 186"
    },
    f = {
        nomore: "No more ticks available for this ring"
    };
    g.prototype.draw = function(a, b, c, d) {
        var e = "rgba(" + c + ", " + d + ")";
        this.ctx.beginPath(),
        this.ctx.arc(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, this.radius, a, b, !1),
        this.ctx.strokeStyle = e,
        this.ctx.lineWidth = this.line,
        this.ctx.stroke(),
        this.ctx.closePath()
    },
    g.prototype.tick = function(a, b) {
        if (this.history.length > this.ticks) {
            console.log(f.nomore);
            return
        }
        if (!a || typeof a != "string") b = a,
        a = "tick";
        var c = this.history[this.history.length - 1],
        d = c + this.step,
        g = 1,
        h = e.running;
        b && (h = e[b.failed ? "fail": "pass"]),
        this.draw(c, d + .009, h, g),
        a === "tick" && (this.draw(c, d + .009, h, g), this.history.push(d))
    },
    g.trace = function() {
        var a,
        b,
        e = document.createElement("canvas"),
        f = {
            width: null,
            height: null
        },
        h = function() {
            var a;
            for (a in d) return d[a].canvas
        } ();
        e.style.position = "relative",
        e.style.top = "-305px",
        e.style.left = "-5px",
        e.width = h.width + 10,
        e.height = h.height + 10,
        h.parentNode.insertBefore(e, h.nextSibling),
        a = e.getContext("2d"),
        f.width = a.canvas.width / 2,
        f.height = a.canvas.height / 2,
        b = g.get(0).line * c.length + 1,
        a.fillRect(f.width - 4, 10, 8, b),
        a.fillRect(f.width + 65, f.height - 10, b, 21),
        a.font = "bold 12px Helvetica",
        c.concat([{
            line: 25
        }]).forEach(function(b, d) {
            a.beginPath(),
            a.arc(f.width, f.height - 3, b.line * (d + 1) + 40, Math.PI * 2, 0, !1),
            a.strokeStyle = "rgba( 0, 0, 0, 1 )",
            a.lineWidth = 8,
            a.stroke(),
            a.closePath(),
            a.fillStyle = "rgba( 255, 255, 255, 1 )",
            d < c.length && a.fillText("r." + d, f.width + (b.line * (d + 1) + 45), f.height + 5)
        })
    },
    g.create = function(b, e) {
        var f,
        h = a.Ring.config;
        return e.index == null && (e.index = c.length),
        e.ticks == null && (e.ticks = 0),
        e.diameter = h.diameter.next || h.diameter.initial,
        h.diameter.next = (h.diameter.next || h.diameter.initial) + h.diameter.padding * 2,
        e.radius = e.diameter / 2,
        !(e.index > 0),
        e.line = h.line.initial,
        e.circ = e.diameter * Math.PI,
        e.step = Math.PI * 2 / e.ticks,
        d[b] || (d[b] = document.getElementById(b).getContext("2d")),
        e.ctx = d[b],
        c.push(new g(e)),
        c[c.length - 1]
    },
    g.create.all = function(a) {
        b.ring.cache.length && (b.ring.cache.forEach(function(b) {
            g.create(a, {
                ticks: b.features
            })
        }), g.trace())
    },
    g.get = function(a) {
        return a != null && c[a]
    },
    g.config = {
        diameter: {
            padding: 25,
            initial: 150,
            next: 0
        },
        line: {
            initial: 25
        }
    },
    typeof global != "undefined" && (g.config.contexts = {},
    d = g.config.contexts),
    a.Ring = g,
    a.Hat && (a.Hat.Ring = a.Ring)
} (typeof exports == "object" && exports || this, this.Hat || {});
