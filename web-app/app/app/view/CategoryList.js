Ext.define('Bookmarks.view.CategoryList', {

    extend : 'Ext.panel.Panel',

    requires : [
        'Bookmarks.view.CategoryTree'
    ],

    xtype: 'category-list',
    
    split : true,
    
    collapsible : true,
    
    width: 250,
    
    title: 'Category',
    
    tbar : [{
        iconCls : 'icon-new',
        tooltip : 'Add a new category',
        action  : 'add-category'
    }, {
        iconCls : 'icon-edit',
        tooltip : 'Edit the selected category',
        action : 'edit-category'
    }, {
        iconCls : 'icon-remove',
        tooltip : 'Remove the selected category',
        action : 'remove-category'
    }],
    
    items: [{
        xtype: 'category-tree'
    }]

});
