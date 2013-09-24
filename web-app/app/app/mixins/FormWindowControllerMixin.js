Ext.define('Bookmarks.mixins.FormWindowControllerMixin', {

    formMode : null,

    parentController : null,

    setParentController : function(controller) {
        this.parentController = controller;
    },

    saveAndIncludeMoreMode : false,

    openWindow : function(window, mode, bind, excludes) {

        var me = this;

        window.on({
            destroy : me.closeWindow
        });

        var funcExists = typeof me.getHintToolbar == 'function';

        me.formMode = mode;

        if (funcExists) {
            me.getHintToolbar().on({
                afterrender : me.setStatus,
                scope : me
            });
        }

        bind = bind == undefined ? true : bind;

        if (bind) {
            me.bindDefaultActions(excludes);
        }

        window.show();

    },

    defaultActionCancel : function() {

        var me = this;

        if (me.saveAndIncludeMoreMode) {
            me.refreshParent();
        }

        me.closeForm();
    },

    closeForm : function() {
        var me = this;
        me.getWindowRef().close();
    },

    defaultActionSave : function() {
        this._actionSave(true);
    },

    _actionSave : function(close) {

        var me = this;

        var form = me.getFormRef().getForm();

        if (form.isValid()) {

            var record = form.getRecord();

            var values = form.getValues();

            record.set(values);

            if ( typeof me.setExtraValues === 'function') {
                me.setExtraValues(form, record);
            }

            record.save({

                success : function(record, operation) {

                    Ext.Msg.alert('Success', 'Data saved with success!');

                    if (close) {
                        me.closeForm();
                    } else {
                        form.reset();
                    }

                }
            });

        } else {

            Ext.Msg.alert('Error', 'Please, check the fields with a red flag.');

        }
    },

    getErrorsHtml : function(errors) {
        var html = '<ul class="errors">';

        for (var x in errors) {
            html += '<li>' + errors[x] + '</li>';
        }

        html += '</ul>';

        return html;

    },

    closeWindow : function(window) {

    },

    createWindow : function() {
        var me = this;
        return me.getView(me.views[0]).create();
    },

    updateComboStoreFromQuery : function(query, domainName, defaultValue, displayField, valueField) {
        var me = this;
        me.updateComboStore(Ext.ComponentQuery.query(query)[0], domainName, defaultValue, displayField, valueField);
    },

    updateComboStore : function(element, domainName, defaultValue, displayField, valueField) {

        element.clearValue();

        element.bindStore(Ext.create('Ext.data.Store', {
            data : InsoftExtUi.ux.Lang.DOMAINS[domainName],
            fields : ['abrev', 'value', 'meaning']
        }));

        element.displayField = displayField || 'meaning';

        element.valueField = valueField || 'value';

        element.displayTpl = new Ext.XTemplate('<tpl for=".">' + '{[typeof values === "string" ? values : values["' + element.displayField + '"]]}' + '<tpl if="xindex < xcount">' + element.delimiter + '</tpl>' + '</tpl>');

        element.picker = null;

        if (defaultValue) {
            element.setValue(defaultValue);
        }

    }
}); 