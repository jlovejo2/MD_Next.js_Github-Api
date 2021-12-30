import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { postFilePaths, findDirectory } from '@utils/mdx';

const postsDirectory = findDirectory('_posts')

// export function getPostSlugs() {
//   return fs.readdirSync(postsDirectory)
// }

export function organizeMarkDownContent(content) {
  const returnData = {
    headers: {}
  };
  let h1Count = 0;
  let h2Count = 0;
  let h3Count = 0;
  let h4Count = 0;
  let h5Count = 0;
  let h6Count = 0;

  const parsedToHtml = marked.parse(content);
  returnData.html = parsedToHtml
  //This regex Expression finds all header tags and the content within, in the html string
  const regExHtml = /<\s*h[1-6][^>]*>(.*?)<\s*\/\s*h[1-6]>/g;
  const regExBetween = /(?<=\>).*(?=\<)/g;
  // const anotherRegEx = /.*\>([^\>]*)\</;
  const htmlRegex = parsedToHtml.match(regExHtml);

  htmlRegex.forEach(value => {
    if (value.includes('<h1')) {
      h1Count ++;
      returnData.headers[`h1_${h1Count}`] = { content: value.match(regExBetween)[0] } 
      h2Count, h3Count, h4Count, h5Count, h6Count = 0;
    } 
    if (value.includes('<h2')) {
      h2Count ++;
      returnData.headers[`h1_${h1Count}`][`h2_${h2Count}`] ={ content: value.match(regExBetween)[0]};
      h3Count, h4Count, h5Count, h6Count = 0;
    }
    if (value.includes('<h3')) {
      h3Count ++;
      returnData.headers[`h1_${h1Count}`][`h2_${h2Count}`][`h3_${h3Count}`] = {content: value.match(regExBetween)[0] };
      h4Count, h5Count, h6Count = 0;
    }
    if (value.includes('<h4')) {
      h4Count ++;
      returnData.headers[`h1_${h1Count}`][`h2_${h2Count}`][`h3_${h3Count}`][`h4_${h4Count}`] = {content: value.match(regExBetween)[0] };
      h5Count, h6Count = 0;
    }
    if (value.includes('<h5')) {
      h5Count ++;
      returnData.headers[`h1_${h1Count}`][`h2_${h2Count}`][`h3_${h3Count}`][`h4_${h4Count}`][`h5_${h5Count}`] = {content: value.match(regExBetween)[0]};
      h6Count = 0;
    }
    if (value.includes('<h6')) {
      h6Count ++;
      returnData.headers[`h1_${h1Count}`][`h2_${h2Count}`][`h3_${h3Count}`][`h4_${h4Count}`][`h5_${h5Count}`][`h6_${h6Count}`] = {content: value.match(regExBetween)[0]};
    }
  })

  return returnData;
}


export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const is_mdx = /\.mdx$/.test(slug)
  const fullPath = join(postsDirectory, `${realSlug}${is_mdx ? '.mdx' : '.md'}`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'constant') {
      items[field] = content
    }
    if (field === 'content') {
      items[field] = content
    }
    if (field === 'html') {
      const organizedContent = organizeMarkDownContent(content);
      items[field] = organizedContent;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = postFilePaths(postsDirectory)
  // console.log('get all posts: ', slugs)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  console.log('get all posts: ', posts)
  
  return posts
}