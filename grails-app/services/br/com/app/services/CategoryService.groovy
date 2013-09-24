package br.com.app.services

import br.com.app.domains.Category

class CategoryService {

	void generateDefaultCategories() {

		def defaultCategories = [
			[
				name: 'Development',
				description: 'Bookmarks about software development',
				children: [
					[name: 'JavaScript', description: 'All bookmarks about JavaScript'],
					[
						name: 'Java',
						description: 'All bookmarks about Java',
						children: [
							[name: 'Swing', description: 'Java Desktop development'],
							[name: 'Spring', description: 'Spring framework'],
							[name: 'Grails', description: 'Grails RIA framework'],
							[name: 'Groovy', description: 'Groovy dynamic language']
						]
					],
					[name:'CSS', description: 'Bookmarks about Cascading Style Sheets']
				]
			],
			[name: 'To Read', description: 'Bookmarks that are marked as "read later"']
		]

		Category root = new Category(name: 'Bookmarks', description: 'Root category')
		assert root.save()

		defaultCategories.each { cat ->
			Category c = new Category(name: cat.name, description: cat.description, parent: root)
			assert c.save()
			if(cat.children) {
				addChilds(c, cat.children)
			}
		}
	}

	private void addChilds(Category category, List childs) {
		childs.each { subcateg ->
			Category sub = new Category(name: subcateg.name, description: subcateg.description, parent: category)
			assert sub.save()
			if(subcateg.children) {
				addChilds(sub, subcateg.children)
			}

			category.addToSubcategories(sub)
		}

		assert category.save(flush:true)
	}

	Map getCategoryTree() {
		def root = Category.getRoot()
		def categories = [root: true, name: root.name, description: root.description, id: root.id, children:[], expanded: true]
		addNode(categories, root.subcategories)

		return categories
	}

	private addNode = {node, subcateg ->
		subcateg.each { Category c ->
			def child = [name: c.name, description: c.description, expanded: true, leaf: c.isLeaf(), id: c.id, parent:[id:c.parent?.id]]
			if(!c.isLeaf()) {
				child.children = []
				addNode(child, c.subcategories)
			}
			node.children.add(child)
		}
	}
}
