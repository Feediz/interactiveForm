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

// get reference all elements with in the activities class
//const checkboxes = document.querySelectorAll(".activities input");
const checkboxes = $(".activities input:checkbox");

document.querySelector(".activities").addEventListener("change", e => {
  const clicked = e.target;
  const clickedCost = clicked.attributes["data-cost"].value;
  let clickedTime = 0;
  if (typeof clicked.attributes["data-day-and-time"] !== "undefined") {
    clickedTime = clicked.attributes["data-day-and-time"].value;
  }

  for (let i = 0; i < checkboxes.length; i++) {
    let currentTime = 0;
    if (
      typeof checkboxes[i].getAttribute("data-day-and-time") !== "undefined"
    ) {
      currentTime = checkboxes[i].getAttribute("data-day-and-time");
    }

    // disable other workshops with same date and time as the selected workshops
    if (clickedTime === currentTime && clicked !== checkboxes[i]) {
      if ($(clicked).prop("checked")) {
        // set up an element to add to the dom
        const spanTag = document.createElement("span");
        // adding html text to show users why workshop slot not available
        spanTag.innerHTML =
          "<b style='color:red;' >This time slot isn't available due to selection of a workshop during same time.</b>";
        // adding span element to the dom
        checkboxes[i].parentNode.insertBefore(
          spanTag,
          checkboxes[i].nextSibling.nextSibling
        );
        // disable element if time slot is same as another one
        checkboxes[i].setAttribute("disabled", "true");
      } else {
        // removing informational span element from dom
        checkboxes[i].nextSibling.nextSibling.remove();
        // enable element
        checkboxes[i].removeAttribute("disabled");
      }
    }
  }
});
