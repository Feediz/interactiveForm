// setting focus on first field
$("form:first *:input[type!=hidden]:first").focus();

// including and displaying if job role selected is 'Other'
const jobRoleElement = $("#title");

// hide other title initially
$("#other-title").hide();

jobRoleElement.change(e => {
  const jobRoleSelected = e.target.value;
  if (jobRoleSelected === "other") {
    // show other title if selected role is other
    $("#other-title").show();
  } else {
    // hide other title selected role is not other
    $("#other-title").hide();
  }
});

// reference design select element
const designElement = $("#design");

// reference color select element
const $colorElement = $("#color");

// reference color select options
const $colorElementOptions = $colorElement.children();

// initially hide color options
$colorElementOptions.each(i => {
  // starting with one since select options indexes are not zero based
  i = i + 1;

  // adding css style to hide options
  $("#color :nth-child(" + i + ")").css("display", "none");
});
// append and select the option telling user to select theme first
$colorElement.append(new Option("Please select a T-shirt theme", ""));
$colorElement.val("");

designElement.change(e => {
  const selectedDesign = e.target.value;

  if (designElement.value !== "") {
    if (selectedDesign === "js puns") {
      $colorElementOptions.each(i => {
        // starting with one since select options indexes are not zero based
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");
        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "") {
          $currentOption.css("display", "none");
        }

        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "none");
        }

        $colorElement.val("cornflowerblue");
      });
    } else if (selectedDesign === "heart js") {
      $colorElementOptions.each(i => {
        // starting with one since select options indexes are not zero based
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");
        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "") {
          $currentOption.css("display", "none");
        }

        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "none");
        }

        $colorElement.val("tomato");
      });
    } else if (selectedDesign === "") {
      $colorElementOptions.each(i => {
        // starting with one since select options indexes are not zero based
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");
        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "") {
          $currentOption.css("display", "");
        }

        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "none");
        }

        $colorElement.val("");
      });
    }
  }
});

// if(selectedDesign === 'js puns') {
//   // cornflowerblue
//   // darkslategrey
//   // gold
//   echo 'sdf';
// } else if (selectedDesign === 'heart js') {
//   // tomato
//   // steelblue
//   // dimgrey
//   echo 'sdf';
// }
