# description

Get/Set your npm author name from npmrc or gitconfig files

# installation

npm i npm-author-name

# usage example

```
import { setAuthorName, getAuthorName } from 'npm-author-name';

if(!getAuthorName()) {
    setAuthorName("Some Name");
}
console.log("author name", getAuthorName())
```
