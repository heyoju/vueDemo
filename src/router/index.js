import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import treeTable from '@/components/treeTable'
import dragDropTree from '@/components/dragDropTree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/treeTable',
      name: 'treeTable',
      component: treeTable
    },
    {
      path: '/dragDropTree',
      name: 'dragDropTree',
      component: dragDropTree
    }, 

  ]
})
