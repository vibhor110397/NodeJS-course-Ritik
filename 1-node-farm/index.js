const fs=require('fs');
const http=require('http');
const url=require('url');
const replaceTemplate=require('./module/replaceTemplate');

////////////////////
//FILES
//Blocking synchronus
// const textIn=fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut=`This is what we know about the avocode: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);

//Non-blocking ,asynchronus way
// fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//     if(err){
//         return console.log('Error');
//     }
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('your file is written');
//             });
        
//         });
//     });
// });
// console.log("will read file");

////////////////////
//SERVER

const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
 const dataObj=JSON.parse(data);
 
const server=http.createServer((req,res)=>{
    
    const {query,pathname}=url.parse(req.url,true);
    

    if(pathname==='/'|| pathname==='/overview'){
        res.writeHead(200,{'content-type':'text/html'});

        const cardHtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('');
        const output=tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
        
        res.end(output);
    }
    else if(pathname==='/product'){
        const product=dataObj[query.id];
        res.writeHead(200,{'content-type':'text/html'});
        const output=replaceTemplate(tempProduct,product);
        res.end(output);
    }
    else if(pathname==='/api'){
        res.writeHead(200,{'content-type':'application/json'});
            res.end(data);
        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
        //     const productData=JSON.parse(data);
        //     res.writeHead(200,{'content-type':'application/json'});
        //     res.end(data);
        // })
        
    }
    else{
        res.writeHead(404,{
            'content-type':'text/html'
        });
        res.end('<h1>Page not found</h1>');
    }
    
}); 

server.listen(8000,'127.0.0.3',()=>{
    console.log('listening to request on port 8000');
});