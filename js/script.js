(function() {
  $(document).ready(function() {
    _.start();
    _.checkbox.start();
    _.radiobutton.start();
    return $("#js-slider").slider({
      value: 65,
      min: 0,
      max: 100,
      step: 1,
      create: function(event, ui) {
        return $("#js-slider").slider("value");
      }
    });
  });
}).call(this);
