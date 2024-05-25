# Angular Movie Directory Project

This project contains two Angular applications:

1. **Main App**: This app calls the  API and passes the results to the child app.
2. **Child App**: This app displays the results received from the main app within an iframe.

## Getting Started

To get a copy of the project up and running on your local machine, follow these steps.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/radha226/movie-directory-main.git
    git clone https://github.com/radha226/movie-directory-child.git
    ```

2. Install dependencies for both the main app and the child app:
    ```bash
    cd movie-directory-main
    npm install
    cd ../movie-directory-child
    npm install
    ```

## Main App

The main app is responsible for making API calls  and sending the results to the child app.

### Running the Main App

1. Navigate to the `main-app` directory:
    ```bash
    cd movie-directory-main
    ```

2. Start the development server:
    ```bash
    ng serve
    ```

3. Open your browser and navigate to `http://localhost:4200`.

## Child App

The child app displays the results received from the main app.

### Running the Child App

1. Navigate to the `child-app` directory:
    ```bash
    cd ../movie-directory-child
    ```

2. Start the development server:
    ```bash
    ng serve --port 4500
    ```

3. The child app will be available at `http://localhost:4500`.

## OMDB API

The OMDB API is used by the main app to fetch movie data.

### API Key

To use the OMDB API, you need an API key. You can get one by registering at [OMDB API](http://www.omdbapi.com/apikey.aspx).

### Configuration

1. do changes of omdbApiKey in `src/environments` directory of the main app with the following content:
    ```typescript
    export const environment = {
      production: false,
      omdbApiKey: 'YOUR_OMDB_API_KEY'
    };
    ```

2. Replace `YOUR_OMDB_API_KEY` with your actual OMDB API key.

## Usage

1. Start both the main app and the child app as described above.
2. Access the main app in your browser at `http://localhost:4200`.
3. The main app will load the child app in an iframe and pass the search results from the OMDB API to it.
4. The child app will display the search results.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
