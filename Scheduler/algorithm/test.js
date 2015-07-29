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

var c=0;
var total=0;
for (i in data){
	total+=data[i].C/data[i].T;
}
function test(){
	if(total<=1){	
		console.log('Schedulable');
	}
}