Node Scaffold
=======

A basic [Node](http://nodejs.org/), [Express](http://expressjs.com/), and [Grunt](http://gruntjs.com/) scaffold that is easily deployable on [Heroku](https://www.heroku.com/).

Fork, npm install, and run!

Deploy on Heroku
-------
1. `grunt build`
2. `cd dist`
3. `git init` (first time only)
4. `heroku create` (first time only. make sure you're signed in before)
5. `git add -A`
6. `git commit -m 'my WHATEVER commit'`
7. `git push heroku master`
8. `heroku open`