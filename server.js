const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server start listening on port ${port}`);
    console.log(`visit http://localhost:${port}`);
});