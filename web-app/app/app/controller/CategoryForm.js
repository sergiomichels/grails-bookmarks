Ext.define('Bookmarks.controller.CategoryForm', {

    extend : 'Ext.app.Controller',

    refs : [{
        selector : '#category-form',
        ref : 'formRef'
    }, {
        selector : 'category-window',
        ref : 'windowRef'
    }],
    
    mixins : [
        'Bookmarks.mixins.FormWindowControllerMixin'
    ],
    
    views: ['CategoryForm'],

    stores : ['Category','CategoryTree'],

    init : function() {
        var me = this;
        me.inited = true;
        me.control({
            'button[action=save-category]' : {
                click : me.save
            },
            'button[action=cancel-category]' : {
                click : me.cancel
            }
        });
    },

    actionIndex : function(mode, record) {
        
        var me = this;

        record = record || Ext.create('Bookmarks.model.Category');
    
        var window = me.createWindow();

        mode = mode || 'I';

        me.getFormRef().loadRecord(record);

        me.openWindow(window, mode, false, null);
        
    },

    cancel : function() {
        this.closeForm();        
    },

    save : function() {

        var me = this;

        var form = me.getFormRef().getForm();

        var errors = null, model = form.getRecord(), store = model && model.store;

        store = store || me.getCategoryStore();

        model.set(form.getValues());

        errors = model.validate();

		debugger;

        if (!errors.isValid()) {

            form.markInvalid(errors);
            model.reject();
            return;

        } else {

            if (form.isValid()) {
                
                if (!model.store) {
                    store.add(model);
                }

                store.sync({
                    success : function(batch, options) {
                        me.closeForm();
                        me.reloadCategoryList();
                        store.resumeAutoSync();
                        Ext.Msg.alert('Success', 'Operation made with success.');
                    },
                    failure : function() {
                        store.resumeAutoSync();
                    }
                    
                });
                
                
            }
        }
    },
    
    reloadCategoryList : function() {
        var me = this;
        me.getCategoryTreeStore().load();
    }
    
});
