/* eslint-disable no-jquery/no-global-selector */
/**
 * Interactive Edit Request - Helper for make an edit request.
 * ส่งคำขอแก้ไขแบบโต้ตอบ - ตัวช่วยสร้างและจัดรูปแบบคำขอแก้ไข
 *
 * @author Patsagorn Y. <https://w.wiki/JSB>
 * @license MIT
 * @dependencies OOjs
 * @revision 2021-10-18
 */

mw.loader.using( [ 'oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows', 'oojs-ui.styles.icons-editing-core' ] ).done( function () {
	function Er( config ) {
		Er.super.call( this, config );
	}
	OO.inheritClass( Er, OO.ui.ProcessDialog );
	Er.static.title = 'ส่งคำขอแก้ไข';
	Er.static.name = 'erDialog';
	Er.static.actions = [
		{
			action: 'back',
			modes: [ 'step2', 'step3' ],
			label: 'ย้อนกลับ',
			flags: [ 'safe', 'back' ]
		},
		{
			action: 'helpback',
			modes: 'help',
			label: 'ย้อนกลับ',
			flags: [ 'safe', 'back' ]
		},
		{
			action: 'next',
			modes: [ 'step1', 'step2' ],
			label: 'ถัดไป',
			flags: [ 'primary', 'progressive' ]
		},
		{
			action: 'help',
			modes: [ 'step1', 'step2', 'step3' ],
			icon: 'help',
			label: 'วิธีใช้และข้อเสนอแนะ'
		},
		{
			modes: 'step1',
			label: 'ยกเลิก',
			flags: [ 'safe', 'close' ]
		},
		{
			action: 'process',
			modes: 'step3',
			label: 'บันทึก',
			flags: [ 'primary', 'progressive' ]
		}
	];

	Er.prototype.initialize = function () {
		Er.super.prototype.initialize.apply( this, arguments );
		this.step = 1; // setting default step

		this.step1 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.step1.$element.append( 'STEP1' );
		// .append(new );

		this.step2 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.step2.$element.append( 'STEP2' );

		this.step3 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.step3.$element.append( 'STEP3' );

		this.help = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.help.$element.append( 'HELP' );

		this.stackLayout = new OO.ui.StackLayout( {
			items: [ this.step1, this.step2, this.step3, this.help ]
		} );

		this.$body.append( this.stackLayout.$element );
	};
	Er.prototype.getSetupProcess = function ( data ) {
		return Er.super.prototype.getSetupProcess.call( this, data )
			.next( function () {
				this.step = 1;
				this.actions.setMode( 'step1' );
			}, this );
	};
	Er.prototype.getActionProcess = function ( action ) {
		if ( action === 'help' ) {
			this.actions.setMode( 'help' );
			this.stackLayout.setItem( this.help );
		} else if ( action === 'back' ) {
			this.step -= 1;
			this.actions.setMode( 'step' + this.step );
			this.stackLayout.setItem( this[ 'step' + this.step ] );
		} else if ( action === 'next' ) {
			this.step += 1;
			this.actions.setMode( 'step' + this.step );
			this.stackLayout.setItem( this[ 'step' + this.step ] );
		} else if ( action === 'helpback' ) {
			this.actions.setMode( 'step' + this.step );
			this.stackLayout.setItem( this[ 'step' + this.step ] );
		} else if ( action === 'process' ) {
			var erdialog = this;
			return new OO.ui.Process( function () {
				erdialog.close();
			} );
		}
		return Er.super.prototype.getActionProcess.call( this, action );
	};
	Er.prototype.getBodyHeight = function () {
		return 200;
	};
	var windowManager = new OO.ui.WindowManager();
	$( document.body ).append( windowManager.$element );
	var dialog = new Er( {
		size: 'medium'
	} );
	windowManager.addWindows( [ dialog ] );
	var erbutton = new OO.ui.ButtonWidget( {
		label: 'ส่งคำขอแก้ไข',
		flags: [ 'primary', 'progressive' ],
		icon: 'edit',
		title: 'ส่งคำขอแก้ไขหน้านี้โดยใช้เครื่องมือช่วยเหลือ'
	} );
	$( '.er-not-supported' )
		.text( '' )
		.append( erbutton.$element.on( 'click', function () {
			windowManager.openWindow( dialog );
		} ) );
} );
