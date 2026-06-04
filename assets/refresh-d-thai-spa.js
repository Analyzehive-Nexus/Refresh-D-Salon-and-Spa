(function ($) {
  "use strict";

  /*-- Checkout Accoradin --*/
  if ($(".checkout-page__payment__title").length) {
    $(".checkout-page__payment__item")
      .find(".checkout-page__payment__content")
      .hide();
    $(".checkout-page__payment__item--active")
      .find(".checkout-page__payment__content")
      .show();
    $(".checkout-page__payment__title").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__item")
        .removeClass("checkout-page__payment__item--active");
      $(this)
        .parents(".checkout-page__payment")
        .find(".checkout-page__payment__content")
        .slideUp();
      $(this).parent().addClass("checkout-page__payment__item--active");
      $(this).parent().find(".checkout-page__payment__content").slideDown();
    });
  }

  let dynamicyearElm = $(".dynamic-year");
  if (dynamicyearElm.length) {
    let currentYear = new Date().getFullYear();
    dynamicyearElm.html(currentYear);
  }

  // Date Picker
  if ($(".refresh-d-thai-spa-datepicker").length) {
    $('.refresh-d-thai-spa-datepicker').each(function () {
      $(this).datepicker();
    });
  }

  // Popular Causes Progress Bar
  if ($(".count-bar").length) {
    $(".count-bar").appear(
      function () {
        var el = $(this);
        var percent = el.data("percent");
        $(el).css("width", percent).addClass("counted");
      }, {
        accY: -50
      }
    );
  }

  //Fact Counter + Text Count
  if ($(".count-box").length) {
    $(".count-box").appear(
      function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text()
          }).animate({
            countNum: n
          }, {
            duration: r,
            easing: "linear",
            step: function () {
              $t.find(".count-text").text(Math.floor(this.countNum));
            },
            complete: function () {
              $t.find(".count-text").text(this.countNum);
            }
          });
        }
      }, {
        accY: 0
      }
    );
  }

  // custom coursor
  if ($(".custom-cursor").length) {
    var cursor = document.querySelector(".custom-cursor__cursor");
    var cursorinner = document.querySelector(".custom-cursor__cursor-two");
    var a = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + "px";
      cursorinner.style.top = y + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorinner.classList.add("custom-cursor__innerhover");
    });

    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorinner.classList.remove("custom-cursor__innerhover");
    });

    a.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom-cursor__hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom-cursor__hover");
      });
    });
  }

  if ($(".contact-form-validated").length) {
    $(".contact-form-validated").validate({
      // initialize the plugin
      rules: {
        name: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        message: {
          required: true
        },
        subject: {
          required: true
        }
      },
      submitHandler: function (form) {
        // sending value with ajax request
        $.post(
          $(form).attr("action"),
          $(form).serialize(),
          function (response) {
            $(form).parent().find(".result").append(response);
            $(form).find('input[type="text"]').val("");
            $(form).find('input[type="email"]').val("");
            $(form).find("textarea").val("");
          }
        );
        return false;
      }
    });
  }

  // mailchimp form
  if ($(".mc-form").length) {
    $(".mc-form").each(function () {
      var Self = $(this);
      var mcURL = Self.data("url");
      var mcResp = Self.parent().find(".mc-form__response");

      Self.ajaxChimp({
        url: mcURL,
        callback: function (resp) {
          // appending response
          mcResp.append(function () {
            return '<p class="mc-message">' + resp.msg + "</p>";
          });
          // making things based on response
          if (resp.result === "success") {
            // Do stuff
            Self.removeClass("errored").addClass("successed");
            mcResp.removeClass("errored").addClass("successed");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
          if (resp.result === "error") {
            Self.removeClass("successed").addClass("errored");
            mcResp.removeClass("successed").addClass("errored");
            Self.find("input").val("");

            mcResp.find("p").fadeOut(10000);
          }
        }
      });
    });
  }

  if ($(".video-popup").length) {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,

      fixedContentPos: false
    });
  }

  if ($(".img-popup").length) {
    var groups = {};
    $(".img-popup").each(function () {
      var id = parseInt($(this).attr("data-group"), 10);

      if (!groups[id]) {
        groups[id] = [];
      }

      groups[id].push(this);
    });

    $.each(groups, function () {
      $(this).magnificPopup({
        type: "image",
        closeOnContentClick: true,
        closeBtnInside: false,
        gallery: {
          enabled: true
        }
      });
    });
  }

  function dynamicCurrentMenuClass(selector) {
    let FileName = window.location.href.split("/").reverse()[0];

    selector.find("li").each(function () {
      let anchor = $(this).find("a");
      if ($(anchor).attr("href") == FileName) {
        $(this).addClass("current");
      }
    });
    // if any li has .current elmnt add class
    selector.children("li").each(function () {
      if ($(this).find(".current").length) {
        $(this).addClass("current");
      }
    });
    // if no file name return
    if ("" == FileName) {
      selector.find("li").eq(0).addClass("current");
    }
  }

  if ($(".main-menu__list").length) {
    // dynamic current class
    let mainNavUL = $(".main-menu__list");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".service-sidebar__nav").length) {
    // dynamic current class
    let mainNavUL = $(".service-sidebar__nav");
    dynamicCurrentMenuClass(mainNavUL);
  }

  if ($(".main-menu").length && $(".mobile-nav__container").length) {
    let navContent = document.querySelector(".main-menu").innerHTML;
    let mobileNavContainer = document.querySelector(".mobile-nav__container");
    mobileNavContainer.innerHTML = navContent;
  }

  if ($(".sticky-header").length) {
    $(".sticky-header")
      .clone()
      .insertAfter(".sticky-header")
      .addClass("sticky-header--cloned");
  }

  if ($(".mobile-nav__container .main-menu__list").length) {
    let dropdownAnchor = $(
      ".mobile-nav__container .main-menu__list .dropdown > a"
    );
    dropdownAnchor.each(function () {
      let self = $(this);
      let toggleBtn = document.createElement("BUTTON");
      toggleBtn.setAttribute("aria-label", "dropdown toggler");
      toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
      self.append(function () {
        return toggleBtn;
      });
      self.find("button").on("click", function (e) {
        e.preventDefault();
        let self = $(this);
        self.toggleClass("expanded");
        self.parent().toggleClass("expanded");
        self.parent().parent().children("ul").slideToggle();
      });
    });
  }

  //Show Popup menu
  $(document).on("click", ".megamenu-clickable--toggler > a", function (e) {
    $("body").toggleClass("megamenu-popup-active");
    $(this).parent().find("ul").toggleClass("megamenu-clickable--active");
    e.preventDefault();
  });
  $(document).on("click", ".megamenu-clickable--close", function (e) {
    $("body").removeClass("megamenu-popup-active");
    $(".megamenu-clickable--active").removeClass("megamenu-clickable--active");
    e.preventDefault();
  });

  if ($(".mobile-nav__toggler").length) {
    $(".mobile-nav__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mobile-nav__wrapper").toggleClass("expanded");
      $("body").toggleClass("locked");
    });
  }

  if ($(".search-toggler").length) {
    $(".search-toggler").on("click", function (e) {
      e.preventDefault();
      $(".search-popup").toggleClass("active");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }
  if ($(".mini-cart__toggler").length) {
    $(".mini-cart__toggler").on("click", function (e) {
      e.preventDefault();
      $(".mini-cart").toggleClass("expanded");
      $(".mobile-nav__wrapper").removeClass("expanded");
      $("body").toggleClass("locked");
    });
  }
  if ($(".odometer").length) {
    $(".odometer").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  }

  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  if ($("#donate-amount__predefined").length) {
    let donateInput = $("#donate-amount");
    $("#donate-amount__predefined")
      .find("li")
      .on("click", function (e) {
        e.preventDefault();
        let amount = $(this).find("a").text();
        donateInput.val(amount);
        $("#donate-amount__predefined").find("li").removeClass("active");
        $(this).addClass("active");
      });
  }

  //accrodion
  if ($(".refresh-d-thai-spa-accrodion").length) {
    var accrodionGrp = $(".refresh-d-thai-spa-accrodion");
    accrodionGrp.each(function () {
      var accrodionName = $(this).data("grp-name");
      var Self = $(this);
      var accordion = Self.find(".accrodion");
      Self.addClass(accrodionName);
      Self.find(".accrodion .accrodion-content").hide();
      Self.find(".accrodion.active").find(".accrodion-content").show();
      accordion.each(function () {
        $(this)
          .find(".accrodion-title")
          .on("click", function () {
            if ($(this).parent().hasClass("active") === false) {
              $(".refresh-d-thai-spa-accrodion." + accrodionName)
                .find(".accrodion")
                .removeClass("active");
              $(".refresh-d-thai-spa-accrodion." + accrodionName)
                .find(".accrodion")
                .find(".accrodion-content")
                .slideUp();
              $(this).parent().addClass("active");
              $(this).parent().find(".accrodion-content").slideDown();
            }
          });
      });
    });
  }

  $(".add").on("click", function () {
    if ($(this).prev().val() < 999) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });

  $(".sub").on("click", function () {
    if ($(this).next().val() > 0) {
      if ($(this).next().val() > 0)
        $(this)
        .next()
        .val(+$(this).next().val() - 1);
    }
  });

  if ($(".tabs-box").length) {
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));

      if ($(target).is(":visible")) {
        return false;
      } else {
        target
          .parents(".tabs-box")
          .find(".tab-buttons")
          .find(".tab-btn")
          .removeClass("active-btn");
        $(this).addClass("active-btn");
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .fadeOut(0);
        target
          .parents(".tabs-box")
          .find(".tabs-content")
          .find(".tab")
          .removeClass("active-tab");
        $(target).fadeIn(300);
        $(target).addClass("active-tab");
      }
    });
  }

  if ($(".range-slider-price").length) {
    var priceRange = document.getElementById("range-slider-price");

    noUiSlider.create(priceRange, {
      start: [30, 150],
      limit: 200,
      behaviour: "drag",
      connect: true,
      range: {
        min: 10,
        max: 200
      }
    });

    var limitFieldMin = document.getElementById("min-value-rangeslider");
    var limitFieldMax = document.getElementById("max-value-rangeslider");

    priceRange.noUiSlider.on("update", function (values, handle) {
      (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
    });
  }

  function thmOwlInit() {
    // owl slider
    let refreshDThaiSpaOwlCarousel = $(".refresh-d-thai-spa-owl__carousel");
    if (refreshDThaiSpaOwlCarousel.length) {
      refreshDThaiSpaOwlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }
    let refreshDThaiSpaOwlCarouselNav = $(".refresh-d-thai-spa-owl__carousel--custom-nav");
    if (refreshDThaiSpaOwlCarouselNav.length) {
      refreshDThaiSpaOwlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }
  }

  function thmTinyInit() {
    // tiny slider
    const tinyElm = document.querySelectorAll(".thm-tiny__slider");
    tinyElm.forEach(function (tinyElm) {
      const tinyOptions = JSON.parse(tinyElm.dataset.tinyOptions);
      let thmTinySlider = tns(tinyOptions);
    });
  }

  /*-- Handle Scrollbar --*/
  function handleScrollbar() {
    const bodyHeight = $('body').height();
    const scrollPos = $(window).innerHeight() + $(window).scrollTop();
    let percentage = ((scrollPos / bodyHeight) * 100);
    if (percentage > 100) {
      percentage = 100;
    }
    $('.scroll-to-top .scroll-to-top__inner').css('width', percentage + '%');
  }

  /*-- One Page Menu --*/
  function SmoothMenuScroll() {
    var anchor = $(".scrollToLink");
    if (anchor.length) {
      anchor.children("a").bind("click", function (event) {
        if ($(window).scrollTop() > 10) {
          var headerH = "0";
        } else {
          var headerH = "0";
        }
        var target = $(this);
        $("html, body")
          .stop()
          .animate({
              scrollTop: $(target.attr("href")).offset().top - headerH + "px"
            },
            900,
            "easeInOutExpo"
          );
        anchor.removeClass("current");
        anchor.removeClass("current-menu-ancestor");
        anchor.removeClass("current_page_item");
        anchor.removeClass("current-menu-parent");
        target.parent().addClass("current");
        event.preventDefault();
      });
    }
  }
  SmoothMenuScroll();

  function OnePageMenuScroll() {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 117) {
      var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
      menuAnchor.each(function () {
        var sections = $(this).attr("href");
        $(sections).each(function () {
          if ($(this).offset().top <= windscroll + 100) {
            var Sectionid = $(sections).attr("id");
            $(".one-page-scroll-menu").find("li").removeClass("current");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current-menu-ancestor");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current_page_item");
            $(".one-page-scroll-menu")
              .find("li")
              .removeClass("current-menu-parent");
            $(".one-page-scroll-menu")
              .find("a[href*=\\#" + Sectionid + "]")
              .parent()
              .addClass("current");
          }
        });
      });
    } else {
      $(".one-page-scroll-menu li.current").removeClass("current");
      $(".one-page-scroll-menu li:first").addClass("current");
    }
  }

  // window scroll event
  function stickyMenuUpScroll($targetMenu, $toggleClass) {
    var lastScrollTop = 0;
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 500) {
          if (st > lastScrollTop) {
            // downscroll code
            $targetMenu.removeClass($toggleClass);
            // console.log("down");
          } else {
            // upscroll code
            $targetMenu.addClass($toggleClass);
            // console.log("up");
          }
        } else {
          $targetMenu.removeClass($toggleClass);
        }
        lastScrollTop = st;
      },
      false
    );
  }
  stickyMenuUpScroll($(".sticky-header--normal"), "active");

  //Strech Column
  function refresh_d_thai_spa_stretch() {
    var i = $(window).width();
    $(".row .refresh-d-thai-spa-stretch-element-inside-column").each(function () {
      var $this = $(this),
        row = $this.closest(".row"),
        cols = $this.closest('[class^="col-"]'),
        colsheight = $this.closest('[class^="col-"]').height(),
        rect = this.getBoundingClientRect(),
        l = row[0].getBoundingClientRect(),
        s = cols[0].getBoundingClientRect(),
        r = rect.left,
        d = i - rect.right,
        c = l.left + (parseFloat(row.css("padding-left")) || 0),
        u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
        p = s.left,
        f = i - s.right,
        styles = {
          "margin-left": 0,
          "margin-right": 0
        };
      if (Math.round(c) === Math.round(p)) {
        var h = parseFloat($this.css("margin-left") || 0);
        styles["margin-left"] = h - r;
      }
      if (Math.round(u) === Math.round(f)) {
        var w = parseFloat($this.css("margin-right") || 0);
        styles["margin-right"] = w - d;
      }
      $this.css(styles);
    });
  }
  refresh_d_thai_spa_stretch();

  function refresh_d_thai_spa_cuved_circle() {
    let circleTypeElm = $(".curved-circle--item");
    if (circleTypeElm.length) {
      circleTypeElm.each(function () {
        let elm = $(this);
        let options = elm.data("circle-text-options");
        elm.circleType(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }
  }

  /*-- Price Range --*/
  function priceFilter() {
    if ($(".price-ranger").length) {
      $(".price-ranger #slider-range").slider({
        range: true,
        min: 50,
        max: 1000,
        values: [11, 500],
        slide: function (event, ui) {
          $(".price-ranger .ranger-min-max-block .min").val("$" + ui.values[0]);
          $(".price-ranger .ranger-min-max-block .max").val("$" + ui.values[1]);
        }
      });
      $(".price-ranger .ranger-min-max-block .min").val(
        "$" + $(".price-ranger #slider-range").slider("values", 0)
      );
      $(".price-ranger .ranger-min-max-block .max").val(
        "$" + $(".price-ranger #slider-range").slider("values", 1)
      );
    }
  }

  // window load event

  // Hide preloader as soon as DOM is ready for a much faster refresh appearance
  $(function () {
    if ($(".preloader").length) {
      $(".preloader").fadeOut(300);
    }
  });

  $(window).on("load", function () {
    thmOwlInit();
    thmTinyInit();
    priceFilter();

    if ($(".circle-progress").length) {
      $(".circle-progress").appear(function () {
        let circleProgress = $(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }
    if ($(".masonry-layout").length) {
      $(".masonry-layout").imagesLoaded(function () {
        $(".masonry-layout").isotope({
          layoutMode: "masonry"
        });
      });
    }
    if ($(".fitRow-layout").length) {
      $(".fitRow-layout").imagesLoaded(function () {
        $(".fitRow-layout").isotope({
          layoutMode: "fitRows"
        });
      });
    }

    if ($(".post-filter").length) {
      var postFilterList = $(".post-filter li");
      // for first init
      $(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }

    if ($(".post-filter.has-dynamic-filter-counter").length) {
      // var allItem = $('.single-filter-item').length;

      var activeFilterItem = $(".post-filter.has-dynamic-filter-counter").find(
        "li"
      );

      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $(".filter-layout").find(filterElement).length;
        $(this).append("<sup>[" + count + "]</sup>");
      });
    }

    refresh_d_thai_spa_cuved_circle();
  });

  $(window).on("scroll", function () {
    OnePageMenuScroll();
    handleScrollbar();
    if ($(".sticky-header--one-page").length) {
      var headerScrollPos = 130;
      var stricky = $(".sticky-header--one-page");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("active");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("active");
      }
    }

    var scrollToTopBtn = ".scroll-to-top";
    if (scrollToTopBtn.length) {
      if ($(window).scrollTop() > 500) {
        $(scrollToTopBtn).addClass("show");
      } else {
        $(scrollToTopBtn).removeClass("show");
      }
    }
  });

  $(window).on("resize", function () {
    refresh_d_thai_spa_stretch();
  });



  // Mosharof (update 9-3-24)
  // Sidebar
  if ($(".main-header--five__toggler, .sidebar-one__overlay, .sidebar-one__close").length) {
    $(".main-header--five__toggler, .sidebar-one__overlay, .sidebar-one__close").on("click", function (e) {
      e.preventDefault();
      $(".sidebar-one").toggleClass("active");
      $("body").toggleClass("locked");
    });
  }
})(jQuery);

/* ==========================================================================
   CUSTOM ANIMATION & EFFECT SYSTEMS
   ========================================================================== */

(function() {
    const css = `/* Smooth Scroll Behavior */
html {
    scroll-behavior: smooth;
}

/* Translucent Premium Glassmorphism Sticky Bottom Bar */
.sticky-bottom-bar {
    position: fixed;
    bottom: -120px; /* Initially hidden, slides up dynamically */
    left: 0;
    width: 100%;
    background: rgba(26, 20, 18, 0.88); /* Premium dark warm translucent spa color */
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid rgba(201, 147, 116, 0.2);
    box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.4);
    padding: 18px 0;
    z-index: 9999;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.sticky-bottom-bar.show {
    bottom: 0;
}

.sticky-bottom-bar__text {
    margin: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #eae5e2;
    font-size: 16px;
    font-weight: 500;
}

.sticky-bottom-bar__text strong {
    color: #c99374; /* Accent color matching template */
}

/* Close Button styling */
.sticky-bottom-bar__close {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 26px;
    color: #eae5e2;
    cursor: pointer;
    line-height: 1;
    transition: color 0.3s;
    padding: 5px;
}

.sticky-bottom-bar__close:hover {
    color: #c99374;
}

/* Responsiveness adjustments for smaller devices */
@media (max-width: 768px) {
    .sticky-bottom-bar {
        padding: 15px 10px;
        text-align: center;
    }
    .sticky-bottom-bar .container {
        flex-direction: column;
        gap: 12px;
    }
    .sticky-bottom-bar__text {
        font-size: 14px;
        padding-right: 20px;
    }
    .sticky-bottom-bar__close {
        top: 15px;
        right: 10px;
        transform: none;
    }
}

/* Premium Floating Sticky Glassmorphic Navbar */
/* Premium Floating Sticky Glassmorphic Navbar */
.sticky-header--cloned {
    background: rgba(20, 18, 21, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(201, 147, 116, 0.25) !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Premium Default (Non-sticky) Header styling */
.main-header {
    background-color: rgba(20, 18, 21, 0.85) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(201, 147, 116, 0.15) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2) !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Navigation Link Animations */
.main-menu__list > li > a {
    position: relative;
    color: #eae5e2 !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    letter-spacing: 0.5px !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    padding: 30px 0 !important;
    margin: 0 16px !important;
}

.main-menu__list > li > a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 22px;
    left: 0;
    background: linear-gradient(90deg, #c99374, #e5b299);
    transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 2px;
}

.main-menu__list > li:hover > a {
    color: #c99374 !important;
}

.main-menu__list > li:hover > a::after {
    width: 100%;
}

/* Active Navigation Item Styles */
.main-menu__list > li.current > a {
    color: #c99374 !important;
}

.main-menu__list > li.current > a::after {
    width: 100% !important;
}

/* Premium Glassmorphic Dropdown Submenu */
.main-menu__list li ul {
    background: rgba(26, 20, 18, 0.96) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border: 1px solid rgba(201, 147, 116, 0.25) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6) !important;
    border-radius: 12px !important;
    padding: 15px 0 !important;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.main-menu__list li ul li a {
    color: #eae5e2 !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    letter-spacing: 0.3px !important;
    padding: 10px 24px !important;
    transition: all 0.3s ease !important;
    text-transform: none !important;
}

.main-menu__list li ul li:hover > a {
    color: #c99374 !important;
    padding-left: 28px !important; /* Slide hover animation */
    background: rgba(201, 147, 116, 0.05) !important;
}

/* Header CTA Book Now Button */
.main-header__btn {
    background: #c99374 !important;
    color: #ffffff !important;
    border-radius: 50px !important;
    padding: 12px 28px !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    letter-spacing: 0.8px !important;
    text-transform: uppercase !important;
    box-shadow: 0 6px 15px rgba(201, 147, 116, 0.25) !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.main-header__btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
}

.main-header__btn:hover::before {
    left: 100%;
}

.main-header__btn:hover {
    background: #ffffff !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2) !important;
    color: #120e0c !important;
}

/* Search, Cart & Mobile Toggle Icons Color Overrides */
.main-header__search, .main-header__cart {
    color: #eae5e2 !important;
    transition: all 0.3s ease !important;
}

.main-header__search:hover, .main-header__cart:hover {
    color: #c99374 !important;
    transform: translateY(-1px) scale(1.08);
}

.mobile-nav__btn span {
    background-color: #c99374 !important;
}

/* Hero Booking Card Aesthetics with Luxury Slow Floating Movement */
@keyframes floatSlow {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-8px);
    }
    100% {
        transform: translateY(0px);
    }
}

.hero-booking-card {
    background: radial-gradient(circle at top left, rgba(201, 147, 116, 0.08), rgba(18, 14, 12, 0.42)) !important; /* Internal warm gold radial mist */
    backdrop-filter: blur(30px) !important;
    -webkit-backdrop-filter: blur(30px) !important;
    border: 1px solid rgba(201, 147, 116, 0.15) !important; /* Delicate luxury bronze-gold border */
    border-radius: 28px !important; /* Soft premium luxury curve */
    padding: 45px 35px !important; /* Elegant slimmer proportions, high vertical breathing space */
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45), 0 0 50px rgba(201, 147, 116, 0.12) !important; /* Soft, warm gold drop glow */
    position: relative;
    z-index: 10;
    width: 100% !important;
    animation: floatSlow 8s ease-in-out infinite !important; /* Slow calming floating movement */
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.hero-booking-card:hover {
    animation-play-state: paused !important; /* Smoothly pause floating on hover */
    transform: translateY(-6px) scale(1.01) !important;
    border-color: rgba(201, 147, 116, 0.45) !important;
    box-shadow: 0 40px 90px rgba(0, 0, 0, 0.55), 0 0 65px rgba(201, 147, 116, 0.22) !important; /* Elevated glowing soft aura */
}

@media (min-width: 1200px) {
    .hero-booking-card {
        margin-top: 10px !important; /* Neutral offset, vertical alignment is controlled by the absolute wrapper */
        margin-left: auto !important;
        margin-right: 0 !important; /* Plentiful breathing space from screen edge */
        max-width: 430px !important; /* Slimmer, elegant and non-competing size */
    }
}

@media (max-width: 1199px) {
    .hero-booking-card {
        margin-top: 40px !important; /* High breathing space below slide content on tablet */
        margin-bottom: 25px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        max-width: 480px !important; /* Sleeker grid presentation on tablets */
        padding: 40px 30px !important;
    }
}


.hero-booking-card .sec-title {
    margin-bottom: 30px !important;
    padding-bottom: 0px !important;
    text-align: center !important;
}

.hero-booking-card .sec-title__img {
    margin: 0 auto 10px !important;
    display: block !important;
    width: 32px !important; /* Keep it clean and elegant */
    height: auto !important;
    opacity: 0.85;
}

.hero-booking-card .sec-title__tagline {
    color: #c99374 !important;
    font-family: 'Alex Brush', cursive !important;
    font-size: 24px !important;
    margin-bottom: 6px !important;
    text-align: center !important;
    display: block !important;
    font-weight: 400 !important;
    text-transform: none !important;
    letter-spacing: 0.05em !important;
}

.hero-booking-card .sec-title__title {
    color: #ffffff !important;
    font-size: 24px !important; /* Slightly smaller for cleaner look */
    font-weight: 600 !important;
    text-transform: uppercase !important;
    text-align: center !important;
    margin: 0 !important;
    font-family: 'Cormorant', serif !important;
    letter-spacing: 0.15em !important; /* Highly elegant and premium */
}

.hero-booking-card .contact__input-box {
    margin-bottom: 20px !important; /* Slightly more breathable spacing */
    position: relative;
}

.hero-booking-card .contact__input-box input,
.hero-booking-card .contact__input-box textarea {
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important; /* Extremely soft luxury divider line */
    color: #ffffff !important;
    height: 52px !important; /* Sleeker, less bulky */
    font-size: 13px !important; /* Minimalist font size */
    letter-spacing: 0.04em !important;
    border-radius: 0 !important;
    padding: 0 !important;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    width: 100% !important;
}

.hero-booking-card .contact__input-box input:focus,
.hero-booking-card .contact__input-box textarea:focus {
    border-bottom-color: #c99374 !important; /* Elegant gold highlight */
    padding-left: 4px !important; /* Subtle slide interaction */
}

.hero-booking-card .contact__input-box input::placeholder,
.hero-booking-card .contact__input-box textarea::placeholder {
    color: rgba(234, 229, 226, 0.45) !important; /* Soft sand-beige placeholder */
}

.hero-booking-card .contact__input-box i {
    color: #c99374 !important; /* Golden datepicker icon */
    right: 0px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    position: absolute;
    pointer-events: none;
    z-index: 2 !important;
    display: flex !important;
    align-items: center !important;
    font-size: 14px !important;
    opacity: 0.8;
}

.hero-booking-card .contact__btn-box button {
    height: 48px !important;
    line-height: 48px !important;
    padding: 0 45px !important;
    border-radius: 50px !important; /* Premium Pill Shape */
    font-size: 11px !important;
    letter-spacing: 0.2em !important;
    text-transform: uppercase !important;
    font-weight: 700 !important;
    width: 100% !important;
    display: block !important;
    background: #c99374 !important;
    border: none !important;
    color: #ffffff !important;
    box-shadow: 0 6px 20px rgba(201, 147, 116, 0.25) !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.hero-booking-card .contact__btn-box button:hover {
    background: #ffffff !important;
    color: #120e0c !important;
    transform: translateY(-3px) !important;
    box-shadow: 0 10px 25px rgba(255, 255, 255, 0.25) !important;
}

.hero-booking-select {
    background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23c99374' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") no-repeat right 0px center !important;
    background-size: 12px 12px !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    color: #ffffff !important;
    height: 52px !important;
    font-size: 13px !important;
    letter-spacing: 0.04em !important;
    border-radius: 0 !important;
    padding: 0 !important;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.hero-booking-select:focus {
    border-bottom-color: #c99374 !important;
    padding-left: 4px !important;
}

.hero-booking-select option {
    background-color: #120e0c !important;
    color: #ffffff !important;
}

.hero-booking-card .contact__input-box.text-message-box {
    height: 90px !important; /* Slimmer textarea */
    margin-top: 15px !important;
    margin-bottom: 25px !important;
}

.hero-booking-card .contact__input-box textarea {
    height: 90px !important;
    padding-top: 10px !important;
    resize: none !important;
}

/* Premium Discover More Button in Slider */
.main-slider-one__btn .refresh-d-thai-spa-btn {
    border-radius: 50px !important;
    padding: 14px 38px !important;
    font-size: 11px !important;
    letter-spacing: 0.2em !important;
    text-transform: uppercase !important;
    font-weight: 700 !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Adjustments for slider text in side-by-side mode */
.main-slider-one__sub-title {
    display: inline-flex;
    align-items: center;
}

/* Premium Service Cards Custom Override */
.service-one__item {
    background: rgba(18, 14, 12, 0.4) !important; /* Rich translucent warm chocolate */
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    border: 1px solid rgba(201, 147, 116, 0.12) !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    position: relative !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Glassmorphic Shimmer Shine Sweep Effect */
.service-one__item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
    transform: skewX(-25deg);
    transition: left 0.75s ease;
    z-index: 5;
    pointer-events: none;
}

.service-one__item:hover::before {
    left: 150%;
}

.service-one__item:hover {
    transform: translateY(-10px) !important;
    border-color: rgba(201, 147, 116, 0.35) !important;
    background: rgba(22, 17, 15, 0.75) !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45) !important;
}

.service-one__item__hover {
    border-radius: 20px !important;
}

/* Styled Circular Icon Container */
.service-one__item__icon-wrapper {
    border: 1px dashed rgba(201, 147, 116, 0.3) !important;
    border-radius: 50% !important;
    width: 90px !important;
    height: 90px !important;
    margin: 0 auto 20px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    background: rgba(255, 255, 255, 0.02) !important;
}

.service-one__item:hover .service-one__item__icon-wrapper {
    border: 1px solid #c99374 !important;
    background: rgba(201, 147, 116, 0.08) !important;
    transform: rotate(5deg) scale(1.05) !important;
}

.service-one__item__icon {
    font-size: 40px !important;
    line-height: 1 !important;
    margin: 0 !important;
    color: #c99374 !important;
    transition: all 0.5s ease !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
}

.service-one__item__title {
    margin-top: 15px !important;
    text-align: center !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.service-one__item__title a {
    color: #ffffff !important;
    font-family: 'Cormorant', serif !important;
    font-size: 24px !important;
    letter-spacing: 0.05em !important;
    transition: color 0.3s ease !important;
}

.service-one__item:hover .service-one__item__title {
    transform: translateY(-3px) !important;
}

.service-one__item:hover .service-one__item__title a {
    color: #c99374 !important;
}

/* Staggered Paragraph and Button Animations */
.service-one__item p {
    color: rgba(234, 229, 226, 0.65) !important;
    font-size: 14px !important;
    margin-top: 15px !important;
    margin-bottom: 0 !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    text-align: center !important;
    line-height: 1.6 !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.service-one__item:hover p {
    transform: translateY(-5px) !important;
    color: rgba(255, 255, 255, 0.9) !important;
}

.service-one__item .refresh-d-thai-spa-btn {
    opacity: 0.9 !important;
    border-radius: 50px !important;
    padding: 10px 28px !important;
    font-size: 11px !important;
    letter-spacing: 0.15em !important;
    margin-top: 25px !important;
    display: inline-block !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.service-one__item:hover .refresh-d-thai-spa-btn {
    background: #ffffff !important;
    color: #120e0c !important;
    opacity: 1 !important;
    transform: translateY(-7px) scale(1.05) !important;
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.15) !important;
}

/* ==========================================================================
   PREMIUM SERVICES LANDING PAGE & DETAIL PAGES OVERHAUL
   ========================================================================== */

/* 1. Services Main Grid Card (.service-card-two) Overrides */
.service-card-two {
    background: rgba(18, 14, 12, 0.45) !important;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(201, 147, 116, 0.12) !important;
    border-radius: 24px !important;
    padding: 24px !important;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25) !important;
    background-image: none !important; /* Remove generic shape backgrounds */
    position: relative;
}

.service-card-two::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: skewX(-25deg);
    transition: left 0.75s ease;
    z-index: 5;
    pointer-events: none;
}

.service-card-two:hover::before {
    left: 150%;
}

.service-card-two:hover {
    transform: translateY(-8px) !important;
    border-color: rgba(201, 147, 116, 0.35) !important;
    background: rgba(22, 17, 15, 0.75) !important;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45) !important;
}

.service-card-two__image {
    border-radius: 16px !important;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.service-card-two__image img {
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.service-card-two:hover .service-card-two__image img {
    transform: scale(1.08) rotate(1deg);
}

.service-card-two__icon {
    background: #c99374 !important;
    color: #ffffff !important;
    border-radius: 50% !important;
    width: 60px !important;
    height: 60px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 8px 20px rgba(201, 147, 116, 0.4) !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
    border: 2px solid rgba(255, 255, 255, 0.15) !important;
}

.service-card-two:hover .service-card-two__icon {
    transform: rotate(360deg) scale(1.1) !important;
    box-shadow: 0 12px 25px rgba(201, 147, 116, 0.6) !important;
}

.service-card-two__content {
    padding: 25px 10px 10px !important;
    text-align: center;
}

.service-card-two__title {
    margin-bottom: 12px !important;
}

.service-card-two__title a {
    color: #ffffff !important;
    font-family: 'Cormorant', serif !important;
    font-size: 24px !important;
    font-weight: 600 !important;
    letter-spacing: 0.03em;
    transition: color 0.3s ease !important;
}

.service-card-two:hover .service-card-two__title a {
    color: #c99374 !important;
}

.service-card-two__content__shape {
    opacity: 0.3;
    margin: 10px auto !important;
    display: block;
    width: 50px;
    height: auto;
}

.service-card-two__text {
    color: rgba(234, 229, 226, 0.65) !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
    margin-bottom: 20px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}

.service-card-two__link {
    color: #eae5e2 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    letter-spacing: 0.15em !important;
    text-transform: uppercase !important;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    border-bottom: 1px solid rgba(201, 147, 116, 0.3);
    padding-bottom: 4px;
}

.service-card-two__link i {
    font-size: 10px;
    color: #c99374;
    transition: transform 0.3s ease;
}

.service-card-two__link:hover {
    color: #c99374 !important;
    border-bottom-color: #c99374;
}

.service-card-two__link:hover i {
    transform: translateX(4px);
}


/* 2. Service Details Sidebar Premium Overrides */
.service-sidebar {
    background: transparent !important;
}

.service-sidebar__single {
    background: rgba(18, 14, 12, 0.45) !important;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(201, 147, 116, 0.12) !important;
    border-radius: 20px !important;
    padding: 30px !important;
    margin-bottom: 30px !important;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25) !important;
}

.service-sidebar__title {
    font-family: 'Cormorant', serif !important;
    font-size: 22px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    letter-spacing: 0.05em !important;
    border-bottom: 1px solid rgba(201, 147, 116, 0.2) !important;
    padding-bottom: 15px !important;
    margin-bottom: 20px !important;
    background: transparent !important; /* Remove generic filled headers */
    text-transform: uppercase;
}

.service-sidebar__nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.service-sidebar__nav li a {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px !important;
    background: rgba(255, 255, 255, 0.02) !important;
    border: 1px solid rgba(255, 255, 255, 0.04) !important;
    border-radius: 12px !important;
    color: rgba(234, 229, 226, 0.75) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.service-sidebar__nav li.active a,
.service-sidebar__nav li a:hover {
    background: rgba(201, 147, 116, 0.08) !important;
    border-color: rgba(201, 147, 116, 0.3) !important;
    color: #c99374 !important;
    padding-left: 26px !important;
}

.service-sidebar__nav li a::after {
    content: '\\f105';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: 12px;
    color: rgba(201, 147, 116, 0.5);
    transition: all 0.3s ease;
}

.service-sidebar__nav li.active a::after,
.service-sidebar__nav li a:hover::after {
    color: #c99374;
    transform: translateX(4px);
}

/* Sidebar Discount Container */
.service-sidebar__discount {
    background: linear-gradient(135deg, #181412 0%, #0d0a09 100%) !important;
    padding: 0 !important;
    text-align: center;
    border-radius: 16px !important;
    border: 1px solid rgba(201, 147, 116, 0.12) !important;
}

.service-sidebar__discount__image {
    overflow: hidden;
    border-radius: 16px 16px 0 0;
}

.service-sidebar__discount__content {
    padding: 30px !important;
}

.service-sidebar__discount__tagline {
    font-family: 'Alex Brush', cursive !important;
    color: #c99374 !important;
    font-size: 32px !important;
    margin-bottom: 5px !important;
    font-weight: 400 !important;
    text-transform: none !important;
}

.service-sidebar__discount__title {
    font-family: 'Cormorant', serif !important;
    color: #ffffff !important;
    font-size: 28px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    margin-bottom: 15px !important;
}

.service-sidebar__discount__text {
    color: rgba(234, 229, 226, 0.65) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
    margin-bottom: 25px !important;
}

/* Sidebar Contact Banner */
.service-sidebar__contact {
    background: linear-gradient(135deg, #4b3d35 0%, #211a16 100%) !important;
    border-radius: 16px !important;
    padding: 40px 30px !important;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3) !important;
    border: 1px solid rgba(201, 147, 116, 0.2) !important;
}

.service-sidebar__contact__icon {
    background: rgba(255, 255, 255, 0.08) !important;
    color: #c99374 !important;
    width: 70px !important;
    height: 70px !important;
    border-radius: 50% !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 26px !important;
    margin-bottom: 20px !important;
    border: 1px solid rgba(201, 147, 116, 0.3) !important;
}

.service-sidebar__contact__title {
    font-family: 'Cormorant', serif !important;
    font-size: 24px !important;
    color: #ffffff !important;
    line-height: 1.3 !important;
    font-weight: 500 !important;
    margin-bottom: 25px !important;
}

.service-sidebar__contact__number span {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 12px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.15em !important;
    color: rgba(234, 229, 226, 0.65) !important;
}

.service-sidebar__contact__number a {
    font-family: 'Cormorant', serif !important;
    font-size: 22px !important;
    font-weight: 700 !important;
    color: #c99374 !important;
    letter-spacing: 0.05em !important;
}


/* 3. Service Details Content Area Overrides */
.service-details__content {
    background: rgba(18, 14, 12, 0.3) !important;
    backdrop-filter: blur(16px);
    border: 1px solid rgba(201, 147, 116, 0.08) !important;
    border-radius: 24px !important;
    padding: 40px !important;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2) !important;
}

@media (max-width: 768px) {
    .service-details__content {
        padding: 25px !important;
    }
}

.service-details__thumbnail {
    border-radius: 20px !important;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3) !important;
    margin-bottom: 35px !important;
    border: 1px solid rgba(201, 147, 116, 0.15) !important;
}

.service-details__thumbnail img {
    width: 100%;
    height: auto;
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-details__content:hover .service-details__thumbnail img {
    transform: scale(1.03);
}

.service-details__title {
    font-family: 'Cormorant', serif !important;
    color: #ffffff !important;
    font-size: 32px !important;
    font-weight: 600 !important;
    margin-top: 30px !important;
    margin-bottom: 18px !important;
    letter-spacing: 0.02em !important;
}

.service-details__text {
    color: rgba(234, 229, 226, 0.7) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 15px !important;
    line-height: 1.7 !important;
    margin-bottom: 20px !important;
}

/* Bullet Points Lists */
.service-details__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin: 25px 0 35px !important;
}

@media (max-width: 576px) {
    .service-details__list {
        grid-template-columns: 1fr;
    }
}

.service-details__list li {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    color: rgba(234, 229, 226, 0.8) !important;
    display: flex !important;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
}

.service-details__list li i {
    color: #c99374 !important;
    font-size: 16px !important;
    text-shadow: 0 0 8px rgba(201, 147, 116, 0.3);
}

.service-details__list li:hover {
    transform: translateX(5px);
    color: #ffffff !important;
}

/* Process Timeline List */
.service-details__process {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    margin: 30px 0 40px !important;
}

@media (max-width: 768px) {
    .service-details__process {
        grid-template-columns: 1fr;
        gap: 20px;
    }
}

.service-details__process li {
    background: rgba(255, 255, 255, 0.02) !important;
    border: 1px solid rgba(201, 147, 116, 0.1) !important;
    border-radius: 16px !important;
    padding: 25px !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    position: relative;
}

.service-details__process li:hover {
    transform: translateY(-5px);
    border-color: rgba(201, 147, 116, 0.3) !important;
    background: rgba(201, 147, 116, 0.04) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.service-details__process__top {
    display: flex !important;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px !important;
}

.service-details__process__icon {
    color: #c99374 !important;
    font-size: 18px !important;
}

.service-details__process__title {
    font-family: 'Cormorant', serif !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    margin: 0 !important;
}

.service-details__process__text {
    color: rgba(234, 229, 226, 0.6) !important;
    font-size: 13px !important;
    line-height: 1.5 !important;
    margin: 0 !important;
}

/* Tips & Tricks List */
.service-details__post {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.service-details__post li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
    padding-bottom: 12px !important;
    transition: all 0.3s ease;
}

.service-details__post li:hover {
    border-bottom-color: rgba(201, 147, 116, 0.25) !important;
}

.service-details__post__date {
    color: #c99374 !important;
    font-size: 11px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    margin-bottom: 4px !important;
}

.service-details__post__title a {
    color: rgba(234, 229, 226, 0.8) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    transition: color 0.3s ease !important;
}

.service-details__post li:hover .service-details__post__title a {
    color: #ffffff !important;
}

/* Available Appointments Premium Section */
.service-details__info {
    background: rgba(255, 255, 255, 0.02) !important;
    border: 1px solid rgba(201, 147, 116, 0.12) !important;
    border-radius: 20px !important;
    padding: 30px !important;
    margin-top: 40px !important;
}

.service-details__info__title {
    font-family: 'Cormorant', serif !important;
    color: #ffffff !important;
    font-size: 22px !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 25px !important;
    text-transform: uppercase;
    text-align: center;
}

.service-details__info__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.service-details__info__list li {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px !important;
    background: rgba(18, 14, 12, 0.35) !important;
    border: 1px solid rgba(255, 255, 255, 0.04) !important;
    border-radius: 14px !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

@media (max-width: 768px) {
    .service-details__info__list li {
        flex-direction: column;
        gap: 15px;
        text-align: center;
        padding: 20px !important;
    }
}

.service-details__info__list li:hover {
    border-color: rgba(201, 147, 116, 0.25) !important;
    background: rgba(22, 17, 15, 0.6) !important;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.service-details__info__list__date {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    display: flex;
    align-items: center;
    gap: 10px;
}

.service-details__info__list__date i {
    color: #c99374;
    font-size: 16px;
}

.service-details__info__list__space {
    color: rgba(234, 229, 226, 0.6) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 13px !important;
}

.service-details__info__list__btn {
    border-radius: 50px !important;
    padding: 10px 24px !important;
    font-size: 11px !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
}

/* ==========================================================================
   GLOBAL MOBILE RESPONSIVENESS OVERRIDES
   ========================================================================== */

/* 1. Hero Slider Responsiveness Updates */
@media (max-width: 991px) {
    .main-slider-one, 
    .main-slider-one__item {
        height: auto !important;
        min-height: auto !important;
        padding-top: 140px !important;
        padding-bottom: 80px !important;
    }
    
    .main-slider-one__content {
        margin-bottom: 35px !important;
        padding-right: 0 !important;
        text-align: center !important;
    }
    
    .main-slider-one__sub-title {
        justify-content: center !important;
    }
    
    .main-slider-one__title {
        font-size: 46px !important;
        line-height: 1.25 !important;
        text-align: center !important;
    }
    
    .main-slider-one__text {
        text-align: center !important;
        margin: 15px auto 25px !important;
        max-width: 600px !important;
    }
}

@media (max-width: 575px) {
    .main-slider-one, 
    .main-slider-one__item {
        padding-top: 110px !important;
        padding-bottom: 50px !important;
    }
    
    .main-slider-one__title {
        font-size: 36px !important;
    }
    
    .hero-booking-card {
        padding: 24px 18px !important;
    }
    
    .hero-booking-card .sec-title__title {
        font-size: 20px !important;
    }
    
    .hero-booking-card .sec-title__tagline {
        font-size: 20px !important;
    }
}

/* 2. Sticky Bottom CTA Bar Mobile Optimizations */
@media (max-width: 768px) {
    #sticky-cta-bar {
        padding: 14px 10px !important;
    }
    
    .sticky-bottom-bar__text {
        font-size: 13px !important;
        text-align: center !important;
        width: 100% !important;
        margin-bottom: 10px !important;
        line-height: 1.4 !important;
    }
    
    #sticky-cta-bar .refresh-d-thai-spa-btn {
        width: 100% !important;
        padding: 10px 0 !important;
        text-align: center !important;
        font-size: 11px !important;
        display: block !important;
    }
    
    .sticky-bottom-bar__close {
        top: 8px !important;
        right: 12px !important;
        font-size: 20px !important;
    }
}

/* 3. General Site Typography & Spacing Scale-downs for Mobile */
@media (max-width: 767px) {
    .sec-title__title {
        font-size: 32px !important;
        line-height: 1.2 !important;
    }
    
    .sec-title__tagline {
        font-size: 20px !important;
    }
    
    .page-header__title {
        font-size: 36px !important;
    }
    
    .page-header {
        padding: 100px 0 60px !important;
    }
}

/* ==========================================================================
   HIGH-CONTRAST LUXURY SUBTEXTS & READABILITY OVERRIDES
   ========================================================================== */

/* Elevate general paragraphs and body texts to warm premium off-white */
p {
    color: rgba(234, 229, 226, 0.78) !important;
}

/* Specific subtext class overrides */
.main-slider-one__text,
.about-one__text,
.feature-one__text,
.work-process-one__text,
.service-card-two__text,
.service-one__item p,
.why-choose-one__text,
.service-sidebar__discount__text,
.service-details__text,
.service-details__process__text,
.footer-widget__text {
    color: rgba(234, 229, 226, 0.8) !important;
    font-weight: 400 !important;
    letter-spacing: 0.02em !important;
    line-height: 1.7 !important;
}

/* Taglines / script text */
.sec-title__tagline,
.service-sidebar__discount__tagline {
    color: #e5b299 !important; /* Premium softer rose-gold accent color */
    font-weight: 500 !important;
    text-shadow: 0 0 10px rgba(229, 178, 153, 0.15) !important;
}

/* Accordion and FAQ content texts */
.faq-one__accordion .acc-btn,
.acc-content p {
    color: rgba(234, 229, 226, 0.82) !important;
}

/* Sidebar and Navigation inactive links */
.service-sidebar__nav li a {
    color: rgba(234, 229, 226, 0.8) !important;
}

.footer-widget__links li a {
    color: rgba(234, 229, 226, 0.7) !important;
    transition: all 0.3s ease !important;
}

.footer-widget__links li a:hover {
    color: #c99374 !important;
}

/* Meta texts and sub-labels */
.service-details__info__list__space,
.service-sidebar__contact__number span,
.sticky-bottom-bar__text,
.main-footer__copyright {
    color: rgba(234, 229, 226, 0.72) !important;
}

/* Premium Prominent Cloud Divider Overrides */
.main-slider-one__bg::after {
    animation: cloudMove 40s linear infinite !important; /* Keep the cloud speed premium and prominent */
}

/* Hero Booking Card Static Desktop Wrapper styling */
.hero-booking-card-wrapper {
    position: absolute;
    top: 60% !important; /* Shifted lower vertically to sit elegantly adjacent to the CTA area */
    left: 0;
    right: 0;
    transform: translateY(-30%) !important; /* Elegant lower alignment closer to CTA section */
    z-index: 99 !important;
    pointer-events: none;
}

.hero-booking-card-wrapper .hero-booking-card {
    pointer-events: auto;
}

/* Left-align the slider button in side-by-side mode */
.text-left .main-slider-one__btn {
    justify-content: flex-start !important;
}

/* ==========================================================================
   PREMIUM HERO SLIDER BREATHABILITY & TYPOGRAPHY ADJUSTMENTS
   ========================================================================== */
@media (min-width: 992px) {
    /* Large editorial spacing and massive container height to let the layout breathe */
    .main-slider-one__item {
        padding-top: 250px !important; /* luxurious top spacing */
        padding-bottom: 190px !important; /* elegant bottom spacing */
        min-height: 860px !important; /* expansive cinematic height */
    }
    
    .main-slider-one__content {
        padding-left: 60px !important; /* spacious editorial left-margin */
    }
}

/* Grand typography spacing overrides to ensure clean visual focus */
.main-slider-one__sub-title {
    font-family: 'Alex Brush', cursive !important;
    font-size: 34px !important;
    margin-bottom: 30px !important; /* increased space below script tagline */
    letter-spacing: 0.06em !important;
    color: #e5b299 !important; /* softer luxury rose-gold */
    opacity: 0;
    animation: fadeInSlideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

.main-slider-one__title {
    font-family: 'Cormorant', serif !important;
    font-size: 72px !important; /* expensive grand header size */
    font-weight: 500 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.12em !important;
    line-height: 1.25 !important;
    margin-bottom: 50px !important; /* extensive space before CTA button */
    color: #ffffff !important;
    opacity: 0;
    animation: fadeInSlideUp 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards !important;
}

.main-slider-one__btn {
    margin-top: 25px !important;
    opacity: 0;
    animation: fadeInSlideUp 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards !important;
}

/* Premium slow fade-up animation keyframes */
@keyframes fadeInSlideUp {
    0% {
        opacity: 0;
        transform: translateY(25px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Extremely faint decorative background elements for atmospheric focus only */
.main-slider-one__title-bg,
.main-slider-one__bg::before,
.main-slider-one__bg::after,
.main-slider-one svg circle.steap {
    opacity: 0.04 !important; /* reduced to 4% opacity to let foreground text dominate completely */
    transition: opacity 1s ease;
}

/* Slide item adjustments for side-by-side flex layout on desktop */
@media (min-width: 992px) {
    .main-slider-one__item .row.align-items-center {
        min-height: 520px;
    }
}

/* Shift navigation and controls above the static wrapper */
.main-slider-one__carousel .owl-nav {
    z-index: 100 !important;
}

/* Move owl carousel dots to the left side on desktop to prevent overlap with the static booking card */
@media (min-width: 992px) {
    .main-slider-one__carousel .owl-dots {
        left: 40px !important;
        right: auto !important;
        z-index: 100 !important;
    }
}

/* Prevent fixed-height clipping on mobile devices */
@media (max-width: 767px) {
    .main-slider-one__item {
        height: auto !important;
        min-height: auto !important;
    }
}

/* ==========================================================================
   REDESIGNED LUXURY FLOATING BENEFITS SECTION (FEATURE ONE)
   ========================================================================== */
.feature-one {
    position: relative !important;
    z-index: 5 !important;
    background-color: #141215 !important;
    padding-top: 120px !important;
    padding-bottom: 80px !important; /* Reduced slightly to close the gap toward rituals section */
    height: auto !important;
    overflow: visible !important;
    margin-top: 0 !important;
}

@media (max-width: 991px) {
    .feature-one {
        padding-top: 100px !important;
        padding-bottom: 60px !important;
    }
}

@media (max-width: 767px) {
    .feature-one {
        padding-top: 80px !important;
        padding-bottom: 50px !important;
    }
}

/* Base floating element style - NO borders/background card wrappers */
.feature-one__item {
    position: relative !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 25px !important;
    margin-bottom: 40px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Horizontal breathing room - Column grid alignment helper classes */
@media (min-width: 1200px) {
    .feature-one .row {
        --bs-gutter-x: 3.5rem !important; /* Increased horizontal breathing room */
    }
}

/* Delicate vertical gold divider positioned between the columns */
.feature-one__item::after {
    position: absolute !important;
    right: -30px !important;
    top: 10% !important;
    width: 1px !important;
    height: 80% !important;
    content: "" !important;
    background: linear-gradient(180deg, rgba(201, 147, 116, 0) 0%, rgba(201, 147, 116, 0.25) 50%, rgba(201, 147, 116, 0) 100%) !important;
    border: none !important;
    display: block !important;
}

/* Divider rules based on responsive screens */
/* Desktop -> 3 columns, dividers on item 1 and item 2 */
@media (min-width: 992px) {
    .feature-one__item--no-border::after,
    .col-lg-4:last-child .feature-one__item::after {
        display: none !important;
    }
}

/* Tablet -> 2 columns. Row 1: Item 1 & 2. Row 2: Item 3 centered.
   So: item 1 has a divider, item 2 and 3 do not. */
@media (min-width: 768px) and (max-width: 991px) {
    .feature-one__item::after {
        display: none !important; /* Reset default */
    }
    .col-md-6:first-child .feature-one__item::after {
        display: block !important;
        right: -15px !important;
    }
}

/* Mobile -> Stack vertically, hide all dividers */
@media (max-width: 767px) {
    .feature-one__item::after {
        display: none !important;
    }
    .feature-one__item {
        padding: 0 15px !important;
    }
}

/* Circular elements design (No clipping, large & premium) */
.feature-one__item__img {
    width: 180px !important;
    height: 180px !important;
    position: relative !important;
    display: block !important;
    overflow: visible !important; /* CRITICAL: Remove overflow hidden so icon badge & scale animations never clip! */
    margin: 0 auto 35px !important;
    border-radius: 50% !important;
    border: 2px dashed rgba(201, 147, 116, 0.35) !important; /* Delicate decorative dashed border */
    padding: 8px !important;
    background: transparent !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.feature-one__item__img img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 50% !important;
    display: block !important;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Subtle glowing scale-up on hover */
.feature-one__item:hover .feature-one__item__img {
    border-color: #c99374 !important;
    transform: scale(1.05) !important;
    box-shadow: 0 0 30px rgba(201, 147, 116, 0.25) !important;
}

.feature-one__item:hover .feature-one__item__img img {
    transform: scale(1.02) !important;
}

/* Gold Badge Overlay on circular elements (No clipping, elegant placement) */
.feature-one__item__icon {
    position: absolute !important;
    bottom: 4px !important;
    right: 4px !important;
    width: 50px !important;
    height: 50px !important;
    background-color: #c99374 !important; /* Rich gold accent */
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 20px !important;
    color: #ffffff !important;
    border: 3px solid #141215 !important; /* thick solid border matching background to pop */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5) !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    z-index: 3 !important;
}

.feature-one__item:hover .feature-one__item__icon {
    background-color: #ffffff !important;
    color: #141215 !important;
    transform: rotate(15deg) scale(1.1) !important;
    box-shadow: 0 8px 20px rgba(201, 147, 116, 0.4) !important;
}

.feature-one__item__icon span {
    display: inline-block !important;
    transition: transform 0.4s ease !important;
}

/* Elegant Flower Accent Overlay behind/above elements */
.feature-one__item__hover-img {
    position: absolute !important;
    left: -110px !important;
    top: -30px !important;
    right: 0 !important;
    margin: auto !important;
    width: 170px !important;
    height: 160px !important;
    opacity: 0.04 !important; /* Very subtle default transparency */
    visibility: visible !important; /* Always render in dom, no sudden jump */
    transform: scale(0.95) rotate(-5deg) !important;
    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;
    pointer-events: none !important;
    z-index: 1 !important;
}

.feature-one__item__hover-img img {
    width: 100% !important;
    height: auto !important;
    filter: sepia(0.3) saturate(1.2) !important;
}

.feature-one__item:hover .feature-one__item__hover-img {
    opacity: 0.15 !important; /* Beautiful reveal */
    transform: scale(1.1) rotate(15deg) !important;
}

/* Typography styles matching premium luxury aesthetic */
.feature-one__item__sub-title {
    font-family: 'Alex Brush', cursive !important;
    font-size: 32px !important;
    color: #e5b299 !important; /* Soft premium rose-gold */
    font-weight: 400 !important;
    margin: 0 0 4px !important;
    text-transform: none !important;
    letter-spacing: normal !important;
    text-shadow: 0 0 12px rgba(229, 178, 153, 0.15) !important;
}

.feature-one__item__title {
    font-family: 'Cormorant', serif !important;
    font-size: 26px !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.18em !important; /* Spurred high luxury feel */
    margin: 0 0 16px !important;
}

/* Small Gold Wave Divider SVG */
.feature-one__item svg {
    width: 32px !important;
    height: 5px !important;
    fill: #c99374 !important;
    margin: 0 auto 20px !important;
    transition: all 0.4s ease !important;
}

.feature-one__item:hover svg {
    transform: scaleX(1.3) !important;
    fill: #ffffff !important;
}

/* High readability description typography */
.feature-one__item__text {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    line-height: 1.75 !important;
    color: rgba(234, 229, 226, 0.78) !important; /* Warm readable off-white */
    max-width: 300px !important;
    margin: 0 auto !important;
    transition: all 0.3s ease !important;
}

.feature-one__item:hover .feature-one__item__text {
    color: rgba(255, 255, 255, 0.95) !important;
}

/* Reveal-on-scroll interaction enhancements */
.feature-one .wow {
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease !important;
}

/* ==========================================================================
   SIGNATURE RITUALS SECTION
   ========================================================================== */
.service-one {
    position: relative !important;
    z-index: 4 !important;
    background-color: #141215 !important;
    padding-top: 100px !important;
    padding-bottom: 100px !important;
    overflow: visible !important;
}

/* Soft gradient divider — fades in from transparent, no hard cut */
.service-one::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 10% !important;
    width: 80% !important;
    height: 1px !important;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(201, 147, 116, 0.18) 30%,
        rgba(201, 147, 116, 0.18) 70%,
        transparent 100%
    ) !important;
    pointer-events: none !important;
}

/* Tighter heading-to-cards gap */
.service-one .sec-title {
    z-index: 3 !important;
    position: relative;
    margin-bottom: 40px !important;
}

/* Service card transitions */
.service-one .service-one__item {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* ==========================================================================
   SIDEBAR APPOINTMENT BOOKING FORM OVERRIDES
   ========================================================================== */
.sidebar-booking-card {
    animation: none !important; /* Disable floating animations within content flow */
    margin-bottom: 40px !important;
}

@media (min-width: 992px) {
    .sidebar-booking-card {
        margin-right: 0 !important;
        margin-left: 0 !important;
        max-width: 100% !important; /* Fit within the sidebar width constraint */
    }
}

/* ==========================================================================
   SERVICE CARD TAGS & BOTTOM HORIZONTAL CTAS
   ========================================================================== */
.service-card-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px auto 16px;
    max-width: 90%;
}

.service-card-tag {
    display: inline-block;
    border: 1px solid rgba(201, 147, 116, 0.35) !important;
    color: #c99374 !important;
    font-size: 10px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    border-radius: 30px !important;
    padding: 3px 12px !important;
    font-weight: 500 !important;
    line-height: 1.2 !important;
}

.service-one__item {
    margin-bottom: 30px !important;
}

.spa-cta-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 50px;
    padding: 10px 0;
}

.spa-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    padding: 14px 28px !important;
    border-radius: 4px !important;
    transition: all 0.3s ease !important;
    cursor: pointer;
    min-width: 170px;
    text-align: center;
    text-decoration: none !important;
}

.spa-cta-btn.call-us {
    background: #000 !important;
    border: 1px solid #c99374 !important;
    color: #c99374 !important;
}

.spa-cta-btn.call-us:hover {
    background: #c99374 !important;
    color: #000 !important;
}

.spa-cta-btn.whatsapp {
    background: #c99374 !important;
    border: 1px solid #c99374 !important;
    color: #000 !important;
}

.spa-cta-btn.whatsapp:hover {
    background: #000 !important;
    color: #c99374 !important;
}

.spa-cta-btn.directions {
    background: #2a2b2c !important;
    border: 1px solid #2a2b2c !important;
    color: #fff !important;
}

.spa-cta-btn.directions:hover {
    background: #fff !important;
    color: #000 !important;
}



/* Premium Branded Selectpicker Dropdown */
.booking-form-select {
    width: 100% !important;
    height: 60px !important;
    background-color: #1a1513 !important;
    border: 1px solid rgba(201, 147, 116, 0.15) !important;
    border-radius: 6px !important;
    padding: 0 20px !important;
    color: #ffffff !important;
    font-size: 14px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    outline: none !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    background-image: url(\\x22data:image/svg+xml;utf8,<svg fill='%23c99374' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\\x22) !important;
    background-repeat: no-repeat !important;
    background-position: right 20px center !important;
    background-size: 18px !important;
    transition: border-color 0.3s ease !important;
}
.booking-form-select:focus {
    border-color: #c99374 !important;
}

/* Choose Your Duration Pricing Cards */
.duration-pricing-section {
    padding-top: 80px !important;
    padding-bottom: 80px !important;
    background-color: #141215 !important;
    position: relative;
}
.duration-card {
    background: rgba(18, 14, 12, 0.45) !important;
    border: 1px solid rgba(201, 147, 116, 0.08) !important;
    border-radius: 20px !important;
    padding: 40px 30px !important;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.4s ease !important;
    text-align: center;
    position: relative;
}
.duration-card:hover {
    transform: translateY(-8px) !important;
    border-color: rgba(201, 147, 116, 0.3) !important;
}
.duration-card.active {
    background: #0f1c18 !important;
    border: 2px solid #c99374 !important;
}
.duration-card__title {
    font-family: 'Cormorant', serif !important;
    font-size: 24px !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 15px !important;
}
.duration-card.active .duration-card__title {
    color: #c99374 !important;
}
.duration-card__price {
    font-family: 'Cormorant', serif !important;
    font-size: 42px !important;
    color: #c99374 !important;
    font-weight: 700 !important;
    margin-bottom: 5px !important;
}
.duration-card.active .duration-card__price {
    color: #ffffff !important;
}
.duration-card__session {
    font-size: 13px !important;
    color: rgba(234, 229, 226, 0.5) !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    margin-bottom: 30px !important;
}
.duration-card__btn {
    display: inline-block !important;
    width: 100% !important;
    padding: 12px 0 !important;
    border-radius: 4px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    transition: all 0.3s ease !important;
    text-decoration: none !important;
}
.duration-card__btn.standard {
    background: transparent !important;
    border: 1px solid rgba(201, 147, 116, 0.4) !important;
    color: #c99374 !important;
}
.duration-card__btn.standard:hover {
    background: #c99374 !important;
    color: #000000 !important;
}
.duration-card__btn.active-btn {
    background: #c99374 !important;
    border: 1px solid #c99374 !important;
    color: #000000 !important;
}
.duration-card__btn.active-btn:hover {
    background: #ffffff !important;
    border-color: #ffffff !important;
}
.duration-card__badge {
    position: absolute !important;
    top: -15px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    background: #c99374 !important;
    color: #000000 !important;
    font-size: 10px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    padding: 5px 16px !important;
    border-radius: 30px !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important;
}

/* Expect List Cards */.expect-section {
    padding-top: 80px !important;
    padding-bottom: 80px !important;
    background-color: #141215 !important;
}
.expect-card {
    background: rgba(18, 14, 12, 0.45) !important;
    border: 1px solid rgba(201, 147, 116, 0.08) !important;
    border-radius: 12px !important;
    padding: 20px 30px !important;
    margin-bottom: 20px !important;
    display: flex !important;
    align-items: center !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
}
.expect-card:hover {
    border-color: rgba(201, 147, 116, 0.25) !important;
    transform: translateX(5px) !important;
}
.expect-card__number {
    font-family: 'Cormorant', serif !important;
    font-size: 36px !important;
    font-weight: 700 !important;
    color: #c99374 !important;
    margin-right: 30px !important;
    min-width: 50px !important;
}
.expect-card__content {
    flex-grow: 1 !important;
}
.expect-card__title {
    font-family: 'Cormorant', serif !important;
    font-size: 20px !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    margin-bottom: 5px !important;
}
.expect-card__text {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    color: rgba(234, 229, 226, 0.7) !important;
    line-height: 1.5 !important;
    margin: 0 !important;
}

/* Why Choose Grid */
.why-choose-grid-section {
    padding-top: 80px !important;
    padding-bottom: 80px !important;
    background-color: #141215 !important;
}
.why-choose-item {
    padding: 20px !important;
    transition: all 0.3s ease !important;
}
.why-choose-item__header {
    display: flex !important;
    align-items: center !important;
    margin-bottom: 15px !important;
}
.why-choose-item__icon {
    width: 36px !important;
    height: 36px !important;
    background-color: rgba(201, 147, 116, 0.1) !important;
    border: 1px solid rgba(201, 147, 116, 0.3) !important;
    border-radius: 6px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: #c99374 !important;
    font-size: 16px !important;
    margin-right: 15px !important;
    transition: all 0.3s ease !important;
}
.why-choose-item:hover .why-choose-item__icon {
    background-color: #c99374 !important;
    color: #000000 !important;
    transform: rotate(10deg) !important;
}
.why-choose-item__title {
    font-family: 'Cormorant', serif !important;
    font-size: 20px !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    margin: 0 !important;
}
.why-choose-item__text {
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 14px !important;
    color: rgba(234, 229, 226, 0.65) !important;
    line-height: 1.6 !important;
    margin: 0 !important;
}

/* Completely remove the template's moving cloud shapes overlay at the bottom of the hero slider in dark mode to enable a smooth, clean transition directly to the next dark section */
.main-slider-one__bg::after {
    display: none !important;
    content: none !important;
    background-image: none !important;
}

/* ==========================================================================
   PREMIUM LUXURY MICRO-ANIMATIONS & SHIMMER EFFECTS
   ========================================================================== */

/* Shimmer Light Sweep Effect for CTA Buttons */
@keyframes buttonShimmer {
    0% {
        left: -150%;
    }
    50% {
        left: -150%;
    }
    100% {
        left: 150%;
    }
}

.refresh-d-thai-spa-btn, 
.spa-cta-btn, 
.luxury-btn, 
.main-header__btn, 
.spa-cta-btn.call-us, 
.spa-cta-btn.whatsapp, 
.spa-cta-btn.directions {
    position: relative !important;
    overflow: hidden !important;
}

.refresh-d-thai-spa-btn::after, 
.spa-cta-btn::after, 
.luxury-btn::after, 
.main-header__btn::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: -150% !important;
    width: 60% !important;
    height: 100% !important;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.35) 50%,
        rgba(255, 255, 255, 0) 100%
    ) !important;
    transform: skewX(-25deg) !important;
    animation: buttonShimmer 5s infinite linear !important;
    pointer-events: none !important;
    z-index: 10 !important;
}

/* Subtle breathing & floating animation for leaf ornaments */
@keyframes leafFloat {
    0% {
        transform: translateY(0) rotate(0deg);
    }
    50% {
        transform: translateY(-4px) rotate(3deg);
    }
    100% {
        transform: translateY(0) rotate(0deg);
    }
}
.leaf-float {
    animation: leafFloat 5s infinite ease-in-out !important;
    display: inline-block !important;
}

/* Ambient luxury background glow pulse */
@keyframes ambientGlowPulse {
    0% {
        transform: scale(1) translate(0, 0);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.15) translate(15px, -15px);
        opacity: 0.85;
    }
    100% {
        transform: scale(1) translate(0, 0);
        opacity: 0.5;
    }
}
.ambient-glow-pulse {
    animation: ambientGlowPulse 15s infinite ease-in-out !important;
}

/* Elegant gold title shadow glow pulse */
@keyframes titleGoldGlow {
    0%, 100% {
        text-shadow: 0 0 10px rgba(201, 147, 116, 0.05);
    }
    50% {
        text-shadow: 0 0 25px rgba(201, 147, 116, 0.25);
    }
}
.sec-title__title, .page-header__title {
    animation: titleGoldGlow 4s infinite ease-in-out !important;
}

/* ==========================================================================
   HIGH-END LUXURY CURSOR OVERRIDES
   ========================================================================== */
.custom-cursor__cursor {
    width: 32px !important;
    height: 32px !important;
    border: 1px solid rgba(201, 147, 116, 0.45) !important;
    background-color: transparent !important;
    box-shadow: 0 0 12px rgba(201, 147, 116, 0.12) !important;
    /* GPU Accelerated inertial smoothing for the follow ring */
    transition: transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), 
                width 0.3s cubic-bezier(0.25, 1, 0.3, 1), 
                height 0.3s cubic-bezier(0.25, 1, 0.3, 1), 
                background-color 0.3s ease, 
                border-color 0.3s ease, 
                box-shadow 0.3s ease !important;
    z-index: 999999 !important;
}

.custom-cursor__cursor-two {
    width: 6px !important;
    height: 6px !important;
    background-color: #c99374 !important;
    opacity: 0.95 !important;
    box-shadow: 0 0 4px rgba(201, 147, 116, 0.4) !important;
    transition: transform 0.2s ease, opacity 0.2s ease, width 0.2s ease, height 0.2s ease !important;
    z-index: 999999 !important;
}

/* Luxury cursor hover expansion state */
.custom-cursor__cursor.custom-cursor__hover {
    width: 54px !important;
    height: 54px !important;
    background-color: rgba(201, 147, 116, 0.1) !important;
    border-color: #c99374 !important;
    box-shadow: 0 0 25px rgba(201, 147, 116, 0.3) !important;
}

.custom-cursor__cursor-two.custom-cursor__innerhover {
    width: 0 !important;
    height: 0 !important;
    opacity: 0 !important;
}

/* Hide on mobile/touch interfaces to ensure native touch feel */
@media (max-width: 991px) {
    .custom-cursor__cursor,
    .custom-cursor__cursor-two {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
    }
}

/* ==========================================================================
   INTERACTIVE 3D PERSPECTIVE CARD TILTS
   ========================================================================== */
.service-one__item, 
.luxury-service-card,
.guest-review-card, 
.expect-card, 
.why-choose-one__list__item,
.duration-card {
    transform-style: preserve-3d !important;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                box-shadow 0.4s ease, 
                border-color 0.4s ease !important;
    will-change: transform;
    position: relative;
}

/* Spotlight Reflection Highlight Overlay inside Card */
.service-one__item::before, 
.luxury-service-card::before,
.guest-review-card::before,
.duration-card::before {
    content: '' !important;
    position: absolute !important;
    inset: 0 !important;
    border-radius: inherit !important;
    background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255, 255, 255, 0.04) 0%, transparent 60%) !important;
    pointer-events: none !important;
    z-index: 5 !important;
    opacity: 0;
    transition: opacity 0.5s ease !important;
}

.service-one__item:hover::before, 
.luxury-service-card:hover::before,
.guest-review-card:hover::before,
.duration-card:hover::before {
    opacity: 1;
}

/* Inner elements popping on Z-axis */
.service-one__item:hover .service-one__item__img,
.luxury-service-card:hover .luxury-service-thumbnail,
.guest-review-card:hover svg,
.duration-card:hover .duration-card__price {
    transform: translateZ(20px) !important;
}

/* ==========================================================================
   MAGNETIC INTERACTIVE BUTTONS
   ========================================================================== */
.refresh-d-thai-spa-btn, 
.spa-cta-btn, 
.luxury-btn, 
.main-header__btn,
.sidebar-booking-card .refresh-d-thai-spa-btn {
    transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), 
                background-color 0.3s ease, 
                color 0.3s ease, 
                border-color 0.3s ease !important;
    will-change: transform;
}

/* ==========================================================================
   AMBIENT DRIFTING SPA LEAVES (ORGANIC BACKDROP)
   ========================================================================== */
.ambient-leaf-container {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    pointer-events: none !important;
    z-index: 1 !important;
    overflow: hidden !important;
}

.floating-leaf-item {
    position: absolute !important;
    background-image: url('../images/shapes/slider-1-leaf.png') !important;
    background-size: contain !important;
    background-repeat: no-repeat !important;
    width: 24px;
    height: 24px;
    opacity: 0.16;
    pointer-events: none !important;
    animation: floatAndRotate 16s linear infinite;
    filter: sepia(0.25) saturate(0.7) !important;
    will-change: transform, opacity;
}

@keyframes floatAndRotate {
    0% {
        transform: translateY(-10vh) translateX(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.16;
    }
    90% {
        opacity: 0.16;
    }
    100% {
        transform: translateY(110vh) translateX(-100px) rotate(360deg);
        opacity: 0;
    }
}

/* ==========================================================================
   PREMIUM CLIP-PATH SCROLL REVEALS
   ========================================================================== */
.luxury-reveal-text {
    position: relative;
    overflow: hidden;
}

.luxury-reveal-text::after {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: #c99374 !important;
    transform: scaleX(0) !important;
    transform-origin: left !important;
    transition: transform 0.6s cubic-bezier(0.76, 0, 0.24, 1) !important;
    z-index: 2 !important;
}

.luxury-reveal-text.active::after {
    animation: wipeReveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards !important;
}

.luxury-reveal-text span {
    opacity: 0;
    display: inline-block;
    transition: opacity 0.1s 0.4s ease !important;
}

.luxury-reveal-text.active span {
    opacity: 1;
}

@keyframes wipeReveal {
    0% {
        transform: scaleX(0);
        transform-origin: left;
    }
    40% {
        transform: scaleX(1);
        transform-origin: left;
    }
    60% {
        transform: scaleX(1);
        transform-origin: right;
    }
    100% {
        transform: scaleX(0);
        transform-origin: right;
    }
}

/* ==========================================================================
   LIT LUXURY CARD ACTIONS & OVERRIDES
   ========================================================================== */
.luxury-service-card {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), 
                box-shadow 0.4s ease, 
                border-color 0.4s ease !important;
}

.luxury-service-card:hover {
    border-color: rgba(201, 147, 116, 0.4) !important;
    box-shadow: 0 20px 45px rgba(0,0,0,0.5), 0 0 30px rgba(201,147,116,0.05) !important;
}

.luxury-service-card:hover .luxury-service-thumbnail img {
    transform: scale(1.08) !important;
}

.luxury-service-card:hover h3 {
    color: #c99374 !important;
}

.luxury-service-card:hover .luxury-btn {
    background: #c99374 !important;
    color: #000000 !important;
    border-color: #c99374 !important;
}

/* ==========================================================================
   HERO BOOKING CARD SELECT ALIGNMENT FIX
   ========================================================================== */
.hero-booking-card .booking-form-select {
    height: 46px !important;
    font-size: 13px !important;
    padding: 0 12px !important;
    background-position: right 15px center !important;
    background-size: 14px !important;
    border-radius: 4px !important;
}

/* ==========================================================================
   NAVBAR RESPONSIVENESS AND ZOOM ALIGNMENT FIX
   ========================================================================== */
@media (min-width: 1200px) and (max-width: 1400px) {
    .main-menu .main-menu__list > li + li {
        margin-left: 22px !important;
    }
    .main-menu .main-menu__list > li > a {
        font-size: 13px !important;
        letter-spacing: 0.05em !important;
    }
    .main-header__btn {
        margin-left: 15px !important;
        padding: 9px 20px !important;
        font-size: 9px !important;
    }
    .main-header__logo img, .logo-box img {
        width: 120px !important;
    }
}

/* ==========================================================================
   PAGE HEADER CONTRAST AND TEXT VISIBILITY OVERLAYS
   ========================================================================== */
.page-header__bg::after {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.65) !important; /* Rich uniform dark overlay for 100% visibility of both centered and left-aligned text */
    z-index: 1 !important;
}

.page-header__bg::before {
    z-index: 2 !important;
}

/* Enhanced typography shadows for superior readability */
.page-header__title {
    text-shadow: 0 4px 15px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 0, 0, 0.4) !important;
    position: relative;
    z-index: 10;
}

.main-slider-one__sub-title {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
    position: relative;
    z-index: 10;
}

.main-slider-one__text {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9) !important;
    font-weight: 500 !important;
    position: relative;
    z-index: 10;
}

/* Premium Branded High-Contrast Transparent Logo Filters */
.main-header__logo img, 
.footer-widget__logo img, 
.logo-box img {
    filter: brightness(0) invert(1) !important; /* Converts black transparent logo to high-contrast white logo */
    transition: filter 0.3s ease, transform 0.3s ease !important;
}

.main-header__logo img:hover, 
.footer-widget__logo img:hover, 
.logo-box img:hover {
    /* Smooth transition to the theme's signature brand rose-gold color (#c99374) on hover */
    filter: invert(72%) sepia(18%) saturate(769%) hue-rotate(341deg) brightness(87%) contrast(85%) !important;
    transform: scale(1.03) !important;
}

.preloader__image {
    filter: brightness(0) invert(1) !important; /* White loader on loading screen */
}

/* ==========================================================================
   SECTION TITLE ORNAMENT BRANDED LOGO STYLING
   ========================================================================== */
.sec-title__img {
    height: 110px !important;
    width: auto !important;
    max-width: none !important;
    filter: invert(72%) sepia(18%) saturate(769%) hue-rotate(341deg) brightness(87%) contrast(85%) !important; /* Premium rose-gold color (#c99374) */
}

/* Override for smaller containers like booking cards */
.hero-booking-card .sec-title__img {
    height: 70px !important;
    width: auto !important;
    max-width: none !important;
    margin: 0 auto 10px !important;
    display: block !important;
    filter: invert(72%) sepia(18%) saturate(769%) hue-rotate(341deg) brightness(87%) contrast(85%) !important;
}
`;
    if (typeof document !== 'undefined' && !document.getElementById('custom-injected-css')) {
        const style = document.createElement('style');
        style.id = 'custom-injected-css';
        style.textContent = css;
        document.head.appendChild(style);
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    // 1. Sticky CTA Bar Animation
    var ctaBar = document.getElementById("sticky-cta-bar");
    if (ctaBar) {
        setTimeout(function() {
            ctaBar.classList.add("show");
        }, 1500);
    }

    // Initialize Premium Animation Systems
    initLuxuryCursorExtensions();
    initThreeDCardTilts();
    initMagneticButtons();
    initFloatingLeaves();
    initLuxuryScrollReveals();
});

/**
 * Extends the custom cursor hover action to all premium interactive elements.
 */
function initLuxuryCursorExtensions() {
    if (window.innerWidth < 992) return; // Native cursor behaviors on mobile

    const cursor = document.querySelector(".custom-cursor__cursor");
    const cursorInner = document.querySelector(".custom-cursor__cursor-two");
    
    if (!cursor) return;

    // Elements that trigger cursor hover growth and glow
    const selectors = [
        "a", 
        "button", 
        "input", 
        "select", 
        "textarea", 
        ".service-one__item", 
        ".luxury-service-card",
        ".guest-review-card", 
        ".duration-card", 
        ".expect-card", 
        ".why-choose-item",
        ".accrodion-title"
    ];

    document.addEventListener("mouseover", function(e) {
        let isHovered = false;
        for (let i = 0; i < selectors.length; i++) {
            if (e.target.closest(selectors[i])) {
                isHovered = true;
                break;
            }
        }

        if (isHovered) {
            cursor.classList.add("custom-cursor__hover");
            if (cursorInner) cursorInner.classList.add("custom-cursor__innerhover");
        } else {
            cursor.classList.remove("custom-cursor__hover");
            if (cursorInner) cursorInner.classList.remove("custom-cursor__innerhover");
        }
    });
}

/**
 * 3D Tilt Hover Animation on Spa cards (Signature Rituals, Reviews, expectation cards).
 */
function initThreeDCardTilts() {
    if (window.innerWidth < 992) return; // Disable on mobile/tablets for performance

    const cards = document.querySelectorAll(
        ".service-one__item, .luxury-service-card, .guest-review-card, .expect-card, .why-choose-one__list__item, .duration-card"
    );

    cards.forEach(card => {
        card.addEventListener("mousemove", function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within the element
            const y = e.clientY - rect.top;  // y coordinate within the element
            
            // Normalize inputs between -0.5 and 0.5
            const px = (x / rect.width) - 0.5;
            const py = (y / rect.height) - 0.5;
            
            // Max degrees of rotation
            const rotX = -py * 8;
            const rotY = px * 8;
            
            // Apply 3D rotation and dynamic scale
            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`;
            
            // Map coordinates to CSS custom properties for spotlight shimmer radial gradient
            card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
        });

        card.addEventListener("mouseleave", function() {
            // Smoothly snap back to origin
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            card.style.removeProperty("--glow-x");
            card.style.removeProperty("--glow-y");
        });
    });
}

/**
 * Proximity-based Magnetic Button pull.
 */
function initMagneticButtons() {
    if (window.innerWidth < 992) return; // Disable on touch devices

    const buttons = document.querySelectorAll(".refresh-d-thai-spa-btn, .spa-cta-btn, .luxury-btn, .main-header__btn");

    document.addEventListener("mousemove", function(e) {
        buttons.forEach(btn => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const threshold = 70; // Attraction distance
            
            if (distance < threshold) {
                // Linear scaling attraction force closer to the center
                const force = (threshold - distance) / threshold; 
                const pullX = dx * 0.28 * force;
                const pullY = dy * 0.28 * force;
                
                btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.01)`;
            } else {
                btn.style.transform = "";
            }
        });
    });
}

/**
 * Organic Backdrop Leaf Particle drift generator (Faint tea/herbal leaves drifting down).
 */
function initFloatingLeaves() {
    if (window.innerWidth < 768) return; // Suppress on smaller screen viewports

    const container = document.createElement("div");
    container.className = "ambient-leaf-container";
    document.body.appendChild(container);

    const leafCount = 5;
    
    // Spawn initial leaves with negative delays to populate screen immediately
    for (let i = 0; i < leafCount; i++) {
        spawnLeaf(container, true);
    }

    // Monitor leaf loops and maintain steady count
    setInterval(function() {
        const activeLeaves = container.querySelectorAll(".floating-leaf-item");
        if (activeLeaves.length < leafCount) {
            spawnLeaf(container, false);
        }
    }, 4000);
}

function spawnLeaf(container, scatterInitial) {
    const leaf = document.createElement("div");
    leaf.className = "floating-leaf-item";
    
    const startX = Math.random() * 100; // Start at randomized percent horizontal coordinate
    const size = Math.random() * 16 + 14; // Sizes between 14px and 30px
    const duration = Math.random() * 8 + 14; // Travel duration 14s to 22s
    const opacity = Math.random() * 0.12 + 0.08; // Delicate fade overlay (8% to 20%)
    
    // Negative delay spawns the leaves instantly at midway paths on first load
    const delay = scatterInitial ? -(Math.random() * duration) : 0;

    leaf.style.left = `${startX}%`;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.opacity = opacity;

    // Flip horizontally at random for variation
    if (Math.random() > 0.5) {
        leaf.style.transform = "scaleX(-1)";
    }

    container.appendChild(leaf);

    // Remove leaf from DOM once its animation cycle completes
    setTimeout(function() {
        leaf.remove();
    }, (duration + delay) * 1000 + 2000);
}

/**
 * High-end Block reveal animations triggered on scroll.
 */
function initLuxuryScrollReveals() {
    const revealElements = document.querySelectorAll(".luxury-reveal-text");
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("active"));
    }
}