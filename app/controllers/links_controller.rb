class LinksController < ApplicationController
	def view
		if (session[:user_id] != nil)
			links = Link.where(user_id: session[:user_id])

			links.order!('local ASC')
			render(:view, { locals: { links: links}})
		else
			redirect_to '/'
		end
	end

	def redirect
			user = User.find_by(name: request.subdomain.downcase)
			if user == nil
				redirect_to '/404.html'
			else
				link = Link.find_by(local: params[:local].downcase, user_id: user.id)
				if link
					link.counter += 1
					link.save
					redirect_to link.external
				else
					redirect_to '/404.html'
				end				
			end
	end

	def create
		existing = Link.where(local: params[:local], user_id: session[:user_id])
	
		if existing == []
			new_link = Link.new({local: params[:local].downcase, external: params[:external], user_id: session[:user_id]})
			new_link.save
		end
		redirect_to '/links'
	end

	def edit
		link = Link.find_by(id: params[:id])
		if params[:local]
			if (params[:local].downcase != "links") && (params[:local].downcase != "users") && (params[:local].downcase != "sessions")
				link.local = params[:local]
				link.save
			end
		end
		if params[:external]
			link.external = params[:external]
			link.save
		end
		redirect_to '/links'
	end

	def kill
		if (session[:user_id] != nil)
			link = Link.find_by(id: params[:id], user_id: session[:user_id])
			link.destroy
		end
		redirect_to '/links'
	end
end