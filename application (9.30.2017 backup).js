$(document).ready(function(){
    var $body = $('body');
    var $top = $('.top');
    var $tweetList = $('.tweet-list');
    var nextTweetToShow = 0;
    //        $body.html('');
    $('.refresh').on('click', function () {
        // copy a fresh, undisplayed batch of tweets from streams.home
        var tweetBatch = streams.home.slice(nextTweetToShow, streams.home.length);
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

            var $tweet = $('<div class="tweet"></div>');
            $tweet.text(tweet.message + ' timestamp: ' + cleanTimestamp(tweet.created_at));
            $tweet.prependTo($tweetList);

            var $userlink = $('<button class="username"></button>');
            $userlink.text('@' + tweet.user);
            $userlink.data('userid', tweet.user);
            // console.log('userlink data: ', $userlink.data('userid'));
            $userlink.prependTo($tweet);
            index -= 1;
        }

        // remove them from the array
        // capture last displayed tweet index
        nextTweetToShow += tweetBatch.length;
        tweetBatch.splice(0, tweetBatch.length);

/*
        $('.username').on('click', function() {
            // $tweetList.html('');
            // get all tweets for this user
            console.log($(this).data('userid'));
*/
            // sort the tweets
            // display them in reverse chronological order
        });
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

/*

How to make username clickable?
Best way to show list of tweets associated with user?
If I treat other user tweets as a separate page, how to handle navigation and sorting?

Possible strategy:
Handle other user tweets as another page
Navigate to other page and show only tweets for that user
Provide navigation to back to this user's home

Alternate strategy:
If user clicks on another user's name, change existing window to show tweets only for that user
Provide means to restore back primary user's tweets

*/
