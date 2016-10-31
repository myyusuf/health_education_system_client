import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import TextBox from '../../base/components/TextBox';
import Label from '../../base/components/Label';
import LevelComboBox from "./LevelComboBox";

export default class AddStudentWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var student = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var levelComboBox = new LevelComboBox({});
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
      },
      {
        name: 'tingkat',
        label: 'Tingkat',
        content: levelComboBox,
        validation:{
          type: 'COMBOBOX',
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

    this.window = new AddWindow({
      width: 390,
      height: 250,
      title: 'Tambah Siswa',
      content: form,
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
