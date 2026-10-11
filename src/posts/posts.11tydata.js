export default {
  layout: "post.njk",
  tags: "posts",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : `/essays/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => !!data.draft,
  },
};
