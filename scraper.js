const express = require("express");
const { writeFile } = require("fs");
const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json([{ title: "asd" }]);
});

app.get("/scrape", async (req, res) => {
  const cities = req.query.city;

  try {
    const path = "./scrap-result/scrap.json";
    const scrapedData = await scrapeData(cities);
    // const scrapedData = { firstName: "rio", middleName: "al", lastName: "rasyid" };

    writeFile(path, JSON.stringify(scrapedData, null, 2), (err) => {
      if (err) {
        console.log("Error:", err);
        return;
      }
      console.log(`Data successfully scraped to ${path}`);
    });

    res.json(scrapedData);
  } catch (error) {
    console.log("Error", err);
    if (error.code === "ECONNABORTED" || error.response === undefined) {
      console.error("Network error:", error.message);
      res.status(500).send("Network error occurred.");
    } else {
      console.error("Error:", error.message);
      res.status(500).send("Error occurred during scraping.");
    }
  }
});

async function scrapeData(city) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get(`https://realtor.com/realestateandhomes-search/${city}`);
    const cards = await driver.findElements(By.xpath('//div[starts-with(@id, "placeholder_property_")]'));

    console.log(cards.length);
    const scrapedData = [];

    for (let i = 0; i < 5; i++) {
      try {
        const badge = await cards[i].findElement(By.css('div[data-testid="card-description"]')).getText();
        const brokerElement = await cards[i].findElement(By.css('div[data-testid="broker-title"]'));
        const brokerName = await brokerElement.findElement(By.css("span")).getText();
        const price = await cards[i].findElement(By.css('div[data-testid="card-price"]')).getText();
        const picUrl = await cards[i].findElement(By.xpath('//picture[1]//img[@data-testid="picture-img"]'));
        const addressElement = await cards[i]
          .findElement(By.xpath('//div[contains(@class, "card-address")]'))
          .getText();

        let addresses = addressElement.replace(/\n/g, " ");
        let imageUrl = await picUrl.getAttribute("src");

        scrapedData.push({
          propertyBadge: badge,
          propertyBroker: brokerName,
          propertyPrice: price,
          propertyAddresses: addresses,
          propertyImageUrl: imageUrl ?? "",
        });
      } catch (err) {
        console.log(err);
      }
    }
    return {
      totalFound: cards.length,
      result: scrapedData,
    };
  } catch (err) {
    console.log(err);
  } finally {
    driver.quit();
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
