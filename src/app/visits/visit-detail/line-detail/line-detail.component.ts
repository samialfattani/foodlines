import { Component, OnInit, ViewChild } from '@angular/core';
import { Move, MoveType } from '../../visit';
import { UtilService } from '../../../services/util.service';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../../items/item';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../login-form/login.service';
import { Permission } from '../../../users/user';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styles: []
})
export class LineDetailComponent implements OnInit {

	public routedUser: string;
	public routedVisitID: string;
	public routedBarcode: string;
	public selectedMove: Move = new Move();
	public moves: Move[];
	
	public MoveType = MoveType;
	public Permission = Permission;

	constructor(
		public loginService: LoginService,
		private util: UtilService,
		private http: HttpClient,
		private rout: ActivatedRoute

	) { }

  ngOnInit() {
		this.bringData();
  }

	bringData()
	{
		this.routedUser = this.rout.snapshot.parent.params['name'];
		this.routedVisitID = this.rout.snapshot.parent.params['id'];

		this.rout.paramMap.subscribe( params => 
		{
				this.routedBarcode = params.get('barcode');
				let lnk = `${environment.baseURL}api/` + 
						`users/${this.routedUser}/` + 
						`visits/${this.routedVisitID}/` +
						`moves/qry/bybarcode/${this.routedBarcode}`;

				this.http.get<Move[]>( lnk)
				.subscribe( 						
					data => this.moves = data ,
					err => this.util.handleError(err)
				);
				
		});		


	}//end bringData


	onSubmit()
	{
		let mov = this.selectedMove;
		let frm1 = <HTMLFormElement> document.getElementById( 'frmLine' );		
		
		
		if( this.isNewRecord() )
		{
			this.http.post<Move>
			(`${environment.baseURL}api/users/${this.routedUser}/visits/${this.routedVisitID}/lines` , mov).subscribe( 
					data => {
						this.util.handleInserted(`${mov.type} Move`);
						this.selectedMove = new Move(); //reset Form						
						this.bringData();
						frm1.hidden = true;
					}, 
						err => this.util.handleError(err, mov) 
				);
		}	else{
			this.http.put<any>
			(`${environment.baseURL}api/users/${this.routedUser}/visits/${this.routedVisitID}/lines/${mov.visit_id}&${mov.barcode}`  , mov)
				.subscribe( 
					data => {
						this.util.handleUpdated(data,  `The ${mov.type} Move`);
						this.selectedMove = new Move(); //reset Form
						this.bringData();
						frm1.hidden = true;
					},
					err => this.util.handleError(err)  
			);
		}
	}//end onSubmit
	
	toggleEdit(mov:Move)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmMove' );
		this.util.removeExtraElements();
		let row:HTMLTableRowElement = <HTMLTableRowElement> document.getElementById( `mv${mov.id}` );
		console.log(mov.id, document);
		let editCell = this.util.addExtraRowAfterThis(row).insertCell();
		editCell.colSpan = 42;

		frm.hidden = false;
		editCell.appendChild( frm );
		this.selectedMove = mov;
	}
	
	@ViewChild ('tblLineDetails') elem;
	toggleInsert(tableID: string)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmMove' );
		this.util.removeExtraElements();
		
		//let table = <HTMLTableElement> document.getElementById( tableID );
		let table = this.elem.nativeElement;

		let addCell = this.util.addExtraRowAfterThis( table.rows[table.rows.length-1] ).insertCell();
		addCell.colSpan = 42;
		
		frm.hidden = false;
		addCell.appendChild( frm );
		(<HTMLFormElement> frm.elements[0]).focus();
		
		//don't reset the form here, otherwise the last refernce will be affected.
		this.selectedMove = new Move( {visit_id: this.routedVisitID, type: MoveType.COUNT} );
	}
	
	delete(mov: Move)
	{
		this.http.delete<any>
		(`${environment.baseURL}api/users/${this.routedUser}/visits/${this.routedVisitID}/moves/${mov.id}`)
			.subscribe( dbAnswer => {
				this.util.handleDeleted(dbAnswer);
				this.bringData();
			},
			err => this.util.handleError(err)
		);		
	}
	
	public expiryDates: Date[];
	onMoveTypeChange(val)
	{
		let exp = <HTMLInputElement> document.getElementById( 'expired_on' );
		exp.disabled= false;

		if(val == MoveType.COUNT || val == MoveType.RETURN)
		{
			let sql = `
					SELECT distinct expired_on FROM moves 
					WHERE barcode = '${this.selectedMove.barcode}'
					AND type = 'COUNT' `
			let qry = { "query" : sql };
			this.http.post<any>(`${environment.baseURL}api/run/sql`, qry)
			.subscribe( 	
				data => this.expiryDates = data.rows ,
				err => this.util.handleError(err)
			);
		}

		if(val == MoveType.COUNT)
			exp.disabled= true;
	}//end

	closeAddEditForm(){
		this.selectedMove = new Move(); //reset Form		
		let frm1 = <HTMLFormElement> document.getElementById( 'frmMove' );
		frm1.hidden = true;
	}


	isNewRecord():boolean{
		return this.selectedMove.id?false:true;
	}

}// end class
