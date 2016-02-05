$(document).ready(function() {
    $('#compare').mergely({
        cmsettings: { readOnly: false, theme: 'solarized light' },
        editor_width: '48%',
        editor_height: '80%'
    });

    var highlighter = $('#highlighter').text();
    var original_content = $('#original_content').text();
    $('#highlighter').val(null);
    $('#original_content').val(null);

    var $lhseditor = $('#compare').mergely('cm', 'lhs');
    var $rhseditor = $('#compare').mergely('cm', 'rhs');

    $lhseditor.setValue(original_content);
    $rhseditor.setValue(original_content);

    $lhseditor.setOption('readOnly', true);
    $lhseditor.setOption('mode', highlighter);
    $rhseditor.setOption('mode', highlighter);


    $('#download_button').click(function() {
        var url = '/demo2/download';
        var content = $('#last_saved_content').text();
        var filename = "newfile";

        var form = $('<form action="' + url + '" method="post">' +
            '<input type="text" name="filename" value="' + filename + '" />' +
            '<input type="text" name="content" value="' + content + '" />' +
            '</form>');
        $('body').append(form);
        form.submit();
    });

    $('#save_button').click(function() {
        var content = $rhseditor.getValue();
        $('#last_saved_content').text(content);
        alert('Contents saved successfully!');
    });

    $('#revert_last_saved_button').click(function() {
        var content = $('#last_saved_content').text();
        $rhseditor.setValue(content);
    });

    $('#revert_original_button').click(function() {
        var content = $('#original_content').text();
        $rhseditor.setValue(content);
    });
});
