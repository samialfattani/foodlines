import { Component, OnInit } from '@angular/core';
import { SettingService } from './setting.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css'],
	providers: [SettingService]
})
export class SettingComponent implements OnInit 
{
	selectedCategory: any= {};
	categories:any[];
	itemCategories;
	newCategory=null;

	constructor(
		public settingService: SettingService,
		private toastr: ToastrService,
		private util:UtilService){	}

  ngOnInit(){ 
		this.bringData();
	}

	bringData()
	{
		this.settingService.getCategoriesByType('item')
		.subscribe( 
			data => this.itemCategories = data,
			err => this.util.handleError(err)
		);
	}

	addCatgory(frm: NgForm)
	{
		event.preventDefault();
		
		let cat = frm.value;
		console.log(cat);

		this.settingService.insertCategory(cat).subscribe( 
				catgry => {
					this.toastr.success(`<b>${catgry.name}</b> Added Succefully`, 'OK');
					frm.reset();
					this.bringData();
				},
					err => this.util.handleError(err)
		);

	}
	
	deleteCategory(cat)
	{
		this.settingService.deleteCategory(cat).subscribe( 
			res => {
				this.toastr.warning(`${cat.name} Deleted !`, 'OK');
				this.bringData();
			},
				err => this.util.handleError(err)
		);
	}


}//end class
