# Overview

This is designed to be an easy-to-navigate reference guide based on the ARIA 2.1 spec.

This project is a simplified Static Site Generator. `react-dom/server` is used to render React components into static HTML files. The generated files are then deployed to Firebase Hosting.

## Installation

1. Run `npm install`

## Development

1. Run `npm start`
1. Local server runs at `http://localhost:10001/build`

## Generate Files and Build

1. Run `npm start`
1. Go to `http://localhost:10001/build` to generate files in `public/`
1. Wait for "done" to appear
1. Run `firebase deploy`
