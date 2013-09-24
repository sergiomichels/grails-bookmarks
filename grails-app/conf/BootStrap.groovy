import br.com.app.domains.Bookmark;
import br.com.app.domains.Category;

class BootStrap {

	def categoryService
	
    def init = { servletContext ->
		
		categoryService.generateDefaultCategories()
			
		Bookmark book1 = new Bookmark(url: 'http://www.infoq.com/grails',title: 'InfoQ Java', 
			description: 'Arcticles, presentations and interviews about Grails', category: Category.findByName('Grails'))
		
		assert book1.save(flush: true)
		
		
    }
	
    def destroy = {
    }
}
