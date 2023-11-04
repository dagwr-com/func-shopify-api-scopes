const axios = require('axios');
const cheerio = require('cheerio');

/**
* Responds to any HTTP request.
*
* @param {!express:Request} req HTTP request context.
* @param {!express:Response} res HTTP response context.
*/
exports.getFromShopifyDocs = async (req, res) => {
  const data = await axios.get("https://shopify.dev/docs/api/usage/access-scopes", {timeout: 3000})
  .then(function (response) {
      const $ = cheerio.load(response.data);

      const codes = $("#Main > div > div.grid__item.grid__item--desktop-up-two-thirds.grid__item--wide-up-three-quarters.grid__item--article > article > section:nth-child(4) > table > tbody > tr > td:nth-child(1) > code")
        .map((i, el) => $(el).text())
        .get()
        .join(",");

      res.send(codes);
  })
  .catch(function (error) {
      res.status(error.status).send(JSON.stringify(error));
  });
};