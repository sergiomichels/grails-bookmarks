package br.com.app.domains

import org.springframework.dao.DataIntegrityViolationException
import org.springframework.web.servlet.support.RequestContextUtils;

import static br.com.app.util.JsonUtils.*

class BookmarkController {

    def index() {
        redirect(action: "list", params: params)
    }

    def list(Integer max) {
        params.max = Math.min(max ?: 10, 100)
		
		def instances = Bookmark.createCriteria().list(params) {
			if(params['filter.category.id']) {
				category {
					eq('id', params['filter.category.id'].toLong())	
				}
			}
		}
		
        render contentType: 'application/json', text: toJson([success:true, total: instances.totalCount, data: instances])
    }

	def save() {
        def bookmarkInstance = new Bookmark(params)
		
		def model
		
		Locale locale = RequestContextUtils.getLocale(request)
		
        if (!bookmarkInstance.save(flush: true)) {
            model = [success: false, errors: errorsToResponse(bookmarkInstance.errors, locale)]
        } else {
			String message = message(code: 'default.created.message', args: [message(code: 'bookmark.label', default: 'Bookmark'), bookmarkInstance.id])
			model  = [success: true, message: message, data: bookmarkInstance]
        }

        render contentType: 'application/json', text: toJson(model)
    }

    def show(Long id) {
		
		if(!id) {
			redirect action: 'list', params: params
		}
		
        def bookmarkInstance = Bookmark.get(id)
		
		def model
		
        if (!bookmarkInstance) {
            String message = message(code: 'default.not.found.message', args: [message(code: 'bookmark.label', default: 'Bookmark'), id])
            model = [success: false, message: message]
        } else {
			model = [success: true, data: bookmarkInstance]
        }

        render contentType: 'application/json', text: toJson(model)
    }

    
    def update(Long id, Long version) {
        
		def bookmarkInstance = Bookmark.get(id)
		
		
        if (!bookmarkInstance) {
            String message = message(code: 'default.not.found.message', args: [message(code: 'bookmark.label', default: 'Bookmark'), id])
            render contentType: 'text/json', text: toJson([success: false, message: message])
            return
        }

        if (version != null) {
            if (bookmarkInstance.version > version) {
                bookmarkInstance.errors.rejectValue("version", "default.optimistic.locking.failure",
                          [message(code: 'bookmark.label', default: 'Bookmark')] as Object[],
                          "Another user has updated this Bookmark while you were editing")
                render contentType: 'text/json', text: toJson([success: false, errors: bookmarkInstance.errors])
                return
            }
        }

        bookmarkInstance.properties = params

        if (!bookmarkInstance.save(flush: true)) {
			render contentType: 'text/json', text: toJson([success: false, errors: bookmarkInstance.errors])
            return
        }

        String message = message(code: 'default.updated.message', args: [message(code: 'bookmark.label', default: 'Bookmark'), bookmarkInstance.id])
        render contentType: 'application/json', text: toJson([success: true, message: message])
    }

    def delete(Long id) {
        def bookmarkInstance = Bookmark.get(id)
        if (!bookmarkInstance) {
            String message = message(code: 'default.not.found.message', args: [message(code: 'bookmark.label', default: 'Bookmark'), id])
			render contentType: 'text/json', text: toJson([success: false, message: message])
            return
        }

		String message
		boolean success = true
		
        try {
            bookmarkInstance.delete(flush: true)
            message = g.message(code: 'default.deleted.message', args: [g.message(code: 'bookmark.label', default: 'Bookmark'), id])
        }
        catch (DataIntegrityViolationException e) {
            message = g.message(code: 'default.not.deleted.message', args: [g.message(code: 'bookmark.label', default: 'Bookmark'), id])
            success = false
        }
		
		render contentType: 'application/json', text: toJson([success: success, message: message])
		
    }
}
