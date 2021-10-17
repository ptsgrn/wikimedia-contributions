var ER = {
  version: 0.1,
  maintainer: "Patsagorn Y.",
  feedback: "WP:TECH"
}

$(".er-not-supported").hide()
$(".mw-parser-output .er-container .er-start-button.mw-ui-button").show().click(function(){
  $(".mw-parser-output .er-container .er-start-button.mw-ui-button").hide({duration: 200, easing: 'ease-in-out'})
})
