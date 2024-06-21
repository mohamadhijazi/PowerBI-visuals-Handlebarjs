
function registerHelpers() {
    function get(t, e) {
        for (var n = e.split("."), r = n.pop(); e = n.shift();)
            if (null == (t = t[e]))
                return;
        return t[r]
    }
    function noop() {
        return ""
    }
    function groupBy(t) {
        var e = {
            group: (t, e) => {
                var n = (e = e || {}).fn || noop
                    , r = e.inverse || noop
                    , i = e.hash
                    , o = i && i.by
                    , s = []
                    , a = {};
                return o && t && t.length ? (t.forEach((t) => {
                    var e = get(t, o);
                    -1 === s.indexOf(e) && s.push(e),
                        a[e] || (a[e] = {
                            value: e,
                            items: []
                        }),
                        a[e].items.push(t)
                }),
                    s.reduce((t, e) => {
                        return t + n(a[e])
                    }, "")) : r(this)
            }
        };
        return t.registerHelper(e),
            t
    }
    function NumberWithCommas(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    Handlebars.registerHelper("mod", (t, e, n) => {
        return parseInt(t) > 0 && (parseInt(t) + 1) % parseInt(e) == 0 ? n : ""
    }),
        Handlebars.registerHelper("IndexColor", (t) => {
            var e = "";
            return null !== t && (t > 0 ? e = "text-color-green" : t < 0 && (e = "text-color-red")),
                e
        }),
        Handlebars.registerHelper("getLinkTitle", (t) => {
            var e = "";
            return null != t && "" != t && (e = t.substring(t.lastIndexOf("/") + 1, t.length)),
                e
        }),
        Handlebars.registerHelper("NumberWithCommas", (t) => {
            return "" == t || null == t || null == t || "undefined" == t || $.isPlainObject(t) ? "0" : t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }),
        Handlebars.registerHelper("decimalNumberWithCommas", (t) => {
            return "" == t || null == t || null == t || "undefined" == t || $.isPlainObject(t) ? "0.00" : t.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        });
    Handlebars.registerHelper("3decimalNumberWithCommas", (t) => {
        return "" == t || null == t || null == t || "undefined" == t || $.isPlainObject(t) ? "0.000" : t.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    });
    Handlebars.registerHelper("FormatDateTime", (t, e, n) => {
        return "" == t || null == t || null == t || "undefined" == t || $.isPlainObject(t) ? "" : ($.isPlainObject(e) && (e = "dd-MMM-yyyy HH:mm:ss"),
            r = new Date(t),
            $.isPlainObject(n) || 1 == n && (r = new Date(parseInt(t.substr(6)))),
            r.toString(e));
        var r
    }),
        Handlebars.registerHelper("decimal", (t) => {
            return null != t ? NumberWithCommas(t.toFixed(2)) : t
        }),
        Handlebars.registerHelper("3decimal", (t) => {
            return null != t ? NumberWithCommas(t.toFixed(3)) : t
        }),
        Handlebars.registerHelper("decimalChangeFormatter", (t, e) => {
            var n = "<span class='bgNeutral'>" + t + "</span>";
            if (null !== t) {
                e > 0 ? n = "<span class='bgPositive '>" + t.toFixed(2) + "</span>" : e < 0 ? n = "<span class='bgNegative '>" + t.toFixed(2) + "</span>" : 0 == e && (n = "<span class='bgNeutral '>" + t.toFixed(2) + "</span>")
            }
            return n
        });
    Handlebars.registerHelper("IndexCaret", (t) => {
        var e = "";
        return null !== t && (t > 0 ? e = "fa-caret-up" : t < 0 && (e = "fa-caret-down")),
            e
    });
    Handlebars.registerHelper("IndexArrow", (t) => {
        var e = "";
        return null !== t && (t > 0 ? e = "fa-arrow-up" : t < 0 && (e = "fa-arrow-down")),
            e
    });
    Handlebars.registerHelper("IndexArrowCircle", (t) => {
        var e = "fa-circle";
        return null !== t && (t > 0 ? e = "fa-arrow-circle-up txt-green" : t < 0 && (e = "fa-arrow-circle-down txt-red")),
            e
    });
    Handlebars.registerHelper("ColorRedGreen", (t) => {
        var e = "";
        return null !== t && (t > 0 ? e = "color1" : t < 0 && (e = "color2")),
            e
    });
    Handlebars.registerHelper("textRedGreen", (t) => {
        var e = "";
        return null !== t && (t > 0 ? e = "txt-green" : t < 0 && (e = "txt-red")),
            e
    });
    Handlebars.registerHelper("FormatMoment", (t, e) => {
        return "undefined" === t || null == t || $.isPlainObject(t) ? "" : (("undefined" === e || null == e || $.isPlainObject(e)) && (e = "DD-MMM-YYYY"),
            moment(t).format(e))
    });
    Handlebars.registerHelper("enableSelection", (i) => {
        return `data-enableSelection='true'  data-index='${i}'`;
    });
    Handlebars.registerHelper("IfModeEquals", (t, e, n, r) => {
        if (parseInt(t) % e === n)
            return r.fn(this)
    });
    Handlebars.registerHelper("RemoveUrlProtocol", (t) => {
        return null != t && "" != t ? t.replace(/(^\w+:|^)\/\//, "") : t
    });
    Handlebars.registerHelper("EncodeURIComponent", (t) => {
        return null != t && "" != t ? encodeURIComponent(t) : t
    });

    Handlebars.registerHelper(groupBy(Handlebars));

    Handlebars.registerHelper("compare", (t, e, n) => {
        if (arguments.length < 3)
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        let operator = n.hash.operator || "==";
        var r = {
            "==": (t, e) => {
                return t == e
            },
            "===": (t, e) => {
                return t === e
            },
            "!=": (t, e) => {
                return t != e
            },
            "<": (t, e) => {
                return t < e
            },
            ">": (t, e) => {
                return t > e
            },
            "<=": (t, e) => {
                return t <= e
            },
            ">=": (t, e) => {
                return t >= e
            },
            typeof: (t, e) => {
                return typeof t == e
            }
        };
        if (!r[operator])
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        return r[operator](t, e) ? n.fn(this) : n.inverse(this)
    }),
        Handlebars.registerHelper("inc", (t, e) => {
            return parseInt(t) + 1
        });
    Handlebars.registerHelper("positiveNegativeFormatter", (t) => {
        var e = "neutral";
        return null !== t && (t > 0 ? e = "positive" : t < 0 && (e = "negative")),
            e
    });
    Handlebars.registerHelper("substr", (t, e, n) => {
        return e.length > t ? e.substring(0, t) : e
    });
    Handlebars.registerHelper("ifEquals", (t, e, n) => {
        return t == e ? n.fn(this) : n.inverse(this)
    });
    Handlebars.registerHelper("divide", (t, e) => {
        if (isNaN(t))
            throw new TypeError("expected the first argument to be a number");
        if (isNaN(e))
            throw new TypeError("expected the second argument to be a number");
        return Number(t) / Number(e)
    });
    Handlebars.registerHelper("add", (t, e) => {
        return isNaN(t) || isNaN(e) ? "string" == typeof t && "string" == typeof e ? t + e : "" : Number(t) + Number(e)
    });
    Handlebars.registerHelper("each_upto", (t, e, n) => {
        if (!t || 0 == t.length)
            return n.inverse(this);
        for (var r = [], i = 0; i < e && i < t.length; ++i)
            r.push(n.fn(t[i]));
        return r.join("")
    });
    Handlebars.registerHelper("math", (n, t, i) => {
        return n = parseFloat(n),
            i = parseFloat(i),
            {
                "+": n + i,
                "-": n - i,
                "*": n * i,
                "/": n / i,
                "%": n % i
            }[t]
    });

}