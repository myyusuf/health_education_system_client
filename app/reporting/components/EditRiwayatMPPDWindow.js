import { guid } from '../../base/Utils';
import Tabs from "../../base/components/Tabs";
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import TextBox from '../../base/components/TextBox';
import Label from '../../base/components/Label';

export default class EditRiwayatMPPDWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var student = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var stambukLamaTextBox = new TextBox({height: 25, width: '100%'});
    var stambukBaruTextBox = new TextBox({height: 25, width: '100%'});
    var nameTextBox = new TextBox({height: 25, width: '100%'});

    var formItems = [
      {
        name: 'stambukLama',
        label: 'Stambuk Lama',
        content: stambukLamaTextBox,
        validation:{
          type: 'TEXTBOX',
          rule: 'required'
        }
      },
      {
        name: 'stambukBaru',
        label: 'Stambuk Baru',
        content: stambukBaruTextBox,
        validation:{
          type: 'TEXTBOX',
          rule: 'required'
        }
      },
      {
        name: 'nama',
        label: 'Nama',
        content: nameTextBox,
        validation:{
          type: 'TEXTBOX',
          rule: 'required'
        }
      }
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "POST",
              url: "/students",
              data: formValue
            }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
            }).fail(function( jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
            });
      }
    }

    var form = new Form(formOptions);

    var tabs = new Tabs([
      {
        id: 'summary',
        title: 'Summary',
        content: form
      }
    ],
  {
    width: 530,
    height: 500
  });

    this.window = new AddWindow({
      width: 550,
      height: 600,
      title: 'Edit Riwayat MPPD',
      content: tabs,
      onSave: function(){
        form.validate();
      },
      onCancel: function(){
        _this.window.close();
      }
    });

  }

  render(container) {

    var _this = this;
    this.window.render(container);

  }

  open(){
    this.window.open();
  }
}
