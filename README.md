# Web Scraper Selenium Express JS

I have created a project, a web scraper using Selenium and Express.js. The target website for scraping is realtor.com, a platform providing information about properties in the United States of America.

## Project Details

### A. Prerequisite

- Latest version of Node.js
  Install Node.JS current version [here](https://nodejs.org/en/download/current)
- Webdriver corresponding to the browser being used
  This project use Chrome as a default Browser, if you want to use another Browser, you must download and install the webdriver for the browser you used
- Postman for running tests
  Postman for calling an API url and get the scraping result, you can download it [here](https://www.postman.com/downloads/)

### B. Steps

1. Set up the webdriver for the chosen browser to use selenium.

- Download the webdriver specific to the default browser. If you use Chrome, you can download it [here](https://chromedriver.chromium.org/getting-started).
- Install the webdriver and configure its file. You can place it in the system folder C:/<NewWebDriverFolder>/webdriver.exe.
- Configure the path in the environment variable to create a new path specifically for the installed webdriver.

2. Clone this GitHub repository to the local project folder.

```bash
  git clone https://github.com/riorasyid23/webscraper-test.git
```

3.  Configure the browser in the scraper.js file if a different browser is used than the one in this project, which is Chrome.

- Default: `let driver = await new Builder().forBrowser("chrome").build();`

4. Run npm installation

- Run npm install to install the required modules for the project.

5. Run the project with the node command

- Start the API server with the command node scraper.js.

6. Make a request call to the port using Postman.

- Open Postman, create a new request with the GET method, enter the API URL with the city query (City or state in the United States).
- `http://localhost:3000/scrape?city=new-york`

7. The scraping results can be seen in the Postman body.

## Additional Information

### Advantages:

- Can automate and simplify tasks or tests on the target website.
- Can analyze information on the target website.
- Speeds up tasks for entering information on the target website.

### Disadvantages:

- Scraping on websites with anti-bot systems can hinder the scraping process.
- The scraping results are limited due to the terms of service on the target website.
- The web scraper may not always work well because the target website implements dynamic attributes for elements (such as changing class or id values), requiring constant updates to the scraper code.

Challenges Faced:

- Lack of experience in creating web scraping, requiring simultaneous learning and development of the web scraper. Additionally, there was a very limited time frame.
- During the development process of the web scraper, the target website realtor.com had an anti-bot system that slightly hindered the development process.
