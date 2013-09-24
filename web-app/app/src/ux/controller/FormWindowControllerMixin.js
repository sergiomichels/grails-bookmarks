Ext.define('InsoftExtUi.ux.controller.FormWindowMixin', {

    formMode : null,

    parentController : null,

    setParentController : function(controller) {
        this.parentController = controller;
    },

    saveAndIncludeMoreMode : false,

    openWindow : function(window, mode) {

        var me = this;

        window.on({
            destroy : me.closeWindow
        });

        me.formMode = mode;

        window.show();

    },

    closeForm : function() {
        var me = this;
        me.getWindowRef().close();
    },

    setValues : function(clazz) {

        var me = this;

        var form = me.getFormRef();

        form.loadRecord(Ext.create(clazz));

        for (var x = 1; x < arguments.length; x++) {
            var component = form.down(arguments[x][0]);
            if (component) {
                component.setValue(arguments[x][1]);
            }
        }

    },

    getErrorsHtml : function(errors) {
        var html = '<ul class="errors">';

        for (var x in errors) {
            html += '<li>' + errors[x] + '</li>'
        }

        html += '</ul>';

        return html;

    },

    //---------------- /Actions Default -----------------------------------------------------

    closeWindow : function(window) {

    },

    createWindow : function() {
        var me = this;
        return me.getView(me.views[0]).create();
    }
}); 