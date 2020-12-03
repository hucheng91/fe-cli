<!-- 自定义Table -->
<template>
  <div :style="{height: height, width: width}" />
</template>

<style lang="sass" scoped>

</style>


<script>
import ace from 'brace';

import 'brace/theme/chrome'
import 'brace/mode/sql'
import "brace/ext/language_tools";

export default {
    props: {
        content: {
            type: String,
            required: true
        },
        lang: {
            type: String,
            default: 'javascript'
        },
        theme: {
            type: String,
            default: 'chrome'
        },
        height: {
            type: String,
            default: '300px'
        },
        width: {
            type: String,
            default: '100%'
        },
        sync: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default() {
                return {
                };
            }
        },

    },
    data() {
        return {
            editor: null,
        };
    },
    watch: {
        theme: function(newTheme) {
            this.editor.setTheme('ace/theme/' + newTheme);
        }
    },
    mounted() {
        let editor = this.editor = ace.edit(this.$el);
        editor.$blockScrolling = Infinity;
        editor.getSession().setMode('ace/mode/' + this.lang);
        editor.setTheme('ace/theme/' + this.theme);
        editor.setValue(this.content, 1);
        editor.setFontSize(14);


        editor.setOptions(this.options);

        editor.on('change', () => {
            try {
                this.$emit('update:content', editor.getValue());
            } catch (e) {
            }
        });

        // window.onresize = () => {

        // };

        // editor.completers.splice(0, editor.completers.length);
        // editor.completers.push({
        //     getCompletions: function(editor, session, pos, prefix, callback) {
        //         callback(null, [
        //             {
        //                 name: "test",
        //                 value: "test",
        //                 caption: "test",
        //                 meta: "自定义",
        //                 type: "local",
        //                 score: 1000 // 让test排在最上面
        //             }
        //         ]);
        //     }
        // });
        // console.log(editor.completers);
    },
    methods: {
        getSelection() {
            return this.editor.session.getTextRange(this.editor.getSelectionRange());
        },
        getValue() {
            return this.editor.getValue();
        },
        setValue(newContent) {
            this.editor.setValue(newContent, 1);
        },
        resize() {
            this.editor.resize();
        }
    }
}
</script>




