import fs from 'fs';
import { join } from 'path';

//will get the specificed directory
export function findDirectory(directory) {
    return join(process.cwd(), directory)
};

//will get the list of all mdx files inside the path specified in posts_path
export function postFilePaths(directory) { 
    return fs
        .readdirSync(directory)
        //.test() method is used with regEx expressions to execute a search for match in the specified string
        .filter((path) =>/\.md?$/.test(path))
}