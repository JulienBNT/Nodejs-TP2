const express = require('express')
const app = express()
const cors = require('cors')

app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/techno', technoRoute)


app.listen(8000, function(){
    console.log("serveur ouvert sur le port 8000");
})