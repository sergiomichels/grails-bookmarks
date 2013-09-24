Ext.define('Bookmarks.view.CategoryForm', {

    extend : 'Ext.window.Window',

    title : 'Category',

    xtype : 'category-window',

    itemId : 'categoryWindow',

    width : 600,

    height : 250,

    modal : true,

    layout : 'fit',

    items : [{
        xtype : 'form',
        layout : 'form',
        itemId: 'category-form',
        bodyPadding : 10,

        items : [{
            fieldLabel : 'Name',
            name : 'name',
            xtype : 'textfield',
            maxLength : 30,
            allowBlank : false
        }, {
            fieldLabel : 'Description',
            name : 'description',
            allowBlank : false,
            maxLength : 100,
            xtype : 'textfield'
        }, {

            fieldLabel : 'Category',

            name : 'parent.id',

            xtype : 'combobox',

            store : 'Category',

            displayField : 'name',

            valueField : 'id',

            allowBlank : false,

            queryMode : 'local'

        }],

        buttons : [{
            text : 'Save',
            iconCls : 'icon-save',
            action : 'save-category'
        }, {
            text : 'Cancel',
            iconCls : 'icon-cancel',
            action : 'cancel-category'
        }]
    }]
});
