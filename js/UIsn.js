(function() {
  $(document).ready(function() {
    return window._ = {
      options: {
        addBackground: true
      },
      start: function() {
        this.modalsbtn = $('.uisn-modal');
        this.closers = $('.uisn-closer-btn');
        this.dropers = $('.uisn-dropdown-hover');
        this.showers = $('.uisn-shower');
        this.modalsbtn.on('click', function() {
          return _.doModal($(this));
        });
        this.closers.on('click', function() {
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
        return this.showers.on('click', function(event) {
          _.shower($(this));
          return event.preventDefault();
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
          target.on('click', function() {
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
        var animate, ids, switch_, target, targets;
        target = e.data('target') != null ? $("#" + e.data('target')) : void 0;
        animate = e.data('animate') != null ? e.data('animate') : void 0;
        targets = e.data('targets');
        switch_ = e.data('switch');
        if (!target && !targets) {
          return false;
        }
        if (targets != null) {
          ids = targets.split(',');
          ids.forEach(function(item, i, arr) {
            var el;
            el = $('#' + item);
            if (switch_ === 'hide') {
              return el.hide();
            } else if (switch_ === 'show') {
              return el.show();
            } else {
              if (el.is(":visible")) {
                return el.hide();
              } else {
                return el.show();
              }
            }
          });
          return;
        }
        if (!target) {
          return false;
        }
        if (target.is(":visible") === false) {
          if (animate === 'fade') {
            return target.fadeIn(300);
          } else if (animate === 'slide') {
            return target.slideDown(300);
          } else {
            return target.show();
          }
        } else {
          if (animate === 'fade') {
            return target.fadeOut(300);
          } else if (animate === 'slide') {
            return target.slideUp(300);
          } else {
            return target.hide();
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
        sample: '.checkbox-style',
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
          $('.checkbox').click(function() {
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
          if (!ch.is(':visible') && !input.is('checked')) {
            ch.show();
            return input.attr("checked", "checked");
          } else {
            ch.hide();
            return input.removeAttr("checked");
          }
        }
      },
      radiobutton: {
        sample: '.radiobutton-style',
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
          $('.radio-inline').click(function() {
            obj.check($(this).find('.' + obj.styles.container));
            return false;
          });
          $('.radio').click(function() {
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
          radios.hide();
          inpts.removeAttr("checked");
          ch.show();
          return input.attr("checked", "checked");
        }
      },
      alingmenth: {
        sample: "aligmenth-sn",
        start: function() {
          var count_col, divs, e, h, i;
          divs = $('.' + this.sample + ' > div');
          h = 0;
          e = $('.' + this.sample);
          count_col = e.data('columns') != null ? parseInt(e.data('columns')) : void 0;
          if (count_col < 2) {
            divs.each(function() {
              var this_h;
              this_h = $(this).height();
              if (this_h > h) {
                return h = this_h;
              }
            });
            return divs.height(h);
          } else {
            i = 0;
            divs.each(function() {
              var this_h;
              this_h = $(this).height();
              if (this_h > h) {
                h = this_h;
              }
              i++;
              if (i >= count_col) {
                return false;
              }
            });
            i = 0;
            return divs.each(function() {
              var th;
              th = $(this);
              th.height(h);
              i++;
              if (i >= count_col) {
                return false;
              }
            });
          }
        }
      },
      tabs: {
        sample: 'tabs-sn',
        start: function() {
          var obj;
          this.cont_e = $('.' + this.sample);
          this.container = $('#' + this.cont_e.data('container'));
          this.elements = this.cont_e.find(this.cont_e.data('elements'));
          this.active = this.cont_e.data('active');
          obj = this;
          return this.elements.on('click', function() {
            obj["switch"]($(this));
            return false;
          });
        },
        "switch": function(e) {
          var target;
          if (e.hasClass(this.active)) {
            return false;
          }
          target = e.data('target');
          this.container.find('> div').hide();
          $('#' + target).show();
          this.elements.removeClass(this.active);
          return e.addClass(this.active);
        }
      },
      file_inpt: {
        sample: '.file-sn',
        btn_class: '.file-btn-sn',
        text_class: '.filename-sn',
        elts: [],
        start: function() {
          var file_api, obj, _ref;
          file_api = (_ref = window.File && window.FileReader && window.FileList && window.Blob) != null ? _ref : {
            "true": false
          };
          this.sample = $(this.sample);
          this.elts.inp = this.sample.find("input[type=file]");
          this.elts.btn = this.sample.find(this.btn_class);
          this.elts.lbl = this.sample.find(this.text_class);
          obj = this;
          this.elts.btn.on('click', function(event) {
            $(this).parent().find('input[type=file]').click();
            return event.preventDefault();
          });
          this.elts.btn.focus(function() {
            return obj.elts.inp.focus();
          });
          this.elts.inp.focus(function() {
            return obj.sample.addClass("focus");
          }).blur(function() {
            return obj.sample.removeClass("focus");
          });
          return this.elts.inp.on('change', function() {
            var btn, file_name, file_size, fs, inp, lbl;
            inp = $(this);
            lbl = inp.parent().find(obj.text_class);
            btn = inp.parent().find(obj.btn_class);
            if (file_api && inp[0].files[0]) {
              file_name = inp[0].files[0].name;
              file_size = inp[0].files[0].size / 1024;
              if (inp.data('size') != null) {
                if (file_size > inp.data('size')) {
                  lbl.addClass('error-inpt');
                  fs = (file_size / 1024).toFixed(2);
                  if (lbl.is(":visible")) {
                    lbl.popover('destroy');
                    lbl.popover({
                      content: "Большой вес файла: " + fs + "мб",
                      selector: true,
                      placement: 'top',
                      toggle: 'popover'
                    });
                    lbl.popover('show');
                  } else {
                    btn.popover('destroy');
                    btn.popover({
                      content: "Большой вес файла: " + fs + "мб",
                      selector: true,
                      placement: 'top',
                      toggle: 'popover'
                    });
                    btn.popover('show');
                  }
                  if (file_name != null) {
                    lbl.val(file_name);
                  }
                  return false;
                } else {
                  lbl.removeClass('error-inpt');
                  lbl.popover('destroy');
                  btn.popover('destroy');
                }
              }
            } else {
              file_name = inp.val().replace("C:\\fakepath\\", '');
            }
            if (!file_name.length) {
              return;
            }
            if (lbl.is(":visible")) {
              lbl.val(file_name);
              return btn.text("Обзор");
            } else {
              if (file_name.length > 8) {
                file_name = file_name.substr(0, file_name.length - 8) + '...';
              }
              return btn.text(file_name);
            }
            /*if inp.data('valid')?
              x = _.validator.valid(inp.data('valid'), file_name)
              if !x
                lbl.addClass('error-inpt')
              else
                lbl.removeClass('error-inpt')*/
          });
        }
      },
      dropedTabs: {
        classes: {
          container: '.dropedTabs-sn',
          vsisble: 'visible-sn'
        },
        elems: [],
        start: function() {
          var obj, temp;
          this.elems['container'] = $(this.classes.container);
          this.elems['elems'] = this.elems['container'].find(this.elems['container'].data('elements'));
          temp = this.elems['container'].data('container');
          this.elems['target'] = {
            container: $(temp),
            elems: $(temp + ' ' + this.elems['container'].data('content'))
          };
          obj = this;
          return this.elems['elems'].on('click', function(event) {
            obj.clickCheck(this);
            return event.preventDefault();
          });
        },
        clickCheck: function(e) {
          e = $(e);
          if (e.hasClass('active')) {
            if (!e.hasClass('opened')) {
              this.elems['elems'].addClass(this.classes.vsisble);
              e.addClass('opened');
              return;
            } else {
              e.removeClass('opened');
              this.elems['elems'].removeClass(this.classes.vsisble);
              return;
            }
          }
          this.showContent(e);
          this.elems['elems'].removeClass('opened');
          this.elems['elems'].removeClass('active');
          this.elems['elems'].removeClass(this.classes.vsisble);
          return e.addClass('active');
        },
        showContent: function(e) {
          var ind;
          ind = e.index();
          this.elems['target']['elems'].removeClass('active');
          return this.elems['target']['elems'].eq(ind).addClass('active');
        }
      },
      activeSwitcher: {
        classes: {
          elems: '',
          activers: ''
        },
        elems: [],
        start: function(id) {
          var obj;
          this.elems[id] = [];
          this.elems[id].container = $(id);
          this.elems[id].offer = true;
          if (this.elems[id].container.data('offer') != null) {
            this.elems[id].offer = false;
          }
          this.classes.elems = this.elems[id].container.data('elems');
          this.classes.activers = this.elems[id].container.data('activers');
          this.elems[id].elems = this.elems[id].container.find(this.classes.elems);
          obj = this;
          return this.elems[id].elems.on('click', function(event) {
            obj.clickFunc(this, id);
            return event.preventDefault();
          });
        },
        clickFunc: function(e, id) {
          var el;
          el = $(e);
          if (el.hasClass(this.classes.activers) && this.elems[id].offer) {
            el.removeClass(this.classes.activers);
            return;
          }
          this.elems[id].elems.removeClass(this.classes.activers);
          return el.addClass(this.classes.activers);
        }
      },
      validator: {
        valid: function(type, text) {
          var tr;
          tr = false;
          if (!type || !text) {
            return false;
          }
          type = type.split(',');
          type.forEach(function(item, i, arr) {
            if (text.indexOf(item) + 1) {
              return tr = true;
            }
          });
          return tr;
        }
      }
    };
  });
}).call(this);
