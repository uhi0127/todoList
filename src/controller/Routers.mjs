import express from 'express';
import mysql from "mysql";
import { sqlAccount } from '../config/sqlAccount.mjs';

// body-parser 미들웨어 추가
import bodyParser from 'body-parser'; 
// import bodyParser from 'Url';
const app = express();
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
const sqlConn = mysql.createPool(sqlAccount);

class Routers{
   constructor( id ){
      this.id = id;
      this.router = express.Router();
      this.datas = {
         contents : [],
         category : []
      }
   }
   
   query( sql, params ){
      return new Promise((resolve, reject) => {
         sqlConn.query(sql, params, (err, results) => {
            if (err) {
               return reject(err);
            }
            
            resolve(results);
         });
      });
   };

   on(){
      this.router
      .get('/', async (req, res) => {         
         try {
            const contents_results = await this.query('select * from contents');
            const cate_results = await this.query('select * from cate_list');
            console.log("Connect OK");
            this.datas = {
               contents: [...contents_results],
               category: [...cate_results]
            };
            console.log(this.datas);
            console.log("===================================");
            res.render("./main.pug", { data: this.datas });
         } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
         }
      })
      .post('/',(req,res)=>{
         try{
            const { selectedValueInnerHTML,todos_input_content, todos_input_time_from, todos_input_time_to, inputCategory } = req.body;
            const insertFormData = `INSERT INTO contents (category, content, times_from, times_to) VALUES (?, ?, ?, ?)`;
            const contentInputList = [ selectedValueInnerHTML,todos_input_content, todos_input_time_from, todos_input_time_to ];
            
            const addCategories = `INSERT INTO cate_list (category) VALUES (?)`;
            const categoryInputList = [ inputCategory ];

            sqlConn.query( insertFormData, contentInputList, async ( err, results ) => {});
            sqlConn.query( addCategories, categoryInputList, async ( err, results ) => {});

            res.end();
         }catch(e){
            return res.status(500).json({ success: false, message: 'Unexpected Server Error', error: e.message });
         }
      });
   }
};

const routers = new Routers("routers");
routers.on();
export default routers.router;