Ext.define('Bookmarks.view.Viewport', {
    
    extend: 'Ext.container.Viewport',
    
    requires : [
        'Bookmarks.view.CategoryList',
        'Bookmarks.view.BookmarksGrid'
    ],
    
    layout: {
        type: 'border'
    },

    items: [
        {
            region: 'north',
            xtype: 'container',
            html: '<h1 class="application-title">Bookmarks App</h1>',
            cls: 'base'
        },
        {
            region: 'south',
            xtype: 'container',
            height: 20,
            html: '<strong> Version 0.1 </strong>',
            cls: 'base'
        },
        {
            region: 'west',
            xtype: 'category-list'         
        },
        {
            region: 'center',
            xtype: 'bookmarks-grid'
        }
    ]
});
