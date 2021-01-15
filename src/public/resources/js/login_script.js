let showLogin = true;

class Modal {

    showModel(title, message, type = 'error') {
        $('#modal').modal('show');
        if (type === 'error') {
            $('#model-body').attr('class', 'text-danger p-4');
            $('#modalMessage').html(title);
            $('#model-body').html(message);
        } else {
            $('#model-body').attr('class', 'text-success p-4');
            $('#model-body').html(message);
            $('#modalMessage').html(title);

        }
        setTimeout(() => this.hideModel(), 2000);
    }

    hideModel() {
        $('#modal').modal('hide');
        $('#modalMessage').html("");
        $('#model-body').html('');
    }
}

class Toast {
    static SELECTOR = 'label.message'


    showToast(message, pos) {
        const e = $(Toast.SELECTOR + ':nth-child' + '(' + pos + ')')
        e.show();
        e.html(message);
        // setTimeout(() => {
        //     this.hideToast(pos);
        // }, 2000)
    }

    hideToast(pos) {
        const e = $(Toast.SELECTOR + ':nth-child' + '(' + pos + ')')

        e.hide();
        e.html('');
    }
}

class Validator {
    static LAST_NAME = 'last_name';
    static FIRST_NAME = 'first_name';
    static EMAIL = 'email';
    static PASSWORD1 = 'password1';
    static PASSWORD2 = 'password2';
    static PASSWORD_MIN_LENGTH = 8;
    static ADDRESS = 'address';
    static PHONE = 'phone_number';
    static PHONE_MIN_LENGTH = 9;

    static validate(type, ...input) {

        if (input.length === 0) return true;

        if (type === Validator.FIRST_NAME || type === Validator.LAST_NAME || Validator.ADDRESS === type) {
            return input[0].val().length > 0
        } else if (type === Validator.EMAIL) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(input[0].val());
        } else if (type === Validator.PASSWORD1) {
            return input[0].val().length >= Validator.PASSWORD_MIN_LENGTH;
        } else if (type === Validator.PASSWORD2) {
            return input[0].val() === input[1].val();
        } else if (Validator.PHONE === type) {
            return input[0].val().length >= Validator.PHONE_MIN_LENGTH;
        }
    }
}

const modal = new Modal();

$(document).ready(function() {
    $('#sign-up').hide();


    $('#register-btn').click(registerClickHandler);
    $('form').submit(submitHandler);

    $('#inputEmailAddress').blur(function(e) {
        const val = Validator.validate(Validator.EMAIL, $('#inputEmailAddress'));
        if (!val) {
            modal.showModel('Your input is not valid', 'Email is not a valid form');
        }

    })
    $('#inputPassword').blur(function(e) {
        const val = Validator.validate(Validator.PASSWORD1, $('#inputPassword'))
        if (!val) {
            modal.showModel('Your input is not valid', 'Password is must be greater than ' + Validator.PASSWORD_MIN_LENGTH);
        }

    })
    $('#retype_password').blur(function(e) {
        const val = Validator.validate(Validator.PASSWORD2, $('#inputPassword'), $('#retype_password'))
        if (!val) {
            modal.showModel('Your input is not valid', 'Passwords dont match');
        }
    })
    $('#first_name').blur(function(e) {
        const val = Validator.validate(Validator.FIRST_NAME, $('#first_name'));
        if (!val) {
            modal.showModel('Your input is not valid', 'First name is required ');
        }
    })
    $('#last_name').blur(function(e) {
        const val = Validator.validate(Validator.LAST_NAME, $('#last_name'));
        if (!val) {
            modal.showModel('Your input is not valid', 'Last name is required');
        }
    })
    $('#address').blur(function(e) {
        const val = Validator.validate(Validator.ADDRESS, $('#address'));
        if (!val) {
            modal.showModel('Your input is not valid', 'Address is required');
        }
    })
    $('#phone_number').blur(function(e) {
        const val = Validator.validate(Validator.PHONE, $('#phone_number'));
        if (!val) {
            modal.showModel('Your input is not valid', 'Phone number must be greater than ' + Validator.PHONE_MIN_LENGTH);
        }
    })

});

function submitHandler(e) {
    if (!showLogin) {
        e.preventDefault();
        $('#sign-up').hide();
        showLogin = true;
    }
}


function registerClickHandler(e) {

    if (showLogin) {

        $('#sign-up').show();
        showLogin = false;

        window.scrollTo(0, screen.height / 2);
    } else {
        $.ajax({
            type: 'POST',
            url: '/api/users/signup',
            data: $('form').serialize(),
            success: function(res) {
                if (res) {
                    console.log(res);
                    modal.showModel('Sign Up success', res.message, '');
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                window.xhr = xhr;
                modal.showModel('An error occurs', xhr.responseJSON.message, );
            }
        })

    }

}