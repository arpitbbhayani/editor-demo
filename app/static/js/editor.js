$(document).ready(function() {
    var editor = CodeMirror.fromTextArea(document.getElementById("online_editor"), {
        lineNumbers: true,
        mode: "default",
        theme: "material"
    });

    function updatemode(mode) {
        editor.setOption("mode", mode);
    }

    $('#open_file_form').form({
        fields: {
            filepath : 'empty'
        }
    });

    $('#open_file_form_submit_button').click(function () {
        var $form = $('#open_file_form');
        var is_valid = $form.form('validate form');
        if(is_valid) {
            var $button = $(this);
            var filepath = $('#open_file_form').find('[name="filepath"]').val();

            $button.addClass('loading');
            $.get('/fetch', {path: filepath}, function(result) {
                $('#open_file_form_filepath').text(filepath);
                editor.setValue(result.content);
            }).fail(function(response) {
                alert(response.responseText.responseText);
            }).always(function(){
                $button.removeClass('loading');
            });
        }
    });

    $('#open_file_form_update_mode_dropdown').change(function() {
        updatemode($(this).val());
    });

    $('#open_file_form_save_button').click(function () {
        var $button = $(this);
        var filepath = $('#open_file_form_filepath').text();

        if(confirm("This will override the file. Do you really want to continue?")) {
            var content = editor.getValue();
            $button.addClass('loading');
            $.get('/save', {path: filepath, content: content}, function(result) {
                alert(result.content);
            }).fail(function(response) {
                alert(response.responseText.responseText);
            }).always(function() {
                $button.removeClass('loading');
            });
        }
    });

    $('.ui.dropdown').dropdown();

});
