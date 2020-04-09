var pageLengthIsValid = function(){
    var l = arguments[0];
    return (l === undefined) || (Number.isInteger(l) && l > 0)
}

export default class Paged {
    constructor(array, pageLength) {
	if (!pageLengthIsValid(pageLength)) { throw "Page length must be a positive integer" };
	
	this.a = array;              // the data
	this.l = pageLength || 10;   // length of each page
	this.p = 1;                  // current page

	/**
	 * @param {Array} array The data
	 * @param {Integer} pageLength The number of items on each page - must be positive
	 */
	
	return new Proxy(this, {
	    get: function(target, prop) {
		// console.log(target, prop)
		if (target[prop] === undefined) {
		    if (Array.prototype[prop]) {
			// console.log('Array function')
			// var a = target.a;
			return function(){
			    return target.a[prop](...arguments);
			};
		    } else if (Number.isInteger(parseFloat(prop))) {
			// console.log("Prop is a number")
			return target.page(parseFloat(prop));
		    } else {
			throw `property or function ${prop} is not defined`
		    }
		} else {
		    return target[prop];
		}
	    }
	})
    }

    
    get all(){ return this.a }
    
    set currentPage(p){ return this.p = p }
    get currentPage(){ return this.p }
    get currentPageItems(){ return this.page(this.p) }

    get prevPage(){ return this.p == 1 ? undefined : this.p - 1 }
    get nextPage(){ return this.p == this.lastPage ? undefined : this.p + 1 }
    get lastPage(){ return Math.ceil(this.a.length / this.l) }

    set pageLength(l){
	if (!pageLengthIsValid(l)) { throw "Page length must be a positive integer" };
	
	var f = 1 + this.l * (this.p - 1); // index of last item on current page;
	var p = 1 + (f / l);
	this.p = Math.floor(p);
	this.l = l;
	return this.l
    }
    get pageLength(){ return this.l }

    page(p){
	if (p <= 0) { throw `page number must be positive` }
	var s = (p - 1) * this.l;
	var f = s + this.l
	return this.a.slice(s, f);
    }
    
    reset(){ this.currentPage = 1 }

    next(){
	var r = this.page(this.p)
	this.p++;
	return r.length ? r : false;
    }
}
			
/** __DOCS__

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
