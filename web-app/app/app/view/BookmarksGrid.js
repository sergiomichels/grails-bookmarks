Ext.define('Bookmarks.view.BookmarksGrid', {

    extend : 'Ext.grid.Panel',

    xtype : 'bookmarks-grid',

    store : 'Bookmark',

    title : 'Bookmarks',

    plugins : [{
        ptype : 'rowediting', //Ext.grid.plugin.RowEditing
        pluginId : 'editorLine'
    }],

    columns : [{
        text : 'Link',
        dataIndex : 'url',
        flex : 1,
        editor : {
            xtype : 'textfield',
            allowBlank : false,
            vtype: 'url'
        }
    },{
        text : 'Title',
        dataIndex : 'title',
        flex : 1,
        editor : {
            xtype : 'textfield',
            allowBlank : false
        }
    }, {
        text : 'Description',
        dataIndex : 'description',
        flex : 1,
        editor : {
            xtype : 'textfield',
            allowBlank : false
        }
    }, {
        text : 'Category',
        hidden : true,
        hideable : false,
        dataIndex : 'category.id'
    }],

    selectAndEdit : function(record) {
        var me = this;
        me.getSelectionModel().select(record);
        me.getPlugin('editorLine').startEdit(record, 0);
    },

    startEdit : function(record) {
        this.getPlugin('editorLine').startEdit(record, 0);
    },

    tools : [{
        type : 'plus'
    }, {
        type : 'minus'
    }]

});