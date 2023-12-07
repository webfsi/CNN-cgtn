(function () {
  window.changePage = false;
    jQuery(function () {
    window.lscroll.on("scroll", function (args) {
      $('[data-scroll-container]').addClass('scroll-subscribed');
      var progress = args.scroll.y / args.limit.y; 
      if (progress > 0.30) {
        document.body.dispatchEvent(new CustomEvent('progress-25', { detail: this }));
      }
      if (progress > 0.5) {
        document.body.dispatchEvent(new CustomEvent('progress-50', { detail: this }));
      }
      if (progress > 0.75) {
        document.body.dispatchEvent(new CustomEvent('progress-75', { detail: this }));
      }
      if (progress > 0.95) {
        document.body.dispatchEvent(new CustomEvent('progress-100', { detail: this }));
      }
  });
});

  
    function getArticle() {
      var article = 'hub';
      if (window.location.pathname.indexOf('contemporary-life') > -1) {
          article = 'af1';
      }
      if (window.location.pathname.indexOf('new-form-of-beauty') > -1) {
          article = 'af2';
      }
      if (window.location.pathname.indexOf('artistic-pursuits') > -1) {
          article = 'af3';
      }
      return article;
    }
    
    var uniqueTrackNames = [];

    document.body.addEventListener('page-change', function(e){
      if (!$('[data-scroll-container]').hasClass('scroll-subscribed')) {
        window.lscroll.on("scroll", function (args) {
          $('[data-scroll-container]').addClass('scroll-subscribed');
          var progress = args.scroll.y / args.limit.y; 
          if (progress > 0.30) {
            document.body.dispatchEvent(new CustomEvent('progress-25', { detail: this }));
          }
          if (progress > 0.5) {
            document.body.dispatchEvent(new CustomEvent('progress-50', { detail: this }));
          }
          if (progress > 0.75) {
            document.body.dispatchEvent(new CustomEvent('progress-75', { detail: this }));
          }
          if (progress > 0.95) {
            document.body.dispatchEvent(new CustomEvent('progress-100', { detail: this }));
          }
      });
      }
    });

    document.body.addEventListener('progress-25', function(e){
      if (window.changePage == false) {
        UniqueScrollTrack('2022-cgtn-'+getArticle()+'-progress-25');
      }
    });

    document.body.addEventListener('progress-50', function(e){

      if (window.changePage == false) {
        UniqueScrollTrack('2022-cgtn-'+getArticle()+'-progress-50');
      }
    });

    document.body.addEventListener('progress-75', function(e){
      if (window.changePage == false) {
        UniqueScrollTrack('2022-cgtn-'+getArticle()+'-progress-75');
      }
    });

    document.body.addEventListener('progress-100', function(e){
      if (window.changePage == false) {
        UniqueScrollTrack('2022-cgtn-'+getArticle()+'-progress-100');
      }
    });


    $(document).on('click', '[data-analytics]', function() {
      UniqueScrollTrack($(this).attr('data-analytics').replace('{article}',getArticle()));
    });

    $(document).on('click', '[data-analytics-no-mobile]', function() {
        if ($(window).width() <= 699) { return; }
        UniqueScrollTrack($(this).attr('data-analytics-no-mobile').replace('{article}',getArticle()));
      });

      $(document).on('click', '[data-analytics-mobile]', function() {
        if ($(window).width() > 699) { return; }
        UniqueScrollTrack($(this).attr('data-analytics-mobile').replace('{article}',getArticle()));
      });
      setInterval(function() {
        $('video:not(.subscribed)').on('timeupdate', function() {
          $(this).addClass('subscribed');
          var videoArticle = getArticle();
          if ($(this).attr('data-analytics-article')) {
            videoArticle = $(this).attr('data-analytics-article');
          }
          var tracking = '2022-cgtn-'+ videoArticle +'-video';
          var currentTime = this.currentTime;
          var percent = (currentTime/this.duration);
          if (percent > 0.001 && uniqueTrackNames.indexOf(tracking + '0') == -1) {
              uniqueTrackNames.push(tracking + '0');
              playedVideoTracking(tracking);
          }
          if (percent >= 0.1 && uniqueTrackNames.indexOf(tracking + '10') == -1) {
              uniqueTrackNames.push(tracking + '10');
              tenPlayedVideoTracking(tracking);
          }

          if (percent >= 0.25 && uniqueTrackNames.indexOf(tracking + '25') == -1) {
              uniqueTrackNames.push(tracking + '25');
              twentyFivePlayedVideoTracking(tracking);
          }

          if (percent >= 0.5 && uniqueTrackNames.indexOf(tracking + '50') == -1) {
              uniqueTrackNames.push(tracking + '50');
              fiftyPlayedVideoTracking(tracking);
          }

          if (percent >= 0.75 && uniqueTrackNames.indexOf(tracking + '75') == -1) {
              uniqueTrackNames.push(tracking + '75');
              seventyFivePlayedVideoTracking(tracking);
          }
          
          if (percent > 0.90 && uniqueTrackNames.indexOf(tracking + '100') == -1) {
              uniqueTrackNames.push(tracking + '100');
              endVideoTracking(tracking);
          }
      });
      },300)
        

    function playedVideoTracking(title) {
        s.events = 'event32';
        s.prop29 = title;
        s.eVar41 = 'D=c29';
        s.tl(true, 'o', 'cnnadfeaturevideo:play');
        s.events = s.prop29 = s.eVar41 = '';
      }

      function tenPlayedVideoTracking(title) {
        s.events = 'event40,event36';
        s.prop29 = title;
        s.eVar41 = 'D=c29';
        s.tl(true, 'o', 'cnnadfeaturevideo:milestone - video 10% complete');
        s.events = s.prop29 = s.eVar41 = s.products = '';
      }

   

      function twentyFivePlayedVideoTracking(title) {
        s.events = 'event41,event36';
        s.prop29 = title;
        s.eVar41 = 'D=c29';
        s.tl(true, 'o', 'cnnadfeaturevideo:milestone - video 25% complete');
        s.events = s.prop29 = s.eVar41 = s.products = '';
      }

   

      function fiftyPlayedVideoTracking(title) {
        s.events = 'event2,event36';
        s.prop29 = title;
        s.eVar41 = 'D=c29';
        s.tl(true, 'o', 'cnnadfeaturevideo:milestone - video 50% complete');
        s.events = s.prop29 = s.eVar41 = s.products = '';
      }

      function seventyFivePlayedVideoTracking(title) {
        s.events = 'event42,event36';
        s.prop29 = title;
        s.eVar41 = 'D=c29';
        s.tl(true, 'o', 'cnnadfeaturevideo:milestone - video 75% complete');
        s.events = s.prop29 = s.eVar41 = s.products = '';
      }

   

      function endVideoTracking(title) {
        s.events = 'event33,event36';
        s.prop29 = title;
        s.eVar41 = 'D=c29';
        s.tl(true, 'o', 'cnnadfeaturevideo:complete');
        s.events = s.prop29 = s.eVar41 = s.products = '';
      }
    
    




    function UniqueScrollTrack(text) {
        if (uniqueTrackNames.indexOf(text) == -1) {
            uniqueTrackNames.push(text);
            scrollTrack(text, text);
        }
    }
    
    function scrollTrack(text, customlink) {
        if (typeof(s) != 'undefined' && s) {
            s.events = 'event76';
            s.prop69 = text;
            s.eVar69 = 'D=c69';
            s.pageURL = window.location.href;
            s.tl(true, 'o', customlink);
            s.prop69 = s.eVar69 = s.events = '';
        }
    }
    
    })();