define(['zepto'],function(undef){

  var log=function(s){
    var $log=$('#log');
    if(!$log.length){
      $log=$('<div id="log" style="position: fixed;height: 20px;top:0;color:red;"></div>').appendTo('body')
    }
    $log.html(s)
  };
  var bindEvent=function(){
    var startX,startY,deltaX=0,deltaY= 0,
        that=this,
        wrap=this.wrap,

        screenWidth= $('body').on('touchstart touchend touchmove',function(e){
          //console.log('touch', e.type,e)
          var touch0= e.touches[0];
          switch (e.type){
            case 'touchstart':
                startX=touch0.clientX;
                startY=touch0.clientY;
                  break
            case 'touchend':
                //console.log('de',deltaX)
                wrap.children('.flip-window').removeAttr('style')
                if(Math.abs(deltaX)>screenWidth/2){
                 // console.log('gogogo',deltaX)
                  that.go(-deltaX);
                    /**
                     * todo: go 从滑动点开始，而不是从起点开始
                     * */
                }
              deltaX=0;
              deltaY=0;
              break
            case 'touchmove':
                deltaX=touch0.clientX-startX;
                deltaY=touch0.clientY-startY;
//console.log('point',that.currentIndex -  deltaX/screenWidth)
              var percent= -100*(that.currentIndex -  deltaX/screenWidth)//2 为阻尼系数
              //console.log('precent',percent)

              wrap.children('.flip-window').css({
                transform:'translate('+percent+'%, 0)'
              })
                //console.log('moving',deltaX,deltaY)
              break
          }

            return false


    }).width();
    //console.log('w',screenWidth)
  };
  return {
    init:function(mod){

      var wrap=this.wrap= mod.children('div'),
          that=this;
      this.count=wrap.find('.flip-page').length;
/*
      $('body').on('swipeLeft swipeRight',function(e){

        that.go(e.type =='swipeLeft'?1:-1)
      });*/
      bindEvent.call(this);



    },
    go:function(direction){
      if(!this.count) return this;

      direction=(direction||1)>0?1:-1;
//console.log('direction',direction)
      //this.currentIndex+;

      this.currentIndex=Math.max(0,Math.min(this.count-1,this.currentIndex+direction))


      this.wrap.attr('data-on',(this.currentIndex+1));
    },
    currentIndex:0,
    play:function(){
      if(!this.count) return this;
      this.currentIndex++;

      this.currentIndex=this.currentIndex%this.count;

      this.wrap.attr('data-on',(this.currentIndex+1));

      var _this=this;

      setTimeout(function(){
        _this.play();
      },3000)

      return this;
    }
  }
})
