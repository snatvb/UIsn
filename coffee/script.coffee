$(document).ready(->
  _.start()
  _.checkbox.start()
  _.radiobutton.start()
  $( "#js-slider" ).slider(
    value : 65,
    min : 0,
    max : 100,
    step : 1,
    create : ( event, ui ) ->
      $( "#js-slider" ).slider("value")

  )
)

