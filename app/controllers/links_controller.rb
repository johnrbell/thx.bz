class LinksController < ApplicationController
	def view
		if (session[:user_id] != nil)
			links = Link.all
			links.order!('local ASC')
			render(:view, { locals: { links: links}})
		else
			redirect_to '/'
		end
	end

	def redirect
		link = Link.find_by(local: params[:local])
		redirect_to (link.external)
	end

	def create
		new_link = Link.new({local: params[:local], external: params[:external]})
		new_link.save
		redirect_to '/links#bottom'
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
		link = Link.find_by(id: params[:id])
		link.destroy
		redirect_to '/links'
	end
end