var picuse = (function(){
    var timer = null;
    return {
        init: function(ele) {
    
            if(typeof ele == 'string') {
                ele = document.querySelector(ele);
            }
            this.$ele = ele;
            this.$tipBox = ele.querySelector('.banner-tip');
            this.$tipLiAll = this.$tipBox.children;
            this.$preBtn = ele.querySelector('.left-btn');
            this.$nextBtn = ele.querySelector('.right-btn');
            this.$bannerBox = ele.querySelector('.banner-image');
            this.$bannerLiAll = this.$bannerBox.children;
            var first = this.$bannerLiAll[0];
            var last =  this.$bannerBox.lastElementChild;
            this.$bannerBox.appendChild(first.cloneNode(true));
            this.$bannerBox.insertBefore(last.cloneNode(true), first);
            this.$bannerBox.style.left = '-1226px';
            for(var i = 0; i <  this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].index = i;
            }
            this.index = 0;
            this.event();
            this.autoPlay();
        },
        event: function() {
            var _this = this;
            this.$tipBox.onclick = function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName == 'LI') {
                    _this.showImage(target.index);
                     _this.autoPlay(target.index);
                }
            };
            this.$preBtn.onclick =function() {
                _this.showImage(--_this.index);
            }
            this.$nextBtn.onclick = function() {
               _this.showImage(++_this.index);
            }
        },
        showImage: function(index) {
            var maxIndex = this.$tipLiAll.length - 1;
            if(index > maxIndex) {
                index = 0;
                this.$bannerBox.style.left = 0;
            } else if(index < 0) {
                index = maxIndex;
                this.$bannerBox.style.left = -1226 * (maxIndex + 2) + 'px';
            }
         
            this.index = index;
            for(var i = 0; i < this.$tipLiAll.length; i++) {
                this.$tipLiAll[i].removeAttribute('class');
            }
            this.$tipLiAll[index].className = 'active';
            move(this.$bannerBox, 'left', -1226 * (index + 1));
        },
         autoPlay(index) {
            clearInterval(timer);
            index = index || 0;
            timer = setInterval(() => {
                index++;
                 var maxIndex = this.$tipLiAll.length - 1;
            if(index > maxIndex) {
                index = 0;
                this.$bannerBox.style.left = 0;
            } else if(index < 0) {
                index = maxIndex;
                this.$bannerBox.style.left = -1226 * (maxIndex + 2) + 'px';
            }
                this.showImage(index);
            }, 10000)
        }
    }
}())



