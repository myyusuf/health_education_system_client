import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import TextBox from '../../base/components/TextBox';
import DateInput from '../../base/components/DateInput';
import TextArea from '../../base/components/TextArea';
import NumberInput from '../../base/components/NumberInput';
import FileUpload from '../../base/components/FileUpload';
import Label from '../../base/components/Label';
import DivisionComboBox from "../../division/components/DivisionComboBox";
import ViewImageWindow from "./ViewImageWindow";

export default class EditPermissionInfoForm {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.permissionInfo = options.permissionInfo;
    this.onSaveSuccess = options.onSaveSuccess;

    var tanggalDateInput = new DateInput({value: _this.permissionInfo.tanngal, height: 25, width: '90%'});
    var descriptionTextArea = new TextArea({value: _this.permissionInfo.keterangan, height: 80, width: '90%', placeHolder: ''});
    var jumlahHariNumberInput = new NumberInput({
      value: _this.permissionInfo.jumlah_hari, width: '90%', height: 25,
      basicProperties: {
        min: 1,
        max: 31,
        decimalDigits: 0,
        digits: 2,
        spinButtons: true
      }
    });
    var divisionComboBox = new DivisionComboBox({value: _this.permissionInfo.bagian_id});

    this.fileUpload = new FileUpload({
      width: 220,
      uploadUrl: 'permissioninfo_upload/' + this.permissionInfo.id,
      fileInputName: 'theFile'
    });

    var formItems = [
      {
        name: 'tanggal',
        label: 'Tanggal',
        content: tanggalDateInput
      },
      {
        name: 'keterangan',
        label: 'Keterangan',
        content: descriptionTextArea
      },
      {
        name: 'jumlah_hari',
        label: 'Jumlah Hari',
        content: jumlahHariNumberInput
      },
      {
        name: 'bagian',
        label: 'Bagian',
        content: divisionComboBox,
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
              url: "/permissioninfo/" + _this.permissionInfo.id,
              data: formValue
            }).done(function() {
                $("#successNotification").jqxNotification("open");

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

    this.form = new Form(formOptions);
  }

  render(container) {

    var _this = this;

    var table = $('<table style="height: 70%; width: 100%; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    this.form.render(td);

    tr = $('<tr></tr>');
    td = $('<td style="padding-left: 125px; height: 30px;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);
    this.fileUpload.render(td);

    var viewImage = new Button({
      title:'View Image',
      template: 'primary',
      height: 26,
      onClick: function(){

        var viewImageWindow = new ViewImageWindow({
          url: 'permissioninfo_image/' + _this.permissionInfo.id + "?" + guid()
        });
        viewImageWindow.render($('#dialogWindowContainer'));
        viewImageWindow.open();
      }
    });

    tr = $('<tr></tr>');
    td = $('<td style="padding-left: 125px; height: 30px;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    viewImage.render(td);

  }

  validate(){
    this.form.validate();
  }
}
