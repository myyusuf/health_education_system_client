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

export default class EditMedicalInfoForm {

  constructor(options) {
    this.id = guid();

    var tanggalDateInput = new DateInput({height: 25, width: '90%'});
    var descriptionTextArea = new TextArea({height: 80, width: '90%', placeHolder: ''});
    var jumlahHariNumberInput = new NumberInput({
      value: 1, width: '90%', height: 25,
      basicProperties: {
        min: 1,
        max: 31,
        decimalDigits: 0,
        digits: 2,
        spinButtons: true
      }
    });
    var divisionComboBox = new DivisionComboBox({value: 1});

    this.fileUpload = new FileUpload({
      width: 220,
      uploadUrl: 'upload.php',
      fileInputName: 'fileToUpload'
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
              method: "POST",
              url: "/medicalinfo",
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

    this.form = new Form(formOptions);
  }

  render(container) {

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
  }
}
