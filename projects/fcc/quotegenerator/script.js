var getQuotes = function () {
  $.ajax({
    type: "POST",
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10",
    headers: {
      'X-Mashape-Key': 'X7E4CWYMQ6msh7t9bo6bqBiyrmOop1qbIJTjsnlmSQtfy9M1kq'
    },
    success: function (data) {
      console.log(data)
      app.quotes = app.quotes.concat(data);
    }
  });
}

$('#close').on('click', function () {
  $('.slide').toggle();
})

var app = new Vue({
  el: '#app',
  data: {
    text: "Hello from Vue!",
    quotes: [{
      "quote": 'Coding is my passion! Click on "New Quote" to start the Random Quote Generator',
      "author": "Abialbon Paul"
    }],
    qindex: 0,
    twQuote: ""
  },
  methods: {
    getQuotes: function () {
      getQuotes();
    },
    nextQuote: function () {
      if (this.qindex == this.quotes.length - 2) {
        this.getQuotes();
        this.qindex++;
      } else {
        this.qindex++;
      }
    },
    tweet: function () {
      window.open(this.twQuote)
    }
  },
  created: function () {
    getQuotes();
  },
  updated: function () {
    app.twQuote = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURI(app.quotes[app.qindex].quote) + ' - ' + encodeURI(app.quotes[app.qindex].author);
    $('.btn-container #tweetbtn a').attr('href', app.twQuote);
  }
});