# What is this?

These are my crib notes for the talk I'm giving at Hamilton's CoderCamp, June 14, 2017 at Phesant Plucker.

## Intro

* Ramda is a functional programming framework for JavaScript
* It focuses on small, composable, reusable functions, and encourages a point-free style
* Features:
    * Higer-order functions (functions that take another function as an input, OR return a function as the output)
    * Function-first, data last, API
    * Automatic currying
    * Function composition
    * Immutability
* All internal code is ES3-compliant (works back to IE6)
* No dependencies! https://github.com/ramda/ramda/blob/master/package.json#L55
* So, let's talk about currying...

## Ex 0 (Rogers)

1. Change to a .map
2. Require Ramda
3. Use R.multiply(1.10, plans[i].price)
4. Show auto-currying (R.multiply(1.10, plans[i].price) => R.multiply(1.10)(plans[i].price))
5. Extract multiplyer
6. Contrived example; Could do more, but let's jump ahead

## Ex 1 (YouTube Views)

1. Filter out only videos w/ views
`youtubeVideos = youtubeVideos.filter(video => 'views' in video);`

2. Map out the views of the videos
`youtubeVideos = youtubeVideos.map(video => video.views);`
3. 'Combine' these two steps
4. const R = require('ramda')
5. Use R.pipe:
```
     R.pipe(
         R.filter(...),
         R.map(...)
     )(youtubeVideos)
```
 *    They accept the function as the _first_ argument, and the thing that you want to applied as the second argument
6. Change filter internal to R.has('views')
7. Change map internal to R.prop('views')
 * Ramda encourages a 'point-free' style; Combine functions so you're dealing with the data less
8. To make it point free, and the function only takes one argumetn, we can change it so that:
`const getViews = R.pipe...`
9. Show compose (reverse order)

## Ex 2

1. Break it up so it's one string of if/else statements
 *      NOTE: We want to make things as similar as possible to help with refactoring
2. Bring in Ramda
3. R.is(ErrorWithStatus, error); R.is(ValidationError, error)
4. R.propEq('type', 'PaymentNotIncluded', error)
5. But `if error is null || undefined`, R.propEq will fail, so add to the top:
```
if (!Boolean(error)) {
    return 500;
}
```
6. `R.test(/not found/i, error)`
7. `R.always(true, error)`
8. Now all functions have the same last argument! This is very curry friendly!
9. Convert to Cond expression:
```
     R.cond([
         [predicateFunction, transformationFunction],
         [R.always(true), errorToStatusCodeOrig]
     ])(error);
```
 *    predicateFunction takes a value and returns true or false.
 *    transformationFunction takes that same value and transforms it in some way
 *    Goes from top to bottom
10.  [R.isNil, R.always(500)],
     [R.is(ErrorWithStatus), R.prop('status')],
     [R.is(ValidationError), R.always(400)],
     [R.propEq('type', 'PaymentNotIncluded'), R.always(402)],
     [R.test(/not found/i), R.always(404)],
     [R.always(true), R.always(500)]
11. Now, get rid of the error from the function:
     `const errorToStatusCode = R.cond...`

## Ex 3 (Albums / Lenses)

1. const R = require('ramda')
2. Build lenses for artist & name
3. Compose the lenses together
4. Refactor setArtist:
     4a. return R.set(artistNameLens, artistName, album)
5. Refactor addMetadata:
     5a. return R.over(artistLens, R.merge(metadata), album)
6. Refactor getArtist:
     6a. return R.view(artistNameLens, album)
7. Remove shallowClone
8. Let Ramda build the functions!
     8a. const setArtist = R.set(artistNameLens);
     8b. const getArtist = R.view(artistNameLens);

## What function should I use?

https://github.com/ramda/ramda/wiki/What-Function-Should-I-Use%3F