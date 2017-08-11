<p align="center">
  <img src="https://raw.githubusercontent.com/shivkanthb/posted/master/source/images/logo.png" alt="Posted logo" width="50">
  <br>
</p>
<p align="center">Create beautiful product update pages.</p>

<p align="center"><img src="https://raw.githubusercontent.com/shivkanthb/posted/master/source/images/example-screenshot.png" width=700 alt="Screenshot Example."></p>
<p align="center"><i>Posted</i> version of Kik's latest <a href="http://www.kik.com/blog/introducing-full-screen-mode-and-stickers-for-video-chat/">news post</a>.</p>

### Inspiration
Big product companies such as [Dropbox](https://blogs.dropbox.com/dropbox/category/product-news/), [Github](https://github.com/blog/category/ship), [Snapchat](https://www.snap.com/en-US/news/), [Telegram](https://telegram.org/blog/admin-revolution) etc use a blog structure to publish their product updates/news. With *Posted*, its easy to create one just like that for your product. 

### Features
- Minimal & clean change logs for your product
- Dead simple usage
- Super Easy to customize
- Content is just Markdown
- No backend needed
- Free and open. No strings attached
- Extendable. Its literally just a site generator

### Getting Started

1. Clone repo (or fork and clone)
2. `cd posted`
3. Install dependencies 
```
npm install
```
4. Compile posts to static site in `./build`
```
npm run build
```

`open build/index.html` to view the generated page. 
Or alternatively run a simple express server
```
npm start
```
Then go to http://localhost:3000/ to view your page. 
 
### Editing Content
> All the contents are inside the `source` folder. Here's the only place you should edit

#### Posts
Each post is a seperate Markdown file. Save all your posts inside the `posts` folder. Once done, make sure you add the name of the post created to your posts key in the [YAML](https://github.com/shivkanthb/posted/blob/master/source/index.yml) file. Run `npm run build` to complete.
Rules for Markdown - Coming soon. 

#### Configs
The basic config info is on `./source/index.yml`
- title: The value enclosed in `<title></title>` for your page.
- site_url: The url for the `back to site` button
- type: blog | changelog
- posts: The posts to be displayed on the main page. The name of each post must match the name of the .md file in the `posts` folder.
> Note: The **order** used in the `posts` key is the order in which the posts are displayed on the generated site. 


### Contributing

#### Bug Reports & Feature Requests

Please use the [issue tracker](https://github.com/shivkanthb/posted/issues) to report any bugs or file feature requests.

#### Developing

PRs are welcome. 


