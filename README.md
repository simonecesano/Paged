# Paged - an object for paging through arrays 

## Synopsis

    var a = [ "a", "b", "c", "f", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "z" ] 

    var p = Paged(a, 7);

    console.log(p.page(1))
    // [ "a", "b", "c", "d", "e", "f", "g" ]
    
    console.log(p[1])
    // also [ "a", "b", "c", "d", "e", "f", "g" ]
    
    console.log('pages', p.lastPage)
    // 4

    var i = 0; var pageResults;

    while (pageResults = p.next()) {
        console.log(`page ${i}:`, pageResults)
        // page 1: Array(7) [ "a", "b", "c", "f", "e", "f", "g" ] etc.
        i++;
    }

    for (var i = 1; i <= p.lastPage; i++){
        console.log(`page ${i}:`, , p.page(i))
        // ...page 2: Array(7) [ "h", "i", "j", "k", "l", "m", "n" ]
    }

## Constructor

    var p = new Paged(arrayOfData, pageLength)

Takes an array, and the page length, which must be a positive integer

## Getters and setters

- __all__: returns the data array
- __currentPage__: sets or gets the current page number; takes a positive integer as parameter; initially set at 1
- __currentPageItems__: gets items on the current page; takes a positive integer as parameter
- __pageLength__: sets or gets the number of items on each page; takes a positive integer as right value; defaults at 10; when set, recalculates the current page number so that the current page shows the same items as before setting the new length
- __nextPage__: returns the page number for the next page, or undefined if already on the last page
- __prevPage__: returns the page number for the previous page, or undefined if already on the first page
- __lastPage__: returns the page number for the last page

### Examples

    var a = [ "a", "b", "c", "f", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "z" ] 

    var p = Paged(a, 7);
    
    p.currentPage = 3
    console.log(p.currentPageItems)
    // Array(7) [ "o", "p", "q", "r", "s", "t", "u" ]
    console.log(p.lastPage)
    // 4

    p.pageLength = 5;
    console.log(p.currentPage)
    // 4
    console.log(p.lastPage)
    // 5
    console.log(p.currentPageItems)
    // Array(5) [ "p", "q", "r", "s", "t" ]


## Methods  

- __page__: takes a page number and returns the array slice on that page
- __next__: iterates through pages and returns the items on the next page; the first call returns the _first_ page
- __reset__: resets the current page number and the iterator for `next()`


*/
