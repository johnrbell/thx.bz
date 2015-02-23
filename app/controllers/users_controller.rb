class UsersController < ApplicationController

	def index #landing page
		render :index
	end

	def new
		render :new
	end

	def forgot
		render :forgot
	end

	def makenew
		render :makenew
	end

	def updatepw
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

	def reset
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