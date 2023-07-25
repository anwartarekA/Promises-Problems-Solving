let separator = document.createTextNode("(first five with promise and second five with fetch)");
let p = document.createElement('p');
p.appendChild(separator);
p.style.cssText='font-size:25px; color:red;'
let myPromise = new Promise(function(resolve,reject){
    let myRequest = new XMLHttpRequest();
    myRequest.onload = function()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            resolve(this.responseText);
        }
        else
        {
            reject(Error('No request Found!'));
        }
    }
    myRequest.open('GET','article.json');
    myRequest.send();
}).then(
    (resolveValue)=>{
        let data = JSON.parse(resolveValue);
        console.log(data);
        for(let i=0;i<5;i++)
        {
            let div = document.createElement('div');
            div.innerHTML = `  
                            <h2>${data[i].title}</h2>
                            <p>${data[i].description}</p>
            
                        `
        document.body.appendChild(div);
        }
        document.body.appendChild(p);
    },
    (rejectValue)=>{console.log(rejectValue)}
)

'========================================================'
fetch("article.json").then((resolveValue)=>{
    let data = resolveValue.json();
    return data;
}).then((mydata)=>{
   for(let i=0;i<5;i++)
   {
        let mydiv = document.createElement('div');
        let mytitle = document.createElement('h2');
        let mytitleText = document.createTextNode(mydata[i].title);
        mytitle.appendChild(mytitleText);
        let paragraph = document.createElement('p');
        let paragraphText= document.createTextNode(mydata[i].description);
        paragraph.appendChild(paragraphText);
        mydiv.appendChild(mytitle);
        mydiv.appendChild(paragraph);
        document.body.appendChild(mydiv);
   }
})