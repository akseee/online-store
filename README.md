# Academic project

Stellar Burgers is a web application designed for a cosmic burger restaurant where users can create and order burgers using unique ingredients. The application supports user registration, login, order feed browsing, and personal data management.

Main goal of the project was to get to know more advanced React and Routing as well as to do tests using Jest and Cypress.

[Figma](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Deploy](https://burger-store-project.netlify.app/)

#### Technologies Used

- **HTML, CSS, TS**
- **React**
- **Redux**
- **React Router**
- **Cypress**
- **Jest**

#### Features

**Dynamic Burger Constructor:** Build custom burgers using a variety of ingredients.
**Order Feed:** View all orders, updated in real-time.
**User Authentication:** Secure registration and login functionality.
**Profile Management:** Edit and save personal data.
**Order History:** View previous orders and their statuses.
**Responsive Design:** Optimized for all device sizes.

##### Routing Setup:

Configured application routing using react-router-dom.
Implemented protected routes for pages that are only accessible to authenticated users.

##### Global State Management (Redux):

Set up Redux store using createSlice to manage the state for ingredients, orders, and user data.
Developed asynchronous Thunk functions to handle API requests and update the store accordingly.

##### API Integration:

Successfully fetched and displayed data from the server across various application pages.
Implemented forms for registration, login, and profile editing with full functionality.

##### Feature Implementation:

Enabled key features including order creation, order history viewing, and modal window interactions.
Ensured that the application’s key functions work smoothly and meet the specified requirements.

##### Testing:

Developed integration tests using Cypress to validate key user scenarios such as ingredient selection, order creation, and modal interactions.
Created unit tests using Jest to ensure the correctness of reducers and Thunk functions, covering the main components of the Redux store.
