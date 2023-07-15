function removeDiacritics(e) {
  return e.replace(/[^\u0000-\u007E]/g, function (e) {
    return diacriticsMap[e] || e;
  });
}
!(function (e, t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
      ? (module.exports = t())
      : (e.Headroom = t());
})(this, function () {
  "use strict";
  function e(e) {
    (this.callback = e), (this.ticking = !1);
  }
  function t(e) {
    return e && "undefined" != typeof window && (e === window || e.nodeType);
  }
  function i(e) {
    if (arguments.length <= 0)
      throw new Error("Missing arguments in extend function");
    var s,
      n,
      l = e || {};
    for (n = 1; n < arguments.length; n++) {
      var o = arguments[n] || {};
      for (s in o)
        "object" != typeof l[s] || t(l[s])
          ? (l[s] = l[s] || o[s])
          : (l[s] = i(l[s], o[s]));
    }
    return l;
  }
  function s(e) {
    return e === Object(e) ? e : { down: e, up: e };
  }
  function n(e, t) {
    (t = i(t, n.options)),
      (this.lastKnownScrollY = 0),
      (this.elem = e),
      (this.tolerance = s(t.tolerance)),
      (this.classes = t.classes),
      (this.offset = t.offset),
      (this.scroller = t.scroller),
      (this.initialised = !1),
      (this.onPin = t.onPin),
      (this.onUnpin = t.onUnpin),
      (this.onTop = t.onTop),
      (this.onNotTop = t.onNotTop),
      (this.onBottom = t.onBottom),
      (this.onNotBottom = t.onNotBottom);
  }
  var l = {
    bind: !!function () { }.bind,
    classList: "classList" in document.documentElement,
    rAF: !!(
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame
    ),
  };
  return (
    (window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame),
    (e.prototype = {
      constructor: e,
      update: function () {
        this.callback && this.callback(), (this.ticking = !1);
      },
      requestTick: function () {
        this.ticking ||
          (requestAnimationFrame(
            this.rafCallback || (this.rafCallback = this.update.bind(this))
          ),
            (this.ticking = !0));
      },
      handleEvent: function () {
        this.requestTick();
      },
    }),
    (n.prototype = {
      constructor: n,
      init: function () {
        return n.cutsTheMustard
          ? ((this.debouncer = new e(this.update.bind(this))),
            this.elem.classList.add(this.classes.initial),
            setTimeout(this.attachEvent.bind(this), 100),
            this)
          : void 0;
      },
      destroy: function () {
        var e = this.classes;
        (this.initialised = !1),
          this.elem.classList.remove(
            e.unpinned,
            e.pinned,
            e.top,
            e.notTop,
            e.initial
          ),
          this.scroller.removeEventListener("scroll", this.debouncer, !1);
      },
      attachEvent: function () {
        this.initialised ||
          ((this.lastKnownScrollY = this.getScrollY()),
            (this.initialised = !0),
            this.scroller.addEventListener("scroll", this.debouncer, !1),
            this.debouncer.handleEvent());
      },
      unpin: function () {
        var e = this.elem.classList,
          t = this.classes;
        (!e.contains(t.pinned) && e.contains(t.unpinned)) ||
          (e.add(t.unpinned),
            e.remove(t.pinned),
            this.onUnpin && this.onUnpin.call(this));
      },
      pin: function () {
        var e = this.elem.classList,
          t = this.classes;
        e.contains(t.unpinned) &&
          (e.remove(t.unpinned),
            e.add(t.pinned),
            this.onPin && this.onPin.call(this));
      },
      top: function () {
        var e = this.elem.classList,
          t = this.classes;
        e.contains(t.top) ||
          (e.add(t.top),
            e.remove(t.notTop),
            this.onTop && this.onTop.call(this));
      },
      notTop: function () {
        var e = this.elem.classList,
          t = this.classes;
        e.contains(t.notTop) ||
          (e.add(t.notTop),
            e.remove(t.top),
            this.onNotTop && this.onNotTop.call(this));
      },
      bottom: function () {
        var e = this.elem.classList,
          t = this.classes;
        e.contains(t.bottom) ||
          (e.add(t.bottom),
            e.remove(t.notBottom),
            this.onBottom && this.onBottom.call(this));
      },
      notBottom: function () {
        var e = this.elem.classList,
          t = this.classes;
        e.contains(t.notBottom) ||
          (e.add(t.notBottom),
            e.remove(t.bottom),
            this.onNotBottom && this.onNotBottom.call(this));
      },
      getScrollY: function () {
        return void 0 !== this.scroller.pageYOffset
          ? this.scroller.pageYOffset
          : void 0 !== this.scroller.scrollTop
            ? this.scroller.scrollTop
            : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      },
      getViewportHeight: function () {
        return (
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight
        );
      },
      getElementPhysicalHeight: function (e) {
        return Math.max(e.offsetHeight, e.clientHeight);
      },
      getScrollerPhysicalHeight: function () {
        return this.scroller === window || this.scroller === document.body
          ? this.getViewportHeight()
          : this.getElementPhysicalHeight(this.scroller);
      },
      getDocumentHeight: function () {
        var e = document.body,
          t = document.documentElement;
        return Math.max(
          e.scrollHeight,
          t.scrollHeight,
          e.offsetHeight,
          t.offsetHeight,
          e.clientHeight,
          t.clientHeight
        );
      },
      getElementHeight: function (e) {
        return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight);
      },
      getScrollerHeight: function () {
        return this.scroller === window || this.scroller === document.body
          ? this.getDocumentHeight()
          : this.getElementHeight(this.scroller);
      },
      isOutOfBounds: function (e) {
        var t = 0 > e,
          i = e + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
        return t || i;
      },
      toleranceExceeded: function (e, t) {
        return Math.abs(e - this.lastKnownScrollY) >= this.tolerance[t];
      },
      shouldUnpin: function (e, t) {
        var i = e > this.lastKnownScrollY,
          s = e >= this.offset;
        return i && s && t;
      },
      shouldPin: function (e, t) {
        var i = e < this.lastKnownScrollY,
          s = e <= this.offset;
        return (i && t) || s;
      },
      update: function () {
        var e = this.getScrollY(),
          t = e > this.lastKnownScrollY ? "down" : "up",
          i = this.toleranceExceeded(e, t);
        this.isOutOfBounds(e) ||
          (e <= this.offset ? this.top() : this.notTop(),
            e + this.getViewportHeight() >= this.getScrollerHeight()
              ? this.bottom()
              : this.notBottom(),
            this.shouldUnpin(e, i)
              ? this.unpin()
              : this.shouldPin(e, i) && this.pin(),
            (this.lastKnownScrollY = e));
      },
    }),
    (n.options = {
      tolerance: { up: 0, down: 0 },
      offset: 0,
      scroller: window,
      classes: {
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
        top: "headroom--top",
        notTop: "headroom--not-top",
        bottom: "headroom--bottom",
        notBottom: "headroom--not-bottom",
        initial: "headroom",
      },
    }),
    (n.cutsTheMustard = void 0 !== l && l.rAF && l.bind && l.classList),
    n
  );
}),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (e) {
        return t(e);
      })
      : "object" == typeof exports
        ? (module.exports = t(require("jquery")))
        : t(e.jQuery);
  })(this, function (e) {
    !(function () {
      "use strict";
      function t(t, s) {
        if (
          ((this.el = t),
            (this.$el = e(t)),
            (this.s = e.extend({}, i, s)),
            this.s.dynamic &&
            "undefined" !== this.s.dynamicEl &&
            this.s.dynamicEl.constructor === Array &&
            !this.s.dynamicEl.length)
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.modules = {}),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.hideBartimeout = !1),
          (this.isTouch = "ontouchstart" in document.documentElement),
          this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
          this.s.dynamic
            ? (this.$items = this.s.dynamicEl)
            : "this" === this.s.selector
              ? (this.$items = this.$el)
              : "" !== this.s.selector
                ? this.s.selectWithin
                  ? (this.$items = e(this.s.selectWithin).find(this.s.selector))
                  : (this.$items = this.$el.find(e(this.s.selector)))
                : (this.$items = this.$el.children()),
          (this.$slide = ""),
          (this.$outer = ""),
          this.init(),
          this
        );
      }
      var i = {
        mode: "lg-slide",
        cssEasing: "ease",
        easing: "linear",
        speed: 600,
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 150,
        hideBarsDelay: 6e3,
        useLeft: !1,
        closable: !0,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        controls: !0,
        slideEndAnimatoin: !0,
        hideControlOnEnd: !1,
        mousewheel: !0,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 1,
        showAfterLoad: !0,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: !1,
        iframeMaxWidth: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        galleryId: 1,
      };
      (t.prototype.init = function () {
        var t = this;
        t.s.preload > t.$items.length && (t.s.preload = t.$items.length);
        var i = window.location.hash;
        i.indexOf("lg=" + this.s.galleryId) > 0 &&
          ((t.index = parseInt(i.split("&slide=")[1], 10)),
            e("body").addClass("lg-from-hash"),
            e("body").hasClass("lg-on") ||
            (setTimeout(function () {
              t.build(t.index);
            }),
              e("body").addClass("lg-on"))),
          t.s.dynamic
            ? (t.$el.trigger("onBeforeOpen.lg"),
              (t.index = t.s.index || 0),
              e("body").hasClass("lg-on") ||
              setTimeout(function () {
                t.build(t.index), e("body").addClass("lg-on");
              }))
            : t.$items.on("click.lgcustom", function (i) {
              try {
                i.preventDefault(), i.preventDefault();
              } catch (e) {
                i.returnValue = !1;
              }
              t.$el.trigger("onBeforeOpen.lg"),
                (t.index = t.s.index || t.$items.index(this)),
                e("body").hasClass("lg-on") ||
                (t.build(t.index), e("body").addClass("lg-on"));
            });
      }),
        (t.prototype.build = function (t) {
          var i = this;
          i.structure(),
            e.each(e.fn.lightGallery.modules, function (t) {
              i.modules[t] = new e.fn.lightGallery.modules[t](i.el);
            }),
            i.slide(t, !1, !1, !1),
            i.s.keyPress && i.keyPress(),
            i.$items.length > 1
              ? (i.arrow(),
                setTimeout(function () {
                  i.enableDrag(), i.enableSwipe();
                }, 50),
                i.s.mousewheel && i.mousewheel())
              : i.$slide.on("click.lg", function () {
                i.$el.trigger("onSlideClick.lg");
              }),
            i.counter(),
            i.closeGallery(),
            i.$el.trigger("onAfterOpen.lg"),
            i.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
              i.$outer.removeClass("lg-hide-items"),
                clearTimeout(i.hideBartimeout),
                (i.hideBartimeout = setTimeout(function () {
                  i.$outer.addClass("lg-hide-items");
                }, i.s.hideBarsDelay));
            }),
            i.$outer.trigger("mousemove.lg");
        }),
        (t.prototype.structure = function () {
          var t,
            i = "",
            s = "",
            n = 0,
            l = "",
            o = this;
          for (
            e("body").append('<div class="lg-backdrop"></div>'),
            e(".lg-backdrop").css(
              "transition-duration",
              this.s.backdropDuration + "ms"
            ),
            n = 0;
            n < this.$items.length;
            n++
          )
            i += '<div class="lg-item"></div>';
          if (
            (this.s.controls &&
              this.$items.length > 1 &&
              (s =
                '<div class="lg-actions"><button class="lg-prev lg-icon">' +
                this.s.prevHtml +
                '</button><button class="lg-next lg-icon">' +
                this.s.nextHtml +
                "</button></div>"),
              ".lg-sub-html" === this.s.appendSubHtmlTo &&
              (l = '<div class="lg-sub-html"></div>'),
              (t =
                '<div class="lg-outer ' +
                this.s.addClass +
                " " +
                this.s.startClass +
                '"><div class="lg" style="width:' +
                this.s.width +
                "; height:" +
                this.s.height +
                '"><div class="lg-inner">' +
                i +
                '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
                s +
                l +
                "</div></div>"),
              e("body").append(t),
              (this.$outer = e(".lg-outer")),
              (this.$slide = this.$outer.find(".lg-item")),
              this.s.useLeft
                ? (this.$outer.addClass("lg-use-left"),
                  (this.s.mode = "lg-slide"))
                : this.$outer.addClass("lg-use-css3"),
              o.setTop(),
              e(window).on("resize.lg orientationchange.lg", function () {
                setTimeout(function () {
                  o.setTop();
                }, 100);
              }),
              this.$slide.eq(this.index).addClass("lg-current"),
              this.doCss()
                ? this.$outer.addClass("lg-css3")
                : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
              this.$outer.addClass(this.s.mode),
              this.s.enableDrag &&
              this.$items.length > 1 &&
              this.$outer.addClass("lg-grab"),
              this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
              this.doCss())
          ) {
            var a = this.$outer.find(".lg-inner");
            a.css("transition-timing-function", this.s.cssEasing),
              a.css("transition-duration", this.s.speed + "ms");
          }
          setTimeout(function () {
            e(".lg-backdrop").addClass("in");
          }),
            setTimeout(function () {
              o.$outer.addClass("lg-visible");
            }, this.s.backdropDuration),
            this.s.download &&
            this.$outer
              .find(".lg-toolbar")
              .append(
                '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
              ),
            (this.prevScrollTop = e(window).scrollTop());
        }),
        (t.prototype.setTop = function () {
          if ("100%" !== this.s.height) {
            var t = e(window).height(),
              i = (t - parseInt(this.s.height, 10)) / 2,
              s = this.$outer.find(".lg");
            t >= parseInt(this.s.height, 10)
              ? s.css("top", i + "px")
              : s.css("top", "0px");
          }
        }),
        (t.prototype.doCss = function () {
          return !!(function () {
            var e = [
              "transition",
              "MozTransition",
              "WebkitTransition",
              "OTransition",
              "msTransition",
              "KhtmlTransition",
            ],
              t = document.documentElement,
              i = 0;
            for (i = 0; i < e.length; i++) if (e[i] in t.style) return !0;
          })();
        }),
        (t.prototype.isVideo = function (e, t) {
          var i;
          if (
            ((i = this.s.dynamic
              ? this.s.dynamicEl[t].html
              : this.$items.eq(t).attr("data-html")),
              !e)
          )
            return i
              ? { html5: !0 }
              : (console.error(
                "lightGallery :- data-src is not pvovided on slide item " +
                (t + 1) +
                ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"
              ),
                !1);
          var s = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
          ),
            n = e.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
            l = e.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
            o = e.match(
              /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
            );
          return s
            ? { youtube: s }
            : n
              ? { vimeo: n }
              : l
                ? { dailymotion: l }
                : o
                  ? { vk: o }
                  : void 0;
        }),
        (t.prototype.counter = function () {
          this.s.counter &&
            e(this.s.appendCounterTo).append(
              '<div id="lg-counter"><span id="lg-counter-current">' +
              (parseInt(this.index, 10) + 1) +
              '</span> / <span id="lg-counter-all">' +
              this.$items.length +
              "</span></div>"
            );
        }),
        (t.prototype.addHtml = function (t) {
          var i,
            s,
            n = null;
          if (
            (this.s.dynamic
              ? this.s.dynamicEl[t].subHtmlUrl
                ? (i = this.s.dynamicEl[t].subHtmlUrl)
                : (n = this.s.dynamicEl[t].subHtml)
              : (s = this.$items.eq(t)).attr("data-sub-html-url")
                ? (i = s.attr("data-sub-html-url"))
                : ((n = s.attr("data-sub-html")),
                  this.s.getCaptionFromTitleOrAlt &&
                  !n &&
                  (n = s.attr("title") || s.find("img").first().attr("alt"))),
              !i)
          )
            if (void 0 !== n && null !== n) {
              var l = n.substring(0, 1);
              ("." !== l && "#" !== l) ||
                (n =
                  this.s.subHtmlSelectorRelative && !this.s.dynamic
                    ? s.find(n).html()
                    : e(n).html());
            } else n = "";
          ".lg-sub-html" === this.s.appendSubHtmlTo
            ? i
              ? this.$outer.find(this.s.appendSubHtmlTo).load(i)
              : this.$outer.find(this.s.appendSubHtmlTo).html(n)
            : i
              ? this.$slide.eq(t).load(i)
              : this.$slide.eq(t).append(n),
            void 0 !== n &&
            null !== n &&
            ("" === n
              ? this.$outer
                .find(this.s.appendSubHtmlTo)
                .addClass("lg-empty-html")
              : this.$outer
                .find(this.s.appendSubHtmlTo)
                .removeClass("lg-empty-html")),
            this.$el.trigger("onAfterAppendSubHtml.lg", [t]);
        }),
        (t.prototype.preload = function (e) {
          var t = 1,
            i = 1;
          for (
            t = 1;
            t <= this.s.preload && !(t >= this.$items.length - e);
            t++
          )
            this.loadContent(e + t, !1, 0);
          for (i = 1; i <= this.s.preload && !(e - i < 0); i++)
            this.loadContent(e - i, !1, 0);
        }),
        (t.prototype.loadContent = function (t, i, s) {
          var n,
            l,
            o,
            a,
            r,
            d,
            c = this,
            u = !1,
            h = function (t) {
              for (var i = [], s = [], n = 0; n < t.length; n++) {
                var o = t[n].split(" ");
                "" === o[0] && o.splice(0, 1), s.push(o[0]), i.push(o[1]);
              }
              for (var a = e(window).width(), r = 0; r < i.length; r++)
                if (parseInt(i[r], 10) > a) {
                  l = s[r];
                  break;
                }
            };
          c.s.dynamic
            ? (c.s.dynamicEl[t].poster &&
              ((u = !0), (o = c.s.dynamicEl[t].poster)),
              (d = c.s.dynamicEl[t].html),
              (l = c.s.dynamicEl[t].src),
              c.s.dynamicEl[t].responsive &&
              h(c.s.dynamicEl[t].responsive.split(",")),
              (a = c.s.dynamicEl[t].srcset),
              (r = c.s.dynamicEl[t].sizes))
            : (c.$items.eq(t).attr("data-poster") &&
              ((u = !0), (o = c.$items.eq(t).attr("data-poster"))),
              (d = c.$items.eq(t).attr("data-html")),
              (l =
                c.$items.eq(t).attr("href") || c.$items.eq(t).attr("data-src")),
              c.$items.eq(t).attr("data-responsive") &&
              h(c.$items.eq(t).attr("data-responsive").split(",")),
              (a = c.$items.eq(t).attr("data-srcset")),
              (r = c.$items.eq(t).attr("data-sizes")));
          var g = !1;
          c.s.dynamic
            ? c.s.dynamicEl[t].iframe && (g = !0)
            : "true" === c.$items.eq(t).attr("data-iframe") && (g = !0);
          var f = c.isVideo(l, t);
          if (!c.$slide.eq(t).hasClass("lg-loaded")) {
            if (g)
              c.$slide
                .eq(t)
                .prepend(
                  '<div class="lg-video-cont lg-has-iframe" style="max-width:' +
                  c.s.iframeMaxWidth +
                  '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                  l +
                  '"  allowfullscreen="true"></iframe></div></div>'
                );
            else if (u) {
              var m = "";
              (m =
                f && f.youtube
                  ? "lg-has-youtube"
                  : f && f.vimeo
                    ? "lg-has-vimeo"
                    : "lg-has-html5"),
                c.$slide
                  .eq(t)
                  .prepend(
                    '<div class="lg-video-cont ' +
                    m +
                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                    o +
                    '" /></div></div>'
                  );
            } else
              f
                ? (c.$slide
                  .eq(t)
                  .prepend(
                    '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                  ),
                  c.$el.trigger("hasVideo.lg", [t, l, d]))
                : c.$slide
                  .eq(t)
                  .prepend(
                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                    l +
                    '" /></div>'
                  );
            if (
              (c.$el.trigger("onAferAppendSlide.lg", [t]),
                (n = c.$slide.eq(t).find(".lg-object")),
                r && n.attr("sizes", r),
                a)
            ) {
              n.attr("srcset", a);
              try {
                picturefill({ elements: [n[0]] });
              } catch (e) {
                console.warn(
                  "lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document."
                );
              }
            }
            ".lg-sub-html" !== this.s.appendSubHtmlTo && c.addHtml(t),
              c.$slide.eq(t).addClass("lg-loaded");
          }
          c.$slide
            .eq(t)
            .find(".lg-object")
            .on("load.lg error.lg", function () {
              var i = 0;
              s && !e("body").hasClass("lg-from-hash") && (i = s),
                setTimeout(function () {
                  c.$slide.eq(t).addClass("lg-complete"),
                    c.$el.trigger("onSlideItemLoad.lg", [t, s || 0]);
                }, i);
            }),
            f && f.html5 && !u && c.$slide.eq(t).addClass("lg-complete"),
            !0 === i &&
            (c.$slide.eq(t).hasClass("lg-complete")
              ? c.preload(t)
              : c.$slide
                .eq(t)
                .find(".lg-object")
                .on("load.lg error.lg", function () {
                  c.preload(t);
                }));
        }),
        (t.prototype.slide = function (t, i, s, n) {
          var l = this.$outer.find(".lg-current").index(),
            o = this;
          if (!o.lGalleryOn || l !== t) {
            var a = this.$slide.length,
              r = o.lGalleryOn ? this.s.speed : 0;
            if (!o.lgBusy) {
              if (this.s.download) {
                var d;
                (d = o.s.dynamic
                  ? !1 !== o.s.dynamicEl[t].downloadUrl &&
                  (o.s.dynamicEl[t].downloadUrl || o.s.dynamicEl[t].src)
                  : "false" !== o.$items.eq(t).attr("data-download-url") &&
                  (o.$items.eq(t).attr("data-download-url") ||
                    o.$items.eq(t).attr("href") ||
                    o.$items.eq(t).attr("data-src")))
                  ? (e("#lg-download").attr("href", d),
                    o.$outer.removeClass("lg-hide-download"))
                  : o.$outer.addClass("lg-hide-download");
              }
              if (
                (this.$el.trigger("onBeforeSlide.lg", [l, t, i, s]),
                  (o.lgBusy = !0),
                  clearTimeout(o.hideBartimeout),
                  ".lg-sub-html" === this.s.appendSubHtmlTo &&
                  setTimeout(function () {
                    o.addHtml(t);
                  }, r),
                  this.arrowDisable(t),
                  n || (t < l ? (n = "prev") : t > l && (n = "next")),
                  i)
              ) {
                this.$slide.removeClass(
                  "lg-prev-slide lg-current lg-next-slide"
                );
                var c, u;
                a > 2
                  ? ((c = t - 1),
                    (u = t + 1),
                    0 === t && l === a - 1
                      ? ((u = 0), (c = a - 1))
                      : t === a - 1 && 0 === l && ((u = 0), (c = a - 1)))
                  : ((c = 0), (u = 1)),
                  "prev" === n
                    ? o.$slide.eq(u).addClass("lg-next-slide")
                    : o.$slide.eq(c).addClass("lg-prev-slide"),
                  o.$slide.eq(t).addClass("lg-current");
              } else
                o.$outer.addClass("lg-no-trans"),
                  this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === n
                    ? (this.$slide.eq(t).addClass("lg-prev-slide"),
                      this.$slide.eq(l).addClass("lg-next-slide"))
                    : (this.$slide.eq(t).addClass("lg-next-slide"),
                      this.$slide.eq(l).addClass("lg-prev-slide")),
                  setTimeout(function () {
                    o.$slide.removeClass("lg-current"),
                      o.$slide.eq(t).addClass("lg-current"),
                      o.$outer.removeClass("lg-no-trans");
                  }, 50);
              o.lGalleryOn
                ? (setTimeout(function () {
                  o.loadContent(t, !0, 0);
                }, this.s.speed + 50),
                  setTimeout(function () {
                    (o.lgBusy = !1),
                      o.$el.trigger("onAfterSlide.lg", [l, t, i, s]);
                  }, this.s.speed))
                : (o.loadContent(t, !0, o.s.backdropDuration),
                  (o.lgBusy = !1),
                  o.$el.trigger("onAfterSlide.lg", [l, t, i, s])),
                (o.lGalleryOn = !0),
                this.s.counter && e("#lg-counter-current").text(t + 1);
            }
          }
        }),
        (t.prototype.goToNextSlide = function (e) {
          var t = this,
            i = t.s.loop;
          e && t.$slide.length < 3 && (i = !1),
            t.lgBusy ||
            (t.index + 1 < t.$slide.length
              ? (t.index++,
                t.$el.trigger("onBeforeNextSlide.lg", [t.index]),
                t.slide(t.index, e, !1, "next"))
              : i
                ? ((t.index = 0),
                  t.$el.trigger("onBeforeNextSlide.lg", [t.index]),
                  t.slide(t.index, e, !1, "next"))
                : t.s.slideEndAnimatoin &&
                !e &&
                (t.$outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    t.$outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (t.prototype.goToPrevSlide = function (e) {
          var t = this,
            i = t.s.loop;
          e && t.$slide.length < 3 && (i = !1),
            t.lgBusy ||
            (t.index > 0
              ? (t.index--,
                t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]),
                t.slide(t.index, e, !1, "prev"))
              : i
                ? ((t.index = t.$items.length - 1),
                  t.$el.trigger("onBeforePrevSlide.lg", [t.index, e]),
                  t.slide(t.index, e, !1, "prev"))
                : t.s.slideEndAnimatoin &&
                !e &&
                (t.$outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    t.$outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (t.prototype.keyPress = function () {
          var t = this;
          this.$items.length > 1 &&
            e(window).on("keyup.lg", function (e) {
              t.$items.length > 1 &&
                (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()),
                  39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()));
            }),
            e(window).on("keydown.lg", function (e) {
              !0 === t.s.escKey &&
                27 === e.keyCode &&
                (e.preventDefault(),
                  t.$outer.hasClass("lg-thumb-open")
                    ? t.$outer.removeClass("lg-thumb-open")
                    : t.destroy());
            });
        }),
        (t.prototype.arrow = function () {
          var e = this;
          this.$outer.find(".lg-prev").on("click.lg", function () {
            e.goToPrevSlide();
          }),
            this.$outer.find(".lg-next").on("click.lg", function () {
              e.goToNextSlide();
            });
        }),
        (t.prototype.arrowDisable = function (e) {
          !this.s.loop &&
            this.s.hideControlOnEnd &&
            (e + 1 < this.$slide.length
              ? this.$outer
                .find(".lg-next")
                .removeAttr("disabled")
                .removeClass("disabled")
              : this.$outer
                .find(".lg-next")
                .attr("disabled", "disabled")
                .addClass("disabled"),
              e > 0
                ? this.$outer
                  .find(".lg-prev")
                  .removeAttr("disabled")
                  .removeClass("disabled")
                : this.$outer
                  .find(".lg-prev")
                  .attr("disabled", "disabled")
                  .addClass("disabled"));
        }),
        (t.prototype.setTranslate = function (e, t, i) {
          this.s.useLeft
            ? e.css("left", t)
            : e.css({
              transform: "translate3d(" + t + "px, " + i + "px, 0px)",
            });
        }),
        (t.prototype.touchMove = function (t, i) {
          var s = i - t;
          Math.abs(s) > 15 &&
            (this.$outer.addClass("lg-dragging"),
              this.setTranslate(this.$slide.eq(this.index), s, 0),
              this.setTranslate(
                e(".lg-prev-slide"),
                -this.$slide.eq(this.index).width() + s,
                0
              ),
              this.setTranslate(
                e(".lg-next-slide"),
                this.$slide.eq(this.index).width() + s,
                0
              ));
        }),
        (t.prototype.touchEnd = function (e) {
          var t = this;
          "lg-slide" !== t.s.mode && t.$outer.addClass("lg-slide"),
            this.$slide
              .not(".lg-current, .lg-prev-slide, .lg-next-slide")
              .css("opacity", "0"),
            setTimeout(function () {
              t.$outer.removeClass("lg-dragging"),
                e < 0 && Math.abs(e) > t.s.swipeThreshold
                  ? t.goToNextSlide(!0)
                  : e > 0 && Math.abs(e) > t.s.swipeThreshold
                    ? t.goToPrevSlide(!0)
                    : Math.abs(e) < 5 && t.$el.trigger("onSlideClick.lg"),
                t.$slide.removeAttr("style");
            }),
            setTimeout(function () {
              t.$outer.hasClass("lg-dragging") ||
                "lg-slide" === t.s.mode ||
                t.$outer.removeClass("lg-slide");
            }, t.s.speed + 100);
        }),
        (t.prototype.enableSwipe = function () {
          var e = this,
            t = 0,
            i = 0,
            s = !1;
          e.s.enableSwipe &&
            e.isTouch &&
            e.doCss() &&
            (e.$slide.on("touchstart.lg", function (i) {
              e.$outer.hasClass("lg-zoomed") ||
                e.lgBusy ||
                (i.preventDefault(),
                  e.manageSwipeClass(),
                  (t = i.originalEvent.targetTouches[0].pageX));
            }),
              e.$slide.on("touchmove.lg", function (n) {
                e.$outer.hasClass("lg-zoomed") ||
                  (n.preventDefault(),
                    (i = n.originalEvent.targetTouches[0].pageX),
                    e.touchMove(t, i),
                    (s = !0));
              }),
              e.$slide.on("touchend.lg", function () {
                e.$outer.hasClass("lg-zoomed") ||
                  (s
                    ? ((s = !1), e.touchEnd(i - t))
                    : e.$el.trigger("onSlideClick.lg"));
              }));
        }),
        (t.prototype.enableDrag = function () {
          var t = this,
            i = 0,
            s = 0,
            n = !1,
            l = !1;
          t.s.enableDrag &&
            !t.isTouch &&
            t.doCss() &&
            (t.$slide.on("mousedown.lg", function (s) {
              t.$outer.hasClass("lg-zoomed") ||
                ((e(s.target).hasClass("lg-object") ||
                  e(s.target).hasClass("lg-video-play")) &&
                  (s.preventDefault(),
                    t.lgBusy ||
                    (t.manageSwipeClass(),
                      (i = s.pageX),
                      (n = !0),
                      (t.$outer.scrollLeft += 1),
                      (t.$outer.scrollLeft -= 1),
                      t.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
                      t.$el.trigger("onDragstart.lg"))));
            }),
              e(window).on("mousemove.lg", function (e) {
                n &&
                  ((l = !0),
                    (s = e.pageX),
                    t.touchMove(i, s),
                    t.$el.trigger("onDragmove.lg"));
              }),
              e(window).on("mouseup.lg", function (o) {
                l
                  ? ((l = !1), t.touchEnd(s - i), t.$el.trigger("onDragend.lg"))
                  : (e(o.target).hasClass("lg-object") ||
                    e(o.target).hasClass("lg-video-play")) &&
                  t.$el.trigger("onSlideClick.lg"),
                  n &&
                  ((n = !1),
                    t.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }));
        }),
        (t.prototype.manageSwipeClass = function () {
          var e = this.index + 1,
            t = this.index - 1;
          this.s.loop &&
            this.$slide.length > 2 &&
            (0 === this.index
              ? (t = this.$slide.length - 1)
              : this.index === this.$slide.length - 1 && (e = 0)),
            this.$slide.removeClass("lg-next-slide lg-prev-slide"),
            t > -1 && this.$slide.eq(t).addClass("lg-prev-slide"),
            this.$slide.eq(e).addClass("lg-next-slide");
        }),
        (t.prototype.mousewheel = function () {
          var e = this;
          e.$outer.on("mousewheel.lg", function (t) {
            t.deltaY &&
              (t.deltaY > 0 ? e.goToPrevSlide() : e.goToNextSlide(),
                t.preventDefault());
          });
        }),
        (t.prototype.closeGallery = function () {
          var t = this,
            i = !1;
          this.$outer.find(".lg-close").on("click.lg", function () {
            t.destroy();
          }),
            t.s.closable &&
            (t.$outer.on("mousedown.lg", function (t) {
              i = !!(
                e(t.target).is(".lg-outer") ||
                e(t.target).is(".lg-item ") ||
                e(t.target).is(".lg-img-wrap")
              );
            }),
              t.$outer.on("mouseup.lg", function (s) {
                (e(s.target).is(".lg-outer") ||
                  e(s.target).is(".lg-item ") ||
                  (e(s.target).is(".lg-img-wrap") && i)) &&
                  (t.$outer.hasClass("lg-dragging") || t.destroy());
              }));
        }),
        (t.prototype.destroy = function (t) {
          var i = this;
          t ||
            (i.$el.trigger("onBeforeClose.lg"),
              e(window).scrollTop(i.prevScrollTop)),
            t &&
            (i.s.dynamic || this.$items.off("click.lg click.lgcustom"),
              e.removeData(i.el, "lightGallery")),
            this.$el.off(".lg.tm"),
            e.each(e.fn.lightGallery.modules, function (e) {
              i.modules[e] && i.modules[e].destroy();
            }),
            (this.lGalleryOn = !1),
            clearTimeout(i.hideBartimeout),
            (this.hideBartimeout = !1),
            e(window).off(".lg"),
            e("body").removeClass("lg-on lg-from-hash"),
            i.$outer && i.$outer.removeClass("lg-visible"),
            e(".lg-backdrop").removeClass("in"),
            setTimeout(function () {
              i.$outer && i.$outer.remove(),
                e(".lg-backdrop").remove(),
                t || i.$el.trigger("onCloseAfter.lg");
            }, i.s.backdropDuration + 50);
        }),
        (e.fn.lightGallery = function (i) {
          return this.each(function () {
            if (e.data(this, "lightGallery"))
              try {
                e(this).data("lightGallery").init();
              } catch (e) {
                console.error("lightGallery has not initiated properly");
              }
            else e.data(this, "lightGallery", new t(this, i));
          });
        }),
        (e.fn.lightGallery.modules = {});
    })();
  }),
  (function (e, t) {
    "use strict";
    var i = {
      item: 3,
      autoWidth: !1,
      slideMove: 1,
      slideMargin: 10,
      addClass: "",
      mode: "slide",
      useCSS: !0,
      cssEasing: "ease",
      easing: "linear",
      speed: 400,
      auto: !1,
      pauseOnHover: !1,
      loop: !1,
      slideEndAnimation: !0,
      pause: 2e3,
      keyPress: !1,
      controls: !0,
      prevHtml: "",
      nextHtml: "",
      rtl: !1,
      adaptiveHeight: !1,
      vertical: !1,
      verticalHeight: 500,
      vThumbWidth: 100,
      thumbItem: 10,
      pager: !0,
      gallery: !1,
      galleryMargin: 5,
      thumbMargin: 5,
      currentPagerPosition: "middle",
      enableTouch: !0,
      enableDrag: !0,
      freeMove: !0,
      swipeThreshold: 40,
      responsive: [],
      onBeforeStart: function (e) { },
      onSliderLoad: function (e) { },
      onBeforeSlide: function (e, t) { },
      onAfterSlide: function (e, t) { },
      onBeforeNextSlide: function (e, t) { },
      onBeforePrevSlide: function (e, t) { },
    };
    e.fn.lightSlider = function (t) {
      if (0 === this.length) return this;
      if (this.length > 1)
        return (
          this.each(function () {
            e(this).lightSlider(t);
          }),
          this
        );
      var s = {},
        n = e.extend(!0, {}, i, t),
        l = {},
        o = this;
      (s.$el = this), "fade" === n.mode && (n.vertical = !1);
      var a = o.children(),
        r = e(window).width(),
        d = null,
        c = null,
        u = 0,
        h = 0,
        g = !1,
        f = 0,
        m = "",
        p = 0,
        v = !0 === n.vertical ? "height" : "width",
        b = !0 === n.vertical ? "margin-bottom" : "margin-right",
        y = 0,
        C = 0,
        w = 0,
        S = 0,
        $ = null,
        T = "ontouchstart" in document.documentElement,
        z = {};
      return (
        (z.chbreakpoint = function () {
          if (((r = e(window).width()), n.responsive.length)) {
            var t;
            if (
              (!1 === n.autoWidth && (t = n.item),
                r < n.responsive[0].breakpoint)
            )
              for (var i = 0; i < n.responsive.length; i++)
                r < n.responsive[i].breakpoint &&
                  ((d = n.responsive[i].breakpoint), (c = n.responsive[i]));
            if (void 0 !== c && null !== c)
              for (var s in c.settings)
                c.settings.hasOwnProperty(s) &&
                  ((void 0 !== l[s] && null !== l[s]) || (l[s] = n[s]),
                    (n[s] = c.settings[s]));
            if (!e.isEmptyObject(l) && r > n.responsive[0].breakpoint)
              for (var o in l) l.hasOwnProperty(o) && (n[o] = l[o]);
            !1 === n.autoWidth &&
              y > 0 &&
              w > 0 &&
              t !== n.item &&
              (p = Math.round(y / ((w + n.slideMargin) * n.slideMove)));
          }
        }),
        (z.calSW = function () {
          !1 === n.autoWidth &&
            (w = (f - (n.item * n.slideMargin - n.slideMargin)) / n.item);
        }),
        (z.calWidth = function (e) {
          var t = !0 === e ? m.find(".lslide").length : a.length;
          if (!1 === n.autoWidth) h = t * (w + n.slideMargin);
          else {
            h = 0;
            for (var i = 0; i < t; i++)
              h += parseInt(a.eq(i).width()) + n.slideMargin;
          }
          return h;
        }),
        (s = {
          doCss: function () {
            return !(
              !n.useCSS ||
              !(function () {
                for (
                  var e = [
                    "transition",
                    "MozTransition",
                    "WebkitTransition",
                    "OTransition",
                    "msTransition",
                    "KhtmlTransition",
                  ],
                  t = document.documentElement,
                  i = 0;
                  i < e.length;
                  i++
                )
                  if (e[i] in t.style) return !0;
              })()
            );
          },
          keyPress: function () {
            n.keyPress &&
              e(document).on("keyup.lightslider", function (t) {
                e(":focus").is("input, textarea") ||
                  (t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                    37 === t.keyCode
                      ? o.goToPrevSlide()
                      : 39 === t.keyCode && o.goToNextSlide());
              });
          },
          controls: function () {
            n.controls &&
              (o.after(
                '<div class="lSAction"><a class="lSPrev">' +
                n.prevHtml +
                '</a><a class="lSNext">' +
                n.nextHtml +
                "</a></div>"
              ),
                n.autoWidth
                  ? z.calWidth(!1) < f && m.find(".lSAction").hide()
                  : u <= n.item && m.find(".lSAction").hide(),
                m.find(".lSAction a").on("click", function (t) {
                  return (
                    t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
                    "lSPrev" === e(this).attr("class")
                      ? o.goToPrevSlide()
                      : o.goToNextSlide(),
                    !1
                  );
                }));
          },
          initialStyle: function () {
            var e = this;
            "fade" === n.mode &&
              ((n.autoWidth = !1), (n.slideEndAnimation = !1)),
              n.auto && (n.slideEndAnimation = !1),
              n.autoWidth && ((n.slideMove = 1), (n.item = 1)),
              n.loop && ((n.slideMove = 1), (n.freeMove = !1)),
              n.onBeforeStart.call(this, o),
              z.chbreakpoint(),
              o
                .addClass("lightSlider")
                .wrap(
                  '<div class="lSSlideOuter ' +
                  n.addClass +
                  '"><div class="lSSlideWrapper"></div></div>'
                ),
              (m = o.parent(".lSSlideWrapper")),
              !0 === n.rtl && m.parent().addClass("lSrtl"),
              n.vertical
                ? (m.parent().addClass("vertical"),
                  (f = n.verticalHeight),
                  m.css("height", f + "px"))
                : (f = o.outerWidth()),
              a.addClass("lslide"),
              !0 === n.loop &&
              "slide" === n.mode &&
              (z.calSW(),
                (z.clone = function () {
                  if (z.calWidth(!0) > f) {
                    for (
                      var t = 0, i = 0, s = 0;
                      s < a.length &&
                      ((t +=
                        parseInt(o.find(".lslide").eq(s).width()) +
                        n.slideMargin),
                        i++,
                        !(t >= f + n.slideMargin));
                      s++
                    );
                    var l = !0 === n.autoWidth ? i : n.item;
                    if (l < o.find(".clone.left").length)
                      for (var r = 0; r < o.find(".clone.left").length - l; r++)
                        a.eq(r).remove();
                    if (l < o.find(".clone.right").length)
                      for (
                        var d = a.length - 1;
                        d > a.length - 1 - o.find(".clone.right").length;
                        d--
                      )
                        p--, a.eq(d).remove();
                    for (var c = o.find(".clone.right").length; c < l; c++)
                      o
                        .find(".lslide")
                        .eq(c)
                        .clone()
                        .removeClass("lslide")
                        .addClass("clone right")
                        .appendTo(o),
                        p++;
                    for (
                      var u =
                        o.find(".lslide").length - o.find(".clone.left").length;
                      u > o.find(".lslide").length - l;
                      u--
                    )
                      o.find(".lslide")
                        .eq(u - 1)
                        .clone()
                        .removeClass("lslide")
                        .addClass("clone left")
                        .prependTo(o);
                    a = o.children();
                  } else
                    a.hasClass("clone") &&
                      (o.find(".clone").remove(), e.move(o, 0));
                }),
                z.clone()),
              (z.sSW = function () {
                (u = a.length),
                  !0 === n.rtl && !1 === n.vertical && (b = "margin-left"),
                  !1 === n.autoWidth && a.css(v, w + "px"),
                  a.css(b, n.slideMargin + "px"),
                  (h = z.calWidth(!1)),
                  o.css(v, h + "px"),
                  !0 === n.loop &&
                  "slide" === n.mode &&
                  !1 === g &&
                  (p = o.find(".clone.left").length);
              }),
              (z.calL = function () {
                (a = o.children()), (u = a.length);
              }),
              this.doCss() && m.addClass("usingCss"),
              z.calL(),
              "slide" === n.mode
                ? (z.calSW(),
                  z.sSW(),
                  !0 === n.loop && ((y = e.slideValue()), this.move(o, y)),
                  !1 === n.vertical && this.setHeight(o, !1))
                : (this.setHeight(o, !0),
                  o.addClass("lSFade"),
                  this.doCss() || (a.fadeOut(0), a.eq(p).fadeIn(0))),
              !0 === n.loop && "slide" === n.mode
                ? a.eq(p).addClass("active")
                : a.first().addClass("active");
          },
          pager: function () {
            var e = this;
            if (
              ((z.createPager = function () {
                S =
                  (f - (n.thumbItem * n.thumbMargin - n.thumbMargin)) /
                  n.thumbItem;
                var t = m.find(".lslide"),
                  i = m.find(".lslide").length,
                  s = 0,
                  l = "",
                  a = 0;
                for (s = 0; s < i; s++) {
                  "slide" === n.mode &&
                    (n.autoWidth
                      ? (a +=
                        (parseInt(t.eq(s).width()) + n.slideMargin) *
                        n.slideMove)
                      : (a = s * ((w + n.slideMargin) * n.slideMove)));
                  var r = t.eq(s * n.slideMove).attr("data-thumb");
                  if (
                    (!0 === n.gallery
                      ? (l +=
                        '<li style="width:100%;' +
                        v +
                        ":" +
                        S +
                        "px;" +
                        b +
                        ":" +
                        n.thumbMargin +
                        'px"><a href="#"><img src="' +
                        r +
                        '" /></a></li>')
                      : (l += '<li><a href="#">' + (s + 1) + "</a></li>"),
                      "slide" === n.mode && a >= h - f - n.slideMargin)
                  ) {
                    s += 1;
                    var d = 2;
                    n.autoWidth &&
                      ((l += '<li><a href="#">' + (s + 1) + "</a></li>"),
                        (d = 1)),
                      s < d
                        ? ((l = null), m.parent().addClass("noPager"))
                        : m.parent().removeClass("noPager");
                    break;
                  }
                }
                var c = m.parent();
                c.find(".lSPager").html(l),
                  !0 === n.gallery &&
                  (!0 === n.vertical &&
                    c.find(".lSPager").css("width", n.vThumbWidth + "px"),
                    (C = s * (n.thumbMargin + S) + 0.5),
                    c.find(".lSPager").css({
                      property: C + "px",
                      "transition-duration": n.speed + "ms",
                    }),
                    !0 === n.vertical &&
                    m
                      .parent()
                      .css(
                        "padding-right",
                        n.vThumbWidth + n.galleryMargin + "px"
                      ),
                    c.find(".lSPager").css(v, C + "px"));
                var u = c.find(".lSPager").find("li");
                u.first().addClass("active"),
                  u.on("click", function () {
                    return (
                      !0 === n.loop && "slide" === n.mode
                        ? (p +=
                          u.index(this) -
                          c.find(".lSPager").find("li.active").index())
                        : (p = u.index(this)),
                      o.mode(!1),
                      !0 === n.gallery && e.slideThumb(),
                      !1
                    );
                  });
              }),
                n.pager)
            ) {
              var t = "lSpg";
              n.gallery && (t = "lSGallery"),
                m.after('<ul class="lSPager ' + t + '"></ul>');
              var i = n.vertical ? "margin-left" : "margin-top";
              m
                .parent()
                .find(".lSPager")
                .css(i, n.galleryMargin + "px"),
                z.createPager();
            }
            setTimeout(function () {
              z.init();
            }, 0);
          },
          setHeight: function (e, t) {
            var i = null,
              s = this;
            i = n.loop ? e.children(".lslide ").first() : e.children().first();
            var l = function () {
              var s = i.outerHeight(),
                n = 0,
                l = s;
              t && ((s = 0), (n = (100 * l) / f)),
                e.css({ height: s + "px", "padding-bottom": n + "%" });
            };
            l(),
              i.find("img").length
                ? i.find("img")[0].complete
                  ? (l(), $ || s.auto())
                  : i.find("img").on("load", function () {
                    setTimeout(function () {
                      l(), $ || s.auto();
                    }, 100);
                  })
                : $ || s.auto();
          },
          active: function (e, t) {
            this.doCss() && "fade" === n.mode && m.addClass("on");
            var i = 0;
            if (p * n.slideMove < u) {
              e.removeClass("active"),
                this.doCss() ||
                "fade" !== n.mode ||
                !1 !== t ||
                e.fadeOut(n.speed),
                (i = !0 === t ? p : p * n.slideMove);
              var s, l;
              !0 === t && ((l = (s = e.length) - 1), i + 1 >= s && (i = l)),
                !0 === n.loop &&
                "slide" === n.mode &&
                ((i =
                  !0 === t
                    ? p - o.find(".clone.left").length
                    : p * n.slideMove),
                  !0 === t &&
                  ((l = (s = e.length) - 1),
                    i + 1 === s ? (i = l) : i + 1 > s && (i = 0))),
                this.doCss() ||
                "fade" !== n.mode ||
                !1 !== t ||
                e.eq(i).fadeIn(n.speed),
                e.eq(i).addClass("active");
            } else
              e.removeClass("active"),
                e.eq(e.length - 1).addClass("active"),
                this.doCss() ||
                "fade" !== n.mode ||
                !1 !== t ||
                (e.fadeOut(n.speed), e.eq(i).fadeIn(n.speed));
          },
          move: function (e, t) {
            !0 === n.rtl && (t = -t),
              this.doCss()
                ? !0 === n.vertical
                  ? e.css({
                    transform: "translate3d(0px, " + -t + "px, 0px)",
                    "-webkit-transform":
                      "translate3d(0px, " + -t + "px, 0px)",
                  })
                  : e.css({
                    transform: "translate3d(" + -t + "px, 0px, 0px)",
                    "-webkit-transform":
                      "translate3d(" + -t + "px, 0px, 0px)",
                  })
                : !0 === n.vertical
                  ? e
                    .css("position", "relative")
                    .animate({ top: -t + "px" }, n.speed, n.easing)
                  : e
                    .css("position", "relative")
                    .animate({ left: -t + "px" }, n.speed, n.easing);
            var i = m.parent().find(".lSPager").find("li");
            this.active(i, !0);
          },
          fade: function () {
            this.active(a, !1);
            var e = m.parent().find(".lSPager").find("li");
            this.active(e, !0);
          },
          slide: function () {
            var e = this;
            (z.calSlide = function () {
              h > f &&
                ((y = e.slideValue()),
                  e.active(a, !1),
                  y > h - f - n.slideMargin
                    ? (y = h - f - n.slideMargin)
                    : y < 0 && (y = 0),
                  e.move(o, y),
                  !0 === n.loop &&
                  "slide" === n.mode &&
                  (p >= u - o.find(".clone.left").length / n.slideMove &&
                    e.resetSlide(o.find(".clone.left").length),
                    0 === p && e.resetSlide(m.find(".lslide").length)));
            }),
              z.calSlide();
          },
          resetSlide: function (e) {
            var t = this;
            m.find(".lSAction a").addClass("disabled"),
              setTimeout(function () {
                (p = e),
                  m.css("transition-duration", "0ms"),
                  (y = t.slideValue()),
                  t.active(a, !1),
                  s.move(o, y),
                  setTimeout(function () {
                    m.css("transition-duration", n.speed + "ms"),
                      m.find(".lSAction a").removeClass("disabled");
                  }, 50);
              }, n.speed + 100);
          },
          slideValue: function () {
            var e = 0;
            if (!1 === n.autoWidth) e = p * ((w + n.slideMargin) * n.slideMove);
            else {
              e = 0;
              for (var t = 0; t < p; t++)
                e += parseInt(a.eq(t).width()) + n.slideMargin;
            }
            return e;
          },
          slideThumb: function () {
            var e;
            switch (n.currentPagerPosition) {
              case "left":
                e = 0;
                break;
              case "middle":
                e = f / 2 - S / 2;
                break;
              case "right":
                e = f - S;
            }
            var t = p - o.find(".clone.left").length,
              i = m.parent().find(".lSPager");
            "slide" === n.mode &&
              !0 === n.loop &&
              (t >= i.children().length
                ? (t = 0)
                : t < 0 && (t = i.children().length));
            var s = t * (S + n.thumbMargin) - e;
            s + f > C && (s = C - f - n.thumbMargin),
              s < 0 && (s = 0),
              this.move(i, s);
          },
          auto: function () {
            n.auto &&
              (clearInterval($),
                ($ = setInterval(function () {
                  o.goToNextSlide();
                }, n.pause)));
          },
          pauseOnHover: function () {
            var t = this;
            n.auto &&
              n.pauseOnHover &&
              (m.on("mouseenter", function () {
                e(this).addClass("ls-hover"), o.pause(), (n.auto = !0);
              }),
                m.on("mouseleave", function () {
                  e(this).removeClass("ls-hover"),
                    m.find(".lightSlider").hasClass("lsGrabbing") || t.auto();
                }));
          },
          touchMove: function (e, t) {
            if ((m.css("transition-duration", "0ms"), "slide" === n.mode)) {
              var i = y - (e - t);
              if (i >= h - f - n.slideMargin)
                if (!1 === n.freeMove) i = h - f - n.slideMargin;
                else {
                  var s = h - f - n.slideMargin;
                  i = s + (i - s) / 5;
                }
              else i < 0 && (!1 === n.freeMove ? (i = 0) : (i /= 5));
              this.move(o, i);
            }
          },
          touchEnd: function (e) {
            if (
              (m.css("transition-duration", n.speed + "ms"), "slide" === n.mode)
            ) {
              var t = !1,
                i = !0;
              (y -= e) > h - f - n.slideMargin
                ? ((y = h - f - n.slideMargin), !1 === n.autoWidth && (t = !0))
                : y < 0 && (y = 0);
              var s = function (e) {
                var i = 0;
                if ((t || (e && (i = 1)), n.autoWidth))
                  for (
                    var s = 0, l = 0;
                    l < a.length &&
                    ((s += parseInt(a.eq(l).width()) + n.slideMargin),
                      (p = l + i),
                      !(s >= y));
                    l++
                  );
                else {
                  var o = y / ((w + n.slideMargin) * n.slideMove);
                  (p = parseInt(o) + i),
                    y >= h - f - n.slideMargin && o % 1 != 0 && p++;
                }
              };
              e >= n.swipeThreshold
                ? (s(!1), (i = !1))
                : e <= -n.swipeThreshold && (s(!0), (i = !1)),
                o.mode(i),
                this.slideThumb();
            } else
              e >= n.swipeThreshold
                ? o.goToPrevSlide()
                : e <= -n.swipeThreshold && o.goToNextSlide();
          },
          enableDrag: function () {
            var t = this;
            if (!T) {
              var i = 0,
                s = 0,
                l = !1;
              m.find(".lightSlider").addClass("lsGrab"),
                m.on("mousedown", function (t) {
                  if (h < f && 0 !== h) return !1;
                  "lSPrev" !== e(t.target).attr("class") &&
                    "lSNext" !== e(t.target).attr("class") &&
                    ((i = !0 === n.vertical ? t.pageY : t.pageX),
                      (l = !0),
                      t.preventDefault
                        ? t.preventDefault()
                        : (t.returnValue = !1),
                      (m.scrollLeft += 1),
                      (m.scrollLeft -= 1),
                      m
                        .find(".lightSlider")
                        .removeClass("lsGrab")
                        .addClass("lsGrabbing"),
                      clearInterval($));
                }),
                e(window).on("mousemove", function (e) {
                  l &&
                    ((s = !0 === n.vertical ? e.pageY : e.pageX),
                      t.touchMove(s, i));
                }),
                e(window).on("mouseup", function (o) {
                  if (l) {
                    m
                      .find(".lightSlider")
                      .removeClass("lsGrabbing")
                      .addClass("lsGrab"),
                      (l = !1);
                    var a = (s = !0 === n.vertical ? o.pageY : o.pageX) - i;
                    Math.abs(a) >= n.swipeThreshold &&
                      e(window).on("click.ls", function (t) {
                        t.preventDefault
                          ? t.preventDefault()
                          : (t.returnValue = !1),
                          t.stopImmediatePropagation(),
                          t.stopPropagation(),
                          e(window).off("click.ls");
                      }),
                      t.touchEnd(a);
                  }
                });
            }
          },
          enableTouch: function () {
            var e = this;
            if (T) {
              var t = {},
                i = {};
              m.on("touchstart", function (e) {
                (i = e.originalEvent.targetTouches[0]),
                  (t.pageX = e.originalEvent.targetTouches[0].pageX),
                  (t.pageY = e.originalEvent.targetTouches[0].pageY),
                  clearInterval($);
              }),
                m.on("touchmove", function (s) {
                  if (h < f && 0 !== h) return !1;
                  var l = s.originalEvent;
                  i = l.targetTouches[0];
                  var o = Math.abs(i.pageX - t.pageX),
                    a = Math.abs(i.pageY - t.pageY);
                  !0 === n.vertical
                    ? (3 * a > o && s.preventDefault(),
                      e.touchMove(i.pageY, t.pageY))
                    : (3 * o > a && s.preventDefault(),
                      e.touchMove(i.pageX, t.pageX));
                }),
                m.on("touchend", function () {
                  if (h < f && 0 !== h) return !1;
                  var s;
                  (s =
                    !0 === n.vertical ? i.pageY - t.pageY : i.pageX - t.pageX),
                    e.touchEnd(s);
                });
            }
          },
          build: function () {
            var t = this;
            t.initialStyle(),
              this.doCss() &&
              (!0 === n.enableTouch && t.enableTouch(),
                !0 === n.enableDrag && t.enableDrag()),
              e(window).on("focus", function () {
                t.auto();
              }),
              e(window).on("blur", function () {
                clearInterval($);
              }),
              t.pager(),
              t.pauseOnHover(),
              t.controls(),
              t.keyPress();
          },
        }).build(),
        (z.init = function () {
          z.chbreakpoint(),
            !0 === n.vertical
              ? ((f = n.item > 1 ? n.verticalHeight : a.outerHeight()),
                m.css("height", f + "px"))
              : (f = m.outerWidth()),
            !0 === n.loop && "slide" === n.mode && z.clone(),
            z.calL(),
            "slide" === n.mode && o.removeClass("lSSlide"),
            "slide" === n.mode && (z.calSW(), z.sSW()),
            setTimeout(function () {
              "slide" === n.mode && o.addClass("lSSlide");
            }, 1e3),
            !0 === n.adaptiveHeight &&
            !1 === n.vertical &&
            o.css("height", a.eq(p).outerHeight(!0)),
            !1 === n.adaptiveHeight &&
            ("slide" === n.mode
              ? !1 === n.vertical
                ? s.setHeight(o, !1)
                : s.auto()
              : s.setHeight(o, !0)),
            !0 === n.gallery && s.slideThumb(),
            "slide" === n.mode && s.slide(),
            !1 === n.autoWidth
              ? a.length <= n.item
                ? m.find(".lSAction").hide()
                : m.find(".lSAction").show()
              : z.calWidth(!1) < f && 0 !== h
                ? m.find(".lSAction").hide()
                : m.find(".lSAction").show();
        }),
        (o.goToPrevSlide = function () {
          if (p > 0)
            n.onBeforePrevSlide.call(this, o, p),
              p--,
              o.mode(!1),
              !0 === n.gallery && s.slideThumb();
          else if (!0 === n.loop) {
            if ((n.onBeforePrevSlide.call(this, o, p), "fade" === n.mode)) {
              var e = u - 1;
              p = parseInt(e / n.slideMove);
            }
            o.mode(!1), !0 === n.gallery && s.slideThumb();
          } else
            !0 === n.slideEndAnimation &&
              (o.addClass("leftEnd"),
                setTimeout(function () {
                  o.removeClass("leftEnd");
                }, 400));
        }),
        (o.goToNextSlide = function () {
          var e = !0;
          "slide" === n.mode && (e = s.slideValue() < h - f - n.slideMargin),
            p * n.slideMove < u - n.slideMove && e
              ? (n.onBeforeNextSlide.call(this, o, p),
                p++,
                o.mode(!1),
                !0 === n.gallery && s.slideThumb())
              : !0 === n.loop
                ? (n.onBeforeNextSlide.call(this, o, p),
                  (p = 0),
                  o.mode(!1),
                  !0 === n.gallery && s.slideThumb())
                : !0 === n.slideEndAnimation &&
                (o.addClass("rightEnd"),
                  setTimeout(function () {
                    o.removeClass("rightEnd");
                  }, 400));
        }),
        (o.mode = function (e) {
          !0 === n.adaptiveHeight &&
            !1 === n.vertical &&
            o.css("height", a.eq(p).outerHeight(!0)),
            !1 === g &&
            ("slide" === n.mode
              ? s.doCss() &&
              (o.addClass("lSSlide"),
                "" !== n.speed &&
                m.css("transition-duration", n.speed + "ms"),
                "" !== n.cssEasing &&
                m.css("transition-timing-function", n.cssEasing))
              : s.doCss() &&
              ("" !== n.speed &&
                o.css("transition-duration", n.speed + "ms"),
                "" !== n.cssEasing &&
                o.css("transition-timing-function", n.cssEasing))),
            e || n.onBeforeSlide.call(this, o, p),
            "slide" === n.mode ? s.slide() : s.fade(),
            m.hasClass("ls-hover") || s.auto(),
            setTimeout(function () {
              e || n.onAfterSlide.call(this, o, p);
            }, n.speed),
            (g = !0);
        }),
        (o.play = function () {
          o.goToNextSlide(), (n.auto = !0), s.auto();
        }),
        (o.pause = function () {
          (n.auto = !1), clearInterval($);
        }),
        (o.refresh = function () {
          z.init();
        }),
        (o.getCurrentSlideCount = function () {
          var e = p;
          if (n.loop) {
            var t = m.find(".lslide").length,
              i = o.find(".clone.left").length;
            e = p <= i - 1 ? t + (p - i) : p >= t + i ? p - t - i : p - i;
          }
          return e + 1;
        }),
        (o.getTotalSlideCount = function () {
          return m.find(".lslide").length;
        }),
        (o.goToSlide = function (e) {
          (p = n.loop ? e + o.find(".clone.left").length - 1 : e),
            o.mode(!1),
            !0 === n.gallery && s.slideThumb();
        }),
        (o.destroy = function () {
          o.lightSlider &&
            ((o.goToPrevSlide = function () { }),
              (o.goToNextSlide = function () { }),
              (o.mode = function () { }),
              (o.play = function () { }),
              (o.pause = function () { }),
              (o.refresh = function () { }),
              (o.getCurrentSlideCount = function () { }),
              (o.getTotalSlideCount = function () { }),
              (o.goToSlide = function () { }),
              (o.lightSlider = null),
              (z = { init: function () { } }),
              o.parent().parent().find(".lSAction, .lSPager").remove(),
              o
                .removeClass(
                  "lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right"
                )
                .removeAttr("style")
                .unwrap()
                .unwrap(),
              o.children().removeAttr("style"),
              a.removeClass("lslide active"),
              o.find(".clone").remove(),
              (a = null),
              ($ = null),
              (g = !1),
              (p = 0));
        }),
        setTimeout(function () {
          n.onSliderLoad.call(this, o);
        }, 10),
        e(window).on("resize orientationchange", function (e) {
          setTimeout(function () {
            e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
              z.init();
          }, 50);
        }),
        this
      );
    };
  })(jQuery),
  (function (e, t) {
    var i = function () {
      t(e.lazySizes), e.removeEventListener("lazyunveilread", i, !0);
    };
    (t = t.bind(null, e, e.document)),
      "object" == typeof module && module.exports
        ? t(require("lazysizes"))
        : e.lazySizes
          ? i()
          : e.addEventListener("lazyunveilread", i, !0);
  })(window, function (e, t, i) {
    "use strict";
    if (e.addEventListener) {
      var s = /\s+/g,
        n = /\s*\|\s+|\s+\|\s*/g,
        l = /^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,
        o = /\(|\)|'/,
        a = { contain: 1, cover: 1 },
        r = function (e) {
          var t = i.gW(e, e.parentNode);
          return (
            (!e._lazysizesWidth || t > e._lazysizesWidth) &&
            (e._lazysizesWidth = t),
            e._lazysizesWidth
          );
        },
        d = function (e) {
          var t;
          return (
            (t = (
              getComputedStyle(e) || { getPropertyValue: function () { } }
            ).getPropertyValue("background-size")),
            !a[t] && a[e.style.backgroundSize] && (t = e.style.backgroundSize),
            t
          );
        },
        c = function (e, i, o) {
          var a = t.createElement("picture"),
            r = i.getAttribute(lazySizesConfig.sizesAttr),
            d = i.getAttribute("data-ratio"),
            c = i.getAttribute("data-optimumx");
          i._lazybgset &&
            i._lazybgset.parentNode == i &&
            i.removeChild(i._lazybgset),
            Object.defineProperty(o, "_lazybgset", { value: i, writable: !0 }),
            Object.defineProperty(i, "_lazybgset", { value: a, writable: !0 }),
            (e = e.replace(s, " ").split(n)),
            (a.style.display = "none"),
            (o.className = lazySizesConfig.lazyClass),
            1 != e.length || r || (r = "auto"),
            e.forEach(function (e) {
              var i = t.createElement("source");
              r && "auto" != r && i.setAttribute("sizes", r),
                e.match(l) &&
                (i.setAttribute(lazySizesConfig.srcsetAttr, RegExp.$1),
                  RegExp.$2 &&
                  i.setAttribute(
                    "media",
                    lazySizesConfig.customMedia[RegExp.$2] || RegExp.$2
                  )),
                a.appendChild(i);
            }),
            r &&
            (o.setAttribute(lazySizesConfig.sizesAttr, r),
              i.removeAttribute(lazySizesConfig.sizesAttr),
              i.removeAttribute("sizes")),
            c && o.setAttribute("data-optimumx", c),
            d && o.setAttribute("data-ratio", d),
            a.appendChild(o),
            i.appendChild(a);
        },
        u = function (e) {
          if (e.target._lazybgset) {
            var t = e.target,
              s = t._lazybgset,
              n = t.currentSrc || t.src;
            n &&
              (s.style.backgroundImage =
                "url(" + (o.test(n) ? JSON.stringify(n) : n) + ")"),
              t._lazybgsetLoading &&
              (i.fire(s, "_lazyloaded", {}, !1, !0),
                delete t._lazybgsetLoading);
          }
        };
      addEventListener("lazybeforeunveil", function (e) {
        var s, n, l;
        !e.defaultPrevented &&
          (s = e.target.getAttribute("data-bgset")) &&
          ((l = e.target),
            ((n = t.createElement("img")).alt = ""),
            (n._lazybgsetLoading = !0),
            (e.detail.firesLoad = !0),
            c(s, l, n),
            setTimeout(function () {
              i.loader.unveil(n),
                i.rAF(function () {
                  i.fire(n, "_lazyloaded", {}, !0, !0),
                    n.complete && u({ target: n });
                });
            }));
      }),
        t.addEventListener("load", u, !0),
        e.addEventListener(
          "lazybeforesizes",
          function (e) {
            if (
              e.detail.instance == i &&
              e.target._lazybgset &&
              e.detail.dataAttr
            ) {
              var t = e.target._lazybgset,
                s = d(t);
              a[s] &&
                ((e.target._lazysizesParentFit = s),
                  i.rAF(function () {
                    e.target.setAttribute("data-parent-fit", s),
                      e.target._lazysizesParentFit &&
                      delete e.target._lazysizesParentFit;
                  }));
            }
          },
          !0
        ),
        t.documentElement.addEventListener("lazybeforesizes", function (e) {
          !e.defaultPrevented &&
            e.target._lazybgset &&
            e.detail.instance == i &&
            (e.detail.width = r(e.target._lazybgset));
        });
    }
  }),
  (function (e, t) {
    var i = function () {
      t(e.lazySizes), e.removeEventListener("lazyunveilread", i, !0);
    };
    (t = t.bind(null, e, e.document)),
      "object" == typeof module && module.exports
        ? t(require("lazysizes"), require("../fix-ios-sizes/fix-ios-sizes"))
        : e.lazySizes
          ? i()
          : e.addEventListener("lazyunveilread", i, !0);
  })(window, function (e, t, i) {
    "use strict";
    var s,
      n = (i && i.cfg) || e.lazySizesConfig,
      l = t.createElement("img"),
      o = "sizes" in l && "srcset" in l,
      a = /\s+\d+h/g,
      r = (function () {
        var e = /\s+(\d+)(w|h)\s+(\d+)(w|h)/,
          i = Array.prototype.forEach;
        return function (s) {
          var n = t.createElement("img"),
            l = function (t) {
              var i,
                s = t.getAttribute(lazySizesConfig.srcsetAttr);
              s &&
                (s.match(e) &&
                  (i =
                    "w" == RegExp.$2
                      ? RegExp.$1 / RegExp.$3
                      : RegExp.$3 / RegExp.$1) &&
                  t.setAttribute("data-aspectratio", i),
                  t.setAttribute(lazySizesConfig.srcsetAttr, s.replace(a, "")));
            },
            o = function (e) {
              var t = e.target.parentNode;
              t &&
                "PICTURE" == t.nodeName &&
                i.call(t.getElementsByTagName("source"), l),
                l(e.target);
            },
            r = function () {
              n.currentSrc && t.removeEventListener("lazybeforeunveil", o);
            };
          s[1] &&
            (t.addEventListener("lazybeforeunveil", o),
              (n.onload = r),
              (n.onerror = r),
              (n.srcset = "data:,a 1w 1h"),
              n.complete && r());
        };
      })();
    if (
      (n || ((n = {}), (e.lazySizesConfig = n)),
        n.supportsType ||
        (n.supportsType = function (e) {
          return !e;
        }),
        !e.picturefill && !n.pf)
    ) {
      if (e.HTMLPictureElement && o)
        return (
          t.msElementsFromPoint && r(navigator.userAgent.match(/Edge\/(\d+)/)),
          void (n.pf = function () { })
        );
      (n.pf = function (t) {
        var i, n;
        if (!e.picturefill)
          for (i = 0, n = t.elements.length; i < n; i++) s(t.elements[i]);
      }),
        (s = (function () {
          var l = function (e, t) {
            return e.w - t.w;
          },
            r = /^\s*\d+\.*\d*px\s*$/,
            d = function (e) {
              var t,
                i,
                s = e.length,
                n = e[s - 1],
                l = 0;
              for (l; l < s; l++)
                if (((n = e[l]), (n.d = n.w / e.w), n.d >= e.d)) {
                  !n.cached &&
                    (t = e[l - 1]) &&
                    t.d > e.d - 0.13 * Math.pow(e.d, 2.2) &&
                    ((i = Math.pow(t.d - 0.6, 1.6)),
                      t.cached && (t.d += 0.15 * i),
                      t.d + (n.d - e.d) * i > e.d && (n = t));
                  break;
                }
              return n;
            },
            c = (function () {
              var e,
                t = /(([^,\s].[^\s]+)\s+(\d+)w)/g,
                i = /\s/,
                s = function (t, i, s, n) {
                  e.push({ c: i, u: s, w: 1 * n });
                };
              return function (n) {
                return (
                  (e = []),
                  (n = n.trim()).replace(a, "").replace(t, s),
                  e.length || !n || i.test(n) || e.push({ c: n, u: n, w: 99 }),
                  e
                );
              };
            })(),
            u = function () {
              u.init ||
                ((u.init = !0),
                  addEventListener(
                    "resize",
                    (function () {
                      var e,
                        i = t.getElementsByClassName("lazymatchmedia"),
                        n = function () {
                          var e, t;
                          for (e = 0, t = i.length; e < t; e++) s(i[e]);
                        };
                      return function () {
                        clearTimeout(e), (e = setTimeout(n, 66));
                      };
                    })()
                  ));
            },
            h = function (t, s) {
              var l,
                o = t.getAttribute("srcset") || t.getAttribute(n.srcsetAttr);
              !o &&
                s &&
                (o = t._lazypolyfill
                  ? t._lazypolyfill._set
                  : t.getAttribute(n.srcAttr) || t.getAttribute("src")),
                (t._lazypolyfill && t._lazypolyfill._set == o) ||
                ((l = c(o || "")),
                  s &&
                  t.parentNode &&
                  ((l.isPicture =
                    "PICTURE" == t.parentNode.nodeName.toUpperCase()),
                    l.isPicture &&
                    e.matchMedia &&
                    (i.aC(t, "lazymatchmedia"), u())),
                  (l._set = o),
                  Object.defineProperty(t, "_lazypolyfill", {
                    value: l,
                    writable: !0,
                  }));
            },
            g = function (t) {
              var s = e.devicePixelRatio || 1,
                n = i.getX && i.getX(t);
              return Math.min(n || s, 2.5, s);
            },
            f = function (t) {
              return e.matchMedia
                ? (f = function (e) {
                  return !e || (matchMedia(e) || {}).matches;
                })(t)
                : !t;
            },
            m = function (e) {
              var t, s, o, a, c, u, m;
              if (((a = e), h(a, !0), (c = a._lazypolyfill).isPicture))
                for (
                  s = 0,
                  o = (t = e.parentNode.getElementsByTagName("source"))
                    .length;
                  s < o;
                  s++
                )
                  if (
                    n.supportsType(t[s].getAttribute("type"), e) &&
                    f(t[s].getAttribute("media"))
                  ) {
                    (a = t[s]), h(a), (c = a._lazypolyfill);
                    break;
                  }
              return (
                c.length > 1
                  ? ((m = a.getAttribute("sizes") || ""),
                    (m =
                      (r.test(m) && parseInt(m, 10)) || i.gW(e, e.parentNode)),
                    (c.d = g(e)),
                    !c.src || !c.w || c.w < m
                      ? ((c.w = m), (u = d(c.sort(l))), (c.src = u))
                      : (u = c.src))
                  : (u = c[0]),
                u
              );
            },
            p = function (e) {
              if (
                !o ||
                !e.parentNode ||
                "PICTURE" == e.parentNode.nodeName.toUpperCase()
              ) {
                var t = m(e);
                t &&
                  t.u &&
                  e._lazypolyfill.cur != t.u &&
                  ((e._lazypolyfill.cur = t.u),
                    (t.cached = !0),
                    e.setAttribute(n.srcAttr, t.u),
                    e.setAttribute("src", t.u));
              }
            };
          return (p.parse = c), p;
        })()),
        n.loadedClass &&
        n.loadingClass &&
        (function () {
          var e = [];
          [
            'img[sizes$="px"][srcset].',
            "picture > img:not([srcset]).",
          ].forEach(function (t) {
            e.push(t + n.loadedClass), e.push(t + n.loadingClass);
          }),
            n.pf({ elements: t.querySelectorAll(e.join(", ")) });
        })();
    }
  }),
  (function (e, t) {
    var i = (function (e, t) {
      "use strict";
      if (t.getElementsByClassName) {
        var i,
          s,
          n = t.documentElement,
          l = e.Date,
          o = e.HTMLPictureElement,
          a = e.addEventListener,
          r = e.setTimeout,
          d = e.requestAnimationFrame || r,
          c = e.requestIdleCallback,
          u = /^picture$/i,
          h = ["load", "error", "lazyincluded", "_lazyloaded"],
          g = {},
          f = Array.prototype.forEach,
          m = function (e, t) {
            return (
              g[t] || (g[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
              g[t].test(e.getAttribute("class") || "") && g[t]
            );
          },
          p = function (e, t) {
            m(e, t) ||
              e.setAttribute(
                "class",
                (e.getAttribute("class") || "").trim() + " " + t
              );
          },
          v = function (e, t) {
            var i;
            (i = m(e, t)) &&
              e.setAttribute(
                "class",
                (e.getAttribute("class") || "").replace(i, " ")
              );
          },
          b = function (e, t, i) {
            var s = i ? "addEventListener" : "removeEventListener";
            i && b(e, t),
              h.forEach(function (i) {
                e[s](i, t);
              });
          },
          y = function (e, s, n, l, o) {
            var a = t.createEvent("CustomEvent");
            return (
              n || (n = {}),
              (n.instance = i),
              a.initCustomEvent(s, !l, !o, n),
              e.dispatchEvent(a),
              a
            );
          },
          C = function (t, i) {
            var n;
            !o && (n = e.picturefill || s.pf)
              ? n({ reevaluate: !0, elements: [t] })
              : i && i.src && (t.src = i.src);
          },
          w = function (e, t) {
            return (getComputedStyle(e, null) || {})[t];
          },
          S = function (e, t, i) {
            for (
              i = i || e.offsetWidth;
              i < s.minSize && t && !e._lazysizesWidth;

            )
              (i = t.offsetWidth), (t = t.parentNode);
            return i;
          },
          $ = (function () {
            var e,
              i,
              s = [],
              n = [],
              l = s,
              o = function () {
                var t = l;
                for (l = s.length ? n : s, e = !0, i = !1; t.length;)
                  t.shift()();
                e = !1;
              },
              a = function (s, n) {
                e && !n
                  ? s.apply(this, arguments)
                  : (l.push(s), i || ((i = !0), (t.hidden ? r : d)(o)));
              };
            return (a._lsFlush = o), a;
          })(),
          T = function (e, t) {
            return t
              ? function () {
                $(e);
              }
              : function () {
                var t = this,
                  i = arguments;
                $(function () {
                  e.apply(t, i);
                });
              };
          },
          z = function (e) {
            var t,
              i = 0,
              s = 666,
              n = function () {
                (t = !1), (i = l.now()), e();
              },
              o = c
                ? function () {
                  c(n, { timeout: s }), 666 !== s && (s = 666);
                }
                : T(function () {
                  r(n);
                }, !0);
            return function (e) {
              var n;
              (e = !0 === e) && (s = 44),
                t ||
                ((t = !0),
                  (n = 125 - (l.now() - i)) < 0 && (n = 0),
                  e || (n < 9 && c) ? o() : r(o, n));
            };
          },
          x = function (e) {
            var t,
              i,
              s = function () {
                (t = null), e();
              },
              n = function () {
                var e = l.now() - i;
                e < 99 ? r(n, 99 - e) : (c || s)(s);
              };
            return function () {
              (i = l.now()), t || (t = r(n, 99));
            };
          },
          _ = (function () {
            var i,
              o,
              d,
              c,
              h,
              g,
              S,
              _,
              k,
              A,
              q,
              M,
              j,
              P,
              H,
              L = /^img$/i,
              B = /^iframe$/i,
              D = "onscroll" in e && !/glebot/.test(navigator.userAgent),
              N = 0,
              W = 0,
              O = -1,
              I = function (e) {
                W--,
                  e && e.target && b(e.target, I),
                  (!e || W < 0 || !e.target) && (W = 0);
              },
              G = function (e, i) {
                var s,
                  l = e,
                  o =
                    "hidden" == w(t.body, "visibility") ||
                    "hidden" != w(e, "visibility");
                for (
                  k -= i, M += i, A -= i, q += i;
                  o && (l = l.offsetParent) && l != t.body && l != n;

                )
                  (o = (w(l, "opacity") || 1) > 0) &&
                    "visible" != w(l, "overflow") &&
                    ((s = l.getBoundingClientRect()),
                      (o =
                        q > s.left &&
                        A < s.right &&
                        M > s.top - 1 &&
                        k < s.bottom + 1));
                return o;
              },
              R = function () {
                var e, l, a, r, c, u, g, f, m;
                if ((h = s.loadMode) && W < 8 && (e = i.length)) {
                  (l = 0),
                    O++,
                    null == P &&
                    ("expand" in s ||
                      (s.expand =
                        n.clientHeight > 500 && n.clientWidth > 500
                          ? 500
                          : 370),
                      (j = s.expand),
                      (P = j * s.expFactor)),
                    N < P && W < 1 && O > 2 && h > 2 && !t.hidden
                      ? ((N = P), (O = 0))
                      : (N = h > 1 && O > 1 && W < 6 ? j : 0);
                  for (; l < e; l++)
                    if (i[l] && !i[l]._lazyRace)
                      if (D)
                        if (
                          (((f = i[l].getAttribute("data-expand")) &&
                            (u = 1 * f)) ||
                            (u = N),
                            m !== u &&
                            ((S = innerWidth + u * H),
                              (_ = innerHeight + u),
                              (g = -1 * u),
                              (m = u)),
                            (a = i[l].getBoundingClientRect()),
                            (M = a.bottom) >= g &&
                            (k = a.top) <= _ &&
                            (q = a.right) >= g * H &&
                            (A = a.left) <= S &&
                            (M || q || A || k) &&
                            (s.loadHidden ||
                              "hidden" != w(i[l], "visibility")) &&
                            ((d && W < 3 && !f && (h < 3 || O < 4)) ||
                              G(i[l], u)))
                        ) {
                          if ((J(i[l]), (c = !0), W > 9)) break;
                        } else
                          !c &&
                            d &&
                            !r &&
                            W < 4 &&
                            O < 4 &&
                            h > 2 &&
                            (o[0] || s.preloadAfterLoad) &&
                            (o[0] ||
                              (!f &&
                                (M ||
                                  q ||
                                  A ||
                                  k ||
                                  "auto" != i[l].getAttribute(s.sizesAttr)))) &&
                            (r = o[0] || i[l]);
                      else J(i[l]);
                  r && !c && J(r);
                }
              },
              F = z(R),
              Y = function (e) {
                p(e.target, s.loadedClass),
                  v(e.target, s.loadingClass),
                  b(e.target, U),
                  y(e.target, "lazyloaded");
              },
              V = T(Y),
              U = function (e) {
                V({ target: e.target });
              },
              X = function (e, t) {
                try {
                  e.contentWindow.location.replace(t);
                } catch (i) {
                  e.src = t;
                }
              },
              K = function (e) {
                var t,
                  i = e.getAttribute(s.srcsetAttr);
                (t =
                  s.customMedia[
                  e.getAttribute("data-media") || e.getAttribute("media")
                  ]) && e.setAttribute("media", t),
                  i && e.setAttribute("srcset", i);
              },
              Q = T(function (e, t, i, n, l) {
                var o, a, d, h, g, m;
                (g = y(e, "lazybeforeunveil", t)).defaultPrevented ||
                  (n &&
                    (i ? p(e, s.autosizesClass) : e.setAttribute("sizes", n)),
                    (a = e.getAttribute(s.srcsetAttr)),
                    (o = e.getAttribute(s.srcAttr)),
                    l && (h = (d = e.parentNode) && u.test(d.nodeName || "")),
                    (m = t.firesLoad || ("src" in e && (a || o || h))),
                    (g = { target: e }),
                    m &&
                    (b(e, I, !0),
                      clearTimeout(c),
                      (c = r(I, 2500)),
                      p(e, s.loadingClass),
                      b(e, U, !0)),
                    h && f.call(d.getElementsByTagName("source"), K),
                    a
                      ? e.setAttribute("srcset", a)
                      : o && !h && (B.test(e.nodeName) ? X(e, o) : (e.src = o)),
                    l && (a || h) && C(e, { src: o })),
                  e._lazyRace && delete e._lazyRace,
                  v(e, s.lazyClass),
                  $(function () {
                    (!m || (e.complete && e.naturalWidth > 1)) &&
                      (m ? I(g) : W--, Y(g));
                  }, !0);
              }),
              J = function (e) {
                var t,
                  i = L.test(e.nodeName),
                  n =
                    i &&
                    (e.getAttribute(s.sizesAttr) || e.getAttribute("sizes")),
                  l = "auto" == n;
                ((!l && d) ||
                  !i ||
                  (!e.getAttribute("src") && !e.srcset) ||
                  e.complete ||
                  m(e, s.errorClass)) &&
                  ((t = y(e, "lazyunveilread").detail),
                    l && E.updateElem(e, !0, e.offsetWidth),
                    (e._lazyRace = !0),
                    W++,
                    Q(e, t, l, n, i));
              },
              Z = function () {
                if (!d)
                  if (l.now() - g < 999) r(Z, 999);
                  else {
                    var e = x(function () {
                      (s.loadMode = 3), F();
                    });
                    (d = !0),
                      (s.loadMode = 3),
                      F(),
                      a(
                        "scroll",
                        function () {
                          3 == s.loadMode && (s.loadMode = 2), e();
                        },
                        !0
                      );
                  }
              };
            return {
              _: function () {
                (g = l.now()),
                  (i = t.getElementsByClassName(s.lazyClass)),
                  (o = t.getElementsByClassName(
                    s.lazyClass + " " + s.preloadClass
                  )),
                  (H = s.hFac),
                  a("scroll", F, !0),
                  a("resize", F, !0),
                  e.MutationObserver
                    ? new MutationObserver(F).observe(n, {
                      childList: !0,
                      subtree: !0,
                      attributes: !0,
                    })
                    : (n.addEventListener("DOMNodeInserted", F, !0),
                      n.addEventListener("DOMAttrModified", F, !0),
                      setInterval(F, 999)),
                  a("hashchange", F, !0),
                  [
                    "focus",
                    "mouseover",
                    "click",
                    "load",
                    "transitionend",
                    "animationend",
                    "webkitAnimationEnd",
                  ].forEach(function (e) {
                    t.addEventListener(e, F, !0);
                  }),
                  /d$|^c/.test(t.readyState)
                    ? Z()
                    : (a("load", Z),
                      t.addEventListener("DOMContentLoaded", F),
                      r(Z, 2e4)),
                  i.length ? (R(), $._lsFlush()) : F();
              },
              checkElems: F,
              unveil: J,
            };
          })(),
          E = (function () {
            var e,
              i = T(function (e, t, i, s) {
                var n, l, o;
                if (
                  ((e._lazysizesWidth = s),
                    (s += "px"),
                    e.setAttribute("sizes", s),
                    u.test(t.nodeName || ""))
                )
                  for (
                    l = 0, o = (n = t.getElementsByTagName("source")).length;
                    l < o;
                    l++
                  )
                    n[l].setAttribute("sizes", s);
                i.detail.dataAttr || C(e, i.detail);
              }),
              n = function (e, t, s) {
                var n,
                  l = e.parentNode;
                l &&
                  ((s = S(e, l, s)),
                    (n = y(e, "lazybeforesizes", { width: s, dataAttr: !!t }))
                      .defaultPrevented ||
                    ((s = n.detail.width) &&
                      s !== e._lazysizesWidth &&
                      i(e, l, n, s)));
              },
              l = x(function () {
                var t,
                  i = e.length;
                if (i) for (t = 0; t < i; t++) n(e[t]);
              });
            return {
              _: function () {
                (e = t.getElementsByClassName(s.autosizesClass)),
                  a("resize", l);
              },
              checkElems: l,
              updateElem: n,
            };
          })(),
          k = function () {
            k.i || ((k.i = !0), E._(), _._());
          };
        return (
          (function () {
            var t,
              i = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: 0.8,
                loadMode: 2,
                loadHidden: !0,
              };
            s = e.lazySizesConfig || e.lazysizesConfig || {};
            for (t in i) t in s || (s[t] = i[t]);
            (e.lazySizesConfig = s),
              r(function () {
                s.init && k();
              });
          })(),
          (i = {
            cfg: s,
            autoSizer: E,
            loader: _,
            init: k,
            uP: C,
            aC: p,
            rC: v,
            hC: m,
            fire: y,
            gW: S,
            rAF: $,
          })
        );
      }
    })(e, e.document);
    (e.lazySizes = i),
      "object" == typeof module && module.exports && (module.exports = i);
  })(window);
for (
  var defaultDiacriticsRemovalMap = [
    {
      base: "A",
      letters:
        "Aâ’¶ďĽˇĂ€ĂĂ‚áş¦áş¤áşŞáş¨ĂÄ€Ä‚áş°áş®áş´áş˛Č¦Ç Ă„Çžáş˘Ă…ÇşÇŤČ€Č‚áş áş¬áş¶á¸€Ä„Čşâ±Ż",
    },
    { base: "AA", letters: "ęś˛" },
    { base: "AE", letters: "Ă†ÇĽÇ˘" },
    { base: "AO", letters: "ęś´" },
    { base: "AU", letters: "ęś¶" },
    { base: "AV", letters: "ęś¸ęśş" },
    { base: "AY", letters: "ęśĽ" },
    { base: "B", letters: "Bâ’·ďĽ˘á¸‚á¸„á¸†ÉĆ‚Ć" },
    { base: "C", letters: "Câ’¸ďĽŁÄ†ÄÄŠÄŚĂ‡á¸Ć‡Č»ęśľ" },
    { base: "D", letters: "Dâ’ąďĽ¤á¸ŠÄŽá¸Śá¸á¸’á¸ŽÄĆ‹ĆŠĆ‰ęťąĂ" },
    { base: "DZ", letters: "Ç±Ç„" },
    { base: "Dz", letters: "Ç˛Ç…" },
    {
      base: "E",
      letters:
        "Eâ’şďĽĄĂĂ‰ĂŠá»€áşľá»„á»‚áşĽÄ’á¸”á¸–Ä”Ä–Ă‹áşşÄšČ„Č†áş¸á»†Č¨á¸śÄá¸á¸šĆĆŽ",
    },
    { base: "F", letters: "Fâ’»ďĽ¦á¸žĆ‘ęť»" },
    { base: "G", letters: "Gâ’ĽďĽ§Ç´Äśá¸ ÄžÄ Ç¦Ä˘Ç¤Ć“ęž ęť˝ęťľ" },
    { base: "H", letters: "Hâ’˝ďĽ¨Ä¤á¸˘á¸¦Čžá¸¤á¸¨á¸ŞÄ¦â±§â±µęžŤ" },
    { base: "I", letters: "Iâ’ľďĽ©ĂŚĂŤĂŽÄ¨ÄŞÄ¬Ä°ĂŹá¸®á»ÇŹČČŠá»ŠÄ®á¸¬Ć—" },
    { base: "J", letters: "Jâ’żďĽŞÄ´É" },
    { base: "K", letters: "Kâ“€ďĽ«á¸°Ç¨á¸˛Ä¶á¸´Ćâ±©ęť€ęť‚ęť„ęž˘" },
    { base: "L", letters: "Lâ“ďĽ¬ÄżÄąÄ˝á¸¶á¸¸Ä»á¸Ľá¸şĹČ˝â±˘â± ęťęť†ęž€" },
    { base: "LJ", letters: "Ç‡" },
    { base: "Lj", letters: "Ç" },
    { base: "M", letters: "Mâ“‚ďĽ­á¸ľáą€áą‚â±®Ćś" },
    { base: "N", letters: "Nâ“ďĽ®Ç¸ĹĂ‘áą„Ĺ‡áą†Ĺ…áąŠáąČ Ćťęžęž¤" },
    { base: "NJ", letters: "ÇŠ" },
    { base: "Nj", letters: "Ç‹" },
    {
      base: "O",
      letters:
        "Oâ“„ďĽŻĂ’Ă“Ă”á»’á»á»–á»”Ă•áąŚČ¬áąŽĹŚáąáą’ĹŽČ®Č°Ă–ČŞá»ŽĹÇ‘ČŚČŽĆ á»śá»šá» á»žá»˘á»Śá»ÇŞÇ¬ĂÇľĆ†ĆźęťŠęťŚ",
    },
    { base: "OI", letters: "Ć˘" },
    { base: "OO", letters: "ęťŽ" },
    { base: "OU", letters: "Č˘" },
    { base: "OE", letters: "ÂŚĹ’" },
    { base: "oe", letters: "ÂśĹ“" },
    { base: "P", letters: "Pâ“…ďĽ°áą”áą–Ć¤â±Łęťęť’ęť”" },
    { base: "Q", letters: "Qâ“†ďĽ±ęť–ęťÉŠ" },
    { base: "R", letters: "Râ“‡ďĽ˛Ĺ”áąĹČČ’áąšáąśĹ–áąžÉŚâ±¤ęťšęž¦ęž‚" },
    { base: "S", letters: "Sâ“ďĽłáşžĹšáą¤Ĺśáą Ĺ áą¦áą˘áą¨ČĹžâ±ľęž¨ęž„" },
    { base: "T", letters: "Tâ“‰ďĽ´áąŞĹ¤áą¬ČšĹ˘áą°áą®Ĺ¦Ć¬Ć®Čľęž†" },
    { base: "TZ", letters: "ęś¨" },
    {
      base: "U",
      letters:
        "Uâ“ŠďĽµĂ™ĂšĂ›Ĺ¨áą¸ĹŞáąşĹ¬ĂśÇ›Ç—Ç•Ç™á»¦Ĺ®Ĺ°Ç“Č”Č–ĆŻá»Şá»¨á»®á»¬á»°á»¤áą˛Ĺ˛áą¶áą´É„",
    },
    { base: "V", letters: "Vâ“‹ďĽ¶áąĽáąľĆ˛ęťžÉ…" },
    { base: "VY", letters: "ęť " },
    { base: "W", letters: "Wâ“ŚďĽ·áş€áş‚Ĺ´áş†áş„áşâ±˛" },
    { base: "X", letters: "Xâ“ŤďĽ¸áşŠáşŚ" },
    { base: "Y", letters: "Yâ“ŽďĽąá»˛ĂťĹ¶á»¸Č˛áşŽĹ¸á»¶á»´ĆłÉŽá»ľ" },
    { base: "Z", letters: "Zâ“ŹďĽşĹąáşĹ»Ĺ˝áş’áş”ĆµČ¤â±żâ±«ęť˘" },
    {
      base: "a",
      letters:
        "aâ“ď˝áşšĂ ĂˇĂ˘áş§áşĄáş«áş©ĂŁÄÄáş±áşŻáşµáşłČ§ÇˇĂ¤ÇźáşŁĂĄÇ»ÇŽČČáşˇáş­áş·á¸Ä…â±ĄÉ",
    },
    { base: "aa", letters: "ęśł" },
    { base: "ae", letters: "Ă¦Ç˝ÇŁ" },
    { base: "ao", letters: "ęśµ" },
    { base: "au", letters: "ęś·" },
    { base: "av", letters: "ęśąęś»" },
    { base: "ay", letters: "ęś˝" },
    { base: "b", letters: "bâ“‘ď˝‚á¸á¸…á¸‡Ć€ĆÉ“" },
    { base: "c", letters: "câ“’ď˝Ä‡Ä‰Ä‹ÄŤĂ§á¸‰ĆČĽęśżâ†„" },
    { base: "d", letters: "dâ““ď˝„á¸‹ÄŹá¸Ťá¸‘á¸“á¸ŹÄ‘ĆŚÉ–É—ęťş" },
    { base: "dz", letters: "ÇłÇ†" },
    {
      base: "e",
      letters:
        "eâ“”ď˝…Ă¨Ă©ĂŞá»áşżá»…á»áş˝Ä“á¸•á¸—Ä•Ä—Ă«áş»Ä›Č…Č‡áşąá»‡Č©á¸ťÄ™á¸™á¸›É‡É›Çť",
    },
    { base: "f", letters: "fâ“•ď˝†á¸źĆ’ęťĽ" },
    { base: "g", letters: "gâ“–ď˝‡ÇµÄťá¸ˇÄźÄˇÇ§ÄŁÇĄÉ ęžˇáµąęťż" },
    { base: "h", letters: "hâ“—ď˝ÄĄá¸Łá¸§Čźá¸Ąá¸©á¸«áş–Ä§â±¨â±¶ÉĄ" },
    { base: "hv", letters: "Ć•" },
    { base: "i", letters: "iâ“ď˝‰Ă¬Ă­Ă®Ä©Ä«Ä­ĂŻá¸Żá»‰ÇČ‰Č‹á»‹ÄŻá¸­É¨Ä±" },
    { base: "j", letters: "jâ“™ď˝ŠÄµÇ°É‰" },
    { base: "k", letters: "kâ“šď˝‹á¸±Ç©á¸łÄ·á¸µĆ™â±Şęťęťęť…ęžŁ" },
    { base: "l", letters: "lâ“›ď˝ŚĹ€ÄşÄľá¸·á¸ąÄĽá¸˝á¸»ĹżĹ‚ĆšÉ«â±ˇęť‰ęžęť‡" },
    { base: "lj", letters: "Ç‰" },
    { base: "m", letters: "mâ“śď˝Ťá¸żáąáąÉ±ÉŻ" },
    { base: "n", letters: "nâ“ťď˝ŽÇąĹ„Ă±áą…Ĺáą‡Ĺ†áą‹áą‰ĆžÉ˛Ĺ‰ęž‘ęžĄ" },
    { base: "nj", letters: "ÇŚ" },
    {
      base: "o",
      letters:
        "oâ“žď˝ŹĂ˛ĂłĂ´á»“á»‘á»—á»•ĂµáąŤČ­áąŹĹŤáą‘áą“ĹŹČŻČ±Ă¶Č«á»ŹĹ‘Ç’ČŤČŹĆˇá»ťá»›á»ˇá»źá»Łá»Ťá»™Ç«Ç­Ă¸ÇżÉ”ęť‹ęťŤÉµ",
    },
    { base: "oi", letters: "ĆŁ" },
    { base: "ou", letters: "ČŁ" },
    { base: "oo", letters: "ęťŹ" },
    { base: "p", letters: "pâ“źď˝áą•áą—ĆĄáµ˝ęť‘ęť“ęť•" },
    { base: "q", letters: "qâ“ ď˝‘É‹ęť—ęť™" },
    { base: "r", letters: "râ“ˇď˝’Ĺ•áą™Ĺ™Č‘Č“áą›áąťĹ—áąźÉŤÉ˝ęť›ęž§ęž" },
    { base: "s", letters: "sâ“˘ď˝“ĂźĹ›áąĄĹťáąˇĹˇáą§áąŁáą©Č™ĹźČżęž©ęž…áş›" },
    { base: "t", letters: "tâ“Łď˝”áą«áş—ĹĄáą­Č›ĹŁáą±áąŻĹ§Ć­Ęâ±¦ęž‡" },
    { base: "tz", letters: "ęś©" },
    {
      base: "u",
      letters:
        "uâ“¤ď˝•ĂąĂşĂ»Ĺ©áąąĹ«áą»Ĺ­ĂĽÇśÇÇ–Çšá»§ĹŻĹ±Ç”Č•Č—Ć°á»«á»©á»Żá»­á»±á»ĄáąłĹłáą·áąµĘ‰",
    },
    { base: "v", letters: "vâ“Ąď˝–áą˝áążĘ‹ęťźĘŚ" },
    { base: "vy", letters: "ęťˇ" },
    { base: "w", letters: "wâ“¦ď˝—áşáşĹµáş‡áş…áşáş‰â±ł" },
    { base: "x", letters: "xâ“§ď˝áş‹áşŤ" },
    { base: "y", letters: "yâ“¨ď˝™á»łĂ˝Ĺ·á»ąČłáşŹĂżá»·áş™á»µĆ´ÉŹá»ż" },
    { base: "z", letters: "zâ“©ď˝šĹşáş‘ĹĽĹľáş“áş•Ć¶ČĄÉ€â±¬ęťŁ" },
  ],
  diacriticsMap = {},
  i = 0;
  i < defaultDiacriticsRemovalMap.length;
  i++
)
  for (
    var letters = defaultDiacriticsRemovalMap[i].letters, j = 0;
    j < letters.length;
    j++
  )
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
!(function (e) {
  function t() {
    e(".jq_megamenu").hide(),
      e("body, html").removeClass("no-scroll"),
      e(".nav__link").removeClass("nav__link--active"),
      e(".dropdown.jq_nav-link").click(function (t) {
        t.preventDefault(),
          e(".nav__link").removeClass("nav__link--active"),
          "none" == e(this).next(".jq_megamenu").css("display")
            ? (e(".jq_megamenu").hide(),
              e(this).next(".jq_megamenu").css("display", "block"),
              e(this).addClass("nav__link--active"))
            : (e(this).next(".jq_megamenu").css("display", "none"),
              e(this).removeClass("nav__link--active"));
      }),
      e(".jq_megamenu-close").click(function (t) {
        e(".jq_nav-link").removeClass("nav__link--active"),
          e(this).parent(".jq_megamenu").hide();
      }),
      e("body").click(function (t) {
        e(t.target).hasClass("jq_megamenu") ||
          0 !== e(t.target).closest(".jq_megamenu").length ||
          0 !== e(t.target).parents(".nav__list").length ||
          e(".jq_megamenu").each(function () {
            "block" == e(this).css("display") &&
              (e(this).hide(),
                e(".jq_nav-link").removeClass("nav__link--active"));
          });
      });
  }
  function i() {
    function t(t) {
      t.toggleClass("menu-is-open"),
        e("#jq_nav").toggleClass("header__inner-wrap--open"),
        e("body, html").toggleClass("no-scroll");
    }
    e(".jq_megamenu").removeAttr("style"),
      e(".jq_nav-link").removeClass("nav__link--open"),
      e("#jq_hamburger").on("click", function () {
        t(e(this)),
          e(this).hasClass("menu-is-open")
            ? e("#jq_header").addClass("header--open")
            : setTimeout(function () {
              e("#jq_header").removeClass("header--open");
            }, 0);
      }),
      e(".dropdown.jq_nav-link").click(function (t) {
        t.preventDefault(),
          e(this).toggleClass("nav__link--open"),
          e(this).next(".jq_megamenu").slideToggle();
      });
  }
  function s(t) {
    t.each(function () {
      e(this).off();
    });
  }
  function n() {
    r
      ? (s(e("body, .jq_megamenu-close, .jq_nav-link, #jq_hamburger")), t())
      : (s(e("body, .jq_megamenu-close, .jq_nav-link, #jq_hamburger")), i());
  }
  function l() {
    var t = e(".slider").find("ul.lSPager");
    e(t[0].children).each(function (i, s) {
      e(this).css("width", 100 / t[0].children.length + "%"),
        e(this)
          .find("a")
          .html(e(e(e(".slider__list")[0].children).get(i)).data("title"));
    });
  }
  function o() {
    e(".footer__nav__item").click(function (t) {
      e(this).toggleClass("footer__nav__item--open"),
        e(this).find(".footer__nav__sublist").slideToggle();
    });
  }
  function a() {
    c ? s(e(".footer__nav__item")) : o();
  }
  var r = window.matchMedia("(min-width: 62.5em)").matches;
  n(),
    window.addEventListener("resize", function () {
      r !== window.matchMedia("(min-width: 62.5em)").matches &&
        ((r = window.matchMedia("(min-width: 62.5em)").matches), n());
    });
  var d = document.getElementById("jq_header");
  new Headroom(d).init(),
    e(window).scroll(function () {
      e(window).scrollTop() >= 30
        ? (e("#jq_header").addClass("header--squeezed"),
          e("#content-wrap").addClass("header-fixed"))
        : (e("#jq_header").removeClass("header--squeezed"),
          e("#content-wrap").removeClass("header-fixed"));
    });
  e(".jq_slider").lightSlider({
    item: 1,
    galleryMargin: 0,
    controls: !1,
    onSliderLoad: function (e) {
      e[0].classList.add("slider__list--loaded"),
        setTimeout(function () {
          l();
        }, 0);
    },
  });
  e("body").on("mousedown", "*", function (t) {
    (e(this).is(":focus") || e(this).is(t.target)) &&
      "none" == e(this).css("outline-style") &&
      e(this)
        .css("outline", "none")
        .on("blur", function () {
          e(this).off("blur").css("outline", "");
        });
  });
  var c = window.matchMedia("(min-width: 40.625em)").matches;
  a(),
    window.addEventListener("resize", function () {
      c !== window.matchMedia("(min-width: 40.625em)").matches &&
        ((c = window.matchMedia("(min-width: 40.625em)").matches), a());
    }),
    e(".jq_side-nav").length &&
    e(".jq_side-navToggle").on("click keypress", function (t) {
      ("click" != t.type && 13 != t.which) ||
        (e(".jq_side-navSubmenu").not(e(this).siblings("ul")).slideUp(),
          (!e(this).is(e(".side-nav__toggle.sub-is-open")))
            ? e(".side-nav__toggle.sub-is-open").removeClass("sub-is-open")
            : '',

          e(this).toggleClass("sub-is-open"),

          e(this).siblings("ul").is(":visible")
            ? (e(this).siblings("ul").slideUp())
            : (e(this).siblings("ul").slideDown()));
    }),
    e("#jq_side-nav-toggle").click(function () {
      e(".jq_side-nav").slideToggle();
    }),
    e(".body table").each(function () {
      for (var t = [], i = e(this).find("thead th"), s = 0; s < i.length; s++)
        t.push(i[s].innerText);
      for (var n = e(this).find("tbody tr"), s = 0; s < n.length; s++)
        for (var l = n[s].children, o = 0; o < l.length; o++)
          t[o] && l[o].setAttribute("data-label", t[o]);
    }),
    setTimeout(function () {
      e(".jq_slideGallery").lightSlider({
        gallery: !0,
        item: 1,
        loop: !0,
        thumbItem: 4,
        slideMargin: 0,
        enableDrag: !1,
        slideMargin: 15,
        galleryMargin: 15,
        thumbMargin: 15,
        currentPagerPosition: "left",
        responsive: [{ breakpoint: 480, settings: { thumbItem: 2 } }],
        onSliderLoad: function (e) {
          e.lightGallery({ selector: ".jq_slideGallery .lslide" });
        },
      });
    }, 0),
    e(".jq_gallery").lightGallery({ thumbnail: !0 }),
    e("#jq_print").on("click", function () {
      window.print();
    }),
    jQuery('[role="tab"]').on("keydown", function (e) {
      var t,
        i = jQuery(this),
        s = jQuery(this)
          .parents(".contact__filter__tabs__item")
          .prev()
          .children('[role="tab"]'),
        n = jQuery(this)
          .parents(".contact__filter__tabs__item")
          .next()
          .children('[role="tab"]');
      switch (e.keyCode) {
        case 37:
          t = s;
          break;
        case 39:
          t = n;
          break;
        default:
          t = !1;
      }
      t.length &&
        (i.attr({ tabindex: "-1", "aria-selected": null, "aria-hidden": !0 }),
          i.next().attr("aria-hidden", !0),
          t
            .attr({ tabindex: "0", "aria-selected": !0, "aria-hidden": !1 })
            .focus(),
          t.next().attr("aria-hidden", !1),
          t.prev("input").trigger("click"));
    });
  var u = e(".view-form-autosubmit").parent();
  e.each(u, function () {
    e(this).on(
      "change",
      ".views-exposed-form input:not(:submit), .views-exposed-form select:not(.shs-select)",
      (function (t) {
        return function () {
          e(".view-form-autosubmit").data("run-before-submit");
          var i = t.find('.views-exposed-form input[type="submit"]');
          e("#jq_loader").addClass("loader--open"), i.click();
        };
      })(e(this))
    );
  }),
    e(document).ajaxStop(function () {
      setTimeout(function () {
        e("#jq_loader").removeClass("loader--open");
      }, 0);
    });
  var h = e(".jq_search-mobile");
  h.find("input[type=search]").keydown(function (e) {
    27 == e.keyCode && h.removeClass("search-mobile--open");
  }),
    e("#jq_search-toggle").on("click", function () {
      h.addClass("search-mobile--open").attr("aria-hidden", "false"),
        h.find("input[type=search]").focus(),
        e("body, html").hasClass("no-scroll") ||
        e("body, html").addClass("no-scroll");
    }),
    e("#jq_search-close").on("click", function () {
      h.removeClass("search-mobile--open").attr("aria-hidden", "true"),
        e("#jq_hamburger").hasClass("menu-is-open") ||
        e("body, html").removeClass("no-scroll");
    }),
    localStorage.getItem("fsvuk_cookies_agreed") ||
    e("#jq_cookies").addClass("cookies--visible"),
    e("#jq_cookiesClose").click(function () {
      e("#jq_cookies").hide(),
        localStorage && localStorage.setItem("fsvuk_cookies_agreed", !0);
    }),
    e('form.fsv-newsletter-subscription-form input[name="email"]').on(
      "keyup",
      function (t) {
        var i = e("form.fsv-newsletter-subscription-form .form-item-checkbox");
        e(this).val().length > 0 ? i.addClass("show") : i.removeClass("show");
      }
    ),
    e('a[href*="#"]')
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (t) {
        if (
          location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var i = e(this.hash);
          (i = i.length ? i : e("[name=" + this.hash.slice(1) + "]")).length &&
            (t.preventDefault(),
              e("html, body").animate({ scrollTop: i.offset().top - 200 }, 1e3));
        }
      });
})(jQuery);