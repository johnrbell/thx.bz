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
Link.create(local: 'test/link1', external:'http://www.reddit.com/r/funny')
