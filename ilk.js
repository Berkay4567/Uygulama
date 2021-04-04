const express = require('express');
const sql = require('mssql')
var db = require("mssql/msnodesqlv8")
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
var dbConfig = {
    server: "DESKTOP-DLPHK52\SQLEXPRESS",
    database: "Magaza",
    driver: "msnodesqlv8",
    port: 1433,
    options: {
        "enableArithAbort": true,
        trustedConnection: true
    }
};
//let sqlSorgusu = `SHOW TABLES;`;
(async function() {
    try {
        console.log("sql connecting......")
        let pool = await sql.connect(dbConfig)
        let result = await pool.request().query('select * from Table_11') // subject is my database table name
            /*
            -----SQL SÜRÜCÜSÜ VE SQLSÜRÜMÜ ÇATIŞMASI-----
            =2014 SÜRÜCÜSÜ VE MSSQL 2017 ÇAKIŞTI=
            let sqlSorgusu = `SHOW TABLES;`;
            let sqlSorgusu = `DELETE FROM Table_11 WHERE UrunID= 1`;
            let sqlSorgusu = `UPDATE Table_11 SET Baslik = 'deneme', Fiyat = 'denemeTL',Resim = 'deneme.png',Aciklama = 'deneme' WHERE UrunID = 3`;
        
            */
        console.log(result)

    } catch (err) {
        console.log(err);
    }

})()

//let sqlSorgusu = `SELECT * FROM Table_11`;

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

app.listen(4000);