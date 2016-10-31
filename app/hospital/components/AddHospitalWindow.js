import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import TextBox from '../../base/components/TextBox';
import Label from '../../base/components/Label';
import HospitalTypeComboBox from "./HospitalTypeComboBox";

export default class AddHospitalWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var hospital = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var hospitalTypeComboBox = new HospitalTypeComboBox({});
    var codeTextBox = new TextBox({height: 25, width: '100%'});
    var nameTextBox = new TextBox({height: 25, width: '100%'});

    var formItems = [
      {
        name: 'kode',
        label: 'Kode',
        content: codeTextBox,
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
        name: 'tipe',
        label: 'Tipe',
        content: hospitalTypeComboBox,
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
              url: "/hospitals",
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
      width: 370,
      height: 230,
      title: 'Tambah Rumah Sakit',
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
