$(document).ready(function(){
    $('.collapsible').collapsible({
        accordion: true
    });
    $('.parallax').parallax();
    $('.tooltipped').tooltip();
    $(".button-collapse").sideNav();
    $('.carousel').carousel();
    $('.slider').slider({
        indicators:false,
        transition:1000,
        duration:10000
    });
    $('.chips').material_chip();
    $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": 'https://placehold.it/250x250'
    },
    limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
    onAutocomplete: function(val) {
      // Callback function when value is autcompleted.
    },
    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
    $('.modal').modal();
});

//new WOW().init();
    
