global.fetch = require("node-fetch");
function myfunc(){
    document.getElementById('accordion').innerHTML = "";
    var handle = document.getElementById('handle').value;
    var url = "https://codeforces.com/api/user.status?handle="+handle+"&from=1";
    async function sub(url){
        var res = await fetch(url);
        var response = await res.json();
        Show(response);
    }
    sub(url);
}
function Show(response){
    if(response['status'] == 'OK'){
        var links = {};
        var arr1 = {800:[],900:[],1000:[],1100:[],1200:[],1300:[],1400:[],1500:[],1600:[],1700:[],1800:[],1900:[],2000:[],2100:[],2200:[],2300:[],2400:[],2500:[],2600:[],2700:[],2800:[],2900:[],3000:[],3100:[],3200:[],3300:[],3400:[],3500:[]};
        var arr = {800:[],900:[],1000:[],1100:[],1200:[],1300:[],1400:[],1500:[],1600:[],1700:[],1800:[],1900:[],2000:[],2100:[],2200:[],2300:[],2400:[],2500:[],2600:[],2700:[],2800:[],2900:[],3000:[],3100:[],3200:[],3300:[],3400:[],3500:[]};
        for(var i = 0; i<response.result.length; ++i){
            if(response.result[i].verdict == "OK" && response.result[i].problem.rating>=800 && response.result[i].problem.rating<=3500){
                arr[response.result[i].problem.rating].push(response.result[i].problem.name);
                var str = 'https://codeforces.com/problemset/problem/'+response.result[i].problem.contestId+'/'+response.result[i].problem.index;
                links[response.result[i].problem.name] = str;
            }
        }
        console.log(links);
        function removewithfilter(arr) { 
            let outputArray = arr.filter(function(v, i, self) 
            { 
                return i == self.indexOf(v); 
            }); 
          
            return outputArray; 
        } 
        for(var i = 800; i<=3500; i+=100){
            arr1[i] = removewithfilter(arr[i]);
        }
        var str ="";
        for(var i = 800; i<=3500; i+=100){
            if(arr1[i].length>0){
            var lett = i+"R";
            document.getElementById('accordion').innerHTML += "<table class='table table-hover table-dark'><thead><tr><th style='text-align: center;' scope='col'>" + i +" Problem || Solved - "+ arr[i].length +"</th></tr></thead><tbody id='"+ lett +"'></tbody></table>";
            for(var j = 0; j<arr1[i].length; ++j){
                    document.getElementById(lett).innerHTML += "<tr><td style='text-align: center;'><a href ='"+links[arr1[i][j]]+"' target='_blank'>"+arr1[i][j]+"</a></td></tr>";
                }
            }
        }
    }
    else{
        alert(response['comment']);
        console.log(response['comment']);
    }
}
myfunc();
