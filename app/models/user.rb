class User < ActiveRecord::Base
	has_secure_password
	self.has_many(:links)
end