document.getElementById("name").focus();
//Only make the other field display as none if the javascript IS enabled
document.getElementById('other-title').style.display = "none";

///////////////////////////
//// V A R I A B L E S ////
///////////////////////////
let totalCost = 0;
let numberOfSelectedEvents = 0;

let inputList = document.querySelectorAll(".checkBoxes");
let creditCard = document.getElementById('credit-card');
let paypal = document.getElementById('paypal');
let bitcoin = document.getElementById('bitcoin');

///////////////////////////
//////// L O G I C ////////
///////////////////////////

if (document.getElementById('design').value === "Select Theme") {
    document.getElementById('shirt-colors').style.display = "none";
}

document.getElementById('nameError').style.display = "none";
document.getElementById('emailError').style.display = "none";
document.getElementById('emailFormatError').style.display = "none";
document.getElementById('shirtError').style.display = "none";
document.getElementById('eventsError').style.display = "none";
document.getElementById('ccError').style.display = "none";
document.getElementById('zipCodeError').style.display = "none";
document.getElementById('cvvError').style.display = "none";


paypal.style.display = "none";
bitcoin.style.display = "none";

///////////////////////////
//// F U N C T I O N S ////
///////////////////////////

function onEmailChange(e) {
    //EMAIL VALIDATION
    if (document.forms["mainForm"]["user-email"].value === "") {
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('emailError').style.display = "block";
        document.getElementById('emailFormatError').style.display = "none";
    } else if (!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(document.forms["mainForm"]["user-email"].value))) {
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('emailError').style.display = "none";
        document.getElementById('emailFormatError').style.display = "block";
    } else {
        document.getElementById('email').style.borderColor = "rgb(111, 157, 220)";
        document.getElementById('emailError').style.display = "none";
        document.getElementById('emailFormatError').style.display = "none";
    }
}

function onSelectJobRole(e) {
    if (e.target.value === "other") {
        document.getElementById('other-title').style.display = "block";
    } else {
        document.getElementById('other-title').style.display = "none";
    }
}

function onChangeTheme(e) {
    if (e.target.value !== "Select Theme") {
        document.getElementById('shirt-colors').style.display = "block";
        if (e.target.value === "js puns") {
            document.getElementById('color').innerHTML = `
                <option style="display:block;" value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
                <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
                <option value="gold">Gold (JS Puns shirt only)</option>
            `
        } else if (e.target.value === "heart js") {
            document.getElementById('color').innerHTML = `
                <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
                <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
                <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
            `
        }
    } else {
        document.getElementById('shirt-colors').style.display = "none";
    }
}

function onSelectEvent(e) {
    if (e.target.checked) {
        numberOfSelectedEvents++;

        totalCost = totalCost + parseInt(e.srcElement.dataset.cost);
        document.getElementById('totalCost').innerHTML = `Total cost: \$${totalCost}`;

        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].dataset.dayAndTime === e.target.dataset.dayAndTime && inputList[i].name !== e.target.name) {
                inputList[i].disabled = true;
            }
        }
    } else {
        numberOfSelectedEvents--;

        totalCost = totalCost - parseInt(e.srcElement.dataset.cost);
        document.getElementById('totalCost').innerHTML = `Total cost: \$${totalCost}`;
        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].dataset.dayAndTime === e.target.dataset.dayAndTime && inputList[i].name !== e.target.name) {
                inputList[i].disabled = false;
            }
        }
    }
}

function onSelectPaymentMethod(e) {
    if (e.target.value === "credit card") {
        creditCard.style.display = "block";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    } else if (e.target.value === "paypal") {
        creditCard.style.display = "none";
        paypal.style.display = "block";
        bitcoin.style.display = "none";
    } else if (e.target.value === "bitcoin") {
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "block";
    } else {
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
}

function formValidation(e) {
    e.preventDefault();

    //NAME VALIDATION
    if (document.forms["mainForm"]["user-name"].value === "") {
        document.getElementById('name').style.borderColor = "red";
        document.getElementById('nameError').style.display = "block";
    } else {
        document.getElementById('name').style.borderColor = "rgb(111, 157, 220)";
        document.getElementById('nameError').style.display = "none";
    }

    //EMAIL VALIDATION
    if (document.forms["mainForm"]["user-email"].value === "") {
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('emailError').style.display = "block";
    } else if (!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(document.forms["mainForm"]["user-email"].value))) {
        document.getElementById('email').style.borderColor = "red";
        document.getElementById('emailFormatError').style.display = "block";
    } else {
        document.getElementById('email').style.borderColor = "rgb(111, 157, 220)";
        document.getElementById('emailError').style.display = "none";
        document.getElementById('emailFormatError').style.display = "none";
    }

    //DESIGN VALIDATION
    if (document.forms["mainForm"]["user-design"].value === "Select Theme") {
        document.getElementById('shirtError').style.display = "block";
    } else {
        document.getElementById('shirtError').style.display = "none";
    }

    //SELECTION VALIDATION
    if (numberOfSelectedEvents === 0) {
        document.getElementById('eventsError').style.display = "block";
    } else {
        document.getElementById('eventsError').style.display = "none";
    }

    //IF CREDIT CARD
    if (document.forms["mainForm"]["user-payment"].value === "credit card") {
        //CREDIT CARD VALIDATION
        if (document.forms["mainForm"]["user-cc-num"].value === "" ||
            !(/\b\d{13,16}\b/.test(document.forms["mainForm"]["user-cc-num"].value))) {
            document.getElementById('ccError').style.display = "block";
            document.getElementById('cc-num').style.borderColor = "red";
        } else {
            document.getElementById('ccError').style.display = "none";
            document.getElementById('cc-num').style.borderColor = "rgb(111, 157, 220)";
        }

        //ZIP CODE VALIDATION
        if (document.forms["mainForm"]["user-zip"].value === "" ||
            !(/^(\d{5})$/.test(document.forms["mainForm"]["user-zip"].value))) {
            document.getElementById('zipCodeError').style.display = "block";
            document.getElementById('zip').style.borderColor = "red";
        } else {
            document.getElementById('zipCodeError').style.display = "none";
            document.getElementById('zip').style.borderColor = "rgb(111, 157, 220)";
        }

        //CVV VALIDATION
        if (document.forms["mainForm"]["user-cvv"].value === "" ||
            !(/^(\d{3})$/.test(document.forms["mainForm"]["user-cvv"].value))) {
            document.getElementById('cvvError').style.display = "block";
            document.getElementById('cvv').style.borderColor = "red";
        } else {
            document.getElementById('cvvError').style.display = "none";
            document.getElementById('cvv').style.borderColor = "rgb(111, 157, 220)";
        }
    } else {
        document.getElementById('ccError').style.display = "none";
        document.getElementById('zipCodeError').style.display = "none";
        document.getElementById('cvvError').style.display = "none";
    }

    if (document.forms["mainForm"]["user-payment"].value === "credit card" &&
        !(document.forms["mainForm"]["user-name"].value === "") &&
        !(document.forms["mainForm"]["user-email"].value === "" ||
            !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.forms["mainForm"]["user-email"].value))) &&
        !(document.forms["mainForm"]["user-design"].value === "Select Theme") &&
        !(numberOfSelectedEvents === 0) &&
        !(document.forms["mainForm"]["user-cc-num"].value === "" ||
            !(/\b\d{13,16}\b/.test(document.forms["mainForm"]["user-cc-num"].value))) &&
        !(document.forms["mainForm"]["user-zip"].value === "" ||
            !(/^(\d{5})$/.test(document.forms["mainForm"]["user-zip"].value))) &&
        !(document.forms["mainForm"]["user-cvv"].value === "" ||
            !(/^(\d{3})$/.test(document.forms["mainForm"]["user-cvv"].value)))) {
        console.log("Registration Successful");
        return true;
    } else if (!document.forms["mainForm"]["user-payment"].value === "credit card" &&
        !(document.forms["mainForm"]["user-name"].value === "") &&
        !(document.forms["mainForm"]["user-email"].value === "" ||
            !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.forms["mainForm"]["user-email"].value))) &&
        !(document.forms["mainForm"]["user-design"].value === "Select Theme") &&
        !(numberOfSelectedEvents === 0)) {
        console.log("Registration Successful");
        return true;
    }
}