$(document).ready(function () {
  var timeData = [],
    temperatureData = [],
    humidityData = [];
    

//   // var ctx = document.getElementById("myChart").getContext("2d");
//   // var optionsNoAnimation = { animation: false }
//   // var myLineChart = new Chart(ctx, {
//   //   type: 'line',
//   //   data: data,
//   //   options: basicOption
//   // });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
    console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
    console.log('receive message' + message.data);
    try {
      var obj = JSON.parse(message.data);
      if(!obj.time || !obj.weight) {
        return;
      }
      console.log(message.data);
      timeData.push(obj.time);
      temperatureData.push(obj.Weight);
      $('#myDiv').html(obj.Weight);
      // only keep no more than 50 points in the line chart
      const maxLen = 50;
      var len = timeData.length;
      if (len > maxLen) {
        timeData.shift();
        temperatureData.shift();
      }

     
      if (humidityData.length > maxLen) {
        humidityData.shift();
      }

     // myLineChart.update();
    } catch (err) {
      console.error(err);
    }
  }
});
