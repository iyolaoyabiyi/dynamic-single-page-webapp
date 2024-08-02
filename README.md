# Dynamic Single Page Website Project

## Overview

This project is a dynamic single-page website developed without any framework. The site dynamically loads and displays content for various sections such as home, destination, crew, and technology. The design and functionality focus on simplicity, utilizing plain JavaScript, CSS, and HTML. The site uses a normal fetch API to retrieve dynamic content, and the code structure is organized using constructor functions to manage pages and sections.

## Features

- **Dynamic Single Page Website**: All content is loaded on a single page without traditional multi-page routing. Navigation between sections is handled through JavaScript, which updates the visible content dynamically.

- **Dynamic Content Loading**: Content for different sections (home, destination, crew, technology) is fetched dynamically using the `fetch` API from a local JSON file (`data.json`). This allows for easy updates and management of content without altering the core structure of the site.

- **No Frameworks**: The project does not rely on any front-end frameworks (like React, Angular, or Vue). It uses plain JavaScript, HTML, and CSS, providing a lightweight and straightforward implementation.

- **Constructor Functions**: The project uses constructor functions to manage the creation and behavior of pages and sections. This modular approach helps in organizing code and making it easier to extend or modify.

- **Responsive Design**: The website is designed to be responsive, adapting its layout and styling for different screen sizes (desktop, tablet, and mobile).

## Code Structure

### Main Components

- **Pages**: The `Page` constructor function is used to manage different sections (home, destination, crew, technology) of the website. Each `Page` instance handles background image changes, content visibility, and active state management.

- **Sections**: The `Section` constructor function manages specific content areas within a page (e.g., different destinations or crew members). It dynamically updates the content based on user interaction.

### Important Files

- `index.html`: The main HTML file containing the structure of the website.
- `styles.css`: The CSS file for styling the website.
- `script.js`: The main JavaScript file containing all the logic for dynamic content loading, navigation, and other functionalities.
- `data.json`: A JSON file containing the dynamic content for different sections of the website.

## Getting Started

### Prerequisites

To view and run the project locally, you'll need a basic web server to serve the static files. You can use a simple server like Python's HTTP server or a lightweight server like `http-server` in Node.js.

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/iyola-oyabiyi/dynamic-single-page-webapp.git
   ```

2. **Navigate to the project directory**:
   ```sh
   cd dynamic-single-page-webapp.git
   ```

3. **Start a local server**:
   - Using Python:
     ```sh
     python -m http.server
     ```
   - Using Node.js:
     ```sh
     npx http-server
     ```
   - Use any preferred server

4. **Open the website in your browser**:
   Go to `http://localhost:8080` (or the port your server is running on).

## How It Works

1. **Page Initialization**: When the website loads, the `DOMContentLoaded` event initializes all pages and sections. The home page is displayed by default.

2. **Navigation**: Clicking on navigation buttons or the logo triggers JavaScript functions that change the visible content by updating the DOM. No full-page reloads occur; the content is dynamically updated in place.

3. **Dynamic Content Loading**: The `fetch` API retrieves data from `data.json` and populates the relevant sections with the fetched data. This allows for easy updates to content without modifying the HTML structure.

## Inspiration

This project was inspired by challenges from [Frontend Mentor](https://www.frontendmentor.io/), a platform that provides real-world web development challenges to help developers improve their skills. The design and concept were influenced by the challenges available on the platform, focusing on building web applications.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you find any bugs or have suggestions for improvements.

## License

This project is open-source and available under the [MIT License](LICENSE).
