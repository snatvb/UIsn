(function() {
  $(document).ready(function() {
    return window._ = {
      modalsbtn: '',
      closers: '',
      dropers: '',
      showers: '',
      options: {
        addBackground: true
      },
      start: function() {
        this.modalsbtn = $('.uisn-modal');
        this.closers = $('.uisn-closer-btn');
        this.dropers = $('.uisn-dropdown-hover');
        this.showers = $('.uisn-shower');
        this.modalsbtn.click(function() {
          return _.doModal($(this));
        });
        this.closers.click(function() {
          return _.hideModal($(this).parent().parent().parent());
        });
        this.dropers.hover(function() {
          return _.hoverMenu($(this).find('.uisn-dropdown-hover-menu'));
        }, function() {
          return _.hideMenu($(this).find('.uisn-dropdown-hover-menu'));
        }).click(function() {
          _.hoverMenu($(this).find('.uisn-dropdown-hover-menu'));
          return false;
        });
        return this.showers.click(function() {
          _.shower($(this));
          return false;
        });
      },
      doModal: function(e) {
        var target;
        target = e.data('target') != null ? $("#" + e.data('target')) : void 0;
        if (!target) {
          return false;
        }
        if (target.is(":visible") === false) {
          target.fadeIn(400);
          if (this.options.addBackground === true) {
            $('body').append($('<div>', {
              'class': 'uisn-modalui-backdrop'
            }).show()).css({
              'overflow': 'hidden'
            });
          }
          target.find('.uisn-modalui').click(function(event) {
            return event.stopPropagation();
          });
          target.click(function() {
            return _.hideModal(target);
          });
        }
        return false;
      },
      hideModal: function(e) {
        var mbd;
        if (!e) {
          return false;
        }
        mbd = $('.uisn-modalui-backdrop');
        if (e.is(":visible") === true) {
          e.fadeOut(300);
        }
        if (mbd != null) {
          mbd.fadeOut(300, function() {
            mbd.remove();
            return $('body').css({
              'overflow': 'auto'
            });
          });
        }
        return false;
      },
      hoverMenu: function(e) {
        if (!e) {
          return false;
        }
        if (e.is(':visible') === false) {
          return e.show();
        } else {
          return e.hide();
        }
      },
      hideMenu: function(e) {
        if (!e) {
          return false;
        }
        return e.hide();
      },
      shower: function(e) {
        var animate, target;
        target = e.data('target') != null ? $("#" + e.data('target')) : void 0;
        animate = e.data('animate') != null ? e.data('animate') : void 0;
        if (!target) {
          return false;
        }
        if ($(target).is(":visible") === false) {
          if (animate === 'fade') {
            return $(target).fadeIn(300);
          } else if (animate === 'slide') {
            return $(target).slideDown(300);
          } else {
            return $(target).show();
          }
        } else {
          if (animate === 'fade') {
            return $(target).fadeOut(300);
          } else if (animate === 'slide') {
            return $(target).slideUp(300);
          } else {
            return $(target).hide();
          }
        }
      },
      scrollControl: function(s) {
        if (!s) {
          return false;
        }
        return _.scrollFixed($("#" + s));
      },
      scrollFixed: function(e) {
        var scrollPos, w;
        if (!e) {
          return false;
        }
        scrollPos = e.offset().top;
        w = $(window);
        return w.scroll(function() {
          if (w.scrollTop() >= scrollPos) {
            return e.css({
              'position': 'fixed',
              'top': '0'
            });
          } else {
            return e.css({
              'position': 'inherit',
              'top': '0'
            });
          }
        });
      },
      checkbox: {
        sample: '.checkbox-style-sn',
        checks: '',
        forRep: '',
        Rep: '',
        styles: {
          check: 'check-style-sn',
          container: 'check-bg-sn',
          block: 'bg-block-sn'
        },
        start: function() {
          var obj;
          this.checks = $(this.sample);
          this.checks.hide();
          this.forRep = $('<div>', {
            'class': this.styles.container
          });
          this.forRep.append($('<div>', {
            'class': this.styles.block
          }).append($('<span>', {
            'class': this.styles.check
          })));
          this.Rep = this.checks.before(this.forRep);
          $("span." + this.styles.check).hide();
          $(this.sample + ':checkbox:checked').prev().find($("span." + this.styles.check)).show();
          obj = this;
          $('.checkbox-inline').click(function() {
            obj.check($(this).find('.' + obj.styles.container));
            return false;
          });
          return $('.' + this.styles.container).click(function() {
            obj.check($(this));
            return false;
          });
        },
        check: function(e) {
          var ch, input;
          if (!e) {
            return false;
          }
          ch = e.find($("span." + this.styles.check));
          input = e.next();
          if (!ch.is(':visible') && !input.prop('checked')) {
            ch.show();
            return input.prop({
              'checked': true
            });
          } else {
            ch.hide();
            return input.prop({
              'checked': false
            });
          }
        }
      },
      radiobutton: {
        sample: '.radiobutton-style-sn',
        checks: '',
        forRep: '',
        Rep: '',
        styles: {
          check: 'radio-style-sn',
          container: 'radio-bg-sn',
          block: 'bg-block-sn'
        },
        start: function() {
          var obj;
          this.checks = $(this.sample);
          this.checks.hide();
          this.forRep = $('<div>', {
            'class': this.styles.container
          });
          this.forRep.append($('<div>', {
            'class': this.styles.block
          }).append($('<span>', {
            'class': this.styles.check
          })));
          this.Rep = this.checks.before(this.forRep);
          $("span." + this.styles.check).hide();
          $(this.sample + ':radio:checked').prev().find($("span." + this.styles.check)).show();
          obj = this;
          $('.radiobutton-inline').click(function() {
            obj.check($(this).find('.' + obj.styles.container));
            return false;
          });
          return $('.' + this.styles.container).click(function() {
            obj.check($(this));
            return false;
          });
        },
        check: function(e) {
          var ch, container, inpts, input, radios;
          if (!e) {
            return false;
          }
          ch = e.find($("span." + this.styles.check));
          input = e.next();
          container = e.parent().parent();
          radios = container.find($("span." + this.styles.check));
          inpts = container.find($(this.sample));
          if (!ch.is(':visible') && !input.prop('checked')) {
            radios.hide();
            inpts.prop({
              'checked': false
            });
            ch.show();
            return input.prop({
              'checked': true
            });
          } else {
            return false;
          }
        }
      }
    };
  });
}).call(this);
