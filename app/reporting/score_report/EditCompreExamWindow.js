import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import Window from '../../base/components/Window';
import DateRange from '../../base/components/DateRange';
import Label from '../../base/components/Label';
import NumberInput from '../../base/components/NumberInput';
import TextBox from '../../base/components/TextBox';

export default class EditCompreExamWindow {

  constructor(options) {

    var _this = this;

    this.id = guid();

    var compreExam = options.data;
    this.onSaveSuccess = options.onSaveSuccess;

    var nameStr = compreExam.nama + ' [ ' + compreExam.stambuk_lama + ' - ' + compreExam.stambuk_baru + ' ]';

    var nameLabel = new Label({
      text: nameStr,
      bold: true
    });

    var preKompreNumberInput = new NumberInput({value: compreExam.pre_kompre, width: '100%', height: 25});
    var midKompreNumberInput = new NumberInput({value: compreExam.mid_kompre, width: '100%', height: 25});
    var finalKompreNumberInput = new NumberInput({value: compreExam.final_kompre, width: '100%', height: 25});

    var formItems = [
      {
        name: 'studentName',
        label: 'Nama',
        content: nameLabel
      },
      {
        name: 'pre_kompre',
        label: 'Pre Kompre',
        content: preKompreNumberInput
      },
      {
        name: 'mid_kompre',
        label: 'Mid Kompre',
        content: midKompreNumberInput
      },
      {
        name: 'final_kompre',
        label: 'Final Kompre',
        content: finalKompreNumberInput
      }
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "PUT",
              url: "/compreexams/" + compreExam.id,
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

    this.window = new Window({
      width: 430,
      height: 250,
      title: 'Edit Ujian Komprehensif',
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
