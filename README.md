# FamilySearch Web Component Sample App

Sample app built using [Polymer](https://www.polymer-project.org) and the 
[FamilySearch web components](https://github.com/fs-webcomponents). The app is 
running at https://fs-wc-sample-app.herokuapp.com/.

This sample app is not meant to be a tutorial on using Polymer. It is expected
that you learn about Polymer first. This app is a demonstration of how the
FamilySearch web components might be used to create a working app. It explores
the problems of routing and state management and shows how multiple components
can be used together.

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
apps main controller. The component's file is located at `components/sample-app.html`.
That file is heavily commented and is the best place to start for learning how
the app works.

There are two other custom components used in the app, both of which are in the
`components` directory and are also well commented.