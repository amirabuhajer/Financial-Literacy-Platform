# Financial Literacy Platform

## Overview

This platform aims to provide users with educational resources on managing their finances effectively. It includes modules on budgeting, saving, investing, and debt management, along with interactive tools to help users learn in a practical way.

## Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/amirabuhajer/financial-literacy-platform.git
   ```

2. Navigate to the project directory:
   ```
   cd financial-literacy-platform
   ```

3. Install dependencies:
   ```
   npm install
   ```
   Make sure to install the additional dependencies if needed:
   ```
   npm install react-router-dom html2canvas file-saver jspdf
   ```

4. Run the application:
   ```
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Financial Simulator

If you are here for the graph, then head to `http://localhost:3000/financial-simulator`. Make sure to install all dependencies, which include the ones listed above.

### Issues with Compilation

If you encounter errors like `Webpack compiled with 4 errors and 1 warning`, follow these steps:

1. Run the following commands to install the necessary dependencies:
   ```
   npm install html2canvas
   npm install file-saver
   npm install jspdf
   ```

2. You might also see vulnerabilities in the output. To address all issues (including breaking changes), run:
   ```
   npm audit fix --force
   ```

   Note: Running `npm audit fix --force` may introduce breaking changes, so proceed with caution.

## Known Issues

- Some vulnerabilities may be present. Use `npm audit` to get more details.
- Webpack might compile with errors or warnings; ensure all necessary dependencies are installed as mentioned above.

## License

This project is licensed under the MIT License.

