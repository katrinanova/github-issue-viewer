# Viewer of GitHub repo's open and closed issues

The app is hosted at [http://issue-viewer-github.herokuapp.com/npm/npm/issues](http://issue-viewer-github.herokuapp.com/npm/npm/issues)

## The App

The app is build with React and Redux and powered by Express - Node.js

- The Home Page showcases the first ten listed issues of the chosen repo. The user can page through all the issues. By clicking on any issue the user is redirected to that issue's page.

- Issue's Page has a full issue description, an issue status and comments, if available.

- On top of the every view there is a form to fill in "owner" and "repo" to look up another repo's issues.

- The user can also change the owner/repo and the issue number in url in order to look up certain issues/issue


## To run

```
npm install
npm run webpack
npm start
```

to test
```
npm test
```

available at [http://localhost:3000/npm/npm/issues](http://localhost:3000/npm/npm/issues)


## Technical approach


### The way it works:

When the user first loads the app, the issues are retrieved by the owner, repo and page, using the Github API. Then pages that surround current page get fetched (prev, next, first, last) with `fetchSurroundingPages` function; on success pages are stored in the app's state tree, represented by Redux' store object. That way whenever the user changing the page, this page is already in the store and available instantly.

Anytime when prev/next/first/last is pressed, cached issues are being reassigned accordingly (if next pressed: prev = current, current = next, next = null) and `fetchSurroundingPages` is called for new current page, that way the cache is constantly updated.

Since the user cannot change the app's state, I chose not to crowd local storage and on every refresh I fetch the issues page or the certain issue from the Github API. I use `IssueListContainer#componentWillReceiveProps` and `IssueDetailsContainer#componentWillMount` functions to check if the app's store has issues/issue from url to determine weather or not API request is needed.

In order to parse issue and comments for potential links to users (@katrinanova) I first get all the login names of the users present in the conversation (user who asked the issue an every user who commented). That way I have a set of pre-approved login names and only need to do minimal amount of fetch requests to test potential links. (`parseForUserLinks` function in `issue-details-api`)


### React and Redux

In the components folder there are "containers" aka "smart" components, that connect to the store and listen to the store's state changes with `mapStateToProps` function. Container components have all the logic like reacting to reacts `componentWillReceiveProps` function. These components pass the props to the "views" aka "dumb" components, that only responsible for rendering.

The state of the app is held in the store and can be changed by calling `store(dispatch(someAction))`. When the action is triggered, every reducer will check for this action's type, and if found, it will update the state. Then components that subscribed to listen to that part of the state will receive new state through the new props.
