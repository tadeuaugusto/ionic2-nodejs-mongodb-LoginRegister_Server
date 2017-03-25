var express = require('express');
var app = module.exports = express.Router();
var Usuario = require('./user');

// POST - Create a new user (register)
app.post('/register', function(req, res) {
    
    var myUser = req.body.usuario; console.log('usuario ws: ' + myUser);
    
    var nome  = req.body.usuario.nome; console.log('var nome  = req.body.usuario.nome: ' + nome);
    var email = req.body.usuario.email; console.log('var email = req.body.usuario.email: ' + email);
    var senha = req.body.usuario.senha; console.log('var senha = req.body.usuario.senha: ' + senha);
    
    if (!nome || !email || !senha) {
        console.log("Erro 400: Mensagem em branco (POST)");
        return res.status(400).send({ "success": false, "msg": "Erro 400: Obrigatorio preenchimento de todos os campos (register POST)" });
    }
    

    var newUser = new Usuario();
    newUser.nome  = nome; console.log('newUser.nome: ' + newUser.nome);
    newUser.email = email; console.log('newUser.email: ' + newUser.email);
    newUser.senha = senha; console.log('newUser.senha: ' + newUser.senha);
    
    newUser.save(function(err) {
        if (err) {
            console.log("Erro criando usuario (POST): " + err);
            return res.json({"success": false, "msg": "Erro ao criar task (POST)", "error": err});
            // return res.status(500).send();
        }
        
        console.log("USUARIO CRIADO COM SUCESSO!!");
        res.status(201).send({"success": true, "msg": "Usuario criado com Sucesso!"});
    });
});


// POST - Login
app.post('/login', function(req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
    
    if (!username || !password) {
        console.log("Erro 400: Mensagem em branco (POST)");
        return res.status(400).send({ "success": false, "msg": "Erro 400: Mensagem em branco (login POST)" });
    }
    
    User.findOne({username: username, password: password}, function(err, user) {
        if (err) {
            console.log("Erro: " + err);
            return res.status(500).send({"success": false, "msg": "Erro ao efetuar login (POST)", "error": err});
            
        }
        
        if (!user) {
            return res.status(404).send({"success": false, "msg": "Erro ao efetuar login (POST)", "error": err});
        }
        
        // return res.status(200).send();
        return res.status(201).send({"success": true, "msg": "Login efetuado com Sucesso!"});
    });
});


// GET - Get all open Users
app.get('/usuarios/', function(req, res) {
   Usuario.find({}, function(err, usuarios) {
       if (err) {
           console.log("Erro ao recuperar as informações (GET): ", err);
        
           return res.json({"success": false, "msg": "Erro ao recuperar as informações (GET)", "error": err});
       }
       
       res.status(200).send({"success": true, "result": usuarios});
   });
});