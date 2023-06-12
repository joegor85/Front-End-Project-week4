# Front-End-Project-week4

## Purpose:

The goal of this project was to practice pulling data from API's and building an interface for it with some interactivity.

## Library used:

jQuery

## API used:

xkcd comics (https://xkcd.vercel.app/)

## What this application does:

The purpose of this page is for a user (you) to sift through randomly generated xkcd comics for entertainment purposes, select ones that you like, and add them to a list of favorites that you can then view at the bottom as well as export those image links for bookmarking or other purposes.

To begin, just click on the top button ("Fetch random xkd comics!!!"). This will display a list of 20 titles to choose from.

Click on a title to get a preview of that particular comic with some other information about ithe comic and when it was made. If you like that particular one, you can paste its number (found in the description below the comic) into the "Add to favorites" input box. Click "Add to Favorites" to add it to the display at the bottom.

Once you have a collection of your favorites, click the "Collect links!" button to view the comic number and its url. You can bookmark these URL's for later use on your device or you can share with a friend if you wish.

You can also remove favorites from your list. Also, this data is now stored in local storage across browser sessions. You can come back to this page later and reload your favorites! You can also clear out your favorites and start fresh.

### Other notes

It was tricky to find a user-friendly API for this project that did not require tokens or cors restrictions. I decided on an xkcd API and I ran into CORS errors that I could not solve with help of others. I was able to find another one that worked well though.
