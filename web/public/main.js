async function loadData() {
    const data = JSON.stringify({
        query: `{
      quotes {
        name
        quote
      }
    }`,
    });
    const response = await fetch('/graphql',
        {
          method: 'post',
          body: data,
          headers: { 'Content-Type': 'application/json' },
        });
    const quotes = await response.json();
    for (let i = 0; i < quotes.data.quotes.length; i++) {
        createQuote(quotes.data.quotes[i]);
    }
}

function createQuote(quote) {
    let ul = document.getElementsByClassName("quotes")[0];
    var li = document.createElement('li');
    li.innerHTML = `<span>${quote.name}:</span><span>${quote.quote}</span><button type="text" onclick="updateQuote(event)">Update</button><button type="text" onclick="deleteQuote(event)">Delete</button>`;
    ul.appendChild(li);
}

async function createQuoteInDb(event) {
    event.preventDefault();
    let nameVal = document.getElementsByName("name")[0].value;
    let quoteVal = document.getElementsByName("quote")[0].value;
    if (!quoteVal) {
        quoteVal = "";
    }
    const data = JSON.stringify({
        query: `mutation createQuote($name: String!, $quote: String)  {
                createQuote(name: $name, quote: $quote) {
                    name
                    quote
                }
          }`,
        variables: `{
            "name": "${nameVal}",
            "quote": "${quoteVal}"
          }`,
    });
    let response = await fetch('/graphql',
    {
      method: 'post',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    });
    const quote = await response.json();
    createQuote(quote.data.createQuote);
    document.getElementsByName("name")[0].value = "";
    document.getElementsByName("quote")[0].value = "";
}

async function updateQuote(event) {
    var name=event.target.previousSibling.previousSibling.innerText.slice(0,-1)
    var quote=event.target.previousSibling.innerText
    const data = JSON.stringify({
        query: `mutation updateQuote($name: String!, $quote: String)  {
            updateQuote(name: $name, quote: $quote) {
                    name
                    quote
                }
          }`,
        variables: `{
            "name": "${name}",
            "quote": "${quote}"
          }`,
    });
    let response = await fetch('/graphql',
    {
      method: 'post',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    });
    const quoteResponse = await response.json();
    event.target.previousSibling.previousSibling.innerText = quoteResponse.data.updateQuote.name;
    event.target.previousSibling.innerText = quoteResponse.data.updateQuote.quote;
}

async function deleteQuote(event) {
    var name=event.target.previousSibling.previousSibling.previousSibling.innerText.slice(0,-1)
    const data = JSON.stringify({
        query: `mutation deleteQuote($name: String!)  {
            deleteQuote(name: $name) {
                    name
                    quote
                }
          }`,
        variables: `{
            "name": "${name}"
          }`,
    });
    let response = await fetch('/graphql',
    {
      method: 'post',
      body: data,
      headers: { 'Content-Type': 'application/json' },
    });
    const quote = await response.json();
    event.target.parentNode.remove();
}

loadData()