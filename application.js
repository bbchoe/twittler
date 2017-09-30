$(document).ready(function(){
    var $body = $('body');
    var $top = $('.top');
    var $home = $('<button class="home">Home</button>');
    var $newRefresh = $('<button class="refresh">Update Feed</button>');
    var $tweetList = $('.tweet-list');
    var nextTweetToShow = 0;
    //        $body.html('');
    $home.prependTo($('.controls'));
    $home.hide();

    $('.refresh').on('click', showTweets);

    $home.on('click', function () {
        $tweetList.html('');
        $home.hide();
        $('.refresh').show();
        showTweets();
    });

    function showTweets () {
        // copy a fresh, undisplayed batch of tweets from streams.home
        $('.title-bar').text('Your Twittler Feed');
        $('.refresh').text('Show New Tweets');
        var tweetBatch = streams.home.slice(nextTweetToShow, streams.home.length);
        // sort the tweets
        tweetBatch.sort(tweetOrder);

        // display them in reverse chronological order
        var index = tweetBatch.length - 1;
        while(index >= 0){
            var tweet = tweetBatch[index];

            var $tweet = $('<div class="tweet"></div>');
            var $tweettext = $('<span class="tweettext"></span>');
            $tweettext.text(tweet.message);
            $tweettext.appendTo($tweet);
            var $timestamp = $('<span class="timestamp"></span>');

            $timestamp.text(cleanTimestamp(tweet.created_at));
            $timestamp.appendTo($tweet);
            $tweet.prependTo($tweetList);

            var $userlink = $('<button class="username"></button>');
            $userlink.text('@' + tweet.user);
            $userlink.data('userid', tweet.user);
            $userlink.prependTo($tweet);
            index -= 1;
        }

        // remove them from the array
        // capture last displayed tweet index
        nextTweetToShow += tweetBatch.length;
        tweetBatch.splice(0, tweetBatch.length);

        $('.username').on('click', function() {

            // get all tweets for this user
            var userToShow = $(this).data('userid');
            var userTweets = streams.users[userToShow].slice();

            $('.refresh').hide();
            $home.show();
            $('.title-bar').text('Tweets from ' + userToShow);
            $tweetList.html('');

            // sort the tweets
            userTweets.sort(tweetOrder);

            // display them in reverse chronological order
            var index = userTweets.length - 1;
            while(index >= 0){
                var tweet = userTweets[index];
                var $tweet = $('<div class="tweet"></div>');

                var $tweettext = $('<span class="tweettext"></span>');
                $tweettext.text(tweet.message);
                $tweettext.appendTo($tweet);

                var $timestamp = $('<span class="timestamp"></span>');

                $timestamp.text(cleanTimestamp(tweet.created_at));
                $timestamp.appendTo($tweet);
                $tweet.prependTo($tweetList);
                index -= 1;
            }
        });
    }
});

function tweetOrder(a, b) {
    if (a.created_at > b.created_at) {
        return -1;
    } else if (a.created_at < b.created_at) {
        return 1;
    } else {
        return 0;
    }
}

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
Ways that I would want to improve this:
1. Refactor function to show tweets as an external function that can be used for showing home and other user tweets
2. Understand why DOM elements created inside a function are not accessible outside of that function

Things I want to understand better:
1. Why does show / hide of my home and refresh buttons work, but not add and removal?

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
