function _1(md){return(
md`strong`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _Constellation(){return(
["牡羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"]
)}

function _Counter(){return(
[]
)}

function _5(Counter,Constellation,data)
{
 Counter.length = 0; //將yCounts清空

 for (var i = 0; i < 12; i++) { 
 //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
  Counter.push({constellation:Constellation[i], gender:"male", count:0}); 
 //Object包含：1. 星座號，2.性別，3.人數(設為0)
   Counter.push({constellation:Constellation[i], gender:"female", count:0}); 
 
 }
 data.forEach (x=> {
      var i = (x.Constellation) * 2 + (x.Gender== "男" ? 0 : 1); 
    Counter[i].count++;
 })
 return Counter
}


function _6(Plot,Constellation,Counter){return(
Plot.plot({

 
 grid: true,
 y: {label: "人數"},
 x:{domain:Constellation},
 marks: [
 
  Plot.ruleY([0]),
  Plot.barY(Counter,  Plot.groupX({ y: "max" }, { y: "count", x: "constellation",fill: "gender"})),
 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("Constellation")).define("Constellation", _Constellation);
  main.variable(observer("Counter")).define("Counter", _Counter);
  main.variable(observer()).define(["Counter","Constellation","data"], _5);
  main.variable(observer()).define(["Plot","Constellation","Counter"], _6);
  return main;
}
