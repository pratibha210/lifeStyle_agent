
import logout from '../Images/turn-off.png';
import profile from '../Images/user.png';
import edit from '../Images/edit.png';
import trash from '../Images/trash.png';


export const DROPDOWN_MENU = Object.freeze({
	profile_dropdown: {
		options: [
			{ label: 'My Profile', value: 'profile', imgsrc: profile },
			{ label: 'Logout', value: 'logout', imgsrc: logout },
		]
	},
	training_dropdown: {
		options: [
			{ label: 'Edit', value: 'edit', imgsrc: edit },
			{ label: 'Delete', value: 'delete', imgsrc: trash },
		]
	},
	filetr_dropdown: {
		options: [
			{ label: 'Category1', value: 'Category1' },
			{ label: 'Category2', value: 'Category2'},
			{ label: 'Category3', value: 'Category3'},
		]
	},
	buyer_dropdown:{

		options:[
			{label:'Buyer',value:'buyer'},
			{label:'Listing',value:'listing'}
		]
	}
});
export const SELECT_MENU = Object.freeze({
	category_option:{
		options: [
			{ label: 'Category 1', value: 'firstcategory' },
			{ label: 'Category 1', value: 'firstcategory' },
			{ label: 'Category 1', value: 'firstcategory' },
			{ label: 'Category 1', value: 'firstcategory' },
		]
	}
});


export const HEADER_MENU = Object.freeze({
	adminHeaderMenu_Options: {
		options: [
			{ label: 'Home', value: 'home' },
			{ label: 'Buyer Book', value: 'buyerbook', icn: "ri-shopping-bag-3-line" },
			{ label: 'Marketing', value: 'marketing' },
			{ label: 'Training', value: 'training' },
			{ label: 'Manager', value: 'manager' },
			{ label: 'User', value: 'user' },
			{ label: 'Reference', value: 'reference' },
			{ label: ' Company Store', value: 'company_store' },
			{ label: ' FAQ', value: 'faq' },
		]
	},
	managerHeaderMenu_Options: {
		options: [
			{ label: 'Home', value: 'home', icn: "ri-home-4-line" },
			{ label: 'Buyer Book', value: 'buyerbook', icn: "ri-shopping-bag-3-line" },
			{ label: 'Marketing', value: 'marketing', icn: 'ri-pie-chart-2-line' },
			{ label: 'Training', value: 'training', icn: "ri-live-line" },
			{ label: 'User', value: 'user', icn:'ri-user-line' },
			{ label: 'Reference', value: 'reference', icn: 'ri-file-text-line'  },
			{ label: ' Company Store', value: 'company_store',  icn: 'ri-store-2-line' },
			{ label: ' FAQ', value: 'faq', icn: 'ri-chat-3-line' },
		]
	},
	headerMenu_Options: {
		options: [
			{ label: 'Home', value: 'home' },
			{ label: 'Marketing', value: 'marketing' },
			{ label: 'Training', value: 'training' },
			{ label: 'Reference', value: 'reference' },
			{ label: ' Company Store', value: 'company_store' },
			{ label: ' FAQ', value: 'faq' },
			{ label: ' Contact Us', value: 'contact' },
		]
	},
	ledftsideMenu_Options: {
		options: [
			// { label: 'Quick Links', value:'quicklink', icn:"ri-links-fill"},
			{ label: 'Home', value: 'home', icn: "ri-home-4-line" },
			{ label: 'Buyer Book', value: 'buyerbook', icn: "ri-shopping-bag-3-line" },
			{ label: 'Marketing', value: 'marketing', icn: 'ri-pie-chart-2-line' },
			{ label: 'Training', value: 'training', icn: "ri-live-line" },
			{ label: 'Reference', value: 'reference', icn: 'ri-file-text-line' },
			{ label: ' Company Store', value: 'company_store', icn: 'ri-store-2-line' },
			{ label: ' FAQ', value: 'faq', icn: 'ri-chat-3-line' },
			{ label: ' Support', value: 'support', icn: "ri-tools-fill", },
			// { label: ' Contact Us',value:'contact', icn:"ri-contacts-line"},
		]
	},

	ledftsideAdminMenu_Options: {
		options: [
			// { label: 'Quick Links', value:'quicklink', icn:"ri-links-fill"},
			{ label: 'Home', value: 'home', icn: "ri-home-4-line" },
			{ label: 'Buyer Book', value: 'buyerbook', icn: "ri-shopping-bag-3-line" },
			{ label: 'Marketing', value: 'marketing', icn: 'ri-pie-chart-2-line' },
			{ label: 'Training', value: 'training', icn: "ri-live-line" },
			{ label: 'Reference', value: 'reference', icn: 'ri-file-text-line' },
			{ label: ' Company Store', value: 'company_store', icn: 'ri-store-2-line' },
			{ label: 'Manager', value: 'manager', icn:'ri-user-star-line' },
			{ label: 'User', value: 'user', icn:'ri-user-line' },
			{ label: ' FAQ', value: 'faq', icn: 'ri-chat-3-line' },
			{ label: ' Support', value: 'support', icn: "ri-tools-fill", },

			// { label: ' Contact Us',value:'contact', icn:"ri-contacts-line"},
		]
	},
});

