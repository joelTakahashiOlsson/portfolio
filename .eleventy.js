const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Enable line breaks in markdown (single newline → <br>)
  const md = markdownIt({ html: true, breaks: true });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("contentSections", (collectionApi) => {
    const entries = collectionApi
      .getFilteredByGlob("site_content/*.md")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));

    const sections = [];
    const sectionMap = {};
    for (const entry of entries) {
      const key = entry.data.section || entry.fileSlug;
      if (!sectionMap[key]) {
        sectionMap[key] = { id: key, title_sv: null, title_en: null, entries: [] };
        sections.push(sectionMap[key]);
      }
      if (entry.data.section_title_sv && !sectionMap[key].title_sv) {
        sectionMap[key].title_sv = entry.data.section_title_sv;
        sectionMap[key].title_en = entry.data.section_title_en;
      }
      sectionMap[key].entries.push(entry);
    }
    return sections;
  });

  eleventyConfig.addFilter("filterSections", (sections, ids) =>
    sections.filter(s => ids.includes(s.id))
  );

  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("partials");

  return {
    pathPrefix: "/portfolio/",
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
    },
  };
};
