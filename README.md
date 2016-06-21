# Airbnb-Tool
A easy tool to download airbnb data.

<h3>Step</h3>
1: Install node.js and install modules

~~~javascript
$ npm install	
~~~

<hr>
<h3>Search by Location</h3>
search.js		

~~~javascript
$ node search 'location' startPage endPage
~~~
<h4>example:</h4>
~~~javascript
$ node search Tokyo 1 200
~~~
<hr>

<h3>Search By Guest ID</h3>	
~~~javascript
$ node searchFromID.js
~~~		
you can define the start id at 'temp/id.json'

<hr>

all the data will post to server which defined at data.js
