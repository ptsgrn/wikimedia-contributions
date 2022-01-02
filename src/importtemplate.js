/**
 * นำเข้าแม่แบบจากวิกิหนึ่งมาอีกวิกิหนึ่งโดยไม่ต้องใช้สิทธิ์ 'import'
 *
 * @author Patsagorn Y. <https://w.wiki/JSB>
 * @license MIT
 * @dependencies OOjs
 * @revision 2021-10-18
 */
( function ( mw, $, OO ) {
	mw.loader.using( [
		'oojs-ui-core',
		'oojs-ui-widgets'
		// 'oojs-ui-windows',
		// 'oojs-ui.styles.icons-alerts',
		// 'oojs-ui.styles.icons-editing-core',
		// 'oojs-ui.styles.icons-interactions'
	] ).done( function () {
		const {
			ButtonWidget: Button,
			ButtonGroupWidget: ButtonGroup,
			CheckboxInputWidget: Checkbox,
			DropdownInputWidget: Dropdown,
			FieldLayout: Field,
			FieldsetLayout: Fieldset,
			FormLayout: Form,
			TextInputWidget: TextInput
		} = OO.ui;
		$( '#mw-content-text' ).prepend( '<div id="importtemplate-container"></div>' );
		const $importtemplateContainer = $( '#importtemplate-container' );
		const itContainer = new Fieldset( {
			label: 'นำเข้าแม่แบบ'
		} );
		itContainer.addItems( [
			new Dropdown( {
				label: 'วิกิต้นทาง',
				required: true,
				options: [
					{ data: 'birowiki', label: 'วิกิพี่นก' },
					{ data: 'masterwiki', label: 'วิกิมาส' },
					{ data: 'maskanwiki', label: 'วิกิมาสการณ์' },
					{ data: 'infomaskanwiki', label: 'วิกิมาสสารสนเทศ' }
				]
			} ),
			new TextInput( {
				label: 'ชื่อแม่แบบที่ต้องการนำเข้าในวิกิต้นทาง',
				name: 'importtemplate-name',
				value: mw.config.get( 'wgPageName' ),
				required: true,
				placeholder: 'Template:Welcome'
			} ),
			new Field( new Checkbox( {
				name: 'finddepends'
			} ), {
				label: 'ค้นหาแม่แบบแม่แบบ/มอดูลที่แม่แบบนี้ใช้ด้วย',
				align: 'inline'
			} ),
			new ButtonGroup( {
				items: [
					new Button( {
						label: 'นำเข้าทันที',
						flags: 'destructive'
					} ),
					new Button( {
						label: 'ค้นหาแม่แบบ',
						icon: 'search',
						title: 'ค้นหาแม่แบบ',
						flags: [
							'primary',
							'progressive'
						]
					} )
				]
			} )
		]
		);
		itContainer.items[ 0 ].on( 'change', function ( e ) {
			itContainer.items[ 3 ].setDisabled( false ).setTitle( 'ค้นหาแม่แบบนี้ใน "' + e + '"' );
		} );
		const itForm = new Form( {
			items: [ itContainer ]
		} );
		$importtemplateContainer.append( itForm.$element );
	} );
}( mediaWiki, jQuery, OO ) );
