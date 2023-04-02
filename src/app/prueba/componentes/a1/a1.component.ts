import { Component } from '@angular/core';

@Component({
  selector: 'app-a1',
  templateUrl: './a1.component.html',
  styleUrls: ['./a1.component.scss']
})
export class A1Component {
  ar:any = [
    {a:"vote"},
    {a:"vote"},
    {a:"vote"},
    {a:"vote"},
  ];

  indexClick = -1;

  btnActive = true;

  clickButon(evt:any, index:number){

    alert(evt.target.innerHTML);
    if(!this.clicEqual(index)){
    this.btnActive = false;
    this.indexClick =index;
    }else{
      this.btnActive = true;
      this.indexClick =-1;
    }
  }

  clicEqual(id:number){ 
    if(id==this.indexClick){
      return true;
    }
    return false;
  }
  unvote(){
    this.btnActive = true;
    this.indexClick =-11;
  }
}
