//its time to fetch
async function go(){
  const response = await fetch("/api");
  const json = await response.json();
 let stats=json.d;
 var dates=[];
 var confirms=[];
 var recovers=[];
 var decease=[];
 var actives=[];
 
 for(var i=0;i<stats.length;i++){
   dates.push(stats[i].date);
   confirms.push(Number(stats[i].totalconfirmed));
   recovers.push(Number(stats[i].totalrecovered));
   decease.push(Number(stats[i].totaldeceased));
   actives.push(confirms[i]-(decease[i]+recovers[i]));
}
/* globals Chart:false, feather:false */
 (function () {
  'use strict'

  feather.replace()

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      
      labels: dates,
      
      datasets: [{
        data: confirms,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 3,
        pointBackgroundColor: '#007bff',
        radius:1,
        hoverRadius:3
      },
      {
        data: recovers,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: "green",
        borderWidth: 3,
        pointBackgroundColor: 'green',
        radius:1,
        hoverRadius:3
      },
      {
        data: actives,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 3,
        pointBackgroundColor: 'red',
        radius:1,
        hoverRadius:3

      },
      {
        data: decease,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        borderWidth: 3,
        pointBackgroundColor: 'gray',
        radius:1,
        hoverRadius:3
      }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
}())
}
go();

