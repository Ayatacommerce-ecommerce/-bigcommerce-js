const graphql = async (token,query_) => {
// graphql call 
var responce = await fetch('/graphql', {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`},
    body: JSON.stringify({
        query: query_
  }),
  })
  .then(res => res.json())
  .then(data1 => {
      console.log("worked", data1)
      return data1
  })
  return responce
}