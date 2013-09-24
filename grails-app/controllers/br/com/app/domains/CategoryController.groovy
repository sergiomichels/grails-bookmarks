package br.com.app.domains

import org.springframework.dao.DataIntegrityViolationException
import org.springframework.validation.Errors
import org.springframework.validation.FieldError
import org.springframework.web.servlet.support.RequestContextUtils as RCU

import static br.com.app.util.JsonUtils.*

class CategoryController {

	def gsonBuilder
	
	def categoryService
	
    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        render contentType: 'application/json', text: toJson([success:true, data: Category.list(params), total: Category.count()])
    }

    def save() {
		def categoryInstance = new Category(params)
		if(params.parent?.id) {
			categoryInstance.parent = Category.get(params.parent.id)
		}
        if (!categoryInstance.save(flush: true)) {
            render contentType: 'application/json', text: toJson([success: false, errors: errorsToResponse(categoryInstance.errors, getLocale())])
        } else {
	        flash.message = message(code: 'default.created.message', args: [message(code: 'category.label', default: 'Category'), categoryInstance.id])
	        render contentType: 'application/json', text: toJson([success:true, message: flash.message, data: categoryInstance])
        }
    }

    def show(Long id) {
		if(!id) {
			redirect action: 'list', params: params
		}
        def categoryInstance = Category.get(id)
        if (!categoryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'category.label', default: 'Category'), id])
			render contentType: 'application/json', text: toJson([success:false, message: flash.message])
            return
        }

        render contentType: 'application/json', text: toJson([success:true, data: categoryInstance])
    }

    def edit(Long id) {
        def categoryInstance = Category.get(id)
        if (!categoryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'category.label', default: 'Category'), id])
            render contentType: 'application/json', text: toJson([success:false, message: flash.message])
            return
        }

        render contentType: 'application/json', text: toJson([success:true, data: categoryInstance])
    }

    def update(Long id, Long version) {
        def categoryInstance = Category.get(id)
        if (!categoryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'category.label', default: 'Category'), id])
            render contentType: 'application/json', text: toJson([success:false, message: flash.message])
            return
        }

        if (version != null) {
            if (categoryInstance.version > version) {
                categoryInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'category.label', default: 'Category')] as Object[],
                          "Another user has updated this Category while you were editing")
                render contentType: 'application/json', text: toJson([success: false, errors: errorsToResponse(categoryInstance.errors, getLocale())])
                return
            }
        }

        categoryInstance.properties = params

		if(params.parent?.id) {
			categoryInstance.parent = Category.get(params.parent.id)
		}
		
        if (!categoryInstance.save(flush: true)) {
            render contentType: 'application/json', text: toJson([success: false, errors: errorsToResponse(categoryInstance.errors, getLocale())])
            return
        }

		flash.message = message(code: 'default.updated.message', args: [message(code: 'category.label', default: 'Category'), categoryInstance.id])
		render contentType: 'application/json', text: toJson([success:true, message: flash.message, data: categoryInstance])
    }

    def delete(Long id) {
        def categoryInstance = Category.get(id)
        if (!categoryInstance) {
            flash.message = message(code: 'default.not.found.message', args: [message(code: 'category.label', default: 'Category'), id])
            render contentType: 'application/json', text: toJson([success:false, message: flash.message])
            return
        }

        try {
            categoryInstance.delete(flush: true)
            flash.message = message(code: 'default.deleted.message', args: [message(code: 'category.label', default: 'Category'), id])
            render contentType: 'application/json', text: toJson([success:true, message: flash.message])
        }
        catch (DataIntegrityViolationException e) {
            flash.message = message(code: 'default.not.deleted.message', args: [message(code: 'category.label', default: 'Category'), id])
            render contentType: 'application/json', text: toJson([success:false, message: flash.message])
        }
    }
	
	def tree() {
		render contentType: 'application/json', text: toJson(categoryService.getCategoryTree())
	}
	
	private Locale getLocale() {
		return RCU.getLocale(request)
	}	
	
}
