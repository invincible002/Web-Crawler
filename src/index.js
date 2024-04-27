import axios from "axios";
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as fs from "node:fs";
import * as path from "path";
import * as urlParser from "url";

const seenUrls = {};
const pageVisitLimit = 1;
let pageVisitCount = 0;
const stream = fs.createWriteStream("text/text-content.txt", { flags: "a" });
const websiteToCrawl = "https://zethic.com";

const getUrl = (link) => {
  if (link.includes("http") && !link.endsWith("/")) {
    return link;
  } else if (link.startsWith("#")) {
    return websiteToCrawl;
  } else if (link.endsWith("/")) {
    return `${websiteToCrawl}`;
  } else if (link.startsWith("/")) {
    return `${websiteToCrawl}${link}`;
  } else {
    return `${websiteToCrawl}/${link}`;
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
    await stream.write(content);
    console.log("Text content saved successfully.");
  } catch (error) {
    console.error("Error saving text content:", error);
  }
};

const extractText = async (html) => {
  const $ = cheerio.load(html);
  const h1Tags = $("h1")
    .map((i, h) => h)
    .text();
  const h2Tags = $("h2")
    .map((i, h) => h)
    .text();

  const h3Tags = $("h3")
    .map((i, h) => h)
    .text();
  const h4Tags = $("h4")
    .map((i, h) => h)
    .text();

  const pTags = $("p")
    .map((i, h) => h)
    .text();

  const cleanH1 = h1Tags.replace(/(\r\n|\n|\r)/gm, "").trim();
  const cleanH2 = h2Tags.replace(/(\r\n|\n|\r)/gm, "").trim();
  const cleanH3 = h3Tags.replace(/(\r\n|\n|\r)/gm, "").trim();
  const cleanH4 = h4Tags.replace(/(\r\n|\n|\r)/gm, "").trim();
  const cleanP = pTags.replace(/(\r\n|\n|\r)/gm, "").trim();

  return { cleanH1, cleanH2, cleanH3, cleanH4, cleanP };
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

    const { cleanH1, cleanH2, cleanH3, cleanH4, cleanP } = await extractText(
      html
    );
    // await saveImages(images, "images/");
    await saveText(cleanH1, path.join("text/", "text-content.txt"));
    await saveText(cleanH2, path.join("text/", "text-content.txt"));
    await saveText(cleanH3, path.join("text/", "text-content.txt"));
    await saveText(cleanH4, path.join("text/", "text-content.txt"));
    await saveText(cleanP, path.join("text/", "text-content.txt"));

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

crawl(websiteToCrawl);

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
