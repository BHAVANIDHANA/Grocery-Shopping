import { Component, OnInit } from '@angular/core';
import { VeggiesService } from '../veggies.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Vegetable } from '../vegetable.model';

@Component({
  selector: 'app-new-veggie',
  templateUrl: './new-veggie.component.html',
  styleUrls: ['./new-veggie.component.css']
})
export class NewVeggieComponent implements OnInit {
form:FormGroup;
imageUrl:string="assets/images/default.jpg";
fileToUpload:File=null;
mode:string="create";
selectedVeggieId:string=null;
selectedVeggie:Vegetable;

  constructor(public activatedRoute:ActivatedRoute, public veggiesService:VeggiesService) { }

  ngOnInit() {
    this.form=new FormGroup({
      name:new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      image:new FormControl(null, {validators: [Validators.required]}),
      price:new FormControl(null, {validators:[Validators.required]})
    });

    this.activatedRoute.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode='edit';
        this.selectedVeggieId = paramMap.get('id');
        this.selectedVeggie = this.veggiesService.getVeggiesById(this.selectedVeggieId);
        console.log(this.selectedVeggie);   
        this.form.setValue({
          name:this.selectedVeggie.name,
          image:this.selectedVeggie.imagePath,
          price:this.selectedVeggie.price
       });
       this.imageUrl = this.selectedVeggie.imagePath;     
      }else{
        this.mode='create';
        this.selectedVeggieId=null;
      }
    });   
  }

  onImagePicked(event:Event) {
    const files = (event.target as HTMLInputElement).files;
    this.fileToUpload= files.item(0);
    let reader = new FileReader();
    reader.onload = (event:any)=>{
      this.imageUrl=event.target.result;
      this.form.patchValue({
        image:this.imageUrl
      });
    }
    reader.readAsDataURL(this.fileToUpload);    
  }

  onSaveVeggie(){
   if(this.form.invalid){
     return;
   }
   if(this.mode==='edit'){
     this.veggiesService.updateVeggie(this.selectedVeggieId, this.form.value.name, this.form.value.image, this.form.value.price);
    }else{
      console.log(this.form);
      this.veggiesService.addNewVeggie(this.form.value.name, this.form.value.image, this.form.value.price);
    } 
    this.form.reset();
    
  }
}
