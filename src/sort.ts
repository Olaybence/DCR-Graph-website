import{Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'sort'})

export class SortPipe implements PipeTransform{
    transform(items:[],direction:string,column:string,type:string){
        let sortedItems=[];
        sortedItems=direction==="asc" ?
        this.sortAscending(items,column,type):
        this.sortDescending(items,column,type)
        return sortedItems;
    }
    
    sortAscending(items,column,type){
        return [...items.sort(function(a:any,b:any){
            if(type==='string'){
                if (a[column].toUpperCase() < b[column].toUpperCase()) return -1;
            }
            else{
                return a[column]-b[column];
            }
        })]
    }

    sortDescending(items,column,type){
        return [...items.sort(function(a:any,b:any){
            if(type==='string'){
                if (a[column].toUpperCase() > b[column].toUpperCase()) return -1;
            }
            else{
                return b[column]-a[column];
            }
        })]
    }
}