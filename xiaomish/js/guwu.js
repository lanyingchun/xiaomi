var shoppmarket=(function(){
	var $center=document.querySelector(".center");
	var $main=document.querySelector(".main_box2");
	var $carbody=document.querySelector(".carbody");
	return{
		init: function (ele) {
            
			
            this.$ele = document.querySelector(ele);
            this.event();
            this.shopcar();
            this.addcar();
        },
        event: function () {
            var _this = this;
        },
        shopcar: function (){
        	var _this = this;
        	$carbody.innerHTML=null;
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            if(shopList==false){
            	$center.style.display="none";
            	$main.style.display="block";
            	return;
            }else{
            	$center.style.display="block";
            	$main.style.display="none";            	
            }

	        var allnum=document.querySelector("#allNum");
	        var J_selTotalNum=document.querySelector("#J_selTotalNum");
	        var allPrice=document.querySelector("#allPrice");
	        var num1=0,num2=0,num3=0;
	        console.log(allnum,J_selTotalNum,allPrice)
            for(var i=0;i<shopList.length;i++){
            	var $cartitem=document.createElement("div");
            	$cartitem.className="caritem";            	
            	var name=shopList[i].name;
	            var img=shopList[i].img;
	            var price=shopList[i].price;
	            var num=shopList[i].num;
	            var itemtotal=parseFloat(price)*num; 
            	$cartitem.innerHTML=`<div class="itemcheck"><img src="images/gou1_03.png"/></div>
					<div class="itemimg">  
							<img alt="" src="${img}" width="80" height="80"> 
					</div> 
					<div class="itemname">${name}</div> 
					<div class="itemprice">${price}</div> 
					<div class="itemnum">
						<span style="border-left:1px solid #e0e0e0;" class="minusnum">-</span>
						<input type="text" name="carbuy" value="${num}" autocomplete="off" class="goods_num J_goodsNum"> 
						<span style="border-right:1px solid #e0e0e0;" class="addnum">+</span>
					</div> 								
					<div class="itemtotal">${itemtotal}元</div> 
					<div class="itemaction">×</div>`
				$carbody.appendChild($cartitem);
				console.log($carbody)
				num1+=num*1;
				num2=num1;
				num3+=itemtotal;
            }
            allnum.innerHTML=num1;
            J_selTotalNum.innerHTML=num2;
            allPrice.innerHTML=num3;           
        },
        addcar(){
        	var _this=this;
        	var $caritem=document.querySelectorAll(".caritem");
        	var $minusnum=document.querySelectorAll(".minusnum");
        	var $addnum=document.querySelectorAll(".addnum");
        	var $shopcont_num=document.querySelectorAll(".goods_num");
        	var $name=document.querySelectorAll(".itemname");
        	var $itemaction=document.querySelectorAll(".itemaction");
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
        	for(let i=0;i<$minusnum.length;i++){
    	       	$minusnum[i].onclick=function(){
		            var shopList = localStorage.shopList || '[]';
		            shopList = JSON.parse(shopList);
	        		$shopcont_num[i].value-=1;
	        		if($shopcont_num[i].value<1){
	        			$shopcont_num[i].value=1;
	        		}
	        		shopList[i].num=$shopcont_num[i].value;	        		
	        		localStorage.shopList = JSON.stringify(shopList);
	        		_this.shopcar();
	        		_this.addcar();
	        	}
    	       	$addnum[i].onclick=function(){
    	       		var shopList = localStorage.shopList || '[]';
		            shopList = JSON.parse(shopList);
	        		$shopcont_num[i].value=$shopcont_num[i].value*1+1;
	        		shopList[i].num=$shopcont_num[i].value;
	        		localStorage.shopList = JSON.stringify(shopList);
	        		_this.shopcar();
	        		_this.addcar();
	        	}
    	       	$shopcont_num[i].onchange=function(){
    	       		var shopList = localStorage.shopList || '[]';
		            shopList = JSON.parse(shopList);
		            var a=/(^[1-9]$)|(^[1-9][0-9]{2}$)/;
		            if(a.test($shopcont_num[i].value)){
		            	shopList[i].num=$shopcont_num[i].value;
		            }else{
		            	$shopcont_num[i].value=shopList[i].num;
		            }            
		            localStorage.shopList = JSON.stringify(shopList);
    	       		_this.shopcar();
    	       		_this.addcar();
    	       	}
    	       	$itemaction[i].onclick=function(){
    	       		var shopList = localStorage.shopList || '[]';
		            shopList = JSON.parse(shopList);
		            
		            var a=i;
		            for(var j=0;j<shopList.length;j++){
		            	console.log($name[i].innerHTML,shopList[j]);
		            	if(shopList[j].name==$name[i].innerHTML){
		            		shopList.splice(j,1);
		            	}
		            }
		            localStorage.shopList = JSON.stringify(shopList);
    	       		_this.shopcar();
    	       		_this.addcar();
    	       	}
    	       	
        	}
 
        }
	}
}())
var  shopping= (function () {
	var $shopcont=document.querySelectorAll(".shopcont1");
	var $contimg=document.querySelectorAll(".contimg");
	var $conta=document.querySelectorAll(".conta");
	var $contp=document.querySelectorAll(".contp");
	var $carbody=document.querySelector(".carbody");
//	console.log($contimg[0].src.slice(29));
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
            for(let i=0;i<$shopcont.length;i++){
            	$shopcont[i].onclick=function (){
					_this.name=$conta[i].innerHTML;
					_this.price=$contp[i].innerHTML;	
					_this.img=$contimg[i].src.slice(29);
					_this.addCar();
				}
            }
				
			
        },
        addCar() {
            // 把商品信息保存到本地数据库
            // 把所有添加的商品数据放到一个字段中, shopList
            // 添加第一个商品时,本地存储没有shopList
            // 本地存储数据格式一定是字符串格式
            var _this = this;
            console.log(_this.name,_this.price);            
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
            cart.init();
        }
	}
}())

