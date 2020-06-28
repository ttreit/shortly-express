INSERT INTO sessions (hash, userId) VALUES ('2a990382005bcc8b968f2b18f8f7ea490e990e78', '');


//**************************** */
//TEST DELETE THIS
//// parseCookies

app.get('/testcookie', (req, res) => {
  let test = cookie(req, res);
  console.log('TEST****: ', test);
});

//**************************** */
