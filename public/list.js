

if ($("input[type=checkbox]").prop( 
    ":checked")) { 
        setTimeout(function(){ $(".status").html("(deleting...)"); }, 1000);
  } else { 
    setTimeout(function(){ $(".status").html("(submited)"); }, 3000);
  } 
  if (checkoutHistory.checked) {
    alert("You have elected to show your checkout history.");
} else {
    alert("You have elected to turn off checkout history.");
}