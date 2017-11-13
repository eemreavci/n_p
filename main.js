$(document).ready(function () {
  var initialHistoryUrl = window.location.pathname === '/' ? '/index' : window.location.pathname;
  history.pushState({url: initialHistoryUrl}, null, window.location.pathname);
  $(document).on('click', '[data-url]', function (e) {
    var url = $(e.target).data('url');
    var historyBackUrl = window.location.pathname === '/' ? 'index' : window.location.pathname;
    var historyUrl = url === 'index' ? '/' : url;
    history.pushState({url: historyBackUrl}, null, historyUrl);
    var targetHref = $(e.target).data('hash');
    $('.content-container').load(url + '.html .page-content', function (e) {
      var hashTarget = targetHref && targetHref[0] === '#' ? $(targetHref) : null;
      var scrollPosition = hashTarget ? hashTarget.offset().top - 59 : 0;
      ga('set', 'page', '/' + url + '.html');
      ga('send', 'pageview');
      $('html,body').animate({
        scrollTop: scrollPosition
      }, 600, 'easeOutBack');
    });
  });

  window.addEventListener('popstate', function(e) {
    // e.state is equal to the data-attribute of the last image we clicked
    if (e.state && e.state.url) {
      $('.content-container').load(e.state.url + '.html .page-content');
    }
  });

  $(function() {
    $('[data-hash]').click(function(e) {
      var target = $(e.target);
      ga('set', 'page', '/' + target.data('hash') + '.html');
      ga('send', 'pageview');
      target = $(target.data('hash'));
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 59
        }, 600, 'easeOutBack');
        return false;
      }
    });
  });

  function openGalleryWithItems (items) {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }

  $(document).on('click', '[data-content]', function (e) {
    var imageUrl = $(e.currentTarget).data('content');
    var width = parseInt($(e.currentTarget).data('width'));
    var height = parseInt($(e.currentTarget).data('height'));
    // build items array
    var items = [
        {
            src: imageUrl,
            w: width,
            h: height
        }
    ];

    openGalleryWithItems(items);
  });

});
