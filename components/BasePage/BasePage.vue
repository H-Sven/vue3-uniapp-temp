<template>
  <div>
    <div
      class="headerbox"
      :style="{
        height: pageNavRect.height + 'px',
        background: background,
      }"
    >
      <div
        class="header-nav"
        :style="{
          height: pageNavRect.height + 'px',
          paddingTop: pageNavRect.top + 'px',
          paddingRight: pageNavRect.sides + 'px',
        }"
      >
        <div class="navleft">
          <div v-if="showHome" class="toback" @click="handleBackHome">
            <van-icon name="home-o" :color="backIconColor" />
          </div>
          <div v-if="showBack" class="toback" @click="handleBack">
            <van-icon name="arrow-left" :color="backIconColor" />
          </div>
        </div>
        <div class="navcenter" :style="{ left: pageNavRect.sides + 'px' }">
          <span v-if="title" :style="{ color: backIconColor }">{{ title }}</span>
          <img v-else src="https://image.doulaoban.com/applet/index_logo.png" />
        </div>
        <div class="navright">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <div class="base-page-wrapper" :style="{ paddingTop: pageNavRect.height + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
	import { onMounted, onBeforeUnmount } from 'vue'
	// import { storeToRefs } from "pinia";
	import { useMainStore } from '../../sotre/main.js'
	import { hasPreviousPage } from '../../utils/index.js';
	
	const { systemTools } = useMainStore()
	const { pageNavRect } = systemTools

	
	const props = defineProps({
		background: {
		  type: String,
		  default: '',
		},
		// 是否显示返回首页
		showHome: {
		  type: Boolean,
		  default: false,
		},
		showBack: {
		  type: Boolean,
		  default: true,
		},
		// 是否自定义返回方法， 组件需绑定 @handleBack方法
		customBack: {
		  type: Boolean,
		  default: false,
		},
		// 页面title
		title: {
		  type: String,
		  default: '',
		},
		// 返回按钮颜色
		backIconColor: {
		  type: String,
		  default: '#333',
		},
	})
	
	const emit = defineEmits(['handleBack']) 
	
	onMounted(()=>{
		uni.$on('pageOnHide', pageOnHide);
	})
	
	
	onBeforeUnmount(()=> {
		uni.$off('pageOnHide', pageOnHide)
	})
	
	
	
	const pageOnHide = () => {}
	
	const handleBackHome = () => {
		uni.reLaunch({ url: '/pages/index/index' });
	}
	
	const handleBack2 = () => {
	  if (hasPreviousPage()) {
	    uni.navigateBack();
	  } else {
	    uni.reLaunch({ url: '/pages/index/index' });
	  }
	}
	
	const handleBack = () => {
		if (props.customBack) {
		  emit('handleBack');
		} else {
		  handleBack2();
		}
	}
	
	
</script>

<style lang="scss" scoped>
  .headerbox {
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100vw;
    z-index: 999;
    box-sizing: border-box;
    .header-nav {
			display: flex;
			padding-left: 15px;
			align-items: center;
			box-sizing: border-box;
			justify-content: space-between;
			position: relative;
			.navleft {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				.toback {
					margin-top: 3px;
					margin-right: 5px;
					font-size: 18px;
					color: #333333;
				}
			}
			.navcenter {
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: center;
				img {
					width: 57px;
					height: 23px;
				}
				span {
					color: #1F2329;
					font-size: 16px;
					font-weight: 500;
				}
			}
			.navright {
			  width: 25px;
			}
		}
 }
</style>
