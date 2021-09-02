// handle search button
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    // clear data
    searchField.value = '';
    // error
    const errorDiv = document.getElementById('error');
    if(searchText === ''){
        errorDiv.innerText = 'search field can not be empty';
        return;
    }
    else{
        errorDiv.innerText = '';
    }
        
    // load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs))

}

// display search result data
const displaySearchResult = (docs) => {

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
 
    // total books result
    const totalBooks = document.getElementById('total-books');
        totalBooks.innerText = `search result: ${docs.length}`;
        totalBooks.style.textAlign = 'center'
        totalBooks.style.paddingBottom = '20px' 
    
        // // error handling
    if(docs.status === 404){
        document.getElementById('error').innerText = 'No Result Found'
    } else{
        document.getElementById('error').innerText = '';
    }


    docs.forEach(book => {
        console.log(book);
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body text-center">
              <h5 class="card-title"> Name: ${book.title}</h5>
              <h6> Author: ${book.author_name}</h6>
              <p>Publisher: <small> ${book.publisher[0]} </small></p>
              <small> First Published Year: ${book.first_publish_year}</small>
            </div>
        </div>
        `;
        searchResult.appendChild(div);

    });
    

}

