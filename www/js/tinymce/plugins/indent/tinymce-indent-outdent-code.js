<?php

// This allows you to indent lists/paragraphs in the TinyMCE WYSIWYG editor
// using Tab, and outdent using Shift+Tab. I wrote it because I write a lot of
// nested lists, it's tedious using the keyboard to indent and outdent, and I
// couldn't find any existing shortcuts. The downside is you can no longer tab
// to other form elements.

// It also sets Ctrl+9 to toggle between a <p> and <pre> block, making it
// possible to create code blocks with only the keyboard. (I also recommend the
// WYSIWYG Inline Code Command plugin [1], which makes Ctrl+Alt+C add inline
// <code> tags.)

// [1]: http://wordpress.org/extend/plugins/wysiwyg-inline-code-command/

// Source: http://wpquestions.com/question/showChrono/id/3993

    add_filter('tiny_mce_before_init', function($mceInit, $editor_id)
    {
        // Remove the 'tabfocus' plugin, which handles the Tab press by default
        $plugins = explode(',', $mceInit['plugins']);
        if (($key = array_search('tabfocus', $plugins)) !== false)
            unset($plugins[$key]);
        $mceInit['plugins'] = implode(',', $plugins);

        // Add an init hook to set up the new Tab handler
        $mceInit['oninit'] = 'wpq_tinymce_add_shortcuts';

        return $mceInit;

    }, 10, 2);

add_action('admin_footer', function()
{
    ?>
    <script>
function wpq_tinymce_add_shortcuts()
{
    // Change Ctrl+9 to <pre> instead of <address>
    window.tinymce.activeEditor.addShortcut(
        'ctrl+9',
        '',
        ['FormatBlock', false, 'pre']
    );

    // Change Shift+Alt+H to <hr>
    window.tinymce.activeEditor.addShortcut(
        'shift+alt+h',
        '',
        ['mceInsertContent', false, '<hr />']
    );

    // Change Ctrl+Tab / Ctrl+Shift+Tab to indent/outdent
    window.tinymce.activeEditor.onKeyDown.add(function(ed, e) {
        // If the key is Tab (without Alt or Ctrl)...
        if (e.keyCode == 9 && !e.altKey && !e.ctrlKey) {
            // Indent (Tab) or Outdent (Shift+Tab)
            if (e.shiftKey)
                ed.execCommand('Outdent');
            else
                ed.execCommand('Indent');

            // And prevent the default event handler running
            return tinymce.dom.Event.cancel(e);
        }
    });
}
</script>
<?php
});