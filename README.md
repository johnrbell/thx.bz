## Synopsis

This is a tool to manage links for designers and developers alike. 

It provides the ability to create short URLs with simple structure. 

The redirect for these URLs can be quickly edited from a clean, easy to use,
control panel.

## Example

`User.thx.bz/link1` can be set to redirect to `https://docs.google.com/spreadsheets/d/blah`

Routes can be easily edited, removed, or created. 

They can be used by anyone. 


## Motivation

A colleague came to me with the example he commonly deals with: 

>my team has *sooo many* different tools and links to keep track of

>for example: all of our design screenshots are stored in invision, all of our design psds are on box.com, all of our design spec (documents) are on google drive, all of our tech spec docs are on confluence...

>every single one of these tools produces some share link and its always some god damned giant mess, like invision.com/share/lkdsfn432jasdfjkl421231?MULTI=true

>now imagine i need to give our developers a link to one of our designs... i have to get that share link and post it to confluence, in their tech spec

>but guess what? yesterday we decided we don't want to use invision anymore. now we use redpen!

>so now i upload all images to redpen, and have to generate all new share links to every design

>and then go back to confluence and update all the links there to the new redpen urls, etc

>BUT WHAT IF...

>i had a simple redirect link like:

>tp.thx.bz/design1 = invision.com/share/lkdsfn432jasdfjkl421231?MULTI=true

>now, i can just post "tp.thx.bz/design1" once. 

>I can update the redirect as we change/update services...

## Technologies Used

Backend is Rails. 

Front end is Javascript, JQuery, Skeleton.css, and some custom CSS

Database is PSQL

Deployed via Heroku with a custom domain.
