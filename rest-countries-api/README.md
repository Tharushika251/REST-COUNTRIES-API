# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### IT22077110-----------------------------------------

# Country Explorer - React Application

A responsive React application for browsing country information using the REST Countries API, featuring search, filters, dark/light mode, and favorites functionality.

## Screenshots

## Dark Mode Screenshots

![Dark Mode Countries](assets/darkMode/darkModeCountries.png)
![Dark Mode Countries 2](assets/darkMode/darkModeCountries2.png)
![Dark Mode Country Details](assets/darkMode/darkModeCountry.png)
![Dark Mode Favorites](assets/darkMode/darkModeFavorites.png)
![Dark Mode Login](assets/darkMode/darkModeLogin.png)

## Light Mode Screenshots

![Light Mode Countries](assets/lightMode/lightModeCountries.png)
![Light Mode Countries 2](assets/lightMode/lightModeCountries2.png)
![Light Mode Country Details](assets/lightMode/lightModeCountry.png)
![Light Mode Favorites](assets/lightMode/lightModeFavorites.png)
![Light Mode Login](assets/lightMode/lightModeLogin.png)

## Features

- Browse all countries with detailed information
- Search countries by name
- Filter by region (Africa, Americas, Asia, Europe, Oceania)
- Favorite countries (with user authentication)
- Dark/Light mode toggle
- Fully responsive design
- Paginated results for better performance

## Technologies Used

- React.js
- React Router
- REST Countries API
- Context API for state management
- CSS Modules for styling
- Jest/React Testing Library for testing

## Installation

### Prerequisites

- Node.js (v16 or later recommended)
- npm (v8 or later) or yarn

### Setup

1. Clone the repository: 

git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22077110.git
cd country-explorer

2. Install dependencies:

`npm install`

3. Start the development server:
`npm start`

4. Open http://localhost:3000 in your browser.

## Testing

The application includes comprehensive unit tests using Jest and React Testing Library.

### Running Tests

- Run all tests:
`npm test`

- Run tests in watch mode:
`npm test:watch`

- Generate test coverage report:
`npm test:coverage`


### Test Configuration

The test environment is configured with:
- Jest as the test runner
- React Testing Library for component testing
- JSDOM as the DOM implementation
- CSS module mocking using identity-obj-proxy

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is irreversible!**\
Ejects from Create React App configuration.

### `npm run build`

Deployment

To create a production build:


This creates an optimized build in the `build` folder ready for deployment.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Developer: IT22077110  
Project: Development of a React Frontend Application Using REST Countries API
url: 