(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d210a29"],{b973:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h2",[e._v(e._s(e.$route.params.id?"编辑":"新建")+"分类")]),a("el-form",{attrs:{"label-width":"120px"},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[a("el-form-item",{attrs:{label:"上级分类"}},[a("el-select",{model:{value:e.model.parent,callback:function(t){e.$set(e.model,"parent",t)},expression:"model.parent"}},e._l(e.parents,(function(e){return a("el-option",{key:e._id,attrs:{value:e._id,label:e.name}})})),1)],1),a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary","native-type":"submit"}},[e._v("提交")])],1)],1)],1)},r=[],s=(a("96cf"),a("1da1")),o={name:"CategoryEdit",data:function(){return{model:{},parents:[]}},methods:{save:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$route.params.id){t.next=7;break}return t.next=3,e.$http.put("/rest/categories/".concat(e.$route.params.id),e.model);case 3:t.sent,e.$message({type:"success",message:"修改成功！"}),t.next=11;break;case 7:return t.next=9,e.$http.post("/rest/categories",e.model);case 9:t.sent,e.$message({type:"success",message:"创建成功！"});case 11:e.$router.push("/categories/list");case 12:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;this.$route.params.id&&this.$http.get("/rest/categories/".concat(this.$route.params.id)).then((function(t){e.model=t.data})),this.$http.get("/rest/categories").then((function(t){e.parents=t.data}))}},i=o,c=a("2877"),l=Object(c["a"])(i,n,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d210a29.0035f17b.js.map