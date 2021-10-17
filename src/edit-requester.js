$( function () {
	var Er = {
		version: 0.1,
		maintainer: 'Patsagorn Y.',
		feedback: 'WP:TECH',
		step: 0
	};

	$( '.er-not-supported' ).hide();
	$( '.mw-parser-output .er-container .er-start-button.mw-ui-button' ).show().on( 'click', function () {
		erinit();
	} );

	// Example: An action set used in a process dialog
	function Er( config ) {
		Er.super.call( this, config );
	}
	OO.inheritClass( Er, OO.ui.ProcessDialog );
	Er.static.title = 'An action set in a process dialog';
	Er.static.name = 'myProcessDialog';
	// An action set that uses modes ('edit' and 'help' mode, in this example).
	Er.static.actions = [
		{
			action: 'continue',
			modes: 'edit',
			label: 'Continue',
			flags: [ 'primary', 'progressive' ]
		},
		{ action: 'help', modes: 'edit', label: 'Help' },
		{ modes: 'edit', label: 'Cancel', flags: 'safe' },
		{ action: 'back', modes: 'help', label: 'Back', flags: 'safe' }
	];

	Er.prototype.initialize = function () {
		Er.super.prototype.initialize.apply( this, arguments );
		this.panel1 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.panel1.$element.append( '<p>This dialog uses an action set (continue, help, ' +
      'cancel, back) configured with modes. This is edit mode. Click \'help\' to see ' +
      'help mode.</p>' );
		this.panel2 = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.panel2.$element.append( $( '<p>This is help mode. Only the \'back\' action widget ' +
       'is configured to be visible here. Click \'back\' to return to \'edit\' mode.' +
       '</p>' ) );
		this.stackLayout = new OO.ui.StackLayout( {
			items: [ this.panel1, this.panel2 ]
		} );
		this.$body.append( this.stackLayout.$element );
	};
	Er.prototype.getSetupProcess = function ( data ) {
		return Er.super.prototype.getSetupProcess.call( this, data )
			.next( function () {
				this.actions.setMode( 'edit' );
			}, this );
	};
	Er.prototype.getActionProcess = function ( action ) {
		if ( action === 'help' ) {
			this.actions.setMode( 'help' );
			this.stackLayout.setItem( this.panel2 );
		} else if ( action === 'back' ) {
			this.actions.setMode( 'edit' );
			this.stackLayout.setItem( this.panel1 );
		} else if ( action === 'continue' ) {
			var dialog = this;
			return new OO.ui.Process( function () {
				dialog.close();
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

	function erinit() {
		windowManager.openWindow( dialog );
	}
} );
