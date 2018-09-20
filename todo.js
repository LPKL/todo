let vm = new Vue({
    el: '#app',
    data: {
        todo:'',
        arr:[{title:'示例',isSelect:false}],
        hash:'',
        flag:false,
        cur:''
    },
    created(){
        this.hash=window.location.hash.slice(2)||'all';
        this.arr=JSON.parse(localStorage.getItem('data')||[]);
        window.addEventListener('hashchange',()=>{
            this.hash=window.location.hash.slice(2)
        })
    },
    directives:{
        focus(e){
            e.focus();
        }
    },
    methods:{
            add(){
                this.todo=this.todo.replace(/^ +| +$/,'')
                if(!this.todo)return;
                this.arr.push({title:this.todo,isSelect:false})
                this.todo=''
            },
        remember(val){
              this.cur=val
        },
        remove(val){
               this.arr=this.arr.filter(item=>item!=val)
        },
        cancel(){
                this.cur=''
        }
    },
    watch:{
      arr:{
          handler(){
              localStorage.setItem('data',JSON.stringify(this.arr))
          },deep:true
      }
    },
    computed:{
        count(){
            return this.arr.filter(item=>!item.isSelect).length
        },
        filterArr(){
            if(this.hash==='all'){
                return this.arr
            }else if(this.hash==='finished'){
                return this.arr.filter(item=>item.isSelect)
            }else{
                return this.arr.filter(item=>!item.isSelect)
            }
        }
    }

});