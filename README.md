# Bleeding Vanilla JS

Experimental project which uses the newest features of Javascript on frontend & backend without any transpilation or build step

## Frontend side

- [hyperHTML](https://github.com/WebReflection/hyperHTML) in ES2015 Module mode
- native [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for API
- native async/await
- native EventTarget & Event
- `<script type="module">`

## Backend side

- [koa](http://koajs.com/)
- [koa-static](https://github.com/koajs/static)
- [koa-mount](https://github.com/koajs/mount)
- experimental HTTP/2
- experimental ES2015 Modules
- native async/await

## Dependencies

- yarn
- node 9.4.0

## Goal

The goal is to have very lightweight environment for single-page app creation.

It requires to add probably those dependencies:

- [koa-websockets](https://github.com/kudos/koa-websocket) and [sockette](https://github.com/lukeed/sockette) for "live" capabilities
- [unistore](https://github.com/developit/unistore) as a state container
- [navigo](https://github.com/krasimir/navigo) as a router
- [tachyons](https://github.com/tachyons-css/tachyons) for CSS
