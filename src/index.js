import axios from "axios";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as fs from "node:fs";
import * as path from "path";
import * as urlParser from "url";

const seenUrls = {};
const pageVisitLimit = 10;
let pageVisitCount = 0;

const getUrl = (link) => {
  if (link.includes("http")) {
    return link;
  } else if (link.startsWith("/")) {
    return `http://localhost:10000/${link}`;
  } else {
    return `http://localhost:10000/${link}`;
  }
};

const fetchHtml = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.log("Something went wrong", error);
    return null;
  }
};

const extractLinks = async (html) => {
  const $ = cheerio.load(html);
  const links = $("a")
    .map((i, img) => img.attribs.href)
    .get();
  return links;
};

const extractImages = async (html) => {
  const $ = cheerio.load(html);
  const imageUrls = $("img")
    .map((i, img) => img.attribs.src)
    .get();

  return imageUrls;
};

const saveImages = async (images, folderpath) => {
  try {
    for (const imageUrl of images) {
      const imageFileName = path.basename(imageUrl);
      const imagePath = path.join(folderpath, imageFileName);
      const ext = path.extname(imageUrl);
      if (ext == ".png" || ext == ".svg" || ext == ".jpg") {
        const imageResponse = await fetch(getUrl(imageUrl));
        imageResponse.body.pipe(fs.createWriteStream(imagePath));
      }
    }
    console.log("Images saved successfully.");
  } catch (error) {
    console.error("Error saving images:", error);
  }
};

const saveText = async (content, filePath) => {
  try {
    await fs.promises.writeFile(filePath, content);
    console.log("Text content saved successfully.");
  } catch (error) {
    console.error("Error saving text content:", error);
  }
};

const crawl = async (url) => {
  try {
    if (seenUrls[url]) return;
    if (pageVisitCount >= pageVisitLimit) return;

    pageVisitCount++;
    console.log("crawling", url);
    seenUrls[url] = true;

    const html = await fetchHtml(url);
    if (!html) {
      console.log("Failed to fetch HTML");
    }

    const links = await extractLinks(html);

    const images = await extractImages(html);

    const $ = cheerio.load(html);

    const textContent = $("body").text();
    await saveImages(images, "images/");
    await saveText(textContent, path.join("text/", "text-content.txt"));

    const parsedUrl = urlParser.parse(url);

    if (links.length > 0) {
      links
        .filter((link) => getUrl(link).includes(parsedUrl.hostname))
        .forEach((link) => {
          crawl(getUrl(link));
        });
    }
  } catch (error) {
    console.log(error);
  }
};

crawl("http://localhost:10000");

// fetch(url)
// .then(async (response) => {
//   const html = await response.text();
//   const links = $("a")
//     .map((i, links) => links.attribs.href)
//     .get();

//   imageUrls.forEach((imageUrl) => {
//     fetch(getUrl(imageUrl)).then((res) => {
//       const filename = path.basename(imageUrl);
//       const ext = path.extname(imageUrl);
//       if (ext == ".png" || ext == ".svg" || ext == ".jpg") {
//         const dest = fs.createWriteStream(`images/${filename}`);
//         res.body.pipe(dest);
//       }
//     });
//   });

//   const { host } = urlParser.parse(url);

//   links
//     .filter((link) => getUrl(link).includes(host))
//     .forEach((item) => {
//       // console.log(item, "line 52");
//       crawl(getUrl(item));
//     });
// })
// .catch((error) => {
//   console.log(error);
// });
