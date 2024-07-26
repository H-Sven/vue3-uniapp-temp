<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}} {{ t('首页') }} </text>
			<button @click="switchLanguage('en')">切换语言</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import i18n from '@/locales/index';
	const { t } = i18n.global;
	// import { storeToRefs } from "pinia";
	import { useMainStore } from '@/sotre/main'
	
	const mainStore = useMainStore()

	
	const title = ref('uniapp')
	
	
	const switchLanguage = (lang) => {  
		mainStore.switchLanguage(lang)
	}
	
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		flex-direction: column;
		.title {
			font-size: 36rpx;
			color: #000;
		}
	}
	
	.custom_style {
	    color: #000;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    justify-content: center;
	    font-size: 24rpx;
	    &_icon{
	        background-color: #15357A;
	        font-size: 80rpx;
	        width: 120rpx;
	        height: 120rpx;
	        border-radius: 100%;
	        display: flex;
	        justify-content: center;
	        align-items: center;
	        margin-top: -40rpx;
	    }
	}

	
</style>
