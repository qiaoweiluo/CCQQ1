(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[11],{334:function(e,a,t){},524:function(e,a,t){"use strict";t.r(a);var n=t(15),s=t.n(n),i=(t(126),t(60)),c=t.n(i),o=t(19),r=t(20),l=t(23),d=t(21),u=t(24),m=t(0),p=t.n(m),v=(t(334),t(25)),h=t(43),f=window.BMap,w=function(e){function a(e){var t;return Object(o.a)(this,a),(t=Object(l.a)(this,Object(d.a)(a).call(this,e))).fnAddOverlayer=function(e,a,n){var i,o;return s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return n?t.level=11:11===t.level?t.level=13:13===t.level&&(t.level=15),t.map.centerAndZoom(e,t.level),c.a.loading("\u52a0\u8f7d\u4e2d...",0),r.next=5,s.a.awrap(t.axios.get("/area/map?id="+a));case 5:i=r.sent,c.a.hide(),o=i.data.body,15!==t.level?o.map((function(e){var a=new f.Point(e.coord.longitude,e.coord.latitude),n={position:a,offset:new f.Size(-37,-37)},s=new f.Label("<div class='map_label01'>".concat(e.label,"<br />").concat(e.count,"\u5957</div>"),n);s.setStyle({border:"0px",background:"transparent"}),s.addEventListener("click",(function(){t.fnRefreshMap(a,e.value)})),t.map.addOverlay(s)})):o.map((function(e){var a={position:new f.Point(e.coord.longitude,e.coord.latitude),offset:new f.Size(-60,-56)},n=new f.Label("<div class='map_label02'>".concat(e.label,"&nbsp;&nbsp;&nbsp;").concat(e.count,"\u5957</div>"),a);n.setStyle({border:"0px",background:"transparent"}),n.addEventListener("click",(function(a){var n=0,s=0;try{n=window.innerWidth/2-a.changedTouches[0].clientX,s=window.innerHeight/4-a.changedTouches[0].clientY}catch(i){n=window.innerWidth/2-a.clientX,s=window.innerHeight/4-a.clientY}t.fnShowHouseList(e.value,{iMovex:n,iMovey:s})})),t.map.addOverlay(n)}));case 9:case"end":return r.stop()}}))},t.fnShowHouseList=function(e,a){var n;return s.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return t.map.panBy(a.iMovex,a.iMovey),c.a.loading("\u52a0\u8f7d\u4e2d...",0),i.next=4,s.a.awrap(t.axios.get("/houses?cityId="+e));case 4:n=i.sent,c.a.hide(),t.setState({sClass:"houseList houseListShow",aHouseList:n.data.body.list});case 7:case"end":return i.stop()}}))},t.fnRefreshMap=function(e,a){setTimeout((function(){t.map.clearOverlays()}),0),t.fnAddOverlayer(e,a)},t.state={oCurrentCity:v.a.getState(),sClass:"houseList",aHouseList:[]},t}return Object(u.a)(a,e),Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.map=new f.Map("baidu_map"),this.map.addEventListener("movestart",(function(){e.setState({sClass:"houseList"})}));var a=this.state.oCurrentCity.label;this.level=11,(new f.Geocoder).getPoint(a,(function(a){a&&(e.map.addControl(new f.NavigationControl),e.map.addControl(new f.ScaleControl),e.fnAddOverlayer(a,e.state.oCurrentCity.value,e.level))}),a)}},{key:"render",value:function(){var e=this,a=this.state,t=a.sClass,n=a.aHouseList;return p.a.createElement(p.a.Fragment,null,p.a.createElement("div",{className:"common_title"},p.a.createElement("span",{className:"back iconfont icon-prev",onClick:function(){return e.props.history.goBack()}}),p.a.createElement("h3",null,"\u5730\u56fe\u627e\u623f")),p.a.createElement("div",{className:"map_com"},p.a.createElement("div",{id:"baidu_map",style:{width:"100%",height:"100%"}})),p.a.createElement("div",{className:t},p.a.createElement("div",{className:"titleWrap"},p.a.createElement("h1",{className:"listTitle"},"\u623f\u5c4b\u5217\u8868"),p.a.createElement("a",{className:"titleMore",href:"/house/list"},"\u66f4\u591a\u623f\u6e90")),p.a.createElement("div",{className:"houseItems"},n.map((function(e){return p.a.createElement("div",{className:"house",key:e.houseCode},p.a.createElement("div",{className:"imgWrap"},p.a.createElement("img",{className:"img",src:h.a+e.houseImg})),p.a.createElement("div",{className:"content"},p.a.createElement("h3",{className:"title"},e.title),p.a.createElement("div",{className:"desc"},e.desc),p.a.createElement("div",null,e.tags.map((function(e,a){return p.a.createElement("span",{className:"tag tag"+a,key:a},e)}))),p.a.createElement("div",{className:"price"},p.a.createElement("span",{className:"priceNum"},e.price)," \u5143/\u6708")))})))))}}]),a}(m.Component);a.default=w}}]);
//# sourceMappingURL=11.677230fb.chunk.js.map