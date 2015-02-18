Rails.application.routes.draw do
  
  # root 'users#index' #landing/login page
  get '/'=> 'users#index'

  get '/users/new' => 'users#new' #get make new user page
  post '/users/create' => 'users#create' #post to create new user in db

  post '/sessions/create' => 'sessions#create'#post to start a session at login
  get '/sessions/destroy' => 'sessions#destroy'#post to end a session at logout

  get '/links' => 'links#view' #gets page with all links on it. 

  post '/links/edit/:id' => 'links#edit' #does the edit for a link attribute
  get '/links/kill/:id' => 'links#kill' #does the kill for a link
  post '/links/create' => 'links#create' #does the add a link

  get ':user_name/:local' => 'links#redirect'

  match '*path' => redirect('/'), via: :get

  

  # match '/', to: 'users#index', constraints: { subdomain: 'www' }, via: [:get]
  # match '/links', to: 'links#view', constraints: { subdomain: /.+/ }, via: [:get]


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
