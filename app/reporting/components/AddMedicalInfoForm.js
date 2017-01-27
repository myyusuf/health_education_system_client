import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import TextBox from '../../base/components/TextBox';
import DateInput from '../../base/components/DateInput';
import TextArea from '../../base/components/TextArea';
import NumberInput from '../../base/components/NumberInput';
import Label from '../../base/components/Label';
import DivisionComboBox from "../../division/components/DivisionComboBox";

export default class AddMedicalInfoForm {

  constructor(options) {

    var _this = this;

    this.id = guid();

    this.riwayatMppdId = options.riwayatMppdId;

    var tanggalDateInput = new DateInput({height: 25, width: 220});
    var descriptionTextArea = new TextArea({height: 80, width: 220, placeHolder: ''});
    var jumlahHariNumberInput = new NumberInput({
      value: 1, width: 220, height: 25,
      basicProperties: {
        min: 1,
        max: 31,
        decimalDigits: 0,
        digits: 2,
        spinButtons: true
      }
    });
    var divisionComboBox = new DivisionComboBox({value: 1});

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
        name: 'bagian_id',
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

        formValue['riwayat_mppd_id'] = _this.riwayatMppdId;
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

  validate(){
    this.form.validate();
  }

  render(container) {

    this.form.render(container);
  }
}
