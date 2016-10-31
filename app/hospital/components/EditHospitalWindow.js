import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import EditWindow from '../../base/components/EditWindow';
import TextBox from '../../base/components/TextBox';
import Label from '../../base/components/Label';
import HospitalTypeComboBox from "./HospitalTypeComboBox";

export default class EditHospitalWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var hospital = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var hospitalTypeComboBox = new HospitalTypeComboBox({value: hospital.tipe});
    var codeTextBox = new TextBox({value: hospital.kode, height: 25, width: '100%'});
    var nameTextBox = new TextBox({value: hospital.nama, height: 25, width: '100%'});

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
              method: "PUT",
              url: "/hospitals/" + hospital.id,
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

    this.window = new EditWindow({
      width: 390,
      height: 250,
      title: 'Edit Siswa',
      content: form,
      onSave: function(){
        form.validate();
      },
      onCancel: function(){
        _this.window.close();
      },
      onDelete: function(){
        var r = confirm("Proses hapus data akan dilakukan!");
        if (r == true) {
          $.ajax({
                method: "DELETE",
                url: "/hospitals/" + hospital.id,
                data: { }
              }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(_this.onSaveSuccess){
                  _this.onSaveSuccess();
                }
              }).fail(function() {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
              });
        }
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
