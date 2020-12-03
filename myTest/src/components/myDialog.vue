<!-- 自定义dialog -->
<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="30%"
    :before-close="dialogClose"
  >
    <el-select
      v-model="value"
      multiple
      placeholder="请选择"
      @change="handleGroupList"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      />
    </el-select>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisibleChangeCancel">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogVisibleChangeConfirm"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>


<style lang="sass" scoped>

</style>


<script>
export default {
    props:["dialogVisible","title","groupListData"],
    data() {
        return {
            options: [{
                value: '0',
                label: '全部'
            }, {
                value: '1',
                label: '标签1'
            }, {
                value: '2',
                label: '标签2'
            }, {
                value: '3',
                label: '标签3'
            }],
            value: []
        }
    },
    watch:{
        groupListData:function(val){
            this.value = [];
            var groupListData = val;
            for(let i=0;i<groupListData.length;i++){
                this.value.push(groupListData[i].label);
            }
        }
    },
    methods:{
        dialogVisibleChangeCancel(){
            this.$emit('dialogVisibleChange');
        },
        dialogVisibleChangeConfirm(){
            this.$confirm('确认？').then(_ => {
                this.$emit('dialogVisibleChange');
            })
            .catch(_ => {});
        },
        handleGroupList(){
            console.log(this.value);
        },
        dialogClose(){
            this.$emit('dialogVisibleChange');
        }
    }
}
</script>




