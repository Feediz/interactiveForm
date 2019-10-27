// ================================================================
// ==============  Basic info section =============================
// ================================================================
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

// ================================================================
// ==============  t-shirt info section ===========================
// ================================================================

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
//$colorElement.append(new Option("Please select a T-shirt theme", ""));
$colorElement.append('<option value="">Please select a T-shirt theme</option>');

$colorElement.val("");

designElement.change(e => {
  const selectedDesign = e.target.value;
  // starting with one since select options indexes are not zero based
  let i = 1;

  // hide the select t-shirt option under the color drop down
  $("option:contains(Please select a T-shirt theme)").hide();

  // hide the select theme option under the design drop down
  $("option:contains(Select Theme)").hide();

  if (designElement.value !== "") {
    if (selectedDesign === "js puns") {
      $colorElementOptions.each(i => {
        i = i + 1;
        const $currentOption = $("#color :nth-child(" + i + ")");

        if ($currentOption.val() === "cornflowerblue") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "darkslategrey") {
          $currentOption.css("display", "");
        } else if ($currentOption.val() === "gold") {
          $currentOption.css("display", "");
        }

        if ($currentOption.val() === "tomato") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "steelblue") {
          $currentOption.css("display", "none");
        } else if ($currentOption.val() === "dimgrey") {
          $currentOption.css("display", "none");
        }
        // select the corn flower option
        $colorElement.val($("#color :nth-child(1)").val());
        // $colorElement.val("cornflowerblue");
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

        // select the tomato option
        // $colorElement.val("tomato");
        $colorElement.val($("#color :nth-child(4)").val());
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

// ================================================================
// ==============  Register for activities section ================
// ================================================================
// get reference all elements with in the activities class
//const checkboxes = document.querySelectorAll(".activities input");
const checkboxes = $(".activities input:checkbox");
const checkBoxesFieldSet = document.querySelector(".activities");

// runningTotalCost will hold total cost for selected activities
let runningTotalCost = 0;
const runningTotalCostUI = document.createElement("span");
runningTotalCostUI.innerHTML = "Total Cost: $" + runningTotalCost;
runningTotalCostUI.id = "runningCostSpan";

checkBoxesFieldSet.parentNode.insertBefore(
  runningTotalCostUI,
  checkBoxesFieldSet.nextElementSibling
);

checkBoxesFieldSet.addEventListener("change", e => {
  const clicked = e.target;
  let clickedCost = clicked.attributes["data-cost"].value;
  clickedCost = clickedCost.substr(1);

  if (e.target.checked) {
    runningTotalCost = parseInt(runningTotalCost) + parseInt(clickedCost);
  } else {
    runningTotalCost = parseInt(runningTotalCost) - parseInt(clickedCost);
  }

  // Update running cost
  runningTotalCostUI.innerHTML = "Total Cost: $" + runningTotalCost;
  let clickedTime = 0;
  if (typeof clicked.attributes["data-day-and-time"] !== "undefined") {
    clickedTime = clicked.attributes["data-day-and-time"].value;
  }

  for (let i = 0; i < checkboxes.length; i++) {
    // initialize variable to hold date and time information for comparison
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
          "<b style='color:red;' >This time slot isn't available.</b>";
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

// ================================================================
// ==============  payment info section ===========================
// ================================================================

// get a reference to paypal
const paypalDiv = $("#paypal");
// hide paypal info at first
paypalDiv.hide();

// get a reference to bitcoin
const bitCoinDiv = $("#bitcoin");
// hide bitcoin info at first
bitCoinDiv.hide();

// get a reference to credit card div
const ccDiv = $("#credit-card");

const paymentMethodSelect = $("#payment");
paymentMethodSelect.on("change", e => {
  let selectedPaymentMethod = e.target.value;

  if (selectedPaymentMethod === "Credit Card") {
    // show cc and hide paypal and bitcoin
    bitCoinDiv.hide();
    ccDiv.show();
    paypalDiv.hide();
  } else if (selectedPaymentMethod === "PayPal") {
    // show paypal and hide bitcoin and cc
    bitCoinDiv.hide();
    ccDiv.hide();
    paypalDiv.show();
  } else if (selectedPaymentMethod === "Bitcoin") {
    //show bitcoin and hide cc and paypal
    bitCoinDiv.show();
    ccDiv.hide();
    paypalDiv.hide();
  }
});

// ================================================================
// ==============  validator functions ============================
// ================================================================
$("form").on("input submit", e => {
  e.preventDefault();
  const eventType = e.type;
  const element = e.target;
  const elementID = element.id;

  let isFormValid = false;

  // validate name field on submit and as user types
  if (elementID === "name" || eventType === "submit") {
    if (validateName()) {
      isFormValid = true;
      console.log(isFormValid);
    }
  }

  // validate email field on submit and as user types
  if (elementID === "mail" || eventType === "submit") {
    validateEmail();
  }

  if (eventType === "submit") {
    // validate that at least one event is selected on submit
    // begin
    let oneActivitySelected = false;
    checkboxes.each(i => {
      if (checkboxes[i].checked) {
        oneActivitySelected = true;
      }
    });

    if (oneActivitySelected === false) {
      showValidationMessage(
        true,
        checkBoxesFieldSet,
        "You must select one activity"
      );
    } else {
      showValidationMessage(false, checkBoxesFieldSet, "");
    }
    // end
    // validate that at least one event is selected on submit

    // if payment type is cc then validate cc, zip code and cvv
    // begin
    validateCC();
    validateZipCode();
    validateCVV();
    // end
    // if payment type is cc then validate cc, zip code and cvv
  }

  // validate credit card
  if (elementID === "" || eventType === "submit") {
    //validateCC();
  }
});

function validateCVV() {
  const cvv = $("#cvv");
  const cvvValue = parseInt(cvv.val());
  console.log("cvv is: " + $.type(cvvValue));
  if (paymentMethodSelect.val() === "Credit Card") {
    if (cvv.val().length !== 3 || !$.isNumeric(cvvValue)) {
      showValidationMessage(true, cvv, "CVV needs to be 3 digit long");
      return false;
    } else {
      showValidationMessage(false, cvv, "");
      return true;
    }
  } else {
    showValidationMessage(false, cvv, "");
    return true;
  }
}

function validateZipCode() {
  const zipCode = $("#zip");
  const zipCodeValue = parseInt(zipCode.val());
  console.log("zip code is: " + $.type(zipCodeValue));
  if (paymentMethodSelect.val() === "Credit Card") {
    if (zipCode.val().length !== 5 || !$.isNumeric(zipCodeValue)) {
      showValidationMessage(
        true,
        zipCode,
        "Zip code needs to be 5 digit long."
      );
      return false;
    } else {
      showValidationMessage(false, zipCode, "");
      return true;
    }
  } else {
    showValidationMessage(false, zipCode, "");
    return true;
  }
}

function validateCC() {
  const ccNumber = $("#cc-num");
  const ccNumberValue = parseInt(ccNumber.val());
  console.log("CC is: " + $.type(ccNumber.val()));
  if (paymentMethodSelect.val() === "Credit Card") {
    if (
      ccNumber.val().length >= 13 &&
      ccNumber.val().length <= 16 &&
      $.isNumeric(ccNumberValue)
    ) {
      console.log("2");
      showValidationMessage(false, ccNumber, "");
      return true;
    } else {
      console.log("1");
      showValidationMessage(
        true,
        ccNumber,
        "Credit Card must be between 13 and 16 digits long"
      );
      return false;
    }
  } else {
    showValidationMessage(false, ccNumber, "");
    return true;
  }
}

function validateEmail() {
  const emailElement = $("#mail");

  if (emailElement.val().length === 0) {
    showValidationMessage(true, emailElement, "Email is required");
    return false;
  } else {
    const testEmail = isValidEmail(emailElement.val());
    //console.log(emailElement.val() + " is ::: " + testEmail);
    if (testEmail) {
      showValidationMessage(false, emailElement, "");
      return true;
    } else {
      showValidationMessage(true, emailElement, "Valid email required");
      return false;
    }
  }
}

function validateName() {
  const nameElement = $("#name");

  if (nameElement.val().length === 0) {
    // name field is blank
    showValidationMessage(true, nameElement, "Name field is required");
    return false;
  } else {
    // name field is valid
    showValidationMessage(false, nameElement, "");
    return true;
  }
}

// ================================================================
// ==============  helper functions ===============================
// ================================================================
// Must be a valid email address my@email.com
function isValidEmail(email) {
  const regEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  return regEx.test(email);
}

function isNumberss(v) {
  const regEx = /\d/;
  return regEx.test(v);
}

function showValidationMessage(show, element, message) {
  // set up span element to show error message
  // const spanElement = document.createElement("span");
  // spanElement.innerHTML = message;
  // spanElement.id = "errorMessage";

  if (show) {
    //spanElement.style.display = "inherit";
    //$(element).after(spanElement);
    $(element).css("background-color", "pink");
  } else {
    //spanElement.style.display = "inherit";
    //$("#errorMessage").remove();
    $(element).css("background-color", "");
  }
}
