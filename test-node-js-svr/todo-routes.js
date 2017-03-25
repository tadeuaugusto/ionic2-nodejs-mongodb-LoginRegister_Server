var express = require('express');
var app = module.exports = express.Router();
var Todo = require('./todo');

// POST - Create a new task
app.post('/todos', function(req, res) {
    if (!req.body.text) {
        console.log("Erro 400: Mensagem em branco (POST)");
        return res.status(400).send({ "success": false, "msg": "You need to send the text of the todo!" });
  
        /*
        return res.status(400)
            .send([ "success": false, "msg": "Erro 400: Mensagem em branco (POST)"]);
        */
    }
    
    var newTodo = new Todo({
        text: req.body.text
    });
    
    newTodo.save(function(err) {
        if (err) {
            console.log("Erro ao criar task (POST): ", err);
            return res.json({"success": false, "msg": "Erro ao criar task (POST)", "error": err});
        }
        
        res.status(201).send({"success": true, "msg": "Task criada com Sucesso!"});
    });
});


// GET - Get all open Todos
app.get('/todos/', function(req, res) {
   Todo.find({}, function(err, todos) {
       if (err) {
           console.log("Erro ao recuperar as informações (GET): ", err);
        
           return res.json({"success": false, "msg": "Erro ao recuperar as informações (GET)", "error": err});
       }
       
       res.status(200).send({"success": true, "result": todos});
   });
});



// DELETE - Remove one todo by its id
app.delete('/todos/:todoId', function(req, res) {
    var lectionId = req.params.todoId;
    if (!lectionId || lectionId === "") {
        console.log("Id da task em branco (DELETE): ", err);
        return res.json({ "success": false, "msg": "You need to send the ID of the Todo", "error": err });
  
        /*
        return res.json({"success": false, "msg": "Id da task em branco (DELETE)"}, "error": err);
        */
    }
    
    Todo.findByIdAndRemove(lectionId, function(err, removed) {
       if (err) {
            console.log("Erro ao tentar deletar a task (DELETE): ", err);
           return res.json({"success": false, "msg": "Erro ao tentar deletar a task (DELETE): ", "error": err});
       } 
    
    res.status(200).json({"success": true, "msg": "Task deletada!"});
        
    });
});


/*
// GET BY ID
app.get('/todos/:todoId', function(req, res) {
    var lectionId = req.params.todoId;
    if (!lectionId || lectionId === "") {
        console.log("Id da task em branco (getById): ", err);
        return res.json({"success": false, "msg": "Id da task em branco (getById)"}, "error": err);
    }
    
    Todo.findById(lectionId, function(err, todo) {
       if (err) {
            console.log("Erro ao tentar deletar a task (DELETE): ", err);
           return res.json({"success": false, "msg": "Erro ao tentar recuperar a task (getById): ", "error:", err});
       }
        
       res.status(200).json({"success": true, "msg": todo});
    });    
});
*/