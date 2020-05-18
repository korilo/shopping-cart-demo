window.onload = ()=>{
    

    const app = new Vue({
        el: '#app',
        data:{
            goodsList:[],
            selectAll: false,
            control: false  
        },
        methods:{
            isAll(){
                let flag = 0;
                for(item of this.goodsList){
                    if(item.selected){
                        flag++;
                        
                    }
                };
                
                if(flag == this.goodsList.length){
                    this.selectAll = true;
                }else{
                    this.selectAll = false;
                };
            },
            itemChange(shop){
                
                let flag = 0;
                for(item of shop.goods){
                    if(item.selected ){
                        flag++;
                        
                    }
                }
                if(flag == shop.goods.length){
                    shop.selected = true;
                }else{
                    shop.selected = false;
                }
                this.isAll();
            },
            shopChange(shop){
                
                if(shop.selected){
                    for(item of shop.goods){
                        item.selected = true;
                        
                    }
                }else{
                    for(item of shop.goods){
                        item.selected = false;
                        
                    }
                };
                this.isAll();
            },
            listChange(){
                
                if(this.selectAll){
                    for(item of this.goodsList){
                        item.selected = true;
                    }
                }else{
                    for(item of this.goodsList){
                        item.selected = false;
                    }
                };
                for(shop of this.goodsList){
                    this.shopChange(shop)
                }
                

            },
            add(good){
                good.count++;
            },
            reduce(good){
                if(good.count === 1 ){
                    return
                }
                good.count--;
            },
            tabControl(event){
                
                this.control = !this.control;
                
                this.$refs.control.innerText==='完成'?this.$refs.control.innerText='管理':this.$refs.control.innerText='完成'
                

            },
            del(){
                this.goodsList = this.goodsList.filter(shop=>{
                    return !shop.selected;
                })
                for(shop of this.goodsList){
                    shop.goods = shop.goods.filter(good=>{
                        return !good.selected
                    })
                }
                
            }
            
            
        },
        computed:{
            totalItems(){
                let count = 0;
                for(shop of this.goodsList){
                    for(good of shop.goods){
                        if(good.selected == true){
                            count++;
                        }
                    }
                }
                return count;
            },
            totalPrice(){
                let sum = 0;
                for(shop of this.goodsList){
                    for(good of shop.goods){
                        if(good.selected == true){
                            sum += good.price * good.count;
                        }
                    }
                }
                return sum.toFixed(2);
            }  

        },
        mounted() {
            fetch('./list.json').then(res=>res.json()).then(res=>{
                app.goodsList = res.shopping
                console.log(this.goodsList);
             })
        },
    });

}