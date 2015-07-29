var data = {
		A:{
			T:80,
			C:40,
			P:0,
			timeout:0
		},
		B:{
			T:40,
			C:10,
			P:0,
			timeout:0
		},
		C:{
			T:20,
			C:5,
			P:0,
			timeout:0
		}};

var data2 = {};
function setData(inputData){
	data=inputData;
	data2=JSON.parse(JSON.stringify(data)); 
	
	// add data first time to ready pool
	for (i in data2){
		ready[i]=data2[i];
	}
var len=Object.keys(data2).length;
var priorities=[];
var t=0;
for (i in data2){
	priorities[t++]=data2[i].T;
}
priorities.sort();
var order=[];
var tmp=0;
for (i in data2){
	t=0;
	for (j in data2){
		if(data2[i].T==priorities[t]){
			order[tmp++]=j;
			data2[j].P=t;
			break;
		}
		t++;
	}
}
};


var waiting={

	getprocess:function(){	// get processes which meets time
		for(i in waiting){
			if(time>=waiting[i].timeout && waiting[i].C>0){
				return i;
			}
		}
	}
	
};
var temp;
var ready={

	getprocess:function(){	// get processes with high priority
		var tmp;
		for(i in ready){
			var p=-1;
			if(ready[i].P>p){
				p=ready[i].P;
				tmp=i;
			}
		}
		if(ready[tmp].timeout==0){
			ready[tmp].timeout=data[tmp].T;
		}else if(ready[tmp].C==data[tmp].C){
			ready[tmp].timeout=(time)+ready[tmp].T;
		}
		temp=tmp;
		return tmp;
	}
};


var time=0; // global time variable

function run(callback){
	if(Object.keys(waiting).length>1 && waiting.getprocess()){
		var cp=waiting.getprocess();
		//console.log(cp);	
		ready[cp]=JSON.parse(JSON.stringify(waiting[cp]));
		ready[cp].C=data[cp].C;
		delete waiting[cp];
	}else if(!waiting.getprocess() && Object.keys(ready).length<=1){
		time++;
	}else if (Object.keys(ready).length>1){
		var cp=ready.getprocess();	//cp=current process
		console.log(cp);
		ready[cp].C--;
		if(ready[cp].C==0){
			waiting[cp]=JSON.parse(JSON.stringify(ready[cp])); 
			waiting[cp].C=data[cp].C;
			delete ready[cp];
		}
		time++;
		callback(cp,time);
	}

/*
	for(i in data2){
		console.log(i)
		console.log('  '+data2[i].T);
		console.log('  '+data2[i].C);
	}
//	console.log('order :'+order);
	console.log(ready);
	console.log(waiting);
*/
//	console.log(time);
	//console.log('priorities:'+priorities);
}