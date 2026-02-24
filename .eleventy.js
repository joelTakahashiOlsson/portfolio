const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Enable line breaks in markdown (single newline → <br>)
  const md = markdownIt({ html: true, breaks: true });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("contentSections", (collectionApi) =>
    collectionApi.getFilteredByGlob("site_content/*.md").sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
  );

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("partials");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
    },
  };
};
