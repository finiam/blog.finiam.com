const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const markdownIt = require("markdown-it");
const mdImplicitFigures = require("markdown-it-implicit-figures");
const markdownItRenderer = new markdownIt().use(mdImplicitFigures);

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    "html",
    "liquid",
    "md",
    // Static Assets:
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2",
  ]);

  eleventyConfig.addPlugin(lazyImagesPlugin, {
    imgSelector: '[data-lazy="true"]',
    transformImgPath: (src) => `./src/static/${src}`,
  });

  eleventyConfig.addFilter("markdownify", (str) =>
    markdownItRenderer.renderInline(str),
  );

  eleventyConfig.addFilter("startsWith", (string, arg) =>
    string.startsWith(arg),
  );

  eleventyConfig.addFilter(
    "activeUrl",
    (desiredUrl, pageUrl, active, inactive) =>
      desiredUrl === pageUrl ? active : inactive,
  );

  eleventyConfig.addFilter("getAuthor", (authorKey) =>
    require(`./src/_data/authors/${authorKey}.json`),
  );

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob(["src/blog/*.md"]).map((post) => {
      if (post.data.author) {
        post.data.author = require(`./src/_data/authors/${post.data.author}.json`);
      }

      return post;
    }),
  );

  eleventyConfig.addPassthroughCopy({ "src/static": "." });

  eleventyConfig.setLibrary("md", markdownItRenderer);

  return {
    dir: {
      input: "src/",
      data: "_data",
      includes: "_includes",
      output: "_output",
    },
  };
};
