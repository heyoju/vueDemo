<template>
	<div class="cm-column-flex-center" >
		<div class="tree-outer">
			<ul id="treeDemo" class="ztree"></ul>
		</div>

	</div>
</template>
<script>
	import '@/assets/pluginLib/zTree3.5.26/css/zTreeStyle/zTreeStyle.css'
	import '@/assets/css/dragTree.css'
	import '@/assets/pluginLib/zTree3.5.26/js/jquery.ztree.all.min.js'
	import router from '@/router'
	export default{

		data(){
			return {
				curDragNodes:null,
				autoExpandNode:null,
				setting : {
						view: {
							dblClickExpand: this.dblClickExpand
						},
						edit: {
							drag: {
								autoExpandTrigger: true,
								prev: this.dropPrev,
								inner: this.dropInner,
								next: this.dropNext
							},
							enable: true,
							showRemoveBtn: false,
							showRenameBtn: false
						},
						data: {
							simpleData: {
								enable: true
							}
						},
						callback: {
							beforeDrag: this.beforeDrag,
							beforeDrop: this.beforeDrop,
							beforeDragOpen: this.beforeDragOpen,
							onDrag: this.onDrag,
							onDrop: this.onDrop,
							onExpand: this.onExpand
						}
				},
				zNodes:[						
							{ id:0, pId:-1, name:"根节点", },
							{ id:1, pId:0, name:"父节点 1", },
							{ id:11, pId:1, name:"叶子节点 1-1"},
							{ id:12, pId:1, name:"叶子节点 1-2"},
							{ id:13, pId:1, name:"叶子节点 1-3"},
							{ id:2, pId:0, name:"父节点 2"},
							{ id:21, pId:2, name:"叶子节点 2-1"},
							{ id:22, pId:2, name:"叶子节点 2-2"},
							{ id:23, pId:2, name:"叶子节点 2-3"},
							{ id:3, pId:0, name:"父节点 3"},
							{ id:31, pId:3, name:"叶子节点 3-1"},
							{ id:32, pId:3, name:"叶子节点 3-2"},
							{ id:33, pId:3, name:"叶子节点 3-3"}
						],
				rootId:"",
				saveList:[]
				
			}
		},
		methods:{

		    setTrigger() {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
			},
			dropPrev(treeId, nodes, targetNode) {
				var pNode = targetNode.getParentNode();
				if (pNode && pNode.dropInner === false) {
					return false;
				} else {
					for (var i=0,l=this.curDragNodes.length; i<l; i++) {
						var curPNode = this.curDragNodes[i].getParentNode();
						if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
							return false;
						}
					}
				}
				return true;
			},
			 dropInner(treeId, nodes, targetNode) {
				if (targetNode && targetNode.dropInner === false) {
					return false;
				} else {
					for (var i=0,l=this.curDragNodes.length; i<l; i++) {
						if (!targetNode && this.curDragNodes[i].dropRoot === false) {
							return false;
						} else if (this.curDragNodes[i].parentTId && this.curDragNodes[i].getParentNode() !== targetNode && this.curDragNodes[i].getParentNode().childOuter === false) {
							return false;
						}
					}
				}
				return true;
			},
			 dropNext(treeId, nodes, targetNode) {
				var pNode = targetNode.getParentNode();
				if (pNode && pNode.dropInner === false) {
					return false;
				} else {
					for (var i=0,l=this.curDragNodes.length; i<l; i++) {
						var curPNode = this.curDragNodes[i].getParentNode();
						if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
							return false;
						}
					}
				}
				return true;
			},
			beforeDrag(treeId, treeNodes) {
				for (var i=0,l=treeNodes.length; i<l; i++) {
					if (treeNodes[i].drag === false) {
						this.curDragNodes = null;
						return false;
					} else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
						this.curDragNodes = null;
						return false;
					}
				}
				this.curDragNodes = treeNodes;
				return true;
			},
			 beforeDragOpen(treeId, treeNode) {
				this.autoExpandNode = treeNode;
				return true;
			},
			 beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
			 	if (targetNode.id==this.rootId) {//保持唯一跟目录*****五星标注*****
			 		return false;
			 	}			 	
				return true;
			},
			onDrag(event, treeId, treeNodes) {
			},
			onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {	
			},
			onExpand(event, treeId, treeNode) {			
			},

			getTime() {
				var now= new Date(),
				h=now.getHours(),
				m=now.getMinutes(),
				s=now.getSeconds(),
				ms=now.getMilliseconds();
				return (h+":"+m+":"+s+ " " +ms);
			},
			dblClickExpand(treeId, treeNode) {
				return treeNode.level > 0;
			}
			
		},
		mounted(){
			this.rootId = this.zNodes[0].id;//设置根节点Id
			this.$nextTick(function() {	
					$.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
					$("#callbackTrigger").bind("change", {}, this.setTrigger);
					$.fn.zTree.getZTreeObj("treeDemo").expandAll(true);
			})
		}
	}

</script>
<style scoped>
.cm-column-flex-center{
	display: flex;
	flex-direction: column;
   	justify-content: center;
   	align-content: center;
   	-webkit-justify-content: center;
   	-webkit-align-items: center;
}

.tree-outer{
	margin-bottom: 20px;
	border: 1px solid gainsboro;
	overflow:auto;
	float: left;
	width:250px;
	height:292px;
	text-align:left;
}
</style>

