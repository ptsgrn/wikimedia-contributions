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

( function ( mw, $, OO ) {
	mw.loader.using( [
		'oojs-ui-core',
		'oojs-ui-widgets',
		'oojs-ui-windows',
		'oojs-ui.styles.icons-alerts',
		'oojs-ui.styles.icons-editing-core',
		'oojs-ui.styles.icons-interactions'
	] ).done( function () {
		const {
			ButtonWidget,
			DropdownWidget,
			FieldsetLayout,
			LabelWidget,
			MenuOptionWidget,
			MessageWidget,
			PanelLayout,
			Process,
			ProcessDialog,
			StackLayout,
			WindowManager
		} = OO.ui;
		function Er( config ) {
			Er.super.call( this, config );
		}
		OO.inheritClass( Er, ProcessDialog );
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
				icon: 'feedback',
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
			this.content = {
				step1: new FieldsetLayout( {
					label: 'ส่งคำขอแก้ไขหน้านี้',
					icon: 'unLock',
					items: [
						new LabelWidget( {
							label: 'คุณต้องการแก้ไขหน้านี้เพราะเหตุใด'
						} ),
						new DropdownWidget( {
							label: 'โปรดเลือก',
							$overlay: true,
							menu: {
								items: ( function () {
									const ret = [
										new MenuOptionWidget( {
											data: 'coi',
											label: 'ฉันได้รับค่าจ้าง/สิ่งตอบแทน/ไหว้วานในการแก้ไขหน้านี้'
										} ),
										new MenuOptionWidget( {
											data: 'c',
											label: 'Third'
										} ),
										new MenuOptionWidget( {
											data: 'd',
											label: 'Fourth'
										} )
									];
									if ( mw.config.get( 'wgNamespaceNumber' ) === 2 ) {
										ret.splice( 1, 0, new MenuOptionWidget( {
											data: 'autobio',
											label: 'ฉันคือคนในบทความ/มีความเกี่ยวข้องใกล้ชิด/เป็นแฟนคลับของคนในบทความ'
										} ) );
									}
									return ret;
								}() )
							}
						} ),
						new MessageWidget( {
							type: 'notice',
							icon: 'notice',
							label: 'ลองเลือกตัวเลือกด้านบนเพื่อดูคำแนะนำตรงนี้'
						} )
					]
				} )
			};
			this.step1 = new PanelLayout( {
				padded: true,
				expanded: false
			} );
			this.step1.$element
				.append( this.content.step1.$element );

			this.step2 = new PanelLayout( {
				padded: true,
				expanded: false
			} );
			this.step2.$element.append( 'STEP2' );

			this.step3 = new PanelLayout( {
				padded: true,
				expanded: false
			} );
			this.step3.$element.append( 'STEP3' );

			this.help = new PanelLayout( {
				padded: true,
				expanded: false
			} );
			this.help.$element.append( 'HELP' );

			this.stackLayout = new StackLayout( {
				items: [
					this.step1,
					this.step2,
					this.step3,
					this.help
				]
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
				const erdialog = this;
				return new Process( function () {
					erdialog.close();
				} );
			}
			return Er.super.prototype.getActionProcess.call( this, action );
		};
		Er.prototype.getBodyHeight = function () {
			return 200;
		};
		Er.prototype.getContent = function () {
			return this.content;
		};
		const windowManager = new WindowManager();
		$( document.body ).append( windowManager.$element );
		const dialog = new Er( {
			size: 'medium'
		} );
		windowManager.addWindows( [ dialog ] );
		const erbutton = new ButtonWidget( {
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
		dialog.getContent().step1.items[ 1 ].getMenu().on( 'select', function ( element ) {
			if ( [ 'normal', 'typo', 'style' ].indexOf( String( element.getData() ) ) !== -1 ) {

			}
		} );
	} );
}( mw, $, OO ) );
