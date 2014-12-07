$(document).ready(->
  window._ =
    #modalsbtn : ''
    #closers   : ''
    #dropers   : ''
    #showers   : ''

    options:  {
      addBackground : true
    }

    start: () ->
      # Сбор блоков и элементов

      @modalsbtn = $('.uisn-modal')
      @closers = $('.uisn-closer-btn')
      @dropers = $('.uisn-dropdown-hover')
      @showers = $('.uisn-shower')

      #construct

      @modalsbtn.on('click', () ->
        _.doModal($(@))
      )
      @closers.on('click', () ->
        _.hideModal($(@).parent().parent().parent())
      )
      @dropers.hover(() ->
        _.hoverMenu($(@).find('.uisn-dropdown-hover-menu'))
      , ()->
        _.hideMenu($(@).find('.uisn-dropdown-hover-menu'))
      ).click(() ->
        _.hoverMenu($(@).find('.uisn-dropdown-hover-menu'))
        return false
      )
      @showers.on('click', (event)->
        _.shower($(@))
        event.preventDefault()
      )


    # Открытие модального окна, e = эелемент на которых кликнули
    doModal: (e) ->
      target = if e.data('target')? then $("#" + e.data('target'))
      if !target then return false
      if target.is(":visible") is false
        target.fadeIn(400)
        if @options.addBackground is true then $('body').append($('<div>', {'class': 'uisn-modalui-backdrop'}).show()).css({'overflow' : 'hidden'})
        target.find('.uisn-modalui').click((event)->
          event.stopPropagation()
        )
        target.on('click', ()->
          _.hideModal(target))
      return false

    # Закрытие модального окна, e = эелемент на которых кликнули
    hideModal: (e) ->
      if !e then return false
      mbd = $('.uisn-modalui-backdrop')
      if e.is(":visible") is true then e.fadeOut(300)
      if mbd? then mbd.fadeOut(300, () ->
        mbd.remove()
        $('body').css({'overflow' : 'auto'})
      )
      return false

    # Наведение и показ меню, e = эелемент который скрыт
    hoverMenu: (e) ->
      if !e then return false
      if e.is(':visible') is false then e.show()
      else e.hide()

    # Скрытие меню, e = эелемент который нужно скрыть
    hideMenu: (e) ->
      if !e then return false
      e.hide()

    # Контроллер показа скрытых элементов старницы, без лишнего JS
    # все открытия и скрытия, можно реализовать в вертске
    shower: (e) ->
      target = if e.data('target')? then $("#" + e.data('target'))
      animate = if e.data('animate')? then e.data('animate')
      targets = e.data('targets')
      switch_ = e.data('switch')
      if !target and !targets then return false
      if targets?
        ids = targets.split(',')
        ids.forEach( (item, i, arr) ->
          el = $('#' + item)
          if switch_ == 'hide'
           el.hide()
          else if switch_ == 'show'
            el.show()
          else
            if el.is(":visible")
              el.hide()
            else
              el.show()
        )
        return
      if !target then return false
      if(target.is(":visible") == false)
        if animate is 'fade' then target.fadeIn(300)
        else if animate is 'slide'
          target.slideDown(300)
        else
          target.show()
      else
        if animate is 'fade' then target.fadeOut(300)
        else if animate is 'slide'
          target.slideUp(300)
        else target.hide()

    # Стартер скролла
    scrollControl: (s) ->
      if !s then return false
      _.scrollFixed($("##{s}"))

    # Прикрепление блока к верху при скроллинге
    scrollFixed: (e) ->
      if !e then return false
      scrollPos = e.offset().top
      w = $(window)
      w.scroll(() ->
        if w.scrollTop() >= scrollPos then e.css({'position' : 'fixed', 'top' : '0'})
        else e.css({'position' : 'inherit', 'top' : '0'})
      )


    # Замена чекбоксов
    checkbox :
      sample : '.checkbox-style'
      #checks : ''
      #forRep : ''
      #Rep : ''

      styles :
        check : 'check-style-sn'
        container : 'check-bg-sn'
        block : 'bg-block-sn'


      # Конструктор
      start : () ->
        @checks = $(@sample)
        @checks.hide()
        @forRep = $('<div>', {'class' : @styles.container})
        @forRep.append($('<div>', {'class' : @styles.block}).append($('<span>', {'class' : @styles.check})))
        @Rep = @checks.before(@forRep)
        $("span." + @styles.check).hide()
        $(@sample + ':checkbox:checked').prev().find($("span." + @styles.check)).show()
        obj = @
        $('.checkbox-inline').click(()->
          obj.check($(@).find('.' + obj.styles.container))
          return false
        )
        $('.checkbox').click(()->
          obj.check($(@).find('.' + obj.styles.container))
          return false
        )

        $('.' + @styles.container).click(()->
          obj.check($(@))
          return false
        )

      # Замена
      check : (e) ->
        if !e then return false
        ch = e.find($("span." + @styles.check))
        input = e.next()
        if !ch.is(':visible') and !input.is('checked')
          ch.show()
          input.attr("checked","checked")
        else
          ch.hide()
          input.removeAttr("checked")

    # Замена Радио-баттонов
    radiobutton :
      sample : '.radiobutton-style'
      #checks : ''
      #forRep : ''
      #Rep : ''

      styles :
        check : 'radio-style-sn'
        container : 'radio-bg-sn'
        block : 'bg-block-sn'


    # Конструктор
      start : () ->
        @checks = $(@sample)
        @checks.hide()
        @forRep = $('<div>', {'class' : @styles.container})
        @forRep.append($('<div>', {'class' : @styles.block}).append($('<span>', {'class' : @styles.check})))
        @Rep = @checks.before(@forRep)
        $("span." + @styles.check).hide()
        $(@sample + ':radio:checked').prev().find($("span." + @styles.check)).show()
        obj = @
        $('.radio-inline').click(()->
          obj.check($(@).find('.' + obj.styles.container))
          return false
        )
        $('.radio').click(()->
          obj.check($(@).find('.' + obj.styles.container))
          return false
        )

        $('.' + @styles.container).click(()->
          obj.check($(@))
          return false
        )

      # Замена
      check : (e) ->
        if !e then return false
        ch = e.find($("span." + @styles.check))
        input = e.next()
        container = e.parent().parent()
        radios = container.find($("span." + @styles.check))
        inpts = container.find($(@sample))
        radios.hide()
        inpts.removeAttr("checked")
        ch.show()
        input.attr("checked","checked")

    # Выравнивание блоков по высоте
    alingmenth :
      sample : "aligmenth-sn"

      # Конструктор
      start : () ->
        divs = $('.' + @sample + ' > div')
        h = 0
        e = $('.' + @sample)
        count_col = if e.data('columns')? then parseInt(e.data('columns'))
        if count_col < 2
          divs.each(() ->
            this_h = $(@).height()
            if (this_h > h)
              h = this_h
          )
          divs.height(h)
        else
          i = 0
          divs.each(() ->
            this_h = $(@).height()
            if (this_h > h)
              h = this_h
            i++
            if i >= count_col
              return false
          )
          i = 0
          divs.each(() ->
            th = $(@)
            th.height(h)
            i++
            if i >= count_col
              return false
          )
    # Функционал табов

    tabs :
      sample : 'tabs-sn'

      # Конструктор
      start : () ->
        @cont_e = $('.' + @sample)
        @container = $('#' + @cont_e.data('container'))
        @elements = @cont_e.find(@cont_e.data('elements'))
        @active = @cont_e.data('active')
        obj = @
        @elements.on('click', () ->
          obj.switch($(@))
          return false
        )
      switch : (e) ->
        if e.hasClass(@active)
          return false
        target = e.data('target')
        @container.find('> div').hide()
        $('#' + target).show()
        @elements.removeClass(@active)
        e.addClass(@active)

    # Стиализация input=file
    file_inpt :
      sample : '.file-sn'
      btn_class : '.file-btn-sn'
      text_class : '.filename-sn'
      elts : []

      start : () -> #конструктор
        file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false
        @sample = $(@sample)
        @elts.inp = @sample.find( "input[type=file]" )
        @elts.btn = @sample.find( @btn_class )
        @elts.lbl = @sample.find( @text_class )
        obj = @

        @elts.btn.on('click', (event) ->
          $(@).parent().find('input[type=file]').click()
          #obj.elts.inp.click()
          event.preventDefault()
        )

        @elts.btn.focus( () ->
          obj.elts.inp.focus()
        )

        @elts.inp.focus( () ->
          obj.sample.addClass( "focus" )
        ).blur( () ->
          obj.sample.removeClass( "focus" )
        )

        #@elts.lbl.on('keydown', () -> # запрет на ввод символов и их стерание
        #  event.preventDefault()
        #)

        @elts.inp.on( 'change', () ->
          inp = $(@)
          lbl = inp.parent().find(obj.text_class)
          btn = inp.parent().find(obj.btn_class)
          if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name
            file_size = inp[ 0 ].files[ 0 ].size / 1024
            if inp.data('size')?
              if file_size > inp.data('size')
                #lbl.val('Файл превышает допустимый вес')
                lbl.addClass('error-inpt')
                fs = (file_size / 1024).toFixed(2)
                if( lbl.is( ":visible" ) )
                  lbl.popover('destroy')
                  lbl.popover({
                    content : "Большой вес файла: #{fs}мб"
                    selector : true
                    placement : 'top'
                    toggle : 'popover'
                  })
                  lbl.popover('show')
                else
                  btn.popover('destroy')
                  btn.popover({
                    content : "Большой вес файла: #{fs}мб"
                    selector : true
                    placement : 'top'
                    toggle : 'popover'
                  })
                  btn.popover('show')
                if file_name? then lbl.val(file_name)
                return false
              else
                lbl.removeClass('error-inpt')
                lbl.popover('destroy')
                btn.popover('destroy')
          else
            file_name = inp.val().replace( "C:\\fakepath\\", '' )
          if( ! file_name.length )
            return
          if( lbl.is( ":visible" ) )
            lbl.val( file_name )
            btn.text( "Обзор" )
          else
            #console.log file_name.length
            if file_name.length > 8 then file_name = file_name.substr(0, file_name.length - 8) + '...'
            btn.text( file_name )
          ###if inp.data('valid')?
            x = _.validator.valid(inp.data('valid'), file_name)
            if !x
              lbl.addClass('error-inpt')
            else
              lbl.removeClass('error-inpt')###
          )
    # Складные табы
    dropedTabs :
      classes :
        container : '.dropedTabs-sn'
        vsisble : 'visible-sn'
      elems : []

      # Конструктор
      start : () ->
        @elems['container'] = $(@classes.container)
        @elems['elems'] = @elems['container'].find(@elems['container'].data('elements'))
        temp = @elems['container'].data('container')
        @elems['target'] = {
          container :  $(temp),
          elems : $(temp + ' ' + @elems['container'].data('content'))
        }
        #console.log @elems['target']
        obj = @
        @elems['elems'].on('click', (event) ->
          obj.clickCheck(@)
          event.preventDefault()
        )

      clickCheck : (e) ->
        e = $(e)
        if e.hasClass('active')
          if !e.hasClass('opened')
            @elems['elems'].addClass(@classes.vsisble)
            e.addClass('opened')
            return
          else
            e.removeClass('opened')
            @elems['elems'].removeClass(@classes.vsisble)
            return
        @showContent(e)
        @elems['elems'].removeClass('opened')
        @elems['elems'].removeClass('active')
        @elems['elems'].removeClass(@classes.vsisble)
        e.addClass('active')
      showContent : (e) ->
        ind = e.index()
        @elems['target']['elems'].removeClass('active')
        #console.log @elems['target']['elems'].eq(ind).remove()
        #console.log @elems['target']['activeClass']
        @elems['target']['elems'].eq(ind).addClass('active')

    # Переключатель
    activeSwitcher :
      classes :
        #container : '.active-switcher-sn'
        elems : ''
        activers : ''
      elems : []
      start : (id) ->
        @elems[id] = []
        @elems[id].container = $(id)
        @elems[id].offer = true
        if @elems[id].container.data('offer')? then @elems[id].offer = false
        @classes.elems = @elems[id].container.data('elems')
        @classes.activers = @elems[id].container.data('activers')
        @elems[id].elems = @elems[id].container.find(@classes.elems)
        #console.log @elems.container
        obj = @
        @elems[id].elems.on('click', (event) ->
          obj.clickFunc(@, id)
          event.preventDefault()
        )

      clickFunc : (e, id) ->
        el = $(e)
        #offer = true
        #if el.data('offer')? then offer = false
        if el.hasClass(@classes.activers) && @elems[id].offer
          el.removeClass(@classes.activers)
          return
        @elems[id].elems.removeClass(@classes.activers)
        el.addClass(@classes.activers)

    validator:

      # Констуркутор
      valid : (type, text) ->
        tr = false
        if !type or !text then return false
        type = type.split(',')
        type.forEach( (item, i, arr) ->
          if text.indexOf(item) + 1 then return tr = true
        )
        return tr

)