import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "post");

export function getSortedPostsData() {
  console.log(postDirectory);
  const fileNames = fs.readdirSync(postDirectory);
  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { orig, ...matterResult } = matter(fileContents);
    return { id, ...matterResult };
  });

  return allPostData.sort(({ date: a }, { date, b }) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });
}
