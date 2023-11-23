function _1(md){return(
md`HW6`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv()
)}

function _artistpublic(FileAttachment){return(
FileAttachment("artistPublic.csv").csv()
)}

function _AQ3key(artist){return(
Object.keys(artist[0])[3]
)}

function _AQ3Value(artist,AQ3key){return(
artist.map(row => row[AQ3key])
)}

function _PQ4key(artistpublic){return(
Object.keys(artistpublic[0])[4]
)}

function _PQ4Value(artistpublic,PQ4key){return(
artistpublic.map(row => row[PQ4key])
)}

function _data(AQ3Value,PQ4Value)
{
  var ans = [];
  for(var i = 1; i < 6; i++) {
    ans.push({value:i,count:0,series:"artist"});
    ans.push({value:i,count:0,series:"artistpublic"});
  }
  AQ3Value.forEach( d => {
    var index = d-1;
    ans[index*2].count++;
  })

  PQ4Value.forEach( d => {
    var index = d-1;
    ans[(index*2 + 1)].count++;
  })
  return ans;
}


function _9(selectedSeries){return(
selectedSeries
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _11(Plot,data,selectedSeries){return(
Plot.plot({
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#7DB9DE', '#F4A7B9'],  // 你可以根據需要更改顏色
    legend: true
  },
 marks:[
   Plot.barY(data.filter(d => selectedSeries.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
    }))
 ] 
})
)}

function _selectedSeries1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart(data,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#7DB9DE', '#F4A7B9']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie)
          .enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart1(data,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#7DB9DE', '#F4A7B9']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie)
          .enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(2000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _chart3(data,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#7DB9DE', '#F4A7B9']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur") //SVG濾鏡效果(高斯模糊) 用於模糊影像
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) //模糊的程度
      .attr("result", "blur"); //濾鏡的輸出

  filter.append("feOffset") //濾鏡的輸出(位移)
      .attr("in", "blur") //濾鏡的輸出(為前面定義的blur)
      .attr("dx", 4) //水平位移量
      .attr("dy", 4) //垂直位移量
      .attr("result", "offsetBlur"); //濾鏡的輸出名稱

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); //

  
  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie)
          .enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
         

      bars.attr("filter", "url(#drop-shadow)") // 添加陰影濾鏡效果
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#CB952C");
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); // 恢復原來的顏色
            d3.select(".tooltip").remove();

        })
    .transition()
    .duration(2000)
     .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
  
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./files/50c5f49fe0be94803e1d055aaca895517461971b40fc91cc553044dee88321c73843858f823684904e961847c7cc5d3bb60f8ecd7cdfde293dd65a61d08e1e2d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistPublic.csv", {url: new URL("./files/41a9c6bfdf8907c7f19b5a52517012d51d11afcdf769218a6b5c1af5288c865ca2bf10f0fdac5144f8d3676054b833c736642053e880c85ec6123fb15744ae7f.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("artistpublic")).define("artistpublic", ["FileAttachment"], _artistpublic);
  main.variable(observer("AQ3key")).define("AQ3key", ["artist"], _AQ3key);
  main.variable(observer("AQ3Value")).define("AQ3Value", ["artist","AQ3key"], _AQ3Value);
  main.variable(observer("PQ4key")).define("PQ4key", ["artistpublic"], _PQ4key);
  main.variable(observer("PQ4Value")).define("PQ4Value", ["artistpublic","PQ4key"], _PQ4Value);
  main.variable(observer("data")).define("data", ["AQ3Value","PQ4Value"], _data);
  main.variable(observer()).define(["selectedSeries"], _9);
  main.variable(observer("viewof selectedSeries")).define("viewof selectedSeries", ["Inputs"], _selectedSeries);
  main.variable(observer("selectedSeries")).define("selectedSeries", ["Generators", "viewof selectedSeries"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","data","selectedSeries"], _11);
  main.variable(observer("viewof selectedSeries1")).define("viewof selectedSeries1", ["Inputs"], _selectedSeries1);
  main.variable(observer("selectedSeries1")).define("selectedSeries1", ["Generators", "viewof selectedSeries1"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["data","selectedSeries1","d3"], _chart);
  main.variable(observer("chart1")).define("chart1", ["data","selectedSeries1","d3"], _chart1);
  main.variable(observer("chart3")).define("chart3", ["data","selectedSeries1","d3"], _chart3);
  return main;
}
