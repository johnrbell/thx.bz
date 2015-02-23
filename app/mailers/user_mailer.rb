class UserMailer < ActionMailer::Base
  default from: "www.thx.bz@gmail.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://thx.bz/'
    mail(to: @user.email, subject: 'Welcome to thx.bz')
  end

  def reset_email(user,pw)
    @user = user
    @url  = 'http://thx.bz/users/makenew'
    @pw = pw
    mail(to: @user.email, subject: 'Password reset @ thx.bz')
  end
end
