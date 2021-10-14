var ER = {
  version: 0.1,
  maintainer: "Patsagorn Y.",
  feedback: "WP:TECH"
}

$(".er-not-supported").hide()
$(".mw-parser-output .er-container .er-start-button.mw-ui-button").show().click(function(){
  $(".mw-parser-output .er-container .er-start-button.mw-ui-button").hide({duration: 200, easing: 'ease-in-out'})
  // erinit();

  function PageOneLayout( name, config ) {
    PageOneLayout.super.call( this, name, config );
    this.$element.append( '<p>First page</p><p>(This booklet has an outline, displayed on ' +
    'the left)</p>' );
}
OO.inheritClass( PageOneLayout, OO.ui.PageLayout );
PageOneLayout.prototype.setupOutlineItem = function () {
    this.outlineItem.setLabel( 'Page One' );
};

function PageTwoLayout( name, config ) {
    PageTwoLayout.super.call( this, name, config );
    this.$element.append( '<p>Second page</p>' );
}
OO.inheritClass( PageTwoLayout, OO.ui.PageLayout );
PageTwoLayout.prototype.setupOutlineItem = function () {
    this.outlineItem.setLabel( 'Page Two' );
};

var page1 = new PageOneLayout( 'one' ),
    page2 = new PageTwoLayout( 'two' );

var booklet = new OO.ui.BookletLayout( {
    outlined: true
} );

booklet.addPages( [ page1, page2 ] );

  function ProcessDialog( config ) {
    ProcessDialog.super.call( this, config );
  }
  OO.inheritClass( ProcessDialog, OO.ui.ProcessDialog );
  
  // Specify a name for .addWindows()
  ProcessDialog.static.name = 'myDialog';
  // Specify a static title and actions.
  ProcessDialog.static.title = 'Process dialog';
  ProcessDialog.static.actions = [
    {
      action: 'save',
      label: 'Done',
      flags: 'primary'
    },
    {
      label: 'Cancel',
      flags: 'safe'
    }
  ];
  
  // Use the initialize() method to add content to the dialog's $body,
  // to initialize widgets, and to set up event handlers.
  ProcessDialog.prototype.initialize = function () {
    ProcessDialog.super.prototype.initialize.apply( this, arguments );
    this.$body.append( booklet.$element );
  };
  
  // Use the getActionProcess() method to specify a process to handle the
  // actions (for the 'save' action, in this example).
  ProcessDialog.prototype.getActionProcess = function ( action ) {
    var dialog = this;
    if ( action ) {
      return new OO.ui.Process( function () {
        dialog.close( {
          action: action
        } );
        $(".mw-parser-output .er-container .er-start-button.mw-ui-button").show()
      } );
    }
  // Fallback to parent handler.
    return ProcessDialog.super.prototype.getActionProcess.call( this, action );
  };
  
  // Get dialog height.
  ProcessDialog.prototype.getBodyHeight = function () {
    return this.$body.outerHeight( true );
  };
  
  // Create and append the window manager.
  var windowManager = new OO.ui.WindowManager();
  erWrapper.append( windowManager.$element );
  
  // Create a new dialog window.
  var processDialog = new ProcessDialog({
    size: 'medium'
  });
  
  // Add windows to window manager using the addWindows() method.
  windowManager.addWindows( [ processDialog ] );
  
  // Open the window.
  windowManager.openWindow( processDialog );
})

let erWrapper = $(".er-container")

function erinit() {
  let step1dropDown = new OO.ui.DropdownWidget( {
		label: '<โปรดเลือก>',
    menu: {
			items: [
				new OO.ui.MenuOptionWidget( {
					data: 'paid',
					label: 'ฉันได้รับการว่าจ้างให้แก้ไข/เขียนบทความนี้'
				} ),
				new OO.ui.MenuOptionWidget( {
					data: 'coi',
					label: 'ฉันมีความเกี่ยวข้อง/รู้จัก/ใกล้ชิดกับคนในบทความ'
				} ),
				new OO.ui.MenuOptionWidget( {
					data: 'normal',
					label: 'บทความนี้ถูกล็อก ฉันต้องการเปลี่ยนแปลงบางอย่าง'
				} )
			]
		}
	}),
  step1commentData = {
    paid: "วิกิพีเดียไม่รับเนื้อหาที่มีการว่าจ้างเพื่อให้เขียน",
    coi: "วิกิพีเดียไม่รับเนื่อหาที่มีการได้รับผลประโยชน์ตอบแทน",
    normal: "กดปุ่มถัดไป เพื่อไปต่อ"
  },
  step1button = new OO.ui.ButtonWidget({
    label: 'ถัดไป',
    icon: 'next',
    class: 'nextbutton',
    flags: ['primary', 'progressive'],
  }),
  itemSelected = function() {
    if (step1dropDown.getMenu().findSelectedItem().getData() === 'normal') step1button.setDisabled(false)
    $(".er-comment").text(function() {
      return step1commentData[step1dropDown.getMenu().findSelectedItem().getData()+""] || ""
    })
	};
  step1dropDown.getMenu().on('select', itemSelected);
  let step1content = $("<div class=\"er-step-1\"></div>")
    .append($("<p>เพราะเหตุใดคุณจึงต้องการแก้ไขบทความนี้</p>"))
    .append(step1dropDown.$element)
    .append($("<p class=\"er-comment\"></p>"))
    .append(step1button.setDisabled(true).$element);
  erWrapper
    .removeClass("center")
    .append($("<h1>คำขอแก้ไข</h1>"))
    .append(step1content);
  step1dropDown.focus();
  step1button.on('click', function() {
    // ทำให้ step1 จาง
    step1content.css('opacity', '0.2')
    // ซ่อนปุ่มถัดไป
    step1button.$element.hide()
    // disabled dropdown
    step1dropDown.setDisabled(!0)
    erStep2()
  });
}

function erStep2() {
  let step2backbutton = new OO.ui.ButtonWidget({
    label: 'ย้อนกลับ',
    icon: 'back',
    class: 'backbutton',
    flags: [],
  }),
  step2nextbutton = new OO.ui.ButtonWidget({
    label: 'ย้อนกลับ',
    icon: 'nex',
    class: 'nextbutton',
    flags: ['primary', 'progressive'],
  }),
  step2dropdown = new OO.ui.DropdownWidget( {
		label: '<โปรดเลือก>',
    menu: {
			items: [
				new OO.ui.MenuOptionWidget( {
					data: 'typo',
					label: 'มีคำที่เขียนผิดในบทความ'
				} ),
				new OO.ui.MenuOptionWidget( {
					data: 'addcite',
					label: 'เพิ่มแหล่งอ้างอิง'
				} ),
				new OO.ui.MenuOptionWidget( {
					data: 'massedit',
					label: 'ปรับเนื้อหาจำนวนมาก (เลือกที่ "อื่น ๆ" แทน)',
          disabled: true
				} ),
				new OO.ui.MenuOptionWidget( {
					data: 'selfedit',
					label: 'แก้ไขด้วยตัวเอง'
				} ),
        new OO.ui.MenuOptionWidget( {
					data: 'other',
					label: 'อื่น ๆ'
				} )
			]
		}
	}),
  step2selfEditWarn = $("")
  erWrapper
    .append(
      $("<div class=\"er-step-2\"></div>")
        .append($("<p>คุณต้องการจะแก้ไขอย่างไร"))
        .append(step2dropdown.$element)
        .append(step2backbutton.$element)
        .append(step2nextbutton.$element)
    );
  step1dropDown.getMenu().on('select', function () {
    if (step2dropDown.getMenu().findSelectedItem().getData() == "selfedit") {
      step2dropdown.append()
    }
  });
}