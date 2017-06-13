$(function () {
    var $login_form = $('#login_form');
    var $signup_form = $('#signup_form');

    $login_form.form({
        fields: {
            email: {
                identifier: 'email',
                rules: [{
                        type: 'empty',
                        prompt: 'Please enter your e-mail'
                    },
                    {
                        type: 'email',
                        prompt: 'Please enter a valid e-mail'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your password'
                }]
            }
        },
        onSuccess: function (e) {
            e.preventDefault();
            var fields = $login_form.form('get values');
            console.log(fields);
            window.location="/student_home.html"
        }
    });
    $signup_form.form({
        fields: {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your name'
                }]
            },
            email: {
                identifier: 'email',
                rules: [{
                        type: 'empty',
                        prompt: 'Please enter your e-mail'
                    },
                    {
                        type: 'email',
                        prompt: 'Please enter a valid e-mail'
                    }
                ]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: 'Please enter your password'
                }]
            }
        },
        onInvalid: function () {
            if ($('.user_error').text() !== '') {
                $('.user_error').css("display", "none");
            }
        },
        onSuccess: function (e) {
            e.preventDefault();
            var fields = $signup_form.form('get values');
            //console.log(fields);
            $("#signup_loader").css("display", "inline");
            $("#signup_btn").addClass("disabled");
            $('form .message').html("");
            $('.user_error').css("display", "none");
            var data = JSON.stringify(fields);
            $.ajax({
                method: "POST",
                url: rootURL + "/signup",
                data: data,
                contentType: "application/json"
            }).done(function (res) {
                $signup_form.append("<div class='ui success message'><div class='header'>" + res + "</div><br />You can now <div class='ui tiny teal button login_trigger'>Log In</div> with your email!</div>");
                $('.login_trigger').click(function () {
                    triggerModal(".login_modal");
                });
            }).fail(function (xhr) {
                //console.log(xhr);
                $("#signup_btn").removeClass("disabled");
                $signup_form.append("<div class='ui error message user_error' style='display:block;'><div class='header'>There were some errors!</div><p>" + xhr.responseText + "</p></div>");

            }).always(function () {
                $("#signup_loader").css("display", "none");
            });
        }
    });
});