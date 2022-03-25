<div id="top"></div>

<!-- PROJECT SHIELDS -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT NAME AND SCREENSHOT -->
<br />
<div align="center">
  <h3 align="center">TRAVELOGUE</h3>
</div>

[![Product Name Screen Shot][product-screenshot]](https://thetravelogue.herokuapp.com/)

<!-- ABOUT THE PROJECT -->

## About The Project

Third and final project of my Full-Stack Web Development bootcamp at Ironhack.
We needed to develop a MERN web application (MongoDB, Express, React & Node) in a week's time.

Given my taste for solo-travelling, and the lack of applications for logging and planning past and future trips (including cities visited), I decided to create Travelogue exactly to fill in the gap.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [React.js](https://reactjs.org/)
-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Node.js](https://nodejs.org/en/)
-   [Mapbox](https://www.mapbox.com/)
-   [axios](https://www.npmjs.com/package/axios)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- INSTALLATION -->

## Installation

1. Clone the repo
    ```sh
    git clone https://github.com/alexandreoliv/travelogue.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Environment variables (from MongoDB and Mapbox) are stored in .env files, naturally not included here. Contact me in case of issues
    ```sh
    REACT_APP_API_URL
    REACT_APP_MAPBOX_TOKEN
    PORT
    ORIGIN
    MONGODB_URI
    SESSION_SECRET
    ```
4. To run the project, type in the root folder:
    ```sh
    npm run dev
    ```
5. If the page hasn't open automatically, open the web browser and enter
    ```sh
    http://localhost:3000/
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. In the landing page, click <i>"Sign up"</i> and enter some username and password. (Passwords need to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.) (Please refer to the "<i>Issues</i>" section below to avoid problems in the sign up process.)

<p></p>

2. Click on <i>"Add Country"</i> to start adding your trips. Choose the country, type in the cities visited or intended to visit, enter any additional details (optional) and select <i>"Already visited"</i> or <i>"Future trip"</i>. Click <i>"Save country"</i>. Repeat the process as many times as necessary and close the box when done.

<p></p>

3. By now you'll see the countries with different colours on the map. Visited countries will be displayed in green; planned countries will be in yellow.

<p></p>

4. Optional: click on any added country on the map to see a box with some general information about that country (capital, population, languages etc).

<p></p>

5. Click <i>"Edit Countries"</i> and then click on any country of the list to open the edit mode. Either modify the trip and click <i>"Save country"</i> or simply <i>"Delete"</i> any country. Close the box when you're done.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ISSUES -->

## Issues

The code reflects my level of knowdlege by the time it was build (during the last week of the 9-week bootcamp) and hasn't been updated since.

I kept the <i>"Sign up"</i> and <i>"Log in"</i> features as simple as possible to focus on the React part, which was challenging. The sign up functionaly is not working properly. My original goal was to use social login as I did on my previous project, but I ended up implementing local authentication in the last minute and didn't have the time to fix the bugs.

Also, the UX can be improved a lot. Again, I focused on implementing the main features and because the asyncronous calls were so challenging to solve, in the end I was happy with the results.

### Bugs:

1. Before signing up, it's necessary to refresh (<i>F5</i>) the landing page if another user was logged in before. If you don't refresh the page, you'll see the last user's map once you're logged in.

2. After refreshing the page, now please sign up and you'll see your name on the top left, and an empty map. Everything seems to be ok, but if you add any trips the map won't update. So, before you add your first trip, please refresh (<i>F5</i>) the page again. This will redirect you to the landing page, just log in normally and everything will work as intended.

3. After logging in or signin up, the "<i>login/signup box</i>" won't close automatically. Please close it manually by clicking on the "<i>x</i>" or anywhere on the map.

### Future improvements:

1. Fix the bugs
2. Improve UX (especially the "<i>Edit mode</i>" and the "<i>Country info</i>" box which sould allow you to delete or edit the trip on-the-spot)
3. Add pins to visited cities
4. Add upload function for pictures and documents
5. Add extra fields like travel method (bus, airplane, car etc), date visited, rating etc
6. Social: see where your Facebook friends have been, see a ranking of the most avid travellers among your friends, see statistics about most visited places (among your friends or global)
7. Get user's location to center the map accordingly

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/alexandre-oliv/
[product-screenshot]: images/screenshot.png
