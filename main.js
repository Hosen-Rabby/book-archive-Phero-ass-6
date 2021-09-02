// search book function

const search = () =>{

	const searchField = document.getElementById('search_field');
	const searchText = searchField.value;
	searchField.value = '';
	const url = `http://openlibrary.org/search.json?q=${searchText}`;
	// console.log(url);
	fetch(url)
		.then(res => res.json())
		.then(data => grabProperties(data));

}

// grab properties from api

const grabProperties = (properties) =>{
	const totalFound = properties;
	const searchTotal = document.getElementById('search_total');
	searchTotal.innerHTML = '';
	const div = document.createElement('div');
	// count search result
	if(totalFound.numFound > 0 ){
		div.innerHTML = `
		<h4>Total search result ${totalFound.numFound}
		</h4>
		`;
	}
	else{
		div.innerHTML = `
		<h4>No results found</h4>
		`;
	}

	searchTotal.appendChild(div);

	const totalItems = properties.docs;
	console.log(properties.docs);

	const addItems = document.getElementById('add_items');
	addItems.innerHTML = '';

	// looping for each elements

	totalItems.forEach(item  => {

		const itemTitle = item.title;
		const authorName = item.author_name;
		const publisher = item.publisher;
		const publisherSelect = publisher.slice(0, 2);
		const firstPublish = item.first_publish_year;
		const cover = item.cover_i;

		const url = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;

		const div = document.createElement('div');
		div.classList.add('col-lg-3');

		// adding elements
		
		div.innerHTML = `
		<div>
			<img src="${url}" class="img-fluid" alt="No Image Found">
			<h4>${itemTitle}</h4>
			<p>Author: ${authorName}</p>
			<p>Publisher: ${publisherSelect}</p>
			<p>First published: ${firstPublish}</p>
		</div>
		`;
		// addItems.innerHTML = '';

		addItems.appendChild(div);
	});


}