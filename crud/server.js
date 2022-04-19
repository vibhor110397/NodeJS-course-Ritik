const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const swaggerUI=require('swagger-ui-express');
const swaggerJsDoc=require('swagger-jsdoc');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title:"CRUD API",
            version:"1.0.0",
            description:"A simple Express Library API"
        },
        servers:["127.0.0.1:3000"]
    
    },
    apis: ["server.js"]
}
const specs=swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs));

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))
app.use(bodyparser.json());
// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
/** 
 *  @swagger 
 *  definitions:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              gender:
 *                  type: string
 *              status:
 *                  type: string
 *  
 */
/** 
/** 
 *  @swagger 
 * /api/users/:
 *   get: 
 *     description: Get all user
 *     responses:  
 *       200: 
 *         description: Success   
 */
/** 
 *  @swagger 
 * /api/users/:
 *   post: 
 *     summary: Creates a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          $ref: '#/definitions/User'
 *   
 *     responses:  
 *       200: 
 *         description: Success   
 */
/** 
 *  @swagger 
 * /api/users/{id}/:
 *   put: 
 *     summary: update new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          $ref: '#/definitions/User'
 
 *     responses:  
 *       200: 
 *         description: Success   
 */
/** 
 *  @swagger 
 * /api/users/{id}/:
 *   delete: 
 *     summary: delete a user.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: string
 *     responses:  
 *       200: 
 *         description: Success   
 */
 

app.use('/', require('./server/routes/router'))

let server=app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

module.exports = server