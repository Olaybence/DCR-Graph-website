import{Pipe,PipeTransform} from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform{

transform(items,searchTerm){
let filteredList=[];
if(searchTerm){
let newSearchTerm=!isNaN(searchTerm)? searchTerm.toString(): searchTerm.toString().toUpperCase();
let prop;
return items.filter(item=>{
for(let key in item){
prop=isNaN(item[key]) ? item[key].toString().toUpperCase() : item[key].toString();
if(prop.indexOf(newSearchTerm) > -1){
filteredList.push(item);
return filteredList;}
}
})
}
else{
return items;
}}
}