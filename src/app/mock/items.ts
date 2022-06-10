import { Item } from "../items/item";

enum ItemCategory{
	TAM_TAM = 1,
	BLONZY_CHIPS = 2,
	BLONZY_OTHER = 3
}
export const ITEMS:Item[] = [
		new Item({barcode:1151999846, desc:'فور سوداني 12 جم', unitPrice:5, category: ItemCategory.TAM_TAM}) ,
		new Item({barcode:1151990032, desc:'مشكل 20 جم', unitPrice:5, category: ItemCategory.TAM_TAM}) ,

		new Item({barcode:1251911111, desc:'جبنة 40 جم', unitPrice:5, category:  ItemCategory.BLONZY_CHIPS}) ,
		new Item({barcode:1251922222, desc:'كاتشب 40 جم', unitPrice:5, category: ItemCategory.BLONZY_CHIPS}) ,
		new Item({barcode:1251933333, desc: 'ملح وخل 40 جم', unitPrice:5, category: ItemCategory.BLONZY_CHIPS}) ,

		new Item({barcode:1351911111, desc:'دوار شمس 25 جم', unitPrice:5, category: ItemCategory.BLONZY_OTHER}) ,
		new Item({barcode:1351922222, desc:'سوبر 18 جم', unitPrice:5, category: ItemCategory.BLONZY_OTHER}) ,
		new Item({barcode:1351933333, desc:'مكسرات مشكل سوبر', unitPrice:5, category: ItemCategory.BLONZY_OTHER}) 
		
];