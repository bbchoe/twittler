$(document).ready(function(){
  var $body = $('body');
  var $top = $('.top');
  var $tweetList = $('.tweet-list');
  var tweetBatch = [];
  var nextTweetToShow = 0;
//        $body.html('');
  $('.refresh').on('click', function () {
// copy a fresh, undisplayed batch of tweets from streams.home
  tweetBatch = streams.home.slice(nextTweetToShow, streams.home.length - 1);
// sort the tweets
  tweetBatch.sort(function(a, b) {
    if (a.created_at > b.created_at) {
      return -1;
    } else if (a.created_at < b.created_at) {
      return 1;
    } else {
      return 0;
    }
  });
// display them in reverse chronological order
  var index = tweetBatch.length - 1;
    while(index >= 0){
    var tweet = tweetBatch[index];
    var $tweet = $('<div></div>');
    $tweet.text('new set ------------');
    $tweet.prependTo($tweetList);

    var $userlink = $('<div></div>');
    $userlink.text('@' + tweet.user);
    $userlink.prependTo($tweetlist);

    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' timestamp: ' + cleanTimestamp(tweet.created_at));
    $tweet.prependTo($tweetList);
    index -= 1;
  }
// remove them from the array
// capture last displayed tweet index
  nextTweetToShow += tweetBatch.length;
  tweetBatch.splice(0, tweetBatch.length);
  });
});

function cleanTimestamp(dateObj) {
  // gets date object
  // returns user friendly date and time string
  var mo = dateObj.getMonth();
  var dayNumber = dateObj.getDate();
  var year = dateObj.getFullYear();
  var dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short'
  }
  var timeOptions = {
    timeZoneName: 'short'
  }
  return dateObj.toLocaleTimeString('en-US', timeOptions) + ' ' + dateObj.toLocaleDateString('en-US');
}
