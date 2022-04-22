$(document).ready(function () {
    $("form").submit(function (event) {
        // console.log($("#services").val())
        var formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val(),
        };
        console.log(formData)

        $.ajax({
            type: "POST",
            url: "../sendemail.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            if (data['message'] == 'message-sent') {
                $('#success').removeClass('d-none');
                $('#success').addClass('d-block show')
                $('#reset').click()
            } else {
                $('#error').removeClass('d-none');
                $('#error').addClass('d-block show')
                $('.issue').text(data['message'])
                $('#reset').click()

            }
        });

        event.preventDefault();
    });
});