$(document).ready(function(){

	$("#addProcess").click(addProcess);

	$("#schedule").click(schedule);

	$("#stepOver").click(stepOver);

	$("#clearAll").click(clearAll);

});

var noOfProc = 0;
var procSet = [];

function addProcess(){
	if (noOfProc < 5) {
		var pidval = $("#processID").val();
		var periodval = $("#period").val();
		var cTimeval = $("#cTime").val();
		
		var proc = {pid : pidval, period : periodval, cTime : cTimeval};

		procSet.push(proc);
		console.log(procSet);

		var html = "<tr pid="+pidval+"><th>"+pidval+"</th><td>"+periodval+"</td><td>"+cTimeval+"</td></tr>";

		$("#procTable>tbody").append(html);
		noOfProc++;	
		
		$("#processID").val("");
		$("#period").val("");
		$("#cTime").val("");
	};

};

function schedule(){
	var pids = [];
	
	for (var i = 0; i < procSet.length; i++) {
		pids.push(procSet[i].pid);
	};

	console.log(pids);

	var col = 0;
	for (id in pids) {
		var pid = pids[id];
		//console.log(pid);

		var tbody = $("#timingDiagram table tbody");
		tbody.append("<tr pid="+ pid +"></tr>");
		
		var raw = $("#timingDiagram table tbody tr").filter("[pid="+pid+"]");
		//console.log(raw);
		raw.append("<th style='padding=5px;'>"+pid+"</th>")

		for (var i = 1; i < 200; i++) {
			//console.log(i);
			raw.append("<td pid="+pid+" time="+i+"></td>");
		};
	};


	setData(conversion());
	for (i in data2){
		$("#procTable tbody tr").filter("[pid="+i+"]").append("<td>"+(parseInt(data2[i].P)+1)+"</td>");
	}
	var total=0;
	for (i in data){
		total+=data[i].C/data[i].T;
	}
	if(total<=1){
		alert('Schedulable');
	}else{
		alert('Not Schedulable');
	}
};

function conversion(){
	var data={};
	for (i in procSet){
		data[procSet[i].pid]={T:0,C:0,P:0};
		data[procSet[i].pid].T=parseInt(procSet[i].period);
		data[procSet[i].pid].C=parseInt(procSet[i].cTime);
		data[procSet[i].pid].P=0;
	}
	return data;
};

var firstRun=0;
function stepOver(){
	if(firstRun==0){
		setData(conversion());
		firstRun=1;
	}
	
	var runningProc, currentTime;
	run(function(proc,time){
		runningProc = proc;
		currentTime = time;
	});

	$("#timingDiagram table tr td ").filter("[pid="+runningProc+"][time="+currentTime+"]").css("background-color", "blue");
};

function clearAll(){
	noOfProc = 0;
	procSet = [];
	$("#procTable>tbody").html("");
	$("#processID").val("");
	$("#period").val("");
	$("#cTime").val("");

	$("#timingDiagram table tr td").css("background-color", "white");
	$("#timingDiagram table tbody").html("");
	firstRun=0;
	data={};
	data2={};
};
