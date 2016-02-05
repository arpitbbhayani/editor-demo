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
});
