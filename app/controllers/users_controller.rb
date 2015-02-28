class UsersController < ApplicationController

	def index #landing page
		if  (request.subdomain.downcase == '') ||  (request.subdomain.downcase == 'www')
			if (session[:user_id] != nil)
				redirect_to '/links'
			else
				render :index
			end
		else
			url = 'http://'+request.domain+'/links'
			if (request.port != 80)
				url = 'http://'+request.domain+':'+request.port.to_s+'/links'
			end
			redirect_to (url)
		end
	end

	def new #make new user page
		render :new
	end

	def forgot #i forgot my pw page
		render :forgot
	end

	def makenew #make a new pw page
		render :makenew
	end

	def updatepw #post when making new pw. 
		params[:name] = params[:name].downcase
		user = User.find_by(name: params[:name])
		if user && user.authenticate(params[:temppw])
			user.password = params[:new_pw]
			user.save
			redirect_to '/'
		else
			@error = true	
			render "users/makenew"	
		end
	end

	def reset #post to set a temp password and an email to make new one
		params[:name] = params[:name].downcase
		user = User.find_by(name: params[:name],email: params[:email])
		if user != []
			random_string = SecureRandom.hex
			user.password = random_string
			UserMailer.reset_email(user,random_string).deliver!
			user.save
			redirect_to '/'
		else
			@error = true	
			render "users/makenew"
		end
	end

	def create #post to create new user when user hits submit
		params[:name] = params[:name].downcase
		users = User.where(name: params[:name])
		
		if users != []
			@error = true	
			render "users/new"
		else
			new_user = User.new({name: params[:name].downcase, email: params[:email], password: params[:password]})
			
			UserMailer.welcome_email(new_user).deliver!
			new_user.save
			session[:user_id] = new_user.id #sets the session hash user_id to user.id
			session[:user_name] = new_user.name
			redirect_to '/links' #redirects to posts view all page
		end
 	end

end