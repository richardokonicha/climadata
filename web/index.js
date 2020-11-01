function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("authors");
const url = "https://thingspeak.com/channels/1199738/feed.json";
fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let feeds = data.feeds;
    let channels = data.channels;
    console.log(data);
    console.log(ul);
    return feeds.map(function (feed) {
      let li = createNode("li"),
      h2 = createNode("h2");
    //   img.src = author.picture.medium;
      h2.innerHTML = `${feed.entry_id} ${feed.created_at}`;
    //   append(li, img);
      append(ul, h2);
    //   append(ul, li);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
