## Dropbox kind of thing

### Build and run

In the project directory, you can run:

#### `npm install`

Installs necessary dependencies of the project.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Tech Stack

- React.js
- Typescript
  
### Component Hierarchy

- App is the entry point. It contains a FileDetail and FilesList component.
- FileList component fetches files meta data from server and displays all files.
- FileDetail shows the detailed view of file

 ### State and Apis

- States are stored locally at the component level. Have not used global state libraries like redux to keep it simple.

  
  
