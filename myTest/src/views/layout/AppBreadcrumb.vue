<template>
  <el-col
    :span="24"
    class="breadcrumb-container"
  >
    <strong class="title">{{ getShowName($route.name) }}</strong>
    <!--<strong class="title">{{$route.name}}</strong>-->
    <el-breadcrumb
      separator="/"
      class="breadcrumb-inner"
    >
      <el-breadcrumb-item
        v-for="item in $route.matched"
        :key="item.path"
      >
        {{ getShowName(item.name) }}
        <!--{{item.name}}-->
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
</template>

<script>
import routes from '../../routes'

export default {
    data() {
        return {
            routes
        }
    },
    methods: {
        getShowName(name) {
            if ('' == name) {
                return name;
            }
            let temp = this.getName(name, this.routes);
            return temp;
        },
        getName(name, tempRoutes) {
            let BreakException = {};
            let showName = '';
            try {
                tempRoutes.forEach(function(element) {
                    if (name == element.name) {
                        showName = element.alias || element.name;
                        throw BreakException;
                    }
                    else if (element.children) {
                        showName = this.getName(name, element.children);
                        if (showName != '') {
                            throw BreakException;
                        }
                    }
                }, this);
            }
            catch (e) {
                if (e !== BreakException) throw e;
            }
            return showName;
        }
    }
}


</script>

<style scoped lang="scss">
@import '~scss_vars';
.breadcrumb-container {
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 8px;
    background-color: $color-extra-light-gray;
    .title {
        width: 200px;
        float: left;
        color: #475669;
    }
    .breadcrumb-inner {
        float: right;
    }
}
</style>
