$(document).ready(function() {
    $('.ui.dropdown').dropdown();
    $('#compare').parent().hide();

    var old_content = '';

    var editor = CodeMirror.fromTextArea(document.getElementById("online_editor"), {
        lineNumbers: true,
        mode: "default",
        theme: "material"
    });

    function updatemode(mode) {
        editor.setOption("mode", mode);
    }

    $('#compare').mergely({
        cmsettings: { readOnly: true },
        editor_width: '45%',
        editor_height: '100%'
    });

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
                old_content = result.content;
                editor.setValue(result.content);
            }).fail(function(response) {
                alert(response.responseText);
            }).always(function(){
                $('#online_editor').parent().show();
                $('#compare').parent().hide();
                $button.removeClass('loading');
            });
        }
    });

    $('#open_file_form_update_mode_dropdown').change(function() {
        updatemode($(this).val());
    });

    $('#open_file_form_diff_button').click(function() {
        if(!old_content) {
            alert('No file selected');
            return;
        }

        $('#online_editor').parent().toggle();
        $('#compare').parent().toggle();

        $('#compare').mergely('lhs', old_content);
        $('#compare').mergely('rhs', editor.getValue());
    });

    $('#open_file_form_save_button').click(function () {
        if(confirm('Do you really want to save the file?')) {
            var $button = $('#open_file_form_save_button');
            var filepath = $('#open_file_form_filepath').text();
            var content = editor.getValue();

            $button.addClass('loading');
            $.get('/save', {path: filepath, content: content}, function(result) {
                alert(result.content);
            }).fail(function(response) {
                alert(response.responseText);
            }).always(function() {
                $button.removeClass('loading');
            });
        }
    });

});
