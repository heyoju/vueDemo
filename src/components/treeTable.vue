<template>
<div style="display: flex;flex-direction: column;align-items: center;width: 100%;height: 100%;justify-content: center;">
	<div style="width: 1000px;margin-bottom: 20px;">
		<el-button style="float: left;" icon="el-icon-plus" type="primary" @click="addNode">新增</el-button>
	</div>
	
	<div class="elTree">
	
 			
			<el-tree
		  	:data="data4"
		  	:props="defaultProps"
		  	show-checkbox
		  	node-key="id"
		  	:check-strictly="true"
			:highlight-current="true"	
		  	default-expand-all
		  	:expand-on-click-node="false"
		  	:render-content="renderContent"
		  	ref="tree"
		  	@check-change="checkChange"
		  	@node-click="nodeClick"
		  	>
		</el-tree>
	</div>


</div>
</template>
<script>
  let id = 1000;

 export default {
    data() {
      return {
      	data4: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2',
              children: [{
	              id: 11,
	              label: '四级 1-1-1-1'
	            }, {
	              id: 12,
	              label: '四级 1-1-1-2',
	              children: [{
			              id: 13,
			              label: '五级 1-1-1-1-1'
			            }, {
			              id: 14,
			              label: '五级 1-1-1-1-2'
			            }]
	            }]
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        
		editCheckId:""
      }
    },
	mounted(){
		this.$refs.tree.setCheckedKeys([1]);//预先选中id为1的节点;
	},
    methods: {
	    	addNode(){
	    		if (this.editCheckId =="") {
	    			this.$message.success("未选中节点");
	    		} else {
	    			this.$message.success("新增节点id："+JSON.stringify(this.editCheckId));
	    		}
	    	},
			 append(data) {
			  
				//		        const newChild = { id: id++, label: 'testtest', children: [] };
				//		        if (!data.children) {
				//		          this.$set(data, 'children', []);
				//		        }
				//		        data.children.push(newChild);
			
		     },
		     	remove(node, data) {
		     		
//			        const parent = node.parent;
//			        const children = parent.data.children || parent.data;
//			        const index = children.findIndex(d => d.id === data.id);
//			        children.splice(index, 1);
		      	},
				edit(data) {
					this.$message.success("编辑节点："+JSON.stringify(data.id));
				},
		      	renderContent(h, { node, data, store }) {
		        return (
		      	  	<div style="width:100%;height:100%;display: flex; ;align-items: center; justify-content: center;">
		      	  		<div style="flex-grow:4;flex-basis: 0%;display: flex;justify-content: start;">{node.label}
		      	  		</div>
		      
		      	  		<div style="width:500px;height:100%;display: flex;justify-content: center;align-items: center;">
		      	  			<el-button style="font-size: 12px;height:30px;" size="mini" type="success" on-click={ () => this.edit(data) }>编辑</el-button>
		      	  		</div>
		      	  	</div>
		          );
		      	},
				checkChange(item, node, self){
					if (node==true) {//点击未选中复选框
						this.editCheckId = item.id;
						this.$refs.tree.setCheckedKeys([item.id]);
					} else {
						if (this.editCheckId == item.id) {//点击已选中复选框，保证至少一个选中
							this.$refs.tree.setCheckedKeys([item.id]);
						}
					}
				},	
				nodeClick(item, node, self){
					this.editCheckId = item.id;
					this.$refs.tree.setCheckedKeys([item.id]);
				}	
    }
  };
</script>

<style scoped>
.row-flex-center{
	display: flex;
	flex-direction: row;
   	justify-content: center;
   	align-content: center;
   	-webkit-justify-content: center;
   	-webkit-align-items: center;
}

.elTree{
	height: 498px;
	width: 1000px;
	border:1px solid gainsboro;
	overflow-y: auto;
}
.flex-center{
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	
}
</style>
<style >
//修改element的默认样式,加elTree是防止在单页应用中污染全局的样式
.elTree .el-tree-node__content{
	height: 50px;
	border-bottom: 1px solid gainsboro;
}

</style>