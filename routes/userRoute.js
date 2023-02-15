const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
    try{
        con.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.get('/:id', (req, res) => {
    try{
        con.query(`SELECT * FROM users WHERE user_id=${req.params.id}`, (err, result)=>{
            if(err) throw err;
            res.send(result);
        });
    } catch(error) {
        console.log(error);
        res.status(400).send(error)
    }
});

router.post('/', (req, res)=> {
    try{
        con.query(`INSERT INTO users (full_name, email, billing_address, default_billing_address, country, phone)VALUES('${req.body.full_name}', '${req.body.email}', '${req.body.billing_address}', '${req.body.default_billing_address}', '${req.body.country}', '${req.body.phone}')`, (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Created User: ", {id:res.insertId, ...req.body});
        });
        res.status(200).send({
            message: "Added to Users"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.put('/:id', (req, res)=> {
    try {
          con.query("UPDATE users SET full_name = ?, email = ?, billing_address = ?, default_billing_address = ?, country = ?, phone = ? WHERE user_id = ?", [req.body.full_name, req.body.email, req.body.billing_address, req.body.default_billing_address, req.body.country, req.body.phone, req.params.id], (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            console.log("User is Updated: ", {id:req.params.id, ...req,body});
          })
          res.status(200).send({
            message: "User is Updated"
          })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});

router.delete('/:id', (req, res) =>{
    try{
        con.query("DELETE FROM users WHERE user_id = ?", req.params.id, (err, res) =>{
            if(err){
                console.log(err);
                return;
            }
            if(res.affectedRows == 0) {
                console.log("User has not been found");
                return;
            }
            console.log("Deleted user with id:", req.params.id);
        })
        res.status(200).send({
            message: "User has been Deleted"
        })
    } catch(error){
        console.log(error);
        res.status(400).send(error)
    }
});


module.exports = router;