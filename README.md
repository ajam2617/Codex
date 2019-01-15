# :scroll: CODEX  :scroll:
Our team created a Full Stack Webstie that can store snippets of code that users frequently use or would like to reference at a later time. The site stores all user inputs or uploads, which users can then view on their dashboard and even search the master library by language or tag. 

[_Link to Deloyed Site_](https://dashboard.heroku.com/apps/codex-code-snippet-manager)

# :nut_and_bolt: How it Works :nut_and_bolt:

The technical flow of information is: the user submits a snippet, it is sent to our database and stored with a language and a tag and a user id, then the controller displays the information back to the user. 
![TechnicalFlow](/public/images/techFlow.JPG)

A user can store personal snippets, or search the main library of all user snippets submitted. 
![UserFlow](/public/images/userFlow.JPG)

_Route Information_

URL | HTTP Verb | Used For
--- | --------- | --------
/ | GET | Render landing page and get 10 most recent code snippets in database.
/dashboard | GET | Render dashboard page. Get all code snippets specific to logged in user.
/dashboard/newSnippet | POST | Posts new snippets to mySQL database.
/dashboard/updateSnippet | PUT | Updates snippet on mySQL database.
/dashboard/deleteSnippet | DELETE | Delete specific from specific user's dashboard.
/api/dashboard/:language/:id | GET | Grabs all snippets for specific language from mySQL database and renders the dashboard page using jQuery to dynamically display all snippets saved under the specific language.
/api/dashboard/:language/:id/:tag | GET | Grabs all snippets from specific tag in a specific language from.
/library | GET | Grabs all snippets ordered by language from the database.
/library/:language/:id | GET | Grabs all snippets for specific language and displays them on page using handlebars.
/library/:language/:id/:tag | GET | Grabs all snippets for specific language and tag and displays them on page using handlebars.
/signin | GET | Renders sign in page and sends user data to mySQL database.
/signup | POST | Posts new user to database.
/logout | GET | Logs specific user out and routes them to root page.


# :construction_worker: Built With :construction_worker:

* express
* express-handlebars
* express-session
* passport  *(for user authentication)*
* passport-local
* highlight.js *(for syntax highlighting)*
* .env
* sequelize
* mySQL2


_This Full stack site can be run in Node and requires npm installs for all resouces listed above_


# :pushpin: To Do List :pushpin:
- [x] use _Node_ and _Express_ Web Server
- [x] MySql Database ORM _(we used Sequelize)_
- [x] Utilize GET and POST routes for retrieving and adding new data
- [x] Deployed using _Heroku_
- [x] Utilize at least one new library, package, or technology we have never used before _(we used passport and highlight for the first time)_ 
- [x] Polished frontend UI
- [x] Folder Structure that meets MVC Paradigm
- [x] Good qualizty coding standards (indendation, scoping, naming)
- [x] Must not expose sensitive API key information on the server
- [x] Create _Github_ repository with _collaborators_ and _branches_
- [x] Decide on MVP with team members
- [x] Provide Proposal with libraries used, user stories, models, and stretch goals
- [ ] _Stretch Goal_ Section of the app for algorithm practice
- [ ] _Stretch Goal_ Predictive text in search field or dropdown menu
- [ ] _Stretch Goal_ Search Feature
- [ ] _Stretch Goal_ Additional validations
- [ ] _Stretch Goal_ Saved snippets and favorite snippet functionality
- [ ] _Stretch Goal_ Add Project id to organize snippets for individual projects

## Resources

* html
* CSS
* jQuery
* Bootstrap
* flaticon 
* Node

## Issues

We had a few issues, as a team, that were to be expected. We were tasked with using a library we had not used before. We were able to migrate them into our code more easily than expected. Sifting through documentation and articles were challenging and time consuming, but we were able to attain our goal of a minimum viable product.  

We used the highlight.js library to maintain code syntax of all snippets submitted. As long as you have the CDN and use *pre* and *code* within the html/handlebars, you can achieve a *VS Code* type style to your application. 
![HighlightJS](/public/images/highlightCode.JPG)

We used the passport npm to handle the user authentication. There is a lot to unpack and was very time consuming to make sure the file structure required for the passport package could work with our file structure we required to use with routes, controllers, sequelize, and handlebars. 
![PassportAuth](/public/images/passportCode.JPG)

To add some additional styling, we used the anime.js library to include some animations on our site. It's relatively easy to use and adds a nice touch to our side tab. 
![AnimeJS](http://g.recordit.co/NBFnfPk0tr.gif)
