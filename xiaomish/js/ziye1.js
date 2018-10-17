var shoplist = (function () {
	var $goods=document.querySelector(".buy_car");

	return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getShopListData();
            
        },
        event: function () {
            var _this = this;
        },
        getShopListData: function () {
            var _this = this;
			$goods.onclick=function (){
				_this.name=document.querySelector(".shop_h2").innerHTML;
				_this.price=document.querySelector(".shop_h4").innerHTML;	
				_this.img=document.querySelector(".xiao1").style.backgroundImage;
				_this.img=_this.img.slice(5,21);
				console.log(_this.img);
				_this.addCar();
			}
			
        },
        addCar() {
            // 把商品信息保存到本地数据库
            // 把所有添加的商品数据放到一个字段中, shopList
            // 添加第一个商品时,本地存储没有shopList
            // 本地存储数据格式一定是字符串格式
            var _this = this;           
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for(var i = 0; i < shopList.length; i++) {
                if(shopList[i].name==_this.name) {
                    // 商品已经存在
                    shopList[i].num = shopList[i].num*1+1;
                    break;
                }
            }
            if(i === shopList.length) {
                // 商品不存在
                shopList.push({name:_this.name, num: 1,price:_this.price,img:_this.img});

            }

            localStorage.shopList = JSON.stringify(shopList);

        }
	}
}())
