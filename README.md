# FamilySearch Web Component Sample App

Sample app built using [Polymer](https://www.polymer-project.org) and the 
[FamilySearch web components](https://github.com/fs-webcomponents).

The sample app is available at https://fs-wc-sample-app.herokuapp.com/.

## Install

1. `git clone`
2. `npm install`
3. `npm run start`

## Server

The app is implemented as a single page app. It uses a simple server that allows
the `index.html` file to be served in response to any valid app route. Without
it you would always have to load the app at `/` and any other URL would be a 404.

## App

You'll see in the apps `index.html` file that the HTML body only contains a
`<sample-app>` tag. That is a component specific to this app and represents the
apps main controller. The components file is located at `components/sample-app.html`.
That file is heavily commented and is the best place to start for learning how
the app works.