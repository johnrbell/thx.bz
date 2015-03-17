class LinksController < ApplicationController
	def redirect
		user = User.find_by(name: request.subdomain.downcase)
			if user == nil
				redirect_to '/404.html'
			else
				link = Link.find_by(local: params[:local].downcase, user_id: user.id)
				if link
					if session[:accesspw] == user.accesspw
						link.counter += 1
						link.save
						redirect_to link.external
					else
						redirect_to '/accessgrant/'+user.id.to_s+'/'+link.id.to_s
					end
					
				else
					redirect_to '/404.html'
				end				
			end
	end


	def view
		if  (request.subdomain.downcase == '') ||  (request.subdomain.downcase == 'www') 
			if (session[:user_id] != nil)
				links = Link.where(user_id: session[:user_id])
				links.order!('local ASC')
				render(:view, { locals: { links: links}})
			else
				redirect_to '/'
			end
		else
			url = 'http://'+request.domain+'/links'
			if (request.port != 80)
				url = 'http://'+request.domain+':'+request.port.to_s+'/links'
			end
			redirect_to (url)
		end
	end

	def kill
		if (session[:user_id] != nil)
			link = Link.find_by(id: params[:id], user_id: session[:user_id])
			link.destroy
		end
		redirect_to '/links'
	end

	def create
		if (session[:user_id] != nil)
			existing = Link.where(local: params[:local], user_id: session[:user_id])
			if existing == []
				# if (params[:external][/^(http|https):\/\//] == nil) #check for leading http:// or https://, if not add it. 
					# params[:external] = "http://#{params[:external]}"
				# end
				new_link = Link.new({local: params[:local].downcase, external: params[:external], user_id: session[:user_id]})
				new_link.save
			end
			redirect_to '/links'
		end
	end

	def edit
		link = Link.find_by(id: params[:id])
		link.local  = params[:local]
	 	link.external = params[:external]
		link.save
		redirect_to '/links'
	end


end