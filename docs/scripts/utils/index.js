  import $ from "jquery";
  
  var $win = $(window);
  var isTabletOrPhone = $win.width() <= 820;

  var isTouchDevice =
    "ontouchstart" in window ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  if (
    (isTouchDevice && /MacIntel/.test(navigator.platform)) ||
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isTouchDevice = true;
    $("body, html").addClass("touch");
  } else {
    isTouchDevice = false;
    $("body").addClass("no-touch");
  }
  var isPortrait = $win.height() > $win.width();
  var isLandscape = $win.height() < $win.width();
  var isTablet = isLandscape && isTouchDevice && $win.width() <= 1380;
  var isTabletPortrait = isTouchDevice && isPortrait && $win.width() >= 700;
  var isTabletSm = isTablet && $win.width() <= 1100;
  var isTabletMd = isTouchDevice && $win.width() < 1024;
  var isMobile = $win.width() <= 699;
  var winInnerHeight = window.innerHeight - 60;
  
  //Point trigger

  function PointTrigger(point, onEnter, onLeave, offset) {
    this.isPassed = false;

    this.check = function () {
      var top = lscroll.scroll.instance.scroll.y;
      var scrollTop = offset ? top + $win.height() / 2 : top;

      if (scrollTop >= point) {
        if (!this.isPassed) {
          this.isPassed = true;
          // do something
          onEnter();
        }
      } else {
        if (this.isPassed) {
          this.isPassed = false;
          // do something
          onLeave();
        }
      }
    };
  }

  //Touch
  function onTouchMove(element, options) {
    var xDown = null;                                                        
    var yDown = null;

    const gestureZone = element;

    gestureZone.addEventListener('touchstart', handleTouchStart, false);        
    gestureZone.addEventListener('touchmove', handleTouchMove, false);

    this.destroy = () => {
      gestureZone.removeEventListener('touchstart', handleTouchStart, false);        
      gestureZone.removeEventListener('touchmove', handleTouchMove, false);
    }

    function getTouches(evt) {
      return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }
  
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
  
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                console.log('/* right swipe */')
            } else {
                /* left swipe */
                console.log('/* left swipe */')
  
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
                console.log('/* down swipe */ ')
                if (options.onUp !== undefined) options.onUp();
  
            } else { 
                if (options.onDown !== undefined) options.onDown();
                console.log('/* up swipe */')
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };
  }

  //Swiper
  function onSwipe(element, options) {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const gestureZone = element;

    gestureZone.addEventListener(
      "touchstart",
      function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      },
      false
    );

    gestureZone.addEventListener(
      "touchend",
      function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesture();
      },
      false
    );

    function handleGesture() {
      if (touchendX < touchstartX) {
        // console.log('Swiped left');

        if (options.onLeft !== undefined) options.onLeft();
      }

      if (touchendX > touchstartX) {
        // console.log('Swiped right');
        if (options.onRight !== undefined) options.onRight();
      }

      if (touchendY < touchstartY) {
        // console.log("Swiped up");

        if (options.onUp !== undefined) options.onUp();
      }

      if (touchendY > touchstartY) {
        // console.log("Swiped down");

        if (options.onDown !== undefined) options.onDown();
      }

      if (touchendY === touchstartY) {
        // console.log('Tap');
      }
    }
  }

  //On wheel
  function Wheel(element, options) {

    var t, e = "";

    element.addEventListener ? t = "addEventListener" : (t = "attachEvent", e = "on");
    var n = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== element.onmousewheel ? "mousewheel" : "DOMMouseScroll"; 
    "DOMMouseScroll" == n ? element[t](e + "MozMousePixelScroll", onWheel) : element[t](e + n, onWheel);

    this.destroy = () => {
      element.addEventListener ? t = "removeEventListener" : (t = "detachEvent", e = "on");
      var n = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== element.onmousewheel ? "mousewheel" : "DOMMouseScroll"; 
      "DOMMouseScroll" == n ? element[t](e + "MozMousePixelScroll", onWheel) : element[t](e + n, onWheel);
    }

    var l = [], c = (new Date).getTime();
    var canScroll = !0;

    var getAverage = function(t, e) {
        for (var n = 0, o = t.slice(Math.max(t.length - e, 1)), r = 0; r < o.length; r++)
            n += o[r];
        return Math.ceil(n / e)
    }

    function onWheel(t){
        var e = (new Date).getTime()
          , n = (t = t || window.event).wheelDelta || -t.deltaY || -t.detail
          , o = Math.max(-1, Math.min(1, n))
          , r = void 0 !== t.wheelDeltaX || void 0 !== t.deltaX
          , i = Math.abs(t.wheelDeltaX) < Math.abs(t.wheelDelta) || Math.abs(t.deltaX) < Math.abs(t.deltaY) || !r;
        149 < l.length && l.shift(),
        l.push(Math.abs(n));
        var a = e - c;
        if (c = e,
        200 < a && (l = []),
        canScroll) {
            var u = (0,
            getAverage)(l, 10);
            (0,
            getAverage)(l, 70) <= u && i && (o < 0 ? (options.onUp()) : (options.onDown()));
        }
    }
  }

  function getOffset($elemTop) {
    return !isTouchDevice
      ? $elemTop
      : $elemTop - lscroll.scroll.instance.scroll.y;
  }

  function getZeroToOne(value) {
    if (value <= 0) {
      return 0;
    }
    if (value >= 1) {
      return 1;
    }

    return value;
  }

  var uniqueEventNames = [];
  function triggerEventOnce(name) {
    if (uniqueEventNames && uniqueEventNames.indexOf(name) == -1) {
      document.body.dispatchEvent(new Event(name));
    }
  }

  export default {
    getZeroToOne,
    getOffset,
    onSwipe,
    onTouchMove,
    PointTrigger,
    isMobile,
    isTablet,
    isPortrait,
    isTouchDevice,
    isTabletPortrait,
    isTabletSm,
    isTabletMd,
    Wheel,
    triggerEventOnce,
    winInnerHeight
  }