# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Link.delete_all

User.create(name: 'Josh', password:'test')
Link.create(local: 'link1', external:'http://www.reddit.com/r/battlestations')
Link.create(local: 'link2', external:'http://www.reddit.com/r/everydaycarry')
Link.create(local: 'link3', external:'http://www.reddit.com/r/space')
Link.create(local: 'test/link1', external:'http://www.reddit.com/r/funny')Link.create!([
  {local: "wtf", external: "http://www.reddit.com/r/wtf"},
  {local: "desgin_comps-client2", external: "http://docs.google.com/"},
  {local: "desgin_comps-link1", external: "http://www.reddit.com/r/battlestations"},
  {local: "desgin_comps-link2", external: "http://www.reddit.com/r/everydaycarry"},
  {local: "desgin_comps-link3", external: "http://www.reddit.com/r/space"},
  {local: "shit", external: "http://www.reddit.com/r/funny"}
])
