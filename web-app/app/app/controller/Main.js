Ext.define('Bookmarks.controller.Main', {

	extend : 'Ext.app.Controller',

	refs : [{
		ref : 'grid',
		selector : 'bookmarks-grid'
	}, {
		ref : 'categoryList',
		selector : 'category-list'
	}, {
		ref : 'categoryTree',
		selector : 'category-tree'
	}],

	stores : ['CategoryTree', 'Category', 'Bookmark'],

	storeLoaded : false,

	init : function() {

		var me = this;

		me.control({
			'button[action=add-category]' : {
				click : me.add
			},
			'button[action=edit-category]' : {
				click : me.edit
			},
			'button[action=remove-category]' : {
				click : me.remove
			},
			'category-tree' : {
				selectionchange : me.updateBookmarks
			},
			'bookmarks-grid tool[type=plus]' : {
				click : me.addBookmark
			},
			'bookmarks-grid tool[type=minus]' : {
				click : me.removeBookmark
			},
			'bookmarks-grid' : {
				edit: function(editor, e) {
					e.record.store.sync();
				},
				canceledit : function(editor, e) {
					e.record.store.rejectChanges();
				}
			}
			
		});

	},

	addBookmark : function() {
		var me = this,
			category = me.getSelectedCategory(),
			grid = me.getGrid(),
			bookmarkStore = me.getBookmarkStore(),
			bookmark;
		
		if(category) {
			bookmark = Ext.create('Bookmarks.model.Bookmark',{
				'category.id': category.get('id'),
				url: 'http://www.todo.com',
				title: 'The title',
				description: 'Description...'
			});
			bookmarkStore.add(bookmark);
			grid.selectAndEdit(bookmark);
		} else {
			Ext.Msg.alert('Warning','Category must be selected');
		}
		
	},
	
	removeBookmark : function() {
		var me = this,
			record = me.getSelectedBookmark(),
			store = me.getBookmarkStore();
		
		if(record) {
			Ext.Msg.confirm('Warning', 'Are you sure?', function(btn){
				if(btn === 'yes') {
					store.remove(record);
					store.sync({
						success: function() {
							Ext.Msg.alert('Success', 'Bookmark removed with success.');
						},
						failure : function() {
							store.rejectChanges();
							Ext.Msg.alert('Error', 'Cannot remove this bookmark.');
						}
					});		
				}
			});
			
		} else {
			Ext.Msg.alert('Warning', 'Bookmark must be selected.');
		}
	},

	getSelectedBookmark : function() {
		var me = this,
			selected = me.getGrid().getSelectionModel().selected;
		return selected.length > 0 ? selected.getAt(0) : null; 		
	},

	updateBookmarks : function(model, selection, item, index) {
		var me = this,
			record = selection[0];

		if (record.get('leaf') === true) {

			var store = me.getBookmarkStore();

			store.proxy.extraParams = {
				'filter.category.id' : record.get('id')
			};

			store.load();

			store.proxy.extraParams = {};
		} else {
			Ext.Msg.alert('Info', 'Please, select low level category.');
		}
	},

	add : function() {

		var me = this;
		me.openForm();

	},

	loadStore : function(callback) {
		var me = this;
		if (me.storeLoaded === false) {
			me.getCategoryStore().load({
				callback : callback
			});
			me.storeLoaded = true;
		} else {
			if ( typeof callback == 'function')
				callback.apply(me);
		}
	},

	openForm : function(record) {
		var me = this;
		var mode = record ? 'U' : 'I';
		me.loadStore();
		me.application.runAction('CategoryForm', 'Index', mode, record);
	},

	getSelectedCategory : function() {

		var me = this;

		var tree = me.getCategoryTree();

		var selection = tree.getSelectionModel().selected;

		if (selection && selection.length > 0) {
			return selection.getAt(0);
		}

		return null;

	},

	edit : function() {
		var me = this, record = me.getSelectedCategory(), store = me.getCategoryStore(), catRecord;
		if (record) {
			me.loadStore(function() {
				catRecord = store.getById(record.get('id'));
				me.openForm(catRecord);
			});
		} else {
			Ext.Msg.alert('Warning', 'Select the category first.');
		}

	},

	remove : function() {
		var me = this;
		var record = me.getSelectedCategory();

		if (record) {

			if (record.get('leaf') === false) {
				Ext.Msg.alert('Warning', 'You need to delete the child categories first.');
			} else {

				Ext.Msg.confirm('Warning', 'Are you sure?', function(btn) {
					if (btn === 'yes') {

						me.loadStore(function() {

							var store = me.getCategoryStore();

							store.remove(store.getById(record.get('id')));

							store.sync({
								success : function() {
									me.getCategoryTreeStore().load();
									Ext.Msg.alert('Success', 'Record changed with success!');
								},
								failure : function() {
									store.add(record);
									Ext.Msg.alert('Warning', 'An error has ocurred, try again.');
								}
							});

						});

					}
				});
			}

		} else {
			Ext.Msg.alert('Warning', 'Select the category first.');
		}

	}
});
