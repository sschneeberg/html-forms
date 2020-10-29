/* We use javascript to write the following functions 
- `init` (initialize the document)
- `reset` (reset the webpage by clearing all elements)
- `validate` (validate if all inputs fields are collectly filled out)
- `send` (allows us to submit the document) */

function init() {
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);
}

function reset(e) {
    //html form back to initial state
    e.preventDefault();
    e.stopPropagation();
    //clear errors
    document.querySelectorAll('.form-box').forEach(function(el) {
        el.setAttribute('data-errormsg', '');
        el.classList.remove('error');
    });
    document.getElementById('form-user').reset();
    console.log('reset');

}

function validate() {
    let failures = [];
    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const select = document.getElementById('input-age');
    const check = document.getElementById('input-alive');

    //name validation
    if (!first.value) {
        failures.push({ input: first.id, msg: 'Required Field' });
    }
    //email vlaidation
    if (!email.value) {
        failures.push({ input: email.id, msg: 'Required Field' });
    } else if (!email.value.includes('@')) {
        failures.push({ input: email.id, msg: 'Invalid Email Address' });
    }
    //password validation
    if (!password.value) {
        failures.push({ input: password.id, msg: 'Required Field' });
    } else if (password.value.length < 8) {
        failures.push({ input: password.id, msg: 'Must be at least 8 characters' });
    }
    //dropdown validation
    if (select.selectedIndex === 0) {
        failures.push({ input: select.id, msg: 'Required Field' });
    }
    //checkbox validation
    if (!check.checked) {
        failures.push({ input: check.id, msg: 'Cannot submit for deceased' });
    }

    return failures;
}

function send(e) {
    e.preventDefault();
    e.stopPropagation();
    //check failures
    let failures = validate();
    if (failures.length === 0) {
        //send 
        document.getElementById('form-user').submit();
    } else {
        //clear old warnings
        document.querySelectorAll('.form-box').forEach(function(el) {
            el.setAttribute('data-errormsg', '');
            el.classList.remove('error');
        });
        //show new warnings
        failures.forEach(warning => {
            //create and display message
            const field = document.getElementById(warning.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', warning.msg);
        });
    }
}


document.addEventListener('DOMContentLoaded', init);