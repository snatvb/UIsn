$(document).ready(->
  window._ =
    modalsbtn : ''
    closers   : ''
    dropers   : ''
    showers   : ''

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

      @modalsbtn.click(() ->
        _.doModal($(@))
      )
      @closers.click(() ->
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
      @showers.click(()->
        _.shower($(@))
        return false
      )


      # Открытие модального окна, e = эелемент на которых кликнули
    doModal: (e) ->
      #console.log e.data('target')
      target = if e.data('target')? then $("#" + e.data('target'))
      if !target then return false
      if target.is(":visible") is false
        target.fadeIn(400)
        if @options.addBackground is true then $('body').append($('<div>', {'class': 'uisn-modalui-backdrop'}).show()).css({'overflow' : 'hidden'})
        target.find('.uisn-modalui').click((event)->
          event.stopPropagation()
        )
        target.click(()->
          _.hideModal(target))
      return false

    # Закрытие модального окна, e = эелемент на которых кликнули
    hideModal: (e) ->
      #console.log e
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
      if !target then return false
      if($(target).is(":visible") == false)
        if animate is 'fade' then $(target).fadeIn(300)
        else if animate is 'slide' then $(target).slideDown(300)
        else $(target).show()
      else
        if animate is 'fade' then $(target).fadeOut(300)
        else if animate is 'slide' then $(target).slideUp(300)
        else $(target).hide()

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
      sample : '.checkbox-style-sn'
      checks : ''
      forRep : ''
      Rep : ''

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

        $('.' + @styles.container).click(()->
          obj.check($(@))
          return false
        )

      # Замена
      check : (e) ->
        if !e then return false
        ch = e.find($("span." + @styles.check))
        input = e.next()
        if !ch.is(':visible') and !input.prop('checked')
          ch.show()
          input.prop('checked' : true)
        else
          ch.hide()
          input.prop('checked' : false)

    # Замена Радио-баттонов
    radiobutton :
      sample : '.radiobutton-style-sn'
      checks : ''
      forRep : ''
      Rep : ''

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
        $('.radiobutton-inline').click(()->
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
        if !ch.is(':visible') and !input.prop('checked')
          radios.hide()
          inpts.prop('checked' : false)
          ch.show()
          input.prop('checked' : true)
        else
          return false

)