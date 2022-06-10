import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../services/util.service';
import { LoginService } from '../../login-form/login.service';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { Visit, Move, MoveType, Line } from '../visit';
import { Permission } from '../../users/user';
import { environment } from '../../../environments/environment';
import { Item } from '../../items/item';
import { ItmesService } from '../../items/itmes.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { LineDetailComponent } from './line-detail/line-detail.component';

@Component({
  selector: 'app-visit-detail',
  templateUrl: './visit-detail.component.html',
	styles: [],
	providers: [ItmesService]
})
export class VisitDetailComponent implements OnInit {

	public visit: Visit = new Visit();
	public routedUser: String;
	public routedVisitID: String;
	public Permission = Permission;
	public selectedLine = new Line();
	public vstLines:any[];
	public items: Item[];
	public categories: string[];

  constructor(
		private http: HttpClient,
		private util:UtilService,
		private loginService:LoginService,
		private itemService: ItmesService,
		private rout: ActivatedRoute,
		private router: Router,
		private factoryResolver: ComponentFactoryResolver
	){
			itemService.getItems().subscribe(
				data => this.items = data,
				err => util.handleError(err)
			);
			

			itemService.getAllCategories().subscribe(
				data => this.categories = data.map(cat => cat.name),
				err => util.handleError(err)
			);
	 }

  ngOnInit() {
		this.bringData();
	}
	
	bringData()
	{
		this.routedUser =  this.rout.snapshot.params['name'];
		this.routedVisitID = this.rout.snapshot.params['id'];

		this.http.get<Visit>(`${environment.baseURL}api/users/${this.routedUser}/visits/${this.routedVisitID}`)
		.subscribe( 						
			v => { 
				this.visit = new Visit(v);
				this.bringVstLines(this.visit);
			} ,
			err => this.util.handleError(err)
		);
	}//end bringData
	
	bringVstLines(vst:Visit)
	{
		let qry = { "query" : this.linesReport( vst.id ) };
		this.http.post<any>(`${environment.baseURL}api/run/sql`, qry)
		.subscribe( 						
			data => { this.vstLines = data.rows } ,
			err => this.util.handleError(err)
		);
	}

	linesReport = (vstID) => `
	SELECT r.visit_id, r.barcode, r.desc, r.unit_price, counts, sales, returns, old_stock, 
		old_stock - counts + returns as suggested,
		counts + sales - returns as stock
	FROM (
		select L.visit_id, items.barcode, items.desc, L.unit_price,
				COALESCE( sum(m.count) FILTER (WhERE m.type = 'COUNT') ,0) "counts",
				COALESCE( sum(m.count) FILTER (WhERE m.type = 'SALE') ,0) "sales",
				COALESCE( sum(m.count) FILTER (WhERE m.type = 'RETURN') ,0) as "returns",
				GET_STOCK_OF_LAST_VISIT(2, items.barcode)  old_stock				
		from lines L
					left outer join items on L.barcode = items.barcode 
					left join moves m  on L.visit_id  = m.visit_id AND L.barcode = m.barcode
		where L.visit_id = 2
		group BY L.visit_id, items.barcode, items.desc ,l.unit_price
		order by 1) R
	`;
	

	/** ========= CRUD =================================== */

	onSubmit()
	{
		let lin = <any> this.selectedLine;
		let frm1 = <HTMLFormElement> document.getElementById( 'frmLine' );		
		
		//Update, or Insert if not exists.
		this.http.patch<any>
		(`${environment.baseURL}api/users/${this.routedUser}/visits/${this.routedVisitID}/lines/${lin.barcode}` , lin)
			.subscribe( 
				result => 
				{
					if(result.isInserted)
						this.util.handleInserted(`${lin.desc} Move`);
					else
						this.util.handleUpdated({updated:[1]},  `The ${lin.desc} Move`);
					this.selectedLine = new Line(); //reset Form
					frm1.hidden = true;
					this.bringData();
				},
				err => this.util.handleError(err)
		);
	}//end onSubmit

	delete(lin: Line)
	{
		this.http.delete<any>
		(`${environment.baseURL}api/users/${this.routedUser}/visits/${this.routedVisitID}/lines/${lin.barcode}`)
			.subscribe( dbAnswer => {
				this.util.handleDeleted(dbAnswer);
				this.bringData();
			},
			err => this.util.handleError(err)
		);		
	}


	closeAddEditForm(){
		this.selectedLine = new Line(); //reset Form		
		let frm1 = <HTMLFormElement> document.getElementById( 'frmLine' );		
		frm1.hidden = true;
	}

	toggleEdit(lin:Line)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmLine' );
		this.util.removeExtraElements();
		let row:HTMLTableRowElement = <HTMLTableRowElement> document.getElementById( lin.barcode +'' );
		
		let editCell = this.util.addExtraRowAfterThis(row).insertCell();
		editCell.colSpan = 42;

		frm.hidden = false;
		editCell.appendChild( frm );
		this.selectedLine = lin;
	}

	toggleLineDetails(lin:Line)
	{
		let divLineDetails = <HTMLDivElement> document.getElementById( 'divLineDetails' );
		document.body.appendChild( divLineDetails );
		this.util.removeExtraElements();
		let row:HTMLTableRowElement = <HTMLTableRowElement> document.getElementById( lin.barcode +'' );
		
		let editCell = this.util.addExtraRowAfterThis(row).insertCell();
		editCell.colSpan = 42;
		editCell.appendChild(  divLineDetails );

		this.router.navigate([`/users/${this.routedUser}/visits/${this.routedVisitID}/moves/qry/bybarcode/${lin.barcode}`]);
		
		this.selectedLine = lin;
	}

	toggleInsert(tableID: string)
	{
		let frm = <HTMLFormElement> document.getElementById( 'frmLine' );
		this.util.removeExtraElements();

		let table = <HTMLTableElement> document.getElementById( tableID );
		let addCell = this.util.addExtraRowAfterThis( table.rows[table.rows.length-1] ).insertCell();
		addCell.colSpan = 42;
		
		frm.hidden = false;
		addCell.appendChild( frm );
		(<HTMLFormElement> frm.elements[0]).focus();
		
		//don't reset the form here, otherwise the last refernce will be affected.
		this.selectedLine = new Line( {visit_id: this.routedVisitID } );
	}
	
	isNewRecord():boolean{
		return this.selectedLine.barcode?false:true;
	}

	itemsOfCat(c)
	{
		if(this.items == null)
			return null;

		return this.items.filter ( it => it.category ==  c);
	}
	
	

}//end class;


// select barcode, COALESCE(counts,0) "counts", COALESCE(sales,0) "sales", COALESCE(returns,0) "returns"
// from crosstab('
// 		select  comb.barcode, comb.type , sum(COALESCE(m.count,0)) count 
// 		from moves m
// 		FULL OUTER JOIN(
// 				SELECT * 
// 				FROM 
// 						(SELECT distinct barcode FROM moves WHERE visit_id = ${vstID}) b,
// 						(SELECT distinct type FROM moves WHERE visit_id = ${vstID}) t  
// 		) comb 
// 		ON  m.barcode = comb.barcode 
// 		and m.type = comb.type
// 		and m.visit_id = ${vstID}
// 		group by comb.barcode, comb.type
// 		order by 1 ,2;
// ')
// as w(barcode varchar, counts BIGINT, sales BIGINT, returns BIGINT); 	