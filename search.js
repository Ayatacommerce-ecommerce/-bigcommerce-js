// test 
var data = document.currentScript.getAttribute('one');

// graphql call 
fetch('/graphql', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json',
             'Authorization': `Bearer {{ settings.storefront_api.token }}`},
    body: JSON.stringify({
        query: `
        query productById{
site {
product(entityId: '200') {

  entityId
  name

inventory
  {
    isInStock
  }
    availabilityV2{
    ... on ProductPreOrder {
        message
        status
      }
    status
  }
  path
}
}
}

`
  }),
  })
  .then(res => res.json())
  .then(data1 => {
      console.log("worked", data1)
  })