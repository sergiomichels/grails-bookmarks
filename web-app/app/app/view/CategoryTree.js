Ext.define('Bookmarks.view.CategoryTree',{
    
    extend: 'Ext.tree.Panel',
    
    xtype: 'category-tree',
    
    store: 'CategoryTree',
    
    rootVisible: false,
    
    displayField: 'name'
});